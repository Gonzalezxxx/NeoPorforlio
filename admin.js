// 管理员功能脚本
let adminProducts = [];
let orders = [];

// 初始化管理员页面
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    loadOrders();
    loadSettings();
    updateDashboard();
    renderProductsTable();
    
    // 添加产品表单提交
    const addProductForm = document.getElementById('addProductForm');
    if (addProductForm) {
        addProductForm.addEventListener('submit', function(e) {
            e.preventDefault();
            addNewProduct();
        });
    }
    
    // 搜索功能
    const searchInput = document.getElementById('searchProducts');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            searchProducts();
        });
    }
});

// 显示指定部分
function showSection(sectionId) {
    // 隐藏所有部分
    const sections = document.querySelectorAll('.admin-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // 移除所有按钮的active类
    const buttons = document.querySelectorAll('.admin-nav-btn');
    buttons.forEach(button => {
        button.classList.remove('active');
    });
    
    // 显示选中的部分
    document.getElementById(sectionId).classList.add('active');
    
    // 激活对应的按钮
    event.target.classList.add('active');
    
    // 根据部分更新内容
    switch(sectionId) {
        case 'dashboard':
            updateDashboard();
            break;
        case 'products':
            renderProductsTable();
            break;
        case 'orders':
            updateOrders();
            break;
    }
}

// 加载产品数据
function loadProducts() {
    const savedProducts = localStorage.getItem('adminProducts');
    if (savedProducts) {
        adminProducts = JSON.parse(savedProducts);
    } else {
        // 使用默认产品数据
        adminProducts = [
            {
                id: 1,
                title: "智能手机 Pro Max",
                description: "最新款智能手机，配备先进摄像头和超长续航",
                price: 5999,
                image: "📱",
                category: "电子产品",
                stock: 50,
                createdAt: new Date().toISOString()
            },
            {
                id: 2,
                title: "无线蓝牙耳机",
                description: "高品质音效，降噪功能，舒适佩戴",
                price: 899,
                image: "🎧",
                category: "电子产品",
                stock: 100,
                createdAt: new Date().toISOString()
            },
            {
                id: 3,
                title: "智能手表",
                description: "健康监测，运动追踪，智能提醒",
                price: 1299,
                image: "⌚",
                category: "电子产品",
                stock: 75,
                createdAt: new Date().toISOString()
            },
            {
                id: 4,
                title: "笔记本电脑",
                description: "高性能处理器，轻薄便携，长续航",
                price: 7999,
                image: "💻",
                category: "电子产品",
                stock: 25,
                createdAt: new Date().toISOString()
            },
            {
                id: 5,
                title: "运动鞋",
                description: "舒适透气，防滑耐磨，时尚设计",
                price: 399,
                image: "👟",
                category: "服装鞋帽",
                stock: 200,
                createdAt: new Date().toISOString()
            },
            {
                id: 6,
                title: "时尚背包",
                description: "大容量设计，防水材质，多隔层收纳",
                price: 299,
                image: "🎒",
                category: "服装鞋帽",
                stock: 150,
                createdAt: new Date().toISOString()
            },
            {
                id: 7,
                title: "咖啡机",
                description: "全自动咖啡机，多种咖啡模式，易清洗",
                price: 1599,
                image: "☕",
                category: "家用电器",
                stock: 30,
                createdAt: new Date().toISOString()
            },
            {
                id: 8,
                title: "空气净化器",
                description: "高效过滤，静音运行，智能控制",
                price: 899,
                image: "🌬️",
                category: "家用电器",
                stock: 40,
                createdAt: new Date().toISOString()
            }
        ];
        saveProducts();
    }
}

// 保存产品数据
function saveProducts() {
    localStorage.setItem('adminProducts', JSON.stringify(adminProducts));
}

// 加载订单数据
function loadOrders() {
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
        orders = JSON.parse(savedOrders);
    }
}

// 更新仪表板
function updateDashboard() {
    const totalProducts = adminProducts.length;
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]').length;
    
    document.getElementById('totalProducts').textContent = totalProducts;
    document.getElementById('totalOrders').textContent = totalOrders;
    document.getElementById('totalRevenue').textContent = '¥' + totalRevenue.toLocaleString();
    document.getElementById('cartItems').textContent = cartItems;
}

