import { Fragment } from "@revealjs/react";
import { COLORES_TEMAS } from "../components/agenda";
import { ContentSlide } from "../components/plantilla";
import { usePasos } from "../components/use-pasos";

const COLOR = COLORES_TEMAS[0];
const PERIODOS = ["#ff7a59", "#ffc107", "#00b1e6"];
const ORO = "#e0a526";
const LADO = 22;

const ETAPAS = [
  { etiqueta: "Entradas", titulo: "Mina y escenarios" },
  { etiqueta: "Etapa 1", titulo: "Qué extraer y cuándo" },
  { etiqueta: "Etapa 2", titulo: "Cómo procesar" },
  { etiqueta: "Resultado", titulo: "Plan y VAN" },
];

const EXPLICACIONES = [
  "Recibe el modelo de bloques de la mina, varios escenarios posibles de dónde está el mineral y una configuración de capacidades.",
  "Una metaheurística (VND) decide qué bloques extraer en cada periodo, probando intercambiar, adelantar o atrasar bloques sin romper el orden ni la capacidad.",
  "Luego decide cómo procesar ese mineral en la planta, repartiéndolo entre modos operacionales según el tipo de roca que llega.",
  "Entrega un plan de extracción y procesamiento que maximiza el VAN esperado considerando todos los escenarios.",
];

// Periodo en que se extrae cada bloque (0 = no se extrae).
const PLAN = [
  [3, 2, 1, 1, 2, 3],
  [0, 2, 1, 1, 2, 0],
  [0, 3, 2, 2, 3, 0],
  [0, 0, 3, 3, 0, 0],
];

// Bloques con mineral en cada escenario geológico.
const ESCENARIOS = [
  ["1-2", "1-3", "2-2", "2-3", "3-3"],
  ["1-3", "2-2", "2-3", "2-4", "3-2"],
  ["1-2", "2-1", "2-2", "3-2", "3-3"],
];

function Grilla({
  x,
  y,
  pintar,
}: {
  x: number;
  y: number;
  pintar: (fila: number, columna: number) => string;
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {PLAN.map((fila, f) =>
        fila.map((_, c) => (
          <rect
            key={`${f}-${c}`}
            x={c * LADO}
            y={f * LADO}
            width={LADO - 2}
            height={LADO - 2}
            rx="3"
            fill={pintar(f, c)}
          />
        )),
      )}
    </g>
  );
}

function Entradas() {
  return (
    <svg viewBox="0 0 170 150" className="h-[150px] w-[170px]">
      {ESCENARIOS.map((mineral, i) => (
        <g key={i} opacity={0.45 + i * 0.275}>
          <rect
            x={4 + i * 12}
            y={4 + i * 12}
            width={6 * LADO + 6}
            height={4 * LADO + 6}
            rx="6"
            fill="#fff"
            stroke="#cbd5e1"
          />
          <Grilla
            x={8 + i * 12}
            y={8 + i * 12}
            pintar={(f, c) => (mineral.includes(`${f}-${c}`) ? ORO : "#d6c4a8")}
          />
        </g>
      ))}
    </svg>
  );
}

function Etapa1() {
  return (
    <svg viewBox="0 0 170 150" className="h-[150px] w-[170px]">
      <Grilla
        x={19}
        y={10}
        pintar={(f, c) => (PLAN[f][c] ? PERIODOS[PLAN[f][c] - 1] : "#d6c4a8")}
      />
      {PERIODOS.map((color, i) => (
        <g key={color} transform={`translate(${14 + i * 52} 120)`}>
          <rect width="12" height="12" rx="3" fill={color} />
          <text x="17" y="11" fontSize="13" fill="#334155">
            P{i + 1}
          </text>
        </g>
      ))}
    </svg>
  );
}

function Etapa2() {
  return (
    <svg viewBox="0 0 170 150" className="h-[150px] w-[170px]">
      <path d="M 45 12 L 125 12 L 100 58 L 70 58 Z" fill="#94a3b8" />
      <text
        x="85"
        y="38"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill="#fff"
      >
        Planta
      </text>
      <path
        d="M 85 58 L 85 72 M 85 72 L 42 72 L 42 86 M 85 72 L 128 72 L 128 86"
        stroke="#64748b"
        strokeWidth="2"
        fill="none"
      />
      {[
        ["Modo A", "250 t/h"],
        ["Modo B", "200 t/h"],
      ].map(([modo, tasa], i) => (
        <g key={modo} transform={`translate(${8 + i * 86} 88)`}>
          <rect
            width="68"
            height="30"
            rx="15"
            fill={i === 0 ? COLOR : "#e2e8f0"}
          />
          <text
            x="34"
            y="20"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill="#002344"
          >
            {modo}
          </text>
          <text x="34" y="48" textAnchor="middle" fontSize="13" fill="#475569">
            {tasa}
          </text>
        </g>
      ))}
    </svg>
  );
}

