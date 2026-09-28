import { Fragment } from "@revealjs/react";
import { COLORES_TEMAS } from "../components/agenda";
import { ContentSlide } from "../components/plantilla";
import { usePasos } from "../components/use-pasos";

const COLOR = COLORES_TEMAS[3];

type Actividad = {
  id: number;
  nombre: string;
  fechas: string;
  recursos: string;
  entrega?: boolean;
};
type Fase = { titulo: string; actividades: Actividad[] };

const FASES: Fase[] = [
  {
    titulo: "Fase 1 · Identificación del problema (OE1)",
    actividades: [
      {
        id: 1,
        nombre: "Entregar el anteproyecto y preparar su presentación",
        fechas: "21/09 – 03/10",
        recursos: "Formato de anteproyecto",
      },
      {
        id: 2,
        nombre: "Definir el protocolo de búsqueda de literatura",
        fechas: "21/09 – 25/09",
        recursos: "Scopus, Web of Science",
      },
      {
        id: 3,
        nombre: "Buscar y seleccionar literatura sobre métodos y capacidades",
        fechas: "28/09 – 09/10",
        recursos: "Scopus, Web of Science, gestor bibliográfico",
      },
      {
        id: 4,
        nombre: "Caracterizar el Framework (tiempo y variabilidad del VAN)",
        fechas: "28/09 – 09/10",
        recursos: "Framework v3.1, MineFlow, servidor multinúcleo",
      },
      {
        id: 5,
        nombre: "Comparar los métodos y elaborar la tabla comparativa (H1)",
        fechas: "12/10 – 16/10",
        recursos: "Literatura seleccionada, caracterización del Framework",
      },
    ],
  },
  {
    titulo: "Fase 2 · Definición de la solución (OE2)",
    actividades: [
      {
        id: 6,
        nombre: "Documentar la relación capacidad–inversión y validar rangos",
        fechas: "12/10 – 23/10",
        recursos: "Profesor co-guía, configuración del Framework",
      },
      {
        id: 7,
        nombre: "Formular función objetivo, protocolo y tolerancias",
        fechas: "19/10 – 27/10",
        recursos: "Formulación preliminar, profesores guía",
      },
      {
        id: 8,
        nombre: "Seleccionar y justificar el método de búsqueda (H2)",
        fechas: "26/10 – 30/10",
        recursos: "Tabla comparativa del OE1, formulación validada",
      },
      {
        id: 9,
        nombre: "Entregar el informe de avance (2 nov, 08:00)",
        fechas: "26/10 – 02/11",
        recursos: "Resultados del OE1 y el OE2, editor de texto",
        entrega: true,
      },
    ],
  },
  {
    titulo: "Fase 3 · Diseño, desarrollo y demostración (OE3)",
    actividades: [
      {
        id: 10,
        nombre: "Programar generación de configuraciones y ejecución por lotes",
        fechas: "02/11 – 11/11",
        recursos: "Python, Framework v3.1, asistentes de codificación",
      },
      {
        id: 11,
        nombre: "Verificar la integración reproduciendo el VAN original (H3)",
        fechas: "11/11 – 13/11",
        recursos: "Servidor multinúcleo",
      },
      {
        id: 12,
        nombre: "Programar el método de búsqueda e integrarlo",
        fechas: "09/11 – 20/11",
        recursos:
          "Python, bibliotecas de optimización, asistentes de codificación",
      },
      {
        id: 13,
        nombre: "Preparar y rendir la presentación de avance",
        fechas: "16/11 – 20/11",
        recursos: "Resultados del OE1 y el OE2",
      },
      {
        id: 14,
        nombre: "Verificar la capa en funciones de óptimo conocido (H4)",
        fechas: "20/11 – 24/11",
        recursos: "Funciones de prueba, servidor multinúcleo, repositorio Git",
      },
    ],
  },
  {
    titulo: "Fase 4 · Evaluación (OE4)",
    actividades: [
      {
        id: 15,
        nombre:
          "Ejecutar los experimentos en los dos casos, con repeticiones (H5)",
        fechas: "25/11 – 03/12",
        recursos: "Servidor multinúcleo, datos de ambos casos",
      },
      {
        id: 16,
        nombre:
          "Analizar resultados, sensibilidad y amenazas a la validez (H6)",
        fechas: "03/12 – 07/12",
        recursos: "Python (NumPy, Matplotlib)",
      },
    ],
  },
  {
    titulo: "Fase 5 · Comunicación",
    actividades: [
      {
        id: 17,
        nombre: "Entregar el informe final (9 dic, 08:00)",
        fechas: "23/11 – 09/12",
        recursos: "Resultados del OE3 y el OE4, editor de texto",
        entrega: true,
      },
    ],
  },
];

// Fases que se muestran en cada paso.
const VISTAS = [FASES.slice(0, 2), FASES.slice(2)];

const COLUMNAS = "grid grid-cols-[34px_1fr_118px_280px] gap-x-3";

export default function Slide9() {
  const { paso, raiz, visita } = usePasos();
  const fases = VISTAS[Math.min(paso, VISTAS.length - 1)];

  return (
    <ContentSlide title="Actividades y Recursos" seccion={3}>
      <div ref={raiz} className="relative -mt-4">
        {Array.from({ length: VISTAS.length - 1 }, (_, i) => (
          <Fragment key={i} as="span" className="absolute" />
        ))}

        <div
          className={`${COLUMNAS} border-b-2 pb-1 text-[13px] font-bold uppercase tracking-wider text-[#475569]`}
          style={{ borderColor: COLOR }}
        >
          <div>#</div>
          <div>Actividad</div>
          <div>Fechas</div>
          <div>Recursos</div>
        </div>

        <div key={`${paso}-${visita}`} className="animate-fila">
          {fases.map(({ titulo, actividades }) => (
            <div key={titulo}>
              <div
                className="mt-2 rounded-md px-2 py-1 text-[14px] font-bold text-[#002344]"
                style={{ backgroundColor: `${COLOR}33` }}
              >
                {titulo}
              </div>
              {actividades.map(({ id, nombre, fechas, recursos, entrega }) => (
                <div
                  key={id}
                  className={`${COLUMNAS} items-center border-b border-[#e2e8f0] py-[5px] text-[14px] leading-snug`}
                  style={{
                    fontWeight: entrega ? 700 : 400,
                    color: entrega ? "#002344" : "#1f2937",
                  }}
                >
                  <div className="text-[#64748b]">{id}</div>
                  <div>{nombre}</div>
                  <div className="text-[13px] text-[#475569]">{fechas}</div>
                  <div className="text-[13px]">{recursos}</div>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="mt-3 text-[13px] leading-snug text-[#475569]">
          Todas las actividades cuentan con el alumno y la supervisión semanal
          del profesor guía. El profesor co-guía participa en las actividades 6
          y 7. En negrita, las dos entregas del proyecto.
        </div>
      </div>
    </ContentSlide>
  );
}
