# CLAUDE.md

給 Claude Code 在此專案工作時的說明。

## 專案概要

繁體中文的每日例行待辦 PWA。純原生 HTML / CSS / JavaScript，**沒有框架、沒有套件、沒有建置步驟、沒有測試**。主要使用情境是 iPhone 加入主畫面後以 standalone 模式使用。

## 常用指令

```bash
npx serve .                 # 或 python -m http.server 8000
```

Service Worker 需要 localhost 或 HTTPS，不能用 `file://` 開啟。

## 架構

- `index.html`：只有 `#app`、`#toast`、`#lightbox` 三個容器，載入 `app.js`（非 module 的一般 script）。
- `app.js`：全部邏輯集中在單一檔案，依序為：
  - 常數：`APP_VERSION`、`MAX_IMAGES`、`CATEGORIES`、`FREQS`、`THUMBS`（內嵌 SVG 圖示）、`UI`（介面圖示）
  - `db`：IndexedDB 包裝（資料庫 `todoapp` v2，object store `tasks` 與 `videos`，keyPath 皆為 `id`），提供 `all` / `put` / `del` 與 `video` / `putVideo` / `delVideo` / `videoIds`
  - `gcVideos()`：刪除沒有任何事項引用的影片；儲存、刪除事項、還原備份後都要呼叫
  - 日期工具：`dayKey`（本地時間 `YYYY-MM-DD`）、`isoDow`（週一=1…週日=7）、`mondayKey`
  - `isDueToday`：判斷今天是否顯示該事項（核心規則，見下方）
  - Hash 路由 `route()`：`#/`（今天清單）、`#/new`、`#/edit/:id`、`#/task/:id`、`#/menu`、`#/week`
  - `bindSwipe()`：今天清單卡片的手勢，左滑完成；長按 400ms 進入拖曳排序（只在同一個 `data-group` 內移動，靠近邊緣自動捲動）
  - 每個畫面一個 `renderXxx()`，以樣板字串整個覆寫 `app.innerHTML`，再綁定事件
  - 備份匯出／還原、燈箱、跨日檢查、Service Worker 更新處理
- `sw.js`：cache-first。導覽請求或前景切回（`postMessage('check')`）時背景重抓 `ASSETS`，以位元組比對有變動才更新快取並通知頁面 `'updated'`。
- `style.css`：CSS 變數定義在 `:root`（`--bg`、`--accent`、`--danger`、`--radius` 等）。

## 資料模型

```js
{
  id, title,          // title 最多 10 字
  desc,               // 最多 100 字
  category,           // CATEGORIES 的 id
  freq,               // FREQS 的 id
  thumb,              // THUMBS 的 key 或 null（null 顯示 other 圖示）
  images,             // Blob[]，最多 9 張，已縮至 1280px JPEG
  videoIds,           // videos store 的 id[]，最多 3 部、單檔 100MB；複製事項時共用同一份影片
  pinned,             // 置頂（舊資料可能沒有此欄位，視為 false）
  order, createdAt,   // 排序用；新建時為毫秒時間戳，拖曳後由 reorder() 設為鄰居的中間值（必要時全部重新編號）；byOrder 先比 pinned
  doneDate            // 最後完成日 'YYYY-MM-DD' 或 null
}
```

完成狀態只靠 `doneDate`，沒有歷史紀錄：
- 一般頻率：今天是該頻率的日子且 `doneDate !== 今天` 就顯示。
- `weekly`：`doneDate` 早於本週一才顯示（本週完成一次即隱藏到下週）。

`videos` store 的資料：`{ id, blob, name, poster }`。`poster` 是加入時用 `videoPoster()` 截的 JPEG 封面（iOS Safari 不會自動畫出影片第一格），舊資料缺少時由 `ensurePoster()` 補上。影片刻意與事項分開存，讓完成、編輯事項時不必搬動大檔案。

備份 JSON 格式：`{ app: 'todoapp', version: 1, exportedAt, tasks }`，圖片轉為 data URL。**影片不匯出**，只會帶出 `videoIds`；還原時影片保留在本機，對得上 id 的事項繼續使用，其餘由 `gcVideos()` 清除。改動資料欄位時要同時考慮舊備份的還原相容性。

## 開發慣例

- **每次發版更新 `app.js` 第一行的 `APP_VERSION`**（格式 `1.8（2026-10-22）`），顯示在「更多功能」頁。
- **新增任何需要離線的檔案，必須加到 `sw.js` 的 `ASSETS` 陣列**。快取名稱 `CACHE` 不需要隨版本變更（更新是靠內容比對）。
- 所有使用者輸入插入 HTML 前都要經過 `esc()`。
- 程式風格：精簡的箭頭函式、單字母或短變數名、少量註解、2 空格縮排、單引號、有分號。延續既有寫法，不要引入框架、打包工具或 TypeScript。
- 介面文字一律使用繁體中文（台灣用語）；圖示用 `svg()` 輔助函式寫成 24×24 線條 SVG。
- 用 `URL.createObjectURL` 顯示圖片時要走 `objUrl()`，才會在換頁時被 `releaseUrls()` 釋放。
- 換頁用 `go(path)` / `back()`，不要直接改 `location.hash`。
- 修改 IndexedDB 結構需要提升 `indexedDB.open('todoapp', 2)` 的版本並在 `onupgradeneeded` 處理遷移。

## 測試方式

沒有自動化測試。修改後請用瀏覽器（建議手機尺寸 375×812 模擬）手動確認：今天清單、滑動完成與復原、新增／編輯／複製／刪除、一週總覽、匯出與還原。
