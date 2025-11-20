# 马来西亚商业法规合规指南 / Malaysian Business Compliance Guide

## 概述 / Overview

本文档详细说明 JINZA 进销存与会计系统如何满足马来西亚的法律、税务和会计准则要求。

---

## 1. 公司法规 / Companies Act 2016

### 1.1 会计记录要求 (Section 245)

**法规要求：**
- 必须保存完整且准确的会计记录
- 记录必须能够真实反映公司的财务状况
- 记录保存期限：至少 7 年

**系统实现：**
- ✅ 完整的复式记账系统（Double-entry bookkeeping）
- ✅ 所有交易自动生成会计分录（Journal entries）
- ✅ 不可篡改的审计追踪（Immutable audit trail）
- ✅ 交易时间戳和用户记录（Timestamped user logs）

### 1.2 财务报表要求 (Section 248)

**法规要求：**
- 年度财务报表必须符合批准的会计准则（MFRS）
- 必须包含：资产负债表、损益表、现金流量表、权益变动表

**系统实现：**
- ✅ 符合 MFRS 的会计科目表（MFRS-compliant Chart of Accounts）
- ✅ 自动生成标准财务报表（Auto-generated financial statements）
- ✅ 期末调整与结账流程（Period-end adjustments & closing）

### 1.3 审计追踪 (Section 247)

**法规要求：**
- 必须保留所有交易的完整审计追踪
- 审计师必须能够验证所有记录的真实性

**系统实现：**
- ✅ 每笔交易记录创建人、时间、IP 地址
- ✅ 所有修改保留历史版本（Version history）
- ✅ 删除操作仅标记为"已作废"，不真正删除（Soft delete）
- ✅ 审计日志导出功能（Audit log export）

---

## 2. 销售与服务税法 / Sales and Service Tax Act 2018

### 2.1 SST 注册与税率

**SST 类型：**
- **销售税 (Sales Tax)**：适用于制造商和进口商，税率 5% 或 10%
- **服务税 (Service Tax)**：适用于特定服务，税率 6%

**JINZA 业务适用：**
- 涂料产品进口/销售：**销售税 10%**（石油化工产品）
- 仓储与物流服务：**服务税 6%**

### 2.2 SST Tax Code 标准

| Tax Code | 描述 | 税率 | 适用场景 |
|----------|------|------|----------|
| **SR** | Standard-rated | 6% / 10% | 应税货物/服务 |
| **ZR** | Zero-rated | 0% | 出口货物、指定必需品 |
| **ES** | Exempt supply | N/A | 豁免货物/服务 |
| **OS** | Out of scope | N/A | 非 SST 范围交易 |
| **RS** | Relief supply | 0% | 获豁免的特定供应 |

### 2.3 SST-02 申报要求

**申报周期：**
- 销售税：每 2 个月申报一次
- 服务税：每 2 个月申报一次
- 截止日期：申报期结束后 28 天内

**系统实现：**
- ✅ 自动按 Tax Code 分类销售额
- ✅ 计算应缴 SST 金额
- ✅ 生成 SST-02 申报表草稿（Excel / PDF）
- ✅ 交易明细报告支持 RMCD 审计

### 2.4 进口税务处理

**海关清关要求：**
- Form K1：进口申报单（Import Declaration）
- Form K2：海关放行单（Customs Release Order）
- 进口销售税：在清关时缴纳

**系统实现：**
- ✅ 采购单关联海关单据编号（K1/K2 reference）
- ✅ 进口税金计入库存成本（Landed cost calculation）
- ✅ 保税仓与完税仓分开管理（Bonded vs Duty-paid stock）

---

## 3. 马来西亚财务报告准则 / Malaysian Financial Reporting Standards (MFRS)

### 3.1 适用准则

JINZA 系统遵循以下 MFRS 准则：

| 准则编号 | 准则名称 | 系统实现 |
|----------|----------|----------|
| **MFRS 101** | Presentation of Financial Statements | ✅ 标准财务报表格式 |
| **MFRS 102** | Inventories | ✅ 加权平均法成本核算 |
| **MFRS 108** | Accounting Policies, Changes and Errors | ✅ 会计政策一致性检查 |
| **MFRS 115** | Revenue from Contracts with Customers | ✅ 销售收入确认规则 |
| **MFRS 116** | Property, Plant and Equipment | ✅ 固定资产折旧管理 |
| **MFRS 138** | Intangible Assets | ✅ 无形资产摊销 |

### 3.2 会计科目分类 (Chart of Accounts)

系统采用标准的 5 大类科目结构：

```
1000-1999: 资产 (Assets)
  ├─ 1100-1199: 流动资产 (Current Assets)
  │   ├─ 1110: 现金及现金等价物 (Cash & Cash Equivalents)
  │   ├─ 1120: 应收账款 (Accounts Receivable)
  │   └─ 1130: 库存商品 (Inventory)
  └─ 1200-1299: 非流动资产 (Non-current Assets)

2000-2999: 负债 (Liabilities)
  ├─ 2100-2199: 流动负债 (Current Liabilities)
  │   ├─ 2110: 应付账款 (Accounts Payable)
  │   └─ 2120: 应交税费 (Tax Payable)
  └─ 2200-2299: 非流动负债 (Non-current Liabilities)

3000-3999: 权益 (Equity)
  ├─ 3100: 股本 (Share Capital)
  ├─ 3200: 留存收益 (Retained Earnings)
  └─ 3300: 本年利润 (Current Year Profit/Loss)

4000-4999: 收入 (Revenue)
  ├─ 4100: 销售收入 (Sales Revenue)
  └─ 4200: 其他收入 (Other Income)

5000-5999: 成本 (Cost of Goods Sold)
  └─ 5100: 销售成本 (COGS)

6000-6999: 费用 (Expenses)
  ├─ 6100: 销售费用 (Selling Expenses)
  ├─ 6200: 管理费用 (Administrative Expenses)
  └─ 6300: 财务费用 (Finance Costs)
```

