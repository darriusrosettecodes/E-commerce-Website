class App {
    constructor() {
      this.menuBtn = document.querySelector('.menu-button');
      this.closeMenuBtn = document.querySelector('.close-menu-button');
      this.menuNavbar = document.querySelector('.menu-nav-bar');
      this.overlay = document.querySelector('.overlay');
      this.searchBtn = document.querySelector('.search-button');
      this.searchBar = document.querySelector('.search-bar');
  
      this.bestsellerBtns = document.querySelector('.bestseller-buttons');
      this.nikeShoes = document.querySelectorAll('.nike-shoe');
      this.addidasShoes = document.querySelectorAll('.addidas-shoe');
      
      this.addToCartButtons = document.querySelectorAll('.add-to-cart');
      this.sidebar = document.querySelector('.shopping-cart');
      this.cartItems = document.querySelector('.cart-items');
      this.totalElement = document.querySelector('.total');
      this.cartBubbles = document.querySelectorAll('#num');
      this.defaultMessage = document.querySelector('.defualt-message');
      this.totalSection = document.querySelector('.total-section');
      this.cartData = [];
  
      this.loadCartFromLocalStorage();
      this.attachEventListeners();
    }
  
    attachEventListeners() {
      this.menuBtn.addEventListener('click', () => this.toggleMenu());
      this.closeMenuBtn.addEventListener('click', () => this.toggleMenu());
      this.searchBtn.addEventListener('click', () => this.toggleSearchBar());
  
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => this.scrollToSection(e, anchor));
      });
  
      this.bestsellerBtns.addEventListener('click', (e) => this.handleBestsellerClick(e));
      
      this.addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => this.handleAddToCart(event));
      });
  
      const shoppingCartBtn = document.querySelectorAll('.open-cart-button');
      shoppingCartBtn.forEach(button => {
        button.addEventListener('click', () => this.showCart());
      });
  
      const closeSidebarBtn = document.querySelector('.close-sidebar-button');
      closeSidebarBtn.addEventListener('click', () => this.hideCart());
    }
  
    toggleMenu() {
        if (this.menuNavbar.style.display === 'none') {
          this.menuNavbar.style.display = 'block';
          this.overlay.style.display = 'block';
        } else {
          this.menuNavbar.style.display = 'none';
          this.overlay.style.display = 'none';
        }
      }
  
    toggleSearchBar() {
      this.searchBar.style.display = (this.searchBar.style.display === 'none') ? 'block' : 'none';
    }
  
    scrollToSection(event, anchor) {
      event.preventDefault();
      const sectionId = anchor.getAttribute('href');
      const targetSection = document.querySelector(sectionId);
  
      if (targetSection) {
        this.menuNavbar.style.display = 'none';
        this.overlay.style.display = 'none';
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  
    handleBestsellerClick(e) {
        const allShoes = document.querySelectorAll('.nike-shoe, .addidas-shoe');

      if (e.target === document.querySelector('#all')) {
        this.activateSection(document.querySelector('#all'), allShoes)
      } else if (e.target === document.querySelector('#nike')) {
        this.activateSection(document.querySelector('#nike'), this.nikeShoes);
      } else if (e.target === document.querySelector('#addidas')) {
        this.activateSection(document.querySelector('#addidas'), this.addidasShoes);
      }
    }
  
    activateSection(btn, section) {
      document.querySelector('#all').classList.remove('active-product');
      document.querySelector('#nike').classList.remove('active-product');
      document.querySelector('#addidas').classList.remove('active-product');
  
      this.nikeShoes.forEach(function(shoe){
        shoe.style.display = 'none'
      });

      this.addidasShoes.forEach(function(shoe){
        shoe.style.display = 'none'
      });
  
      btn.classList.add('active-product');
      section.forEach(function(shoe){
        shoe.style.display = 'inline-block'
      })
    }
  
    handleAddToCart(event) {
      const item = event.target.closest('.item');
      const imageUrl = item.querySelector('img').src;
      const shoeName = item.querySelector('h3').innerText;
      const shoePrice = parseFloat(item.getAttribute('data-price'));
  
      const newItem = {
        imageUrl: imageUrl,
        shoeName: shoeName,
        shoePrice: shoePrice
      };
  
      this.cartData.push(newItem);
      this.saveCartToLocalStorage();
      this.renderCartFromStorage();
      this.updateTotal();
      this.renderDisplayMessage();
    }
  
    loadCartFromLocalStorage() {
      const savedCart = localStorage.getItem('cartData');
      if (savedCart) {
        this.cartData = JSON.parse(savedCart);
        this.renderCartFromStorage();
        this.updateTotal();
      }
    }
  
    saveCartToLocalStorage() {
      localStorage.setItem('cartData', JSON.stringify(this.cartData));
    }
  
    renderCartFromStorage() {
      this.cartItems.innerHTML = '';
      this.cartData.forEach(item => {
        const addedItem = document.createElement('div');
        addedItem.classList.add('added-item');
        addedItem.innerHTML = `
          <img class="cart-img" src="${item.imageUrl}" alt="${item.shoeName}">
          <div>
              <div class="details">
                  <h3>${item.shoeName}</h3>
                  <span>$${item.shoePrice.toFixed(2)}</span>
                  <br>
                  <button class="remove-from-cart">Remove</button>
              </div>
          </div>
          <hr>
        `;
  
        const removeButton = addedItem.querySelector('.remove-from-cart');
        removeButton.addEventListener('click', () => this.handleRemoveFromCart(item));
  
        this.cartItems.appendChild(addedItem);
      });
      this.renderDisplayMessage();
    }
  
    handleRemoveFromCart(item) {
      const index = this.cartData.indexOf(item);
      if (index !== -1) {
        this.cartData.splice(index, 1);
        this.saveCartToLocalStorage();
        this.renderCartFromStorage();
        this.updateTotal();
      }
      if (this.cartData.length <= 0) {
        this.defaultMessage.style.display = 'block';
        this.totalSection.style.display = 'none';
      }
    }
  
    updateTotal() {
      const total = this.cartData.reduce((acc, item) => acc + item.shoePrice, 0);
      this.totalElement.textContent = total.toFixed(2);
  
      this.cartBubbles.forEach(cartbubble => {
        cartbubble.innerHTML = this.cartData.length;
      });
    }
  
    renderDisplayMessage() {
      if (this.cartData.length >= 1) {
        this.defaultMessage.style.display = 'none';
        this.totalSection.style.display = 'block';
      } else {
        this.defaultMessage.style.display = 'block';
        this.totalSection.style.display = 'none';
      }
    }
  
    showCart() {
      this.sidebar.style.display = 'block';
    }
  
    hideCart() {
      this.sidebar.style.display = 'none';
    }
  }
  
  const app = new App();