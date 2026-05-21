# Web App 模板 (静态前端)

纯 React 19 + Tailwind 4 模板，内置 shadcn/ui。**请将此 README 作为发布静态体验的检查清单。**

> **注意：** 此模板包含一个最小化的 `shared/` 和 `server/` 目录，其中包含占位符类型以支持导入的模板。这些仅是兼容性占位符 - web-static 仍然是一个真正的纯静态模板，没有 API 功能。

---

## 技术栈概览

- 客户端路由由 React + Wouter 驱动。
- 设计令牌（Design tokens）完全位于 [client/src/index.css](file:///Users/jackqiaosan/Desktop/test/fire_alarm_viewer/client/src/index.css) 中——请保持该文件完整。

## 文件结构

```
client/
  public/       ← 仅存放小型配置文件 (favicon.ico, robots.txt)。不要在此处放置图片/媒体文件。
  src/
    pages/      ← 页面级组件
    components/ ← 可复用的 UI 组件 & shadcn/ui
    contexts/   ← React 上下文
    hooks/      ← 自定义 React Hooks
    lib/        ← 工具函数
    App.tsx     ← 路由与顶层布局
    main.tsx    ← React 入口点
    index.css   ← 全局样式
server/         ← 导入模板兼容性的占位符
shared/         ← 导入模板兼容性的占位符
  const.ts      ← 共享常量
```

### ⚠️ 图片与媒体处理

**不要** 将图片、视频或大型资源存储在 `client/public/` 或 `client/src/assets/` 中。本地媒体文件会导致部署超时。

**必要的工作流程：**

1. 使用 CLI 上传资源：`manus-upload-file --webdev path/to/image.png`
2. 直接在代码中使用返回的存储路径：`<img src="/manus-storage/image_a1b2c3d4.png" />`
3. 将原始本地文件存储在 `/home/ubuntu/webdev-static-assets/`（项目目录之外）

只有像 `favicon.ico`、`robots.txt` 和 `manifest.json` 这样的小型配置文件才应放在 `client/public/` 中。

`client/public` 中的文件在站点根目录下可用——从 HTML 模板、JSX 或 meta 标签中使用绝对路径（如 `/robots.txt` 等引用它们）。

---

## 🎯 开发工作流

1. **在编写任何前端代码之前，根据设计指南选择一种设计风格**（颜色、字体、阴影、艺术风格）。告诉用户你选择了什么。记得编辑 `client/src/index.css以进行全局主题设置，并在 `client/index.html` 中使用 Google Font CDN 添加所需字体。
2. **在 `client/src/pages/` 中组合页面**。保持模块化的部分以便在不同路由间复用。
3. **通过 `client/src/components/` 共享基础组件**——需要时扩展 shadcn/ui 而不是复制标记。
4. **依靠现有的 Tailwind 令牌**（间距、颜色、排版）来保持样式一致。
5. **如果网站需要从公共 API 获取动态内容，使用 `useEffect` 获取外部数据**。

---

## 🎨 前端开发指南

**UI 与样式：**

- 优先使用 shadcn/ui 组件进行交互，以保持现代、统一的外观；从 `@/components/ui/*` 导入（例如 `button`, `card`, `dialog`）。
- 使用组件变体组合 Tailwind 实用类进行布局和状态管理；避免过多的自定义 CSS。在可用时使用内置的 `variant`, `size` 等。
- 保留设计令牌：保持 [client/src/index.css](file:///Users/jackqiaosan/Desktop/test/fire_alarm_viewer/client/src/index.css) 中的 `@layer base` 规则。`border-border` 和 `font-sans` 等工具类依赖于它们。
- 一致的设计语言：通过令牌使用间距、圆角、阴影和排版。将共享 UI 提取到 `components/` 中以供复用，而不是复制粘贴。
- 可访问性和响应式：保持可见的焦点环并确保键盘可达性；以移动优先的方式设计，并 thoughtful 地考虑断点。
- 主题化：根据你的设计风格（深色或浅色背景为 ThemeProvider 选择初始深色/浅色主题），然后在 [client/src/index.css](file:///Users/jackqiaosan/Desktop/test/fire_alarm_viewer/client/src/index.css) 中使用 CSS 变量管理调色板，以保持全局一致性，而不是硬编码。
- 微交互和空状态： tastefully 地添加动效、空状态和图标以提高质量，同时不分散对内容的注意力。
- 导航：对于内部工具/管理面板，使用持久侧边栏。对于面向公众的应用，根据内容结构设计导航（顶部导航、侧边导航或上下文导航）——确保从所有页面都有清晰的退出路径。
- 占位符 UI 元素：当为尚未实现的功能添加结构占位符（导航项、CTA）时，点击显示 toast ("功能即将推出")。在展示工作时告知用户哪些元素是占位符。

**React 最佳实践：**

- 永远不要在渲染阶段调用 setState/导航 → 将其包裹在 `useEffect` 中

**自定义默认值：**
此模板简化了一些 Tailwind/shadcn 默认值以简化使用：

- `.container` 被定制为自动居中并添加响应式内边距（参见 [index.css](file:///Users/jackqiaosan/Desktop/test/fire_alarm_viewer/client/src/index.css)）。直接使用无需 `mx-auto`/`px-*`。对于自定义宽度，使用带有 `mx-auto px-4` 的 `max-w-*`。
- `.flex` 默认具有 `min-width:0` 和 `min-height:0
- `button` 变体 `outline使用透明背景（不是 `bg-background`）。如果需要，手动添加背景色类。

---

## 🎨 设计指南

在生成前端 UI 时，避免缺乏视觉区分度的通用模式：

- 避免通用的全页居中布局——对于落地页和仪表盘，首选非对称/侧边栏/网格结构
- 当用户提供模糊需求时，做出创造性的设计决策（选择特定的调色板、排版、布局方法）
- 优先考虑视觉多样性：结合不同的设计系统（例如，一种配色方案 + 不同的排版 + 另一种布局原则）
- 对于落地页：首选非对称布局、具体的颜色值（不仅仅是“蓝色”）以及有纹理的背景而非平面颜色
- 对于仪表盘：使用定义的间距系统、柔和阴影优于边框，并使用强调色建立层级

---

## 动画指南

从第一行代码开始就融入运动美感。灵敏且符合物理直觉的交互不是后期打磨——它们是初始构建的一部分。

- 决定是否要动画：键盘触发的操作（命令面板、快捷键）必须是即时的——永远不要对它们进行动画处理。高频交互（悬停、列表导航）应保持极简。将更丰富的动效保留给偶尔发生的事件（模态框、抽屉、toast）和罕见的愉悦时刻（引导流程）。
- 保持 UI 动画在 300ms 以下。180ms 的下拉菜单感觉明显比 400ms 的好。典型范围：按钮按下 100–160ms，工具提示 125–200ms，下拉菜单 150–250ms，模态框/抽屉 200–500ms。
- 使用强烈的自定义缓动函数，而不是弱的 CSS 默认值。进入/退出 UI 时默认使用灵敏的 ease-out：`--ease-out: cubic-bezier(0.23, 1, 0.32, 1);`。对于移动/变形使用 `--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);`。永远不要对 UI 动画使用 `ease-in` ——它感觉迟缓。
- 按钮必须感觉响应迅速：在 `:active` 上添加 `transform: scale(0.97)` 并配合 ~160ms 的 ease-out 过渡，以便 UI 确认已听到用户操作。
- 永远不要从 `scale(0)` 开始动画——现实世界中没有任何东西是从无中生有的。从 `scale(0.95)` 结合 `opacity: 0` 开始。
- 原点感知的弹出层/下拉菜单：从触发点缩放进入（例如 `transform-origin: var(--radix-popover-content-transform-origin)`）。模态框是例外，保持居中。
- 对于动态 UI 状态，优先使用 CSS transitions 而非 @keyframes。Transitions 可以平滑地中断和反转中途飞行；keyframes 会从零重新开始，当中断时感觉断裂。
- 仅对 `transform` 和 `opacity` 进行动效处理——它们在 GPU 上运行并跳过布局/绘制。除非绝对必要，否则避免对 [width](file:///Users/jackqiaosan/Desktop/test/fire_alarm_viewer/client/src/lib/devices.ts#L28-L28), [height](file:///Users/jackqiaosan/Desktop/test/fire_alarm_viewer/client/src/lib/devices.ts#L29-L29), `padding`, `margin`, `top/left` 进行动画处理。
- 将成组元素的进入错开 30–80ms 以创建级联揭示效果，而不是一堵运动墙。
- 刻意操作的不对称计时：按住确认在按下时应缓慢且线性（例如 2s linear），但释放/取消应快速弹回（~200ms ease-out）。
- 尊重 `prefers-reduced-motion`：通过 `@media (prefers-reduced-motion: no-preference)` 限制非必要的动效。

---

## 预建组件

在实现 UI 功能之前，检查这些组件是否已存在：

地图：

- [client/src/components/Map.tsx](file:///Users/jackqiaosan/Desktop/test/fire_alarm_viewer/client/src/components/Map.tsx) - 带有代理身份验证的 Google Maps 集成。提供带有 onMapReady 回调的 MapView 组件，用于初始化 Google Maps 服务（Places, Geocoder, Directions, Drawing 等）。所有地图功能直接在浏览器中工作。

当实现匹配这些类别的功能时，必须先评估组件以决定是使用还是自定义它。

---

## 🗺️ 地图集成

**关键：Manus 代理提供对所有 Google Maps 功能的完全访问权限** - 包括高级绘图、热力图、街景、所有图层、Places API 等。不要向用户询问 Google Map API 密钥 - 身份验证是自动的。

**实现：**

- 前端：从 [client/src/components/Map.tsx](file:///Users/jackqiaosan/Desktop/test/fire_alarm_viewer/client/src/components/Map.tsx) 导入 MapView 并在 onMapReady 回调中初始化任何 Google Maps 服务（地理编码、方向、地点、绘图、可视化、几何等）。所有 Google Maps JavaScript API 功能直接在浏览器中工作。

永远不要使用外部地图库或向用户请求 API 密钥 - Manus 代理自动处理一切，没有功能限制。

---

## ✅ 发布检查清单

- [ ] UI 布局和导航结构正确，所有图片 src 有效。
- [ ] 在浏览器中验证成功 + 错误路径

---

## 核心文件参考

[package.json](file:///Users/jackqiaosan/Desktop/test/fire_alarm_viewer/package.json)

```tsx
{
  "name": "fire_alarm_viewer",
  "version": "1.0.0",
  "type": "module",
  "license": "MIT",
  "scripts": {
    "dev": "vite --host",
    "build": "vite build && esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist",
    "start": "NODE_ENV=production node dist/index.js",
    "preview": "vite preview --host",
    "check": "tsc --noEmit",
    "format": "prettier --write ."
  },
  "dependencies": {
    "@hookform/resolvers": "^5.2.2",
    "@radix-ui/react-accordion": "^1.2.12",
    "@radix-ui/react-alert-dialog": "^1.1.15",
    "@radix-ui/react-aspect-ratio": "^1.1.7",
    "@radix-ui/react-avatar": "^1.1.10",
    "@radix-ui/react-checkbox": "^1.3.3",
    "@radix-ui/react-collapsible": "^1.1.12",
    "@radix-ui/react-context-menu": "^2.2.16",
    "@radix-ui/react-dialog": "^1.1.15",
    "@radix-ui/react-dropdown-menu": "^2.1.16",
    "@radix-ui/react-hover-card": "^1.1.15",
    "@radix-ui/react-label": "^2.1.7",
    "@radix-ui/react-menubar": "^1.1.16",
    "@radix-ui/react-navigation-menu": "^1.2.14",
    "@radix-ui/react-popover": "^1.1.15",
    "@radix-ui/react-progress": "^1.1.7",
    "@radix-ui/react-radio-group": "^1.3.8",
    "@radix-ui/react-scroll-area": "^1.2.10",
    "@radix-ui/react-select": "^2.2.6",
    "@radix-ui/react-separator": "^1.1.7",
    "@radix-ui/react-slider": "^1.3.6",
    "@radix-ui/react-slot": "^1.2.3",
    "@radix-ui/react-switch": "^1.2.6",
    "@radix-ui/react-tabs": "^1.1.13",
    "@radix-ui/react-toggle": "^1.1.10",
    "@radix-ui/react-toggle-group": "^1.1.11",
    "@radix-ui/react-tooltip": "^1.2.8",
    "axios": "^1.12.0",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "cmdk": "^1.1.1",
    "embla-carousel-react": "^8.6.0",
    "express": "^4.21.2",
    "framer-motion": "^12.23.22",
    "input-otp": "^1.4.2",
    "lucide-react": "^0.453.0",
    "nanoid": "^5.1.5",
    "next-themes": "^0.4.6",
    "react": "^19.2.1",
    "react-day-picker": "^9.11.1",
    "react-dom": "^19.2.1",
    "react-hook-form": "^7.64.0",
    "react-resizable-panels": "^3.0.6",
    "recharts": "^2.15.2",
    "sonner": "^2.0.7",
    "streamdown": "^1.4.0",
    "tailwind-merge": "^3.3.1",
    "tailwindcss-animate": "^1.0.7",
    "vaul": "^1.1.2",
    "wouter": "^3.3.5",
    "zod": "^4.1.12"
  },
  "devDependencies": {
    "@builder.io/vite-plugin-jsx-loc": "^0.1.1",
    "@tailwindcss/typography": "^0.5.15",
    "@tailwindcss/vite": "^4.1.3",
    "@types/express": "4.17.21",
    "@types/google.maps": "^3.58.1",
    "@types/node": "^24.7.0",
    "@types/react": "^19.2.1",
    "@types/react-dom": "^19.2.1",
    "@vitejs/plugin-react": "^5.0.4",
    "add": "^2.0.6",
    "autoprefixer": "^10.4.20",
    "esbuild": "^0.25.0",
    "pnpm": "^10.15.1",
    "postcss": "^8.4.47",
    "prettier": "^3.6.2",
    "tailwindcss": "^4.1.14",
    "tsx": "^4.19.1",
    "tw-animate-css": "^1.4.0",
    "typescript": "5.6.3",
    "vite": "^7.1.7",
    "vite-plugin-manus-runtime": "^0.0.57",
    "vitest": "^2.1.4"
  },
  "packageManager": "pnpm@10.4.1+sha512.c753b6c3ad7afa13af388fa6d808035a008e30ea9993f58c6663e2bc5ff21679aa834db094987129aa4d488b86df57f7b634981b2f827cdcacc698cc0cfb88af",
  "pnpm": {
    "patchedDependencies": {
      "wouter@3.7.1": "patches/wouter@3.7.1.patch"
    },
    "overrides": {
      "tailwindcss>nanoid": "3.3.7"
    }
  }
}
```

`client/src/App.tsx`

```tsx
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/404"} component={NotFound} />
      {/* 最终 fallback 路由 */}
      <Route component={NotFound} />
    </Switch>
  );
}

