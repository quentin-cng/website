export type Obstacle = {
  x: number;
  z: number;
  w: number;
  d: number;
  h: number;
  camera?: boolean;
};
export const spawn: [number, number, number] = [0, 0, 35];
export const bounds = { minX: -37, maxX: 37, minZ: -51, maxZ: 43 };
// Installation surfaces are flush with the hall floor. Only solid objects obstruct movement.
export const obstacles: Obstacle[] = [
  { x: -20, z: -27, w: 5.5, d: 2, h: 4, camera: true },
  { x: 15, z: -19, w: 1.2, d: 1.2, h: 2.2 },
  { x: 19, z: -18, w: 1.5, d: 1.5, h: 2.2 },
  { x: 0, z: -43, w: 5.6, d: 5.6, h: 5 },
  { x: -12, z: 30, w: 0.85, d: 3, h: 0.75 },
  { x: 12, z: 30, w: 0.85, d: 3, h: 0.75 },
  { x: -20, z: -31, w: 18, d: 5.8, h: 8, camera: true },
  { x: -27, z: -31, w: 8, d: 6.5, h: 5.5, camera: true },
  { x: -13, z: -31, w: 8, d: 6.5, h: 5.5, camera: true },
  { x: 26, z: -32, w: 5, d: 2, h: 4.5, camera: true },
  { x: 18, z: -28, w: 8, d: 1.5, h: 1.8 },
  { x: 28, z: -22, w: 1.5, d: 7, h: 1.8 },
  { x: -27, z: 5, w: 1, d: 9, h: 5, camera: true },
  { x: -20, z: 3, w: 5, d: 1.5, h: 1.2 },
  { x: -14, z: 8, w: 1.5, d: 1.5, h: 3 },
  { x: 25, z: 1, w: 10, d: 2.5, h: 7, camera: true },
  { x: 20, z: 12, w: 2.4, d: 2.4, h: 1.2 },
  { x: 18, z: 14, w: 1, d: 1, h: 1 },
  { x: 22, z: 10, w: 1, d: 1, h: 1 },
  ...[-36, 36].flatMap((x) =>
    [-40, -20, 0, 20, 40].map((z) => ({
      x,
      z,
      w: 1.2,
      d: 1.2,
      h: 23,
      camera: true,
    })),
  ),
  { x: 0, z: -54, w: 80, d: 2, h: 26, camera: true },
  { x: 0, z: 47, w: 80, d: 2, h: 26, camera: true },
  { x: -40, z: 0, w: 2, d: 110, h: 26, camera: true },
  { x: 40, z: 0, w: 2, d: 110, h: 26, camera: true },
];
export function isBlocked(x: number, z: number) {
  return (
    x < bounds.minX ||
    x > bounds.maxX ||
    z < bounds.minZ ||
    z > bounds.maxZ ||
    obstacles.some(
      (o) =>
        Math.abs(x - o.x) < o.w / 2 + 0.45 &&
        Math.abs(z - o.z) < o.d / 2 + 0.45,
    )
  );
}
