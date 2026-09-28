import { Fragment } from "@revealjs/react";
import { COLORES_TEMAS } from "../components/agenda";
import { ContentSlide } from "../components/plantilla";
import { usePasos } from "../components/use-pasos";

const COLOR = COLORES_TEMAS[0];
const GRIS = "#64748b";

const PASO_CICLO = 1;
const PASO_RESULTADO = 2;
const PASO_MOTIVO = 3;

const TARJETAS = [
  {
    paso: PASO_RESULTADO,
    titulo: "Resultado",
    texto:
      "Repite hasta agotar el presupuesto de evaluaciones y entrega la mejor configuración con su plan.",
  },
  {
    paso: PASO_MOTIVO,
    titulo: "¿Por qué por fuera?",
    texto:
      "El Framework queda intacto y podría cambiarse por una versión nueva sin rehacer la capa.",
  },
];

export default function Slide5() {
  const { paso, raiz } = usePasos();
  const ciclo = paso >= PASO_CICLO;

  return (
    <ContentSlide title="Estrategia de solución" seccion={0}>
      <div ref={raiz} className="relative -mt-4">
        {Array.from({ length: PASO_MOTIVO }, (_, i) => (
          <Fragment key={i} as="span" className="absolute" />
        ))}

        <div className="relative h-[260px]">
          <svg
            viewBox="0 0 864 260"
            className="absolute inset-0 h-[260px] w-[864px] transition-opacity duration-500"
            style={{ opacity: ciclo ? 1 : 0 }}
          >
            <path
              d="M 280 80 L 578 80 M 566 70 L 580 80 L 566 90"
              stroke={GRIS}
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 584 180 L 286 180 M 298 170 L 284 180 L 298 190"
              stroke={COLOR}
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
            <text
              x="432"
              y="66"
              textAnchor="middle"
              fontSize="18"
              fontWeight="700"
              fill="#002344"
            >
              propone una configuración
            </text>
            <text
              x="432"
              y="210"
              textAnchor="middle"
              fontSize="18"
              fontWeight="700"
              fill="#002344"
            >
              VAN esperado − inversión
            </text>
            {ciclo && (
              <circle r="8" fill={COLOR}>
                <animateMotion
                  dur="3s"
                  repeatCount="indefinite"
                  path="M 280 80 L 584 80 L 584 180 L 280 180 Z"
                />
              </circle>
            )}
          </svg>

          <div
            className="absolute left-0 top-[20px] flex h-[220px] w-[270px] flex-col justify-center rounded-2xl bg-white p-5 shadow-sm"
            style={{ outline: `3px solid ${COLOR}` }}
          >
            <div
              className="self-start rounded-full px-3 py-[2px] text-[13px] font-bold uppercase tracking-wider text-[#002344]"
              style={{ backgroundColor: COLOR }}
            >
              Nuevo
            </div>
            <div className="mt-2 text-[26px] font-bold leading-tight text-[#002344]">
              Capa de optimización
            </div>
            <div className="mt-2 text-[16px] leading-snug text-[#475569]">
              Usa cada resultado para elegir la siguiente configuración a probar
            </div>
          </div>

          <div className="absolute left-[594px] top-[20px] flex h-[220px] w-[270px] flex-col justify-center rounded-2xl bg-white p-5 shadow-sm">
            <div className="self-start rounded-full bg-[#e2e8f0] px-3 py-[2px] text-[13px] font-bold uppercase tracking-wider text-[#002344]">
              Sin modificar
            </div>
            <div className="mt-2 text-[26px] font-bold leading-tight text-[#002344]">
              Framework
            </div>
            <div className="mt-2 text-[16px] leading-snug text-[#475569]">
              Arma el plan para la configuración recibida, igual que hoy
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4">
          {TARJETAS.map(({ paso: aparece, titulo, texto }) => {
            const visible = paso >= aparece;
            return (
              <div
                key={titulo}
                className="h-[130px] rounded-2xl bg-white p-4 shadow-sm transition-all duration-500"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(12px)",
                  borderTop: `5px solid ${COLOR}`,
                }}
              >
                <div className="text-[20px] font-bold text-[#002344]">
                  {titulo}
                </div>
                <div className="mt-1 text-[17px] leading-snug text-[#1f2937]">
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
