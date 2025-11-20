# 系统架构文档 / System Architecture Documentation

## 1. 系统概览 / System Overview

JINZA 进销存与会计管理系统（Inventory, Purchase, Sales & Accounting Management System）是一个完全符合马来西亚商业法规的企业级管理平台。

### 1.1 核心目标

- ✅ **法规合规**：完全符合 Companies Act 2016、SST Act 2018、MFRS、LHDN 要求
- ✅ **实时管理**：库存、采购、销售、财务数据实时同步
- ✅ **审计追踪**：所有交易不可篡改，支持 7 年审计追溯
- ✅ **双语支持**：中英文界面，数据录入使用英文（符合法定要求）

### 1.2 技术栈

```
前端技术栈：
├─ HTML5 - 语义化结构
├─ CSS3 - 现代化样式（Grid/Flexbox）
├─ JavaScript (ES6+ Modules) - 模块化架构
└─ Font Awesome 6 - 图标库

数据层：
├─ LocalStorage - 客户端持久化（演示环境）
└─ IndexedDB - 大量数据存储（生产环境）

后端集成（生产环境）：
├─ RESTful API - 标准接口
├─ JWT Authentication - 安全认证
└─ PostgreSQL/MySQL - 关系型数据库
```

---

## 2. 系统架构 / System Architecture

### 2.1 模块化设计

```
jinza-web/
├── index.html                  # 企业官网首页
├── system.html                 # 系统主界面
├── css/
│   └── style.css              # 全局样式
├── js/
│   ├── script.js              # 首页交互
│   ├── system.js              # 系统主控制器（已废弃，改用模块化）
│   ├── models/                # 数据模型层
│   │   ├── inventory.model.js      # 库存数据模型
│   │   ├── purchase.model.js       # 采购数据模型
│   │   ├── sales.model.js          # 销售数据模型
│   │   ├── accounting.model.js     # 会计数据模型
│   │   ├── sst.model.js            # SST 税务模型
│   │   └── audit.model.js          # 审计日志模型
│   ├── services/              # 业务逻辑层
│   │   ├── inventory.service.js    # 库存管理服务
│   │   ├── purchase.service.js     # 采购管理服务
│   │   ├── sales.service.js        # 销售管理服务
│   │   ├── accounting.service.js   # 会计核算服务
│   │   ├── sst.service.js          # SST 计算服务
│   │   ├── reporting.service.js    # 报表生成服务
│   │   └── audit.service.js        # 审计追踪服务
│   ├── controllers/           # 控制器层
│   │   ├── inventory.controller.js # 库存模块控制器
│   │   ├── purchase.controller.js  # 采购模块控制器
│   │   ├── sales.controller.js     # 销售模块控制器
│   │   ├── accounting.controller.js# 会计模块控制器
│   │   └── dashboard.controller.js # 仪表板控制器
│   ├── utils/                 # 工具函数
│   │   ├── validators.js           # 数据验证
│   │   ├── formatters.js           # 数据格式化
│   │   ├── calculators.js          # 财务计算
│   │   └── exporters.js            # 数据导出
│   └── config/                # 配置文件
│       ├── constants.js            # 常量定义
│       ├── chartOfAccounts.js      # 会计科目表
│       └── sstTaxCodes.js          # SST 税码配置
├── docs/                      # 文档目录
│   ├── MALAYSIAN_COMPLIANCE.md     # 法规合规指南
│   ├── ARCHITECTURE.md             # 本架构文档
│   ├── API_DOCUMENTATION.md        # API 接口文档
│   └── USER_MANUAL.md              # 用户操作手册
└── tests/                     # 测试目录
    ├── unit/                       # 单元测试
    └── integration/                # 集成测试
```

### 2.2 数据流架构

```
用户界面 (UI)
    ↓
控制器 (Controllers) - 处理用户交互
    ↓
服务层 (Services) - 业务逻辑处理
    ↓
数据模型 (Models) - 数据验证与持久化
    ↓
存储层 (Storage) - LocalStorage / IndexedDB / API
```

