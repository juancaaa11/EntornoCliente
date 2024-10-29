
const products = [
    { id: 1, name: "Producto 1", price: 10 },
    { id: 2, name: "Producto 2", price: 15 },
    { id: 3, name: "Producto 3", price: 20 },
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];


function displayProducts() {
    const productsContainer = document.getElementById("products");
    productsContainer.innerHTML = products.map(product => `
        <div class="product">
            <h3>${product.name}</h3>
            <p>Precio: $${product.price}</p>
            <button onclick="addToCart(${product.id})">Agregar al Carrito</button>
        </div>
    `).join("");
}


function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);
    
    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCart();
}


function updateCart() {
    const cartContainer = document.getElementById("cart-items");
    cartContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <p>${item.name} - Cantidad: ${item.quantity}</p>
            <button onclick="removeFromCart(${item.id})">Eliminar</button>
        </div>
    `).join("");
    
    localStorage.setItem("cart", JSON.stringify(cart));
}


function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}


document.getElementById("empty-cart").addEventListener("click", () => {
    cart = [];
    updateCart();
});


displayProducts();
updateCart();
