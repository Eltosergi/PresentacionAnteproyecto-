import { Fragment } from "@revealjs/react";
import { AGENDA, COLORES_TEMAS } from "../components/agenda";
import { ContentSlide } from "../components/plantilla";
import { usePasos } from "../components/use-pasos";

const PUNTOS = [
  [
    "Introducción al tema central",
    "Los conceptos más importantes",
    "El problema que se busca resolver",
    "La estrategia elegida y por qué",
  ],
  [
    "Qué queremos lograr con este proyecto",
    "Cuatro pasos para llegar ahí",
    "Qué esperamos tener al final",
  ],
  [
    "Cómo construimos y probamos la solución",
    "Una prueba justa contra el azar",
    "Pruebas en dos casos de estudio",
  ],
  [
    "Qué haremos y en qué orden",
    "Seis hitos con fechas claras",
    "Del 21 de septiembre al 9 de diciembre",
  ],
];

const TRANSICION = "500ms cubic-bezier(0.65, 0, 0.35, 1)";

export default function Slide2() {
  const { paso, raiz } = usePasos();
  const activo = paso - 1;

  return (
    <ContentSlide title="Agenda">
      <div ref={raiz} className="relative -mt-4 flex flex-col gap-3">
        {AGENDA.map((nombre) => (
          <Fragment key={nombre} as="span" className="absolute" />
        ))}

        {AGENDA.map((nombre, i) => {
          const color = COLORES_TEMAS[i];
          const encendido = i === activo;
          const apagado = activo >= 0 && !encendido;
          return (
            <div
              key={nombre}
              className="rounded-2xl px-5 py-3"
              style={{
                backgroundColor: encendido ? color : "#f1f5f9",
                opacity: apagado ? 0.55 : 1,
                transition: `background-color ${TRANSICION}, opacity ${TRANSICION}`,
              }}
            >
              <div className="flex items-center gap-4">
                <span
                  className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full text-[22px] font-bold text-[#002344]"
                  style={{
                    backgroundColor: encendido ? "#ffffffb3" : color,
                    transition: `background-color ${TRANSICION}`,
                  }}
                >
                  {i + 1}
                </span>
                <span className="text-[26px] font-bold text-[#002344]">
                  {nombre}
                </span>
              </div>

              <div
                className="overflow-hidden pl-[56px]"
                style={{
                  maxHeight: encendido ? 160 : 0,
                  opacity: encendido ? 1 : 0,
                  transition: `max-height ${TRANSICION}, opacity ${TRANSICION}`,
                }}
              >
                <div className="mt-2 flex flex-col gap-1">
                  {PUNTOS[i].map((texto) => (
                    <div
                      key={texto}
                      className="flex items-start gap-3 text-[19px] leading-snug text-[#002344]"
                    >
                      <span className="mt-[9px] h-[8px] w-[8px] shrink-0 rounded-full bg-[#002344]" />
                      {texto}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </ContentSlide>
  );
}
