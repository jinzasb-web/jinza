# 🚀 JINZA 系统开发测试指南 / Development Testing Guide

## 📌 快速开始 / Quick Start

### 方法一：使用开发入口页面（推荐）

1. **打开测试入口**
   ```
   直接在浏览器中打开: dev-entry.html
   ```

2. **选择测试账户**
   - **管理员 (Administrator)**: 完整系统访问权限
   - **运营经理 (Operations Manager)**: 进销存模块权限
   - **会计师 (Accountant)**: 会计模块权限

3. **进入系统**
   - 点击账户卡片自动登录
   - 或点击"直接进入系统"按钮（管理员权限）

### 方法二：直接访问系统页面

```
直接打开: system.html
```
⚠️ 需要先通过 dev-entry.html 设置用户会话，否则会被重定向

---

## 🎯 测试入口功能 / Entry Features

### 1. 三种测试账户 / Three Test Accounts

| 账户类型 | 用户名 | 权限范围 | 使用场景 |
|---------|--------|---------|---------|
| **管理员** | admin@jinza.com | 所有模块 | 完整功能测试 |
| **运营经理** | ops.manager@jinza.com | 进销存 | 库存管理测试 |
| **会计师** | accountant@jinza.com | 会计 | 财务模块测试 |

### 2. 快速访问链接 / Quick Access

- **完整系统界面**: 跳转到 system.html
- **系统架构文档**: docs/ARCHITECTURE.md
- **合规性文档**: docs/MALAYSIAN_COMPLIANCE.md
- **开发者控制台**: 浏览器 Console 调试信息

### 3. 键盘快捷键 / Keyboard Shortcuts

- `Ctrl + Enter`: 快速进入系统（管理员）
- `Ctrl + 1`: 以管理员身份登录
- `Ctrl + 2`: 以运营经理身份登录
- `Ctrl + 3`: 以会计师身份登录

---

## 🏗️ 系统架构概览 / Architecture Overview

```
jinza-web/
├── dev-entry.html           # 🆕 开发测试入口（本页面）
├── index.html               # 企业展示页面（已移除登录功能）
├── system.html              # 系统主界面（需要认证）
│
├── css/
│   └── style.css           # 全局样式
│
├── js/
│   ├── system-app.js       # 系统主入口（ES6 模块）
│   ├── config/
│   │   ├── constants.js    # 系统配置常量
│   │   └── chartOfAccounts.js  # 马来西亚会计科目表
│   │
│   ├── services/           # 业务服务层
│   │   ├── inventory.service.js  # ✅ 库存服务（已完成）
│   │   ├── purchase.service.js   # 🚧 采购服务（开发中）
│   │   ├── sales.service.js      # 🚧 销售服务（开发中）
│   │   └── accounting.service.js # 🚧 会计服务（开发中）
│   │
│   └── utils/
│       └── demoData.js     # 演示数据初始化
│
└── docs/
    ├── ARCHITECTURE.md              # 系统架构设计
    ├── MALAYSIAN_COMPLIANCE.md      # 马来西亚合规性文档
    ├── CLEANUP_REPORT.md            # 清理报告
    └── LOGIN_MODULE_REMOVAL.md      # 登录模块移除报告
```

---

## ✅ 已完成模块 / Completed Modules

### 1. 库存服务 (Inventory Service)

**文件**: `js/services/inventory.service.js`

**功能特性**:
- ✅ 完整的 CRUD 操作（创建、读取、更新、删除）
- ✅ SST 6% 自动计算
- ✅ 加权平均成本法 (Weighted Average Cost)
- ✅ 库存余额实时更新
- ✅ 低库存警告
- ✅ 批次追踪 (Batch Tracking)
- ✅ LocalStorage 持久化

**测试方法**:
```javascript
// 在浏览器 Console 中测试
import InventoryService from './js/services/inventory.service.js';
const inventory = new InventoryService();

// 添加产品
await inventory.addProduct({
    sku: 'TEST001',
    name: 'Test Product',
    category: 'Electronics',
    unit: 'PCS',
    reorderLevel: 10,
    isSSTable: true
});

// 查询所有产品
const products = await inventory.getAllProducts();
console.table(products);
```

### 2. 系统配置 (System Configuration)

**文件**: 
- `js/config/constants.js` - 系统常量配置
- `js/config/chartOfAccounts.js` - 39个会计科目（符合 MFRS）

### 3. 马来西亚合规性 (Malaysian Compliance)

**文档**: `docs/MALAYSIAN_COMPLIANCE.md`

**涵盖法规**:
- ✅ SST Act 2018 (6% 销售与服务税)
- ✅ MFRS (Malaysian Financial Reporting Standards)
- ✅ Companies Act 2016
- ✅ LHDN e-Invoice 准备
- ✅ MS ISO 仓储标准

---

## 🚧 开发中模块 / In Development

### 待实现服务 / Pending Services

1. **采购服务 (Purchase Service)**
   - 采购订单管理
   - 供应商管理
   - 收货验收
   - 应付账款集成

2. **销售服务 (Sales Service)**
   - 销售订单管理
   - 客户管理
   - 发货跟踪
   - 应收账款集成

3. **会计服务 (Accounting Service)**
   - 复式记账引擎
   - 总账管理
   - 试算平衡表
   - 财务报表生成

