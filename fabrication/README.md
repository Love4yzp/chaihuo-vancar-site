# Fabrication | 制造文件

此目录包含所有可直接用于制造的输出文件。

## 目录结构

```
fabrication/
├── 3d-print/   # 3D 打印文件 (STL/3MF)
├── pcb/        # PCB 制造文件 (Gerber, BOM, Pick&Place)
├── cut/        # 激光/CNC 切割文件 (DXF)
├── bom/        # 物料清单 (CSV/Excel)
└── wiring/     # 接线图 (PDF)
```

## 使用说明

### 3D 打印

- 推荐材料: PLA / PETG
- 层高: 0.2mm
- 填充: 20-30%
- 详细打印参数见各文件注释

### PCB 制造

- 提交 `pcb/` 目录下的 Gerber 文件给 PCB 厂商（如嘉立创）
- BOM 和坐标文件用于 SMT 贴片

### 物料清单

- `bom/` 目录包含完整物料清单和采购链接
- 价格仅供参考，以实际采购为准

## 详细文档

→ [语雀文档](https://yuque.com/chaihuo-vancar)
