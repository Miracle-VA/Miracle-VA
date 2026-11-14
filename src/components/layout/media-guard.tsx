"use client";

// Client component: document-level listeners only; renders nothing.

import { useEffect } from "react";

const isMedia = (target: EventTarget | null) =>
  target instanceof Element && target.closest("img, video, picture, [data-protected]") !== null;

/**
 * Discourages saving her photos and videos (client request, 2026-11-14):
 * no right-click menu and no dragging on images and video. Together with
 * the CSS in globals.css (no long-press save on phones, no selection) and
 * `controlsList="nodownload"` on any video, this removes the casual ways to
 * save media.
 *
 * It is a deterrent, not protection: anything a browser displays can still be
 * screenshotted or taken from developer tools. Text stays selectable.
 */
export function MediaGuard() {
  useEffect(() => {
    const block = (event: Event) => {
      if (isMedia(event.target)) event.preventDefault();
    };
    document.addEventListener("contextmenu", block);
    document.addEventListener("dragstart", block);
    return () => {
      document.removeEventListener("contextmenu", block);
      document.removeEventListener("dragstart", block);
    };
  }, []);
  return null;
}
