// [no_of_item, name, price, link]
let allProducts = document.querySelectorAll(".product");
let btnMinus = document.querySelectorAll(".product-btn-minus");
let btnPlus = document.querySelectorAll(".product-btn-plus");
let quantity = document.querySelectorAll(".quantity");
let cart_no = document.querySelector(".num");
let cart_logo = document.querySelector(".notif");

// console.log(localStorage.getItem("31"));
// addToLocal();
// localStorage.clear();
addFromLocal();
addEvents();
// sendToCart();


function addEvents() {
    for(let i = 0; i < btnMinus.length; i++){
        btnMinus[i].addEventListener("click",()=>{
            if (Number(quantity[i].innerText) > 0){
                let id_product = getProductId(allProducts[i]);
                // quantity[i].innerText = Number(localStorage.getItem(id_product)[0]) - 1;
                quantity[i].innerText = Number(get_item_no(id_product)) - 1;
                localStorage.removeItem(id_product);
                let msg = [quantity[i].innerText, allProducts[i].querySelector(".product-name").innerText, allProducts[i].querySelector(".price").innerText, dril(allProducts[i].querySelector(".product-img").src)];
                localStorage.setItem(id_product, msg);
                cart_no.innerText = Number(localStorage.getItem("num")) - 1;
                localStorage.removeItem("num");
                localStorage.setItem("num",cart_no.innerText);
            }
        })
        btnPlus[i].addEventListener("click", ()=>{
            quantity[i].innerText = Number(quantity[i].innerText) + 1;
            let id_product_add = getProductId(allProducts[i]);
            // localStorage.removeItem(id_product_add);
            remove_item(id_product_add);
            let msg = [quantity[i].innerText, allProducts[i].querySelector(".product-name").innerText, allProducts[i].querySelector(".price").innerText, dril(allProducts[i].querySelector(".product-img").src)];
            localStorage.setItem(id_product_add,msg);
            cart_no.innerText = Number(localStorage.getItem("num")) + 1;
            localStorage.removeItem("num");
            localStorage.setItem("num",cart_no.innerText);
        })
    }
}


function addFromLocal(){
    for(let i = 0; i < allProducts.length; i++){
        if(localStorage.getItem(allProducts[i].id) === null){
            let msg = [quantity[i].innerText, allProducts[i].querySelector(".product-name").innerText, allProducts[i].querySelector(".price").innerText, dril(allProducts[i].querySelector(".product-img").src)];
            localStorage.setItem(allProducts[i].id, msg);
            let [noOfItem, nameOfItem, priceOfItem, sorce] = breakThem(localStorage.getItem(allProducts[i].id));
            continue;
        }
        quantity[i].innerText = breakThem(localStorage.getItem(allProducts[i].id))[0];
        cart_no.innerText = Number(breakThem(localStorage.getItem(allProducts[i].id))[0]) + Number(cart_no.innerText);
    }
    localStorage.setItem("num",cart_no.innerText);
}


function getProductId(p){
    let id = p.id;
    return id;
}

function breakThem(str) {
    let val = str.split(",");
    return val;
}

function get_item_no(key){
    let ans = localStorage.getItem(key);
    ans = breakThem(ans)[0];
    return ans;
}

function remove_item(key){
    localStorage.removeItem(key);
}


function dril(str) {
    str = str.split("/");
    str = "assets"+ "/" + str[str.length-1]
    return str;
}