# vibe-coding-GenPage

一个用原生 HTML、CSS 和 JavaScript 实现的个人链接主页，风格接近极简开发者作品集，也可以当作自己的 Linktree 使用。

## 功能

- 顶部展示头像、引导语、姓名、主标题和个人简介。
- 提供 GitHub、Twitter、YouTube、Bilibili、Email 和 WeChat 六个入口。
- 外链在新标签页打开，并带有真实品牌或动作图标。
- WeChat 按钮点击后复制微信号 `wamgjt1127`，并显示「已复制」提示。
- 右上角按钮可在黑绿极简风格和霓虹玻璃参考风格之间切换。
- 页面底部用 `localStorage` 记录本地访问次数。
- 响应式居中布局，适配桌面端和移动端。

## 文件结构

```text
.
├── index.html      # 页面结构和个人信息内容
├── styles.css      # 视觉风格、响应式布局和主题切换样式
├── script.js       # 微信复制、主题切换、访问次数和轻量交互
├── 头像1.png       # 当前头像图片
├── CHANGELOG.md    # 版本发布记录
├── tests/
│   └── homepage.test.js
├── prompts/        # 用于演示 AI 生成和迭代页面的提示词示例
├── .codex/skills/  # OpenSpec 为 Codex 生成的辅助技能
└── openspec/
    ├── specs/personal-link-homepage/
    └── changes/archive/2026-05-31-add-personal-link-homepage/
```

## 本地预览

这个项目不需要安装依赖，也不需要构建。直接用浏览器打开仓库根目录下的 `index.html` 即可预览页面。

如果想通过本地服务预览，也可以在项目目录运行：

```powershell
python -m http.server 8000
```

然后访问 `http://localhost:8000`。

## 自定义内容

常用内容都在 `index.html` 中：

- 页面标题：修改 `<title>JT | Links</title>`。
- 头像：替换 `头像1.png`，或修改 `<img class="avatar" src="头像1.png">`。
- 姓名：修改 `<h1>JT</h1>`。
- 主标题和简介：修改 `.headline` 和 `.bio` 对应的文本。
- 社交链接：修改每个 `.link-card` 的 `href`。
- 微信号：同时修改 `button#copy-wechat` 的 `data-wechat` 和 `script.js` 里的 `WECHAT_ID`。
- 邮箱：修改 `mailto:hello@example.com`。

图标来自 Font Awesome CDN：

```html
https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css
```

如果需要离线使用，可以改成本地字体图标资源，或把图标替换成内联 SVG。

## OpenSpec

当前功能规格已经归档并合并到主规格中：

- 主规格：`openspec/specs/personal-link-homepage/spec.md`
- 归档记录：`openspec/changes/archive/2026-05-31-add-personal-link-homepage/`
- 当前活跃变更：无

检查 OpenSpec 状态：

```powershell
openspec list
openspec list --specs
openspec validate --all --strict --no-interactive
```

后续新增功能时，建议先创建新的 OpenSpec change，再按 proposal、design、tasks 和 spec delta 推进。

## 验证

项目包含一个轻量结构测试，用于检查页面必需内容、图标、链接行为、主题切换和本地交互入口是否存在。

```powershell
node tests\homepage.test.js
```

## 技术说明

- 无前端框架，无打包流程，适合直接托管到 GitHub Pages、Vercel、Netlify 或任意静态站点服务。
- 访问次数只记录在当前浏览器的 `localStorage` 中，不是全站真实访问统计。
- 剪贴板复制在部分浏览器或本地文件环境下可能受限制，页面已提供 textarea fallback。
- 右上角切换按钮不会切换到白色主题，而是在当前黑绿风格和参考霓虹风格之间切换。
