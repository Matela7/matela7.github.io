/* A small, decorative constellation. No libraries or network requests. */
(() => {
  "use strict";
  const canvas = document.querySelector("#ambient-canvas");
  const context = canvas?.getContext("2d");
  if (!context) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const finePointer = window.matchMedia("(pointer: fine)");
  let width = 0;
  let height = 0;
  let nodes = [];
  let frame = null;
  let previousTime = 0;
  let activeTime = 0;
  let lastFrame = 0;
  let ripples = [];
  const pointer = { x: 0, y: 0, targetX: 0, targetY: 0, active: false };

  // Fixed positions keep the pattern stable across redraws and preference changes.
  const fraction = (value) => value - Math.floor(value);
  const noise = (seed) => fraction(Math.sin(seed * 127.1 + 311.7) * 43758.5453);

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    const count = Math.min(
      76,
      Math.max(22, Math.round((width * height) / 18000)),
    );
    nodes = Array.from({ length: count }, (_, index) => ({
      x: noise(index + 1) * width,
      y: noise(index + 117) * height,
      phase: noise(index + 231) * Math.PI * 2,
      radius: 0.8 + noise(index + 349) * 1.1,
    }));
    pointer.x = pointer.targetX = width * 0.74;
    pointer.y = pointer.targetY = height * 0.3;
    ripples = [];
    draw();
  }

  function draw() {
    const motion = !reducedMotion.matches;
    const time = motion ? activeTime : 0;
    context.clearRect(0, 0, width, height);

    const glowX = pointer.active
      ? pointer.x
      : width * (0.76 + Math.sin(time * 0.09) * 0.1);
    const glowY = pointer.active
      ? pointer.y
      : height * (0.28 + Math.cos(time * 0.12) * 0.12);
    const glow = context.createRadialGradient(
      glowX,
      glowY,
      0,
      glowX,
      glowY,
      Math.min(140, width * 0.3),
    );
    glow.addColorStop(0, "rgba(111, 155, 92, 0.17)");
    glow.addColorStop(0.55, "rgba(120, 152, 96, 0.07)");
    glow.addColorStop(1, "rgba(120, 152, 96, 0)");
    context.fillStyle = glow;
    context.fillRect(0, 0, width, height);

    const positions = nodes.map((node) => {
      const x = node.x + (motion ? Math.sin(time * 0.22 + node.phase) * 14 : 0);
      const y = node.y + (motion ? Math.cos(time * 0.18 + node.phase) * 12 : 0);
      const proximity =
        pointer.active && motion
          ? Math.max(0, 1 - Math.hypot(x - pointer.x, y - pointer.y) / 140)
          : 0;
      return { x, y, proximity, radius: node.radius };
    });
    const connectionDistance = Math.min(170, Math.max(100, width * 0.15));
    for (let index = 0; index < positions.length; index++) {
      const point = positions[index];
      for (let other = index + 1; other < positions.length; other++) {
        const next = positions[other];
        const distance = Math.hypot(point.x - next.x, point.y - next.y);
        if (distance > connectionDistance) continue;
        const opacity =
          (1 - distance / connectionDistance) *
          (0.22 + Math.max(point.proximity, next.proximity) * 0.3);
        context.strokeStyle = `rgba(145, 176, 132, ${opacity})`;
        context.lineWidth = 1;
        context.beginPath();
        context.moveTo(point.x, point.y);
        context.lineTo(next.x, next.y);
        context.stroke();
      }
      context.beginPath();
      context.arc(
        point.x,
        point.y,
        point.radius + point.proximity * 1.6,
        0,
        Math.PI * 2,
      );
      context.fillStyle = `rgba(145, 176, 132, ${0.3 + point.proximity * 0.4})`;
      context.fill();
      if (point.proximity > 0.55) {
        context.beginPath();
        context.arc(point.x, point.y, point.radius + 5, 0, Math.PI * 2);
        context.strokeStyle = `rgba(201, 155, 112, ${(point.proximity - 0.55) * 0.4})`;
        context.lineWidth = 0.7;
        context.stroke();
      }
    }
    ripples = ripples.filter((ripple) => time - ripple.started < 1.1);
    for (const ripple of ripples) {
      const progress = (time - ripple.started) / 1.1;
      context.beginPath();
      context.arc(ripple.x, ripple.y, 10 + progress * 70, 0, Math.PI * 2);
      context.strokeStyle = `rgba(150, 182, 123, ${(1 - progress) * 0.2})`;
      context.lineWidth = 1;
      context.stroke();
    }
  }

  function animate(timestamp) {
    frame = null;
    if (document.hidden || reducedMotion.matches) return;
    // 30 fps is enough for a slow background and avoids unnecessary rendering.
    if (timestamp - lastFrame >= 1000 / 30) {
      activeTime += previousTime
        ? Math.min((timestamp - previousTime) / 1000, 0.1)
        : 0;
      previousTime = timestamp;
      lastFrame = timestamp;
      pointer.x += (pointer.targetX - pointer.x) * 0.13;
      pointer.y += (pointer.targetY - pointer.y) * 0.13;
      draw();
    }
    frame = window.requestAnimationFrame(animate);
  }

  function syncAnimation() {
    if (frame !== null) window.cancelAnimationFrame(frame);
    frame = null;
    previousTime = 0;
    lastFrame = 0;
    if (document.hidden || reducedMotion.matches) {
      ripples = [];
      draw();
    } else {
      frame = window.requestAnimationFrame(animate);
    }
  }

  window.addEventListener("resize", resize, { passive: true });
  window.addEventListener(
    "pointermove",
    (event) => {
      if (
        reducedMotion.matches ||
        !finePointer.matches ||
        event.pointerType === "touch"
      )
        return;
      pointer.active = true;
      pointer.targetX = event.clientX;
      pointer.targetY = event.clientY;
    },
    { passive: true },
  );
  document.documentElement.addEventListener("pointerleave", () => {
    pointer.active = false;
  });
  window.addEventListener("blur", () => {
    pointer.active = false;
  });
  window.addEventListener(
    "pointerdown",
    (event) => {
      if (
        reducedMotion.matches ||
        !finePointer.matches ||
        event.pointerType === "touch" ||
        event.button !== 0
      )
        return;
      if (
        event.target instanceof Element &&
        event.target.closest("a, button, input, select, textarea, summary")
      )
        return;
      ripples.push({ x: event.clientX, y: event.clientY, started: activeTime });
      if (ripples.length > 3) ripples.shift();
    },
    { passive: true },
  );
  document.addEventListener("visibilitychange", syncAnimation);
  reducedMotion.addEventListener("change", syncAnimation);
  resize();
  syncAnimation();
})();
