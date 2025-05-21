// Cart functionality
let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

// Update cart count
function updateCartCount() {
  const cartCountElements = document.querySelectorAll('#cart-count');
  cartCountElements.forEach(element => {
    element.textContent = cartItems.length;
  });
}

// Add to cart function
function addToCart(name, price) {
  cartItems.push({ name, price });
  localStorage.setItem('cart', JSON.stringify(cartItems));
  updateCartCount();
  showNotification(`${name} added to cart`);
}

// Show notification
function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.classList.add('show');
  }, 10);
  
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Filter products
function filterProducts(category) {
  const products = document.querySelectorAll('.product-card');
  products.forEach(product => {
    if (category === 'all' || product.dataset.category === category) {
      product.style.display = 'block';
    } else {
      product.style.display = 'none';
    }
  });
}

// FAQ toggle
function setupFAQ() {
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const answer = question.nextElementSibling;
      const toggle = question.querySelector('.faq-toggle');
      
      if (answer.style.maxHeight) {
        answer.style.maxHeight = null;
        toggle.textContent = '+';
      } else {
        answer.style.maxHeight = answer.scrollHeight + 'px';
        toggle.textContent = '-';
      }
    });
  });
}

// Payment method toggle
function setupPaymentMethods() {
  const paymentMethods = document.querySelectorAll('input[name="payment"]');
  const paymentDetails = document.getElementById('mobile-payment');
  
  if (paymentMethods.length > 0) {
    paymentMethods.forEach(method => {
      method.addEventListener('change', (e) => {
        if (e.target.value === 'credit') {
          paymentDetails.style.display = 'none';
        } else {
          paymentDetails.style.display = 'block';
        }
      });
    });
  }
}

// Form submission
function setupForms() {
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (form.id === 'paymentForm') {
        showNotification('Order placed successfully! Thank you for your purchase.');
        cartItems = [];
        localStorage.setItem('cart', JSON.stringify(cartItems));
        updateCartCount();
      } else {
        showNotification('Form submitted successfully!');
        form.reset();
      }
    });
  });
}

// Add to cart buttons
function setupAddToCartButtons() {
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
      const name = button.dataset.name;
      const price = parseFloat(button.dataset.price);
      addToCart(name, price);
    });
  });
}

// Filter buttons
function setupFilterButtons() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      filterProducts(button.dataset.category);
    });
  });
}

// Initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  setupFAQ();
  setupPaymentMethods();
  setupForms();
  setupAddToCartButtons();
  setupFilterButtons();
});