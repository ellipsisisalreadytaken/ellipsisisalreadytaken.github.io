---
name: Ellipsa
description: The app's own monochrome, a grey pebble with three ink dots that think, talk, listen and wait for your yes.
colors:
  paper: "#FFFFFF"
  ink: "#030213"
  grey-100: "#F3F3F5"
  grey-200: "#ECECF0"
  pebble: "#E5E7EB"
  pebble-light: "#F6F7F9"
  pebble-shade: "#D8DBE1"
  muted: "#717182"
  muted-deep: "#5E5E73"
  on-ink-muted: "#C9C9D6"
  listening-red: "#EF4444"
  badge-blue: "#2563EB"
typography:
  display:
    fontFamily: "Crimson Text, Georgia, serif"
    fontSize: "clamp(3rem, 6vw, 5.6rem)"
    fontWeight: 400
    lineHeight: 1.02
    letterSpacing: "-0.015em"
  headline:
    fontFamily: "Crimson Text, Georgia, serif"
    fontSize: "clamp(2.4rem, 5vw, 4.4rem)"
    fontWeight: 400
    lineHeight: 1.02
    letterSpacing: "-0.015em"
  title:
    fontFamily: "Crimson Text, Georgia, serif"
    fontSize: "2rem"
    fontWeight: 400
    lineHeight: 1.05
  wordmark:
    fontFamily: "Crimson Text, Georgia, serif"
    fontSize: "1.75rem"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-0.01em"
  subhead:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1.15rem"
    fontWeight: 600
    letterSpacing: "-0.01em"
  lede:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(1.08rem, 1.5vw, 1.3rem)"
    fontWeight: 400
    lineHeight: 1.5
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.98rem"
    fontWeight: 600
    lineHeight: 1
  fine:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.9rem"
    fontWeight: 400
    lineHeight: 1.6
rounded:
  tail: "6px"
  bubble: "18px"
  frame: "20px"
  tile: "22px"
  card: "28px"
  pill: "999px"
  round: "50%"
spacing:
  xs: "8px"
  sm: "14px"
  md: "24px"
  lg: "48px"
  gutter: "clamp(16px, 4.5vw, 64px)"
  section: "clamp(80px, 11vw, 160px)"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "1em 1.5em"
  button-primary-small:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    padding: "0.8em 1.15em"
  button-on-ink:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "1em 1.5em"
  link-quiet:
    textColor: "{colors.muted}"
  link-quiet-hover:
    textColor: "{colors.ink}"
  input-email:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0.85em 1.2em"
  card-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.card}"
    padding: "clamp(28px, 4vw, 48px)"
  card-grey:
    backgroundColor: "{colors.grey-100}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "clamp(28px, 4vw, 48px)"
  mood-tile:
    textColor: "{colors.ink}"
    rounded: "{rounded.tile}"
    padding: "22px 22px 24px"
  mood-tile-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.tile}"
  chat-bubble-you:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.tile}"
    padding: "14px 18px"
  chat-bubble-ellipsa:
    backgroundColor: "{colors.grey-100}"
    textColor: "{colors.ink}"
    rounded: "{rounded.tile}"
    padding: "14px 18px"
  speech-bubble:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.bubble}"
    padding: "10px 14px"
  time-chip:
    backgroundColor: "{colors.grey-100}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "8px 12px"
  app-pebble:
    backgroundColor: "{colors.grey-100}"
    rounded: "{rounded.round}"
    size: "76px"
  app-pebble-hover:
    backgroundColor: "{colors.grey-200}"
  screen-frame:
    backgroundColor: "{colors.grey-100}"
    rounded: "{rounded.frame}"
  mascot-pebble:
    backgroundColor: "{colors.pebble}"
    rounded: "{rounded.round}"
  pending-badge:
    backgroundColor: "{colors.badge-blue}"
    textColor: "{colors.paper}"
    rounded: "{rounded.round}"
---

# Design System: Ellipsa

## Overview

**Creative North Star: "The Living Ellipsis"**

The whole site is the app's floating button, grown up and given room to play. A grey pebble holds three ink dots, and those dots are the brand's only character: they bounce like a typing indicator when Ellipsa is thinking, gather into two eyes and a mouth when it speaks, stretch into red bars when it listens, line up to read a briefing, and wait under a blue badge when something needs your yes. Everything else on the page stays quiet so the dots can carry the personality.

The ground is white and the palette is the app's own monochrome: one near-black ink, a short ladder of cool greys, and two signal colours that each mean exactly one thing. Type pairs a lowercase italic serif (Crimson Text) for the wordmark and every display sentence with Inter for everything you read or press. Shapes are soft and round: pills, pebbles, 18 to 28px corners. Motion is springs, not tweens: things arrive with a small overshoot, presses squash, and the dots squash and stretch with their own speed.

