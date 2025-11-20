// 系统初始化数据 / System Initialization Data
// 为演示环境提供初始数据 / Provides initial data for demo environment

import InventoryService from './services/inventory.service.js';

/**
 * 初始化演示数据
 */
export function initializeDemoData() {
  // 检查是否已有数据
  const existingInventory = InventoryService.getAllInventory();
  
  if (existingInventory.length > 0) {
    console.log('Demo data already exists. Skipping initialization.');
    return;
  }

  console.log('Initializing demo data...');

  // 创建演示库存数据
  const demoInventory = [
    {
      sku: '3T-INT-PRIMER-20L',
      productName: 'Interior Primer 20L',
      category: 'Primers',
      brand: '3TREES',
      warehouse: 'Kuching Hub',
      binLocation: 'A-12-03',
      quantityOnHand: 128,
      unitCost: 85.50,
      sstRate: 0.10,
      sstTaxCode: 'SR',
      hscode: '3208.10.00',
      batchNumber: 'BATCH-2025-001',
      lotNumber: 'LOT-KCH-001',
      manufacturingDate: '2025-01-15',
      expiryDate: '2027-01-15',
      status: 'Available',
      createdBy: 'system@jinza.com'
    },
    {
      sku: 'CKS-WATERPROOF-5L',
      productName: 'Waterproof Membrane 5L',
      category: 'Waterproofing',
      brand: 'CKS',
      warehouse: 'Bintulu Depot',
      binLocation: 'B-08-15',
      quantityOnHand: 86,
      unitCost: 125.00,
      sstRate: 0.10,
      sstTaxCode: 'SR',
      hscode: '3214.90.00',
      batchNumber: 'BATCH-2025-002',
      lotNumber: 'LOT-BTU-001',
      manufacturingDate: '2025-02-01',
      expiryDate: '2027-02-01',
      status: 'Reserved',
      createdBy: 'system@jinza.com'
    },
    {
      sku: 'CY-LOWVOC-1L',
      productName: 'Low VOC Interior 1L',
      category: 'Interior Paint',
      brand: 'Chenyang',
      warehouse: 'Kuching Hub',
      binLocation: 'A-05-20',
      quantityOnHand: 342,
      unitCost: 28.50,
      sstRate: 0.10,
      sstTaxCode: 'SR',
      hscode: '3208.10.00',
      batchNumber: 'BATCH-2025-003',
      lotNumber: 'LOT-KCH-002',
      manufacturingDate: '2025-03-10',
      expiryDate: '2026-09-10',
      status: 'Available',
      createdBy: 'system@jinza.com'
    },
    {
      sku: 'OYH-BITUMEN-DRUM',
      productName: 'Bitumen Sealant Drum',
      category: 'Sealants',
      brand: 'Oriental Yuhong',
      warehouse: 'Port Klang Bonded',
      binLocation: 'W-01-01',
      quantityOnHand: 56,
      unitCost: 450.00,
      sstRate: 0.10,
      sstTaxCode: 'SR',
      hscode: '2715.00.00',
      batchNumber: 'BATCH-2025-004',
      lotNumber: 'LOT-PKL-001',
      manufacturingDate: '2025-01-05',
      expiryDate: '2028-01-05',
      status: 'Pending QC',
      createdBy: 'system@jinza.com'
    },
    {
      sku: '3T-EXTERIOR-10L',
      productName: 'Exterior Shield 10L',
      category: 'Exterior Paint',
      brand: '3TREES',
      warehouse: 'Miri Satellite',
      binLocation: 'C-03-08',
      quantityOnHand: 74,
      unitCost: 165.00,
      sstRate: 0.10,
      sstTaxCode: 'SR',
      hscode: '3208.20.00',
      batchNumber: 'BATCH-2025-005',
      lotNumber: 'LOT-MIR-001',
      manufacturingDate: '2025-02-20',
      expiryDate: '2027-02-20',
      status: 'Available',
      createdBy: 'system@jinza.com'
    },
    {
      sku: 'CKS-EPOXY-2K-5L',
      productName: '2K Epoxy Floor Coating 5L',
      category: 'Floor Coatings',
      brand: 'CKS',
      warehouse: 'Kuching Hub',
      binLocation: 'A-18-12',
      quantityOnHand: 45,
      unitCost: 280.00,
      sstRate: 0.10,
      sstTaxCode: 'SR',
      hscode: '3208.90.00',
      batchNumber: 'BATCH-2025-006',
      lotNumber: 'LOT-KCH-003',
      manufacturingDate: '2025-03-01',
      expiryDate: '2026-03-01',
      status: 'Reserved',
      createdBy: 'system@jinza.com'
    },
    {
      sku: 'CY-WOOD-STAIN-1L',
      productName: 'Premium Wood Stain 1L',
      category: 'Wood Finishes',
      brand: 'Chenyang',
      warehouse: 'Bintulu Depot',
      binLocation: 'B-12-05',
      quantityOnHand: 198,
      unitCost: 42.00,
      sstRate: 0.10,
      sstTaxCode: 'SR',
      hscode: '3208.10.00',
      batchNumber: 'BATCH-2025-007',
      lotNumber: 'LOT-BTU-002',
      manufacturingDate: '2025-02-15',
      expiryDate: '2027-02-15',
      status: 'Available',
      createdBy: 'system@jinza.com'
    }
  ];

  // 创建库存记录
  demoInventory.forEach(item => {
    const result = InventoryService.createInventory(item);
    if (result.success) {
      console.log(`✓ Created inventory: ${item.sku}`);
    } else {
      console.error(`✗ Failed to create inventory: ${item.sku}`, result.error);
    }
  });

  console.log('Demo data initialization completed!');
  console.log(`Total items created: ${InventoryService.getAllInventory().length}`);
}

// 清除所有演示数据
export function clearDemoData() {
  localStorage.clear();
  console.log('All demo data cleared.');
}

// 重置演示数据
export function resetDemoData() {
  clearDemoData();
  initializeDemoData();
  console.log('Demo data reset completed.');
}

export default {
  initializeDemoData,
  clearDemoData,
  resetDemoData
};
