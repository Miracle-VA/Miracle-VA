/**
 * The site's one icon family: Iconoir (MIT, iconoir.com), chosen from the
 * design library (build-system/07 §4: "light, precise outline" for minimal,
 * refined brands). Regular weight, 1.5 stroke, matched to the light type.
 * Import icons only from here so the family, size and stroke stay consistent.
 * All icons are decorative: their buttons and links carry the label.
 */
import {
  ArrowRight,
  ChatBubble,
  Check,
  Mail,
  Menu,
  NavArrowDown,
  Pause,
  Play,
  Xmark,
} from "iconoir-react/regular";
import type { ComponentType, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function icon(Glyph: ComponentType<IconProps>, size: number) {
  function Icon(props: IconProps) {
    return (
      <Glyph
        width={size}
        height={size}
        strokeWidth={1.5}
        aria-hidden="true"
        focusable="false"
        {...props}
      />
    );
  }
  Icon.displayName = `Icon(${Glyph.displayName ?? "Glyph"})`;
  return Icon;
}

/** Beside WhatsApp actions. A neutral bubble, not the WhatsApp brand mark. */
export const ChatIcon = icon(ChatBubble, 18);
/** Beside email actions. */
export const MailIcon = icon(Mail, 18);
export const ArrowRightIcon = icon(ArrowRight, 18);
/** Dropdown indicator: a chevron, the recognised signal for "opens a list". */
export const ChevronDownIcon = icon(NavArrowDown, 18);
/** Marquee pause/play control. */
export const PauseIcon = icon(Pause, 18);
export const PlayIcon = icon(Play, 18);
export const CheckIcon = icon(Check, 22);
export const MenuIcon = icon(Menu, 22);
export const CloseIcon = icon(Xmark, 22);
