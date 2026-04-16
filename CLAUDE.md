# CLAUDE.md - AV Lab

## Project Overview

AV Lab（音頻視覺實驗室）是數位藝術家 Aluan Wang 的音頻視覺實驗計劃。原始版本使用 Pure Data 製作（2013-2015），自 2023 年起逐步轉換為 JavaScript 前端版本。

## Project Structure

```
avlab/
├── index.html          # 主頁（實驗列表入口）
├── av11/               # 鼓機實驗 - 互動式鼓機
├── av17/               # 行星繪圖 - 繪圖產生聲音軌道（未追蹤）
├── av23/               # 序列機 - 多合成器音樂序列機
└── README.md
```

Each `avXX/` folder is a standalone audiovisual experiment with its own `index.html`, `sketch.js`, and `style.css`.

## Tech Stack

- **p5.js** — canvas rendering and interaction
- **Tone.js** — audio synthesis and scheduling
- **Vanilla HTML/CSS/JS** — no build tools, no bundler, no framework
- Each experiment loads libraries via CDN `<script>` tags

## Conventions

- Code comments are in **Chinese (zh-TW)** and occasionally English
- Each experiment is self-contained in its own folder (`avXX/`)
- `sketch.js` is the main entry point for each experiment's logic
- Mobile touch events are handled alongside mouse events
- Original Pure Data versions are referenced in comments (Vimeo links)
- No package manager or build step — open `index.html` directly in a browser

## Key Patterns

- `setup()` / `draw()` — p5.js lifecycle functions
- `mousePressed()` / `touchStarted()` / `touchEnded()` — interaction handlers
- Audio is lazily initialized on first user interaction (to comply with browser autoplay policies)
- Canvas size is based on `window.innerWidth` / `window.innerHeight`, using `min(W, H)` for square canvases
