import { Voronoi } from "./voronoi.js";

export const randomInt = () => {
  const ranges = [
    { min: 500, max: 700 },
    { min: 1000, max: 5000 },
    { min: 5000, max: 7000 },
  ];
  const { min, max } = ranges[Math.floor(Math.random() * ranges.length)];
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export function drawVoronoi(canvasId, nPoints) {
  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext("2d");
  const canvasWidth = canvas.clientWidth;
  const canvasHeight = canvas.clientHeight;
  const points = [];
  // Set canvas size
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  for (let i = 0; i < nPoints; i++) {
    points.push({
      x: Math.random() * canvasWidth,
      y: Math.random() * canvasHeight,
    });
  }

  const voronoi = new Voronoi();
  const bbox = { xl: 0, xr: canvasWidth, yt: 0, yb: canvasHeight };
  const diagram = voronoi.compute(points, bbox);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw Voronoi cells
  diagram.cells.forEach((cell) => {
    ctx.beginPath();
    ctx.moveTo(
      cell.halfedges[0].getStartpoint().x,
      cell.halfedges[0].getStartpoint().y
    );

    cell.halfedges.forEach((edge) => {
      const startPoint = edge.getStartpoint();
      ctx.lineTo(startPoint.x, startPoint.y);
    });

    ctx.closePath();

    const r = ([cell.site.voronoiId] * 3) % 255;
    const g = [cell.site.voronoiId * 5 + 1] % 255;
    const b = ((r * g) / (r + g)) % 255;
    ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, 0.5)`;
    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.2)`;
    ctx.stroke();
    ctx.fill();
  });
}
let i = 0;
window.addEventListener("resize", () => {
  i = i + 1;
  console.log(i);
  drawVoronoi("background", randomInt());
});

// Initialize on page load
window.addEventListener("load", drawVoronoi("background", randomInt()));

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("theme-toggle").addEventListener("click", (event) => {
    drawVoronoi("background", randomInt());
  });
});
