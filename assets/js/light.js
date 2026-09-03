/* Pilates High — light studies.
   Every element with data-light gets a soft, grainy wash of light drawn
   on a canvas: a stand-in for photography until the real images arrive,
   and the ground behind the line drawings of the apparatus. */
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var panels = document.querySelectorAll('[data-light]');
  if (!panels.length) return;

  function paint(canvas, variant) {
    var W = canvas.width, H = canvas.height;
    var ctx = canvas.getContext('2d');
    var cs = getComputedStyle(document.documentElement);
    var warm = cs.getPropertyValue('--light-warm').trim() || '#F1EAE0';
    var cool = cs.getPropertyValue('--light-cool').trim() || '#C9CFC4';
    var deep = cs.getPropertyValue('--light-deep').trim() || '#8E968C';

    ctx.fillStyle = cool;
    ctx.fillRect(0, 0, W, H);

    // a window of light, top-left or top-right depending on the variant
    var lx = variant === 'right' ? W * 0.82 : W * 0.18;
    var g = ctx.createRadialGradient(lx, H * 0.1, 0, lx, H * 0.1, Math.max(W, H) * 0.95);
    g.addColorStop(0, warm);
    g.addColorStop(0.45, cool);
    g.addColorStop(1, deep);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);

    // a soft shadow across the lower third, like a wall meeting a floor
    var s = ctx.createLinearGradient(0, H * 0.55, 0, H);
    s.addColorStop(0, 'rgba(0,0,0,0)');
    s.addColorStop(1, 'rgba(0,0,0,0.16)');
    ctx.fillStyle = s;
    ctx.fillRect(0, 0, W, H);

    // grain
    var img = ctx.getImageData(0, 0, W, H), d = img.data;
    for (var i = 0; i < d.length; i += 4) {
      var n = (Math.random() - 0.5) * 18;
      d[i] += n; d[i + 1] += n; d[i + 2] += n;
    }
    ctx.putImageData(img, 0, 0);
  }

  panels.forEach(function (el) {
    var c = document.createElement('canvas');
    c.width = 640; c.height = Math.round(640 * (el.clientHeight / Math.max(el.clientWidth, 1))) || 800;
    c.className = 'light-canvas';
    c.setAttribute('aria-hidden', 'true');
    el.insertBefore(c, el.firstChild);
    paint(c, el.getAttribute('data-light'));
  });

  // repaint on theme change so the wash follows the palette
  var mq = window.matchMedia('(prefers-color-scheme: dark)');
  if (mq.addEventListener) mq.addEventListener('change', function () {
    document.querySelectorAll('.light-canvas').forEach(function (c) { paint(c, c.parentNode.getAttribute('data-light')); });
  });
})();
