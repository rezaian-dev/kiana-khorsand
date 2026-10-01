"use client";

import { useEffect } from "react";
import { useReducedMotion } from "motion/react";
import { animate } from "motion/mini";
import { useTheme } from "next-themes";
import { motionTokens } from "@/lib/motion";

const selector = '[data-interact],.quiet-link,.desktop-nav a,.footer-grid nav a,.footer-socials a,.back-top,.service-card,.review-card,.queue-list a,.admin-select,.member-nav a,.admin-nav a,.menu-links a,.contact-links a,.carousel-dots button,.record-tabs a,.pagination a,.brand-calendar .rdp-button_previous,.brand-calendar .rdp-button_next';
const controls = '[data-interact="control"],.carousel-dots button,.brand-calendar .rdp-button_previous,.brand-calendar .rdp-button_next';
const blocked = '[inert],:disabled,[aria-disabled="true"],[data-disabled=""],[data-disabled="true"]';
type Frame = Record<string, string>;
type State = { hasHover: boolean; hasFocus: boolean; isPressed: boolean; frame: Frame };
type Playback = { animation: ReturnType<typeof animate>; styles: Record<string, { value: string; priority: string }> };

export function Interactions() {
  const isReduced = useReducedMotion();
  const { resolvedTheme } = useTheme();
  useEffect(() => {
    if (isReduced !== false) return;
    const hoverQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const canRegister = "registerProperty" in CSS;
    let states = new WeakMap<HTMLElement, State>();
    const active = new Map<HTMLElement, Playback>();
    const decorations = new Map<HTMLElement, Playback>();
    let pressed: HTMLElement | null = null;
    function restoreElement(element: HTMLElement, isDecoration = false) {
      const playbacks = isDecoration ? decorations : active;
      const playback = playbacks.get(element);
      if (!playback) return;
      playbacks.delete(element);
      playback.animation.cancel();
      for (const [property, { value, priority }] of Object.entries(playback.styles)) {
        if (value) element.style.setProperty(property, value, priority);
        else element.style.removeProperty(property);
      }
    }
    function playElement(element: HTMLElement, from: Frame, to: Frame, duration: number, isDecoration = false) {
      const playbacks = isDecoration ? decorations : active;
      restoreElement(element, isDecoration);
      const frames: Record<string, string[]> = {};
      const styles: Playback["styles"] = {};
      for (const [property, value] of Object.entries(to)) {
        const previous = from[property];
        if (previous === undefined || previous === value) continue;
        if (property.startsWith("--") && !canRegister) continue;
        frames[property] = [previous, value];
        const cssName = property.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
        styles[cssName] = { value: element.style.getPropertyValue(cssName), priority: element.style.getPropertyPriority(cssName) };
      }
      if (!Object.keys(frames).length) return;
      const animation = animate(element, frames, { duration, ease: motionTokens.ease });
      playbacks.set(element, { animation, styles });
      const finishAnimation = () => {
        if (playbacks.get(element)?.animation === animation) restoreElement(element, isDecoration);
      };
      void Promise.resolve(animation).then(finishAnimation, finishAnimation);
    }
    function getFrame(element: HTMLElement, state: State): Frame {
      const style = getComputedStyle(element);
      const hasHover = state.hasHover && hoverQuery.matches && !state.hasFocus;
      const shadow = state.hasFocus ? "--interaction-focus" : hasHover ? "--interaction-hover" : "--interaction-rest";
      const frame: Frame = {
        boxShadow: style.getPropertyValue(shadow).trim() || "none",
        translate: hasHover && !state.isPressed ? style.getPropertyValue("--interaction-lift").trim() || "0px" : "0px",
      };
      if (element.matches(controls)) frame.scale = state.isPressed ? ".98" : "1";
      if (element.matches('[data-interact="field"],.admin-select')) {
        const border = element.getAttribute("aria-invalid") === "true" ? "--destructive" : state.hasFocus ? "--ring" : "--input";
        frame.borderColor = style.getPropertyValue(border).trim();
      }
      if (element.matches('.quiet-link,.desktop-nav a,.footer-grid nav a,.back-top,.button-link')) frame["--feedback-line"] = state.hasHover || state.hasFocus || element.getAttribute("aria-current") === "page" ? "1" : "0";
      if (element.matches('.service-card,[data-interact="card"]')) frame["--feedback-media"] = hasHover ? "1.03" : "1";
      frame["--feedback-arrow"] = hasHover ? style.direction === "rtl" ? "-3px" : "3px" : "0px";
      if (element.matches(".button-primary")) {
        frame["--action-from"] = style.getPropertyValue(hasHover ? "--action-hover-from" : "--action-rest-from").trim();
        frame["--action-to"] = style.getPropertyValue(hasHover ? "--action-hover-to" : "--action-rest-to").trim();
      }
      return frame;
    }
    function updateElement(element: HTMLElement, kind: "hover" | "focus" | "press", isActive: boolean) {
      if (!element.isConnected || element.closest(blocked)) { restoreElement(element); states.delete(element); return; }
      const state = states.get(element) ?? {
        hasHover: kind === "hover" ? !isActive && hoverQuery.matches : hoverQuery.matches && element.matches(":hover"),
        hasFocus: kind === "focus" ? !isActive : document.activeElement !== null && element.contains(document.activeElement),
        isPressed: false, frame: {},
      };
      const previous = Object.keys(state.frame).length ? { ...state.frame } : getFrame(element, state);
      if (active.has(element)) {
        const style = getComputedStyle(element);
        for (const property of Object.keys(previous)) previous[property] = style.getPropertyValue(property.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`));
      }
      if (kind === "hover") state.hasHover = isActive;
      else if (kind === "focus") state.hasFocus = isActive;
      else state.isPressed = isActive;
      state.frame = getFrame(element, state);
      states.set(element, state);
      playElement(element, previous, state.frame, kind === "press" ? motionTokens.fast : motionTokens.quick);
    }
    function updateAncestors(target: EventTarget | null, related: EventTarget | null, kind: "hover" | "focus", isActive: boolean) {
      let element = target instanceof Element ? target.closest(selector) : null;
      while (element) {
        if (element instanceof HTMLElement && !(related instanceof Node && element.contains(related))) updateElement(element, kind, isActive);
        element = element.parentElement?.closest(selector) ?? null;
      }
    }
    function handleRelease() {
      if (pressed) updateElement(pressed, "press", false);
      pressed = null;
    }
    function handlePointer(event: PointerEvent) {
      if (!hoverQuery.matches || event.pointerType === "touch" || (event.type === "pointerover" && event.buttons !== 0)) return;
      updateAncestors(event.target, event.relatedTarget, "hover", event.type === "pointerover");
    }
    function handlePress(event: PointerEvent | KeyboardEvent) {
      if (event instanceof KeyboardEvent && (event.repeat || ![" ", "Enter"].includes(event.key))) return;
      if (event instanceof PointerEvent && event.button !== 0) return;
      const element = event.target instanceof Element ? event.target.closest(controls) : null;
      if (!(element instanceof HTMLElement) || !element.matches('button,a,[role="button"],[role="tab"],[role="menuitem"],[role="option"]') || element.closest(blocked)) return;
      handleRelease();
      pressed = element;
      updateElement(element, "press", true);
    }
    function handleKeyup(event: KeyboardEvent) { if ([" ", "Enter"].includes(event.key)) handleRelease(); }
    function handleFocus(event: FocusEvent) {
      if (event.type === "focusout") handleRelease();
      updateAncestors(event.target, event.relatedTarget, "focus", event.type === "focusin");
    }
    function handleClear() {
      handleRelease();
      for (const element of active.keys()) restoreElement(element);
      for (const element of decorations.keys()) restoreElement(element, true);
      states = new WeakMap<HTMLElement, State>();
    }
    // Observe decoration only; never take over Radix state, mounting, focus or layout.
    const observer = new MutationObserver((records) => {
      for (const record of records) {
        const element = record.target;
        if (!(element instanceof HTMLElement)) continue;
        if (record.attributeName === "aria-current" && element.matches(".carousel-dots button")) {
          const isSelected = element.getAttribute("aria-current") === "true";
          playElement(element, { "--feedback-dot": record.oldValue === "true" ? "1" : ".36" }, { "--feedback-dot": isSelected ? "1" : ".36" }, motionTokens.quick, true);
        } else if (record.attributeName === "data-state" && record.oldValue !== element.dataset.state) {
          const isTab = element.matches('[data-slot="tabs-trigger"]');
          const isAccordion = element.matches('[data-slot="accordion-trigger"]');
          if (!isTab && !isAccordion) continue;
          const property = isTab ? "--feedback-line" : "--feedback-turn";
          const isActive = element.dataset.state === (isTab ? "active" : "open");
          const end = isTab ? "1" : "180deg";
          const start = isTab ? "0" : "0deg";
          playElement(element, { [property]: isActive ? start : end }, { [property]: isActive ? end : start }, motionTokens.quick, true);
        } else if (element.matches(".brand-toast") && (record.attributeName === "data-mounted" || record.attributeName === "data-removed") && record.oldValue !== "true") {
          const isRemoved = element.dataset.removed === "true";
          if (element.dataset.mounted !== "true") continue;
          playElement(element, { opacity: isRemoved ? "1" : "0", translate: isRemoved ? "0px" : "0 8px" }, { opacity: isRemoved ? "0" : "1", translate: isRemoved ? "0 8px" : "0px" }, isRemoved ? motionTokens.fast : motionTokens.quick, true);
        } else if (record.attributeName !== "data-state" && element.matches(selector)) {
          restoreElement(element);
          restoreElement(element, true);
          states.delete(element);
        }
      }
    });
    observer.observe(document.body, { subtree: true, attributes: true, attributeOldValue: true, attributeFilter: ["aria-current", "data-state", "data-mounted", "data-removed", "disabled", "aria-disabled", "data-disabled", "aria-invalid"] });
    document.addEventListener("pointerover", handlePointer, { passive: true });
    document.addEventListener("pointerout", handlePointer, { passive: true });
    document.addEventListener("pointerdown", handlePress, { passive: true });
    document.addEventListener("pointerup", handleRelease, { passive: true });
    document.addEventListener("pointercancel", handleRelease, { passive: true });
    document.addEventListener("keydown", handlePress);
    document.addEventListener("keyup", handleKeyup);
    document.addEventListener("focusin", handleFocus);
    document.addEventListener("focusout", handleFocus);
    document.addEventListener("visibilitychange", handleClear);
    window.addEventListener("blur", handleClear);
    hoverQuery.addEventListener("change", handleClear);
    return () => {
      observer.disconnect();
      handleClear();
      document.removeEventListener("pointerover", handlePointer);
      document.removeEventListener("pointerout", handlePointer);
      document.removeEventListener("pointerdown", handlePress);
      document.removeEventListener("pointerup", handleRelease);
      document.removeEventListener("pointercancel", handleRelease);
      document.removeEventListener("keydown", handlePress);
      document.removeEventListener("keyup", handleKeyup);
      document.removeEventListener("focusin", handleFocus);
      document.removeEventListener("focusout", handleFocus);
      document.removeEventListener("visibilitychange", handleClear);
      window.removeEventListener("blur", handleClear);
      hoverQuery.removeEventListener("change", handleClear);
    };
  }, [isReduced, resolvedTheme]);
  return null;
}
