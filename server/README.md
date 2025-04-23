# NeoAcademy 後端

這是 NeoAcademy 平台的後端部分，提供 API 服務和數據處理功能。

## 技術棧

- **Express.js** - API 服務器
- **TypeScript** - 提供類型安全和更好的開發體驗
- **MongoDB** - 用於數據存儲
- **Passport.js** - 用於身份驗證
- **JWT** - 用於生成和驗證令牌
- **LangChain** - 用於 LLM 功能
- **Zod** - 用於數據驗證
- **CORS** - 用於處理跨域請求

## 目錄結構

```
server/
├── controllers/     # 請求處理邏輯
├── middlewares/     # 中間件
├── routers/         # 路由定義
├── schemas/         # 數據模型和驗證
├── types/           # TypeScript 類型定義
├── utils/           # 工具函數
├── app.ts           # 應用程序入口
└── database.ts      # 數據庫連接
```

## 安裝

2. 安裝依賴
```bash
bun install
```

3. 創建環境變量文件
```bash
cp .env.example .env
```
然後編輯 `.env` 文件，設置必要的環境變量，包括：
- MongoDB 連接字符串
- JWT 密鑰
- OAuth 憑證（如果需要社交登錄）
- OpenAI API 密鑰（用於 AI 功能）

## 開發

啟動開發服務器：

```bash
bun run app.ts
```

這將在 http://localhost:3000 啟動 API 服務器。

## API 端點

服務器提供以下主要 API 端點：

- `/api/auth` - 身份驗證相關端點
- `/api/user` - 用戶管理端點
- `/api/quiz` - 測驗相關端點
- `/api/roadmap` - 學習路徑相關端點
- `/api/chatbot` - AI 聊天機器人端點

## Docker 部署

使用 Docker 部署服務器：

```bash
docker build -t neoacademy-server .
docker run -p 3000:3000 --env-file .env neoacademy-server
```

## 與前端集成

後端服務器通過 RESTful API 與前端應用程序通信。確保在客戶端的 `.env` 文件中設置了正確的 API URL。

## 許可證

此項目使用 MIT 許可證 - 詳情請參閱 LICENSE 文件。