// 渲染产品表格
function renderProductsTable() {
    const tbody = document.getElementById('productsTableBody');
    tbody.innerHTML = '';
    
    adminProducts.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <div class="product-image-small">${product.image}</div>
            </td>
            <td>${product.title}</td>
            <td>¥${product.price.toLocaleString()}</td>
            <td>${product.category}</td>
            <td>
                <button class="btn" onclick="editProduct(${product.id})" style="padding: 0.5rem 1rem; font-size: 0.9rem;">
                    <i class="fas fa-edit"></i> 编辑
                </button>
                <button class="btn btn-danger" onclick="deleteProduct(${product.id})" style="padding: 0.5rem 1rem; font-size: 0.9rem;">
                    <i class="fas fa-trash"></i> 删除
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// 添加新产品
function addNewProduct() {
    const title = document.getElementById('productTitle').value;
    const price = parseFloat(document.getElementById('productPrice').value);
    const category = document.getElementById('productCategory').value;
    const image = document.getElementById('productImage').value;
    const description = document.getElementById('productDescription').value;
    
    if (!title || !price || !category || !description) {
        alert('请填写所有必填字段！');
        return;
    }
    
    const newProduct = {
        id: Date.now(),
        title: title,
        price: price,
        category: category,
        image: image,
        description: description,
        stock: 0,
        createdAt: new Date().toISOString()
    };
    
    adminProducts.push(newProduct);
    saveProducts();
    
    alert('产品添加成功！');
    resetForm();
    renderProductsTable();
    updateDashboard();
}

// 编辑产品
function editProduct(productId) {
    const product = adminProducts.find(p => p.id === productId);
    if (!product) return;
    
    const newTitle = prompt('产品名称:', product.title);
    if (newTitle === null) return;
    
    const newPrice = prompt('价格:', product.price);
    if (newPrice === null) return;
    
    const newCategory = prompt('类别:', product.category);
    if (newCategory === null) return;
    
    const newDescription = prompt('描述:', product.description);
    if (newDescription === null) return;
    
    product.title = newTitle;
    product.price = parseFloat(newPrice);
    product.category = newCategory;
    product.description = newDescription;
    
    saveProducts();
    renderProductsTable();
    alert('产品更新成功！');
}

// 删除产品
function deleteProduct(productId) {
    if (!confirm('确定要删除这个产品吗？此操作不可撤销！')) {
        return;
    }
    
    adminProducts = adminProducts.filter(p => p.id !== productId);
    saveProducts();
    renderProductsTable();
    updateDashboard();
    alert('产品删除成功！');
}

// 搜索产品
function searchProducts() {
    const searchTerm = document.getElementById('searchProducts').value.toLowerCase();
    const tbody = document.getElementById('productsTableBody');
    tbody.innerHTML = '';
    
    const filteredProducts = adminProducts.filter(product => 
        product.title.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
    );
    
    filteredProducts.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <div class="product-image-small">${product.image}</div>
            </td>
            <td>${product.title}</td>
            <td>¥${product.price.toLocaleString()}</td>
            <td>${product.category}</td>
            <td>
                <button class="btn" onclick="editProduct(${product.id})" style="padding: 0.5rem 1rem; font-size: 0.9rem;">
                    <i class="fas fa-edit"></i> 编辑
                </button>
                <button class="btn btn-danger" onclick="deleteProduct(${product.id})" style="padding: 0.5rem 1rem; font-size: 0.9rem;">
                    <i class="fas fa-trash"></i> 删除
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// 重置表单
function resetForm() {
    document.getElementById('addProductForm').reset();
}

// 更新订单
function updateOrders() {
    const pendingOrders = orders.filter(order => order.status === 'pending').length;
    const completedOrders = orders.filter(order => order.status === 'completed').length;
    
    document.getElementById('pendingOrders').textContent = pendingOrders;
    document.getElementById('completedOrders').textContent = completedOrders;
}

// 导出产品数据
function exportProducts() {
    const dataStr = JSON.stringify(adminProducts, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'products.json';
    link.click();
    URL.revokeObjectURL(url);
}

// 导入产品数据
function importProducts() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                try {
                    const importedProducts = JSON.parse(e.target.result);
                    if (Array.isArray(importedProducts)) {
                        adminProducts = importedProducts;
                        saveProducts();
                        renderProductsTable();
                        updateDashboard();
                        alert('产品数据导入成功！');
                    } else {
                        alert('文件格式不正确！');
                    }
                } catch (error) {
                    alert('文件解析失败！');
                }
            };
            reader.readAsText(file);
        }
    };
    input.click();
}

// 批量操作
function bulkDelete() {
    const selectedProducts = document.querySelectorAll('input[type="checkbox"]:checked');
    if (selectedProducts.length === 0) {
        alert('请选择要删除的产品！');
        return;
    }
    
    if (!confirm(`确定要删除选中的 ${selectedProducts.length} 个产品吗？`)) {
        return;
    }
    
    selectedProducts.forEach(checkbox => {
        const productId = parseInt(checkbox.value);
        adminProducts = adminProducts.filter(p => p.id !== productId);
    });
    
    saveProducts();
    renderProductsTable();
    updateDashboard();
    alert('批量删除完成！');
}

