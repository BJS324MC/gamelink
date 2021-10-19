function dark() {
  for (let e of document.querySelectorAll("div")) e.classList.toggle("dark");
  document.querySelector("section").classList.toggle("dark");
  document.body.classList.toggle("dark");
}
function rand() {
  let r = Math.random() > 0.5, f = bubbles.length,
    b = new Bubble({
      x: info.width / 2 * Math.random() + (r ? 0 : info.width / 2),
      y: info.height,
      vx: r ? 12 * ws : -12 * ws,
      vy: -Math.random() * info.height / 60 - 6,
      fx: r ? -0.1 : 0.1,
      fy: 0.15,
      minx: r ? ws : -ws,
      miny: 0.5,
      min: [!r, true],
      col: [Math.random() * 255, Math.random() * 255, Math.random() * 255].toString(),
      r: Math.random() * 70 + 40
    });
  bubbles.push(b);
}
const info = document.querySelector("section").getBoundingClientRect();
const back = document.getElementById("background"), backctx = back.getContext('2d');
const ws = info.width / 1124; ws /= 1.5;
back.width = info.width;
back.height = info.height;
let bubbles = [], delay = 0;
function expand(n = 0) {
  let g = document.querySelectorAll("section > div");
  for (let i = 0; i < g.length; i++)if (i !== n) g[i].classList.toggle("shrink");
  g[n].classList.toggle("expand");
}
function loop() {
  if (Date.now() > delay) {
    delay = Date.now() + 200;
    rand();
  }
  info = document.querySelector("section").getBoundingClientRect();
  back.width = info.width;
  back.height = info.height;
  backctx.clearRect(0, 0, info.width, info.height);
  for (let i = 0; i < bubbles.length; i++) {
    let b = bubbles[i];
    if ((b.vx > 0 && b.x - b.r > info.width) || (b.vx < 0 && b.x + b.r < 0)) {
      bubbles.splice(i, 1);
      i--;
    }
    b.draw();
    b.move();
  };
  requestAnimationFrame(loop);
}
const g = document.querySelectorAll("section > div");
for (let i = 0; i < g.length; i++)g[i].addEventListener("click", () => expand(i));
setTimeout(loop, 500);