// 注意：关于主题
// - 首先根据你的设计风格选择一个默认主题（深色或浅色背景），然后在 index.css 中更改调色板
//   以保持跨组件的前景色/背景色一致
// - 如果你想让主题可切换，传递 [switchable](file:///Users/jackqiaosan/Desktop/test/fire_alarm_viewer/client/src/contexts/ThemeContext.tsx#L7-L7) 给 ThemeProvider 并使用 [useTheme](file:///Users/jackqiaosan/Desktop/test/fire_alarm_viewer/client/src/contexts/ThemeContext.tsx#L57-L63) hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
```

`client/src/pages/Home.tsx`

```tsx
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Streamdown } from "streamdown";

/**
 * 此页面中的所有內容僅為示例，請替换为你自己的功能实现
 * 在构建页面时，请记住前端最佳实践、设计指南和常见陷阱中的指示
 */
export default function Home() {
  // 如果 App.tsx 中的主题是可切换的，我们可以像这样实现主题切换：
  // const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen flex flex-col">
      <main>
        {/* 示例：lucide-react 用于图标 */}
        <Loader2 className="animate-spin" />
        示例页面
        {/* 示例：Streamdown 用于 markdown 渲染 */}
        <Streamdown>任何 **markdown** 内容</Streamdown>
        <Button variant="default">示例按钮</Button>
      </main>
    </div>
  );
}
```

`client/src/index.css`

```tsx
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
}

