import { Fragment } from "@revealjs/react";
import { COLORES_TEMAS } from "../components/agenda";
import { ContentSlide } from "../components/plantilla";
import { usePasos } from "../components/use-pasos";

const COLOR = COLORES_TEMAS[3];
const MESES = [
  "ene",
  "feb",
  "mar",
  "abr",
  "may",
  "jun",
  "jul",
  "ago",
  "sep",
  "oct",
  "nov",
  "dic",
];
const DIA_MS = 86_400_000;
const INICIO = Date.UTC(2026, 8, 21);

// Días desde el inicio del proyecto (21/09/2026) para una fecha "dd/mm".
function dia(fecha: string) {
  const [d, m] = fecha.split("/").map(Number);
  return (Date.UTC(2026, m - 1, d) - INICIO) / DIA_MS;
}

function formato(dias: number) {
  const fecha = new Date(INICIO + dias * DIA_MS);
  return `${fecha.getUTCDate()} ${MESES[fecha.getUTCMonth()]}`;
}

const TOTAL = dia("10/12");
const ETIQUETAS = 150;
const ANCHO = 864;
const x = (dias: number) => ETIQUETAS + (dias / TOTAL) * (ANCHO - ETIQUETAS);

const EJE = 24;
const FILA = 46;

const FASES = [
  {
    nombre: "Fase 1 · OE1",
    detalle: "Identificar el problema",
    inicio: "21/09",
    fin: "16/10",
  },
  {
    nombre: "Fase 2 · OE2",
    detalle: "Definir la solución",
    inicio: "12/10",
    fin: "02/11",
  },
  {
    nombre: "Fase 3 · OE3",
    detalle: "Diseñar y desarrollar",
    inicio: "02/11",
    fin: "24/11",
  },
  { nombre: "Fase 4 · OE4", detalle: "Evaluar", inicio: "25/11", fin: "07/12" },
  { nombre: "Fase 5", detalle: "Comunicar", inicio: "23/11", fin: "09/12" },
];
const ALTO = EJE + FASES.length * FILA;

const HITOS = [
  { id: "H1", fecha: "16/10", fase: 0, texto: "Métodos comparados" },
  {
    id: "H2",
    fecha: "30/10",
    fase: 1,
    texto: "Formulación validada y método elegido",
  },
  { id: "H3", fecha: "13/11", fase: 2, texto: "Integración verificada" },
  { id: "H4", fecha: "24/11", fase: 2, texto: "Capa verificada" },
  { id: "H5", fecha: "03/12", fase: 3, texto: "Experimentos ejecutados" },
  { id: "H6", fecha: "07/12", fase: 3, texto: "Análisis finalizado" },
];

const ENTREGAS = [
  { fecha: "02/11", texto: "Informe de avance", ancla: "middle" },
  { fecha: "09/12", texto: "Informe final", ancla: "end" },
] as const;
const PRESENTACION = { inicio: "16/11", fin: "20/11" };

const EXPLICACIONES = [
  "Cinco fases en orden, una por objetivo específico, más la comunicación de resultados. Algunas se solapan para aprovechar el tiempo.",
  "",
  "Del lunes 21 de septiembre al miércoles 9 de diciembre de 2026, con dos informes y una presentación de avance en el camino.",
];

const LUNES = Array.from(
  { length: Math.floor(TOTAL / 7) + 1 },
  (_, i) => i * 7,
);

