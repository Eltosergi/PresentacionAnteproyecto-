import type { ReactNode } from "react";
import { Fragment } from "@revealjs/react";
import { COLORES_TEMAS } from "../components/agenda";
import { ContentSlide } from "../components/plantilla";
import { usePasos } from "../components/use-pasos";

const COLOR = COLORES_TEMAS[0];

const CONFIGURACION = [
  { nombre: "Capacidad de extracción", valor: "6,5 Mt" },
  { nombre: "Tasa de procesamiento A", valor: "250 t/h" },
  { nombre: "Tasa de procesamiento B", valor: "200 t/h" },
];

const DIFICULTADES = [
  {
    titulo: "Más capacidad exige más inversión",
    texto:
      "Ampliar la mina o la planta puede subir el VAN, pero hay que invertir para lograrlo. Además, mina y planta deben ir equilibradas.",
  },
  {
    titulo: "No hay óptimo garantizado",
    texto:
      "El Framework es heurístico: el VAN que entrega es bueno, pero no se sabe cuán lejos está del mejor.",
  },
];

const PASO_PREGUNTA = 1;
const PASO_DIFICULTAD1 = 2;
const PASOS_TOTALES = PASO_DIFICULTAD1 + DIFICULTADES.length - 1;

function Caja({
  titulo,
  children,
  resaltar,
}: {
  titulo: string;
  children: ReactNode;
  resaltar?: boolean;
}) {
  return (
    <div
      className="flex h-[150px] flex-col rounded-2xl bg-white p-4 shadow-sm transition-all duration-500"
      style={{
        outline: resaltar ? `3px solid ${COLOR}` : "3px solid transparent",
      }}
    >
      <div className="text-[14px] font-bold uppercase tracking-wider text-[#0088b3]">
        {titulo}
      </div>
      <div className="mt-2 flex-1">{children}</div>
    </div>
  );
}

function Flecha() {
  return (
    <svg viewBox="0 0 40 24" className="h-[24px] w-[40px] shrink-0">
      <path
        d="M 2 12 L 34 12 M 26 4 L 36 12 L 26 20"
        stroke="#64748b"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Slide4() {
  const { paso, raiz } = usePasos();
  const pregunta = paso >= PASO_PREGUNTA;

  return (
    <ContentSlide title="Problemática" seccion={0}>
      <div ref={raiz} className="relative -mt-4">
        {Array.from({ length: PASOS_TOTALES }, (_, i) => (
          <Fragment key={i} as="span" className="absolute" />
        ))}

        <div className="relative flex items-center gap-3">
          <div className="w-[300px] shrink-0">
            <Caja titulo="Configuración · juicio experto" resaltar={pregunta}>
              <div className="flex flex-col gap-[6px]">
                {CONFIGURACION.map(({ nombre, valor }) => (
                  <div
                    key={nombre}
                    className="flex items-center justify-between text-[16px]"
                  >
                    <span>{nombre}</span>
                    <span
                      className="rounded-md px-2 font-mono text-[14px] font-bold transition-colors duration-500"
                      style={{
                        backgroundColor: pregunta ? COLOR : "#e2e8f0",
                        color: "#002344",
                      }}
                    >
                      {pregunta ? "¿?" : valor}
                    </span>
                  </div>
                ))}
              </div>
            </Caja>
          </div>
          <Flecha />
          <div className="w-[200px] shrink-0">
            <Caja titulo="Framework">
              <div className="text-[17px] leading-snug">
                Arma el mejor plan que encuentra para esa configuración
              </div>
            </Caja>
          </div>
          <Flecha />
          <div className="flex-1">
            <Caja titulo="Resultado">
              <div className="text-[28px] font-bold text-[#002344]">
                Plan + VAN
              </div>
              <div className="mt-1 text-[16px] leading-snug text-[#475569]">
                de una sola configuración
              </div>
            </Caja>
          </div>

          <svg
            viewBox="0 0 864 60"
            className="pointer-events-none absolute left-0 top-[150px] h-[60px] w-[864px] transition-opacity duration-500"
            style={{ opacity: pregunta ? 1 : 0 }}
          >
            <path
              d="M 760 4 L 760 34 Q 760 44 750 44 L 160 44 Q 150 44 150 34 L 150 8"
              stroke={COLOR}
              strokeWidth="3"
              strokeDasharray="8 7"
              fill="none"
            />
            <path
              d="M 142 16 L 150 6 L 158 16"
              stroke={COLOR}
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div
          className="mt-[62px] text-center text-[20px] transition-opacity duration-500"
          style={{ opacity: pregunta ? 1 : 0 }}
        >
          <span className="font-bold text-[#002344]">
            ¿Otra configuración daría más valor?
          </span>{" "}
          <span className="text-[#475569]">
            Hoy solo se sabe editando el archivo y volviendo a ejecutar.
          </span>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-4">
          {DIFICULTADES.map(({ titulo, texto }, i) => {
            const visible = paso >= PASO_DIFICULTAD1 + i;
            return (
              <div
                key={titulo}
                className="h-[150px] rounded-2xl bg-white p-4 shadow-sm transition-all duration-500"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(12px)",
                  borderTop: `5px solid ${COLOR}`,
                }}
              >
                <div className="text-[19px] font-bold text-[#002344]">
                  {titulo}
                </div>
                <div className="mt-1 text-[16px] leading-snug text-[#1f2937]">
                  {texto}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </ContentSlide>
  );
}