---

## 3. 核心数据模型 / Core Data Models

### 3.1 库存模型 (Inventory Model)

```javascript
{
  id: "INV-2025-00001",
  sku: "3T-INT-PRIMER-20L",
  productName: "Interior Primer 20L",
  category: "Primers",
  brand: "3TREES",
  
  // 库存信息
  warehouse: "Kuching Hub",
  binLocation: "A-12-03",
  quantityOnHand: 128,
  quantityReserved: 15,
  quantityAvailable: 113,
  
  // 成本信息
  unitCost: 85.50,        // RM (不含 SST)
  sstRate: 0.10,          // 10% 销售税
  sstAmount: 8.55,        // RM
  totalCost: 94.05,       // RM (含 SST)
  
  // SST 分类
  sstTaxCode: "SR",       // Standard-rated
  hscode: "3208.10.00",   // Harmonized System Code
  
  // 批次管理
  batchNumber: "BATCH-2025-001",
  lotNumber: "LOT-KCH-001",
  manufacturingDate: "2025-01-15",
  expiryDate: "2027-01-15",
  
  // 状态
  status: "Available",    // Available, Reserved, Quarantine, Obsolete
  
  // 审计追踪
  createdBy: "admin@jinza.com",
  createdAt: "2025-01-20T08:30:00Z",
  updatedBy: "warehouse@jinza.com",
  updatedAt: "2025-11-21T14:22:00Z",
  version: 3
}
```

### 3.2 采购订单模型 (Purchase Order Model)

```javascript
{
  id: "PO-2025-00042",
  poNumber: "PO-2025-00042",
  poDate: "2025-11-15",
  
  // 供应商信息
  supplier: {
    id: "SUP-00012",
    name: "3TREES Group Sdn Bhd",
    tin: "C12345678901234",    // Tax Identification Number
    ssmNumber: "201234567890",  // SSM Registration
    address: "Lot 123, Jalan Industri, 47100 Puchong, Selangor",
    contactPerson: "Mr. Wong",
    phone: "+60123456789"
  },
  
  // 订单明细
  items: [
    {
      sku: "3T-INT-PRIMER-20L",
      productName: "Interior Primer 20L",
      quantity: 200,
      unitPrice: 75.00,         // RM (不含 SST)
      sstRate: 0.10,
      sstAmount: 1500.00,       // 200 × 75 × 10%
      totalAmount: 16500.00,    // RM (含 SST)
      hscode: "3208.10.00"
    }
  ],
  
  // 金额汇总
  subtotal: 15000.00,          // RM
  totalSST: 1500.00,           // RM
  shippingCost: 500.00,        // RM
  totalAmount: 17000.00,       // RM
  
  // 海关信息（进口订单）
  isImport: true,
  customsFormK1: "K1-2025-123456",
  customsFormK2: "K2-2025-123456",
  importDuty: 750.00,          // RM
  
  // 交付信息
  deliveryDate: "2025-11-25",
  deliveryAddress: "JINZA Kuching Hub Warehouse",
  shippingMethod: "Sea Freight",
  incoterms: "CIF",
  
  // 付款条款
  paymentTerms: "Net 30",
  dueDate: "2025-12-15",
  
  // 状态
  status: "Pending Delivery",  // Draft, Approved, Pending Delivery, Delivered, Cancelled
  
  // 会计分录关联
  journalEntryId: "JE-2025-00156",
  
  // 审计追踪
  createdBy: "purchase@jinza.com",
  createdAt: "2025-11-15T10:00:00Z",
  approvedBy: "manager@jinza.com",
  approvedAt: "2025-11-15T14:30:00Z",
  updatedBy: "warehouse@jinza.com",
  updatedAt: "2025-11-21T09:15:00Z",
  version: 2
}
```

### 3.3 销售订单模型 (Sales Order Model)

