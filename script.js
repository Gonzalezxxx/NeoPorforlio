// 默认产品数据
const defaultProducts = [
    {
        id: 1,
        title: "智能手机 Pro Max",
        description: "最新款智能手机，配备先进摄像头和超长续航",
        price: 5999,
        image: "📱",
        category: "电子产品"
    },
    {
        id: 2,
        title: "无线蓝牙耳机",
        description: "高品质音效，降噪功能，舒适佩戴",
        price: 899,
        image: "🎧",
        category: "电子产品"
    },
    {
        id: 3,
        title: "智能手表",
        description: "健康监测，运动追踪，智能提醒",
        price: 1299,
        image: "⌚",
        category: "电子产品"
    },
    {
        id: 4,
        title: "笔记本电脑",
        description: "高性能处理器，轻薄便携，长续航",
        price: 7999,
        image: "💻",
        category: "电子产品"
    },
    {
        id: 5,
        title: "运动鞋",
        description: "舒适透气，防滑耐磨，时尚设计",
        price: 399,
        image: "👟",
        category: "服装鞋帽"
    },
    {
        id: 6,
        title: "时尚背包",
        description: "大容量设计，防水材质，多隔层收纳",
        price: 299,
        image: "🎒",
        category: "服装鞋帽"
    },
    {
        id: 7,
        title: "咖啡机",
        description: "全自动咖啡机，多种咖啡模式，易清洗",
        price: 1599,
        image: "☕",
        category: "家用电器"
    },
    {
        id: 8,
        title: "空气净化器",
        description: "高效过滤，静音运行，智能控制",
        price: 899,
        image: "🌬️",
        category: "家用电器"
    }
];

// 产品数据 - 从Local Storage加载或使用默认数据
let products = [];

// 购物车数据
let cart = [];
let cartTotal = 0;

// DOM 元素
const productsGrid = document.getElementById('productsGrid');
const cartSidebar = document.getElementById('cartSidebar');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartTotalElement = document.getElementById('cartTotal');
const checkoutModal = document.getElementById('checkoutModal');
const orderItems = document.getElementById('orderItems');
const orderTotal = document.getElementById('orderTotal');

// 加载产品数据
function loadProducts() {
    const savedProducts = localStorage.getItem('adminProducts');
    console.log('加载产品数据...', savedProducts ? '找到数据' : '未找到数据');
    
    if (savedProducts) {
        products = JSON.parse(savedProducts);
        console.log('产品数量:', products.length);
    } else {
        products = [...defaultProducts];
        // 保存默认产品到Local Storage
        localStorage.setItem('adminProducts', JSON.stringify(products));
        console.log('使用默认产品，数量:', products.length);
    }
}

// 初始化页面
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    renderProducts();
    updateCartDisplay();
    
    // 添加平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // 联系表单提交
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('感谢您的消息！我们会尽快回复您。');
            this.reset();
        });
    }
    
    // 结账表单提交
    const checkoutForm = document.getElementById('checkoutForm');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function(e) {
            e.preventDefault();
            processOrder();
        });
    }
});

// 渲染产品列表
function renderProducts() {
    productsGrid.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                ${product.image}
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">¥${product.price.toLocaleString()}</div>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                    <i class="fas fa-cart-plus"></i> 加入购物车
                </button>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

// 添加到购物车
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartDisplay();
    showAddToCartAnimation();
}

// 显示添加到购物车动画
function showAddToCartAnimation() {
    const cartBtn = document.querySelector('.cart-btn');
    cartBtn.style.transform = 'scale(1.1)';
    cartBtn.style.backgroundColor = '#ffd700';
    
    setTimeout(() => {
        cartBtn.style.transform = 'scale(1)';
        cartBtn.style.backgroundColor = 'rgba(255,255,255,0.2)';
    }, 300);
}

// 更新购物车显示
function updateCartDisplay() {
    // 更新购物车数量
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // 更新购物车总价
    cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotalElement.textContent = cartTotal.toFixed(2);
    
    // 渲染购物车商品
    renderCartItems();
}

