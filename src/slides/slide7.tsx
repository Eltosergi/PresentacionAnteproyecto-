import type { ReactNode } from "react";
import { Fragment } from "@revealjs/react";
import { COLORES_TEMAS } from "../components/agenda";
import { ContentSlide } from "../components/plantilla";
import { usePasos } from "../components/use-pasos";

const COLOR = COLORES_TEMAS[2];
const PUNTA = 14;
const CHEVRON = `polygon(0 0, calc(100% - ${PUNTA}px) 0, 100% 50%, calc(100% - ${PUNTA}px) 100%, 0 100%, ${PUNTA}px 50%)`;

const FASES = [
  { nombre: "Identificación del problema", oe: "OE1" },
  { nombre: "Objetivos de la solución", oe: "OE2" },
  { nombre: "Diseño y desarrollo", oe: "OE3" },
  { nombre: "Demostración", oe: "OE3" },
  { nombre: "Evaluación", oe: "OE4" },
  { nombre: "Comunicación", oe: "Informe final" },
];

// Fases destacadas en cada paso.
const ENFOQUE = [[], [2, 3], [4], [4]];

const PRUEBA_JUSTA = [
  { titulo: "40 evaluaciones", texto: "el mismo presupuesto para ambas" },
  { titulo: "Mismo inicio", texto: "ambas parten de los mismos puntos" },
  { titulo: "Misma medida", texto: "mejor VAN esperado − inversión" },
];

const CUENTA = [
  { numero: "2", texto: "casos de estudio" },
  { numero: "2", texto: "estrategias" },
  { numero: "3", texto: "repeticiones" },
  { numero: "40", texto: "evaluaciones" },
];

function Tarjeta({
  titulo,
  children,
}: {
  titulo: string;
  children: ReactNode;
}) {
  return (
    <div
      className="flex flex-col rounded-2xl bg-white p-5 shadow-sm"
      style={{ borderTop: `5px solid ${COLOR}` }}
    >
      <div className="text-[21px] font-bold text-[#002344]">{titulo}</div>
      <div className="mt-2 flex-1 text-[17px] leading-snug text-[#1f2937]">
        {children}
      </div>
    </div>
  );
}

function Verificacion({ children }: { children: ReactNode }) {
  return (
    <div
      className="mt-3 flex items-start gap-2 rounded-xl px-3 py-2 text-[16px] leading-snug"
      style={{ backgroundColor: `${COLOR}40` }}
    >
      <span className="font-bold text-[#15803d]">✓</span>
      <span>{children}</span>
    </div>
  );
}