:root {
  --primary: var(--color-blue-700);
  --primary-foreground: var(--color-blue-50);
  --sidebar-primary: var(--color-blue-600);
  --sidebar-primary-foreground: var(--color-blue-50);
  --chart-1: var(--color-blue-300);
  --chart-2: var(--color-blue-500);
  --chart-3: var(--color-blue-600);
  --chart-4: var(--color-blue-700);
  --chart-5: var(--color-blue-800);
  --radius: 0.65rem;
  --background: oklch(1 0 0);
  --foreground: oklch(0.235 0.015 65);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.235 0.015 65);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.235 0.015 65);
  --secondary: oklch(0.98 0.001 286.375);
  --secondary-foreground: oklch(0.4 0.015 65);
  --muted: oklch(0.967 0.001 286.375);
  --muted-foreground: oklch(0.552 0.016 285.938);
  --accent: oklch(0.967 0.001 286.375);
  --accent-foreground: oklch(0.141 0.005 285.823);
  --destructive: oklch(0.577 0.245 27.325);
  --destructive-foreground: oklch(0.985 0 0);
  --border: oklch(0.92 0.004 286.32);
  --input: oklch(0.92 0.004 286.32);
  --ring: oklch(0.623 0.214 259.815);
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.235 0.015 65);
  --sidebar-accent: oklch(0.967 0.001 286.375);
  --sidebar-accent-foreground: oklch(0.141 0.005 285.823);
  --sidebar-border: oklch(0.92 0.004 286.32);
  --sidebar-ring: oklch(0.623 0.214 259.815);
}

