# CLAUDE.md

## 项目定位

AI 全流程开发示范项目。核心产物是 `index.html`（小丑牌 V1.0.0 单机游戏），同时包含一套可复用的 Claude Code 自定义 Agent 和斜杠命令。

## 文件约定

| 路径 | 说明 |
|------|------|
| `index.html` | 游戏主文件，单文件架构（HTML + CSS + JS 合一），不拆分 |
| `PRD.html` | 产品需求文档，开发前必读 |
| `DESIGN.html` | 视觉设计规范，含 Design Tokens 和组件样式参考 |
| `agents/*.md` | 自定义 Agent 源文件（安装目标：`~/.claude/agents/`） |
| `slash/*.md` | 自定义斜杠命令源文件（安装目标：`~/.claude/commands/`） |

## 技术栈

- 纯原生 HTML / CSS / JavaScript，无构建工具，无依赖
- 字体：Google Fonts（Noto Sans SC + JetBrains Mono），网络不可用时 fallback 到 system-ui
- 游戏视口固定 1080×640px，响应式通过 `transform: scale()` 实现

## 游戏核心逻辑位置

| 功能 | 位置 |
|------|------|
| 牌型识别 | `detectHand()` 函数 |
| 得分计算 | `calcScore()` — `(base + cardValueSum) × mult` |
| 游戏状态 | `state` 对象（deck / hand / selected / score / handsLeft / discardsLeft / status） |
| 渲染入口 | `render()` — 每次状态变更后调用 |

## 已知 Issue

- **BUG-01 (P1)**：快速点击「重新开始」（胜负判定后 900ms 内）会触发竞态条件，旧的 `showModal` setTimeout 在新游戏中弹出。修复方案：在 `initGame()` 中 `clearTimeout(modalTimer)`。

## 自定义 Agent 安装

```bash
cp agents/*.md ~/.claude/agents/
cp slash/*.md ~/.claude/commands/
```

安装后支持的命令：

| Agent | 触发方式 | 职责 |
|-------|---------|------|
| fullstack-engineer | `@fullstack-engineer` | 把 PRD + DESIGN 落地为代码 |
| product-manager | `@product-manager` | 梳理需求、产出 PRD |
| ui-designer | `@ui-designer` | 视觉规范、DESIGN.md |
| qa-engineer | `@qa-engineer` | 验收测试、bug 排查 |

| 命令 | 职责 |
|------|------|
| `/cc-commit` | 查看暂存区 + 生成中文 commit message |
| `/cc-debug` | 定位并修复 bug |
| `/cc-explain-error` | 解释错误信息 |
| `/cc-explain-this` | 解释选中代码 |
| `/cc-init` | 初始化仓库四件套 |
| `/cc-plan` | 任务拆解 + 实现计划 |
| `/cc-ship` | 上线前检查清单 |
