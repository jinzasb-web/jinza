// 会计科目表 / Chart of Accounts
// 符合 MFRS 标准 / Compliant with MFRS (Malaysian Financial Reporting Standards)

export const CHART_OF_ACCOUNTS = {
  // ==================== 资产类 / ASSETS (1000-1999) ====================
  
  // 流动资产 / Current Assets (1100-1199)
  1110: {
    code: '1110',
    name: 'Cash and Cash Equivalents',
    nameCN: '现金及现金等价物',
    category: 'Assets',
    subcategory: 'Current Assets',
    type: 'Debit',
    normalBalance: 'Debit',
    description: 'Cash on hand, bank accounts, short-term deposits',
    mfrsReference: 'MFRS 107',
    isActive: true
  },
  
  1120: {
    code: '1120',
    name: 'Accounts Receivable - Trade',
    nameCN: '应收账款 - 贸易',
    category: 'Assets',
    subcategory: 'Current Assets',
    type: 'Debit',
    normalBalance: 'Debit',
    description: 'Amounts owed by customers for goods sold or services rendered',
    mfrsReference: 'MFRS 115',
    isActive: true
  },
  
  1125: {
    code: '1125',
    name: 'Allowance for Doubtful Accounts',
    nameCN: '坏账准备',
    category: 'Assets',
    subcategory: 'Current Assets',
    type: 'Credit',
    normalBalance: 'Credit',
    description: 'Provision for uncollectible receivables',
    mfrsReference: 'MFRS 9',
    isActive: true
  },
  
  1130: {
    code: '1130',
    name: 'Inventory - Finished Goods',
    nameCN: '库存商品 - 成品',
    category: 'Assets',
    subcategory: 'Current Assets',
    type: 'Debit',
    normalBalance: 'Debit',
    description: 'Finished goods ready for sale (coatings, paints)',
    mfrsReference: 'MFRS 102',
    isActive: true
  },
  
  1135: {
    code: '1135',
    name: 'Inventory in Transit',
    nameCN: '在途库存',
    category: 'Assets',
    subcategory: 'Current Assets',
    type: 'Debit',
    normalBalance: 'Debit',
    description: 'Goods purchased but not yet received',
    mfrsReference: 'MFRS 102',
    isActive: true
  },
  
  1140: {
    code: '1140',
    name: 'Input SST Claimable',
    nameCN: 'SST 进项待抵扣',
    category: 'Assets',
    subcategory: 'Current Assets',
    type: 'Debit',
    normalBalance: 'Debit',
    description: 'SST paid on purchases, claimable from RMCD',
    mfrsReference: 'SST Act 2018',
    isActive: true
  },
  
  1150: {
    code: '1150',
    name: 'Prepaid Expenses',
    nameCN: '预付费用',
    category: 'Assets',
    subcategory: 'Current Assets',
    type: 'Debit',
    normalBalance: 'Debit',
    description: 'Expenses paid in advance (insurance, rent)',
    mfrsReference: 'MFRS 101',
    isActive: true
  },
  
  // 非流动资产 / Non-current Assets (1200-1299)
  1210: {
    code: '1210',
    name: 'Property, Plant and Equipment',
    nameCN: '固定资产 - 原值',
    category: 'Assets',
    subcategory: 'Non-current Assets',
    type: 'Debit',
    normalBalance: 'Debit',
    description: 'Land, buildings, machinery, vehicles (at cost)',
    mfrsReference: 'MFRS 116',
    isActive: true
  },
  
  1215: {
    code: '1215',
    name: 'Accumulated Depreciation - PPE',
    nameCN: '累计折旧 - 固定资产',
    category: 'Assets',
    subcategory: 'Non-current Assets',
    type: 'Credit',
    normalBalance: 'Credit',
    description: 'Accumulated depreciation on property, plant & equipment',
    mfrsReference: 'MFRS 116',
    isActive: true
  },
  
  1220: {
    code: '1220',
    name: 'Intangible Assets',
    nameCN: '无形资产',
    category: 'Assets',
    subcategory: 'Non-current Assets',
    type: 'Debit',
    normalBalance: 'Debit',
    description: 'Software licenses, patents, trademarks',
    mfrsReference: 'MFRS 138',
    isActive: true
  },
  
  // ==================== 负债类 / LIABILITIES (2000-2999) ====================
  
  // 流动负债 / Current Liabilities (2100-2199)
  2110: {
    code: '2110',
    name: 'Accounts Payable - Trade',
    nameCN: '应付账款 - 贸易',
    category: 'Liabilities',
    subcategory: 'Current Liabilities',
    type: 'Credit',
    normalBalance: 'Credit',
    description: 'Amounts owed to suppliers for goods purchased',
    mfrsReference: 'MFRS 101',
    isActive: true
  },
  
  2120: {
    code: '2120',
    name: 'SST Payable - Sales Tax',
    nameCN: '应交销售税',
    category: 'Liabilities',
    subcategory: 'Current Liabilities',
    type: 'Credit',
    normalBalance: 'Credit',
    description: 'Sales and Service Tax collected, payable to RMCD',
    mfrsReference: 'SST Act 2018',
    isActive: true
  },
  
  2130: {
    code: '2130',
    name: 'Income Tax Payable',
    nameCN: '应交所得税',
    category: 'Liabilities',
    subcategory: 'Current Liabilities',
    type: 'Credit',
    normalBalance: 'Credit',
    description: 'Corporate income tax payable to LHDN',
    mfrsReference: 'Income Tax Act 1967',
    isActive: true
  },
  
  2140: {
    code: '2140',
    name: 'Accrued Expenses',
    nameCN: '应付费用',
    category: 'Liabilities',
    subcategory: 'Current Liabilities',
    type: 'Credit',
    normalBalance: 'Credit',
    description: 'Expenses incurred but not yet paid (utilities, wages)',
    mfrsReference: 'MFRS 101',
    isActive: true
  },
  
  2150: {
    code: '2150',
    name: 'Short-term Borrowings',
    nameCN: '短期借款',
    category: 'Liabilities',
    subcategory: 'Current Liabilities',
    type: 'Credit',
    normalBalance: 'Credit',
    description: 'Bank overdrafts, short-term loans',
    mfrsReference: 'MFRS 9',
    isActive: true
  },
  
  // 非流动负债 / Non-current Liabilities (2200-2299)
  2210: {
    code: '2210',
    name: 'Long-term Borrowings',
    nameCN: '长期借款',
    category: 'Liabilities',
    subcategory: 'Non-current Liabilities',
    type: 'Credit',
    normalBalance: 'Credit',
    description: 'Bank loans, bonds payable (> 1 year)',
    mfrsReference: 'MFRS 9',
    isActive: true
  },
  
  // ==================== 权益类 / EQUITY (3000-3999) ====================
  
  3100: {
    code: '3100',
    name: 'Share Capital',
    nameCN: '股本',
    category: 'Equity',
    subcategory: 'Equity',
    type: 'Credit',
    normalBalance: 'Credit',
    description: 'Ordinary shares issued to shareholders',
    mfrsReference: 'Companies Act 2016',
    isActive: true
  },
  
  3200: {
    code: '3200',
    name: 'Retained Earnings',
    nameCN: '留存收益',
    category: 'Equity',
    subcategory: 'Equity',
    type: 'Credit',
    normalBalance: 'Credit',
    description: 'Accumulated profits not distributed as dividends',
    mfrsReference: 'MFRS 101',
    isActive: true
  },
  
  3300: {
    code: '3300',
    name: 'Current Year Profit/(Loss)',
    nameCN: '本年利润',
    category: 'Equity',
    subcategory: 'Equity',
    type: 'Credit',
    normalBalance: 'Credit',
    description: 'Net income for the current fiscal year',
    mfrsReference: 'MFRS 101',
    isActive: true
  },
  
  // ==================== 收入类 / REVENUE (4000-4999) ====================
  
  4100: {
    code: '4100',
    name: 'Sales Revenue - Products',
    nameCN: '销售收入 - 产品',
    category: 'Revenue',
    subcategory: 'Operating Revenue',
    type: 'Credit',
    normalBalance: 'Credit',
    description: 'Revenue from sale of coatings and paint products',
    mfrsReference: 'MFRS 115',
    isActive: true
  },
  
  4110: {
    code: '4110',
    name: 'Sales Returns and Allowances',
    nameCN: '销售退回与折让',
    category: 'Revenue',
    subcategory: 'Operating Revenue',
    type: 'Debit',
    normalBalance: 'Debit',
    description: 'Returns, refunds, and discounts given to customers',
    mfrsReference: 'MFRS 115',
    isActive: true
  },
  
  4200: {
    code: '4200',
    name: 'Service Revenue',
    nameCN: '服务收入',
    category: 'Revenue',
    subcategory: 'Operating Revenue',
    type: 'Credit',
    normalBalance: 'Credit',
    description: 'Revenue from delivery, installation, consulting services',
    mfrsReference: 'MFRS 115',
    isActive: true
  },
  
  4300: {
    code: '4300',
    name: 'Other Income',
    nameCN: '其他收入',
    category: 'Revenue',
    subcategory: 'Non-operating Revenue',
    type: 'Credit',
    normalBalance: 'Credit',
    description: 'Interest income, foreign exchange gains, misc. income',
    mfrsReference: 'MFRS 101',
    isActive: true
  },
  
  // ==================== 成本类 / COST OF GOODS SOLD (5000-5999) ====================
  
  5100: {
    code: '5100',
    name: 'Cost of Goods Sold',
    nameCN: '销售成本',
    category: 'Cost of Sales',
    subcategory: 'COGS',
    type: 'Debit',
    normalBalance: 'Debit',
    description: 'Direct cost of products sold (inventory cost)',
    mfrsReference: 'MFRS 102',
    isActive: true
  },
  
  5110: {
    code: '5110',
    name: 'Freight and Handling - COGS',
    nameCN: '运输及装卸费 - 成本',
    category: 'Cost of Sales',
    subcategory: 'COGS',
    type: 'Debit',
    normalBalance: 'Debit',
    description: 'Freight, customs duties included in landed cost',
    mfrsReference: 'MFRS 102',
    isActive: true
  },
  
  5120: {
    code: '5120',
    name: 'Inventory Write-down',
    nameCN: '库存跌价损失',
    category: 'Cost of Sales',
    subcategory: 'COGS',
    type: 'Debit',
    normalBalance: 'Debit',
    description: 'Loss from inventory obsolescence or damage',
    mfrsReference: 'MFRS 102',
    isActive: true
  },
  
  // ==================== 费用类 / EXPENSES (6000-6999) ====================
  
  // 销售费用 / Selling Expenses (6100-6199)
  6100: {
    code: '6100',
    name: 'Sales Salaries and Commissions',
    nameCN: '销售人员工资及佣金',
    category: 'Expenses',
    subcategory: 'Selling Expenses',
    type: 'Debit',
    normalBalance: 'Debit',
    description: 'Salaries, bonuses, commissions for sales team',
    mfrsReference: 'MFRS 101',
    isActive: true
  },
  
  6110: {
    code: '6110',
    name: 'Advertising and Marketing',
    nameCN: '广告与营销费',
    category: 'Expenses',
    subcategory: 'Selling Expenses',
    type: 'Debit',
    normalBalance: 'Debit',
    description: 'Marketing campaigns, advertising, promotions',
    mfrsReference: 'MFRS 101',
    isActive: true
  },
  
  6120: {
    code: '6120',
    name: 'Delivery and Freight Expenses',
    nameCN: '运输配送费',
    category: 'Expenses',
    subcategory: 'Selling Expenses',
    type: 'Debit',
    normalBalance: 'Debit',
    description: 'Delivery to customers, freight charges',
    mfrsReference: 'MFRS 101',
    isActive: true
  },
  
  // 管理费用 / Administrative Expenses (6200-6299)
  6200: {
    code: '6200',
    name: 'Administrative Salaries',
    nameCN: '管理人员工资',
    category: 'Expenses',
    subcategory: 'Administrative Expenses',
    type: 'Debit',
    normalBalance: 'Debit',
    description: 'Salaries for admin, finance, HR staff',
    mfrsReference: 'MFRS 101',
    isActive: true
  },
  
  6210: {
    code: '6210',
    name: 'Office Rent',
    nameCN: '办公室租金',
    category: 'Expenses',
    subcategory: 'Administrative Expenses',
    type: 'Debit',
    normalBalance: 'Debit',
    description: 'Monthly rent for office premises',
    mfrsReference: 'MFRS 101',
    isActive: true
  },
  
  6220: {
    code: '6220',
    name: 'Utilities',
    nameCN: '水电费',
    category: 'Expenses',
    subcategory: 'Administrative Expenses',
    type: 'Debit',
    normalBalance: 'Debit',
    description: 'Electricity, water, internet, phone bills',
    mfrsReference: 'MFRS 101',
    isActive: true
  },
  
  6230: {
    code: '6230',
    name: 'Office Supplies',
    nameCN: '办公用品',
    category: 'Expenses',
    subcategory: 'Administrative Expenses',
    type: 'Debit',
    normalBalance: 'Debit',
    description: 'Stationery, printing, small office equipment',
    mfrsReference: 'MFRS 101',
    isActive: true
  },
  
  6240: {
    code: '6240',
    name: 'Professional Fees',
    nameCN: '专业服务费',
    category: 'Expenses',
    subcategory: 'Administrative Expenses',
    type: 'Debit',
    normalBalance: 'Debit',
    description: 'Legal, audit, consultancy fees',
    mfrsReference: 'MFRS 101',
    isActive: true
  },
  
  6250: {
    code: '6250',
    name: 'Depreciation Expense',
    nameCN: '折旧费',
    category: 'Expenses',
    subcategory: 'Administrative Expenses',
    type: 'Debit',
    normalBalance: 'Debit',
    description: 'Systematic allocation of PPE cost over useful life',
    mfrsReference: 'MFRS 116',
    isActive: true
  },
  
  // 财务费用 / Finance Costs (6300-6399)
  6300: {
    code: '6300',
    name: 'Interest Expense',
    nameCN: '利息支出',
    category: 'Expenses',
    subcategory: 'Finance Costs',
    type: 'Debit',
    normalBalance: 'Debit',
    description: 'Interest on bank loans, overdrafts',
    mfrsReference: 'MFRS 9',
    isActive: true
  },
  
  6310: {
    code: '6310',
    name: 'Bank Charges',
    nameCN: '银行手续费',
    category: 'Expenses',
    subcategory: 'Finance Costs',
    type: 'Debit',
    normalBalance: 'Debit',
    description: 'Bank transaction fees, service charges',
    mfrsReference: 'MFRS 101',
    isActive: true
  },
  
  6320: {
    code: '6320',
    name: 'Foreign Exchange Loss',
    nameCN: '汇兑损失',
    category: 'Expenses',
    subcategory: 'Finance Costs',
    type: 'Debit',
    normalBalance: 'Debit',
    description: 'Loss from currency fluctuations',
    mfrsReference: 'MFRS 121',
    isActive: true
  },
  
  // 其他费用 / Other Expenses (6400-6499)
  6400: {
    code: '6400',
    name: 'Bad Debt Expense',
    nameCN: '坏账损失',
    category: 'Expenses',
    subcategory: 'Other Expenses',
    type: 'Debit',
    normalBalance: 'Debit',
    description: 'Uncollectible accounts receivable written off',
    mfrsReference: 'MFRS 9',
    isActive: true
  },
  
  6410: {
    code: '6410',
    name: 'Income Tax Expense',
    nameCN: '所得税费用',
    category: 'Expenses',
    subcategory: 'Tax Expense',
    type: 'Debit',
    normalBalance: 'Debit',
    description: 'Corporate income tax for the period',
    mfrsReference: 'MFRS 112',
    isActive: true
  }
};

