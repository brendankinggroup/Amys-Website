/* Pilates High — the breath line.
   A single horizontal line that widens on a four-second inhale and
   narrows on a six-second exhale, the ratio taught on the apparatus. */
(function () {
  var canvas = document.getElementById('breath-line');
  if (!canvas || !canvas.getContext) return;
  var ctx = canvas.getContext('2d');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var INHALE = 4000, EXHALE = 6000, CYCLE = INHALE + EXHALE;

  function stroke() {
    return getComputedStyle(document.body).color;
  }
  function accent() {
    return getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || stroke();
  }

  function draw(t) {
    var W = canvas.width, H = canvas.height, mid = H / 2;
    var phase = t % CYCLE;
    var p = phase < INHALE
      ? phase / INHALE
      : 1 - (phase - INHALE) / EXHALE;
    // ease in-out so the turn at the top of the breath is soft
    p = 0.5 - 0.5 * Math.cos(Math.PI * p);

    var minW = W * 0.28, maxW = W * 0.96;
    var half = (minW + (maxW - minW) * p) / 2;
    var lift = 18 * p; // the line rises slightly on the inhale

    ctx.clearRect(0, 0, W, H);

    // faint full-width baseline
    ctx.strokeStyle = stroke();
    ctx.globalAlpha = 0.18;
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(0, mid + 18); ctx.lineTo(W, mid + 18); ctx.stroke();

    // breathing line
    ctx.globalAlpha = 1;
    ctx.strokeStyle = accent();
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(W / 2 - half, mid + 18 - lift);
    ctx.lineTo(W / 2 + half, mid + 18 - lift);
    ctx.stroke();

    // end marks
    ctx.fillStyle = accent();
    ctx.beginPath(); ctx.arc(W / 2 - half, mid + 18 - lift, 3, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(W / 2 + half, mid + 18 - lift, 3, 0, Math.PI * 2); ctx.fill();
  }

  if (reduce) { draw(INHALE * 0.6); return; }

  var start = null;
  function frame(ts) {
    if (start === null) start = ts;
    draw(ts - start);
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