// 产品统计
function getProductStats() {
    const stats = {
        total: adminProducts.length,
        byCategory: {},
        totalValue: 0,
        averagePrice: 0
    };
    
    adminProducts.forEach(product => {
        // 按类别统计
        if (!stats.byCategory[product.category]) {
            stats.byCategory[product.category] = 0;
        }
        stats.byCategory[product.category]++;
        
        // 总价值
        stats.totalValue += product.price;
    });
    
    stats.averagePrice = stats.totalValue / stats.total;
    
    return stats;
}

// 显示产品统计
function showProductStats() {
    const stats = getProductStats();
    let message = `产品统计报告：\n\n`;
    message += `总产品数：${stats.total}\n`;
    message += `总价值：¥${stats.totalValue.toLocaleString()}\n`;
    message += `平均价格：¥${stats.averagePrice.toFixed(2)}\n\n`;
    message += `按类别分布：\n`;
    
    Object.keys(stats.byCategory).forEach(category => {
        message += `${category}：${stats.byCategory[category]} 个\n`;
    });
    
    alert(message);
}

// 保存设置
function saveSettings() {
    const settings = {
        siteName: document.getElementById('siteName').value,
        siteDescription: document.getElementById('siteDescription').value,
        contactPhone: document.getElementById('contactPhone').value,
        contactEmail: document.getElementById('contactEmail').value,
        contactAddress: document.getElementById('contactAddress').value,
        enableStripe: document.getElementById('enableStripe').checked,
        enablePayPal: document.getElementById('enablePayPal').checked,
        enableWeChat: document.getElementById('enableWeChat').checked,
        enableAlipay: document.getElementById('enableAlipay').checked
    };
    
    localStorage.setItem('siteSettings', JSON.stringify(settings));
    alert('设置保存成功！');
}

// 重置设置
function resetSettings() {
    if (confirm('确定要重置所有设置吗？')) {
        document.getElementById('siteName').value = '产品商店';
        document.getElementById('siteDescription').value = '精选商品，品质保证，为您提供最佳的购物体验';
        document.getElementById('contactPhone').value = '400-123-4567';
        document.getElementById('contactEmail').value = 'support@productstore.com';
        document.getElementById('contactAddress').value = '北京市朝阳区xxx街道123号';
        document.getElementById('enableStripe').checked = true;
        document.getElementById('enablePayPal').checked = true;
        document.getElementById('enableWeChat').checked = false;
        document.getElementById('enableAlipay').checked = false;
        
        alert('设置已重置！');
    }
}

// 加载设置
function loadSettings() {
    const savedSettings = localStorage.getItem('siteSettings');
    if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        document.getElementById('siteName').value = settings.siteName || '产品商店';
        document.getElementById('siteDescription').value = settings.siteDescription || '精选商品，品质保证，为您提供最佳的购物体验';
        document.getElementById('contactPhone').value = settings.contactPhone || '400-123-4567';
        document.getElementById('contactEmail').value = settings.contactEmail || 'support@productstore.com';
        document.getElementById('contactAddress').value = settings.contactAddress || '北京市朝阳区xxx街道123号';
        document.getElementById('enableStripe').checked = settings.enableStripe !== false;
        document.getElementById('enablePayPal').checked = settings.enablePayPal !== false;
        document.getElementById('enableWeChat').checked = settings.enableWeChat || false;
        document.getElementById('enableAlipay').checked = settings.enableAlipay || false;
    }
}

// 同步产品到主页面
function syncProductsToMain() {
    // 更新主页面的产品数据
    localStorage.setItem('products', JSON.stringify(adminProducts));
    alert('产品数据已同步到主页面！');
}

// 页面加载时的初始化
window.addEventListener('load', function() {
    // 添加键盘快捷键
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey || e.metaKey) {
            switch(e.key) {
                case 'n':
                    e.preventDefault();
                    showSection('add-product');
                    break;
                case 's':
                    e.preventDefault();
                    if (document.getElementById('products').classList.contains('active')) {
                        searchProducts();
                    }
                    break;
            }
        }
    });
    
    // 添加确认对话框样式
    const style = document.createElement('style');
    style.textContent = `
        .confirm-dialog {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 2rem;
            border-radius: 15px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            z-index: 10000;
            text-align: center;
        }
        
        .confirm-dialog h3 {
            margin-bottom: 1rem;
            color: #333;
        }
        
        .confirm-dialog p {
            margin-bottom: 2rem;
            color: #666;
        }
        
        .confirm-dialog .btn-group {
            display: flex;
            gap: 1rem;
            justify-content: center;
        }
    `;
    document.head.appendChild(style);
});
