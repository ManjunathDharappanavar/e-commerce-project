const products = [
    {id: 1, name:"Smart Watch", price: "449", Image: "https://m.media-amazon.com/images/I/61Famx7xQwL._SX679_.jpg"},
    {id: 2, name:"Bluetooth Speaker", price:"899", Image:"https://m.media-amazon.com/images/I/71r5EgruzPL._AC_UL480_QL65_.jpg"},
    {id: 3, name:"Bluetooth earbuds", price: "1250", Image:"https://m.media-amazon.com/images/I/41pmNL8xcEL.AC_SX250.jpg"},
    {id: 4, name:"Smart Watch", price:"620", Image:"https://m.media-amazon.com/images/I/51ru8kBdYHL._SR480,440_.jpg"},
    {id: 5, name:"Bluetooth earbuds", price:"999", Image:"https://m.media-amazon.com/images/I/311qIs7vzfL._SR480,440_.jpg"},
    {id: 6, name:"Smart Watch", price:"944", Image:"https://m.media-amazon.com/images/I/41uSrsC+lzL._SR480,440_.jpg"},
    {id: 7, name:"Instant camera", price:"4490", Image:"https://m.media-amazon.com/images/I/512LktochES._SR480,440_.jpg"},
    {id: 8, name:"Tablet", price:"24900", Image:"https://m.media-amazon.com/images/I/317Kgxsx49L._SR480,440_.jpg"},
    {id: 9, name:"Smart Watch", price:"600", Image:"https://m.media-amazon.com/images/I/41l2p208jwL._SR480,440_.jpg"},
    {id: 10, name:"Bluetooth earbuds", price:"849", Image:"https://m.media-amazon.com/images/I/41LEIZWfa5L._SR480,440_.jpg"},
    {id: 11, name:"Dell Laptops", price:"44990", Image:"https://m.media-amazon.com/images/I/61+dcb4C8zL._AC_UL480_FMwebp_QL65_.jpg"},
    // {id: 10, name:"", price:"", Image:""},
    
]

//render products

function renderProducts(products, productList){
    const container = document.getElementById(productList);
    container.innerHTML="";
    products.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product-item");
        productDiv.innerHTML=`
            <img src="${product.Image}"/>
            <h3>${product.name}</h3>
            <h2>${product.price}</h2>
            <button onclick="addToCart(${product.id})">Add to Cart</button>`;
        container.appendChild(productDiv);
    });
}




//add to cart
function addToCart(productId){
    const product = products.find(p => p.id === productId);
    let cart = JSON.parse(localStorage.getItem("cart"))||[];
    cart.push(product);
    localStorage.setItem("cart",JSON.stringify(cart));
    alert(`${product.name} is added to cart`) 
    renderCart();  
}

// render items in cart

function renderCart(){
    const cart = JSON.parse(localStorage.getItem("cart"))||[]
    const container = document.getElementById("cartItems");
    container.innerHTML="";

    if(cart.length == 0){
        container.innerHTML="<h1>Your Cart is Empty</h1>"
    }


cart.forEach(item => {
    const cartDiv = document.createElement("div");
    cartDiv.classList.add("cart-items");
    cartDiv.innerHTML=`
    <img src="${item.Image}"/>
    <h3>"${item.name}"</h3>
    <h2>${item.price}</h2>
    <button onclick="removeFromCart(${item.id})">Remove</button>`;
    container.appendChild(cartDiv);
    
});

renderSubtotal(cart);
}
if(document.getElementById("productList"))renderProducts(products, "productList");
if(document.getElementById("cartItems"))renderCart()


// search button

function searchProducts(query){
    const filterProducts = products.filter(product =>
        product.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
    )

    renderProducts(filterProducts, "productList")
}

//add event listener to button
document.getElementById("searchButton")?.addEventListener("click",()=>{
    const query = document.getElementById("productSearch").value;
    searchProducts(query);
})

//sorting
function sortProducts(criteria){
    if(criteria === "price"){
        return products.sort((a,b) => a.price-b.price);
    }
    return products;
}

//adding event listners
document.getElementById("sortOptions")?.addEventListener("change", (event)=>{
    const sortedProducts = sortProducts(event.target.value);
    renderProducts(sortedProducts,"productList");
})

// remove from cart
function removeFromCart(productId){
    let cart = JSON.parse(localStorage.getItem("cart"))||[];
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem("cart",JSON.stringify(cart));
    alert("Product is removed successfully");
    renderCart();
}

//calculate subtotal
function renderSubtotal(cart){
    const subtotal = cart.reduce((total, item) => total + parseInt(item.price), 0);
    const subtotalContainer = document.getElementById("subtotal");
    if(cart.length > 0){
        subtotalContainer.innerHTML = `Subtotal : Rs. ${subtotal}`
    }else{
        subtotalContainer.innerHTML = `No items in the cart`
    }
}