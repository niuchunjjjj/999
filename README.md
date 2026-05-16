# 小丑牌 Web · V1.0.0

基于扑克牌型的单机数值小游戏，灵感来自 Balatro。手选 1–5 张组牌型，限 4 次出牌内累计超过 300 分即胜。

本项目同时也是一个 **AI 全流程开发示范课**，包含完整的 Claude Code 自定义 Agent 和斜杠命令套件。

## 游戏规则

| 资源 | 数量 |
|------|------|
| 手牌 | 8 张（标准 52 张牌） |
| 出牌机会 | 4 次 |
| 弃牌机会 | 3 次 |
| 目标分数 | 300 分 |

得分公式：`(基础分 + 出牌点数之和) × 倍数`

支持 10 种牌型：高牌 / 对子 / 两对 / 三条 / 顺子 / 同花 / 葫芦 / 四条 / 同花顺 / 皇家同花顺

## 快速开始

无需安装，直接用浏览器打开：

```bash
open index.html
```

或启动本地服务器（推荐，避免字体跨域问题）：

```bash
npx serve .
# 访问 http://localhost:3000
```

## 项目结构

```
.
├── index.html        # 游戏主文件（单文件，含 HTML / CSS / JS）
├── PRD.html          # 产品需求文档
├── DESIGN.html       # 视觉设计规范
├── agents/           # Claude Code 自定义 Agent 定义
│   ├── fullstack-engineer.md
│   ├── product-manager.md
│   ├── qa-engineer.md
│   └── ui-designer.md
└── slash/            # Claude Code 自定义斜杠命令
    ├── cc-commit.md
    ├── cc-debug.md
    ├── cc-explain-error.md
    ├── cc-explain-this.md
    ├── cc-init.md
    ├── cc-plan.md
    └── cc-ship.md
```

## Claude Code 套件

`agents/` 和 `slash/` 下的文件可安装到全局，在任意项目中使用：

```bash
# 安装到全局
cp agents/*.md ~/.claude/agents/
cp slash/*.md ~/.claude/commands/
```

安装后即可在 Claude Code 中使用 `@fullstack-engineer`、`/cc-commit` 等命令。