.dark {
  --primary: var(--color-blue-700);
  --primary-foreground: var(--color-blue-50);
  --sidebar-primary: var(--color-blue-500);
  --sidebar-primary-foreground: var(--color-blue-50);
  --background: oklch(0.141 0.005 285.823);
  --foreground: oklch(0.85 0.005 65);
  --card: oklch(0.21 0.006 285.885);
  --card-foreground: oklch(0.85 0.005 65);
  --popover: oklch(0.21 0.006 285.885);
  --popover-foreground: oklch(0.85 0.005 65);
  --secondary: oklch(0.24 0.006 286.033);
  --secondary-foreground: oklch(0.7 0.005 65);
  --muted: oklch(0.274 0.006 286.033);
  --muted-foreground: oklch(0.705 0.015 286.067);
  --accent: oklch(0.274 0.006 286.033);
  --accent-foreground:  oklch(0.92 0.005 65);
  --destructive: oklch(0.704 0.191 22.216);
  --destructive-foreground: oklch(0.985 0 0);
  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.488 0.243 264.376);
  --chart-1: var(--color-blue-300);
  --chart-2: var(--color-blue-500);
  --chart-3: var(--color-blue-600);
  --chart-4: var(--color-blue-700);
  --chart-5: var(--color-blue-800);
  --sidebar: oklch(0.21 0.006 285.885);
  --sidebar-foreground: oklch(0.85 0.005 65);
  --sidebar-accent: oklch(0.274 0.006 286.033);
  --sidebar-accent-foreground:  oklch(0.985 0 0);
  --sidebar-border: oklch(1 0 0 / 10%);
  --sidebar-ring: oklch(0.488 0.243 264.376);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
  button:not(:disabled),
  [role="button"]:not([aria-disabled="true"]),
  [type="button"]:not(:disabled),
  [type="submit"]:not(:disabled),
  [type="reset"]:not(:disabled),
  a[href],
  select:not(:disabled),
  input[type="checkbox"]:not(:disabled),
  input[type="radio"]:not(:disabled) {
    @apply cursor-pointer;
  }
}

