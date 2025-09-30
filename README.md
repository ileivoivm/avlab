# AV Lab - Audiovisual Experiment Lab

## 關於項目

Audiovisual experiment plan is digital artist aluan wang's two year creative project. Between 2013 and 2015, he plans to produce approximately 30 audiovisual experiments, each demonstrating different relations between sound and image. His creative tool for the project is open-source software, Pure data.

Since 2023, avlab has been gradually converted to JavaScript frontend versions, using modern web technologies to re-implement these audiovisual experiments, allowing more people to experience these creative works through browsers.

音頻視覺實驗計劃是數位藝術家aluan wang的兩年創意項目。在2013年至2015年間，他計劃製作約30個音頻視覺實驗，每個實驗都展示聲音與圖像之間的不同關係。他使用開源軟體 Pure Data 作為創意工具。

自2023年後，avlab 將逐一改為 JavaScript 前端版本，使用現代 Web 技術重新實現這些音頻視覺實驗，讓更多人可以透過瀏覽器體驗這些創意作品。

## 項目結構

```
avlab/
├── index.html          # 主頁面
├── README.md           # 項目說明
├── av11/              # 鼓機實驗
│   ├── index.html
│   ├── sketch.js
│   ├── DrumDrum.js
│   ├── sound files...
│   └── style.css
└── av23/              # 生成藝術
    ├── index.html
    ├── sketch.js
    ├── sound.js
    └── style.css
```

## 實驗項目

### AV11 - 鼓機實驗
- **技術棧**: p5.js, Tone.js
- **特色**: 互動式鼓機應用，結合節拍與視覺效果
- **檔案**: 包含多個音效檔案 (BD.wav, CHH.wav, CLAP.wav, OHH.wav, SD.wav)

### AV23 - 序列機
- **技術棧**: p5.js, Tone.js, fxhash
- **特色**: 互動式音樂序列機，支援多種合成器
- **功能**: 可調整音符序列、節拍、音量和持續時間

## 技術特色

- **跨平台**: 使用現代 Web 技術
- **互動性**: 結合音頻與視覺的即時互動
- **創意性**: 探索聲音與圖像的各種關係
- **開源**: 基於開源軟體和技術

## 使用方式

1. 開啟 `index.html` 瀏覽所有實驗
2. 點擊項目卡片進入特定實驗
3. 每個實驗都可以獨立運行

## 開發者

**Aluan Wang** - 數位藝術家
- 專注於音頻視覺藝術創作
- 使用 Pure Data 和現代 Web 技術
- 探索聲音與圖像的創新關係

## 授權

本項目採用開源授權，歡迎學習和參考。

---

*持續探索音頻與視覺的邊界*