### 3.3 收入确认原则 (MFRS 115)

**确认时点：**
- ✅ 货物交付客户时确认收入（Delivery point）
- ✅ FOB/CIF 条款正确处理（Incoterms compliance）
- ✅ 销售退货与折让冲减收入（Returns & allowances）

### 3.4 库存估值 (MFRS 102)

**成本计算方法：**
- ✅ **加权平均法 (Weighted Average Cost)** - 系统默认
- ✅ 成本 vs 可变现净值孰低原则（Lower of cost or NRV）
- ✅ 库存跌价准备（Provision for obsolescence）

---

## 4. 税务局要求 / Lembaga Hasil Dalam Negeri (LHDN) Requirements

### 4.1 电子发票 (e-Invoice) 强制要求

**实施时间表：**
- 2024年8月1日：年营业额 > RM 100M
- 2025年1月1日：年营业额 > RM 25M
- 2025年7月1日：所有纳税人强制执行

**系统实现：**
- ✅ 符合 MyInvois 标准的 XML/JSON 格式
- ✅ 包含必填字段：供应商 TIN、客户 TIN、SST 明细
- ✅ 实时提交接口（API integration ready）
- ✅ 电子签名与时间戳（Digital signature & timestamp）

### 4.2 审计追踪保存要求

**LHDN 审计要求：**
- 所有交易记录保存 **7 年**
- 审计师有权要求提供电子数据
- 数据必须易于检索和导出

**系统实现：**
- ✅ 所有数据带时间戳和用户标识
- ✅ 支持按日期、类型、金额范围导出
- ✅ 审计日志独立存储，防止篡改
- ✅ 导出格式：Excel、CSV、PDF

---

## 5. 仓储与库存管理合规

### 5.1 MS ISO 9001:2015 质量管理

**适用要求：**
- ✅ 批次追溯（Batch traceability）
- ✅ 先进先出 (FIFO) 库存管理
- ✅ 不合格品隔离（Quarantine management）

### 5.2 危险品管理 (DOSH Regulations)

**涂料行业特殊要求：**
- ✅ MSDS（材料安全数据表）存档
- ✅ 温度监控记录（适用于特定产品）
- ✅ 消防安全合规（Fire safety compliance）

---

## 6. 数据保护与隐私 / Personal Data Protection Act 2010 (PDPA)

### 6.1 个人数据处理

**保护范围：**
- 客户联系信息
- 员工个人资料
- 供应商代表信息

**系统实现：**
- ✅ 数据访问权限控制（Role-based access）
- ✅ 敏感信息加密存储（Encryption at rest）
- ✅ 数据导出与删除请求支持（GDPR-style rights）

---

## 7. 合规检查清单 / Compliance Checklist

### 月度检查项目

- [ ] 库存盘点与账实核对（Stock count & reconciliation）
- [ ] 应收/应付账款账龄分析（AR/AP aging review）
- [ ] 税务科目余额核对（Tax account reconciliation）
- [ ] 银行对账（Bank reconciliation）

### 双月检查项目（SST 申报期）

- [ ] 生成 SST-02 申报表（Generate SST-02 return）
- [ ] 核对销售税与服务税明细（Verify sales & service tax details）
- [ ] 提交 RMCD 在线申报（Submit online via MySST）
- [ ] 缴纳应缴税款（Pay tax liability）

### 年度检查项目

- [ ] 年度财务报表编制（Prepare annual financial statements）
- [ ] 外部审计配合（Facilitate external audit）
- [ ] 公司注册局申报（SSM annual return filing）
- [ ] 所得税申报（Corporate tax return - Form C）

---

## 8. 参考资料 / References

### 官方资源

- **Companies Commission of Malaysia (SSM)**: https://www.ssm.com.my/
- **Royal Malaysian Customs Department (RMCD)**: https://mysst.customs.gov.my/
- **Malaysian Accounting Standards Board (MASB)**: https://www.masb.org.my/
- **Lembaga Hasil Dalam Negeri (LHDN)**: https://www.hasil.gov.my/

### 法规文件

- Companies Act 2016
- Sales Tax Act 2018
- Service Tax Act 2018
- Income Tax Act 1967
- Personal Data Protection Act 2010

---

## 9. 系统更新日志 / System Update Log

| 日期 | 版本 | 更新内容 |
|------|------|----------|
| 2025-01-21 | 1.0.0 | 初始合规框架建立 |
| 2025-06-30 | 1.1.0 | e-Invoice 强制实施准备 |
| 2025-11-21 | 2.0.0 | 完整进销存与会计系统重构 |

---

**最后更新 / Last Updated:** 2025年11月21日  
**合规负责人 / Compliance Officer:** JINZA Trading Compliance Team  
**联系方式 / Contact:** compliance@jinza.com.my
