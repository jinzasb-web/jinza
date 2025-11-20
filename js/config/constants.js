// 系统常量配置 / System Constants Configuration
// 符合马来西亚法规要求 / Compliant with Malaysian regulations

export const SYSTEM_CONFIG = {
  // 系统信息
  SYSTEM_NAME: 'JINZA IMS & Accounting System',
  VERSION: '2.0.0',
  COMPANY_NAME: 'JINZA Trading Sdn. Bhd.',
  
  // 法规版本
  COMPLIANCE_VERSION: {
    COMPANIES_ACT: '2016',
    SST_ACT: '2018',
    MFRS_VERSION: '2024',
    PDPA_VERSION: '2010'
  },
  
  // 数据保留期限（年）
  RETENTION_PERIOD: 7,
  
  // 会计期间
  FISCAL_YEAR_START: 1,  // January (1-12)
  FISCAL_YEAR_END: 12,   // December
  
  // 货币
  CURRENCY: 'MYR',
  CURRENCY_SYMBOL: 'RM',
  DECIMAL_PLACES: 2,
  
  // 日期格式
  DATE_FORMAT: 'YYYY-MM-DD',
  DATETIME_FORMAT: 'YYYY-MM-DD HH:mm:ss',
  
  // 本地存储键名
  STORAGE_KEYS: {
    USER_PROFILE: 'jinzaUser',
    INVENTORY_DATA: 'jinzaInventory',
    PURCHASE_DATA: 'jinzaPurchase',
    SALES_DATA: 'jinzaSales',
    ACCOUNTING_DATA: 'jinzaAccounting',
    JOURNAL_DATA: 'jinzaJournal',
    AUDIT_LOG: 'jinzaAuditLog',
    SST_DATA: 'jinzaSST',
    SETTINGS: 'jinzaSettings'
  },
  
  // 分页设置
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 20,
    PAGE_SIZES: [10, 20, 50, 100]
  },
  
  // 文件上传限制
  UPLOAD: {
    MAX_FILE_SIZE: 10 * 1024 * 1024,  // 10 MB
    ALLOWED_EXTENSIONS: ['.pdf', '.jpg', '.jpeg', '.png', '.xlsx', '.csv']
  }
};

// SST 税务配置 / SST Tax Configuration
export const SST_CONFIG = {
  // SST 注册信息
  SST_REGISTRATION_NUMBER: 'A01-1234-56789012',
  SST_EFFECTIVE_DATE: '2024-01-01',
  
  // 申报周期（月）
  FILING_PERIOD: 2,  // Every 2 months
  
  // 申报截止日（申报期结束后天数）
  FILING_DEADLINE_DAYS: 28,
  
  // SST 税率
  SALES_TAX_RATES: {
    STANDARD_5: 0.05,    // 5% 销售税
    STANDARD_10: 0.10,   // 10% 销售税（石油化工产品）
    ZERO_RATE: 0.00,     // 0% 零税率
    EXEMPT: null         // 豁免
  },
  
  SERVICE_TAX_RATE: 0.06,  // 6% 服务税
  
  // 税码定义
  TAX_CODES: {
    SR: {
      code: 'SR',
      name: 'Standard-rated',
      description: '标准税率 / Standard rated supply',
      defaultRate: 0.10,  // JINZA 涂料产品默认 10%
      applicable: true
    },
    ZR: {
      code: 'ZR',
      name: 'Zero-rated',
      description: '零税率 / Zero rated supply (exports, essential goods)',
      defaultRate: 0.00,
      applicable: true
    },
    ES: {
      code: 'ES',
      name: 'Exempt Supply',
      description: '豁免供应 / Exempt supply',
      defaultRate: null,
      applicable: false
    },
    OS: {
      code: 'OS',
      name: 'Out of Scope',
      description: '非税范围 / Out of scope of SST',
      defaultRate: null,
      applicable: false
    },
    RS: {
      code: 'RS',
      name: 'Relief Supply',
      description: '减免供应 / Relief supply',
      defaultRate: 0.00,
      applicable: true
    }
  },
  
  // SST-02 表单字段
  SST02_FIELDS: [
    'taxableTurnover',
    'exemptTurnover',
    'zeroRatedTurnover',
    'totalTurnover',
    'taxPayable',
    'adjustments',
    'totalTaxDue'
  ]
};

