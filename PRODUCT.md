# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Static HTML, CSS and JavaScript on GitHub Pages (repo ellipsisisalreadytaken/ellipsisisalreadytaken.github.io). No build step. Libraries such as three.js load from a pinned CDN version. Server-side needs (the Mac waitlist) go to the existing Cloudflare Worker at https://ellipsa-proxy.ellipsa.workers.dev.

## Users

People whose work runs on relationships and who hold dozens of live ones at once: founders, consultants, agency owners, freelancers. They live in Gmail, Google Calendar, Slack, Notion and calls. Most of the people the founder wants to reach first use MacBooks; the app ships on Windows today.

## Product Purpose

Ellipsa is a desktop AI assistant that keeps a private memory of the people, promises and open loops in your work, and steps in at the right moment: a morning briefing, context before a call, answers during it, the follow-up after. Success for the site: a Windows visitor downloads and installs the beta; a Mac visitor joins the Mac waitlist.

## Positioning

Organised around people and promises, not around what was on your screen or a single meeting. "Others remember what you saw. Ellipsa remembers who you owe." It acts on that memory (drafts in your voice, booking calls, tasks), always waiting for approval before anything is sent or changed.

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
- Mac and Linux apps do not exist yet. Mac is next on the roadmap.
- Pricing is not decided. Do not show prices.

## Brand Commitments

- Name: Ellipsa. Mark: three dots inside a circle (an ellipsis).
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
4. Honest about stage: beta, Windows first, Mac coming.
