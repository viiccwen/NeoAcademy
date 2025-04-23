# NeoAcademy 前端

這是 NeoAcademy 平台的前端部分，提供現代化的學習體驗和互動式介面。

## Tech Stack

- **React 18** - 使用者界面
- **TypeScript** - 開發語言
- **Vite** - 開發和構建工具
- **Tailwind CSS** - Styles 和 UI 設計
- **React Router** - router 管理
- **React Query** - 資料取得和 cache
- **Zustand** - 狀態管理
- **React Hook Form** - 表單處理
- **Shadcn/ui** - UI
- **Zod** - 驗證資料型態

## 目錄結構

```
client/
├── public/          # static resource
├── src/             # source code
│   ├── actions/     # API 操作邏輯層
│   ├── assets/      # static resource
│   ├── components/  # reuse component
│   ├── hooks/       # custom React Hooks
│   ├── lib/         # 輔助函式
│   ├── pages/       # page
│   ├── stores/      # Zustand 狀態管理
│   ├── App.tsx      
│   └── main.tsx     
├── .env.example     # 環境變量範例
├── package.json     
└── vite.config.ts   # Vite 配置
```

## 安裝

1. Clone repo
```bash
git clone https://github.com/yourusername/NeoAcademy.git
cd NeoAcademy/client
```

2. Install Dependency
```bash
# 請確保已擁有 pnpm
pnpm install
```

3. 創建環境變量文件
```bash
cp .env.example .env
```
然後編輯 `.env` 文件，設定必要的環境變量。

## Dev

啟動開發服務器：

```bash
pnpm dev
```

這將在 http://localhost:5173 啟動開發服務器。

## Build

```bash
pnpm build
```

構建後的文件將位於 `dist` 目錄中。

## 預覽生產構建

```bash
pnpm preview
```

## 代碼檢查

運行 ESLint 檢查：

```bash
pnpm lint
```

## 與後端集成

前端應用程序通過 API 與後端服務器通信。確保後端服務器正在運行，並且在 `.env` 文件中設置了正確的 API URL。

## 許可證

此項目使用 MIT 許可證 - 詳情請參閱 LICENSE 文件。