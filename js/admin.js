// ===============================
// FRESHCART ADMIN MODULE
// ===============================

// Get users
function getAdminUsers() {
    return JSON.parse(
        localStorage.getItem("freshcartUsers")
    ) || [];
}


// Get orders
function getAdminOrders() {
    return JSON.parse(
        localStorage.getItem("freshcartOrders")
    ) || [];
}


// Get admin products
function getAdminProducts() {

    return JSON.parse(
        localStorage.getItem("freshcartAdminProducts")
    ) || [];
}


// Save admin products
function saveAdminProducts(products) {

    localStorage.setItem(
        "freshcartAdminProducts",
        JSON.stringify(products)
    );
}


// ===============================
// DEFAULT PRODUCTS
// ===============================

const defaultAdminProducts = [
    {
        id: 1,
        name: "Apple",
        category: "Fruits",
        price: 120,
        stock: 50
    },
    {
        id: 2,
        name: "Banana",
        category: "Fruits",
        price: 60,
        stock: 80
    },
    {
        id: 3,
        name: "Orange",
        category: "Fruits",
        price: 90,
        stock: 60
    },
    {
        id: 4,
        name: "Tomato",
        category: "Vegetables",
        price: 45,
        stock: 70
    },
    {
        id: 5,
        name: "Potato",
        category: "Vegetables",
        price: 40,
        stock: 90
    },
    {
        id: 6,
        name: "Onion",
        category: "Vegetables",
        price: 50,
        stock: 75
    },
    {
        id: 7,
        name: "Milk",
        category: "Dairy",
        price: 32,
        stock: 100
    },
    {
        id: 8,
        name: "Rice",
        category: "Groceries",
        price: 70,
        stock: 100
    }
];


// Initialize products
let adminProducts =
    getAdminProducts();


if (adminProducts.length === 0) {

    adminProducts =
        defaultAdminProducts;

    saveAdminProducts(adminProducts);
}


// ===============================
// DASHBOARD
// ===============================

function updateDashboard() {

    const totalProducts =
        document.getElementById(
            "totalProducts"
        );

    const totalOrders =
        document.getElementById(
            "totalOrders"
        );

    const availableStock =
        document.getElementById(
            "availableStock"
        );

    const totalUsers =
        document.getElementById(
            "totalUsers"
        );


    if (totalProducts) {

        totalProducts.textContent =
            adminProducts.length;
    }


    if (totalOrders) {

        totalOrders.textContent =
            getAdminOrders().length;
    }


    if (availableStock) {

        const stock =
            adminProducts.reduce(
                (total, product) =>
                    total + Number(product.stock),
                0
            );

        availableStock.textContent =
            stock;
    }


    if (totalUsers) {

        totalUsers.textContent =
            getAdminUsers().length;
    }
}


// ===============================
// ADD PRODUCT
// ===============================

const productForm =
    document.getElementById(
        "productForm"
    );


if (productForm) {

    productForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name =
                document.getElementById(
                    "productName"
                ).value.trim();


            const category =
                document.getElementById(
                    "productCategory"
                ).value;


            const price =
                Number(
                    document.getElementById(
                        "productPrice"
                    ).value
                );


            const stock =
                Number(
                    document.getElementById(
                        "productStock"
                    ).value
                );


            if (!name || !category) {

                alert(
                    "Please enter all product details."
                );

                return;
            }


            const newProduct = {

                id: Date.now(),

                name: name,

                category: category,

                price: price,

                stock: stock

            };


            adminProducts.push(
                newProduct
            );


            saveAdminProducts(
                adminProducts
            );


            productForm.reset();


            displayInventory();

            updateDashboard();


            alert(
                "Product added successfully! 🎉"
            );
        }
    );
}


// ===============================
// DISPLAY INVENTORY
// ===============================

function displayInventory() {

    const container =
        document.getElementById(
            "inventoryContainer"
        );


    if (!container) {
        return;
    }


    if (adminProducts.length === 0) {

        container.innerHTML =
            "<p>No products available.</p>";

        return;
    }


    container.innerHTML = "";


    adminProducts.forEach(
        product => {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "inventory-item";


            item.innerHTML = `

                <div>

                    <strong>
                        ${product.name}
                    </strong>

                    <p>
                        Category:
                        ${product.category}
                    </p>

                    <p>
                        Price:
                        ₹${product.price}
                    </p>

                    <p>
                        Stock:
                        ${product.stock}
                    </p>

                </div>


                <div class="admin-actions">

                    <button
                        onclick="updatePrice(${product.id})"
                    >
                        Update Price
                    </button>


                    <button
                        onclick="updateStock(${product.id})"
                    >
                        Update Stock
                    </button>


                    <button
                        onclick="deleteProduct(${product.id})"
                    >
                        Delete
                    </button>

                </div>

            `;


            container.appendChild(item);

        }
    );
}


