import { useEffect, useRef } from "react";

export default function CursorDemo() {
  const cursorRef = useRef(null);
  const rippleRef = useRef(null);
  // Track current cursor center position for curved path calculation
  const pos = useRef({ x: window.innerWidth / 2, y: window.innerHeight });

  useEffect(() => {
    let cancelled = false;
    const cursor = cursorRef.current;
    const ripple = rippleRef.current;
    const SIZE = 52;

    cursor.style.transition = "none";
    cursor.style.transform = `translate(${pos.current.x - SIZE / 2}px, ${pos.current.y - SIZE / 2}px)`;

    const wait = (ms) =>
      new Promise((r, reject) => {
        const t = setTimeout(r, ms);
        // Allow cancellation to abort pending waits
        const check = () => { if (cancelled) { clearTimeout(t); reject(new Error("cancelled")); } };
        setTimeout(check, 0);
      });

    const getCenter = (el) => {
      const rect = el.getBoundingClientRect();
      return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    };

    // Quadratic bezier: curved path between two points
    const moveTo = (el, duration = 700) =>
      new Promise((resolve) => {
        const { x: tx, y: ty } = getCenter(el);
        const sx = pos.current.x;
        const sy = pos.current.y;

        // Control point — offset perpendicular to the path for curvature
        const dx = tx - sx;
        const dy = ty - sy;
        const cx = (sx + tx) / 2 - dy * 0.28;
        const cy = (sy + ty) / 2 + dx * 0.28;

        const startTime = performance.now();

        const animate = (now) => {
          const raw = Math.min((now - startTime) / duration, 1);
          // Ease-in-out
          const t =
            raw < 0.5
              ? 2 * raw * raw
              : 1 - Math.pow(-2 * raw + 2, 2) / 2;

          // Quadratic bezier position
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
      ripple.style.transition =
        "transform 500ms ease-out, opacity 400ms ease-out 100ms";
      ripple.style.transform = "scale(1)";
      ripple.style.opacity = "0";
      el.click();
      await wait(500);
    };

    const findByText = (text, index = 0) => {
      const els = Array.from(
        document.querySelectorAll("button, label, a")
      ).filter((el) => el.textContent.trim() === text);
      return els[index] ?? null;
    };

    const findContainingText = (text, selector, index = 0) => {
      const els = Array.from(document.querySelectorAll(selector)).filter((el) =>
        el.textContent.includes(text)
      );
      return els[index] ?? null;
    };

    const findVisibleConfirm = () =>
      Array.from(document.querySelectorAll("button")).find(
        (b) => b.textContent.trim() === "Confirm" && b.offsetParent !== null
      ) ?? null;

    const runDemo = async () => {
      await wait(1200);

      // 1. Select and customize
      const selectBtn = findByText("Select and customize");
      if (!selectBtn) return;
      await moveTo(selectBtn);
      await tap(selectBtn);
      await wait(3000);

      // 2. Add a room (+)
      const plusBtn = document.querySelector('[data-demo="plus-btn"]');
      if (!plusBtn) return;
      await moveTo(plusBtn);
      await tap(plusBtn);
      await wait(1600);

      // 3. Edit bed preferences — room 1
      const editBtn1 = findContainingText("Edit bed preferences", "button", 0);
      if (!editBtn1) return;
      await moveTo(editBtn1);
      await tap(editBtn1);
      await wait(1600);

      // 4. Select Double bed
      const doubleBed = findContainingText("Double bed", "label");
      if (!doubleBed) return;
      await moveTo(doubleBed);
      await tap(doubleBed);
      await wait(1200);

      // 5. Confirm (room 1 detail)
      const confirm1 = findVisibleConfirm();
      if (!confirm1) return;
      await moveTo(confirm1);
      await tap(confirm1);
      await wait(1600);

      // 6. Edit bed preferences — room 2
      const editBtn2 = findContainingText("Edit bed preferences", "button", 1);
      if (!editBtn2) return;
      await moveTo(editBtn2);
      await tap(editBtn2);
      await wait(1600);

      // 7. Select Single Bed
      const singleBed = findContainingText("Single Bed", "label");
      if (!singleBed) return;
      await moveTo(singleBed);
      await tap(singleBed);
      await wait(1200);

      // 8. Confirm (room 2 detail)
      const confirm2 = findVisibleConfirm();
      if (!confirm2) return;
      await moveTo(confirm2);
      await tap(confirm2);
      await wait(1600);

      // 9. Confirm preferences (bottom sheet)
      const confirmPref = findVisibleConfirm();
      if (!confirmPref) return;
      await moveTo(confirmPref);
      await tap(confirmPref);
      await wait(8000);

      // 10. Reserve
      const reserve = findByText("Reserve");
      if (!reserve) return;
      await moveTo(reserve);
      await tap(reserve);
    };

    runDemo().catch(() => {});

    return () => { cancelled = true; };
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
