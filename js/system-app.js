// 系统主入口文件 / System Main Entry Point
// 模块化架构 - 符合马来西亚法规的进销存与会计系统
// Modular Architecture - Malaysian Compliant IMS & Accounting System

// 导入配置
import { SYSTEM_CONFIG } from './config/constants.js';

// 导入服务
import InventoryService from './services/inventory.service.js';

// 导入工具
import { initializeDemoData } from './utils/demoData.js';

/**
 * 系统初始化类
 */
class SystemApp {
  constructor() {
    this.storageKey = SYSTEM_CONFIG.STORAGE_KEYS.USER_PROFILE;
    this.userProfile = null;
    this.init();
  }

  /**
   * 初始化系统
   */
  async init() {
    // 1. 验证用户登录状态
    if (!this.checkAuth()) {
      this.redirectToHome();
      return;
    }

    // 2. 加载用户信息
    this.loadUserProfile();

    // 3. 初始化界面
    this.initUI();

    // 4. 初始化服务
    this.initServices();

    // 5. 绑定事件监听
    this.bindEvents();

    // 6. 加载初始数据
    await this.loadInitialData();
  }

  /**
   * 检查用户认证状态
   */
  checkAuth() {
    const storedUser = localStorage.getItem(this.storageKey);
    if (!storedUser) {
      return false;
    }

    try {
      this.userProfile = JSON.parse(storedUser);
      return true;
    } catch (error) {
      console.error('Failed to parse user profile:', error);
      localStorage.removeItem(this.storageKey);
      return false;
    }
  }

  /**
   * 加载用户信息
   */
  loadUserProfile() {
    const userName = this.userProfile?.username || 'Administrator';
    const userNameElement = document.getElementById('systemUserName');
    
    if (userNameElement) {
      userNameElement.textContent = userName;
    }

    // 显示用户角色
    const userRole = this.userProfile?.role || 'Administrator';
    console.log(`User logged in: ${userName} (${userRole})`);
  }

  /**
   * 初始化用户界面
   */
  initUI() {
    // 导航按钮切换
    const navButtons = document.querySelectorAll('.system-nav-item');
    const sections = document.querySelectorAll('.system-section');

    navButtons.forEach(button => {
      button.addEventListener('click', () => {
        const targetId = button.dataset.target;
        this.switchSection(targetId);
      });
    });

    // 默认显示第一个section
    if (sections.length > 0) {
      const firstSection = sections[0];
      this.switchSection(firstSection.id);
    }
  }

  /**
   * 切换section
   */
  switchSection(targetId) {
    const sections = document.querySelectorAll('.system-section');
    const navButtons = document.querySelectorAll('.system-nav-item');

    sections.forEach(section => {
      section.classList.toggle('active', section.id === targetId);
    });

    navButtons.forEach(button => {
      button.classList.toggle('active', button.dataset.target === targetId);
    });

    // 根据不同section加载数据
    this.loadSectionData(targetId);
  }

  /**
   * 初始化服务
   */
  initServices() {
    // 初始化演示数据（仅在首次运行时）
    initializeDemoData();
    
    // 初始化库存服务
    this.inventoryService = InventoryService;
    
    // TODO: 初始化其他服务
    // this.purchaseService = PurchaseService;
    // this.salesService = SalesService;
    // this.accountingService = AccountingService;
  }