// 渲染购物车商品
function renderCartItems() {
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: #666; padding: 2rem;">购物车是空的</p>';
        return;
    }
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-image">${item.image}</div>
            <div class="cart-item-info">
                <div class="cart-item-title">${item.title}</div>
                <div class="cart-item-price">¥${item.price.toLocaleString()}</div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
            </div>
            <button class="remove-item" onclick="removeFromCart(${item.id})">删除</button>
        `;
        cartItems.appendChild(cartItem);
    });
}

// 更新商品数量
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        updateCartDisplay();
    }
}

// 从购物车移除商品
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
}

// 切换购物车侧边栏
function toggleCart() {
    cartSidebar.classList.toggle('open');
    
    // 添加背景遮罩
    if (cartSidebar.classList.contains('open')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
}

// 滚动到产品区域
function scrollToProducts() {
    document.getElementById('products').scrollIntoView({
        behavior: 'smooth'
    });
}

// 滚动到品牌故事区域
function scrollToStory() {
    document.getElementById('story').scrollIntoView({
        behavior: 'smooth'
    });
}

// 结账
function checkout() {
    if (cart.length === 0) {
        alert('购物车是空的！');
        return;
    }
    
    // 关闭购物车侧边栏
    cartSidebar.classList.remove('open');
    document.body.style.overflow = 'auto';
    
    // 显示结账模态框
    checkoutModal.classList.add('open');
    
    // 渲染订单详情
    renderOrderSummary();
}

// 渲染订单摘要
function renderOrderSummary() {
    orderItems.innerHTML = '';
    
    cart.forEach(item => {
        const orderItem = document.createElement('div');
        orderItem.className = 'order-item';
        orderItem.innerHTML = `
            <span>${item.title} x ${item.quantity}</span>
            <span>¥${(item.price * item.quantity).toLocaleString()}</span>
        `;
        orderItems.appendChild(orderItem);
    });
    
    orderTotal.textContent = cartTotal.toFixed(2);
}

// 关闭结账模态框
function closeCheckout() {
    checkoutModal.classList.remove('open');
}

// 处理订单
function processOrder() {
    // 模拟订单处理
    const orderNumber = 'ORD' + Date.now();
    
    // 显示支付选项
    showPaymentOptions(orderNumber);
}

// 显示支付选项
function showPaymentOptions(orderNumber) {
    const paymentModal = document.createElement('div');
    paymentModal.className = 'payment-modal';
    paymentModal.innerHTML = `
        <div class="payment-content">
            <div class="payment-header">
                <h3>选择支付方式</h3>
                <button class="close-payment" onclick="closePayment()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="payment-body">
                <div class="order-summary">
                    <h4>订单详情</h4>
                    <p>订单号：${orderNumber}</p>
                    <p>总金额：¥${cartTotal.toFixed(2)}</p>
                </div>
                <div class="payment-methods">
                    <div class="payment-method" onclick="processPayment('stripe', '${orderNumber}')">
                        <i class="fab fa-cc-stripe"></i>
                        <span>Stripe 支付</span>
                        <small>支持信用卡、借记卡</small>
                    </div>
                    <div class="payment-method" onclick="processPayment('paypal', '${orderNumber}')">
                        <i class="fab fa-paypal"></i>
                        <span>PayPal 支付</span>
                        <small>使用 PayPal 账户</small>
                    </div>
                    <div class="payment-method" onclick="processPayment('wechat', '${orderNumber}')">
                        <i class="fab fa-weixin"></i>
                        <span>微信支付</span>
                        <small>扫码支付</small>
                    </div>
                    <div class="payment-method" onclick="processPayment('alipay', '${orderNumber}')">
                        <i class="fab fa-alipay"></i>
                        <span>支付宝</span>
                        <small>扫码支付</small>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(paymentModal);
    paymentModal.style.display = 'flex';
}

// 处理支付
function processPayment(method, orderNumber) {
    // 这里可以集成真实的支付API
    // 目前是模拟支付流程
    
    let paymentMessage = '';
    switch(method) {
        case 'stripe':
            paymentMessage = '正在跳转到 Stripe 支付页面...';
            break;
        case 'paypal':
            paymentMessage = '正在跳转到 PayPal 支付页面...';
            break;
        case 'wechat':
            paymentMessage = '请使用微信扫描二维码完成支付';
            break;
        case 'alipay':
            paymentMessage = '请使用支付宝扫描二维码完成支付';
            break;
    }
    
    // 模拟支付成功
    setTimeout(() => {
        alert(`支付成功！\n订单号：${orderNumber}\n总金额：¥${cartTotal.toFixed(2)}\n\n我们会尽快处理您的订单。`);
        
        // 清空购物车
        cart = [];
        updateCartDisplay();
        
        // 关闭所有模态框
        closePayment();
        closeCheckout();
        
        // 重置表单
        document.getElementById('checkoutForm').reset();
    }, 2000);
    
    // 显示支付处理中
    alert(paymentMessage);
}