Density is generous and editorial. Each section is one lowercase sentence at headline size, one muted lede, and one piece of evidence: a real screenshot, a conversation, a set of facts. The world refuses the dark AI-gradient hero and the earlier skeuomorphic "post room" (navy rack, brass, Archivo); neither belongs here.

**Key Characteristics:**
- White ground, ink #030213, cool greys; red and blue reserved for one meaning each.
- Lowercase italic Crimson Text sentences as headlines; Inter for body and controls.
- The pebble-and-three-dots mascot as the single character, drawn live by script.
- Pills and round forms everywhere; no sharp corners on interactive surfaces.
- Spring motion with overshoot, squash on press, staggered three-beat rhythms.
- Soft, ink-tinted shadows with negative spread; depth reads as objects resting on paper.

## Colors

A monochrome of white, one blue-black ink and cool greys, with two tiny signal colours that never decorate.

### Primary
- **Ink** (#030213): Headlines, body text, the three mascot dots, primary pill buttons, selected mood tiles, your side of the chat, the Windows card. It is a blue-leaning near-black, never pure #000.

### Secondary
- **Listening Red** (#EF4444): Only for the mascot listening state: the dots turn red and stretch into level bars, on the page-wide mascot and on the "Hold it" mood tile.
- **Badge Blue** (#2563EB): Only for the pending-actions badge on the pebble, with white numerals and a white ring.

### Neutral
- **Paper** (#FFFFFF): The page ground, speech bubbles, the input field, the pill on the ink card.
- **Mist** (grey-100, #F3F3F5): Quiet panels: the Mac card, Ellipsa's chat bubbles, time chips, app pebbles, the screen frame behind screenshots, the legal-page notice.
- **Haze** (grey-200, #ECECF0): Hairlines (footer rule, speech-bubble stroke, legal table rules) and the hover fill of app pebbles.
- **Pebble Grey** (#E5E7EB): The mascot's body, always as a top-left-lit radial gradient from Pebble Light (#F6F7F9) through Pebble Grey at 58% to Pebble Shade (#D8DBE1).
- **Slate Muted** (#717182): Ledes, fine print, nav links, captions on white. It holds 4.79:1 on white; it does not hold AA on Mist.
- **Deep Slate** (muted-deep, #5E5E73): Muted text that sits on Mist or near it (mood descriptions, Mac card copy, form status), where Slate Muted would fall under 4.5:1.
- **Ink Mist** (on-ink-muted, #C9C9D6): Muted text on Ink surfaces (Windows card copy, selected mood descriptions).

### Named Rules
**The One Meaning Rule.** Red means listening and blue means something is waiting for your approval. Neither appears anywhere else, at any size, for any reason.

**The Blue-Black Rule.** Ink is #030213, never #000 and never navy. Shadows are tinted from the same ink (rgba(3,2,19,…)), never grey or black.

## Typography

**Display Font:** Crimson Text, italic only, weight 400 (with Georgia, serif)
**Body Font:** Inter, variable 400 to 700 (with system-ui, sans-serif)

**Character:** A soft, handwritten-feeling italic serif speaks the brand's sentences; a neutral grotesque does the work. The serif is always the voice and never the interface.

### Hierarchy
- **Display** (Crimson Text italic 400, clamp(3rem, 6vw, 5.6rem), line-height 1.02, -0.015em): The hero sentence only, max 13ch, ending in the live ellipsis.
- **Headline** (Crimson Text italic 400, clamp(2.4rem, 5vw, 4.4rem), line-height 1.02): One per section, max 16ch, a lowercase sentence with a period.
- **Title** (Crimson Text italic 400, 1.75 to 2.6rem, line-height 1.05 to 1.1): Moment names in the day, privacy promises, the download cards' platform names.
- **Wordmark** (Crimson Text italic 400, 1.75rem, line-height 1, -0.01em): "ellipsa", lowercase, in the bar and footer.
- **Subhead** (Inter 600, 1.15rem, -0.01em): Sans h3 and mood-tile names (1.15rem/1.2).
- **Lede** (Inter 400, clamp(1.08rem, 1.5vw, 1.3rem), line-height 1.5, Slate Muted): One muted sentence under a headline, 34 to 46ch.
- **Body** (Inter 400, 1.0625rem, line-height 1.6): Running text, 36 to 40ch in cards and moments; legal pages run 70ch at line-height 1.7.
- **Label** (Inter 600, 0.98rem, line-height 1): Pill buttons; 0.85rem in the small pill and time chip, with tabular numerals for times.
- **Fine** (Inter 400, 0.9rem, Slate Muted): Disclosures and captions, max 62ch.

### Named Rules
**The Lowercase Sentence Rule.** Every serif display line is a lowercase sentence written that way in the copy, ending in a period or an ellipsis. Serif is italic 400 only; no bold serif, no roman serif.

**The Serif Speaks, Sans Works Rule.** Crimson Text is for the wordmark, headlines and titles. Buttons, labels, inputs, nav and anything under 1.5rem are Inter.

## Layout

A single column of full-width sections, each padded by the section rhythm (clamp(80px, 11vw, 160px)) vertically and the gutter (clamp(16px, 4.5vw, 64px)) horizontally. Content blocks cap at 1100px and stay left-aligned; nothing is centred except the mascot's home pebble. The fixed top bar is 68px tall, translucent white (88%, blur 14px), with the wordmark left, muted section links right and a small pill.

Two-column splits are asymmetric: the hero runs 1.15fr / 0.85fr (copy / pebble home at min(380px, 30vw)); the day and chat sections run 0.8fr / 1.2fr with gaps of clamp(32px, 5vw, 80px). In the day section the screenshot stage is sticky (top 15vh) while each moment fills 62vh of scroll.

Breakpoints are content-driven: 900px collapses the day, chat and mood grids (moods go 4 to 2 columns, the sticky stage gives way to inline screenshots); 820px stacks the hero and the download cards, hides the bar's nav and shrinks the corner pebble from 72px to 56px; 760px stacks the privacy facts; 480px takes moods to one column and app pebbles to 60px.

Gaps step through 8, 14, 24 and 48px; card internals use clamp(28px, 4vw, 48px).

## Elevation & Depth

Depth is physical and soft: objects rest on paper. Shadows are ink-tinted, offset downward and pulled in with negative spread so they pool under an object rather than haloing it. Flat panels (Mist cards, chat bubbles, chips) carry no shadow at all; shadows belong to things that are objects (the pebble, a button, a screen) or that float (the speech bubble).

### Shadow Vocabulary
- **Pill rest** (`box-shadow: 0 10px 24px -12px rgba(3,2,19,0.55)`): Primary pills at rest.
- **Pill lift** (`box-shadow: 0 16px 28px -14px rgba(3,2,19,0.6)`): Pill hover, with a 3px lift and 1.03 scale.
- **Pebble** (`box-shadow: 0 9px 16px -9px rgba(3,2,19,0.32), 0 2px 5px -3px rgba(3,2,19,0.2), inset 0 -2px 4px rgba(3,2,19,0.05)`): The mascot pebble; mini pebbles use 0 6px 12px -6px rgba(3,2,19,0.35).
- **Bubble** (`box-shadow: 0 6px 12px -8px rgba(3,2,19,0.3)`): The mascot's speech bubble.
- **Screen** (`box-shadow: 0 50px 80px -50px rgba(3,2,19,0.45), 0 20px 40px -30px rgba(3,2,19,0.25)`): Screenshot frames and the video player.
- **Paper ring** (`box-shadow: 0 0 0 4px #fff`): Separates the blue badge from the pebble.

### Named Rules
**The Resting Object Rule.** Only objects cast shadows, and always downward with negative spread. Panels and text surfaces stay flat.

## Shapes

Everything round. Interactive controls are full pills (999px); the mascot, its mini versions, app logos and the badge are circles. Containers soften with size: speech bubbles 18px, screen frames 20px, mood tiles and chat bubbles 22px, download cards 28px. Bubbles drop one corner to 6px as a tail, on the side of whoever is speaking. Strokes are rare: a 1px Haze hairline on the speech bubble and footer, and a 1px border on the email field. The three-dot motif repeats as a shape: the privacy facts are each headed by three 14px ink dots.

## Components

### Buttons
Tactile and springy, like the app's controls.
- **Shape:** Full pill (999px).
- **Primary:** Ink fill, white Inter 600 label, padding 1em 1.5em, Pill rest shadow. Small variant 0.85rem, 0.8em 1.15em, used in the bar.
- **On ink:** On the Windows card the pill inverts to Paper with Ink text.
- **Hover / Focus:** On fine pointers, lifts 3px and scales 1.03 on the bounce curve (380ms) with Pill lift shadow. Press squashes to 0.95 in 120ms. Focus is a 2px ink outline at 3px offset (white on ink surfaces). Busy state drops to 70% opacity.
- **Quiet link:** Slate Muted text that darkens to Ink on hover, underlined with a 1px line at 0.2em offset.

### Chips
- **Time chip:** Mist fill, Ink Inter 600 0.85rem with tabular numerals, pill, 8px 12px. Marks the time of each moment in the day.

### Cards / Containers
- **Corner Style:** 28px for the download pair, 22px for mood tiles, 20px for screen frames.
- **Background:** Ink (Windows) beside Mist (Mac) as a deliberate pair; mood tiles are transparent until selected, then Ink.
- **Shadow Strategy:** Flat; see Elevation. Screen frames take the Screen shadow.
- **Internal Padding:** clamp(28px, 4vw, 48px) on download cards; 22px 22px 24px on mood tiles.
- **Mood tile:** A mini pebble (64px) acting out the mood, an Inter 600 name, a Deep Slate description. Selected tiles fill Ink, lift 6px and tilt -1.2deg; hover lifts 4px.

### Inputs / Fields
- **Style:** Paper fill, 1px #C9CAD3 stroke, pill, 0.85em 1.2em, Ink text and caret.
- **Focus:** 2px Ink outline at 1px offset; the stroke goes transparent.
- **Error / Status:** A status line under the row in Deep Slate; success is green 600, error a dark red 600. The invalid field's stroke currently borrows Listening Red, which The One Meaning Rule does not allow; it is recorded as drift, not as the pattern.

### Navigation
- **Top bar:** Fixed, 68px, translucent white with saturate(1.4) blur(14px) (solid white under reduced transparency). Wordmark left; muted 0.92rem Inter links with 28px gaps right, darkening to Ink on hover; small pill last. Below 820px the links hide and only the wordmark and pill remain.
- **Footer:** A Haze hairline on top, wordmark, muted links, fine print pushed right.
- **Legal pages:** A 44rem reading column; the nav shows the wordmark left and muted links, with the current page underlined at 0.35em offset.

### Conversation
- **You:** Ink bubble, white text, right-aligned, 22px with a 6px bottom-right tail.
- **Ellipsa:** Mist bubble, left-aligned, 6px bottom-left tail, with a 34px mini pebble avatar beside it. A three-dot typing bubble precedes each reply; bubbles spring in from scale 0.8 at their tail corner.

### The Mascot (signature)
A grey pebble with three ink dots, rendered every frame on a fixed layer above the page.
- **Body:** A circle with the Pebble gradient and Pebble shadow. It starts as the hero's home pebble (min(380px, 30vw)), travels with scroll to the bottom-right corner (72px, 28px inset; 56px, 16px inset on phones) like the app's button, and settles into the download section's home pebble when it is in view.
- **Dots:** Three ink circles, radius 5.5% of the pebble. They begin as the last characters of the hero headline, then hop into the pebble.
- **Moods:** Typing (three dots in a row, hopping in a staggered wave), face (two blinking eyes that follow the pointer and a wide mouth that moves while it talks), listening (Listening Red bars of changing height), reading (two eyes scanning over a short mouth), happy (eyes and a wide mouth, jumping), badge (the face plus the Badge Blue count, which pops in on the bounce curve).
- **Physics:** Damped springs (stiffness 260, damping 20 by default; the pebble 170/17, dots 240/19, squish 300/12, gaze 90/14). Dots stretch with vertical speed (0.7 to 1.5) and hop on every change of mood; a click squashes the pebble from the bottom and throws the dots up.
- **Voice:** A Paper speech bubble with a Haze stroke and an 18px shape tailed toward the pebble, speaking short lowercase lines. On phones it stays quiet once docked.
- **Reduced motion:** Springs snap to target, no hops, blinks, wander or typing loops.

### Mini Pebbles and App Pebbles
- **Mini pebble:** A 64px static mascot used inside mood tiles, acting the mood with CSS keyframes on the same three-beat rhythm.
- **App pebble:** A 76px Mist circle holding a 30px logo filtered to black; on hover it lifts 8px, tilts -6deg and fills Haze.

## Do's and Don'ts

### Do:
- **Do** keep every serif line italic 400 Crimson Text, lowercase in the copy, ending in a period or the ellipsis.
- **Do** use Ink (#030213) for type, dots and primary pills, and tint every shadow from it.
- **Do** make interactive controls full pills and spring them: bounce curve cubic-bezier(0.34, 1.56, 0.64, 1), press to scale 0.95 in 120ms.
- **Do** let the three dots carry state: staggered three-beat typing (about 0.12 to 0.14s apart) for thinking, face for talking, red bars for listening, blue badge for approval.
- **Do** use Deep Slate (#5E5E73) instead of Slate Muted for muted text on Mist panels.
- **Do** honour prefers-reduced-motion by snapping springs and stopping loops, and keep a no-JS fallback for the headline ellipsis.

### Don't:
- **Don't** use Listening Red or Badge Blue for anything but listening and the pending-actions badge: not for links, errors, highlights or decoration.
- **Don't** bring back the post room: no navy ground, no brass, no Archivo, no rack or pigeonhole imagery.
- **Don't** build a dark AI-gradient hero; the ground is white.
- **Don't** set the serif in bold or roman, or use it for buttons, labels or nav.
- **Don't** add a second character or mascot; the pebble and its three dots are the only one.
- **Don't** put eyebrows or kicker labels above headlines; the headline sentence stands alone.
- **Don't** use sharp corners on controls, or hard offset drop shadows for elevation (the zero-blur box-shadow that draws the three privacy dots is the ellipsis motif, not a shadow).
