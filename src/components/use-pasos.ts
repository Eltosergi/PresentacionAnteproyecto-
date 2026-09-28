import { useEffect, useRef, useState } from "react";
import { useReveal } from "@revealjs/react";

// Cuenta cuántos fragments de la slide están visibles. Al llegar avanzando
// reinicia en 0; al volver desde atrás Reveal deja todos visibles.
// `visita` aumenta cada vez que se llega a la slide, para usarlo como key y
// repetir las animaciones de entrada.
export function usePasos(alCambiar?: (paso: number) => void) {
  const deck = useReveal();
  const raiz = useRef<HTMLDivElement>(null);
  const [paso, setPaso] = useState(0);
  const [visita, setVisita] = useState(0);

  useEffect(() => {
    if (!deck) return;

    const leer = () => {
      const seccion = raiz.current?.closest("section");
      const actual = seccion
        ? seccion.querySelectorAll(".fragment.visible").length
        : 0;
      setPaso(actual);
      alCambiar?.(actual);
    };
    const leerLuego = () => requestAnimationFrame(leer);

    const alLlegar = (evento: Event) => {
      const { currentSlide, previousSlide } = evento as Event & {
        currentSlide?: HTMLElement;
        previousSlide?: HTMLElement;
      };
      const seccion = raiz.current?.closest("section");
      if (seccion && currentSlide === seccion) setVisita((v) => v + 1);
      const viniendoDeAtras =
        previousSlide && deck.getIndices(previousSlide).h < deck.getIndices().h;
      if (
        seccion &&
        currentSlide === seccion &&
        viniendoDeAtras &&
        seccion.querySelector(".fragment.visible")
      ) {
        const { h, v } = deck.getIndices();
        deck.slide(h, v, -1);
      }
      leerLuego();
    };

    deck.on("fragmentshown", leerLuego);
    deck.on("fragmenthidden", leerLuego);
    deck.on("slidechanged", alLlegar);
    leerLuego();

    return () => {
      deck.off("fragmentshown", leerLuego);
      deck.off("fragmenthidden", leerLuego);
      deck.off("slidechanged", alLlegar);
    };
  }, [deck, raiz, alCambiar]);

  return { paso, raiz, visita };
}
