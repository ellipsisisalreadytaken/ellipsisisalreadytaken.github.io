# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Static HTML, CSS and JavaScript on GitHub Pages (repo ellipsisisalreadytaken/ellipsisisalreadytaken.github.io). No build step. Libraries such as three.js load from a pinned CDN version. Server-side needs (beta requests) go to the existing Cloudflare Worker at https://ellipsa-proxy.ellipsa.workers.dev.

## Users

Founders, consultants and agency owners with ten or more outside calls a week: people whose work runs on relationships and whose CRM is their inbox. They live in Gmail, Google Calendar, Slack, Notion and calls. Most of the people the founder wants to reach first use MacBooks; the app ships on Windows and Mac (from 18 Oct 2026).

## Product Purpose

Ellipsa is a desktop AI assistant that keeps a private memory of the people, promises and open loops in your work, and steps in at the right moment: a morning briefing, context before a call, answers during it, the follow-up after. Success for the site: a visitor gets "ready for every call in a minute" from the first screen; a visitor on Windows or a Mac asks for the beta and is installed on a short call.

## Positioning

Settled 18 Oct 2026 (the app repo's `docs/strategy/positioning.md` is the source; revisit 17 Nov 2026).
Lead with the brief before a call: "Ellipsa gets you ready for every call in a minute." Tagline:
"never walk into a call cold." A minute before each call it shows who they are, what you last
discussed and what you owe each other (owed items first, the follow-up already written), from your
own email, Slack and past calls. For founders, consultants and agency owners with 10+ outside calls
a week (not sales teams on a company CRM). After the brief, it acts like an EA: the follow-up
written, the next call booked. Memory of every person is what makes the brief good, never the opening line. Don't lead with
"your AI self", "remembers all your work" or a feature list, and keep answers during a call as the second act
(proven on the founder's live calls, about 3 seconds), after the brief.

## Operating Context

- A small, always-visible floating button on the desktop opens everything.
- On sign-up it reads the last 30 days of connected tools so the first briefing is already personal.
- Connected: Gmail and Google Calendar (several Google accounts), Slack, Notion, GitHub. Memory also available to Claude Desktop, Claude Code, Cursor, VS Code, Windsurf, Gemini CLI, Codex and LM Studio through MCP.
- Live call support: transcribes on the user's computer, no bot joins the meeting, no call audio kept on disk.
- Observe mode, people cards, timeline, briefing read aloud, setup guide.

## Capabilities and Constraints

- Windows installer exists (Ellipsa-Setup-0.1.0.exe, ~97MB). It is not code-signed yet, so Windows SmartScreen will warn. Where it is publicly hosted is not decided yet (the app repo is private).
- Google sign-in is limited to approved test users until Google verifies the app; public downloaders may not be able to connect Gmail yet. Undecided how the site handles this.
- Memory is stored encrypted on the user's computer with daily encrypted backups. AI requests go through Ellipsa's relay to OpenAI.
- The Mac app is in beta (Apple chip and Intel .dmg files, not signed by Apple yet, so macOS asks once: Open Anyway). No Linux app.
- Pricing is not decided. Do not show prices.

## Brand Commitments

- Name: Ellipsa, written as a lowercase italic serif wordmark "ellipsa" (Crimson Text). Mark: three dots inside a round grey button (an ellipsis), the same as the app's floating button.
- Colours: the app's monochrome (white, ink #030213, greys #ECECF0 / #717182), red #EF4444 only for listening, blue #2563EB only for the pending-actions badge. Founder pinned these for the website on 8 Oct 2026, with a bouncy animated feel and an ellipsis mascot.
- Voice: plain, specific, calm; concrete moments over adjectives.
- The site must keep links to the Privacy Policy and Terms (privacy.html, terms.html), which Google, Slack and Notion app reviews rely on.
- Contact email: husseinkhidr2@gmail.com.

## Evidence on Hand

- The installed app, from which real screenshots can be taken with demo data (never the founder's real inbox).
- A screen recording the founder will provide.
- Retrieval quality measurement: 100% recall@5 vs 94% similarity-only on 18 questions over a real user's memory.
- No testimonials, customer logos, user counts, press or ratings exist. Do not invent any.

## Product Principles

1. Show a real moment, not a feature list: the specific promise remembered beats any adjective.
2. The user stays in control: nothing is sent without approval, and the memory is theirs and local.
3. Useful on day one: the 30-day read means no empty first week.
4. Honest about stage: a beta on Windows and Mac, installed with you.
