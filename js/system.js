document.addEventListener('DOMContentLoaded', () => {
    const STORAGE_KEY = 'jinzaUser';
    const storedUser = localStorage.getItem(STORAGE_KEY);

    function redirectToHome() {
        window.location.replace('index.html');
    }

    if (!storedUser) {
        redirectToHome();
        return;
    }

    let userProfile;
    try {
        userProfile = JSON.parse(storedUser);
    } catch (error) {
        console.error('Failed to parse stored user profile', error);
        localStorage.removeItem(STORAGE_KEY);
        redirectToHome();
        return;
    }

    const userName = userProfile?.username || 'Administrator';
    const systemUserName = document.getElementById('systemUserName');
    if (systemUserName) {
        systemUserName.textContent = userName;
    }

    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem(STORAGE_KEY);
            redirectToHome();
        });
    }

    const navButtons = document.querySelectorAll('.system-nav-item');
    const sections = document.querySelectorAll('.system-section');

    function setActiveSection(targetId) {
        sections.forEach(section => {
            section.classList.toggle('active', section.id === targetId);
        });
        navButtons.forEach(button => {
            button.classList.toggle('active', button.dataset.target === targetId);
        });
    }

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const target = button.dataset.target;
            if (!target) return;
            setActiveSection(target);
        });
    });

    const inventoryDataset = [
        {
            sku: '3T-INT-PRIMER-20L',
            product: 'Interior Primer 20L',
            warehouse: 'Kuching Hub',
            quantity: 128,
            sstCode: 'SR',
            status: 'Available'
        },
        {
            sku: 'CKS-WATERPROOF-5L',
            product: 'Waterproof Membrane 5L',
            warehouse: 'Bintulu Depot',
            quantity: 86,
            sstCode: 'SR',
            status: 'Reserved'
        },
        {
            sku: 'CY-LOWVOC-1L',
            product: 'Low VOC Interior 1L',
            warehouse: 'Kuching Hub',
            quantity: 342,
            sstCode: 'ZR',
            status: 'Pending QC'
        },
        {
            sku: 'OYH-BITUMEN-DRUM',
            product: 'Bitumen Sealant Drum',
            warehouse: 'Port Klang Bonded',
            quantity: 56,
            sstCode: 'SR',
            status: 'Available'
        },
        {
            sku: '3T-EXTERIOR-10L',
            product: 'Exterior Shield 10L',
            warehouse: 'Miri Satellite',
            quantity: 74,
            sstCode: 'SR',
            status: 'Reserved'
        }
    ];

    const purchaseDataset = [
        {
            poNumber: 'PO-2025-045',
            supplier: '3TREES Manufacturing HQ',
            eta: '2025-11-28',
            sstAmount: 12840.0,
            status: 'In Customs',
            customsRef: 'K1-482593-25'
        },
        {
            poNumber: 'PO-2025-046',
            supplier: 'CKS Waterproofing MY',
            eta: '2025-11-24',
            sstAmount: 6840.0,
            status: 'Awaiting GRN',
            customsRef: 'K1-482712-25'
        },
        {
            poNumber: 'PO-2025-047',
            supplier: 'Oriental Yuhong APAC',
            eta: '2025-12-02',
            sstAmount: 15600.0,
            status: 'PO Issued',
            customsRef: 'Pending'
        }
    ];

    const salesDataset = [
        {
            invoice: 'INV-2025-311',
            customer: 'Sunway Construction',
            orderAmount: 48250.0,
            sst: 2895.0,
            fulfilment: 'Pending Delivery',
            dueDate: '2025-11-30'
        },
        {
            invoice: 'INV-2025-312',
            customer: 'Sarawak Housing Dev.',
            orderAmount: 32800.0,
            sst: 1968.0,
            fulfilment: 'Ready to Invoice',
            dueDate: '2025-12-05'
        },
        {
            invoice: 'INV-2025-313',
            customer: 'Petronas Facilities',
            orderAmount: 75600.0,
            sst: 4536.0,
            fulfilment: 'Delivered',
            dueDate: '2025-11-18'
        }
    ];

    const ledgerDataset = [
        {
            date: '2025-11-01',
            voucher: 'JV-2025-201',
            account: '1101-Inventory Control',
            description: 'Stock receipt - PO-2025-041',
            debit: 25600.0,
            credit: 0,
            sstCode: 'TX',
            type: 'Purchase'
        },
        {
            date: '2025-11-01',
            voucher: 'JV-2025-201',
            account: '2101-Trade Payables',
            description: 'Stock receipt - PO-2025-041',
            debit: 0,
            credit: 25600.0,
            sstCode: 'TX',
            type: 'Purchase'
        },
        {
            date: '2025-11-10',
            voucher: 'SV-2025-118',
            account: '1201-Trade Receivables',
            description: 'Invoice INV-2025-311 issuance',
            debit: 48250.0,
            credit: 0,
            sstCode: 'SR',
            type: 'Sales'
        },
        {
            date: '2025-11-10',
            voucher: 'SV-2025-118',
            account: '4101-Sales Revenue',
            description: 'Invoice INV-2025-311 issuance',
            debit: 0,
            credit: 45355.0,
            sstCode: 'SR',
            type: 'Sales'
        },
        {
            date: '2025-11-10',
            voucher: 'SV-2025-118',
            account: '2150-SST Output Tax',
            description: 'Invoice INV-2025-311 SST 6%',
            debit: 0,
            credit: 2895.0,
            sstCode: 'SR',
            type: 'Sales'
        },
        {
            date: '2025-11-15',
            voucher: 'JV-2025-223',
            account: '5105-Logistics Expense',
            description: 'Customs inspection fees',
            debit: 720.0,
            credit: 0,
            sstCode: 'ES',
            type: 'Journal'
        },
        {
            date: '2025-11-15',
            voucher: 'JV-2025-223',
            account: '1110-Cash at Bank',
            description: 'Customs inspection fees',
            debit: 0,
            credit: 720.0,
            sstCode: 'ES',
            type: 'Journal'
        }
    ];

    const trialBalanceDataset = [
        {
            accountCode: '1101',
            accountName: 'Inventory Control',
            opening: 186000.0,
            debitTotal: 25600.0,
            creditTotal: 11200.0,
            closing: 200400.0
        },
        {
            accountCode: '1201',
            accountName: 'Trade Receivables',
            opening: 94500.0,
            debitTotal: 48250.0,
            creditTotal: 32500.0,
            closing: 110250.0
        },
        {
            accountCode: '2101',
            accountName: 'Trade Payables',
            opening: 73400.0,
            debitTotal: 28400.0,
            creditTotal: 25600.0,
            closing: 70600.0
        },
        {
            accountCode: '2150',
            accountName: 'SST Output Tax',
            opening: 18250.0,
            debitTotal: 9180.0,
            creditTotal: 12475.0,
            closing: 21545.0
        },
        {
            accountCode: '4101',
            accountName: 'Sales Revenue',
            opening: 0,
            debitTotal: 0,
            creditTotal: 45355.0,
            closing: -45355.0
        }
    ];

    const complianceDataset = [
        {
            dueDate: '2025-11-28',
            task: 'Submit SST-02 return for October period',
            owner: 'Finance Controller',
            status: 'In Progress',
            reference: 'SST Act 2018 Sec.40'
        },
        {
            dueDate: '2025-12-05',
            task: 'Finalize management accounts with bilingual notes',
            owner: 'Finance Reporting',
            status: 'Pending',
            reference: 'Companies Act 2016 Sec.245'
        },
        {
            dueDate: '2025-12-10',
            task: 'Archive signed delivery orders for Q4 audits',
            owner: 'Operations Admin',
            status: 'In Progress',
            reference: 'Customs Regulations 1977 Rule 64'
        },
        {
            dueDate: '2025-12-12',
            task: 'Transmit e-Invoice batch to LHDN sandbox',
            owner: 'IT Systems',
            status: 'Scheduled',
            reference: 'LHDN e-Invoice Pilot 2024'
        }
    ];

    function formatNumber(value) {
        return new Intl.NumberFormat('en-MY', { maximumFractionDigits: 0 }).format(value);
    }

    function formatCurrency(value) {
        return new Intl.NumberFormat('en-MY', {
            style: 'currency',
            currency: 'MYR'
        }).format(value);
    }

    function updateMetrics() {
        const onHandElement = document.getElementById('metricOnHand');
        const inboundElement = document.getElementById('metricInbound');
        const pendingElement = document.getElementById('metricPending');
        const debitElement = document.getElementById('metricDebits');
        const creditElement = document.getElementById('metricCredits');
        const complianceElement = document.getElementById('metricCompliance');

        if (onHandElement) {
            const total = inventoryDataset.reduce((sum, item) => sum + item.quantity, 0);
            onHandElement.textContent = formatNumber(total);
        }

        if (inboundElement) {
            const inbound = purchaseDataset.reduce((sum, item) => sum + (item.status !== 'PO Issued' ? 1 : 0), 0);
            inboundElement.textContent = `${inbound} shipment${inbound === 1 ? '' : 's'}`;
        }

        if (pendingElement) {
            const pending = salesDataset.filter(item => item.fulfilment !== 'Delivered').length;
            pendingElement.textContent = `${pending} order${pending === 1 ? '' : 's'}`;
        }

        if (debitElement) {
            const debitTotal = ledgerDataset.reduce((sum, entry) => sum + entry.debit, 0);
            debitElement.textContent = formatCurrency(debitTotal);
        }

        if (creditElement) {
            const creditTotal = ledgerDataset.reduce((sum, entry) => sum + entry.credit, 0);
            creditElement.textContent = formatCurrency(creditTotal);
        }

        if (complianceElement) {
            const outstanding = complianceDataset.filter(task => task.status !== 'Completed').length;
            complianceElement.textContent = outstanding;
        }
    }

    function renderTable(tableBodyId, dataset, columns) {
        const tableBody = document.getElementById(tableBodyId);
        if (!tableBody) return;

        tableBody.innerHTML = '';

        dataset.forEach(row => {
            const tr = document.createElement('tr');
            columns.forEach(column => {
                const td = document.createElement('td');
                const value = typeof column.format === 'function'
                    ? column.format(row[column.key], row)
                    : row[column.key];
                td.textContent = value;
                tr.appendChild(td);
            });
            tableBody.appendChild(tr);
        });
    }

    function attachFilters({ searchId, statusId, dataset, statusKey, tableBodyId, columns }) {
        const searchInput = document.getElementById(searchId);
        const statusSelect = statusId ? document.getElementById(statusId) : null;
        const hasStatusFilter = Boolean(statusSelect && statusKey);

        const applyFilters = () => {
            const searchTerm = (searchInput?.value || '').trim().toLowerCase();
            const statusFilter = hasStatusFilter ? statusSelect.value : 'all';

            const filteredDataset = dataset.filter(item => {
                const matchesStatus = !hasStatusFilter || statusFilter === 'all' || item[statusKey] === statusFilter;
                if (!matchesStatus) return false;

                if (!searchTerm) return true;
                return Object.values(item).some(value =>
                    String(value).toLowerCase().includes(searchTerm)
                );
            });

            renderTable(tableBodyId, filteredDataset, columns);
        };

        if (searchInput) {
            searchInput.addEventListener('input', applyFilters);
        }

        if (statusSelect) {
            statusSelect.addEventListener('change', applyFilters);
        }

        applyFilters();
    }

    updateMetrics();

    attachFilters({
        searchId: 'inventorySearch',
        statusId: 'inventoryStatusFilter',
        dataset: inventoryDataset,
        statusKey: 'status',
        tableBodyId: 'inventoryTableBody',
        columns: [
            { key: 'sku' },
            { key: 'product' },
            { key: 'warehouse' },
            { key: 'quantity', format: (value) => formatNumber(value) },
            { key: 'sstCode' },
            { key: 'status' }
        ]
    });

    attachFilters({
        searchId: 'purchaseSearch',
        statusId: 'purchaseStatusFilter',
        dataset: purchaseDataset,
        statusKey: 'status',
        tableBodyId: 'purchaseTableBody',
        columns: [
            { key: 'poNumber' },
            { key: 'supplier' },
            { key: 'eta' },
            { key: 'sstAmount', format: (value) => formatCurrency(value) },
            { key: 'status' },
            { key: 'customsRef' }
        ]
    });

    attachFilters({
        searchId: 'salesSearch',
        statusId: 'salesStatusFilter',
        dataset: salesDataset,
        statusKey: 'fulfilment',
        tableBodyId: 'salesTableBody',
        columns: [
            { key: 'invoice' },
            { key: 'customer' },
            { key: 'orderAmount', format: (value) => formatCurrency(value) },
            { key: 'sst', format: (value) => formatCurrency(value) },
            { key: 'fulfilment' },
            { key: 'dueDate' }
        ]
    });

    attachFilters({
        searchId: 'ledgerSearch',
        statusId: 'ledgerTypeFilter',
        dataset: ledgerDataset,
        statusKey: 'type',
        tableBodyId: 'ledgerTableBody',
        columns: [
            { key: 'date' },
            { key: 'voucher' },
            { key: 'account' },
            { key: 'description' },
            { key: 'debit', format: (value) => value ? formatCurrency(value) : '-' },
            { key: 'credit', format: (value) => value ? formatCurrency(value) : '-' },
            { key: 'sstCode' }
        ]
    });

    attachFilters({
        searchId: 'trialBalanceSearch',
        dataset: trialBalanceDataset,
        tableBodyId: 'trialBalanceTableBody',
        columns: [
            { key: 'accountCode' },
            { key: 'accountName' },
            { key: 'opening', format: (value) => formatCurrency(value) },
            { key: 'debitTotal', format: (value) => formatCurrency(value) },
            { key: 'creditTotal', format: (value) => formatCurrency(value) },
            { key: 'closing', format: (value) => formatCurrency(value) }
        ]
    });

    renderTable('complianceTableBody', complianceDataset, [
        { key: 'dueDate' },
        { key: 'task' },
        { key: 'owner' },
        { key: 'status' },
        { key: 'reference' }
    ]);

    function wireForm(formId, feedbackId, successMessage) {
        const form = document.getElementById(formId);
        const feedback = document.getElementById(feedbackId);
        if (!form || !feedback) return;

        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const formData = new FormData(form);
            const payload = Object.fromEntries(formData.entries());
            const draftLog = {
                payload,
                submittedBy: userName,
                submittedAt: new Date().toISOString(),
            };
            console.table(draftLog);

            feedback.textContent = successMessage;
            feedback.classList.add('visible');

            form.reset();
        });
    }

    wireForm('stockForm', 'stockFormFeedback', 'Draft saved locally. Please route to Inventory Manager for approval.');
    wireForm('journalForm', 'journalFormFeedback', 'Draft journal captured. Submit to Finance for posting.');
});
