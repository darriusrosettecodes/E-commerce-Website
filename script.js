// Responsive Nav
const menuBtn = document.querySelector('.menu-button')
const closeMenuBtn = document.querySelector('.close-menu-button')
const menuNavbar = document.querySelector('.menu-nav-bar')
const overlay = document.querySelector('.overlay')
const searchBtn = document.querySelector('.search-button')
const searchBar = document.querySelector('.search-bar')

menuBtn.addEventListener('click', function(){
    menuNavbar.classList.toggle('active')
    overlay.style.display = 'block'
})

closeMenuBtn.addEventListener('click', function(){
    menuNavbar.classList.toggle('active')
    overlay.style.display = 'none'
})

searchBtn.addEventListener('click', function(){
    if(searchBar.style.display === 'none'){
        searchBar.style.display = 'block'
    }
    else{
        searchBar.style.display = 'none'
    }
})

// Nav Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const sectionId = this.getAttribute('href');
        const targetSection = document.querySelector(sectionId);

        if (targetSection) {
            menuNavbar.classList.remove('active')
            overlay.style.display = 'none'
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});


// Bestseller Section
const bestsellerBtns = document.querySelector('.bestseller-buttons')
const nikeShoes = document.querySelector('.nike-shoes')
const addidasShoes = document.querySelector('.addidas-shoes')
const allBtn = document.querySelector('#all')
const nikeBtn = document.querySelector('#nike')
const addidasBtn = document.querySelector('#addidas')

const activateSection = function(btn, section,){
    allBtn.classList.remove('active-product')
    nikeBtn.classList.remove('active-product')
    addidasBtn.classList.remove('active-product')

    nikeShoes.style.display = 'none'
    addidasShoes.style.display = 'none'

    btn.classList.add('active-product')
    section.style.display = 'block'
}

bestsellerBtns.addEventListener('click', function(e){
    if(e.target === allBtn){
        nikeBtn.classList.remove('active-product')
        addidasBtn.classList.remove('active-product')
        
        nikeShoes.style.display = 'block'
        addidasShoes.style.display = 'block'

        allBtn.classList.add('active-product')
    }
    if(e.target === nikeBtn){
        activateSection(nikeBtn, nikeShoes)
    }
    if(e.target === addidasBtn){
        activateSection(addidasBtn, addidasShoes)
    }
})

// Add items to cart
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const sidebar = document.querySelector('.shopping-cart');
const cartItems = document.querySelector('.cart-items');
const totalElement = document.querySelector('.total');
const cartBubbles = document.querySelectorAll('#num')
const prices = [];

addToCartButtons.forEach(button => {
    button.addEventListener('click', function(event) {
        const item = event.target.closest('.item');
        const imageUrl = item.querySelector('img').src;
        const shoeName = item.querySelector('h3').innerText;
        const shoePrice = parseFloat(item.getAttribute('data-price'));
        
        prices.push(shoePrice);

        const addedItem = document.createElement('div');
        addedItem.classList.add('added-item');
        addedItem.innerHTML = `
            <img class="cart-img" src="${imageUrl}" alt="${shoeName}">
            <div>
                <div class="details">
                    <h3>${shoeName}</h3>
                    <span>$${shoePrice.toFixed(2)}</span>

                    <br>

                    <button class="remove-from-cart">Remove</button>
                </div>
            </div>

            <hr>
        `;

        const removeButton = addedItem.querySelector('.remove-from-cart');
        removeButton.addEventListener('click', function() {
            addedItem.remove();
            const index = prices.indexOf(shoePrice);
            if (index !== -1) {
                prices.splice(index, 1);
                updateTotal();
            }
        });

        cartItems.appendChild(addedItem);
        updateTotal();
    });
});

const updateTotal = function() {
    const total = prices.reduce((acc, price) => acc + price, 0);
    totalElement.textContent = total.toFixed(2);

    cartBubbles.forEach(function(cartbubble){
        cartbubble.innerHTML = prices.length
    })
};

// Show Cart Sidebar
const shoppingCartBtn = document.querySelectorAll('.open-cart-button')
const closeSidebarBtn = document.querySelector('.close-sidebar-button')

shoppingCartBtn.forEach(function(button){
    button.addEventListener('click', function(){
        sidebar.style.display = 'block'
    })
})

closeSidebarBtn.addEventListener('click', function(){
    sidebar.style.display = 'none'
})






