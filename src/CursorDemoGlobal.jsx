import { useEffect, useRef } from "react";

export default function CursorDemoGlobal() {
  const cursorRef = useRef(null);
  const rippleRef = useRef(null);
  const pos = useRef({ x: window.innerWidth / 4, y: window.innerHeight });
  const paused = useRef(false);

  useEffect(() => {
    let cancelled = false;
    const cursor = cursorRef.current;
    const ripple = rippleRef.current;
    const SIZE = 52;

    cursor.style.transition = "none";
    cursor.style.transform = `translate(${pos.current.x - SIZE / 2}px, ${pos.current.y - SIZE / 2}px)`;

    const wait = (ms) =>
      new Promise((r, reject) => {
        let remaining = ms;
        let lastTime = performance.now();
        const tick = () => {
          if (cancelled) { reject(new Error("cancelled")); return; }
          const now = performance.now();
          if (!paused.current) remaining -= now - lastTime;
          lastTime = now;
          if (remaining <= 0) { r(); return; }
          setTimeout(tick, 50);
        };
        setTimeout(tick, 10);
      });

    const getCenter = (el) => {
      const rect = el.getBoundingClientRect();
      return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    };

    const moveTo = (el, duration = 700) =>
      new Promise((resolve, reject) => {
        const { x: tx, y: ty } = getCenter(el);
        const sx = pos.current.x;
        const sy = pos.current.y;
        const dx = tx - sx;
        const dy = ty - sy;
        const cx = (sx + tx) / 2 - dy * 0.28;
        const cy = (sy + ty) / 2 + dx * 0.28;
        let elapsed = 0;
        let lastTime = null;

        const animate = (now) => {
          if (cancelled) { reject(new Error("cancelled")); return; }
          if (lastTime !== null && !paused.current) elapsed += now - lastTime;
          lastTime = now;
          const raw = Math.min(elapsed / duration, 1);
          const t = raw < 0.5 ? 2 * raw * raw : 1 - Math.pow(-2 * raw + 2, 2) / 2;
          const bx = (1 - t) * (1 - t) * sx + 2 * (1 - t) * t * cx + t * t * tx;
          const by = (1 - t) * (1 - t) * sy + 2 * (1 - t) * t * cy + t * t * ty;
          cursor.style.transition = "none";
          cursor.style.transform = `translate(${bx - SIZE / 2}px, ${by - SIZE / 2}px)`;
          if (raw < 1) {
            requestAnimationFrame(animate);
          } else {
            pos.current = { x: tx, y: ty };
            resolve();
          }
        };
        requestAnimationFrame(animate);
      });

    const tap = async (el) => {
      const { x, y } = getCenter(el);
      const R = 66;
      ripple.style.transition = "none";
      ripple.style.width = `${R}px`;
      ripple.style.height = `${R}px`;
      ripple.style.left = `${x - R / 2}px`;
      ripple.style.top = `${y - R / 2}px`;
      ripple.style.transform = "scale(0)";
      ripple.style.opacity = "0.5";
      await wait(30);
      ripple.style.transition = "transform 500ms ease-out, opacity 400ms ease-out 100ms";
      ripple.style.transform = "scale(1)";
      ripple.style.opacity = "0";
      el.click();
      await wait(500);
    };

    // Scoped helpers — search only within a given frame container
    const inFrameByText = (frame, selector, text, index = 0) =>
      Array.from(frame.querySelectorAll(selector))
        .filter((el) => el.textContent.includes(text))[index] ?? null;

    const inFrameExact = (frame, selector, text, index = 0) =>
      Array.from(frame.querySelectorAll(selector))
        .filter((el) => el.textContent.trim() === text)[index] ?? null;

    const inFrameVisibleConfirm = (frame, text = "Confirm") =>
      Array.from(frame.querySelectorAll("button")).find(
        (b) => b.textContent.trim() === text && b.offsetParent !== null
      ) ?? null;

    // ── Phase 1: BottomSheet ──────────────────────────────────────────────────
    const runBottomSheet = async () => {
      const bs = document.querySelector('[data-demo="bs-frame"]');
      if (!bs) return;

      await wait(1200);

      // 1. Select and customize
      const selectBtn = inFrameExact(bs, "button", "Select and customize");
      if (!selectBtn) return;
      await moveTo(selectBtn);
      await tap(selectBtn);
      await wait(2000);

      // 2. Add a room
      const plusBtn = bs.querySelector('[data-demo="plus-btn"]');
      if (!plusBtn) return;
      await moveTo(plusBtn);
      await tap(plusBtn);
      await wait(1600);

      // 3. Edit bed preferences — room 1
      const editBtn1 = inFrameByText(bs, "button", "Edit bed preferences", 0);
      if (!editBtn1) return;
      await moveTo(editBtn1);
      await tap(editBtn1);
      await wait(1600);

      // 4. Select 1 Double bed
      const doubleBed = inFrameByText(bs, "label", "1 Double bed");
      if (!doubleBed) return;
      await moveTo(doubleBed);
      await tap(doubleBed);
      await wait(1200);

      // 5. Confirm (room 1 detail)
      const confirm1 = inFrameVisibleConfirm(bs);
      if (!confirm1) return;
      await moveTo(confirm1);
      await tap(confirm1);
      await wait(1600);

      // 6. Edit bed preferences — room 2
      const editBtn2 = inFrameByText(bs, "button", "Edit bed preferences", 1);
      if (!editBtn2) return;
      await moveTo(editBtn2);
      await tap(editBtn2);
      await wait(1600);

      // 7. Select 2 Single beds
      const singleBed = inFrameByText(bs, "label", "2 Single beds");
      if (!singleBed) return;
      await moveTo(singleBed);
      await tap(singleBed);
      await wait(1200);

      // 8. Confirm (room 2 detail)
      const confirm2 = inFrameVisibleConfirm(bs);
      if (!confirm2) return;
      await moveTo(confirm2);
      await tap(confirm2);
      await wait(1600);

      // 9. Confirm preferences (bottom sheet)
      const confirmPref = inFrameVisibleConfirm(bs);
      if (!confirmPref) return;
      await moveTo(confirmPref);
      await tap(confirmPref);
      await wait(3000);

      // 10. Reserve
      const reserve = inFrameExact(bs, "button", "Reserve");
      if (!reserve) return;
      await moveTo(reserve);
      await tap(reserve);
    };

    // ── Phase 2: FullScreen ───────────────────────────────────────────────────
    const runFullScreen = async () => {
      const fs = document.querySelector('[data-demo="fs-frame"]');
      if (!fs) return;

      await wait(3000);

      // 1. Select and Customize
      const selectBtn = inFrameExact(fs, "button", "Select and Customize");
      if (!selectBtn) return;
      await moveTo(selectBtn);
      await tap(selectBtn);
      await wait(3000);

      // 2. Add a room
      const plusBtn = fs.querySelector('[data-demo="fs-plus-btn"]');
      if (!plusBtn) return;
      await moveTo(plusBtn);
      await tap(plusBtn);
      await wait(1600);

      // 3. Room 1 — select "1 double bed"
      const doubleBed = inFrameByText(fs, "label", "1 double bed", 0);
      if (!doubleBed) return;
      await moveTo(doubleBed);
      await tap(doubleBed);
      await wait(1200);

      // 4. Room 2 — select "2 single beds"
      const singleBeds = inFrameByText(fs, "label", "2 single beds", 1);
      if (!singleBeds) return;
      await moveTo(singleBeds);
      await tap(singleBeds);
      await wait(1200);

      // 5. Confirm Preferences
      const confirmPref = inFrameVisibleConfirm(fs, "Confirm Preferences");
      if (!confirmPref) return;
      await moveTo(confirmPref);
      await tap(confirmPref);
      await wait(3000);

      // 6. Reserve
      const reserve = inFrameExact(fs, "button", "Reserve");
      if (!reserve) return;
      await moveTo(reserve);
      await tap(reserve);
    };

    const runDemo = async () => {
      await runBottomSheet();
      await runFullScreen();

      // Move away and fade out
      await wait(400);
      cursor.style.transition = "transform 900ms cubic-bezier(0.4, 0, 1, 1), opacity 600ms ease-in 300ms";
      cursor.style.transform = `translate(${pos.current.x + 80 - SIZE / 2}px, ${pos.current.y + 80 - SIZE / 2}px)`;
      cursor.style.opacity = "0";
    };

    runDemo().catch(() => {});

    // Pause on hover over device frames
    const handleMouseEnter = () => { paused.current = true; };
    const handleMouseLeave = () => { paused.current = false; };

    // Stop on user click (pointerdown avoids triggering on el.click() calls)
    const handlePointerDown = () => {
      cancelled = true;
      cursor.style.transition = "opacity 300ms ease-out";
      cursor.style.opacity = "0";
      ripple.style.transition = "opacity 300ms ease-out";
      ripple.style.opacity = "0";
    };

    const frames = document.querySelectorAll('[data-demo]');
    frames.forEach(f => {
      f.addEventListener('mouseenter', handleMouseEnter);
      f.addEventListener('mouseleave', handleMouseLeave);
    });
    document.addEventListener('pointerdown', handlePointerDown);

    return () => {
      cancelled = true;
      frames.forEach(f => {
        f.removeEventListener('mouseenter', handleMouseEnter);
        f.removeEventListener('mouseleave', handleMouseLeave);
      });
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 52,
          height: 52,
          borderRadius: "50%",
          background: "rgba(60, 60, 60, 0.38)",
          border: "2px solid rgba(255, 255, 255, 0.65)",
          boxShadow: "0 2px 12px rgba(0,0,0,0.25)",
          zIndex: 9999,
          pointerEvents: "none",
        }}
      />
      <div
        ref={rippleRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          borderRadius: "50%",
          background: "rgba(40, 40, 40, 0.22)",
          zIndex: 9998,
          pointerEvents: "none",
          opacity: 0,
        }}
      />
    </>
  );
}
