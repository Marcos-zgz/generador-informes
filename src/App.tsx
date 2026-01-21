import { useState, useRef } from 'react';
import { EQUIPOS, CONDICIONES } from './data/catalogo';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

// Tipado para html-docx-js-typescript
// @ts-ignore
import { asBlob } from 'html-docx-js-typescript';
import { saveAs } from 'file-saver';

// Utilidad para renderizar saltos de línea
const formatText = (text: string) => {
  if (!text) return null;
  return text.split('\n').map((str, i) => (
    <p key={i} className="mb-2 min-h-[1em]">{str}</p>
  ));
};

function App() {
  const [formData, setFormData] = useState({
    equipo: [] as string[],
    carretera: '',
    km: '',
    margen: '',
    urbano: 'no',
    paso: 'no',
    actuacion: '',
    descripcion: '',
    condiciones: [] as string[]
  });

  const printRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    if (e.target.multiple) {
      const options = Array.from(e.target.selectedOptions, (option: any) => option.value);
      setFormData(prev => ({ ...prev, [name]: options }));
    } else {
      setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    }
  };

  const handleCheckbox = (id: string, field: 'equipo' | 'condiciones') => {
    setFormData(prev => {
      const current = prev[field];
      const exists = current.includes(id);
      let nevVal;
      if (exists) nevVal = current.filter(x => x !== id);
      else nevVal = [...current, id];
      return { ...prev, [field]: nevVal };
    });
  };

  // --- GENERACIÓN DE WORD ---
  const generateWord = async () => {
    if (!printRef.current) return;
    
    // Clonamos el contenido para manipularlo para Word
    const content = printRef.current.innerHTML;
    
    const htmlString = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: Arial, sans-serif; font-size: 11pt; line-height: 1.15; text-align: justify; }
          h1 { font-size: 14pt; font-weight: bold; text-align: center; margin-bottom: 12pt; }
          h3 { font-size: 11pt; font-weight: bold; margin-top: 12pt; margin-bottom: 2pt; }
          p { margin-bottom: 8pt; }
          ul { margin-bottom: 8pt; }
        </style>
      </head>
      <body>${content}</body>
      </html>
    `;

    try {
      const blob = await asBlob(htmlString);
      saveAs(blob, `Informe_${formData.carretera || 'borrador'}.docx`);
    } catch (e) {
      console.error("Error generando Word", e);
      alert("Error generando Word. Revisa la consola.");
    }
  };

  // --- GENERACIÓN DE PDF ---
  const generatePDF = async () => {
    if (!printRef.current) return;
    
    const element = printRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Informe_${formData.carretera || 'borrador'}.pdf`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 font-sans text-gray-800">
      
      {/* HEADER */}
      <header className="bg-slate-800 text-white p-4 rounded-lg shadow-md mb-6 flex justify-between items-center">
        <h1 className="text-xl font-bold">Generador Informes 2026 Pro</h1>
        <div className="space-x-4">
          <button onClick={generateWord} className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded font-bold shadow transition">
            📄 WORD
          </button>
          <button onClick={generatePDF} className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded font-bold shadow transition">
            📄 PDF
          </button>
        </div>
      </header>

      <main className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto">
        
        {/* --- IZQUIERDA: INPUTS --- */}
        <section className="w-full lg:w-5/12 space-y-4 h-fit">
          
          {/* Panel Datos Básicos */}
          <div className="bg-white p-5 rounded-lg shadow border border-gray-200">
            <h2 className="text-xs font-bold uppercase text-gray-500 mb-3 border-b pb-1">Datos Generales</h2>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <input name="carretera" placeholder="Carretera (A-123)" className="p-2 border rounded bg-gray-50 text-sm" onChange={handleChange}/>
              <input name="km" placeholder="P.K. (10+500)" className="p-2 border rounded bg-gray-50 text-sm" onChange={handleChange}/>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <label className="block text-xs font-bold mb-1">Margen</label>
                <select name="margen" className="w-full p-2 border rounded text-sm" onChange={handleChange}>
                  <option value="">Selecciona...</option>
                  <option value="derecha">Derecha</option>
                  <option value="izquierda">Izquierda</option>
                  <option value="ambas">Ambas</option>
                </select>
              </div>
              <div>
                 <label className="block text-xs font-bold mb-1">Entorno</label>
                 <div className="flex gap-2 text-sm mt-2">
                   <label><input type="radio" name="urbano" value="no" defaultChecked onChange={handleChange}/> Rural</label>
                   <label><input type="radio" name="urbano" value="si" onChange={handleChange}/> Urbano</label>
                 </div>
              </div>
            </div>

            <input name="actuacion" placeholder="Título de Actuación" className="w-full p-2 border rounded bg-gray-50 text-sm mb-3" onChange={handleChange}/>
            <textarea name="descripcion" placeholder="Descripción detallada..." rows={3} className="w-full p-2 border rounded bg-gray-50 text-sm" onChange={handleChange}></textarea>
          </div>

          {/* Panel Equipos */}
          <div className="bg-white p-5 rounded-lg shadow border border-gray-200">
            <h2 className="text-xs font-bold uppercase text-gray-500 mb-3 border-b pb-1">Equipo de Zona</h2>
            <div className="max-h-32 overflow-y-auto space-y-2">
              {EQUIPOS.map(eq => (
                <label key={eq.id} className="flex items-center gap-2 text-sm hover:bg-blue-50 p-1 rounded cursor-pointer">
                  <input type="checkbox" onChange={() => handleCheckbox(eq.id, 'equipo')} checked={formData.equipo.includes(eq.id)} />
                  {eq.label}
                </label>
              ))}
            </div>
          </div>

          {/* Panel Condiciones */}
          <div className="bg-white p-5 rounded-lg shadow border border-gray-200">
            <h2 className="text-xs font-bold uppercase text-gray-500 mb-3 border-b pb-1">Condiciones</h2>
            <div className="max-h-60 overflow-y-auto space-y-1">
              {CONDICIONES.map(c => (
                <label key={c.id} className="flex items-start gap-2 text-sm hover:bg-yellow-50 p-2 rounded cursor-pointer border border-transparent hover:border-yellow-200">
                  <input type="checkbox" className="mt-1" onChange={() => handleCheckbox(c.id, 'condiciones')} checked={formData.condiciones.includes(c.id)} />
                  <span className="text-gray-700">{c.label}</span>
                </label>
              ))}
            </div>
          </div>

        </section>

        {/* --- DERECHA: PREVIEW --- */}
        <section className="w-full lg:w-7/12">
           <div className="bg-white shadow-2xl rounded-sm min-h-[800px] p-10 border border-gray-300">
             
             {/* ÁREA IMPRIMIBLE */}
             <div ref={printRef} className="font-serif text-justify text-gray-900 leading-snug text-[14.6px]">
                
                <h1 className="text-center font-bold text-lg mb-6 uppercase">Informe de Autorización</h1>
                
                {/* 1.1 */}
                <h3 className="font-bold mt-4 mb-2 text-sm uppercase">1.1 Relación de actuaciones</h3>
                <p className="mb-4">
                  Se pretende <strong>{formData.actuacion || '_______'}</strong> en la margen <strong>{formData.margen || '___'}</strong>, 
                  del p.k. <strong>{formData.km || '___'}</strong> de la carretera <strong>{formData.carretera || '_______'}</strong>.
                </p>

                <h3 className="font-bold mt-4 mb-2 text-sm uppercase">Descripción</h3>
                <div className="mb-4">
                  {formData.descripcion ? formatText(formData.descripcion) : <span className="text-gray-300 italic">[Descripción...]</span>}
                </div>

                {/* 1.2 Condiciones */}
                <h3 className="font-bold mt-6 mb-2 text-sm uppercase">1.2 Condiciones de las actuaciones</h3>
                {formData.condiciones.length === 0 && <p className="italic text-gray-400 mb-4">[Sin condiciones seleccionadas]</p>}
                
                {formData.condiciones.map(condId => {
                  const cond = CONDICIONES.find(c => c.id === condId);
                  return cond ? (
                    <div key={cond.id} className="mb-5">
                      {formatText(cond.content)}
                    </div>
                  ) : null;
                })}

                <p className="mb-4 mt-6">
                  No se permite el almacenamiento de materiales ni su manipulación con máquinas sobre la calzada, que deberá permanecer en todo momento libre de objetos procedentes de la obra.
                </p>
                <p className="mb-4">
                   Cualquier daño causado a terceros que esté originado o motivado por el incumplimiento de las condiciones impuestas en la presente autorización, será responsabilidad del solicitante.
                </p>

                {/* Comunicación */}
                <h3 className="font-bold mt-6 mb-2 text-sm uppercase">Comunicación a la Subdirección</h3>
                {formData.equipo.length === 0 && <p className="text-red-300 text-xs">[Selecciona equipo]</p>}
                {formData.equipo.map(eqId => {
                  const eq = EQUIPOS.find(e => e.id === eqId);
                  return eq ? <div key={eq.id} className="mb-4">{formatText(eq.content)}</div> : null;
                })}

             </div>
             {/* FIN ÁREA IMPRIMIBLE */}

           </div>
        </section>

      </main>
    </div>
  );
}

export default App;