// e-Invoice 配置 / e-Invoice Configuration
export const EINVOICE_CONFIG = {
  // MyInvois 平台
  MYINVOIS_URL: 'https://myinvois.hasil.gov.my',
  
  // 强制实施日期
  MANDATORY_DATE: '2025-07-01',
  
  // 电子发票类型
  INVOICE_TYPES: {
    SALES: '01',          // Sales Invoice
    CREDIT_NOTE: '02',    // Credit Note
    DEBIT_NOTE: '03',     // Debit Note
    REFUND: '04'          // Refund Note
  },
  
  // 必填字段
  REQUIRED_FIELDS: [
    'invoiceNumber',
    'invoiceDate',
    'supplierTIN',
    'supplierName',
    'customerTIN',
    'customerName',
    'totalExcludingTax',
    'totalTax',
    'totalIncludingTax',
    'lineItems'
  ],
  
  // 验证状态
  VALIDATION_STATUS: {
    PENDING: 'Pending',
    SUBMITTED: 'Submitted',
    VALIDATED: 'Validated',
    REJECTED: 'Rejected'
  }
};

// 状态定义 / Status Definitions
export const STATUS = {
  // 通用状态
  COMMON: {
    DRAFT: 'Draft',
    ACTIVE: 'Active',
    INACTIVE: 'Inactive',
    CANCELLED: 'Cancelled',
    VOID: 'Void'
  },
  
  // 库存状态
  INVENTORY: {
    AVAILABLE: 'Available',
    RESERVED: 'Reserved',
    QUARANTINE: 'Pending QC',
    OBSOLETE: 'Obsolete',
    IN_TRANSIT: 'In Transit'
  },
  
  // 采购订单状态
  PURCHASE_ORDER: {
    DRAFT: 'Draft',
    PENDING_APPROVAL: 'Pending Approval',
    APPROVED: 'Approved',
    PENDING_DELIVERY: 'Pending Delivery',
    PARTIAL_RECEIVED: 'Partial Received',
    RECEIVED: 'Received',
    CANCELLED: 'Cancelled'
  },
  
  // 销售订单状态
  SALES_ORDER: {
    DRAFT: 'Draft',
    CONFIRMED: 'Confirmed',
    PENDING_DELIVERY: 'Pending Delivery',
    PARTIAL_DELIVERED: 'Partial Delivered',
    DELIVERED: 'Delivered',
    CANCELLED: 'Cancelled'
  },
  
  // 付款状态
  PAYMENT: {
    PENDING: 'Pending',
    PARTIAL: 'Partial',
    PAID: 'Paid',
    OVERDUE: 'Overdue'
  },
  
  // 会计分录状态
  JOURNAL: {
    DRAFT: 'Draft',
    POSTED: 'Posted',
    VOID: 'Void'
  }
};

