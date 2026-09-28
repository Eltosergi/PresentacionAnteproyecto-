import { useState } from "react";
import { Deck } from "@revealjs/react";
import "reveal.js/reveal.css";
import "reveal.js/theme/white.css";
import { Indice } from "./components/Indice";
import { Marco } from "./components/Marco";

const slideModules = import.meta.glob<{ default: React.ComponentType }>(
  "./slides/slide*.tsx",
  { eager: true },
);

const slides = Object.entries(slideModules)
  .map(([path, mod]) => {
    const order = Number(path.match(/slide(\d+)\.tsx$/)?.[1] ?? 0);
    return { order, Component: mod.default };
  })
  .sort((a, b) => a.order - b.order);

function App() {
  const [conMarco, setConMarco] = useState(false);
  const [seccion, setSeccion] = useState<number>();

  const alCambiarSlide = (slide?: HTMLElement) => {
    const datos = slide?.dataset;
    setConMarco(datos?.marco === "true");
    setSeccion(
      datos?.seccion === undefined ? undefined : Number(datos.seccion),
    );
  };

  return (
    <Deck
      config={{
        width: 960,
        height: 720,
        margin: 0,
        center: false,
        hash: true,
        controls: true,
        progress: true,
        transition: "slide",
      }}
      onReady={(deck) => alCambiarSlide(deck.getCurrentSlide())}
      onSlideChange={(event) => {
        const { currentSlide } = event as Event & {
          currentSlide?: HTMLElement;
        };
        alCambiarSlide(currentSlide);
      }}
    >
      <Marco visible={conMarco} />
      <Indice seccion={seccion} />
      {slides.map(({ order, Component }) => (
        <Component key={order} />
      ))}
    </Deck>
  );
}

export default App;