// ===============================
// UPDATE PRICE
// ===============================

function updatePrice(productId) {

    const product =
        adminProducts.find(
            product =>
                product.id === productId
        );


    if (!product) {
        return;
    }


    const newPrice =
        prompt(
            `Enter new price for ${product.name}:`,
            product.price
        );


    if (
        newPrice === null ||
        newPrice === "" ||
        Number(newPrice) < 0
    ) {

        return;
    }


    product.price =
        Number(newPrice);


    saveAdminProducts(
        adminProducts
    );


    displayInventory();

    updateDashboard();


    alert(
        "Product price updated successfully! ✅"
    );
}


// ===============================
// UPDATE STOCK
// ===============================

function updateStock(productId) {

    const product =
        adminProducts.find(
            product =>
                product.id === productId
        );


    if (!product) {
        return;
    }


    const newStock =
        prompt(
            `Enter new stock for ${product.name}:`,
            product.stock
        );


    if (
        newStock === null ||
        newStock === "" ||
        Number(newStock) < 0
    ) {

        return;
    }


    product.stock =
        Number(newStock);


    saveAdminProducts(
        adminProducts
    );


    displayInventory();

    updateDashboard();


    alert(
        "Product stock updated successfully! ✅"
    );
}


// ===============================
// DELETE PRODUCT
// ===============================

function deleteProduct(productId) {

    const product =
        adminProducts.find(
            product =>
                product.id === productId
        );


    if (!product) {
        return;
    }


    const confirmDelete =
        confirm(
            `Delete ${product.name}?`
        );


    if (!confirmDelete) {
        return;
    }


    adminProducts =
        adminProducts.filter(
            product =>
                product.id !== productId
        );


    saveAdminProducts(
        adminProducts
    );


    displayInventory();

    updateDashboard();


    alert(
        "Product deleted successfully."
    );
}


// ===============================
// DISPLAY ORDERS
// ===============================

function displayOrders() {

    const container =
        document.getElementById(
            "ordersContainer"
        );


    if (!container) {
        return;
    }


    const orders =
        getAdminOrders();


    if (orders.length === 0) {

        container.innerHTML =
            "<p>No orders placed yet.</p>";

        return;
    }


    container.innerHTML = "";


    orders.forEach(
        (order, index) => {

            const orderDiv =
                document.createElement(
                    "div"
                );


            orderDiv.className =
                "order-item";


            let itemsHTML = "";


            order.items.forEach(
                item => {

                    itemsHTML += `
                        <li>
                            ${item.name}
                            × ${item.quantity}
                        </li>
                    `;

                }
            );


            orderDiv.innerHTML = `

                <h3>
                    Order #${index + 1}
                </h3>

                <p>
                    <strong>Status:</strong>
                    ${order.status}
                </p>

                <p>
                    <strong>Delivery:</strong>
                    ${order.deliveryDate}
                </p>

                <p>
                    <strong>Time:</strong>
                    ${order.deliveryTime}
                </p>

                <p>
                    <strong>Ordered On:</strong>
                    ${order.createdAt}
                </p>

                <h4>Products:</h4>

                <ul>
                    ${itemsHTML}
                </ul>

                <button
                    onclick="updateOrderStatus(${order.id})"
                >
                    Update Order Status
                </button>

            `;


            container.appendChild(
                orderDiv
            );

        }
    );
}


// ===============================
// UPDATE ORDER STATUS
// ===============================

function updateOrderStatus(orderId) {

    const orders =
        getAdminOrders();


    const order =
        orders.find(
            order =>
                order.id === orderId
        );


    if (!order) {
        return;
    }


    const newStatus =
        prompt(
            "Enter order status:",
            order.status
        );


    if (
        newStatus === null ||
        newStatus.trim() === ""
    ) {

        return;
    }


    order.status =
        newStatus.trim();


    localStorage.setItem(
        "freshcartOrders",
        JSON.stringify(orders)
    );


    displayOrders();

    updateDashboard();


    alert(
        "Order status updated successfully! ✅"
    );
}


// ===============================
// DISPLAY USERS
// ===============================

function displayUsers() {

    const container =
        document.getElementById(
            "usersContainer"
        );


    if (!container) {
        return;
    }


    const users =
        getAdminUsers();


    if (users.length === 0) {

        container.innerHTML =
            "<p>No registered users yet.</p>";

        return;
    }


    container.innerHTML = "";


    users.forEach(
        user => {

            const userDiv =
                document.createElement(
                    "div"
                );


            userDiv.className =
                "user-item";


            userDiv.innerHTML = `

                <h3>
                    ${user.name}
                </h3>

                <p>
                    Email:
                    ${user.email}
                </p>

            `;


            container.appendChild(
                userDiv
            );

        }
    );
}


// ===============================
// INITIAL LOAD
// ===============================

displayInventory();

displayOrders();

displayUsers();

updateDashboard();