// 关闭支付模态框
function closePayment() {
    const paymentModal = document.querySelector('.payment-modal');
    if (paymentModal) {
        paymentModal.remove();
    }
}

// 点击模态框外部关闭
checkoutModal.addEventListener('click', function(e) {
    if (e.target === checkoutModal) {
        closeCheckout();
    }
});

// 键盘事件
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        if (checkoutModal.classList.contains('open')) {
            closeCheckout();
        }
        if (cartSidebar.classList.contains('open')) {
            toggleCart();
        }
    }
});

// 搜索功能
function searchProducts(query) {
    const filteredProducts = products.filter(product => 
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
    );
    
    // 重新渲染过滤后的产品
    productsGrid.innerHTML = '';
    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                ${product.image}
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">¥${product.price.toLocaleString()}</div>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                    <i class="fas fa-cart-plus"></i> 加入购物车
                </button>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

// 按类别筛选产品
function filterByCategory(category) {
    const filteredProducts = category === 'all' ? products : products.filter(product => product.category === category);
    
    productsGrid.innerHTML = '';
    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                ${product.image}
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">¥${product.price.toLocaleString()}</div>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                    <i class="fas fa-cart-plus"></i> 加入购物车
                </button>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

// 价格排序
function sortProducts(sortBy) {
    let sortedProducts = [...products];
    
    switch(sortBy) {
        case 'price-low':
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            sortedProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name':
            sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
            break;
        default:
            return;
    }
    
    productsGrid.innerHTML = '';
    sortedProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                ${product.image}
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">¥${product.price.toLocaleString()}</div>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                    <i class="fas fa-cart-plus"></i> 加入购物车
                </button>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

// 添加产品到收藏
function addToFavorites(productId) {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (!favorites.includes(productId)) {
        favorites.push(productId);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        alert('已添加到收藏夹！');
    } else {
        alert('该商品已在收藏夹中！');
    }
}

// 获取收藏夹商品
function getFavorites() {
    return JSON.parse(localStorage.getItem('favorites') || '[]');
}

// 页面加载动画
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// 滚动时导航栏效果
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(102, 126, 234, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        navbar.style.backdropFilter = 'none';
    }
});

// 产品卡片悬停效果增强
document.addEventListener('DOMContentLoaded', function() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// 购物车数量动画
function animateCartCount() {
    const cartCountElement = document.getElementById('cartCount');
    cartCountElement.style.transform = 'scale(1.3)';
    cartCountElement.style.color = '#ffd700';
    
    setTimeout(() => {
        cartCountElement.style.transform = 'scale(1)';
        cartCountElement.style.color = 'white';
    }, 200);
}

// 在添加到购物车时调用动画
const originalAddToCart = addToCart;
addToCart = function(productId) {
    originalAddToCart(productId);
    animateCartCount();
};

// 监听产品数据变化
function syncProducts() {
    loadProducts();
    renderProducts();
    updateSyncStatus('产品数据已刷新');
}

// 手动刷新产品
function refreshProducts() {
    updateSyncStatus('正在刷新产品数据...');
    syncProducts();
}

// 更新同步状态
function updateSyncStatus(message) {
    const statusElement = document.getElementById('syncStatus');
    if (statusElement) {
        statusElement.textContent = `${message} - ${new Date().toLocaleTimeString()}`;
    }
}

// 定期检查产品数据更新（每2秒检查一次）
setInterval(syncProducts, 2000);

// 监听Local Storage变化
window.addEventListener('storage', function(e) {
    if (e.key === 'adminProducts') {
        console.log('检测到产品数据变化，正在同步...');
        syncProducts();
    }
});

// 监听页面可见性变化（当用户切换回页面时刷新）
document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        console.log('页面重新可见，刷新产品数据...');
        syncProducts();
    }
});

// 监听页面焦点变化
window.addEventListener('focus', function() {
    console.log('页面获得焦点，刷新产品数据...');
    syncProducts();
});
