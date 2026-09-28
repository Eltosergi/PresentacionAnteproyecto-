import { useCallback } from "react";
import { Fragment } from "@revealjs/react";
import { AGENDA, COLORES_TEMAS } from "../components/agenda";
import { ContentSlide } from "../components/plantilla";
import { useDespacharRueda } from "../components/rueda-estado";
import { usePasos } from "../components/use-pasos";

const TEMAS = [
  {
    puntos: [
      "Introducción al tema central",
      "Los conceptos más importantes",
      "El problema que se busca resolver",
      "La estrategia elegida y por qué",
    ],
  },
  {
    puntos: ["Qué queremos lograr con este proyecto", "Cuatro pasos para llegar ahí", "Qué esperamos tener al final"],
  },
  {
    puntos: [
      "Cómo construimos y probamos la solución",
      "Una prueba justa contra el azar",
      "Pruebas en dos casos de estudio",
    ],
  },
  {
    puntos: ["Qué haremos y en qué orden", "Seis hitos con fechas claras", "Del 21 de septiembre al 9 de diciembre"],
  },
];

export default function Slide2() {
  const despachar = useDespacharRueda();
  const alCambiar = useCallback((n: number) => despachar({ tipo: "paso", paso: n }), [despachar]);
  const { paso, raiz } = usePasos(alCambiar);

  const activo = paso - 1;
  const tema = TEMAS[activo];

  return (
    <ContentSlide title="Agenda" agenda>
      <div ref={raiz} className="relative -mt-2 h-[430px]">
        {AGENDA.map((nombre) => (
          <Fragment key={nombre} as="span" className="absolute" />
        ))}

        <div
          className="absolute left-0 top-[430px] w-[864px] text-center text-[20px] text-[#475569] transition-opacity duration-500"
          style={{ opacity: paso === 0 ? 1 : 0 }}
        >
          Avanza para comenzar el recorrido
        </div>

        <div
          key={paso}
          className="absolute left-[470px] top-0 flex h-[420px] w-[394px] animate-fila flex-col justify-center"
          style={{ animationDelay: paso === 1 ? "0.6s" : "0s" }}
        >
          {tema && (
            <>
              <div
                className="self-start rounded-full px-4 py-1 text-[18px] font-bold uppercase tracking-wider text-[#002344]"
                style={{ backgroundColor: COLORES_TEMAS[activo] }}
              >
                Tema {paso} de 4
              </div>
              <div className="mt-2 text-[32px] font-bold leading-tight text-[#002344]">{AGENDA[activo]}</div>
              <div className="mt-5 text-[18px] font-semibold uppercase tracking-wider text-[#475569]">Qué veremos</div>
              <div className="mt-2 flex flex-col gap-2">
                {tema.puntos.map((texto) => (
                  <div key={texto} className="flex items-start gap-3 text-[22px] leading-snug">
                    <span
                      className="mt-[10px] h-[10px] w-[10px] shrink-0 rounded-full"
                      style={{ backgroundColor: COLORES_TEMAS[activo] }}
                    />
                    {texto}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </ContentSlide>
  );
}
