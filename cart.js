let k = localStorage.length;
let num = localStorage.getItem("num");
let ele = document.querySelector(".product-cart");
let all = document.querySelector(".cart-items");
let allProducts = document.querySelectorAll(".product-cart");
let btnMinus = document.querySelectorAll(".product-cart-btn-minus");
let btnPlus = document.querySelectorAll(".product-cart-btn-plus");
let quantity = document.querySelectorAll(".quantity");
let cart_no = document.querySelector(".num");
let cart_logo = document.querySelector(".notif");
let total = document.querySelector(".total");
let total_price = 0;

if(Number(num) > 0){
    let ele = document.querySelector(".cart");
    ele.style.display = "none";
    k = localStorage.length;
    makeCart(k);
}else{
    let ele = document.querySelector(".cart-items");
    ele.style.display = "none";
}


function makeCart(k){
    for(let i = 1; i < k; i++){
        // console.log(i);
        // console.log(localStorage.getItem(i));
        if (Number(breakThem(localStorage.getItem(i.toString()))[0]) > 0){
            let val = breakThem(localStorage.getItem(i.toString()));
            let pd_id = i.toString();
            let clone = ele.cloneNode(true);
            clone.querySelector(".quantity").innerText = val[0];
            clone.querySelector(".product-cart-name").innerText = val[1];
            clone.querySelector(".price").innerText = Number(val[2]) * Number(val[0]);
            clone.querySelector(".product-cart-img").src = val[3];
            // console.log(clone.querySelector(".product-cart-img").src );
            total_price += Number(val[2]) * Number(val[0]);
            clone.id = `${pd_id}`;
            clone.classList.remove("hidden");
            all.appendChild(clone);
            // console.log(pd_id);
            let p = clone.querySelector(".product-cart-btn-plus");
            let m = clone.querySelector(".product-cart-btn-minus");
            let q = clone.querySelector(".quantity");
            addEvents(p, m, q, i.toString(), clone);
        }
    }
    let topbanner = localStorage.getItem("num");
    localStorage.removeItem("num");
    localStorage.setItem("num",topbanner);
    cart_no.innerText = Number(localStorage.getItem("num"));
    total.innerText = total_price;
}

function breakThem(str) {
    let val = str.split(",");
    return val;
}



// ----------------------

// [no_of_item, name, price, link]


function addEvents(p, m, q, i, clone) {
    p.addEventListener("click", ()=>{
        let val = breakThem(localStorage.getItem(i));
        q.innerText = Number(q.innerText)+1;
        let msg = [(Number(val[0])+1).toString(), val[1], val[2], val[3]];
        let price_in_add = (Number(val[0])+1) * Number(val[2]);
        total_price += Number(val[2]);
        total.innerText = total_price;
        clone.querySelector(".price").innerText = Math.floor(price_in_add);
        localStorage.removeItem(i);
        localStorage.setItem(i,msg);
        cart_no.innerText = Number(localStorage.getItem("num")) + 1;
        localStorage.removeItem("num");
        localStorage.setItem("num",cart_no.innerText);
    })
    m.addEventListener("click", ()=>{
        if(Number(q.innerText) > 1){
            let val = breakThem(localStorage.getItem(i));
            q.innerText = Number(q.innerText)-1;
            let msg = [Number(val[0])-1, val[1], val[2], val[3]];
            let price_in_add = (Number(val[0])-1) * Number(val[2]);
            clone.querySelector(".price").innerText = Math.floor(price_in_add);
            total_price -= Number(val[2]);
            total.innerText = total_price;
            localStorage.removeItem(i);
            localStorage.setItem(i,msg);
            cart_no.innerText = Number(localStorage.getItem("num")) - 1;
            localStorage.removeItem("num");
            localStorage.setItem("num",cart_no.innerText);
        }else if(Number(q.innerText) === 1){
            let val = breakThem(localStorage.getItem(i));
            q.innerText = Number(q.innerText)-1;
            let msg = [(Number(val[0])-1).toString(), val[1], val[2], val[3]];
            localStorage.removeItem(i);
            localStorage.setItem(i,msg);
            total_price -= Number(val[2]);
            total.innerText = total_price;
            clone.classList.add("hidden");
            cart_no.innerText = Number(localStorage.getItem("num")) - 1;
            localStorage.removeItem("num");
            localStorage.setItem("num",cart_no.innerText);
            if(Number(localStorage.getItem("num")) === 0){
                let ele = document.querySelector(".cart");
                ele.style.display = "block";
                total.innerText = 0;
            }
        }
    })
}


function getProductId(p){
    let id = p.id;
    return id;
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
    console.log(str);
    str = assets/ + str[str.length-1];
    return str;
}