4. **报表引擎 (Reporting Engine)**
   - 库存报表
   - 财务报表
   - SST 报表
   - 审计追踪报告

---

## 🔧 开发者工具 / Developer Tools

### 浏览器控制台命令 / Console Commands

打开 dev-entry.html 后，按 `F12` 打开控制台，可使用以下命令：

```javascript
// 快速登录
loginAs('admin')       // 管理员登录
loginAs('operations')  // 运营经理登录
loginAs('accountant')  // 会计师登录

// 查看当前会话
localStorage.getItem('jinzaUser')

// 清除所有数据
localStorage.clear()

// 查看所有测试账户
console.table(testAccounts)
```

### LocalStorage 数据结构 / Storage Structure

```javascript
// 用户会话
{
  "jinzaUser": {
    "username": "admin@jinza.com",
    "role": "Administrator",
    "fullName": "System Administrator",
    "permissions": ["inventory", "accounting", "compliance", "settings", "users"],
    "department": "IT",
    "issuedAt": "2025-11-21T10:00:00.000Z",
    "expiresAt": "2025-11-22T10:00:00.000Z",
    "isDevelopmentMode": true
  }
}

// 库存数据
{
  "jinza_inventory_products": [...],
  "jinza_inventory_movements": [...],
  "jinza_inventory_batches": [...]
}
```

---

## 📊 系统状态 / System Status

### 版本信息 / Version Info

- **当前版本**: v2.1.0
- **最后更新**: 2025-11-21
- **开发状态**: 🚧 开发中 (In Development)

### 完成度 / Completion Status

```
进度总览 / Overall Progress:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 30%

✅ 已完成 (Completed):
├─ 马来西亚合规文档 (Malaysian Compliance Docs)     100%
├─ 系统架构设计 (System Architecture)              100%
├─ 配置文件 (Configuration Files)                 100%
├─ 库存服务 (Inventory Service)                   100%
└─ 开发测试环境 (Development Environment)          100%

🚧 开发中 (In Progress):
├─ 采购服务 (Purchase Service)                      0%
├─ 销售服务 (Sales Service)                        0%
├─ 会计服务 (Accounting Service)                   0%
├─ 用户界面 (User Interface)                       40%
└─ 报表引擎 (Reporting Engine)                      0%

📋 计划中 (Planned):
├─ RBAC 权限系统 (RBAC System)
├─ 后端 API 集成 (Backend Integration)
├─ 生产级认证 (Production Auth)
└─ 单元测试 (Unit Tests)
```

---

## 🎓 学习资源 / Learning Resources

### 必读文档 / Required Reading

1. **[ARCHITECTURE.md](docs/ARCHITECTURE.md)**
   - 系统整体架构设计
   - 数据库模式（39个会计科目）
   - 技术栈说明

2. **[MALAYSIAN_COMPLIANCE.md](docs/MALAYSIAN_COMPLIANCE.md)**
   - SST Act 2018 详解
   - MFRS 会计准则
   - Companies Act 2016
   - LHDN e-Invoice

3. **[LOGIN_MODULE_REMOVAL.md](docs/LOGIN_MODULE_REMOVAL.md)**
   - 登录模块移除详情
   - 系统影响分析
   - 后续建议

### 代码示例 / Code Examples

查看 `js/services/inventory.service.js` 了解：
- ES6 模块化开发模式
- LocalStorage CRUD 操作
- SST 税额计算逻辑
- 加权平均成本算法

---

## ⚠️ 重要提示 / Important Notes

### 认证机制 / Authentication

> 当前使用 **LocalStorage 模拟认证**，仅用于开发测试！

**生产环境建议**:
1. 实现后端 JWT/OAuth 2.0 认证
2. 使用 HTTPS 加密传输
3. 实现会话过期管理
4. 添加双因素认证 (2FA)

### 数据持久化 / Data Persistence

> 当前使用 **LocalStorage** 存储数据，浏览器清除缓存会丢失数据！

**生产环境建议**:
1. 集成后端 API (Node.js/Laravel)
2. 使用 MySQL/PostgreSQL 数据库
3. 实现数据备份机制
4. 添加数据导入/导出功能

### 合规性 / Compliance

> 系统设计符合马来西亚法规，但实际部署需要：

1. ✅ 通过 LHDN 认证的会计软件审核
2. ✅ 实现完整的审计追踪
3. ✅ 符合 GDPR/PDPA 数据保护法
4. ✅ 定期更新税率和会计准则

---

## 🤝 贡献指南 / Contributing

### 开发工作流 / Development Workflow

1. **选择任务**: 查看 TODO List 选择未完成任务
2. **创建分支**: 从 `jinza-web` 分支创建功能分支
3. **开发功能**: 使用 `dev-entry.html` 进行测试
4. **提交代码**: 遵循 Conventional Commits 规范
5. **推送更新**: 推送到远程仓库

### 代码规范 / Code Standards

- **JavaScript**: ES6+ 模块化开发
- **CSS**: BEM 命名规范
- **注释**: 中英文双语注释
- **文档**: Markdown 格式

---

## 📞 联系方式 / Contact

- **项目仓库**: https://github.com/jinzasb-web/jinza
- **当前分支**: jinza-web
- **问题报告**: GitHub Issues

---

**最后更新 / Last Updated**: 2025-11-21  
**文档版本 / Doc Version**: 1.0.0  
**系统版本 / System Version**: 2.1.0
