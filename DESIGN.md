---
name: Ellipsa
description: A post room after hours. Every person has a pigeonhole; whatever sticks out is what you owe.
colors:
  ground: "#0E1426"
  ground-raised: "#121A31"
  rack-enamel: "#16264F"
  rule: "#2A3A63"
  paper: "#E9ECEF"
  paper-ink: "#141A2B"
  paper-muted: "#46506A"
  text-muted: "#A9B4CC"
  plate-text: "#C9D1E6"
  brass: "#D9A441"
  brass-hi: "#ECC170"
  brass-lo: "#A97A24"
  brass-ink: "#2B1E04"
  promise-amber: "#F2B544"
  signal-red: "#E2553F"
  waiting-grey: "#B7C0D3"
  stamp-amber: "#9A5B00"
  stamp-red: "#B2321F"
  field: "#FFFFFF"
  field-stroke: "#8D97AE"
typography:
  display:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(2.3rem, 4.1vw, 3.9rem)"
    fontWeight: 760
    lineHeight: 1.04
    letterSpacing: "-0.025em"
    fontVariation: "'wdth' 116"
  headline:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(2rem, 3.8vw, 3.4rem)"
    fontWeight: 720
    lineHeight: 1.04
    letterSpacing: "-0.025em"
    fontVariation: "'wdth' 112"
  title:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(1.6rem, 2.6vw, 2.3rem)"
    fontWeight: 720
    lineHeight: 1.04
    letterSpacing: "-0.025em"
    fontVariation: "'wdth' 112"
  slip-title:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1.2rem"
    fontWeight: 720
    lineHeight: 1.04
    letterSpacing: "-0.01em"
    fontVariation: "'wdth' 108"
  body:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
    fontVariation: "'wdth' 100"
  label:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "0.72rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.08em"
    fontVariation: "'wdth' 125"
  stamp:
    fontFamily: "Stamp, ui-monospace, monospace"
    fontSize: "0.78rem"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "0.04em"
rounded:
  entry: "2px"
  slip: "3px"
  plate: "4px"
spacing:
  gutter: "clamp(16px, 4vw, 56px)"
  section: "clamp(72px, 10vw, 140px)"
  cell: "6px"
  slip-gap: "14px"
  plate-gap: "20px"
  stack: "24px"
  block: "56px"
components:
  button-brass:
    backgroundColor: "{colors.brass}"
    textColor: "{colors.brass-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.plate}"
    padding: "0.95em 1.4em"
  button-brass-small:
    backgroundColor: "{colors.brass}"
    textColor: "{colors.brass-ink}"
    rounded: "{rounded.plate}"
    padding: "0.7em 1em"
  name-tab:
    backgroundColor: "{colors.brass-lo}"
    textColor: "{colors.brass-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.slip}"
    padding: "6px 10px"
  name-tab-selected:
    backgroundColor: "{colors.brass}"
    textColor: "{colors.brass-ink}"
  slip:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.paper-ink}"
    rounded: "{rounded.slip}"
    padding: "18px 20px 16px"
  log-entry:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.paper-ink}"
    rounded: "{rounded.entry}"
    padding: "0 22px 24px"
  enamel-plate:
    backgroundColor: "{colors.rack-enamel}"
    textColor: "{colors.plate-text}"
    rounded: "{rounded.plate}"
    padding: "34px 30px 30px"
  pigeonhole-cell:
    backgroundColor: "{colors.ground-raised}"
    textColor: "{colors.paper}"
  input-email:
    backgroundColor: "{colors.field}"
    textColor: "{colors.paper-ink}"
    rounded: "{rounded.plate}"
    padding: "0.8em 1em"
  nav-link:
    textColor: "{colors.text-muted}"
  nav-link-hover:
    textColor: "{colors.paper}"
---

# Design System: Ellipsa

## Overview

**Creative North Star: "The Post Room After Hours"**

