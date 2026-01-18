# 柴火流动空间 - 网站项目

[![Astro](https://img.shields.io/badge/Astro-4.x-FF5D01?logo=astro)](https://astro.build)
[![React](https://img.shields.io/badge/React-19.x-61DAFB?logo=react)](https://react.dev)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.x-38B2AC?logo=tailwind-css)](https://tailwindcss.com)
[![DaisyUI](https://img.shields.io/badge/DaisyUI-Latest-5A0EF8?logo=daisyui)](https://daisyui.com)

这是柴火流动空间的官方营销网站，用于展示我们的公益项目、全国巡游路线和技术下乡的影响力。

## 📂 项目结构

```
chaihuo-vancar-site/
├── src/
│   ├── components/          # 可复用组件
│   │   ├── Hero.jsx        # 首屏英雄区（React）
│   │   ├── ProjectIntro.astro  # 项目介绍
│   │   └── Contact.astro   # 联系我们
│   ├── layouts/
│   │   └── MainLayout.astro    # 主布局（包含导航栏和页脚）
│   ├── pages/
│   │   └── index.astro     # 主页（单页应用）
│   └── styles/
│       └── global.css      # 全局样式和主题配置
├── public/                 # 静态资源（图片等）
└── astro.config.mjs        # Astro 配置文件
```

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 `http://localhost:4321` 查看网站

### 构建生产版本

```bash
npm run build
```

## ✏️ 如何修改内容（志愿者指南）

### 1️⃣ 修改文字内容

#### 修改首屏标题和副标题

打开 `src/components/Hero.jsx`，找到：

```jsx
<h1 className="...">
  让创新的星火
  <br />
  <span className="text-chaihuo">照亮每一片土地</span>
</h1>
```

直接修改中文文字即可。

#### 修改项目介绍卡片

打开 `src/components/ProjectIntro.astro`，找到三个卡片的内容：

```html
<h3 class="card-title text-2xl">移动实验室</h3>
<p class="text-base-content/70">
  配备3D打印机、激光切割机...
</p>
```

修改 `<h3>` 和 `<p>` 标签内的文字。

#### 修改统计数据

在 `src/components/ProjectIntro.astro` 底部找到：

```html
<div class="stat-value text-chaihuo">12</div>
```

修改数字即可。

### 2️⃣ 修改图片

#### 替换首屏背景图

1. 准备一张图片（建议尺寸：1920x1080 或更大）
2. 将图片放入 `public/` 文件夹
3. 在 `src/components/Hero.jsx` 中修改：

```jsx
backgroundImage: 'url(/你的图片名.jpg)',
```

### 3️⃣ 修改颜色主题

打开 `src/styles/global.css`：

```css
/* 柴火品牌橙色 */
--color-chaihuo: oklch(0.70 0.15 40);

/* 大地色调 */
--color-earth: oklch(0.65 0.08 80);
--color-tech-blue: oklch(0.60 0.12 240);
```

想要调整颜色？修改 `oklch()` 中的数值：

- 第一个数：明度 (0-1，越大越亮)
- 第二个数：饱和度 (0-0.4，越大越鲜艳)
- 第三个数：色相 (0-360，颜色角度)

推荐使用工具：[oklch.com](https://oklch.com) 来可视化选择颜色

### 4️⃣ 添加新的巡游地点

打开 `src/pages/index.astro`，找到时间线部分，复制一个 `<li>` 块：

```html
<li>
  <hr class="bg-chaihuo"/>
  <div class="timeline-start">2024.03</div>  <!-- 修改日期 -->
  <div class="timeline-middle">...</div>
  <div class="timeline-end timeline-box">深圳启动</div>  <!-- 修改地点 -->
  <hr class="bg-chaihuo"/>
</li>
```

### 5️⃣ 添加新的影响力故事

在 `src/pages/index.astro` 的 `#impact` 区块，复制一个卡片：

```html
<div class="card bg-base-200 shadow-xl">
  <div class="card-body">
    <h3 class="card-title text-2xl">故事标题</h3>
    <p class="text-base-content/70">
      故事内容...
    </p>
    <div class="card-actions justify-end">
      <div class="badge badge-outline">地点</div>
      <div class="badge badge-outline">标签</div>
    </div>
  </div>
</div>
```

## 🎨 设计系统

### 颜色变量

- `text-chaihuo` - 柴火橙色
- `text-earth` - 大地色
- `text-tech-blue` - 科技蓝

### DaisyUI 组件

我们使用 DaisyUI 组件库，常用组件：

- `btn` - 按钮
- `card` - 卡片
- `navbar` - 导航栏
- `hero` - 英雄区
- `badge` - 标签
- `stats` - 统计数据
- `timeline` - 时间线

完整文档：[daisyUI Components](https://daisyui.com/components/)

## 📱 移动端适配

网站已经做了完整的移动端适配，使用 Tailwind 的响应式前缀：

- 无前缀 = 移动端（默认）
- `sm:` = 小屏幕 (640px+)
- `md:` = 中等屏幕 (768px+)
- `lg:` = 大屏幕 (1024px+)

例如：

```html
<h1 class="text-4xl md:text-6xl">
  <!-- 移动端 4xl，桌面端 6xl -->
</h1>
```

## 🛠️ 技术栈

- **Astro 4.x** - 现代化静态网站生成器
- **React 19** - 交互式组件
- **Tailwind CSS 4** - 实用优先的 CSS 框架
- **DaisyUI** - Tailwind 组件库

## 📝 常见问题

### Q: 修改后没有生效？

A: 确保开发服务器正在运行（`npm run dev`），刷新浏览器页面（Cmd+R 或 Ctrl+R）

### Q: 如何查看是否有代码错误？

A: 查看终端窗口，Astro 会显示错误信息

### Q: 部署到哪里？

A: 可以部署到 Vercel、Netlify、GitHub Pages 等平台。运行 `npm run build` 后，将 `dist/` 文件夹部署即可。

## 👥 贡献指南

欢迎所有志愿者参与！提交修改前：

1. 在本地测试确保页面正常显示
2. 确保文字没有错别字
3. 确保移动端也能正常显示

## 📞 需要帮助？

如果遇到技术问题，请联系：

- Email: <tech@chaihuo.org>
- 微信群：柴火技术志愿者群

---

**Made with ❤️ by Chaihuo Makerspace**
