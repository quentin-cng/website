import { useEffect, useRef } from "react";
import { firstProject as project } from "./interactions";
export default function Dialog({
  kind,
  close,
}: {
  kind: "project" | "resume";
  close: () => void;
}) {
  const button = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const prev = document.activeElement as HTMLElement;
    button.current?.focus();
    const listener = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "Tab") {
        e.preventDefault();
        button.current?.focus();
      }
    };
    window.addEventListener("keydown", listener);
    return () => {
      window.removeEventListener("keydown", listener);
      prev?.focus();
    };
  }, [close]);
  return (
    <div className="dialog-backdrop">
      <section
        className="project-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
      >
        <div className="panel-top">
          <span>
            {kind === "project" ? project.category : "THE JOURNEY / RÉSUMÉ"}
          </span>
          <button ref={button} onClick={close} aria-label="Close dialog">
            ✕
          </button>
        </div>
        <div className="project-symbol">{kind === "project" ? "◇" : "↗"}</div>
        <p className="eyebrow">
          {kind === "project"
            ? "A SPACE FOR WHAT COMES NEXT"
            : "A LITTLE MORE CONTEXT"}
        </p>
        <h2 id="dialog-title">
          {kind === "project" ? project.title : "The next page."}
        </h2>
        <p>
          {kind === "project"
            ? project.description
            : "A résumé has not been added yet. This button will link to the downloadable PDF when it is provided."}
        </p>
        <div className="panel-foot">
          <span>
            {kind === "project" ? "PLACEHOLDER EXHIBIT" : "COMING SOON"}
          </span>
          <span>ESC TO RETURN ↵</span>
        </div>
      </section>
    </div>
  );
}
