export const createCanvas = function () {
  const canvas = document.createElement("canvas");
  canvas.id = "canvas";
  canvas.width = 1024;
  canvas.height = 768;
  return canvas;
};
