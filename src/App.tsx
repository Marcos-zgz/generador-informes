import { useState, useMemo, useEffect } from 'react';
import { EQUIPOS, CONDICIONES, COMUNES } from './data/catalogo';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
// @ts-ignore
import { asBlob } from 'html-docx-js-typescript';
import { saveAs } from 'file-saver';
import emailjs from '@emailjs/browser';

function App() {
// 1. Estado con datos por defecto (siempre rellenados)
const [formData, setFormData] = useState({
  expediente: 'E-0000-26', // Dato inicial
  equipo: ['eq1'] as string[], // Seleccionamos el primer equipo por defecto
  carretera: 'A-000',
  km: '0+000',
  margen: 'derecha',
  urbano: 'no',
  paso: 'no',
  tasaAdm: true,
  tasaPub: false,
  actuacion: 'Instalación de vallado perimetral',
  descripcion: 'Se procede a la instalación de un cerramiento metálico de simple torsión en la zona de servidumbre para delimitar la propiedad conforme a los planos adjuntos.',
  conds: ['c1', 'c2'] as string[] // Un par de condiciones ya marcadas
});
  const [filterCond, setFilterCond] = useState('');
  const [progress, setProgress] = useState(0);

  // Calcular progreso
  useEffect(() => {
    let filled = 0;
    if(formData.carretera) filled++;
    if(formData.km) filled++;
    if(formData.actuacion) filled++;
    if(formData.descripcion) filled++;
    if(formData.equipo.length > 0) filled++;
    if(formData.conds.length > 0) filled++;
    setProgress(Math.min(100, (filled / 6) * 100));
  }, [formData]);

  // Manejadores de cambios
  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    if (e.target.multiple) {
      const options = Array.from(e.target.selectedOptions, (option: any) => option.value);
      setFormData(prev => ({ ...prev, [name]: options }));
    } else {
      setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    }
  };

  // Filtrar condiciones
  const filteredConds = useMemo(() => {
    return CONDICIONES.filter(c => c.label.toLowerCase().includes(filterCond.toLowerCase()));
  }, [filterCond]);

  // Generar HTML del documento
  const getPreviewHTML = (mode: 'screen' | 'word') => {
    const d = formData;
    const S = {
        h1: mode === 'word' ? 'style="font-family:Arial, sans-serif; font-size:14pt; font-weight:bold; text-align:center; margin-bottom:12pt;"' : '',
        h3: mode === 'word' ? 'style="font-family:Arial, sans-serif; font-size:11pt; font-weight:bold; margin-top:12pt; margin-bottom:2pt;"' : '',
        h4: mode === 'word' ? 'style="font-family:Arial, sans-serif; font-size:11pt; font-weight:bold; margin-top:8pt; margin-bottom:0;"' : '',
        p:  mode === 'word' ? 'style="font-family:Arial, sans-serif; font-size:11pt; margin:0; text-align:justify; line-height:1.1;"' : '',
        ul: mode === 'word' ? 'style="margin-top:0; margin-bottom:0;"' : ''
    };

    if(!d.carretera && !d.descripcion && d.conds.length === 0)
        return '<p style="color:#9ca3af; text-align:center; padding:1rem;">Empieza a rellenar el formulario...</p>';

    let h = `<h1 ${S.h1}>INFORME DE AUTORIZACIÓN - EXP: ${formData.expediente || 'S/N'}</h1>`;
    
    h += `<h3 ${S.h3}>1.1 Relación de actuaciones</h3>`;
    h += `<p ${S.p}>Se pretende <strong>${d.actuacion || '...'}</strong> en la margen <strong>${d.margen || '___'}</strong>, del p.k. <strong>${d.km || '...'}</strong> de la carretera <strong>${d.carretera || '...'}</strong>.</p>`;

    h += `<h3 ${S.h3}>Descripción</h3>`;
    h += `<p ${S.p}>${d.descripcion || ''}</p>`;

    h += `<h3 ${S.h3}>1.2 Condiciones de las actuaciones</h3>`;
    if (d.conds.length > 0) {
        d.conds.forEach(id => {
            const c = CONDICIONES.find(x => x.id === id);
            if(c) {
                let text = c.text;
                if(mode === 'word') {
                    text = text.replace(/<p>/g, `<p ${S.p}>`);
                    text = `<div style="font-family:Arial, sans-serif; font-size:11pt; text-align:justify;">${text}</div>`;
                }
                h += text;
            }
        });
    } else {
        h += `<p ${S.p}><em>(No hay condiciones seleccionadas)</em></p>`;
    }

    h += `<p ${S.p}>No se permite el almacenamiento de materiales ni su manipulación con máquinas sobre la calzada, que deberá permanecer en todo momento libre de objetos procedentes de la obra.</p>`;
    h += `<p ${S.p}>Cualquier daño causado a terceros que esté originado o motivado por el incumplimiento de las condiciones impuestas en la presente autorización, será responsabilidad del solicitante.</p>`;

    let n = 3;
    h += `<h3 ${S.h3}>1.${n}. Señalización de la obra</h3>`;
    let pasoTxt = COMUNES.pasoNormal;
    if(d.paso === 'si') pasoTxt += COMUNES.pasoOcupacion;
    if(mode === 'word') pasoTxt = pasoTxt.replace(/<p>/g, `<p ${S.p}>`).replace(/<ul>/g, `<ul ${S.ul}>`);
    h += pasoTxt;
    n++;

    if (d.urbano === 'no' && (d.tasaAdm || d.tasaPub)) {
         h += `<h3 ${S.h3}>1.${n}. Cuantía de la tasa</h3>`;
         if (d.tasaAdm) h += `<h4 ${S.h4}>1.${n}.1 Tasa administrativa</h4>` + (mode==='word'?COMUNES.tasaAdmin.replace(/<p>/g,`<p ${S.p}>`):COMUNES.tasaAdmin);
         if (d.tasaPub) {
            let sub = d.tasaAdm ? 2 : 1;
            h += `<h4 ${S.h4}>1.${n}.${sub} Tasa dominio público</h4>` + (mode==='word'?COMUNES.tasaPublico.replace(/<p>/g,`<p ${S.p}>`):COMUNES.tasaPublico);
         }
         n++;
    }

    h += `<h3 ${S.h3}>1.${n}. Comunicación a la Subdirección</h3>`;
    if (d.equipo.length) {
        d.equipo.forEach(id => {
            const item = EQUIPOS.find(e => e.id === id);
            if(item) {
                let t = item.text;
                if(mode==='word') t = `<p ${S.p}>${t}</p>`;
                h += t;
            }
        });
    } else {
        h += `<p ${S.p} style="color:red">[Falta seleccionar Equipo]</p>`;
    }
    n++;

    h += `<h3 ${S.h3}>1.${n}. Anexos</h3>`;
    h += `<ul ${S.ul}><li>Croquis de obras fuera de la carretera.</li><li>Croquis de obras en la carretera.</li></ul>`;

    return h;
  };


  const generateWord = async () => {
    const content = getPreviewHTML('word');
    const full = `<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body>${content}</body></html>`;
    const blob = await asBlob(full) as Blob;
    saveAs(blob, `Informe_${formData.carretera || 'borrador'}.docx`);
  };

  const generatePdf = async () => {
    const el = document.getElementById('informeSalida');
    if(!el) return;
    const canvas = await html2canvas(el, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Informe_${formData.carretera || 'borrador'}.pdf`);
  };
// --- FUNCIÓN EMAILJS (Versión HTML con Estilos) ---
  const enviarPorEmail = () => {
    const btn = document.getElementById('btn-email');
    if(btn) btn.innerText = "Enviando... ⏳";

    // 1. REUTILIZAMOS TU LÓGICA DE WORD
    // Esto ya trae negritas y fuentes bonitas
    const htmlContenido = getPreviewHTML('word');

    // 2. AÑADIMOS EL MARGEN IZQUIERDO Y CONTENEDOR
    // Envolvemos todo en un div con padding-left
    const cuerpoHTML = `
      <div style="font-family: Arial, sans-serif; color: #333; padding-left: 20px; line-height: 1.5;">
        <h2 style="color: #ea580c; border-bottom: 2px solid #ea580c; padding-bottom: 5px;">Informe Generado</h2>
        <br/>
        ${htmlContenido}
      </div>
    `;

    // TUS CREDENCIALES (Asegúrate que sean las que funcionaron antes)
    const SERVICE_ID = "service_x9qtkcf"; // El que creaste nuevo
    const TEMPLATE_ID = "template_cu8yxem";
    const PUBLIC_KEY = "OFh90C612m0IM5AQ7"; 

    const templateParams = {
      to_name: "Jefe",
      from_name: "Generador Informes",
      message: cuerpoHTML, // <--- Ahora enviamos HTML, no texto plano
      titulo_obra: formData.carretera || "Sin Identificar"
    };

    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        alert(`✅ Informe enviado con formato!`);
        if(btn) btn.innerText = "📧 Enviar por Email";
      }, (err) => {
        console.error('FAILED...', err);
        alert(`❌ Error al enviar: ${JSON.stringify(err)}`);
        if(btn) btn.innerText = "📧 Enviar por Email";
      });
  };
  return (
    <div>
      <header className="header">
        <div className="header-content">
          <h1 className="header-title">Generador Informes 2026 Pro</h1>
          <div className="progress-container">
            <div className="progress-bar" style={{width: `${progress}%`}}></div>
          </div>
        </div>
      </header>

      <main className="main-grid">
        {/* PANEL IZQUIERDO */}
        <section className="left-panel">
        {/* SECCIÓN DE DATOS GENERALES */}
<div style={{ padding: '1rem', backgroundColor: '#f3f4f6', borderRadius: '0.5rem', marginBottom: '1.5rem', border: '1px solid #d1d5db' }}>
  <div style={{ marginBottom: '1rem' }}>
    <label className="label-upper" style={{ color: '#1e40af', fontWeight: 'bold' }}>Nº de Expediente</label>
    <input 
      name="expediente" 
      value={formData.expediente} // Importante para que se vea el valor inicial
      className="input-field" 
      placeholder="E-0000-26" 
      onChange={handleChange}
    />
  </div>

  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
     <div>
        <label className="label-upper">Carretera</label>
        <input name="carretera" value={formData.carretera} className="input-field" onChange={handleChange}/>
     </div>
     <div>
        <label className="label-upper">P.K.</label>
        <input name="km" value={formData.km} className="input-field" onChange={handleChange}/>
     </div>
  </div>
</div>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem'}}>
               <div>
                  <label className="label-upper">Equipo</label>
                  <select multiple name="equipo" className="select-field" style={{height:'6rem'}} onChange={handleChange}>
                    {EQUIPOS.map(eq => (
                        <option key={eq.id} value={eq.id}>{eq.label}</option>
                    ))}
                  </select>
               </div>
               <div>
                  <label className="label-upper">Carretera</label>
                  <input name="carretera" className="input-field" placeholder="Ej. A-123" onChange={handleChange}/>

                  <label className="label-upper">P.K.</label>
                  <input name="km" className="input-field" placeholder="Ej. 10+500" onChange={handleChange}/>
               </div>
            </div>

            <div className="box-gray" style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem'}}>
               <div>
                  <span style={{fontWeight:'bold', display:'block', marginBottom:'0.25rem'}}>Margen</span>
                  <label style={{display:'block'}}><input type="radio" name="margen" value="derecha" onChange={handleChange}/> Derecha</label>
                  <label style={{display:'block'}}><input type="radio" name="margen" value="izquierda" onChange={handleChange}/> Izquierda</label>
                  <label style={{display:'block'}}><input type="radio" name="margen" value="ambas" onChange={handleChange}/> Ambas</label>
               </div>
               <div>
                  <span style={{fontWeight:'bold', display:'block', marginBottom:'0.25rem'}}>Entorno</span>
                  <label style={{display:'block'}}><input type="radio" name="urbano" value="no" defaultChecked onChange={handleChange}/> Rural</label>
                  <label style={{display:'block'}}><input type="radio" name="urbano" value="si" onChange={handleChange}/> Urbano</label>
               </div>
            </div>

            <div className="box-blue" style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem'}}>
                <div>
                   <span style={{fontWeight:'bold', display:'block', marginBottom:'0.25rem', color:'#1e3a8a'}}>¿Ocupación Carril?</span>
                   <label style={{marginRight:'1rem'}}><input type="radio" name="paso" value="si" onChange={handleChange}/> Sí</label>
                   <label><input type="radio" name="paso" value="no" onChange={handleChange}/> No</label>
                </div>
                <div style={{opacity: formData.urbano === 'si' ? 0.5 : 1, pointerEvents: formData.urbano === 'si' ? 'none' : 'auto'}}>
                   <span style={{fontWeight:'bold', display:'block', marginBottom:'0.25rem', color:'#1e3a8a'}}>Tasas (Rural)</span>
                   <label style={{display:'block'}}><input type="checkbox" name="tasaAdm" checked={formData.tasaAdm} onChange={handleChange}/> Administrativa</label>
                   <label style={{display:'block'}}><input type="checkbox" name="tasaPub" checked={formData.tasaPub} onChange={handleChange}/> Dom. Público</label>
                </div>
            </div>

            <label className="label-upper">Actuación (Título)</label>
            <input name="actuacion" className="input-field" placeholder="Título corto..." onChange={handleChange} />

            <label className="label-upper">Descripción Detallada</label>
            <textarea name="descripcion" rows={4} className="textarea-field" onChange={handleChange}></textarea>

            <div style={{borderTop:'1px solid #e5e7eb', paddingTop:'1rem'}}>
               <label className="label-upper">Condiciones</label>
               <input placeholder="Filtrar..." className="input-field" onChange={(e) => setFilterCond(e.target.value)} />
               <select multiple name="conds" className="select-field" style={{height:'12rem'}} onChange={handleChange}>
                   {filteredConds.map(c => (
                       <option key={c.id} value={c.id}>{c.label}</option>
                   ))}
               </select>
               <p style={{fontSize:'0.75rem', color:'#9ca3af', textAlign:'right'}}>Ctrl+Click para seleccionar varias</p>
            </div>

            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.75rem', marginTop:'1rem', borderTop:'1px solid #e5e7eb', paddingTop:'1rem'}}>
               <button className="btn-primary" onClick={generateWord}>📄 WORD</button>
               <button className="btn-danger" onClick={generatePdf}>PDF</button>
            </div>

            {/* BOTÓN EMAILJS */}
            <button 
              id="btn-email"
              onClick={enviarPorEmail}
              style={{
                width: '100%',
                marginTop: '0.75rem',
                backgroundColor: '#f97316', 
                color: 'white',
                padding: '0.75rem',
                border: 'none',
                borderRadius: '0.25rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '0.9rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
              }}
            >
              📧 Enviar por Email
            </button>
            
            <p style={{textAlign:'center', fontSize:'0.75rem', color:'#6b7280', marginTop:'0.5rem', cursor:'pointer'}} onClick={() => window.location.reload()}>Borrar todo</p>

        </section>

        {/* PANEL DERECHO */}
        <section className="right-panel">
            <div className="preview-header">
               <h2 style={{fontWeight:'bold', fontSize:'0.875rem', textTransform:'uppercase', color:'#374151'}}>Vista Previa</h2>
               <span style={{fontSize:'0.75rem', backgroundColor:'#e5e7eb', padding:'0.25rem 0.5rem', borderRadius:'0.25rem'}}>Listo</span>
            </div>
            <div id="informeSalida" className="preview-content" dangerouslySetInnerHTML={{__html: getPreviewHTML('screen')}}>
            </div>
        </section>

      </main>
    </div>
  );
}

export default App;