// 权限配置 / Permission Configuration
export const PERMISSIONS = {
  // 角色定义
  ROLES: {
    ADMIN: 'Administrator',
    FINANCE_MANAGER: 'Finance Manager',
    PURCHASE_MANAGER: 'Purchase Manager',
    SALES_MANAGER: 'Sales Manager',
    WAREHOUSE_STAFF: 'Warehouse',
    ACCOUNTANT: 'Accountant',
    AUDITOR: 'Auditor'
  },
  
  // 操作权限
  ACTIONS: {
    CREATE: 'create',
    READ: 'read',
    UPDATE: 'update',
    DELETE: 'delete',
    APPROVE: 'approve',
    VOID: 'void',
    EXPORT: 'export'
  },
  
  // 模块权限矩阵
  ROLE_PERMISSIONS: {
    Administrator: ['*'],  // 所有权限
    'Finance Manager': [
      'accounting:*',
      'sst:*',
      'reports:*',
      'inventory:read',
      'purchase:read',
      'sales:read'
    ],
    'Purchase Manager': [
      'purchase:*',
      'inventory:read',
      'supplier:*'
    ],
    'Sales Manager': [
      'sales:*',
      'customer:*',
      'inventory:read'
    ],
    Warehouse: [
      'inventory:read',
      'inventory:update',
      'purchase:receive',
      'sales:ship'
    ],
    Accountant: [
      'accounting:create',
      'accounting:read',
      'accounting:update',
      'reports:read'
    ],
    Auditor: [
      '*:read',
      'audit:*',
      'reports:export'
    ]
  }
};

// 通知配置 / Notification Configuration
export const NOTIFICATIONS = {
  // 通知类型
  TYPES: {
    SUCCESS: 'success',
    INFO: 'info',
    WARNING: 'warning',
    ERROR: 'error'
  },
  
  // 显示时长（毫秒）
  DURATION: {
    SHORT: 3000,
    MEDIUM: 5000,
    LONG: 8000
  },
  
  // 预定义消息
  MESSAGES: {
    SAVE_SUCCESS: '保存成功 / Saved successfully',
    UPDATE_SUCCESS: '更新成功 / Updated successfully',
    DELETE_SUCCESS: '删除成功 / Deleted successfully',
    OPERATION_FAILED: '操作失败 / Operation failed',
    VALIDATION_ERROR: '验证错误 / Validation error',
    UNAUTHORIZED: '无权限 / Unauthorized access'
  }
};

// 验证规则 / Validation Rules
export const VALIDATION = {
  // TIN（税务识别号）格式
  TIN_PATTERN: /^C\d{14}$/,  // C + 14位数字
  
  // SSM 注册号格式
  SSM_PATTERN: /^\d{12}$/,   // 12位数字
  
  // 电子邮件格式
  EMAIL_PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  
  // 电话号码格式（马来西亚）
  PHONE_PATTERN: /^(\+?60|0)[1-9]\d{7,9}$/,
  
  // 产品编码格式
  SKU_PATTERN: /^[A-Z0-9-]{5,20}$/,
  
  // 订单号格式
  ORDER_NUMBER_PATTERN: /^(PO|SO|INV)-\d{4}-\d{5}$/,
  
  // 金额验证
  AMOUNT: {
    MIN: 0,
    MAX: 9999999999.99,
    DECIMAL_PLACES: 2
  },
  
  // 数量验证
  QUANTITY: {
    MIN: 0,
    MAX: 999999,
    DECIMAL_PLACES: 2
  }
};

// 审计配置 / Audit Configuration
export const AUDIT_CONFIG = {
  // 风险等级
  RISK_LEVELS: {
    LOW: 'LOW',
    MEDIUM: 'MEDIUM',
    HIGH: 'HIGH',
    CRITICAL: 'CRITICAL'
  },
  
  // 需要记录审计日志的操作
  AUDITABLE_ACTIONS: [
    'CREATE',
    'UPDATE',
    'DELETE',
    'APPROVE',
    'VOID',
    'LOGIN',
    'LOGOUT'
  ],
  
  // 敏感模块（高风险）
  SENSITIVE_MODULES: [
    'Accounting',
    'SST',
    'UserManagement',
    'Permissions'
  ]
};

// 导出所有配置
export default {
  SYSTEM_CONFIG,
  SST_CONFIG,
  EINVOICE_CONFIG,
  STATUS,
  PERMISSIONS,
  NOTIFICATIONS,
  VALIDATION,
  AUDIT_CONFIG
};
