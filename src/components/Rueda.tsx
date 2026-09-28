import { COLORES_TEMAS } from "./agenda";
import type { EstadoRueda } from "./rueda-estado";

const CORTOS = ["Problema", "Objetivos", "Metodología", "Planificación"];
const TEMAS = CORTOS.map((corto, i) => ({ corto, resalte: COLORES_TEMAS[i] }));

const RADIO = 200;
const CENTRO = 210;
const RADIO_INTERIOR = 54;
const RADIO_ETIQUETA = 130;
const HUECO = 2.5;
const INACTIVO_MINI = "#2c4a6e";
const MOVIMIENTO = "transform 900ms cubic-bezier(0.65, 0, 0.35, 1)";

function punto(angulo: number, radio: number) {
  const rad = (angulo * Math.PI) / 180;
  return [CENTRO + radio * Math.sin(rad), CENTRO - radio * Math.cos(rad)];
}

function sector(i: number) {
  const inicio = -90 * (i + 1) + HUECO;
  const fin = -90 * i - HUECO;
  const [x1, y1] = punto(inicio, RADIO);
  const [x2, y2] = punto(fin, RADIO);
  const [x3, y3] = punto(fin, RADIO_INTERIOR);
  const [x4, y4] = punto(inicio, RADIO_INTERIOR);
  return `M ${x1} ${y1} A ${RADIO} ${RADIO} 0 0 1 ${x2} ${y2} L ${x3} ${y3} A ${RADIO_INTERIOR} ${RADIO_INTERIOR} 0 0 0 ${x4} ${y4} Z`;
}

function posicion({ modo, paso }: EstadoRueda) {
  if (modo === "mini" || (modo === "agenda" && paso > 0))
    return "translate(48px, 160px) scale(1)";
  return "translate(260px, 160px) scale(1)";
}

export function Rueda({ estado }: { estado: EstadoRueda }) {
  const { modo, paso, seccion, giro } = estado;
  const mini = modo === "mini";
  const activo = mini ? seccion : modo === "agenda" ? paso - 1 : -1;

  return (
    <>
      <div
        className="pointer-events-none absolute left-0 top-0 z-0 h-[420px] w-[440px] origin-top-left"
        style={{
          transform: posicion(estado),
          opacity: modo === "agenda" ? 1 : 0,
          transition: `${MOVIMIENTO}, opacity 400ms`,
        }}
      >
        <svg
          width="440"
          height="420"
          viewBox="0 0 440 420"
          className="absolute left-0 top-0"
        >
          <g
            style={{
              transform: `rotate(${giro}deg)`,
              transformOrigin: `${CENTRO}px ${CENTRO}px`,
              transition: MOVIMIENTO,
            }}
          >
            {TEMAS.map(({ resalte }, i) => (
              <path
                key={resalte}
                d={sector(i)}
                fill={mini && i !== activo ? INACTIVO_MINI : resalte}
                style={{
                  opacity: mini || activo < 0 || i === activo ? 1 : 0.4,
                  transition: "opacity 500ms, fill 500ms",
                }}
              />
            ))}
          </g>
          <polygon
            points={`${CENTRO + RADIO + 24},${CENTRO - 16} ${CENTRO + RADIO + 24},${CENTRO + 16} ${CENTRO + RADIO + 4},${CENTRO}`}
            fill={activo >= 0 ? TEMAS[activo].resalte : COLORES_TEMAS[3]}
            style={{
              opacity: mini ? 0 : 1,
              transition: "opacity 400ms, fill 500ms",
            }}
          />
        </svg>
        <div
          className="absolute flex items-center justify-center text-[22px] font-bold text-[#002344] transition-opacity duration-500"
          style={{
            left: CENTRO - 54,
            top: CENTRO - 54,
            width: 108,
            height: 108,
            opacity: mini ? 0 : 1,
          }}
        >
          Agenda
        </div>

        {TEMAS.map(({ corto }, i) => {
          const angulo = -(90 * i + 45) + giro;
          return (
            <div
              key={corto}
              className="absolute text-center font-bold leading-tight"
              style={{
                color: mini && i !== activo ? "#b7c9df" : "#002344",
                left: CENTRO,
                top: CENTRO,
                transform: `translate(-50%, -50%) rotate(${angulo}deg) translateY(-${RADIO_ETIQUETA}px) rotate(${-angulo}deg)`,
                transition: `${MOVIMIENTO}, opacity 500ms, color 500ms`,
                opacity: mini || activo < 0 || i === activo ? 1 : 0.6,
              }}
            >
              <div
                className="leading-none transition-opacity duration-500"
                style={{ fontSize: 40, opacity: mini ? 0 : 1 }}
              >
                {i + 1}
              </div>
              <div
                className="text-[20px] transition-opacity duration-500"
                style={{ opacity: mini ? 0 : 1 }}
              >
                {corto}
              </div>
            </div>
          );
        })}
      </div>
      <div
        className="pointer-events-none absolute right-[24px] top-[16px] z-0 flex w-[172px] flex-col gap-[3px]"
        style={{ opacity: mini ? 1 : 0, transition: "opacity 400ms" }}
      >
        {TEMAS.map(({ corto, resalte }, i) => {
          const actual = mini && i === seccion;
          return (
            <div
              key={corto}
              className="flex h-[24px] items-center gap-2 rounded-md px-2 text-[15px] font-bold"
              style={{
                backgroundColor: actual ? resalte : "transparent",
                color: actual ? "#002344" : "#b7c9df",
                transition: "background-color 500ms, color 500ms",
              }}
            >
              <span
                className="h-[8px] w-[8px] shrink-0 rounded-full"
                style={{ backgroundColor: actual ? "#002344" : resalte }}
              />
              {i + 1}. {corto}
            </div>
          );
        })}
      </div>
    </>
  );
}