// 科目分类汇总 / Account Categories Summary
export const ACCOUNT_CATEGORIES = {
  Assets: {
    name: 'Assets',
    nameCN: '资产',
    range: '1000-1999',
    normalBalance: 'Debit'
  },
  Liabilities: {
    name: 'Liabilities',
    nameCN: '负债',
    range: '2000-2999',
    normalBalance: 'Credit'
  },
  Equity: {
    name: 'Equity',
    nameCN: '权益',
    range: '3000-3999',
    normalBalance: 'Credit'
  },
  Revenue: {
    name: 'Revenue',
    nameCN: '收入',
    range: '4000-4999',
    normalBalance: 'Credit'
  },
  'Cost of Sales': {
    name: 'Cost of Sales',
    nameCN: '成本',
    range: '5000-5999',
    normalBalance: 'Debit'
  },
  Expenses: {
    name: 'Expenses',
    nameCN: '费用',
    range: '6000-6999',
    normalBalance: 'Debit'
  }
};

// 获取所有科目的辅助函数
export function getAllAccounts() {
  return Object.values(CHART_OF_ACCOUNTS);
}

// 根据科目代码获取科目信息
export function getAccountByCode(code) {
  return CHART_OF_ACCOUNTS[parseInt(code)] || null;
}

// 根据分类获取科目列表
export function getAccountsByCategory(category) {
  return getAllAccounts().filter(acc => acc.category === category);
}

// 验证借贷平衡
export function validateJournalBalance(lines) {
  const totalDebit = lines.reduce((sum, line) => sum + (line.debitAmount || 0), 0);
  const totalCredit = lines.reduce((sum, line) => sum + (line.creditAmount || 0), 0);
  
  return {
    totalDebit,
    totalCredit,
    balanced: Math.abs(totalDebit - totalCredit) < 0.01  // 容许 1 分钱误差
  };
}

export default CHART_OF_ACCOUNTS;
