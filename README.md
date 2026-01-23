# 柴火基地车 | Chaihuo MCV

[![Open Source Hardware](https://img.shields.io/badge/Open%20Source-Hardware-blue)](https://www.oshwa.org/)
[![License](https://img.shields.io/badge/License-CERN--OHL--S--2.0-green)](LICENSE)

**让创新的星火，照亮每一片土地**

柴火基地车是一个开源的移动创客空间项目。我们将一辆厢式货车改造成配备 3D 打印机、激光切割机等设备的移动 AI 实验室，巡游全国，为偏远地区带去 STEM 教育资源的同时，和大家一起发现和解决问题，共创解决方案。

## 项目结构

```
chaihuo-vancar/
├── website/          # 宣传网站 (Astro + Cloudflare)
├── design/           # 设计源文件（可编辑）
│   ├── mechanical/   # 机械 CAD (STEP, 原生格式)
│   └── electrical/   # 电气原理图 (KiCad 等)
├── fabrication/      # 制造文件（给机器/供应商）
│   ├── 3d-print/     # STL/3MF 打印文件
│   ├── pcb/          # Gerber, 贴片文件
│   ├── cut/          # DXF 激光/CNC 切割
│   ├── bom/          # 物料清单 (CSV/Excel)
│   └── wiring/       # 接线图 (PDF)
└── operation/        # 运行代码
    ├── firmware/     # 嵌入式代码 (MCU)
    └── software/     # 服务器、IoT、控制软件
```

## 快速入口

| 内容 | 链接 |
|------|------|
| 项目官网 | [website/](./website/) |
| 详细文档 | [语雀文档](https://www.yuque.com/chaihuo-mcv/home) |
| 物料清单(coming soon) | [fabrication/bom/](./fabrication/bom/) |
| 3D 打印文件(coming soon) | [fabrication/3d-print/](./fabrication/3d-print/) |

## 开始使用

### 本地预览落地页网站

```bash
cd website
npm install
npm run dev
```

访问 `http://localhost:4321`

### 下载设计文件

直接浏览 `design/` 和 `fabrication/` 目录，或使用 GitHub Releases 下载打包文件。

## 贡献

我们欢迎各种形式的贡献：

- 提交 Issue 报告问题
- 提交 PR 改进设计
- 分享你的复刻经验

## 许可证

- **硬件设计**: [CERN-OHL-S-2.0](https://ohwr.org/cernohl)
- **软件代码**: [MIT License](LICENSE)
- **文档内容**: [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)

## 联系我们

- Email: tech@chaihuo.org
- 微信公众号: 柴火创客空间

---

Made with ❤️ by [Chaihuo Makerspace](https://chaihuo.org)
