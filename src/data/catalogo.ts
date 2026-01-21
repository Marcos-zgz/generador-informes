// src/data/catalogo.ts

export interface ItemCatalogo {
  id: string;
  label: string;
  content: string;
}

// === TUS EQUIPOS ===
export const EQUIPOS: ItemCatalogo[] = [
  { 
    id: '1', 
    label: 'Equipo 1 Zaragoza', 
    content: `Con dos días de antelación al inicio de los trabajos se deberá poner en contacto con el Capataz de Explotación del Equipo nº 1, D. Eduardo Artigas en el Parque de Zona de Zaragoza, de 7:30 a 8:30 horas o en los teléfonos 976 69 63 73 o 682 24 11 48.

En el caso de que no se pueda contactar, se comunicará el día y hora del inicio de las obras a la Unidad de Explotación de la Subdirección de Carreteras en el teléfono 976 71 40 64.` 
  },
  { 
    id: '2', 
    label: 'Equipo 2 Calatayud', 
    content: `Con dos días de antelación al inicio de los trabajos se deberá poner en contacto obligatoriamente con el Capataz de Explotación del Equipo nº 2, D. José María Cabeza en el Parque de Zona de Calatayud, de 7,30 a 8,30 horas o en el teléfono 976 88 23 18 o 669 49 46 78.

En el caso de que no se pueda contactar con el referido Capataz de Explotación, se comunicará el día y hora del inicio de las obras a la Unidad de Explotación de la Subdirección de Carreteras en el teléfono 976 71 40 64.` 
  },
  { 
    id: '3', 
    label: 'Equipo 3 Ejea', 
    content: `En caso de tener dudas sobre la presente resolución y con dos días de antelación al comienzo de los trabajos deberá ponerse en contacto con el Capataz de Explotación del Equipo nº 3, D. Mariano Sancho en el Parque de Zona de Ejea de los Caballeros, de 7,30 a 8,30 horas o en el teléfono 976 66 06 07, o bien, en el móvil 679542342.

En el caso de que no se pueda contactar con el referido Capataz de Explotación, se comunicará el día y hora del inicio de las obras a la Unidad de Explotación de la Subdirección de Carreteras en el teléfono 976 71 40 64.` 
  },
  { 
    id: '4', 
    label: 'Equipo 4 Zaragoza', 
    content: `Con dos días de antelación al inicio de los trabajos y/o si tiene alguna duda sobre la presente resolución, además de se deberá poner en contacto obligatoriamente con el Capataz de Explotación del Equipo nº 4, D. Joaquín Barrado en el Parque de Zona de Zaragoza, de 7,30 a 8,30 horas o en el teléfono 976 69 63 73 a la misma hora, para comunicarle el día y la hora en la que se van a iniciar los trabajos, o bien, en el móvil 686629026 entre las 8,30 y las 13,30 horas.

En el caso de que no se pueda contactar con el referido Capataz de Explotación, se comunicará el día y hora del inicio de las obras a la Unidad de Explotación de la Subdirección de Carreteras en el teléfono 976 71 40 64.` 
  },
  { 
    id: '5', 
    label: 'Equipo 5 Borja', 
    content: `Con dos días de antelación al inicio de los trabajos, se deberá poner en contacto con el Capataz de Explotación del Equipo nº 5, D. Juan José Madrid en el Parque de Zona de Borja, de 7,30 a 8,30 horas o en el teléfono 976 86 85 36 a la misma hora, o bien, de 8:30 a 13:30 en el móvil 659 512 718.

En el caso de que no se pueda contactar con el referido Capataz de Explotación, se comunicará el día y hora del inicio de las obras a la Unidad de Explotación de la Subdirección de Carreteras en el teléfono 976 71 40 64.` 
  },
  { 
    id: '6', 
    label: 'Equipo 6 Caspe', 
    content: `Con dos días de antelación al inicio de los trabajos, se deberá poner en contacto con el Capataz de Explotación del Equipo nº 6, D. Andrés Almansa en el Parque de Zona de Caspe, de 7:30 a 14:00 hs en el teléfono 976 63 08 82, o bien, en el móvil 686 13 98 05.

En el caso de que no se pueda contactar con el referido Capataz de Explotación, se comunicará el día y hora del inicio de las obras a la Unidad de Explotación de la Subdirección de Carreteras en el teléfono 976 71 40 64.` 
  },
  { 
    id: '7', 
    label: 'Equipo 7 Calatayud', 
    content: `Con dos días de antelación al inicio de los trabajos, se deberá poner en contacto con el Capataz de Explotación del Equipo nº 7, en el Parque de Zona de Calatayud, de 7,30 a 8,30 horas o en el teléfono 976 882318 a la misma hora, o bien, de 8:30 a 13:30 en el móvil 682 74 64 92.

En el caso de que no se pueda contactar con el referido Capataz de Explotación, se comunicará el día y hora del inicio de las obras a la Unidad de Explotación de la Subdirección de Carreteras en el teléfono 976 71 40 64.` 
  }
];