The whole system is one room: a deep enamel-navy steel sorting rack standing in a near-black navy room, lit by a single warm lamp from the top left. Every person the user works with has a pigeonhole with a brass name plate; paper slips sit in the holes, and the coloured edge of a slip says what kind of debt it is. The interface is made of the room's own objects. Buttons are brass label plates, content cards are paper slips or enamel notice plates screwed to the wall, the list of connected apps is a strip of pigeonholes, and dates are rubber-stamped.

Density is low and the field is quiet. One rack owns the first viewport; everything after it is solid floor in the room colour, with paper and enamel objects set on it in generous space. Warmth is rationed: brass is the only warm material on the page, so it reads as lamplight catching metal, never as decoration. The system rejects the category default of a dark gradient hero with a floating app screenshot and three identical feature cards; the rack, its slips and the plates are the proof surface instead.

Legal pages (privacy, terms) are the post room's reading desk: the same ground, ink and Archivo, a single 46rem column, and no rack.

**Key Characteristics:**
- One room colour, one enamel, one paper, one warm metal.
- Status is carried by a slip's coloured edge, never by fills.
- Hierarchy through Archivo's width axis as much as through size.
- Square-ish corners (2 to 4px); circles only for rivets and the mark.
- Soft lamp shadows falling downward; recessed cells via inset shadow.

## Colors

A cool, near-monochrome navy room with paper whites and a single warm metal.

### Primary
- **Lamplit Brass** (brass, with brass-hi and brass-lo as its highlight and shadow): every control and every name. The button plate is a vertical brass-hi → brass → brass-lo gradient; selected name tabs, plate rivets, the stamped day times, focus rings and text selection are brass. **Brass Ink** (brass-ink) is the only text colour allowed on brass.

### Secondary
- **Promise Amber** (promise-amber): the edge of a slip for something the user promised. In the 3D rack it also drives the name-plate gradient, and on the legal pages it is the accent (link underlines, list markers, focus).
- **Signal Red** (signal-red): the edge of an overdue slip and the invalid-input border. Never a fill.
- **Waiting Grey** (waiting-grey): the edge of a slip that is waiting on the other person, and the default bottom edge of log entries.

### Neutral
- **After-Hours Navy** (ground): the room. Page background, scrim, fog, theme-color, the cut-outs in the mark.
- **Cell Shadow Navy** (ground-raised): the inside of a pigeonhole; legal-page notice panels.
- **Enamel Navy** (rack-enamel): the rack's steel. Frames the sorting log, carries the privacy plates and the Windows download panel.
- **Rack Seam** (rule): hairline dividers, footer rule, scrollbar thumb, table rules.
- **Slip Paper** (paper): slips, log entries, the Mac panel; also the main text colour on the room.
- **Slip Ink** (paper-ink) and **Faded Ink** (paper-muted): text on paper, primary and secondary.
- **Moonlit Grey** (text-muted): secondary text on the room (lede, nav, fine print).
- **Plate Lettering** (plate-text): body text on enamel plates.
- **Stamp Inks** (stamp-amber, stamp-red): the stamp colour on paper for promise and overdue slips; waiting slips stamp in Faded Ink.
- **Field White** (field) and **Field Stroke** (field-stroke): the one text input.

### Named Rules
**The One Lamp Rule.** Brass is the only warm colour on the room. If a warm tone appears that is not brass, a slip edge or a stamp, it is wrong.

**The Edge Code Rule.** Status lives in a 6px coloured edge on paper: amber for a promise, red for overdue, grey for waiting. Never colour a whole card, a background or a headline by status.

**The Two Surfaces Rule.** Text sits on paper (dark ink) or on the room and enamel (light ink). Text sits on brass only as a name or control label in Brass Ink.

## Typography

**Display Font:** Archivo (variable, width 62–125%), with system-ui fallback
**Body Font:** Archivo at normal width
**Label/Mono Font:** Stamp (Courier Prime Bold), with ui-monospace fallback

**Character:** One grotesk doing everything by stretching: names and plate labels go fully expanded like engraved brass, headings sit moderately wide and heavy, body runs at normal width. Courier Prime Bold appears only as an inked rubber stamp.

