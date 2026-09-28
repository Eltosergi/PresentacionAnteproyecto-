import { createContext, useContext } from "react";

export type EstadoRueda = {
  modo: "oculta" | "agenda" | "mini";
  paso: number;
  seccion: number;
  giro: number;
};

export type AccionRueda =
  | { tipo: "slide"; marco: boolean; agenda: boolean; seccion?: number }
  | { tipo: "paso"; paso: number };

export const estadoInicialRueda: EstadoRueda = {
  modo: "oculta",
  paso: 0,
  seccion: 0,
  giro: 135,
};

const masCercano = (actual: number, objetivo: number) =>
  objetivo + 360 * Math.round((actual - objetivo) / 360);

// Solo la agenda gira la rueda; en las demás slides se oculta y conserva su giro.
function conGiro(estado: EstadoRueda): EstadoRueda {
  if (estado.modo !== "agenda") return estado;
  const objetivo = 135 + 90 * Math.max(estado.paso - 1, 0);
  return { ...estado, giro: masCercano(estado.giro, objetivo) };
}

export function reducirRueda(
  estado: EstadoRueda,
  accion: AccionRueda,
): EstadoRueda {
  if (accion.tipo === "paso") return conGiro({ ...estado, paso: accion.paso });
  const modo = !accion.marco ? "oculta" : accion.agenda ? "agenda" : "mini";
  const paso = modo === "agenda" && estado.modo === "oculta" ? 0 : estado.paso;
  return conGiro({
    ...estado,
    modo,
    paso,
    seccion: accion.seccion ?? estado.seccion,
  });
}

export const RuedaContext = createContext<(accion: AccionRueda) => void>(
  () => {},
);

export const useDespacharRueda = () => useContext(RuedaContext);
