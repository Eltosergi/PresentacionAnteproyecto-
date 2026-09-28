import { COLORES_TEMAS } from "./agenda";

const CORTOS = ["Problema", "Objetivos", "Metodología", "Planificación"];

// Columna de secciones en la esquina superior derecha de la franja azul,
// con la sección actual iluminada en su color.
export function Indice({ seccion }: { seccion?: number }) {
  const visible = seccion !== undefined;

  return (
    <div
      className="pointer-events-none absolute right-[24px] top-[16px] z-0 flex w-[172px] flex-col gap-[3px]"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 400ms" }}
    >
      {CORTOS.map((corto, i) => {
        const actual = i === seccion;
        const color = COLORES_TEMAS[i];
        return (
          <div
            key={corto}
            className="flex h-[24px] items-center gap-2 rounded-md px-2 text-[15px] font-bold"
            style={{
              backgroundColor: actual ? color : "transparent",
              color: actual ? "#002344" : "#b7c9df",
              transition: "background-color 500ms, color 500ms",
            }}
          >
            <span
              className="h-[8px] w-[8px] shrink-0 rounded-full"
              style={{ backgroundColor: actual ? "#002344" : color }}
            />
            {i + 1}. {corto}
          </div>
        );
      })}
    </div>
  );
}
