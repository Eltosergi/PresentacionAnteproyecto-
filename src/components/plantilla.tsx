import { Fragment, type ReactNode } from "react";
import { Slide } from "@revealjs/react";
import logoDepartamento from "../assets/logo-departamento.png";

const imgReset =
  "!m-0 !border-0 !bg-transparent !shadow-none !max-w-none !max-h-none";

const tituloPortada =
  "Desarrollo de capa de optimización de capacidad de extracción y tasas de procesamiento para la planificación minera a largo plazo bajo incertidumbre geológica";

const retrasosOndas = [0, 1.5, 3];

type OndasProps = {
  left: number;
  top: number;
  tamano: number;
  desfase: number;
};

function Ondas({ left, top, tamano, desfase }: OndasProps) {
  return retrasosOndas.map((retraso) => (
    <div
      key={retraso}
      style={{
        left,
        top,
        width: tamano,
        height: tamano,
        animationDelay: `${retraso + desfase}s`,
      }}
      className="absolute rounded-full border-2 border-[#8fb8dc]/30 animate-onda motion-reduce:hidden"
    />
  ));
}

const datosPortada = [
  {
    etiqueta: "Carrera",
    valor: "Ingeniería Civil en Computación e Informática",
  },
  { etiqueta: "Alumno", valor: "Sergio Leonardo Parada Espillico" },
  {
    etiqueta: "Guía Empresa",
    valor: "Departamento de ingenierias de sistemas y computación - UCN",
  },
  { etiqueta: "Profesor Guía", valor: "Ph.D. Aldo Quelopana Retamal" },
  { etiqueta: "Profesor Co-Guía", valor: "Bryan Díaz, Ingeniero en Minas" },
];

export function PortadaSlide() {
  return (
    <Slide backgroundGradient="linear-gradient(135deg, #001a33 0%, #002344 55%, #003a6b 100%)">
      <div className="relative w-[960px] h-[720px] overflow-hidden text-left text-white font-[Calibri,Carlito,sans-serif]">
        <Ondas left={60} top={260} tamano={260} desfase={0} />
        <Ondas left={824} top={24} tamano={120} desfase={4.4} />
        <Ondas left={770} top={530} tamano={200} desfase={8.8} />

        <div className="absolute left-0 top-[388px] w-[50px] h-[3px] bg-[#8fb8dc]/35" />
        <div className="absolute left-[330px] top-[388px] w-[630px] h-[3px] bg-[#8fb8dc]/35" />

        <img
          src={logoDepartamento}
          alt="Departamento de Ingeniería de Sistemas y Computación"
          className={`absolute left-[824px] top-[24px] w-[120px] h-[120px] ${imgReset}`}
        />

        <div className="absolute left-[380px] top-[146px] w-[540px]">
          <div className="text-[20px] font-semibold tracking-[0.2em] uppercase text-[#00b1e6]">
            Exposición de Anteproyecto
          </div>
          <div className="mt-3 text-[30px] font-bold leading-[1.2]">
            {tituloPortada}
          </div>
        </div>

        <div className="absolute left-[380px] top-[408px] w-[560px] grid grid-cols-[150px_1fr] gap-x-4 gap-y-2 text-[20px] leading-snug">
          {datosPortada.map(({ etiqueta, valor }) => (
            <Fragment key={etiqueta}>
              <div className="text-[18px] pt-[1px] text-[#8fb8dc]">
                {etiqueta}
              </div>
              <div>{valor}</div>
            </Fragment>
          ))}
        </div>

        <div className="absolute left-[60px] top-[664px] text-[16px] tracking-wide text-white/60">
          Universidad Católica del Norte · Departamento de Ingeniería de
          Sistemas y Computación
        </div>
      </div>
    </Slide>
  );
}

type ContentSlideProps = {
  title: string;
  seccion?: number;
  agenda?: boolean;
  children: ReactNode;
};

export function ContentSlide({
  title,
  seccion,
  agenda,
  children,
}: ContentSlideProps) {
  return (
    <Slide
      backgroundColor="#e5e7eb"
      data-marco="true"
      data-seccion={seccion}
      data-agenda={agenda ? "true" : undefined}
    >
      <div className="relative w-[960px] h-[720px] text-left text-[#1f2937] font-[Calibri,Carlito,sans-serif]">
        <div className="absolute left-[37px] top-0 w-[600px] h-[140px] flex items-center text-[44px] font-bold leading-tight text-white">
          {title}
        </div>
        <div className="absolute left-[48px] top-[168px] w-[864px]">
          {children}
        </div>
      </div>
    </Slide>
  );
}
