import type { ReactNode } from "react";
import { Fragment } from "@revealjs/react";
import { COLORES_TEMAS } from "../components/agenda";
import { ContentSlide } from "../components/plantilla";
import { usePasos } from "../components/use-pasos";

const COLOR = COLORES_TEMAS[1];

const OBJETIVOS = [
  {
    verbo: "Sistematizar",
    texto: "Revisar qué métodos sirven cuando cada evaluación es costosa.",
    resultado: "Tabla comparativa de métodos",
  },
  {
    verbo: "Formular",
    texto:
      "Definir variables, rangos, inversión y objetivo, y elegir el método.",
    resultado: "Formulación validada por un experto",
  },
  {
    verbo: "Desarrollar",
    texto:
      "Construir la capa sin modificar el Framework y verificar que funcione.",
    resultado: "Capa verificada en un repositorio",
  },
  {
    verbo: "Comparar",
    texto: "Enfrentarla al experto y a una búsqueda al azar en dos casos.",
    resultado: "Informe comparativo, haya o no mejora",
  },
];

const PASO_RESULTADOS = OBJETIVOS.length + 1;
const TRANSICION = "700ms cubic-bezier(0.65, 0, 0.35, 1)";

function Etiqueta({ children }: { children: ReactNode }) {
  return (
    <span
      className="shrink-0 self-start rounded-full px-3 py-[2px] text-[13px] font-bold uppercase tracking-wider text-[#002344]"
      style={{ backgroundColor: COLOR }}
    >
      {children}
    </span>
  );
}

function Marcado({ children }: { children: ReactNode }) {
  return (
    <span style={{ boxShadow: `inset 0 -12px 0 ${COLOR}80` }}>{children}</span>
  );
}

export default function Slide6() {
  const { paso, raiz, visita } = usePasos();
  const resultados = paso >= PASO_RESULTADOS;
  const expandido = paso === 0;

  return (
    <ContentSlide title="Objetivos y Resultados Esperados" seccion={1}>
      <div ref={raiz} className="relative -mt-4">
        {Array.from({ length: PASO_RESULTADOS }, (_, i) => (
          <Fragment key={i} as="span" className="absolute" />
        ))}

        <div key={visita} className="animate-fila">
          <div
            className="flex flex-col rounded-2xl bg-white shadow-sm"
            style={{
              marginTop: expandido ? 64 : 0,
              padding: expandido ? "32px 32px" : "12px 20px",
              borderLeft: `${expandido ? 8 : 6}px solid ${COLOR}`,
              transition: `margin-top ${TRANSICION}, padding ${TRANSICION}, border-left-width ${TRANSICION}`,
            }}
          >
            <div className="flex items-center gap-4">
              <Etiqueta>Objetivo general</Etiqueta>
              <div
                className="overflow-hidden whitespace-nowrap text-[18px] text-[#002344]"
                style={{
                  opacity: expandido ? 0 : 1,
                  transition: `opacity 400ms ${expandido ? "0ms" : "350ms"}`,
                }}
              >
                Una capa que busque mejores capacidades de mina y planta, sin
                modificar el Framework
              </div>
            </div>
            <div
              className="overflow-hidden"
              style={{
                maxHeight: expandido ? 260 : 0,
                opacity: expandido ? 1 : 0,
                transition: `max-height ${TRANSICION}, opacity 300ms`,
              }}
            >
              <div className="mt-4 text-[30px] font-bold leading-snug text-[#002344]">
                Desarrollar y evaluar una{" "}
                <Marcado>capa de optimización</Marcado> que busque
                automáticamente la <Marcado>capacidad de extracción</Marcado> y
                las <Marcado>tasas de procesamiento</Marcado>, sin modificar el
                Framework.
              </div>
              <div className="mt-4 text-[21px] leading-snug text-[#475569]">
                Para encontrar configuraciones con más VAN esperado menos
                inversión que la del experto, y comparar su desempeño con una
                búsqueda al azar de igual presupuesto.
              </div>
            </div>
          </div>
          <div className="mt-4 flex h-[256px] items-end gap-4">
            {OBJETIVOS.map(({ verbo, texto }, i) => {
              const visible = paso >= i + 1;
              const actual = paso === i + 1;
              return (
                <div
                  key={verbo}
                  className="flex flex-1 flex-col rounded-2xl bg-white p-4 shadow-sm transition-all duration-500"
                  style={{
                    height: 196 + i * 20,
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(16px)",
                    transitionDelay: paso === 1 && i === 0 ? "400ms" : "0ms",
                    outline: actual
                      ? `3px solid ${COLOR}`
                      : "3px solid transparent",
                  }}
                >
                  <Etiqueta>OE{i + 1}</Etiqueta>
                  <div className="mt-2 text-[22px] font-bold text-[#002344]">
                    {verbo}
                  </div>
                  <div className="mt-1 text-[16px] leading-snug text-[#1f2937]">
                    {texto}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-3 grid grid-cols-4 gap-4">
            {OBJETIVOS.map(({ resultado }, i) => (
              <div
                key={resultado}
                className="flex h-[88px] flex-col justify-center rounded-2xl px-4 transition-all duration-500"
                style={{
                  backgroundColor: COLOR,
                  opacity: resultados ? 1 : 0,
                  transform: resultados ? "translateY(0)" : "translateY(-10px)",
                  transitionDelay: resultados ? `${i * 150}ms` : "0ms",
                }}
              >
                <div className="text-[12px] font-bold uppercase tracking-wider text-[#002344]/70">
                  Resultado esperado
                </div>
                <div className="text-[17px] font-bold leading-tight text-[#002344]">
                  {resultado}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ContentSlide>
  );
}