### Hierarchy
- **Display** (760, clamp 2.3–3.9rem, 1.04, width 116%): the hero headline only. Drops to width 100% and 2.35rem on phones so it holds two lines.
- **Headline** (720, clamp 2–3.4rem, 1.04, width 112%): section headings on the floor, 14–20ch wide. The privacy heading may run larger (up to 4.4rem).
- **Title** (720, clamp 1.6–2.3rem, width 112%): the moments of the day. **Slip title** (1.2rem, width 108%) heads a slip's reverse; plate and panel titles run 1.25–1.35rem at width 118%.
- **Body** (400, 1.0625rem, 1.6): running text; ledes 1.05–1.25rem in Moonlit Grey at about 36ch; fine print 0.92rem at up to 62ch.
- **Label** (680–700, 0.72rem, 0.06–0.08em, uppercase, width 125%): brass name tabs and the brass "when" tabs on log entries. Buttons use the same family at 0.95rem, width 118%, sentence case.
- **Stamp** (700, 0.78rem, 0.04em, uppercase): a slip's status line. As a day time it is set at 0.42em of its heading, in brass, inside a 2px brass border rotated -2deg.

### Named Rules
**The Width Is Voice Rule.** Names and labels are the widest type on the page (125%), headings next (108–118%), body narrowest (100%). Never set body copy expanded or names condensed.

**The Stamp Only Rule.** Monospace is reserved for stamped dates, times and slip statuses. Nothing else is set in Stamp.

## Layout

A quiet field owned by one object. On desktop the WebGL rack is fixed full-bleed behind the first viewport and the walk through the day, framed into the right two-thirds by a camera view-offset; a left-to-right scrim (95% room at 0, clear by 50%) holds the copy column (max 40rem). The slip reverse panel pins bottom right (min(23rem, 34vw)). The day is a sequence of tall stops (88vh, max 30rem wide) that fade from 0.28 to full opacity as they become active while the camera moves to that slip.

After the day, everything sits on solid floor: a full-width ground block with a soft upward shadow that buries the canvas. Sections pad by the section token, content caps at 1180px, and the side gutter is the gutter token throughout. Grids: sorting log 3 → 2 (900px) → 1 (560px) columns; privacy plates 3 → 1 (820px); app cells 5 across at max 720px; close split 2 → 1 (820px).

On phones (760px and below) the rack takes the top of the screen and the scrim turns vertical (clear to 24%, solid from 38%); the hero copy and slip panel stack beneath, the nav collapses to the mark plus the small brass button, and day stops align to the bottom.

The legal reading desk is a single centred 46rem column with 16px side padding.

## Elevation & Depth

Depth comes from one lamp, up and to the left. In 3D it is a warm spotlight with soft shadows over a cool hemisphere fill and fog in the room colour. On the flat page it is translated as soft shadows that fall downward with negative spread, inner highlights on top edges, and inset shadows for recesses. Nothing glows, and nothing has a hard offset.

### Shadow Vocabulary
- **Plate lip** (`inset 0 1px 0 rgba(255,255,255,0.45), inset 0 -1px 0 rgba(0,0,0,0.25)`): bevel on brass plates; enamel uses the same idea at 0.08 white.
- **Plate drop** (`0 6px 14px -6px rgba(0,0,0,0.6)`): brass button at rest; hover deepens to `0 10px 20px -8px rgba(0,0,0,0.7)`.
- **Slip lift** (`0 18px 40px -16px rgba(0,0,0,0.6)`): paper slips and panels lifted off the rack.
- **Wall plate** (`0 16px 30px -18px rgba(0,0,0,0.75)`): enamel notice plates.
- **Pigeonhole recess** (`inset 0 10px 18px -8px rgba(0,0,0,0.7)`): the inside of a cell.
- **Floor edge** (`0 -60px 80px 20px #0E1426`): the solid floor swallowing the fixed canvas.

### Named Rules
**The One Lamp Rule (Depth).** Every shadow agrees on a light above and in front. Shadows fall down with negative spread; recesses are inset from the top.

## Shapes

