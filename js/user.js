// ===============================
// FRESHCART USER MODULE
// ===============================

// Product data
const products = [
    {
        id: 1,
        name: "Apple",
        category: "Fruits",
        price: 120,
        quantity: "1 kg",
        image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 2,
        name: "Banana",
        category: "Fruits",
        price: 60,
        quantity: "1 dozen",
        image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 3,
        name: "Orange",
        category: "Fruits",
        price: 90,
        quantity: "1 kg",
        image: "https://images.unsplash.com/photo-1547514701-42782101795e?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 4,
        name: "Tomato",
        category: "Vegetables",
        price: 45,
        quantity: "1 kg",
        image: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 5,
        name: "Potato",
        category: "Vegetables",
        price: 40,
        quantity: "1 kg",
        image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 6,
        name: "Onion",
        category: "Vegetables",
        price: 50,
        quantity: "1 kg",
        image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 7,
        name: "Milk",
        category: "Dairy",
        price: 32,
        quantity: "500 ml",
        image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 8,
        name: "Curd",
        category: "Dairy",
        price: 45,
        quantity: "500 g",
        image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 9,
        name: "Rice",
        category: "Groceries",
        price: 70,
        quantity: "1 kg",
        image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 10,
        name: "Wheat Flour",
        category: "Groceries",
        price: 55,
        quantity: "1 kg",
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 11,
        name: "Shampoo",
        category: "Personal Care",
        price: 180,
        quantity: "650 ml",
        image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 12,
        name: "Dishwash Liquid",
        category: "Household",
        price: 110,
        quantity: "500 ml",
        image: "https://images.unsplash.com/photo-1585832770485-e68a5dbfad52?auto=format&fit=crop&w=500&q=80"
    }
];


// ===============================
// CART
// ===============================

let cart = JSON.parse(localStorage.getItem("freshcartCart")) || [];

let discountAmount = 0;


// Save cart
function saveCart() {
    localStorage.setItem(
        "freshcartCart",
        JSON.stringify(cart)
    );
}


// ===============================
// DISPLAY PRODUCTS
// ===============================

function displayProducts(productList = products) {

    const container =
        document.getElementById("productContainer");

    if (!container) {
        return;
    }

    container.innerHTML = "";

    if (productList.length === 0) {

        container.innerHTML = `
            <p class="no-products">
                No products found.
            </p>
        `;

        return;
    }


    productList.forEach(product => {

        const card = document.createElement("div");

        card.className = "product-card";

        card.innerHTML = `

            <img
                src="${product.image}"
                alt="${product.name}"
            >

            <div class="product-info">

                <h3>${product.name}</h3>

                <p class="category">
                    ${product.category}
                </p>

                <p class="quantity">
                    ${product.quantity}
                </p>

                <h4>
                    ₹${product.price}
                </h4>

                <button
                    class="btn primary-btn add-cart-btn"
                    onclick="addToCart(${product.id})"
                >
                    Add to Cart
                </button>

            </div>
        `;

        container.appendChild(card);
    });
}


// ===============================
// ADD TO CART
// ===============================

function addToCart(productId) {

    const product =
        products.find(p => p.id === productId);

    if (!product) {
        return;
    }


    const existingItem =
        cart.find(item => item.id === productId);


    if (existingItem) {

        existingItem.quantity += 1;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });

    }


    saveCart();

    displayCart();

    alert(`${product.name} added to cart! 🛒`);
}


// ===============================
// DISPLAY CART
// ===============================

function displayCart() {

    const container =
        document.getElementById("cartContainer");

    const totalElement =
        document.getElementById("cartTotal");


    if (!container || !totalElement) {
        return;
    }


    if (cart.length === 0) {

        container.innerHTML = `
            <p id="emptyCart">
                Your cart is empty.
            </p>
        `;

        totalElement.textContent = "0";

        return;
    }


    container.innerHTML = "";

    let total = 0;


    cart.forEach(item => {

        const itemTotal =
            item.price * item.quantity;

        total += itemTotal;


        const cartItem =
            document.createElement("div");

        cartItem.className = "cart-item";


        cartItem.innerHTML = `

            <div>

                <strong>${item.name}</strong>

                <p>
                    ${item.quantity} × ₹${item.price}
                </p>

            </div>


            <div class="cart-controls">

                <button
                    onclick="decreaseQuantity(${item.id})"
                >
                    −
                </button>

                <span>
                    ${item.quantity}
                </span>

                <button
                    onclick="increaseQuantity(${item.id})"
                >
                    +
                </button>

                <button
                    onclick="removeFromCart(${item.id})"
                >
                    Remove
                </button>

            </div>

        `;


        container.appendChild(cartItem);

    });


    const finalTotal =
        Math.max(0, total - discountAmount);


    totalElement.textContent =
        finalTotal.toFixed(2);
}