  /**
   * 绑定事件监听
   */
  bindEvents() {
    // 退出登录
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        this.logout();
      });
    }

    // 搜索功能
    const inventorySearch = document.getElementById('inventorySearch');
    if (inventorySearch) {
      inventorySearch.addEventListener('input', (e) => {
        this.handleInventorySearch(e.target.value);
      });
    }

    const inventoryStatusFilter = document.getElementById('inventoryStatusFilter');
    if (inventoryStatusFilter) {
      inventoryStatusFilter.addEventListener('change', (e) => {
        this.handleInventoryFilter(e.target.value);
      });
    }
  }

  /**
   * 加载初始数据
   */
  async loadInitialData() {
    try {
      // 加载库存统计数据
      this.loadInventoryMetrics();

      // 加载库存列表
      this.loadInventoryList();

      // TODO: 加载其他模块数据
    } catch (error) {
      console.error('Failed to load initial data:', error);
      this.showNotification('Failed to load data', 'error');
    }
  }

  /**
   * 根据section加载数据
   */
  loadSectionData(sectionId) {
    switch (sectionId) {
      case 'inventory':
        this.loadInventoryMetrics();
        this.loadInventoryList();
        break;
      case 'accounting':
        // TODO: 加载会计数据
        console.log('Load accounting data');
        break;
      case 'compliance':
        // TODO: 加载合规数据
        console.log('Load compliance data');
        break;
      default:
        console.log(`Unknown section: ${sectionId}`);
    }
  }

  /**
   * 加载库存指标
   */
  loadInventoryMetrics() {
    const stats = this.inventoryService.getInventoryStatistics();

    // 更新页面显示
    const metricOnHand = document.getElementById('metricOnHand');
    const metricInbound = document.getElementById('metricInbound');
    const metricPending = document.getElementById('metricPending');

    if (metricOnHand) {
      metricOnHand.textContent = stats.availableQuantity.toLocaleString();
    }

    if (metricInbound) {
      // TODO: 从采购服务获取在途数量
      metricInbound.textContent = '0';
    }

    if (metricPending) {
      metricPending.textContent = stats.reservedQuantity.toLocaleString();
    }
  }

  /**
   * 加载库存列表
   */
  loadInventoryList() {
    const inventory = this.inventoryService.getAllInventory();
    this.renderInventoryTable(inventory);
  }

  /**
   * 渲染库存表格
   */
  renderInventoryTable(inventory) {
    const tbody = document.querySelector('#inventoryTable tbody');
    if (!tbody) return;

    if (inventory.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="6" style="text-align: center; padding: 2rem;">
            No inventory data available. Add products to get started.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = inventory.map(item => `
      <tr>
        <td>${this.escapeHtml(item.sku)}</td>
        <td>${this.escapeHtml(item.productName)}</td>
        <td>${this.escapeHtml(item.warehouse)}</td>
        <td>${item.quantityOnHand}</td>
        <td><span class="badge badge-${this.getStatusColor(item.status)}">${item.status}</span></td>
        <td>
          <button class="btn-icon" onclick="viewInventoryDetail('${item.id}')" title="View Details">
            <i class="fas fa-eye"></i>
          </button>
          <button class="btn-icon" onclick="editInventory('${item.id}')" title="Edit">
            <i class="fas fa-edit"></i>
          </button>
        </td>
      </tr>
    `).join('');
  }

  /**
   * 处理库存搜索
   */
  handleInventorySearch(searchTerm) {
    const inventory = this.inventoryService.searchInventory({
      sku: searchTerm,
      productName: searchTerm
    });
    this.renderInventoryTable(inventory);
  }

  /**
   * 处理库存筛选
   */
  handleInventoryFilter(status) {
    let inventory;
    if (status === 'all') {
      inventory = this.inventoryService.getAllInventory();
    } else {
      inventory = this.inventoryService.searchInventory({ status });
    }
    this.renderInventoryTable(inventory);
  }

  /**
   * 退出登录
   */
  logout() {
    localStorage.removeItem(this.storageKey);
    this.redirectToHome();
  }

  /**
   * 重定向到首页
   */
  redirectToHome() {
    window.location.replace('index.html');
  }

  /**
   * 显示通知
   */
  showNotification(message, type = 'info') {
    // TODO: 实现完整的通知系统
    console.log(`[${type.toUpperCase()}] ${message}`);
  }

  /**
   * 转义HTML
   */
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  /**
   * 获取状态颜色
   */
  getStatusColor(status) {
    const colors = {
      'Available': 'success',
      'Reserved': 'warning',
      'Pending QC': 'info',
      'Obsolete': 'danger',
      'In Transit': 'secondary'
    };
    return colors[status] || 'secondary';
  }
}

// 全局函数（供HTML onclick使用）
window.viewInventoryDetail = (id) => {
  console.log('View inventory detail:', id);
  // TODO: 实现详情查看
};

window.editInventory = (id) => {
  console.log('Edit inventory:', id);
  // TODO: 实现编辑功能
};

// 页面加载完成后初始化系统
document.addEventListener('DOMContentLoaded', () => {
  window.systemApp = new SystemApp();
});