@layer components {
  /**
   * 自定义容器工具类，使内容居中并添加响应式内边距。
   *
   * 这覆盖了 Tailwind 默认的容器行为以：
   * - 自动居中内容 (mx-auto)
   * - 添加响应式水平内边距
   * - 为大屏幕设置最大宽度
   *
   * 用法: <div className="container">...</div>
   *
   * 对于自定义宽度，直接使用 max-w-* 工具类:
   * <div className="max-w-6xl mx-auto px-4">...</div>
   */
  .container {
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    padding-left: 1rem; /* 16px - 移动端内边距 */
    padding-right: 1rem;
  }

  .flex {
    min-height: 0;
    min-width: 0;
  }

  @media (min-width: 640px) {
    .container {
      padding-left: 1.5rem; /* 24px - 平板端内边距 */
      padding-right: 1.5rem;
    }
  }

  @media (min-width: 1024px) {
    .container {
      padding-left: 2rem; /* 32px - 桌面端内边距 */
      padding-right: 2rem;
      max-width: 1280px; /* 标准内容宽度 */
    }
  }
}
```

[client/index.html](file:///Users/jackqiaosan/Desktop/test/fire_alarm_viewer/client/index.html)

```tsx
<!doctype html>
<html lang="en">

  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, maximum-scale=1" />
    <title>{{project_title}}</title>
    <!-- 这是注释块的开始，需删除的块：在此处添加 Google Fonts，例如：
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
    这是注释块的结束，需删除的块 -->
  </head>

  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
    <script
      defer
      src="%VITE_ANALYTICS_ENDPOINT%/umami"
      data-website-id="%VITE_ANALYTICS_WEBSITE_ID%"></script>
  </body>