```javascript
{
  id: "SO-2025-00089",
  soNumber: "SO-2025-00089",
  soDate: "2025-11-20",
  invoiceNumber: "INV-2025-00089",
  
  // 客户信息
  customer: {
    id: "CUST-00456",
    name: "ABC Construction Sdn Bhd",
    tin: "C98765432109876",
    ssmNumber: "201987654321",
    address: "No. 45, Jalan Batu, 93100 Kuching, Sarawak",
    contactPerson: "Ms. Tan",
    phone: "+60198765432"
  },
  
  // 订单明细
  items: [
    {
      sku: "3T-INT-PRIMER-20L",
      productName: "Interior Primer 20L",
      quantity: 50,
      unitPrice: 120.00,        // RM (不含 SST)
      sstRate: 0.10,
      sstAmount: 600.00,        // 50 × 120 × 10%
      totalAmount: 6600.00,     // RM (含 SST)
      sstTaxCode: "SR",
      hscode: "3208.10.00"
    }
  ],
  
  // 金额汇总
  subtotal: 6000.00,           // RM
  discount: 300.00,            // RM (5% early payment discount)
  subtotalAfterDiscount: 5700.00,
  totalSST: 570.00,            // RM (10% on discounted amount)
  shippingCharge: 150.00,      // RM
  totalAmount: 6420.00,        // RM
  
  // 交付信息
  deliveryDate: "2025-11-22",
  deliveryAddress: "Customer Site - Jalan Batu",
  shippingMethod: "Own Truck",
  
  // 付款信息
  paymentTerms: "Net 14",
  dueDate: "2025-12-04",
  paymentStatus: "Pending",    // Pending, Partial, Paid
  
  // 电子发票 (e-Invoice)
  eInvoiceStatus: "Pending",   // Pending, Submitted, Validated, Rejected
  eInvoiceUUID: null,
  eInvoiceQRCode: null,
  eInvoiceSubmittedAt: null,
  
  // 状态
  status: "Pending Delivery",  // Draft, Confirmed, Pending Delivery, Delivered, Cancelled
  
  // 会计分录关联
  journalEntryId: "JE-2025-00234",
  
  // 审计追踪
  createdBy: "sales@jinza.com",
  createdAt: "2025-11-20T11:00:00Z",
  approvedBy: "manager@jinza.com",
  approvedAt: "2025-11-20T15:00:00Z",
  deliveredBy: "driver@jinza.com",
  deliveredAt: null,
  updatedBy: "sales@jinza.com",
  updatedAt: "2025-11-21T08:00:00Z",
  version: 1
}
```

### 3.4 会计分录模型 (Journal Entry Model)

```javascript
{
  id: "JE-2025-00234",
  journalNumber: "JE-2025-00234",
  entryDate: "2025-11-20",
  postingDate: "2025-11-20",
  
  // 分录类型
  entryType: "Sales Invoice",  // General, Sales Invoice, Purchase Invoice, Payment, Receipt, Adjustment
  
  // 关联单据
  referenceType: "SalesOrder",
  referenceId: "SO-2025-00089",
  referenceNumber: "INV-2025-00089",
  
  // 描述
  description: "Sales Invoice INV-2025-00089 - ABC Construction Sdn Bhd",
  
  // 分录明细（复式记账）
  lines: [
    {
      lineNumber: 1,
      accountCode: "1120",       // Accounts Receivable
      accountName: "Accounts Receivable - Trade",
      debitAmount: 6420.00,
      creditAmount: 0,
      description: "Invoice to ABC Construction"
    },
    {
      lineNumber: 2,
      accountCode: "4100",       // Sales Revenue
      accountName: "Sales Revenue - Products",
      debitAmount: 0,
      creditAmount: 5700.00,
      description: "Sales of Interior Primer"
    },
    {
      lineNumber: 3,
      accountCode: "2120",       // SST Payable
      accountName: "SST Payable - Sales Tax",
      debitAmount: 0,
      creditAmount: 570.00,
      description: "SST 10% on sales"
    },
    {
      lineNumber: 4,
      accountCode: "4200",       // Other Revenue
      accountName: "Shipping Revenue",
      debitAmount: 0,
      creditAmount: 150.00,
      description: "Delivery charges"
    }
  ],
  
  // 合计校验（借贷平衡）
  totalDebit: 6420.00,
  totalCredit: 6420.00,
  balanced: true,
  
  // 状态
  status: "Posted",            // Draft, Posted, Void
  
  // 会计期间
  fiscalYear: 2025,
  fiscalPeriod: 11,            // November
  
  // 审计追踪
  createdBy: "sales@jinza.com",
  createdAt: "2025-11-20T11:05:00Z",
  postedBy: "accountant@jinza.com",
  postedAt: "2025-11-20T16:00:00Z",
  version: 1
}
```