Square-ish, made-object corners: 2px on log entries, 3px on slips and name tabs, 4px on plates, panels, the rack frame and the input. Brass "when" tabs hang off the top edge of a log entry with only their bottom corners rounded. Log entries sit on the rack frame with slight rotations (-0.6° to 0.5°) as if dropped in by hand; the day stamp is rotated -2°. Circles exist only as plate rivets (8px brass radial) and the Ellipsa mark.

**The Square-ish Rule.** No radius above 4px on any surface or control, and no pills.

## Components

### Buttons
Tactile brass plates; the page's only button.
- **Shape:** gently squared (plate, 4px).
- **Brass plate:** vertical brass gradient, Brass Ink label at 0.95rem, weight 680, width 118%; padding 0.95em 1.4em; the small variant in the top bar is 0.8rem at 0.7em 1em.
- **Hover / Focus / Active:** hover brightens 6% and deepens the drop (fine pointers only); press scales to 0.97 over 160ms on the standard ease-out; focus is a 2px brass ring at 3px offset (on the paper Mac panel the ring is enamel navy). Busy state desaturates.
- **Quiet link:** the secondary action is a plain underlined link in Moonlit Grey that brightens to paper.

### Name Tabs
Brass label tabs that pick a slip, set in Label type. Idle tabs are dulled brass; the selected tab is full brass. Arrow keys move between them; press scales to 0.96.

### Slip (signature)
The reverse of a paper slip: Slip Paper, 3px corners, a 6px top edge in its status colour, then a stamp line, slip title, the quoted promise, and its source in Faded Ink. When the selection changes it dims to 0.4 with a 2px blur for 140ms, refills, and returns. In the rack the matching 3D slip slides further out of its pigeonhole on hover or selection.

### Cards / Containers
- **Log entry:** paper on the enamel rack frame, 2px corners, 6px bottom edge (brass or waiting grey, alternating), a hanging brass "when" tab, slight rotation.
- **Enamel plate:** rack enamel, 4px corners, brass rivets top left and right, Plate Lettering body with a wide 1.25rem heading in paper.
- **Pigeonhole cells:** a 6px-gap grid on enamel; each cell is recessed Cell Shadow Navy holding a monochrome logo.
- **Close panels:** the Windows panel is enamel; the Mac panel is paper with a brass top edge.

### Inputs / Fields
- **Style:** Field White with a 1px Field Stroke, 4px corners, padding 0.8em 1em, sits in a row with the brass button.
- **Focus:** 2px enamel-navy outline at 1px offset, stroke hidden.
- **Error:** Signal Red border; the status line below turns stamp red and bold; success turns green and bold.

### Navigation
A fixed 64px bar fading from 92% room to clear: the mark at left, three Moonlit Grey links at 0.9rem that brighten to paper, the small brass button at right. Below 760px the links hide. Footer repeats the mark with legal links over a Rack Seam rule. On the reading desk, the current page link is underlined in Promise Amber.

## Do's and Don'ts

### Do:
- **Do** build controls as brass plates (brass gradient, Brass Ink, 4px) and content as paper slips or enamel plates.
- **Do** carry status only in a 6px slip edge: Promise Amber, Signal Red, Waiting Grey.
- **Do** set names and labels in Archivo at width 125%, uppercase, 0.06–0.08em tracking.
- **Do** keep stamps in Stamp (Courier Prime Bold), uppercase, inked Stamp Amber, Stamp Red or Faded Ink on paper.
- **Do** light everything from one lamp: soft downward shadows with negative spread, inset recesses.
- **Do** honour reduced motion: the rack snaps to rest, slips do not swap-blur, day stops stay fully opaque, scrolling is not smooth.

### Don't:
- **Don't** introduce a second warm colour, a gradient other than the brass plate and the room-colour fades (top bar, scrim), or any glow.
- **Don't** use a radius above 4px or a pill shape.
- **Don't** fill cards, panels or headlines with a status colour.
- **Don't** use monospace for anything that is not a stamped date, time or status.
- **Don't** fall back to a dark gradient hero with a floating app screenshot and three identical feature cards.
