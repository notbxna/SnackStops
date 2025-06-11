document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('orderForm');
  const ordersList = document.getElementById('ordersList');

  const loadOrders = () => {
    const orders = JSON.parse(localStorage.getItem('snackOrders') || '[]');
    ordersList.innerHTML = '';
    orders.forEach(order => {
      const li = document.createElement('li');
      li.textContent = `${order.name} - ${order.item} at ${order.time}, ${order.location} [${order.fruits.join(', ')}]`;
      ordersList.appendChild(li);
    });
  };

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const fruits = [];
      form.querySelectorAll('input[name="fruit"]:checked').forEach(cb => fruits.push(cb.value));

      const order = {
        item: data.get('item'),
        fruits,
        time: data.get('time'),
        location: data.get('location'),
        name: data.get('name'),
      };

      const orders = JSON.parse(localStorage.getItem('snackOrders') || '[]');
      orders.push(order);
      localStorage.setItem('snackOrders', JSON.stringify(orders));
      loadOrders();
      form.reset();
    });
  }

  loadOrders();
});