function Resultado() {
  const barras = [34, 52, 44, 26];
  return (
    <svg viewBox="0 0 170 150" className="h-[150px] w-[170px]">
      {barras.map((alto, i) => (
        <rect
          key={i}
          x={30 + i * 30}
          y={80 - alto}
          width="20"
          height={alto}
          rx="3"
          fill={PERIODOS[i % 3]}
        />
      ))}
      <line x1="22" y1="81" x2="148" y2="81" stroke="#94a3b8" strokeWidth="2" />
      <text
        x="85"
        y="116"
        textAnchor="middle"
        fontSize="22"
        fontWeight="700"
        fill="#002344"
      >
        VAN esperado
      </text>
      <text x="85" y="138" textAnchor="middle" fontSize="12" fill="#475569">
        promedio sobre los escenarios
      </text>
    </svg>
  );
}

const DIBUJOS = [Entradas, Etapa1, Etapa2, Resultado];

const NIVELES = [
  {
    plazo: "Corto plazo",
    tipo: "Operacional",
    texto: "Cómo operar la mina en el día a día.",
  },
  {
    plazo: "Mediano plazo",
    tipo: "Táctico",
    texto: "Cómo cumplir las metas de los próximos meses.",
  },
  {
    plazo: "Largo plazo",
    tipo: "Estratégico",
    texto:
      "Qué bloques extraer, cuáles dejar y cuándo, durante toda la vida de la mina.",
  },
];

