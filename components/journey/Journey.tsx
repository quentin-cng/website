"use client";
import { Component, ReactNode, useCallback, useEffect, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import * as THREE from "three";
import World from "./World";
import Controller from "./Controller";
import Intro, { earthTexture } from "./Intro";
import Dialog from "./UI";
class SceneBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

function ContextGuard({ onLost }: { onLost: () => void }) {
  const { gl } = useThree();
  useEffect(() => {
    const canvas = gl.domElement;
    canvas.addEventListener("webglcontextlost", onLost);
    return () => canvas.removeEventListener("webglcontextlost", onLost);
  }, [gl, onLost]);
  return null;
}
export default function Journey() {
  const [mode, setMode] = useState<"loading" | "intro" | "world" | "fallback">(
    "loading",
  );
  const [map, setMap] = useState<THREE.Texture | null>(null);
  const [reduced, setReduced] = useState(false);
  const [near, setNear] = useState(false);
  const [dialog, setDialog] = useState<"project" | "resume" | null>(null);
  const [fade, setFade] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    let alive = true;
    let texture: THREE.Texture | undefined;
    const motion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduced(motion);
    const touch =
      matchMedia("(pointer: coarse)").matches || window.innerWidth < 700;
    setMobile(touch);
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2");
    if (!gl || touch) {
      gl?.getExtension("WEBGL_lose_context")?.loseContext();
      setMode("fallback");
      return;
    }
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    earthTexture()
      .then((t) => {
        texture = t;
        if (!alive) {
          t.dispose();
          return;
        }
        if (alive) {
          setMap(t);
          setMode(motion ? "world" : "intro");
        }
      })
      .catch(() => {
        if (alive) setMode("world");
      });
    return () => {
      alive = false;
      texture?.dispose();
    };
  }, []);
  const contextLost = useCallback(() => setMode("fallback"), []);
  const arrive = useCallback(() => {
    setMode("world");
    setFade(false);
  }, []);
  const beginFade = useCallback(() => setFade(true), []);
  const close = useCallback(() => {
    setDialog(null);
  }, []);
  const interact = useCallback(() => setDialog("project"), []);
  const escape = useCallback(() => {
    setPaused((v) => !v);
  }, []);
  const fallback = (
    <div className="fallback">
      <div className="fallback-orbit">↗</div>
      <p className="eyebrow">AIX-EN-PROVENCE → MONTRÉAL</p>
      <h1>
        A new place.
        <br />
        <em>A new perspective.</em>
      </h1>
      <p>
        {mobile
          ? "The 3D journey is designed for a desktop keyboard and mouse. Explore the first exhibit here, or return on desktop to walk through the courtyard."
          : "The 3D experience needs WebGL. You can still explore the first exhibit here."}
      </p>
      <button className="primary" onClick={interact}>
        Discover the first exhibit <span>↗</span>
      </button>
    </div>
  );
  return (
    <main className={`journey ${mode}`}>
      <SceneBoundary fallback={fallback}>
        {mode === "fallback"
          ? fallback
          : mode !== "loading" && (
              <Canvas
                shadows
                dpr={[1, 1.6]}
                camera={{
                  position: [-4.4, 3.8, 7.8],
                  fov: 45,
                  near: 0.1,
                  far: 180,
                }}
                gl={{ antialias: true, powerPreference: "high-performance" }}
                onCreated={({ gl }) => {
                  gl.toneMapping = THREE.ACESFilmicToneMapping;
                  gl.toneMappingExposure = 1;
                }}
              >
                <ContextGuard onLost={contextLost} />
                {mode === "intro" && map ? (
                  <Intro map={map} onFinish={arrive} onFade={beginFade} />
                ) : (
                  <>
                    <World
                      reduced={reduced}
                      near={near && !dialog && !paused}
                    />
                    <Controller
                      cinematic={dialog === "project"}
                      active={!dialog && !paused}
                      reduced={reduced}
                      onNear={setNear}
                      onInteract={interact}
                      onEscape={escape}
                    />
                  </>
                )}
              </Canvas>
            )}
      </SceneBoundary>
      <div className="vignette" />
      <header>
        <a className="brand" href="/" aria-label="The Journey home">
          <span className="brand-mark">↗</span> THE JOURNEY
          <span className="brand-sub">AN INTERACTIVE PORTFOLIO</span>
        </a>
        <div className="header-right">
          <span className="edition">VOL. 01 — A NEW BEGINNING</span>
          <button className="resume" onClick={() => setDialog("resume")}>
            Résumé <span>↗</span>
          </button>
        </div>
      </header>
      {mode === "loading" && (
        <div className="loading">
          <div className="loader-ring" />
          THE JOURNEY<span>Preparing your arrival</span>
        </div>
      )}
      {mode === "intro" && (
        <>
          <div className="intro-copy">
            <p className="eyebrow">EVERY JOURNEY STARTS SOMEWHERE</p>
            <h1>
              Across an ocean.
              <br />
              <em>Into possibility.</em>
            </h1>
            <p>From the south of France to a new chapter in Montréal.</p>
          </div>
          <div className="flight-info">
            <span>43.5297° N · 5.4474° E</span>
            <div>
              AIX-EN-PROVENCE <span> ───── ✈ ───── </span> MONTRÉAL
            </div>
            <span>45.5019° N · 73.5673° W</span>
          </div>
          <button className="skip" onClick={arrive}>
            Skip intro <span>↗</span>
          </button>
          <div className="film-top" />
          <div className="film-bottom" />
        </>
      )}
      {mode === "world" && (
        <>
          <div className="chapter">
            <p className="eyebrow">
              <span className="live-dot" /> CHAPTER 01 · MONTRÉAL
            </p>
            <h1>A new beginning.</h1>
            <p>Follow your curiosity. There’s a story around the corner.</p>
          </div>
          <div className="location">
            <span>45°30′ N &nbsp; 73°34′ W</span>
            <strong>The courtyard</strong>
            <small>GOLDEN HOUR · EARLY AUTUMN</small>
          </div>
          <div className="compass">
            <span>N</span>
            <i>↑</i>
            <small>MONTRÉAL, QC</small>
          </div>
          <footer>
            <div className="controls">
              <span>
                <kbd>W A S D</kbd> move
              </span>
              <span>
                <kbd>↔</kbd> drag to look
              </span>
              <span>
                <kbd>E</kbd> interact
              </span>
              <span>
                <kbd>ESC</kbd> pause
              </span>
            </div>
            <span className="explore-note">A SMALL WORLD. AN OPEN MIND.</span>
          </footer>
          {near && !dialog && !paused && (
            <button className="interact-button" onClick={interact}>
              <kbd>E</kbd> Discover the first exhibit <span>↗</span>
            </button>
          )}
          {paused && !dialog && (
            <div className="pause-card">
              <p className="eyebrow">TAKE YOUR TIME</p>
              <h2>A moment to pause.</h2>
              <button className="primary" onClick={() => setPaused(false)}>
                Continue exploring ↗
              </button>
            </div>
          )}
        </>
      )}
      {dialog && <Dialog kind={dialog} close={close} />}
      <div className={`transition-wash ${fade ? "visible" : ""}`} />
    </main>
  );
}
