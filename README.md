# 📸 Instagram Reels Batch URL Extractor

一個簡潔、零依賴的 JavaScript 自動化腳本，專為解決 Instagram 動態載入（Virtual Scrolling）限制而設計。執行後會自動捲動頁面、即時擷取所有 Reels 影片網址，並自動匯出為 `.txt` 清單。同時內附 `convert.sh` 腳本，方便將影片批次轉碼為 Mac 支援的 H.264 格式。

---

## ✨ 特色 (Features)

* **突破 Virtual Scrolling 限制**：IG 為了節省記憶體會自動銷毀不在視窗內的 DOM 節點。本腳本在 DOM 被銷毀前即時將網址寫入記憶體（`Set` 集合），確保能 100% 抓取上百支 Reels。
* **零依賴 (Zero Dependencies)**：直接在瀏覽器 Console 執行，無需安裝 Node.js、Python 或任何第三方套件。
* **自動去重 (Auto Deduplication)**：自動過濾網址追蹤參數（`?` 後續字串），確保輸出的 URL 乾淨且不重複。
* **自動下載 (Auto Save)**：抓取結束後自動觸發瀏覽器下載 `reels_list.txt` 檔案。

---

## 📁 專案結構 (Directory Structure)

```text
.
├── README.md
├── console.js       # 在瀏覽器 Console 執行的網址擷取腳本
└── convert.sh       # 批次將 VP9 影片轉碼為 H.264 的 Shell 腳本
```

---

## 🚀 快速使用步驟 (Usage)

1. 開啟 Chrome / Safari / Edge 瀏覽器，進入任何 Instagram 帳號的 Reels 頁面（例如：`https://www.instagram.com/帳號名稱/reels/`）。
2. 按下快捷鍵開啟開發者工具 Console 頁籤：
   * **Mac**：`Cmd + Option + I` $\rightarrow$ 切換至 **Console**
   * **Windows**：`F12` 或 `Ctrl + Shift + I` $\rightarrow$ 切換至 **Console**
3. 複製 `console.js` 的完整程式碼，貼入 Console 中並按下 `Enter` 執行。
4. 腳本會開始自動捲動頁面，Console 會即時顯示目前的擷取數量。
5. 捲動到底部後，腳本會自動下載包含所有網址的 `reels_list.txt` 檔案。

---

## 🛠️ 下載整合 (Workflow Integration)

取得 `reels_list.txt` 網址清單後，你可以搭配 [yt-dlp](https://github.com/yt-dlp/yt-dlp) 進行一鍵批次影片下載（自動將視訊轉換為 Mac QuickLook 完全支援的 H.264 格式，並避免檔名過長）：

```bash
yt-dlp -a reels_list.txt --postprocessor-args "ffmpeg:-c:v libx264 -c:a copy" -o "%(title).50s [%(id)s].%(ext)s" --force-overwrites

#若Mac 的 QuickTime 或 iOS 原生播放器解碼時出現金屬爆音、聲音斷續或速度變快的破音感，改成使用以下參數，重新壓縮為高音質 AAC 格式：
yt-dlp -a reels_list.txt --postprocessor-args "ffmpeg:-c:v libx264 -c:a aac -b:a 192k" -o "%(title).50s [%(id)s].%(ext)s" --force-overwrites
```
---

## 🛠️ 批次修正 VP9 / vp09 編碼

部分無聲影片或特定格式下載後若仍保持 VP9 (vp09) 編碼，導致 Mac QuickLook 無法預覽，可直接使用專案內附的 `convert.sh` 進行批次轉換。
