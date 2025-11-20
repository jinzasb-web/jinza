// 库存管理服务 / Inventory Management Service
// 完全符合马来西亚 MFRS 102 标准 / Fully compliant with MFRS 102

import { SYSTEM_CONFIG, SST_CONFIG, STATUS, VALIDATION } from '../config/constants.js';
import { CHART_OF_ACCOUNTS } from '../config/chartOfAccounts.js';

/**
 * 库存管理服务类
 * Manages inventory operations including stock tracking, cost calculation, and SST handling
 */
export class InventoryService {
  constructor() {
    this.storageKey = SYSTEM_CONFIG.STORAGE_KEYS.INVENTORY_DATA;
    this.initialize();
  }

  /**
   * 初始化库存数据
   */
  initialize() {
    if (!localStorage.getItem(this.storageKey)) {
      localStorage.setItem(this.storageKey, JSON.stringify([]));
    }
  }

  /**
   * 获取所有库存记录
   */
  getAllInventory() {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Failed to load inventory data:', error);
      return [];
    }
  }

  /**
   * 根据 ID 获取库存记录
   */
  getInventoryById(id) {
    const inventory = this.getAllInventory();
    return inventory.find(item => item.id === id) || null;
  }

  /**
   * 根据 SKU 获取库存记录
   */
  getInventoryBySKU(sku) {
    const inventory = this.getAllInventory();
    return inventory.find(item => item.sku === sku) || null;
  }

  /**
   * 创建新库存记录
   * @param {Object} inventoryData - 库存数据
   * @returns {Object} - 创建结果
   */
  createInventory(inventoryData) {
    try {
      // 1. 验证数据
      const validation = this.validateInventoryData(inventoryData);
      if (!validation.isValid) {
        return {
          success: false,
          error: validation.errors.join(', ')
        };
      }

      // 2. 检查 SKU 是否重复
      const existing = this.getInventoryBySKU(inventoryData.sku);
      if (existing) {
        return {
          success: false,
          error: `SKU ${inventoryData.sku} already exists`
        };
      }

      // 3. 计算 SST
      const sstCalculation = this.calculateSST(
        inventoryData.unitCost,
        inventoryData.sstRate || SST_CONFIG.SALES_TAX_RATES.STANDARD_10
      );

      // 4. 生成库存记录
      const inventory = this.getAllInventory();
      const newItem = {
        id: this.generateInventoryId(),
        sku: inventoryData.sku,
        productName: inventoryData.productName,
        category: inventoryData.category || 'General',
        brand: inventoryData.brand || '',
        
        // 库存信息
        warehouse: inventoryData.warehouse,
        binLocation: inventoryData.binLocation || '',
        quantityOnHand: inventoryData.quantityOnHand || 0,
        quantityReserved: 0,
        quantityAvailable: inventoryData.quantityOnHand || 0,
        
        // 成本信息
        unitCost: inventoryData.unitCost,
        sstRate: inventoryData.sstRate || SST_CONFIG.SALES_TAX_RATES.STANDARD_10,
        sstAmount: sstCalculation.sstAmount,
        totalCost: sstCalculation.totalCost,
        
        // SST 分类
        sstTaxCode: inventoryData.sstTaxCode || 'SR',
        hscode: inventoryData.hscode || '',
        
        // 批次管理
        batchNumber: inventoryData.batchNumber || '',
        lotNumber: inventoryData.lotNumber || '',
        manufacturingDate: inventoryData.manufacturingDate || null,
        expiryDate: inventoryData.expiryDate || null,
        
        // 状态
        status: inventoryData.status || STATUS.INVENTORY.AVAILABLE,
        
        // 审计追踪
        createdBy: inventoryData.createdBy || 'system',
        createdAt: new Date().toISOString(),
        updatedBy: inventoryData.createdBy || 'system',
        updatedAt: new Date().toISOString(),
        version: 1
      };

      inventory.push(newItem);
      localStorage.setItem(this.storageKey, JSON.stringify(inventory));

      // 5. 记录审计日志
      this.logAudit('CREATE', newItem);

      return {
        success: true,
        data: newItem
      };
    } catch (error) {
      console.error('Failed to create inventory:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * 更新库存记录
   */
  updateInventory(id, updates) {
    try {
      const inventory = this.getAllInventory();
      const index = inventory.findIndex(item => item.id === id);
      
      if (index === -1) {
        return {
          success: false,
          error: 'Inventory item not found'
        };
      }

      const currentItem = inventory[index];
      
      // 重新计算 SST（如果成本或税率变更）
      let sstCalculation = {
        sstAmount: currentItem.sstAmount,
        totalCost: currentItem.totalCost
      };
      
      if (updates.unitCost !== undefined || updates.sstRate !== undefined) {
        sstCalculation = this.calculateSST(
          updates.unitCost || currentItem.unitCost,
          updates.sstRate || currentItem.sstRate
        );
      }

      // 更新记录
      const updatedItem = {
        ...currentItem,
        ...updates,
        sstAmount: sstCalculation.sstAmount,
        totalCost: sstCalculation.totalCost,
        updatedBy: updates.updatedBy || 'system',
        updatedAt: new Date().toISOString(),
        version: currentItem.version + 1
      };

      inventory[index] = updatedItem;
      localStorage.setItem(this.storageKey, JSON.stringify(inventory));

      // 记录审计日志
      this.logAudit('UPDATE', updatedItem, { before: currentItem, after: updatedItem });

      return {
        success: true,
        data: updatedItem
      };
    } catch (error) {
      console.error('Failed to update inventory:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * 库存入库（采购收货）
   * @param {string} sku - 产品 SKU
   * @param {number} quantity - 入库数量
   * @param {Object} options - 其他选项（批次号、单价等）
   */
  receiveStock(sku, quantity, options = {}) {
    try {
      const item = this.getInventoryBySKU(sku);
      
      if (!item) {
        return {
          success: false,
          error: `Inventory item with SKU ${sku} not found`
        };
      }

      // 加权平均成本计算（MFRS 102）
      let newUnitCost = item.unitCost;
      
      if (options.unitCost) {
        const currentValue = item.unitCost * item.quantityOnHand;
        const incomingValue = options.unitCost * quantity;
        const totalQuantity = item.quantityOnHand + quantity;
        
        newUnitCost = (currentValue + incomingValue) / totalQuantity;
      }

      // 重新计算 SST
      const sstCalculation = this.calculateSST(newUnitCost, item.sstRate);

      // 更新库存数量和成本
      const result = this.updateInventory(item.id, {
        quantityOnHand: item.quantityOnHand + quantity,
        quantityAvailable: item.quantityAvailable + quantity,
        unitCost: newUnitCost,
        sstAmount: sstCalculation.sstAmount,
        totalCost: sstCalculation.totalCost,
        batchNumber: options.batchNumber || item.batchNumber,
        lotNumber: options.lotNumber || item.lotNumber,
        updatedBy: options.updatedBy || 'system'
      });

      if (result.success) {
        // 生成会计分录
        this.generateJournalEntry('RECEIVE_STOCK', result.data, {
          quantity,
          unitCost: options.unitCost || item.unitCost
        });
      }

      return result;
    } catch (error) {
      console.error('Failed to receive stock:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * 库存出库（销售发货）
   * @param {string} sku - 产品 SKU
   * @param {number} quantity - 出库数量
   * @param {Object} options - 其他选项
   */
  issueStock(sku, quantity, options = {}) {
    try {
      const item = this.getInventoryBySKU(sku);
      
      if (!item) {
        return {
          success: false,
          error: `Inventory item with SKU ${sku} not found`
        };
      }

      // 检查库存充足性
      if (item.quantityAvailable < quantity) {
        return {
          success: false,
          error: `Insufficient stock. Available: ${item.quantityAvailable}, Requested: ${quantity}`
        };
      }

      // 更新库存数量
      const result = this.updateInventory(item.id, {
        quantityOnHand: item.quantityOnHand - quantity,
        quantityAvailable: item.quantityAvailable - quantity,
        updatedBy: options.updatedBy || 'system'
      });

      if (result.success) {
        // 生成会计分录（销售成本）
        this.generateJournalEntry('ISSUE_STOCK', result.data, {
          quantity,
          unitCost: item.unitCost
        });
      }

      return result;
    } catch (error) {
      console.error('Failed to issue stock:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * 预留库存（销售订单确认）
   */
  reserveStock(sku, quantity, options = {}) {
    try {
      const item = this.getInventoryBySKU(sku);
      
      if (!item) {
        return {
          success: false,
          error: `Inventory item with SKU ${sku} not found`
        };
      }

      if (item.quantityAvailable < quantity) {
        return {
          success: false,
          error: `Insufficient stock for reservation`
        };
      }

      return this.updateInventory(item.id, {
        quantityReserved: item.quantityReserved + quantity,
        quantityAvailable: item.quantityAvailable - quantity,
        updatedBy: options.updatedBy || 'system'
      });
    } catch (error) {
      console.error('Failed to reserve stock:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * 释放库存预留
   */
  releaseReservation(sku, quantity, options = {}) {
    try {
      const item = this.getInventoryBySKU(sku);
      
      if (!item) {
        return {
          success: false,
          error: `Inventory item with SKU ${sku} not found`
        };
      }

      return this.updateInventory(item.id, {
        quantityReserved: Math.max(0, item.quantityReserved - quantity),
        quantityAvailable: item.quantityAvailable + quantity,
        updatedBy: options.updatedBy || 'system'
      });
    } catch (error) {
      console.error('Failed to release reservation:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * 库存盘点调整
   */
  adjustStock(sku, newQuantity, reason, options = {}) {
    try {
      const item = this.getInventoryBySKU(sku);
      
      if (!item) {
        return {
          success: false,
          error: `Inventory item with SKU ${sku} not found`
        };
      }

      const oldQuantity = item.quantityOnHand;
      const difference = newQuantity - oldQuantity;

      const result = this.updateInventory(item.id, {
        quantityOnHand: newQuantity,
        quantityAvailable: item.quantityAvailable + difference,
        updatedBy: options.updatedBy || 'system'
      });

      if (result.success) {
        // 记录调整原因
        this.logAudit('ADJUST_STOCK', result.data, {
          oldQuantity,
          newQuantity,
          difference,
          reason
        });

        // 生成会计分录（盈亏调整）
        if (difference !== 0) {
          this.generateJournalEntry('STOCK_ADJUSTMENT', result.data, {
            quantity: Math.abs(difference),
            unitCost: item.unitCost,
            isIncrease: difference > 0
          });
        }
      }

      return result;
    } catch (error) {
      console.error('Failed to adjust stock:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * 计算 SST
   * @param {number} baseAmount - 不含税金额
   * @param {number} sstRate - SST 税率
   */
  calculateSST(baseAmount, sstRate) {
    const sstAmount = parseFloat((baseAmount * sstRate).toFixed(2));
    const totalCost = parseFloat((baseAmount + sstAmount).toFixed(2));
    
    return {
      baseAmount,
      sstRate,
      sstAmount,
      totalCost
    };
  }

  /**
   * 验证库存数据
   */
  validateInventoryData(data) {
    const errors = [];

    // 必填字段验证
    if (!data.sku) errors.push('SKU is required');
    if (!data.productName) errors.push('Product name is required');
    if (!data.warehouse) errors.push('Warehouse is required');
    
    // SKU 格式验证
    if (data.sku && !VALIDATION.SKU_PATTERN.test(data.sku)) {
      errors.push('Invalid SKU format');
    }

    // 数量验证
    if (data.quantityOnHand !== undefined) {
      if (data.quantityOnHand < VALIDATION.QUANTITY.MIN || 
          data.quantityOnHand > VALIDATION.QUANTITY.MAX) {
        errors.push('Invalid quantity');
      }
    }

    // 成本验证
    if (data.unitCost !== undefined) {
      if (data.unitCost < VALIDATION.AMOUNT.MIN || 
          data.unitCost > VALIDATION.AMOUNT.MAX) {
        errors.push('Invalid unit cost');
      }
    }

    // SST 税率验证
    if (data.sstRate !== undefined) {
      const validRates = Object.values(SST_CONFIG.SALES_TAX_RATES);
      if (!validRates.includes(data.sstRate)) {
        errors.push('Invalid SST rate');
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * 生成库存 ID
   */
  generateInventoryId() {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 7).toUpperCase();
    return `INV-${timestamp}-${random}`;
  }

  /**
   * 生成会计分录
   * （实际实现应调用 AccountingService）
   */
  generateJournalEntry(type, inventory, details) {
    // 简化示例 - 实际应调用 AccountingService.createJournalEntry()
    console.log(`Journal Entry: ${type}`, {
      inventory,
      details
    });
    
    // TODO: 调用 AccountingService 生成完整的复式记账分录
  }

  /**
   * 记录审计日志
   * （实际实现应调用 AuditService）
   */
  logAudit(action, entity, changes = {}) {
    // 简化示例 - 实际应调用 AuditService.log()
    console.log(`Audit Log: ${action}`, {
      entity,
      changes,
      timestamp: new Date().toISOString()
    });
    
    // TODO: 调用 AuditService 记录完整的审计日志
  }

  /**
   * 搜索库存
   */
  searchInventory(criteria) {
    let inventory = this.getAllInventory();

    // 按 SKU 搜索
    if (criteria.sku) {
      inventory = inventory.filter(item => 
        item.sku.toLowerCase().includes(criteria.sku.toLowerCase())
      );
    }

    // 按产品名称搜索
    if (criteria.productName) {
      inventory = inventory.filter(item => 
        item.productName.toLowerCase().includes(criteria.productName.toLowerCase())
      );
    }

    // 按仓库过滤
    if (criteria.warehouse) {
      inventory = inventory.filter(item => item.warehouse === criteria.warehouse);
    }

    // 按状态过滤
    if (criteria.status) {
      inventory = inventory.filter(item => item.status === criteria.status);
    }

    // 按库存数量过滤
    if (criteria.lowStock) {
      inventory = inventory.filter(item => item.quantityAvailable < criteria.lowStock);
    }

    return inventory;
  }

  /**
   * 获取库存统计
   */
  getInventoryStatistics() {
    const inventory = this.getAllInventory();

    return {
      totalItems: inventory.length,
      totalQuantity: inventory.reduce((sum, item) => sum + item.quantityOnHand, 0),
      totalValue: inventory.reduce((sum, item) => 
        sum + (item.totalCost * item.quantityOnHand), 0
      ),
      availableQuantity: inventory.reduce((sum, item) => sum + item.quantityAvailable, 0),
      reservedQuantity: inventory.reduce((sum, item) => sum + item.quantityReserved, 0),
      byStatus: this.groupByStatus(inventory),
      byWarehouse: this.groupByWarehouse(inventory)
    };
  }

  /**
   * 按状态分组统计
   */
  groupByStatus(inventory) {
    const grouped = {};
    inventory.forEach(item => {
      if (!grouped[item.status]) {
        grouped[item.status] = {
          count: 0,
          quantity: 0,
          value: 0
        };
      }
      grouped[item.status].count++;
      grouped[item.status].quantity += item.quantityOnHand;
      grouped[item.status].value += item.totalCost * item.quantityOnHand;
    });
    return grouped;
  }

  /**
   * 按仓库分组统计
   */
  groupByWarehouse(inventory) {
    const grouped = {};
    inventory.forEach(item => {
      if (!grouped[item.warehouse]) {
        grouped[item.warehouse] = {
          count: 0,
          quantity: 0,
          value: 0
        };
      }
      grouped[item.warehouse].count++;
      grouped[item.warehouse].quantity += item.quantityOnHand;
      grouped[item.warehouse].value += item.totalCost * item.quantityOnHand;
    });
    return grouped;
  }

  /**
   * 删除库存记录（软删除）
   */
  deleteInventory(id, deletedBy) {
    return this.updateInventory(id, {
      status: STATUS.INVENTORY.OBSOLETE,
      updatedBy: deletedBy
    });
  }
}

// 导出单例实例
export default new InventoryService();