function Panel({ paso }: { paso: number }) {
  if (paso === 0) {
    return (
      <>
        <div className="grid grid-cols-2 gap-4">
          <Tarjeta titulo="El producto es una herramienta">
            La capa es un artefacto: DSR guía cómo diseñarla, construirla y
            demostrarla.
          </Tarjeta>
          <Tarjeta titulo="Evaluar es parte del método">
            No basta con que funcione: hay que comprobar si realmente aporta
            valor.
          </Tarjeta>
        </div>
        <div className="mt-4 text-[17px] leading-snug text-[#475569]">
          <span className="font-bold text-[#002344]">Limitación:</span> las
          conclusiones dependen de los casos usados; se mitiga con repeticiones
          y análisis de sensibilidad.
        </div>
      </>
    );
  }

  if (paso === 1) {
    return (
      <div className="grid grid-cols-2 gap-4">
        <Tarjeta titulo="1 · Conectar con el Framework">
          La capa arma la configuración, ejecuta el Framework y lee el VAN, sin
          tocar su código.
          <Verificacion>Se reproduce el VAN del caso original.</Verificacion>
        </Tarjeta>
        <Tarjeta titulo="2 · Programar la búsqueda">
          El método elegido se programa y se prueba por separado.
          <Verificacion>
            Se prueba en funciones cuyo óptimo ya se conoce.
          </Verificacion>
        </Tarjeta>
      </div>
    );
  }

  if (paso === 2) {
    return (
      <>
        <div className="text-[22px] font-bold text-[#002344]">
          Una prueba justa contra el azar
        </div>
        <div className="mt-3 flex flex-col gap-3 rounded-2xl bg-white p-4 shadow-sm">
          {["Capa de optimización", "Búsqueda aleatoria"].map(
            (nombre, fila) => (
              <div key={nombre} className="flex items-center gap-4">
                <div className="w-[200px] shrink-0 text-[18px] font-bold text-[#002344]">
                  {nombre}
                </div>
                <div className="flex gap-[4px]">
                  {Array.from({ length: 40 }, (_, i) => (
                    <span
                      key={i}
                      className="h-[11px] w-[11px] animate-fila rounded-full"
                      style={{
                        backgroundColor: fila === 0 ? COLOR : "#94a3b8",
                        animationDelay: `${i * 40}ms`,
                      }}
                    />
                  ))}
                </div>
              </div>
            ),
          )}
        </div>
        <div className="mt-3 grid grid-cols-3 gap-4">
          {PRUEBA_JUSTA.map(({ titulo, texto }) => (
            <div
              key={titulo}
              className="rounded-2xl px-4 py-3"
              style={{ backgroundColor: `${COLOR}40` }}
            >
              <div className="text-[19px] font-bold text-[#002344]">
                {titulo}
              </div>
              <div className="text-[16px] text-[#1f2937]">{texto}</div>
            </div>
          ))}
        </div>
        <div className="mt-3 text-[16px] text-[#475569]">
          La configuración del experto se usa como valor de referencia.
        </div>
      </>
    );
  }

  return (
    <>
      <div className="text-[22px] font-bold text-[#002344]">
        Pruebas en dos casos de estudio
      </div>
      <div className="mt-4 flex items-center justify-between">
        {CUENTA.map(({ numero, texto }, i) => (
          <div key={texto} className="contents">
            {i > 0 && (
              <span className="text-[30px] font-bold text-[#94a3b8]">×</span>
            )}
            <div className="flex h-[120px] w-[130px] flex-col items-center justify-center rounded-2xl bg-white shadow-sm">
              <div className="text-[44px] font-bold leading-none text-[#002344]">
                {numero}
              </div>
              <div className="mt-2 text-center text-[15px] leading-tight text-[#475569]">
                {texto}
              </div>
            </div>
          </div>
        ))}
        <span className="text-[30px] font-bold text-[#94a3b8]">=</span>
        <div
          className="flex h-[120px] w-[170px] flex-col items-center justify-center rounded-2xl"
          style={{ backgroundColor: COLOR }}
        >
          <div className="text-[44px] font-bold leading-none text-[#002344]">
            480
          </div>
          <div className="mt-2 text-center text-[15px] font-bold leading-tight text-[#002344]">
            ejecuciones del Framework
          </div>
        </div>
      </div>
      <div className="mt-5 text-[17px] leading-snug text-[#475569]">
        Más unas 60 evaluaciones para el análisis de sensibilidad, todo en
        paralelo en un servidor multinúcleo.
      </div>
    </>
  );
}

export default function Slide7() {
  const { paso, raiz, visita } = usePasos();

  return (
    <ContentSlide title="Metodología" seccion={2}>
      <div ref={raiz} className="relative -mt-4">
        {Array.from({ length: ENFOQUE.length - 1 }, (_, i) => (
          <Fragment key={i} as="span" className="absolute" />
        ))}

        <div className="text-[18px] text-[#475569]">
          Marco de trabajo:{" "}
          <span className="font-bold text-[#002344]">
            Design Science Research (DSR)
          </span>
          , seis fases ligadas a los objetivos
        </div>

        <div key={`fases-${visita}`} className="mt-3 flex gap-[3px]">
          {FASES.map(({ nombre, oe }, i) => {
            const resaltada = ENFOQUE[paso]?.includes(i) ?? false;
            const atenuada = paso > 0 && !resaltada;
            return (
              <div
                key={nombre}
                className="flex-1 animate-fila"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <div
                  className="flex h-[96px] flex-col items-center justify-center px-[18px] text-center transition-all duration-500"
                  style={{
                    clipPath: CHEVRON,
                    backgroundColor: resaltada ? COLOR : "#e2e8f0",
                    opacity: atenuada ? 0.45 : 1,
                  }}
                >
                  <div className="text-[15px] font-bold leading-tight text-[#002344]">
                    {nombre}
                  </div>
                  <div className="mt-1 text-[12px] font-bold uppercase tracking-wider text-[#475569]">
                    {oe}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div key={`${paso}-${visita}`} className="mt-5 animate-fila">
          <Panel paso={paso} />
        </div>
      </div>
    </ContentSlide>
  );
}
