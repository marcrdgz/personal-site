---
title: "I'm building Kumo, a terminal multiplexer for the AI agent era"
published: true
description: "A Rust terminal multiplexer for the AI agent era, with real Ghostty terminal emulation."
tags: ["rust", "terminal", "ai", "opensource"]
date: "2026-08-10"
devto_url: "https://dev.to/marcrdgz/im-building-kumo-a-terminal-multiplexer-for-the-ai-agent-era-383e"
---

Hey! I've been building something in Rust these past few weeks and I wanted to share it. It's called **Kumo** — that's 蜘蛛, *spider* in Japanese — and it's a terminal multiplexer built around AI agents.

## The problem I kept running into

I work with AI agents a lot. `opencode`, `claude`, tried `qwen`. I'd have a couple of them working on different parts of a problem, and there was no easy way to keep an eye on them all. Are they still running? Blocked waiting for my approval? Finished?

I was switching between windows, squinting at terminals, losing track of who was doing what.

So I built one.

## Why not just use what's out there?

To be fair, the multiplexer space is in great shape right now. There's **herdr**, **cmux**, **amux**, and friends, plus classics like tmux and zellij that people swear by. And then there's [superlogical](https://www.superlogical.com/), Mitchell Hashimoto's new company — the same Mitchell who made Ghostty. I'm a fan of their work.

I've tried a bunch of these and they're all good at what they do. It's just that I never felt 100% at home with them — none of them gave me that *feeling* I get from my own setup of **Ghostty + tmux + LazyVim**. That combo just feels like *my* terminal, you know? Warm, familiar, exactly where I want things to be.

So Kumo wasn't born as a "better tmux." It started as an attempt to get that same familiar feeling, plus a couple of things I wished existed. A few design choices I ended up caring a lot about:

- **Usable like tmux, with an actual UI.** I wanted it usable as-is, right out of the box — but with a UI my dad could use without a man page. tmux is great; it's the learning curve that keeps people out. Good defaults that just work.
- **Not another app.** I didn't want a separate application — that's how you end up with a new window, a new thing to keep open. Kumo lives inside your terminal, which keeps it lightweight, makes it work anywhere (my dad, for example, programs on Windows), and means I can keep everything in my one simple terminal: Ghostty.
- **Completely configurable.** Kumo is open source, and just like that, I want it to belong to you — mold it however you like. It must be yours, not mine.

## What Kumo does

Quick primer: by "agents" I mean AI coding agents — the CLIs you run in a terminal, like `opencode` or `claude`, that edit files, run commands, and every so often *stop* to ask permission before doing something. That's what "blocked" means here.

The basics are all there: split panes, sessions, tabs, real text selection. But the heart of it is the **sidebar**, which lists every running agent with its workspace and a status dot:

- 🟢 **working** — off doing its thing
- 🟠 **blocked** — waiting for your say-so
- ⚪ **idle** — done, or just sitting there

When an agent blocks or finishes, Kumo pings you with a sound — a distinct chime for each. Blocked agents float to the top and their pane glows orange, so you only get pulled in when you're actually needed.

## The fun part: a real terminal emulator

I didn't want to fake the terminal. Each pane is a genuine VT/xterm emulator powered by **libghostty-vt** — Ghostty's headless terminal core, vendored and compiled at build time. Shells, TUIs, full-screen apps behave exactly like in a native terminal. With **portable-pty** on the PTY side, drag-to-select works even inside apps that own the mouse, like opencode's own TUI or vim.

It's one Rust binary, one TUI on **ratatui**.

## The mouse problem — a.k.a. my pain in the ass

Here's the weirdest rabbit hole of the whole project — and honestly, the biggest pain in my ass. Real terminals have a quiet war going on over your mouse. Apps can enable something called **mouse reporting** — when they do, they own the mouse. Drags are meant for *their* text selection, not yours. It's why selecting text in `vim` or `less` feels different from selecting it in a plain shell.

I wanted native selection everywhere: drag, select, copy on release, like a real terminal. So Kumo does both:

- When an app *doesn't* report the mouse, drag-select is handled by Kumo itself using libghostty-vt's native selection.
- When an app *does* take the mouse (opencode's TUI, vim, less), Kumo forwards the whole gesture — press, drags, release — so the app can do its own selection, exactly like it would in a real terminal.

And the sneaky trick that makes it all work: panes present themselves as plain `xterm-256color`, advertising **no mouse capabilities** at all (a tiny custom responder). So apps don't hijack your mouse unless they really need it, and native selection just works.

The bugs were fun too. Forwarded mouse events kept arriving with a trailing reset escape that apps would choke on — one character to fix, one afternoon to find. And selection was being read from a stale cached view instead of a fresh viewport snapshot, so the highlight wouldn't hug the text like a real terminal. Little things like that, but each one taught me something about how terminals actually think.

## How this got built

Honestly? A big chunk of this was vibe-coded — me describing what I wanted to DeepSeek V4 Flash and reading every line it produced as it went. But the real goal was never the product. It was learning:

- **Rust, properly.** Not a tutorial. A real binary with real lifetime and ownership problems, the kind you only hit when something has to actually work. I won't lie — I still don't fully understand Rust, and plenty of other things along the way. We're getting there, me and my buddy DeepSeek.
- **What's inside a terminal.** I've lived in one every single day for years and never really knew how it worked. PTYs, ANSI escapes, scrollback, mouse modes, `SIGWINCH` — building Kumo meant touching all of it.
- **Feeling free with AI.** Before Kumo, I'd never gone beyond a simple CLI with Claude at work. This was the first time I really pushed it — actually building something real and complex, not just poking at it from the command line. That shift felt genuinely liberating.

That's the middle ground I've settled into: not trusting it blindly, not writing every byte by hand. Enough understanding to review, enough trust to let it write the first draft.

But the main idea is done: a product I feel comfortable using every day, and a way to keep learning while I develop it. That's the whole point for me.

## Where it's at

It's early days and very opinionated. Right now opencode and claude have full lifecycle detection; other agents are auto-detected but shown as idle. Keybindings are hard-coded (remapping is on the roadmap), and a detach/re-attach server is coming.

If that sounds interesting, check out the repo at [github.com/marcrdgz/kumo](https://github.com/marcrdgz/kumo).

I'm sharing this because building it has been genuinely fun, and I'd love for you to try it too.