// === TUS CONDICIONES ===
export const CONDICIONES: ItemCatalogo[] = [
  { 
    id: '0', 
    label: '00. Autorización 2 años', 
    content: `**Excepcionalmente esta autorización tendrá un plazo inicial de dos años para su realización.**` 
  },
  { 
    id: '1', 
    label: '01. Plantación viñas', 
    content: `CONDICIONES PARA LA PLANTACIÓN DE VIÑA EMPARRADA

1ª. La autorización se otorga dejando a salvo el derecho de propiedad y sin perjuicio de terceros.
2ª. Para que la autorización tenga validez, el peticionario deberá cumplir todos los requisitos exigidos por las disposiciones legales o reglamentarias vigentes que puedan afectarle.
3ª. Para llevar a cabo la plantación de la viña y el emparrado no se ocupará ni afectará la explanación de la carretera ni se entorpecerá la circulación.
4ª. En cuanto a la distancia a la que se podrán situar los pies de las cepas y los postes cabeceros del emparrado más cercanas a la carretera, se cumplirán las dos condiciones siguientes:

a) Los pies de las cepas y los postes cabeceros más cercanos a la carretera se situarán a partir de la línea de expropiación, dejando libre, además, 2 metros entre esta línea y los pies de las cepas.
b) Los pies de las cepas y los postes cabeceros más cercanos a la carretera quedarán fuera de la zona de dominio público, debiendo situarse a una distancia mínima de 3 metros medidos desde la arista exterior de la explanación (fin de cuneta o del talud).` 
  },
  { 
    id: '2', 
    label: '02. Arbolado frutal', 
    content: `CONDICIONES PARA LA PLANTACIÓN DE ARBOLADO

La plantación deberá cumplir con las siguientes condiciones:
1ª La autorización se otorga dejando a salvo el derecho de propiedad y sin perjuicio de terceros.
2ª Para que la autorización tenga validez, el peticionario deberá cumplir todos los requisitos exigidos por las disposiciones legales o reglamentarias vigentes que puedan afectarla.
3ª Para llevar a cabo la plantación no se ocupará ni afectará la explanación de la carretera ni se entorpecerá la circulación.
4ª En cuanto a la distancia en que se puede colocar los pies de los arboles más cercanos a la carretera, se cumplirá las dos condiciones:

a) Los pies más cercanos a la carretera se situarán a partir de la línea de expropiación, dejando libre, además, 2 metros entre esta línea y los pies de los árboles.
b) Los pies de los arboles más cercanos a la carretera quedaran fuera de la zona de dominio público, debiendo situarse a una distancia minina de 5 metros medidos desde la arista exterior de la explanación (fin de cuneta o del talud)` 
  },
  {
    id: '3',
    label: '03. Arbolado gran porte',
    content: `CONDICIONES PARA LA PLANTACIÓN DE ARBOLADO DE GRAN PORTE

La plantación deberá cumplir con las siguientes condiciones:
1ª La autorización se otorga dejando a salvo el derecho de propiedad y sin perjuicio de terceros.
2ª Para que la autorización tenga validez, el peticionario deberá cumplir todos los requisitos exigidos por las disposiciones legales o reglamentarias vigentes que puedan afectarla.
3ª Para llevar a cabo la plantación no se ocupará ni afectará la explanación de la carretera ni se entorpecerá la circulación.
4ª En cuanto a la distancia en que se puede colocar los pies de los arboles más cercanos a la carretera, se cumplirá las dos condiciones:

a) Los pies más cercanos a la carretera se situarán a partir de la línea de expropiación, dejando libre, además, 2 metros entre esta línea y los pies de los árboles.
b) Los pies de los arboles más cercanos a la carretera quedaran fuera de la zona de dominio público, debiendo situarse a una distancia minina de 7,50 metros medidos desde la arista exterior de la explanación (fin de cuneta o del talud)`
  },
  {
    id: '5',
    label: '05. Cerramiento diáfano (8m)',
    content: `CONDICIONES PARA LA EJECUCIÓN DE CERRAMIENTO DIAFANO

De acuerdo con lo determinado en el artículo 102.2.g del Reglamento General de la Ley 8/1998, de 17 de diciembre, de Carreteras de Aragón (Decreto 206/2003, de 22 de julio), el cerramiento se situará fuera de la zona de servidumbre de la carretera, es decir, a una distancia mínima de 8 metros medidos en horizontal y perpendicularmente desde la arista exterior de la explanación (pie del talud de terraplén).

El cerramiento será totalmente diáfano y estará compuesto por piquetes metálicos clavados sobre el terreno natural que enlazarán entre sí con malla metálica, no pudiendo en ningún caso colocar alambre espinoso.

El cerramiento que se autoriza es diáfano, por lo que no podrá colocarse sobre éste ningún tipo de tela, red, malla, o cualquier otro elemento que impida la visión del interior de la parcela.`
  },
  {
    id: '6',
    label: '06. Cerramiento opaco (15m)',
    content: `CONDICIONES PARA CERRAMIENTO A 15 M

La parte más cercana del cerramiento constructivo u opaco, se situará fuera de la línea límite de edificación, que para esta carretera es de 15 metros medidos desde la arista exterior de la calzada (línea blanca del arcén). Esta distancia es aplicable a cualquier elemento constructivo en el que para su ejecución se empleen materiales de construcción, independientemente de su tamaño.

Esta autorización no exime de solicitar las licencias o permisos que sea preciso obtener de cuantas entidades u organismos tengan competencia para la construcción de edificios en suelo no urbano.`
  },
  {
    id: '7.2',
    label: '07.2 Valla cinegética',
    content: `CONDICIONES PARA LA COLOCACION DE VALLA CINEGETICA

Piquetes metálicos clavados sobre el terreno natural que enlazarán entre sí con malla metálica simple torsión, o en forma de rectángulo, no pudiendo en ningún caso colocar alambre espinoso. Máxima altura 1,00 m.

Se coloca fuera de dominio público, en la zona de servidumbre (3-8m), lo más lejos posible (lo marcara la línea de árboles).

En este caso, ya que la ubicación de dicha parcela se encuentra muy poco definida de la rasante y afección de la carretera, se seguirán las indicaciones del Capataz de Explotación para la óptima colocación de la malla.

**La autorización se concede a precario, pudiendo ser renovable a los 3 años.**`
  },
  {
    id: '20',
    label: '20. Cruce por hinca/topo',
    content: `CONDICIONES PARA LA EJECUCIÓN DEL HINCA/TOPO

La longitud total proyectada mediante procedimiento de hinca incluye la carretera, la berma las cunetas, las zonas de dominio público, y las de servidumbre, la vaina de protección deberá superar la zona de servidumbre, hasta las arquetas.

Tal y como figura en el plano, la generatriz superior de la vaina de protección se situará como mínimo 1,50 metros de la rasante de la carretera en todo el cruce.

En ambas márgenes se permite, con el fin de abaratar costes, que tanto el foso de ataque como el de salida se puedan ejecutar en la citada zona, pero siempre fuera de la zona de dominio público, por lo que la parte más cercana de los citados fosos se situarán a una distancia mínima de 3 metros medidos desde la arista exterior de la explanación. Una vez que se haya ejecutado la hinca y se haya retirado la maquinaria que lo ha realizado, se deberá suplementar la vaina de protección en los 5 metros que le faltan hasta sobrepasar la zona de servidumbre.

Se recomienda, en los extremos de la vaina, coincidiendo con la línea que delimita la zona de servidumbre, la construcción de dos arquetas sensiblemente enrasadas al terreno natural.

No se podrán colocar los tubos en el interior de la vaina de protección, ni se podrá enterrar la zanja ni los fosos de ataque y salida hasta que se haya comprobado por los técnicos de la Unidad de Explotación de la Subdirección Provincial de Carreteras que la instalación se ajusta a la autorización en cuanto a la longitud de la vaina y a las cotas de resguardo, y además, los Técnicos de la Concesionaria.

Una vez terminadas las obras del cruzamiento se retirarán las obras auxiliares realizadas y se restituirá el entorno a su estado primitivo.`
  },
  {
    id: '28',
    label: '28. Movimiento de tierras',
    content: `CONDICIONES PARA EL MOVIMIENTO DE TIERRAS

El movimiento de tierras afectará exclusivamente a los terrenos propiedad del interesado, dejando a salvo los de titularidad de la Comunidad Autónoma de Aragón.

El movimiento de tierras consistirá exclusivamente en deshacer el abancalamiento existente en las parcelas con el fin de tener continuidad a la hora de realizar las tareas agrícolas, o bien, realizar una regularización del terreno.

No se podrá verter tierra ni en la cuneta ni en el talud de terraplén y/o cuneta de la zona.

Queda totalmente prohibido colocar verter, arrojar, depositar o rellenar el terreno con escombro o residuos sólidos o líquidos en la zona de afección.

Queda prohibido canalizar desagües o escorrederos a las cunetas.

Se prohíbe actuar con máquinas o vehículos de carga en la plataforma de la carretera.

El peticionario deberá dejar limpios de tierra los paseos y cunetas de la carretera y subsanar los daños que puedan causarse a la misma por causa del movimiento de tierras.`
  },
  {
    id: '30',
    label: '30. Tala y poda de árboles',
    content: `CONDICIONES PARA LA TALA DE LOS ÁRBOLES

La actuación se realizará de forma que no suponga un peligro para los vehículos y las personas que transiten por el lugar, debiendo poner cuantas medidas de seguridad sean necesarias para evitar cualquier riesgo o daño.

La ejecución de la tala o poda, siempre que se afecte al tráfico, se deberá realizar obligatoriamente de lunes a viernes, ambos inclusive, con la salvedad de que el viernes por la tarde y las vísperas de festivos no se podrá trabajar a partir de las 13 horas. Tampoco se podrá trabajar ni los sábados, ni los domingos ni los festivos.

La tala se deberá realizar en su mayor parte y siempre que se pueda desde el interior de la parcela, en el caso de, tener que ocupar un carril de la carretera más abajo se detallan las condiciones impuestas.

Queda prohibido tirar deliberadamente los árboles sobre la carretera, debiendo poner especial esmero en el cumplimiento de esta condición en el momento de talar los árboles que, por su altura o por su cercanía a la carretera pudieran caer por accidente sobre ella. En el caso de que esto último sucediera, deberá colocarse un señalista en cada sentido de circulación con el fin de dar paso alternativo a los vehículos, procediendo con la máxima premura a la retirada del árbol de la calzada. Seguidamente se procederá a barrer la calzada, dejándola totalmente expedita y dispuesta para que el paso del tráfico se produzca con la máxima seguridad.`
  }
];