### 3.5 审计日志模型 (Audit Log Model)

```javascript
{
  id: "AUDIT-2025-123456",
  timestamp: "2025-11-21T14:22:35.123Z",
  
  // 用户信息
  userId: "warehouse@jinza.com",
  userName: "Warehouse Manager",
  userRole: "Warehouse",
  ipAddress: "192.168.1.45",
  userAgent: "Mozilla/5.0...",
  
  // 操作信息
  action: "UPDATE",            // CREATE, READ, UPDATE, DELETE, APPROVE, VOID
  module: "Inventory",
  entityType: "InventoryItem",
  entityId: "INV-2025-00001",
  
  // 变更详情
  changes: {
    before: {
      quantityOnHand: 143,
      status: "Available"
    },
    after: {
      quantityOnHand: 128,
      status: "Available"
    }
  },
  
  // 业务上下文
  description: "Stock adjustment - Physical count variance",
  referenceType: "StockAdjustment",
  referenceId: "ADJ-2025-00012",
  
  // 合规标记
  retentionPeriod: 7,          // Years (法定保存期限)
  deletable: false,            // 不可删除
  
  // 风险等级
  riskLevel: "MEDIUM"          // LOW, MEDIUM, HIGH, CRITICAL
}
```

---

## 4. 核心业务流程 / Core Business Processes

### 4.1 采购入库流程

```
1. 创建采购订单 (Create Purchase Order)
   ├─ 验证供应商信息（SSM、TIN）
   ├─ 选择产品与数量
   ├─ 计算 SST 与进口税
   └─ 生成会计预提分录

2. 订单审批 (Approve PO)
   ├─ 财务审核
   ├─ 管理层批准
   └─ 发送给供应商

3. 海关清关（进口订单）
   ├─ 录入 K1/K2 单号
   ├─ 缴纳进口税
   └─ 更新库存成本

4. 收货入库 (Goods Receipt)
   ├─ 质检验收
   ├─ 录入批次/批号
   ├─ 更新库存数量
   └─ 生成会计分录：
      借：库存商品 (1130)
      借：进项 SST 待抵扣 (1140)
      贷：应付账款 (2110)

5. 供应商付款 (Payment)
   └─ 生成会计分录：
      借：应付账款 (2110)
      贷：银行存款 (1110)
```

### 4.2 销售出库流程

```
1. 创建销售订单 (Create Sales Order)
   ├─ 验证客户信息
   ├─ 检查库存可用性
   ├─ 计算 SST（按 Tax Code）
   └─ 预留库存

2. 订单确认 (Confirm SO)
   ├─ 信用额度检查
   ├─ 生成拣货单
   └─ 准备发货

3. 发货与电子发票 (Delivery & e-Invoice)
   ├─ 出库扫描
   ├─ 生成 e-Invoice XML
   ├─ 提交 MyInvois 平台
   ├─ 获取 UUID 与 QR Code
   └─ 生成会计分录：
      借：应收账款 (1120)
      贷：销售收入 (4100)
      贷：应交 SST (2120)

4. 成本结转 (Cost of Goods Sold)
   └─ 生成会计分录：
      借：销售成本 (5100)
      贷：库存商品 (1130)

5. 客户付款 (Receipt)
   └─ 生成会计分录：
      借：银行存款 (1110)
      贷：应收账款 (1120)
```

