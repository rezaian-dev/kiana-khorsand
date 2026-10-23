import { BrandMark } from "@/components/shared/brand-mark";

/**
 * Launch screen for the installed app.
 *
 * Rendered on the server and hidden in a browser tab, so it costs nothing there and
 * appears instantly in standalone mode — before React, before the database, before the
 * first paint of the page underneath. Everything is CSS: the running app may still be
 * waiting for data, but the screen never waits for JavaScript.
 *
 * The OS paints its own splash from `background_color` in the manifest; this screen
 * uses the same colour, so the hand-over is invisible.
 */
export function BootSplash() {
  return (
    <div className="boot-splash" id="boot-splash">
      <div className="boot-aurora" aria-hidden="true">
        <span className="boot-glow boot-glow-a" />
        <span className="boot-glow boot-glow-b" />
        <span className="boot-grain" />
      </div>

      <div className="boot-center">
        <div className="boot-mark">
          <span className="boot-ring" aria-hidden="true" />
          <BrandMark
            size={52}
            className="relative z-[1] scale-[1.45] rounded-[16px]"
          />
        </div>
        <p className="boot-word">کیانا خرسند</p>
        <p className="boot-tag">روان‌شناس بالینی · همراهِ مسیر</p>

        <div className="boot-loader" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <p className="boot-note" role="status">
          در حال آماده‌سازی فضای امن شما…
        </p>
      </div>
    </div>
  );
}