// ===============================
// INCREASE QUANTITY
// ===============================

function increaseQuantity(productId) {

    const item =
        cart.find(item => item.id === productId);

    if (item) {

        item.quantity++;

        saveCart();

        displayCart();
    }
}


// ===============================
// DECREASE QUANTITY
// ===============================

function decreaseQuantity(productId) {

    const item =
        cart.find(item => item.id === productId);

    if (!item) {
        return;
    }


    item.quantity--;


    if (item.quantity <= 0) {

        cart =
            cart.filter(
                item => item.id !== productId
            );
    }


    saveCart();

    displayCart();
}


// ===============================
// REMOVE FROM CART
// ===============================

function removeFromCart(productId) {

    cart =
        cart.filter(
            item => item.id !== productId
        );


    saveCart();

    displayCart();
}


// ===============================
// SEARCH
// ===============================

const searchInput =
    document.getElementById("searchInput");


if (searchInput) {

    searchInput.addEventListener(
        "input",
        function () {

            filterProducts();

        }
    );
}


// ===============================
// CATEGORY FILTER
// ===============================

const categoryFilter =
    document.getElementById("categoryFilter");


if (categoryFilter) {

    categoryFilter.addEventListener(
        "change",
        function () {

            filterProducts();

        }
    );
}


// ===============================
// FILTER PRODUCTS
// ===============================

function filterProducts() {

    const searchText =
        searchInput
            ? searchInput.value.toLowerCase()
            : "";


    const category =
        categoryFilter
            ? categoryFilter.value
            : "all";


    const filtered =
        products.filter(product => {

            const matchesSearch =
                product.name
                    .toLowerCase()
                    .includes(searchText);


            const matchesCategory =
                category === "all" ||
                product.category === category;


            return matchesSearch &&
                   matchesCategory;
        });


    displayProducts(filtered);
}


// ===============================
// DISCOUNT
// ===============================

const discountButton =
    document.getElementById(
        "applyDiscountBtn"
    );


if (discountButton) {

    discountButton.addEventListener(
        "click",
        applyDiscount
    );
}


function applyDiscount() {

    const code =
        document
            .getElementById("discountCode")
            .value
            .trim()
            .toUpperCase();


    const message =
        document.getElementById(
            "discountMessage"
        );


    if (code === "FRESH10") {

        discountAmount = calculateDiscount(10);

        message.textContent =
            "10% discount applied! 🎉";

        message.style.color = "green";

    } else {

        discountAmount = 0;

        message.textContent =
            "Invalid discount code.";

        message.style.color = "red";
    }


    displayCart();
}


// ===============================
// CALCULATE DISCOUNT
// ===============================

function calculateDiscount(percent) {

    let total = 0;


    cart.forEach(item => {

        total +=
            item.price * item.quantity;

    });


    return total * (percent / 100);
}


// ===============================
// CHECKOUT
// ===============================

const checkoutButton =
    document.getElementById("checkoutBtn");


if (checkoutButton) {

    checkoutButton.addEventListener(
        "click",
        checkout
    );
}


function checkout() {

    if (cart.length === 0) {

        alert(
            "Your cart is empty. Add some products first! 🛒"
        );

        return;
    }


    const deliveryDate =
        document.getElementById(
            "deliveryDate"
        ).value;


    const deliveryTime =
        document.getElementById(
            "deliveryTime"
        ).value;


    if (!deliveryDate) {

        alert(
            "Please select a delivery date."
        );

        return;
    }


    const order = {

        id: Date.now(),

        items: [...cart],

        deliveryDate: deliveryDate,

        deliveryTime: deliveryTime,

        discount: discountAmount,

        status: "Order Placed",

        createdAt:
            new Date().toLocaleString()

    };


    const orders =
        JSON.parse(
            localStorage.getItem(
                "freshcartOrders"
            )
        ) || [];


    orders.push(order);


    localStorage.setItem(
        "freshcartOrders",
        JSON.stringify(orders)
    );


    alert(
        "Order placed successfully! 🎉\n\n" +
        `Delivery: ${deliveryDate}\n` +
        `Time: ${deliveryTime}`
    );


    cart = [];

    discountAmount = 0;

    saveCart();

    displayCart();
}


// ===============================
// INITIAL LOAD
// ===============================

displayProducts();

displayCart();