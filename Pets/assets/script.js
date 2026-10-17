console.log('JavaScript conectado correctamente');

// Carrito
let cart = [];


// Elementos del CSS
const cartItems = document.querySelector("#cart-items");
const cartCount = document.querySelector("#cart-count");
const cartTotal = document.querySelector("#cart-total");
const clearCartButton = document.querySelector("#clear-cart");
const addButtons = document.querySelectorAll(".boton-agregar");

// Formato de precios
function formatPrice(value) {
    return "$" + value.toLocaleString("es-CL");
}

// Botón agregar al carrito
function addToCart(id, name, price, quantity) {
    // .find() busca el primer elemento que cumpla la condición
    // En este caso, es una función donde 'item' corresponde a cada producto del carrito
    const existingProduct = cart.find(function (item) {
        return item.id === id;
    });

    if (existingProduct) {
        existingProduct.quantity += quantity;
    } else {
        const product = { id, name, price, quantity };
        cart.push(product);
    }

    renderCart();
}

// Botón elmiminar del carrito
function removeProduct(id) {
    // .filter con un array, crea otro array con los elementos que cumplan la condición
    cart = cart.filter(function (product) {
        return product.id !== id;
    });

    renderCart();
}

// Aumentar la cantidad del producto
function increaseQuantity(id) {
    const product = cart.find(function (item) {
        return item.id === id;
    });

    if (product) {
        product.quantity++;
    }

    renderCart();
}

// Disminuir la cantidad del producto
function decreaseQuantity(id) {
    const product = cart.find(function (item) {
        return item.id === id;
    });

    if (!product) {
        return;
    }

    product.quantity--;

    if (product.quantity <= 0) {
        removeProduct(id);
        return;
    }

    renderCart();
}

// Calcular la cantidad de productos
function calculateTotalQuantity() {
    let total = 0;

    cart.forEach(function (product) {
        total += product.quantity;
    });

    return total;
}

// Calcular el total de los productos
function calculateTotalPrice() {
    let total = 0;

    cart.forEach(function (product) {
        total += product.price * product.quantity
    });

    return total;
}

// Mostrar carrito
function renderCart() {
    cartItems.innerHTML = "";

    if (cart.length === 0) {
        // Inserta dentro del <div>
        cartItems.innerHTML = '<p>No hay productos en el carrito.</p>';
    } else {
        cart.forEach(function (product) {
            // Crear un nuevo elemento en el HTML para mostrar los productos
            const item = document.createElement("div");
            // Agregar una clase al elemento
            item.classList.add("cart-item");

            // Calcular el subtotal
            const subtotal = product.price * product.quantity;

            // Crear el HTML para mostrar los productos
            item.innerHTML = `
                <h3>${product.name}</h3>
                <p>${formatPrice(product.price)}</p>

                <div>
                    <button class="decrease-button" data-id="${product.id}">-</button>
                    <span>${product.quantity}</span>
                    <button class="increase-button" data-id="${product.id}">+</button>
                </div>

                <p>Subtotal: $${subtotal}</p>

                <button class="remove-button" data-id="${product.id}">
                    🗑️ Eliminar
                </button>
            `;

            cartItems.appendChild(item);
        });
    }

    cartCount.textContent = calculateTotalQuantity();
    cartTotal.textContent = formatPrice(calculateTotalPrice());

    // querySelectorAll nos da una 'lista' de elementos que tengan esa clase
    // Por eso usamos .forEach() para recorrer cada uno de ellos
    const removeButtons = document.querySelectorAll(".remove-button");
    removeButtons.forEach(function (button) {

        // .addEventListener() es para "escuchar" eventos en un elemento
        // "click" es el evento que queremos escuchar
        // function () {} es la función que se ejecutará cuando se detecte el evento
        button.addEventListener("click", function () {

            // button.dataset.id es para obtener el id del producto desde el HTML
            // (en este caso, se recoge el id del HTML dinámico que se genera en .cart-items)
            removeProduct(button.dataset.id);
        });
    });

    const increaseButtons = document.querySelectorAll(".increase-button");
    increaseButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            increaseQuantity(button.dataset.id);
        });
    });

    const decreaseButtons = document.querySelectorAll(".decrease-button");
    decreaseButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            decreaseQuantity(button.dataset.id);
        });
    });
}

// Botones agregar al carrito
addButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const productElement = button.closest(".product-card");

        const id = productElement.dataset.id;
        const name = productElement.dataset.name;
        const price = Number(productElement.dataset.price);

        const quantityInput = productElement.querySelector(".product-quantity");
        const quantity = Number(quantityInput.value);

        if (quantity < 1) {
            alert("La cantidad debe ser al menos 1");
            return;
        }

        addToCart(id, name, price, quantity);
        quantityInput.value = "1";
    });
});

// Vaciar carrito
clearCartButton.addEventListener("click", function () {
    cart = [];
    renderCart();
});

// Mostrar estado inicial del carrito
renderCart();