### 4.3 SST 申报流程

```
1. 数据收集（每 2 个月）
   ├─ 汇总所有销售交易
   ├─ 按 Tax Code 分类
   └─ 计算应缴 SST

2. SST-02 表单生成
   ├─ 标准税率销售额 (SR)
   ├─ 零税率销售额 (ZR)
   ├─ 豁免销售额 (ES)
   └─ 总应缴税额

3. 在线申报
   ├─ 登录 MySST 系统
   ├─ 上传 SST-02 表单
   └─ 获取申报回执

4. 税款缴纳
   └─ 生成会计分录：
      借：应交 SST (2120)
      贷：银行存款 (1110)
```

### 4.4 期末结账流程

```
1. 月末/年末调整
   ├─ 计提折旧
   ├─ 摊销费用
   ├─ 坏账准备
   └─ 库存跌价准备

2. 试算平衡表
   ├─ 汇总所有科目余额
   ├─ 验证借贷平衡
   └─ 检查异常科目

3. 生成财务报表
   ├─ 资产负债表
   ├─ 损益表
   ├─ 现金流量表
   └─ 权益变动表

4. 利润结转
   └─ 生成会计分录：
      借：销售收入 (4100)
      借：其他收入 (4200)
      贷：销售成本 (5100)
      贷：费用类科目 (6XXX)
      贷：本年利润 (3300)
```

---

## 5. 安全与权限控制 / Security & Access Control

### 5.1 角色定义 (RBAC)

| 角色 | 权限范围 |
|------|----------|
| **Administrator** | 系统管理、用户管理、全部数据访问 |
| **Finance Manager** | 会计、财务报表、税务申报 |
| **Purchase Manager** | 采购订单、供应商管理、审批 |
| **Sales Manager** | 销售订单、客户管理、审批 |
| **Warehouse Staff** | 库存查看、收发货操作 |
| **Accountant** | 会计分录、账簿查询 |
| **Auditor** | 只读访问所有数据、审计日志 |

### 5.2 数据权限矩阵

|          | Create | Read | Update | Delete | Approve | Void |
|----------|--------|------|--------|--------|---------|------|
| Admin    | ✅     | ✅   | ✅     | ✅     | ✅      | ✅   |
| Finance  | ✅     | ✅   | ✅     | ❌     | ✅      | ✅   |
| Purchase | ✅     | ✅   | ✅     | ❌     | ⚠️      | ❌   |
| Sales    | ✅     | ✅   | ✅     | ❌     | ⚠️      | ❌   |
| Warehouse| ⚠️     | ✅   | ⚠️     | ❌     | ❌      | ❌   |
| Auditor  | ❌     | ✅   | ❌     | ❌     | ❌      | ❌   |

---

## 6. 性能与扩展性 / Performance & Scalability

### 6.1 当前限制（演示环境）

- LocalStorage: ~5-10 MB
- IndexedDB: ~50 MB - 数百 MB（视浏览器）
- 适用规模：小型企业（< 1000 交易/月）

### 6.2 生产环境建议

```
前端：
├─ 使用 Webpack/Vite 打包优化
├─ 代码分割与懒加载
└─ CDN 静态资源加速

后端：
├─ Node.js / Python / Java 后端
├─ PostgreSQL / MySQL 数据库
├─ Redis 缓存层
└─ Nginx 反向代理

部署：
├─ Docker 容器化
├─ Kubernetes 编排
└─ AWS/Azure 云平台
```

---

## 7. 版本历史 / Version History

| 版本 | 日期 | 更新内容 |
|------|------|----------|
| 1.0.0 | 2025-01-21 | 初始系统上线 |
| 1.5.0 | 2025-06-30 | e-Invoice 集成 |
| 2.0.0 | 2025-11-21 | 完整模块化重构 |

---

**文档维护 / Document Maintained by:** JINZA Technical Team  
**最后更新 / Last Updated:** 2025年11月21日