</html>
```

[server/index.ts](file:///Users/jackqiaosan/Desktop/test/fire_alarm_viewer/server/index.ts)

```tsx
import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // 在生产环境中从 dist/public 提供静态文件
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // 处理客户端路由 - 为所有路由提供 index.html
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
```

---

## 常见陷阱

### 由不稳定引用导致的无限加载循环

**反模式：** 在渲染中创建新的对象/数组并用作查询输入

```tsx
// ❌ 错误：每次渲染都创建新的 Date() → 无限查询
const { data } = trpc.items.getByDate.useQuery({
  date: new Date(), // ← 每次渲染都是新对象！
});

// ❌ 错误：查询输入中的数组/对象字面量
const { data } = trpc.items.getByIds.useQuery({
  ids: [1, 2, 3], // ← 每次渲染都是新数组引用！
});
```

**正确方法：** 使用 useState/useMemo 稳定引用

```tsx
// ✅ 良好：使用 useState 初始化一次
const [date] = useState(() => new Date());
const { data } = trpc.items.getByDate.useQuery({ date });

// ✅ 良好：记忆复杂输入
const ids = useMemo(() => [1, 2, 3], []);
const { data } = trpc.items.getByIds.useQuery({ ids });
```

**原因：** TRPC 查询在输入引用更改时触发。在渲染中创建的对象/数组每次都有新引用，导致无限重新获取。

### 子页面中的导航死胡同

**问题：** 创建嵌套路由而没有退出路径——没有头部导航、没有侧边栏、没有返回按钮。

**根本原因：** 在建立全局布局结构之前先实现单个页面。

**解决方案：** 首先在 App.tsx 中定义布局包装器，然后在其中构建页面。对于管理工具使用 DashboardLayout；对于详情页面添加带有 `router.back()` 的返回按钮。

### 由于主题/颜色不匹配导致的不可见文本

**根本原因：** 语义颜色（`bg-background`, `text-foreground`）是 CSS 变量，根据 ThemeProvider 的活动主题解析。不匹配会导致文本不可见。

**两条关键规则：**

1. **主题与 CSS 变量匹配：** 如果 App.tsx 中 `defaultTheme="dark"`，确保 index.css 中的 `.dark {}` 具有深色背景 + 浅色前景值
2. **始终将 bg 与 text 配对：** 使用 `bg-{semantic}` 时，必须也使用 `text-{semantic}-foreground`（不是自动的 - 否则文本从父级继承）

**快速参考：**

```tsx
// ✅ 主题 + CSS 对齐
<ThemeProvider defaultTheme="dark">  {/* 必须匹配 index.css 中的 .dark */}
  <div className="bg-background text-foreground">...</div>
</ThemeProvider>

// ✅ 必需的类配对
<div className="bg-popover text-popover-foreground">...</div>
<div className="bg-card text-card-foreground">...</div>
<div className="bg-accent text-accent-foreground">...</div>
```

### Link 组件中的嵌套锚标签

**问题：** 在另一个 `<a>` 或 wouter 的 `<Link>` 内部包裹 `<a>` 标签会创建嵌套锚点并导致运行时错误。

**解决方案：** 直接将子元素传递给 Link——它内部已经渲染了一个 `<a>`。

```tsx
// ❌ 错误： <Link><a>...</a></Link> 或 <a><a>...</a></a>
// ✅ 良好： <Link>...</Link> 或 just <a>...</a>
```

### 空的 `Select.Item` 值

**规则：** 每个 `<Select.Item>` 必须有一个非空的 `value` 属性——永远不要是 `""`, `undefined` 或省略。

**规则：** 使用 sonner 进行 toast 通知；不要添加 react-toastify 或 @radix-ui/react-toast

**规则：** 如果你为 App.tsx 路由放置了占位符组件，在实现后必须用实际组件替换它们。