export default function Slide8() {
  const { paso, raiz, visita } = usePasos();
  const hitos = paso >= 1;
  const entregas = paso >= 2;

  return (
    <ContentSlide title="Planificación" seccion={3}>
      <div ref={raiz} className="relative -mt-4">
        {Array.from({ length: EXPLICACIONES.length - 1 }, (_, i) => (
          <Fragment key={i} as="span" className="absolute" />
        ))}

        <svg
          viewBox={`0 0 ${ANCHO} ${ALTO + 34}`}
          className="w-[864px]"
          style={{ height: ALTO + 34 }}
        >
          {LUNES.map((d) => (
            <g key={d}>
              <line
                x1={x(d)}
                y1={EJE}
                x2={x(d)}
                y2={ALTO}
                stroke="#e2e8f0"
                strokeWidth="1.5"
              />
              <text
                x={x(d)}
                y="14"
                textAnchor="middle"
                fontSize="12"
                fill="#64748b"
              >
                {formato(d)}
              </text>
            </g>
          ))}

          {entregas && (
            <g className="animate-fila">
              <rect
                x={x(dia(PRESENTACION.inicio))}
                y={EJE}
                width={
                  x(dia(PRESENTACION.fin) + 1) - x(dia(PRESENTACION.inicio))
                }
                height={ALTO - EJE}
                fill={COLOR}
                fillOpacity="0.18"
              />
              <text
                x={x(
                  (dia(PRESENTACION.inicio) + dia(PRESENTACION.fin) + 1) / 2,
                )}
                y={ALTO + 22}
                textAnchor="middle"
                fontSize="13"
                fontWeight="700"
                fill="#002344"
              >
                Presentación de avance
              </text>
              {ENTREGAS.map(({ fecha, texto, ancla }) => {
                const posicion = x(dia(fecha) + 1 / 3);
                return (
                  <g key={texto}>
                    <line
                      x1={posicion}
                      y1={EJE}
                      x2={posicion}
                      y2={ALTO + 6}
                      stroke="#002344"
                      strokeWidth="2"
                      strokeDasharray="5 4"
                    />
                    <text
                      x={posicion}
                      y={ALTO + 22}
                      textAnchor={ancla}
                      fontSize="13"
                      fontWeight="700"
                      fill="#002344"
                    >
                      {texto}
                    </text>
                  </g>
                );
              })}
            </g>
          )}

          <g key={`fases-${visita}`}>
            {FASES.map(({ nombre, detalle, inicio, fin }, f) => {
              const arriba = EJE + f * FILA;
              return (
                <g key={nombre}>
                  <text
                    x="0"
                    y={arriba + 21}
                    fontSize="15"
                    fontWeight="700"
                    fill="#002344"
                  >
                    {nombre}
                  </text>
                  <text x="0" y={arriba + 38} fontSize="12" fill="#64748b">
                    {detalle}
                  </text>
                  <rect
                    className="animate-crecer"
                    x={x(dia(inicio))}
                    y={arriba + 13}
                    width={x(dia(fin) + 1) - x(dia(inicio))}
                    height="20"
                    rx="6"
                    fill={COLOR}
                    style={{
                      transformBox: "fill-box",
                      transformOrigin: "left center",
                      animationDelay: `${f * 150}ms`,
                    }}
                  />
                </g>
              );
            })}
          </g>

          {hitos &&
            HITOS.map(({ id, fecha, fase }, i) => {
              const cx = x(dia(fecha) + 1);
              const cy = EJE + fase * FILA + 23;
              return (
                <g
                  key={id}
                  className="animate-fila"
                  style={{ animationDelay: `${i * 120}ms` }}
                >
                  <path
                    d={`M ${cx} ${cy - 10} L ${cx + 10} ${cy} L ${cx} ${cy + 10} L ${cx - 10} ${cy} Z`}
                    fill="#002344"
                    stroke="#fff"
                    strokeWidth="2"
                  />
                  <text
                    x={cx}
                    y={cy - 13}
                    textAnchor="middle"
                    fontSize="12"
                    fontWeight="700"
                    fill="#002344"
                  >
                    {id}
                  </text>
                </g>
              );
            })}
        </svg>

        <div key={`${paso}-${visita}`} className="mt-3 animate-fila">
          {paso === 1 ? (
            <div className="grid grid-cols-6 gap-2">
              {HITOS.map(({ id, fecha, texto }) => (
                <div
                  key={id}
                  className="flex h-[96px] flex-col rounded-xl bg-white p-3 shadow-sm"
                >
                  <div className="text-[13px] font-bold text-[#002344]">
                    {id} · {formato(dia(fecha))}
                  </div>
                  <div className="mt-1 text-[14px] leading-tight text-[#1f2937]">
                    {texto}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex h-[96px] items-center gap-4 rounded-2xl bg-white/80 px-5">
              <div
                className="h-[56px] w-[5px] shrink-0 rounded-full"
                style={{ backgroundColor: COLOR }}
              />
              <div className="text-[20px] leading-snug text-[#1f2937]">
                {EXPLICACIONES[paso]}
              </div>
            </div>
          )}
        </div>
      </div>
    </ContentSlide>
  );
}