function Niveles({ enfoque }: { enfoque: boolean }) {
  return (
    <div className="flex h-[270px] items-center gap-5">
      {NIVELES.map(({ plazo, tipo, texto }, i) => {
        const largo = enfoque && i === NIVELES.length - 1;
        return (
          <div
            key={plazo}
            className="flex-1 animate-fila"
            style={{ animationDelay: `${i * 0.25}s` }}
          >
            <div
              className="flex h-[210px] flex-col rounded-2xl p-5 shadow-sm"
              style={{
                backgroundColor: largo ? COLOR : "#fff",
                opacity: enfoque && !largo ? 0.6 : 1,
                transform: largo ? "scale(1.05)" : "scale(1)",
                transition: "all 500ms",
              }}
            >
              <div className="text-[14px] font-bold uppercase tracking-wider text-[#002344]/70">
                {tipo}
              </div>
              <div className="mt-1 text-[26px] font-bold text-[#002344]">
                {plazo}
              </div>
              <div className="mt-3 text-[18px] leading-snug text-[#1f2937]">
                {texto}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

const CONTEXTO = [
  "La planificación minera se divide en tres niveles: corto, mediano y largo plazo.",
  "Este trabajo se enfoca en el largo plazo, el nivel estratégico.",
  "Una mina a cielo abierto se representa como un gran conjunto de bloques de roca.",
  "Planificar a largo plazo es decidir qué bloques sacar y en qué año, buscando el mayor valor económico (VAN).",
  "Pero no se sabe con certeza como es la forma de la veta. pero si estimaciones. ",
];
const PASO_FLUJO = CONTEXTO.length;

const ANIOS = ["#ff7a59", "#ffc107", "#4ade80", "#00b1e6"];
const MINA_COLUMNAS = 20;
const MINA_FILAS = 6;
const MINA_LADO = 36;
const MINA_X = (864 - MINA_COLUMNAS * MINA_LADO) / 2;
const MINA_Y = 12;
const TIERRA = [
  "#d6b98c",
  "#c9a574",
  "#b98f5f",
  "#a67c52",
  "#936b45",
  "#7f5b3a",
];

// Primer año en que se extrae el bloque (0 = no se extrae). Cada año contiene al anterior.
function anioDelBloque(fila: number, columna: number) {
  for (let anio = 1; anio <= ANIOS.length; anio++) {
    if (fila < anio && Math.abs(columna - 9.5) <= 2 * anio - fila - 0.5)
      return anio;
  }
  return 0;
}

// Bloques con mineral según cada escenario geológico xde.
const ESCENARIOS_MINA = [
  ["2-8", "2-9", "3-8", "3-9", "3-10", "4-9", "4-10", "5-10"],
  ["2-10", "2-11", "3-10", "3-11", "3-12", "4-11", "4-12", "5-12", "4-10"],
  ["2-6", "3-6", "3-7", "4-7", "4-8", "5-8", "3-8", "2-7"],
];

function Mina({ paso }: { paso: number }) {
  const anios = paso >= 1;
  const escenarios = paso >= 2;
  return (
    <svg viewBox="0 0 864 270" className="h-[270px] w-[864px]">
      {Array.from({ length: MINA_FILAS }, (_, f) =>
        Array.from({ length: MINA_COLUMNAS }, (_, c) => {
          const anio = anioDelBloque(f, c);
          return (
            <rect
              key={`${f}-${c}`}
              x={MINA_X + c * MINA_LADO}
              y={MINA_Y + f * MINA_LADO}
              width={MINA_LADO - 3}
              height={MINA_LADO - 3}
              rx="4"
              fill={anios && anio ? ANIOS[anio - 1] : TIERRA[f]}
              style={{ transition: `fill 500ms ${anio * 150}ms` }}
            />
          );
        }),
      )}

      {escenarios &&
        ESCENARIOS_MINA.map((mineral, i) => (
          <g key={i} opacity="0">
            <animate
              attributeName="opacity"
              values="1;0"
              keyTimes="0;0.333"
              calcMode="discrete"
              dur="3.6s"
              begin={`${i * 1.2}s`}
              repeatCount="indefinite"
            />
            {mineral.map((clave) => {
              const [f, c] = clave.split("-").map(Number);
              return (
                <g key={clave}>
                  <rect
                    x={MINA_X + c * MINA_LADO}
                    y={MINA_Y + f * MINA_LADO}
                    width={MINA_LADO - 3}
                    height={MINA_LADO - 3}
                    rx="4"
                    fill={ORO}
                    stroke="#fff"
                    strokeWidth="2"
                  />
                </g>
              );
            })}
            <text
              x="432"
              y="258"
              textAnchor="middle"
              fontSize="18"
              fontWeight="700"
              fill="#002344"
            >
              Escenario {i + 1}
            </text>
          </g>
        ))}

      {anios &&
        !escenarios &&
        ANIOS.map((color, i) => (
          <g key={color} transform={`translate(${282 + i * 80} 244)`}>
            <rect width="16" height="16" rx="4" fill={color} />
            <text x="22" y="14" fontSize="16" fill="#334155">
              Año {i + 1}
            </text>
          </g>
        ))}
    </svg>
  );
}

function Flecha({ visible }: { visible: boolean }) {
  return (
    <svg
      viewBox="0 0 32 24"
      className="h-[24px] w-[32px] shrink-0 transition-opacity duration-500"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <path
        d="M 2 12 L 26 12 M 18 4 L 28 12 L 18 20"
        stroke="#64748b"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Slide3() {
  const { paso, raiz, visita } = usePasos();
  const flujo = paso - PASO_FLUJO;

  return (
    <ContentSlide title="Introducción" seccion={0}>
      <div ref={raiz} className="relative -mt-4">
        {Array.from({ length: PASO_FLUJO + ETAPAS.length - 1 }, (_, i) => (
          <Fragment key={i} as="span" className="absolute" />
        ))}

        {flujo < 0 ? (
          <div
            key={`${paso < 2 ? "niveles" : "mina"}-${visita}`}
            className="animate-fila"
          >
            {paso < 2 ? (
              <Niveles enfoque={paso === 1} />
            ) : (
              <Mina paso={paso - 2} />
            )}
          </div>
        ) : (
          <div key="flujo" className="animate-fila">
            <div className="text-[18px] text-[#475569]">
              Para esto existe una herramienta de optimización, que llamaremos{" "}
              <span className="font-bold text-[#002344]">el Framework</span>,
              propuesta por{" "}
              <span className="font-bold text-[#002344]">
                Quelopana y Navarra (2024)
              </span>
            </div>

            <div className="mt-4 flex items-center justify-between">
              {ETAPAS.map(({ etiqueta, titulo }, i) => {
                const Dibujo = DIBUJOS[i];
                const visible = flujo >= i;
                const actual = flujo === i;
                return (
                  <div key={etiqueta} className="contents">
                    {i > 0 && <Flecha visible={visible} />}
                    <div
                      className="flex h-[256px] w-[186px] flex-col items-center rounded-2xl bg-white p-3 shadow-sm transition-all duration-500"
                      style={{
                        opacity: visible ? 1 : 0,
                        transform: visible
                          ? "translateY(0)"
                          : "translateY(12px)",
                        outline: actual
                          ? `3px solid ${COLOR}`
                          : "3px solid transparent",
                      }}
                    >
                      <div
                        className="rounded-full px-3 py-[2px] text-[13px] font-bold uppercase tracking-wider text-[#002344]"
                        style={{
                          backgroundColor:
                            i === 1 || i === 2 ? COLOR : "#e2e8f0",
                        }}
                      >
                        {etiqueta}
                      </div>
                      <div className="mt-2 text-center text-[18px] font-bold leading-tight text-[#002344]">
                        {titulo}
                      </div>
                      <div className="mt-auto">
                        <Dibujo />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div
          key={paso}
          className="mt-5 flex h-[96px] animate-fila items-center gap-4 rounded-2xl bg-white/80 px-5"
        >
          <div
            className="h-[56px] w-[5px] shrink-0 rounded-full"
            style={{ backgroundColor: COLOR }}
          />
          <div className="text-[21px] leading-snug text-[#1f2937]">
            {flujo < 0 ? CONTEXTO[paso] : EXPLICACIONES[flujo]}
          </div>
        </div>
      </div>
    </ContentSlide>
  );
}
