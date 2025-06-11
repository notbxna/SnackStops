<script>
  function addToCart(item) {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert("Added to cart!");
  }

  document.addEventListener('DOMContentLoaded', () => {
    const cartList = document.getElementById('cartItems');
    const form = document.getElementById('checkoutForm');
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');

    if (cartList) {
      cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        cartList.appendChild(li);
      });
    }

    if (form) {
      form.addEventListener('submit', e => {
        e.preventDefault();
        const data = new FormData(form);
        const order = {
          name: data.get('name'),
          time: data.get('time'),
          location: data.get('location'),
          items: cart
        };

        const allOrders = JSON.parse(localStorage.getItem('allOrders') || '[]');
        allOrders.push(order);
        localStorage.setItem('allOrders', JSON.stringify(allOrders));
        localStorage.removeItem('cart');
        alert('Order submitted!');
        form.reset();
        window.location.href = 'index.html';
      });
    }
  });
</script>
