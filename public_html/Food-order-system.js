document.addEventListener('DOMContentLoaded', () => {
    const menuDiv = document.getElementById('menu');
    const cartItemsUl = document.getElementById('cart-items');
    const totalPriceSpan = document.getElementById('total-price');
    const checkoutBtn = document.getElementById('checkout-btn');

    let cart = [];
    const menuItems = [
        { id: 1, name: 'Burger', price: 250.00 },
        { id: 2, name: 'Pizza (Medium)', price: 400.00 },
        { id: 3, name: 'French Fries', price: 100.00 },
        { id: 4, name: 'Cola', price: 60.00 },
        { id: 5, name: 'Pasta', price: 300.00 },
        { id: 6, name: 'Salad', price: 180.00 }
    ];

    // Function to render menu items
    function renderMenuItems() {
        menuItems.forEach(item => {
            const menuItemDiv = document.createElement('div');
            menuItemDiv.classList.add('menu-item');
            menuItemDiv.innerHTML = `
                <h3>${item.name}</h3>
                <p>₹${item.price.toFixed(2)}</p>
                <button class="add-to-cart-btn" data-id="${item.id}">Add to Cart</button>
            `;
            menuDiv.appendChild(menuItemDiv);
        });
    }

    // Function to update cart display and total
    function updateCart() {
        cartItemsUl.innerHTML = ''; // Clear current cart display
        let total = 0;

        if (cart.length === 0) {
            cartItemsUl.innerHTML = '<li style="text-align: center; padding: 15px; color: #777;">Your cart is empty.</li>';
            checkoutBtn.disabled = true;
        } else {
            cart.forEach(item => {
                const li = document.createElement('li');
                li.classList.add('cart-item');
                li.innerHTML = `
                    <span>${item.name} x ${item.quantity}</span>
                    <span>₹${(item.price * item.quantity).toFixed(2)}</span>
                    <button class="remove-btn" data-id="${item.id}">Remove</button>
                `;
                cartItemsUl.appendChild(li);
                total += item.price * item.quantity;
            });
            checkoutBtn.disabled = false;
        }
        totalPriceSpan.textContent = total.toFixed(2);
    }

    // Add event listener for "Add to Cart" buttons
    menuDiv.addEventListener('click', (event) => {
        if (event.target.classList.contains('add-to-cart-btn')) {
            const itemId = parseInt(event.target.dataset.id);
            const selectedItem = menuItems.find(item => item.id === itemId);

            const existingCartItem = cart.find(item => item.id === itemId);
            if (existingCartItem) {
                existingCartItem.quantity++;
            } else {
                cart.push({ ...selectedItem, quantity: 1 });
            }
            updateCart();
        }
    });

    // Add event listener for "Remove" buttons in the cart
    cartItemsUl.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-btn')) {
            const itemId = parseInt(event.target.dataset.id);
            const itemIndex = cart.findIndex(item => item.id === itemId);

            if (itemIndex !== -1) {
                if (cart[itemIndex].quantity > 1) {
                    cart[itemIndex].quantity--;
                } else {
                    cart.splice(itemIndex, 1); // Remove item if quantity is 1
                }
            }
            updateCart();
        }
    });

    // Simulated Checkout button
    checkoutBtn.addEventListener('click', () => {
        if (cart.length > 0) {
            alert('Order placed successfully! (This is a simulated checkout)');
            cart = []; // Clear cart after simulated checkout
            updateCart();
        } else {
            alert('Your cart is empty. Please add items before checking out.');
        }
    });

    // Initial render
    renderMenuItems();
    updateCart(); // Initialize cart display
});