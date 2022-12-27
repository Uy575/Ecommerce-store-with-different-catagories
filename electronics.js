const first = document.getElementById("first");
const next = document.getElementById("next");
const previous = document.getElementById("previous");
const list = document.querySelectorAll("li");
const mainHeading = document.getElementById("mainHeading");
const mobile1 = document.getElementById("mobiel1");
const name1 = document.getElementById("name");
const form = document.querySelector("form");
const filterText = document.getElementById("filterText");
const leftnav = document.getElementById("leftnav");
const searchbar = document.getElementById("searchbar");
const searchbtn = document.getElementById("searchbtn");
const upperForm = document.getElementById("upperForm");
const cartbtn = document.getElementById("addingcart");
const cI = document.getElementById("cartItems");
const backtodata = document.getElementById("backToData");
const loader = document.getElementById("loader");
const searchlist = document.getElementById("searchlist");
const searchlistUl = document.getElementById("searchlistUl");
const downbuttons = document.getElementById("downbuttons");
const maxvalue = document.getElementById("maxvalue");
const ff = document.getElementById("filterform");
const purchase = document.getElementById("purchase");
const ty = document.getElementById("ty");
let paging = "mobile";
let mobileDataarr = [];
let locals = {};
let pagevalue = "";
let limit = 9;
let skip = 9;
let li;
let remove;
let addToCart;
let mob;
const ul = document.createElement("ul");
searchlist.hidden = true;
purchase.classList.add('hidden');
ty.hidden = true;
previous.disabled = true;
// ...updating dom and filtered repeated code ...

function creatingElements(i) {
  mob = document.createElement("div");
  mob.setAttribute("class", "mobiles");
  const ModelName = document.createElement("div");
  ModelName.textContent = `Model Name ${i.title}`;
  const price = document.createElement("div");
  price.textContent = `price is ${i.price}`;
  const showdetail = document.createElement("button");
  showdetail.textContent = "show detail";
  showdetail.classList.add('mainbtns');
  showdetail.setAttribute("onclick", `showitem(${i.id})`);
  mob.append(ModelName, price, showdetail);
  first.append(mob);
}

// ...updating dom first time ...

function updatingDom(page) {
  let currpage =
    page === "mobileDataarr" ? mobileDataarr : Object.values(locals);
  currpage.forEach((e) => {
    creatingElements(e);
  });
  next.classList.remove('hidden');
  previous.classList.remove('hidden');
}

// ...showingitem detail...

function showitem(id) {
  mobileDataarr.forEach((arr) => {
    if (id === arr.id) {
      first.textContent = "";
      const mob = document.createElement("div");
      mob.classList.add('mobiles', 'custom-scroll'); 
      const ModelName = document.createElement("div");
      ModelName.textContent = `Model Name ${arr.title}`;
      const price = document.createElement("div");
      price.textContent = `price is ${arr.price}`;
      const rating = document.createElement("div");
      rating.textContent = `rating is ${arr.rating}`;
      const stock = document.createElement("div");
      stock.textContent = `stock available ${arr.stock}`;
      const close = document.createElement("button");
      close.textContent = "close me";
      close.setAttribute("onclick", `closingitem()`);
      if (paging === "mobile") {
        mob.textContent = "";

        addToCart = document.createElement("button");
        addToCart.textContent = "Add to cart";
        addToCart.setAttribute("onclick", `adding(${arr.id})`);
        mob.append(addToCart);
      } else if (paging === "cart") {
        mob.textContent = "";
        remove = document.createElement("button");
        remove.textContent = "remove from cart";
        remove.setAttribute("onclick", `removing('${arr.id}')`);
        mob.append(remove);
      }
      mob.append(ModelName, price, rating, stock, close);
      first.append(mob);
      next.classList.add('hidden');
      previous.classList.add('hidden');
    }
  });
}

// .. closing details ... 
function closingitem() {
  first.textContent = "";
  mainHeading.textContent = '';
  const bucketIcon = document.createElement('i');
  bucketIcon.classList.add('fa-solid','fa-plug');
  bucketIcon.textContent = ' E l e c t r o n i c s';
  mainHeading.appendChild(bucketIcon);
  paging = "mobile";
  updatingDom("mobileDataarr");
  next.classList.remove('hidden');
  previous.classList.remove('hidden');
  ty.hidden = true;
  purchase.classList.add('hidden');
}

// ...filtered ...

function filtered(a) {
  a.preventDefault();
  let filteredResult;
  first.textContent = " ";
  const ftValue = Number(filterText.value);
  const mvalue = Number(maxvalue.value);
  mobileDataarr.forEach((e) => {
    if (e.price >= ftValue && e.price <= mvalue) {
      creatingElements(e);
      filteredResult = false;
    }
  });
  if (!ftValue) {
    alert("please Enter price");
  }
  if (ftValue > mvalue && ftValue) {
    alert(
      "we dont have any mobile in this price or check you entered min max value correctly"
    );
    mobileData();
  }
  filterText.value = "";
  maxvalue.value = "";
  next.classList.add('hidden');
 previous.classList.add('hidden');
}

// .....searchbar ......

function searching(e) {
  e.preventDefault();
  let searchResult;
  const searchValue = searchbar.value;
  mobileDataarr.forEach((e) => {
    if (searchValue === e.title) {
      first.textContent = "";
      creatingElements(e);
      searchResult = false;
    }
  });
  if (!searchValue) {
    alert("please enter model name to find");
  }
  if (searchResult !== false && searchValue) {
    alert("no match");
  }
  searchlist.hidden = true;
  ul.textContent = "";
  searchbar.value = "";
  next.classList.add('hidden');
  previous.classList.add('hidden');
}

// ... adding to cart ...

function adding(id) {
  mobileDataarr.forEach((e) => {
    if (id === e.id && !locals[id]) {
      locals[id] = e;
    }
  });
  localStorage.setItem("added", JSON.stringify(locals));
  updatingCartItems();
}

// ...cart items ...

function cartItems(page) {
  paging = "cart";
  mainHeading.textContent = '';
  const bucketIcon = document.createElement('i');
  bucketIcon.classList.add('fa-solid','fa-bucket');
  bucketIcon.textContent = ' B U C K E T';
  mainHeading.appendChild(bucketIcon);
  if (localStorage.getItem("added")) {
    locals = JSON.parse(localStorage.getItem("added") || "[]");
    first.textContent = "";
  } else {
    alert("no items in cart");
    cartbtn.disabled = false;
  }
  updatingDom(page);
  purchase.classList.remove('hidden');
  next.classList.add('hidden');
  previous.classList.add('hidden');
}

// ... for purchasing ... 
function thankyou() {
  if(first.textContent || first.textContent.includes('noItem')){
    ty.hidden = false;
  setTimeout(() => {
    ty.hidden = true;
  }, 2000);
    // alert("thank you for shopping");
  }
  else{
    first.textContent = '';
    const noItem = document.createElement('div');
    noItem.textContent = 'No item! Please add item in cart first to proceed :(';
    noItem.classList.add('noItemInCart');
    first.appendChild(noItem);
    
  }

}

// ... removing from cart ... 

function removing(id) {
  first.textContent = "";
  mob.textContent = "";
  if (locals[id]) {
    delete locals[id];
  }
  localStorage.setItem("added", JSON.stringify(locals));
  creatingElements("locals");
  updatingCartItems();
  loader.hidden = false;
  cartItems();
  loader.hidden = true;
}


// ... cart items value ...


function updatingCartItems() {
  if (localStorage.getItem("added")) {
    locals = JSON.parse(localStorage.getItem("added"));
   cI.textContent = Object.values(locals).length;
    // cI.textContent = changingobjtoarr.length;
  }

  
}


// ... fetching data ...

async function mobileData() {
  const apiUrl = `https://dummyjson.com/products?&limit=${limit}`;
  const responce = await fetch(apiUrl);
  const data = await responce.json();
  mobileDataarr = data.products;
  updatingDom("mobileDataarr");
  purchase.classList.add('hidden');
  next.classList.remove('hidden');
  previous.classList.remove('hidden'); 
  ty.hidden = true;
  loader.hidden = true;
}

// .. setting locals array for dom ...

function cartlist() {
  pagevalue = "locals";
  paging = "cart";
  cartItems(pagevalue);
  loader.hidden = false;
  setTimeout(() => {
    loader.hidden = true;
  }, 200);
}

// .. setting mobile data array for dom ...

function mobilelist() {
  first.textContent = "";
  mainHeading.textContent = '';
  const bucketIcon = document.createElement('i');
  bucketIcon.classList.add('fa-solid','fa-plug');
  bucketIcon.textContent = ' E l e c t r o n i c s';
  mainHeading.appendChild(bucketIcon);
  paging = "mobile";
  mobileData();
  loader.hidden = false;
}

// ... pagination ...

async function nextPage() {
  first.textContent = "";
  next.classList.add('hidden');
  previous.classList.add('hidden');
  previous.disabled = false;
  loader.hidden = false;
  const apiUrl = `https://dummyjson.com/products?&skip=${skip}&limit=${limit}`;
  const responce = await fetch(apiUrl);
  const data = await responce.json();
  mobileDataarr = data.products;
  updatingDom("mobileDataarr");
  skip += 9;
  loader.hidden = true;
  ul.textContent = "";
}

//  ... back to first page ...
function previousPage() {
  first.textContent = "";
  next.classList.add('hidden');
  previous.classList.add('hidden');
  previous.disabled = true;
  loader.hidden = false;
  ul.textContent = "";
  mobileData();
}

// ... showing search suggestion ...

function showingSearchList() {
  ul.textContent = "";
  mobileDataarr.forEach((e) => {
    li = document.createElement("li");
    li.textContent = `${e.title}`;
    li.setAttribute("onclick", `clickingLi('${e.title}')`);
    let liText = li.textContent.toLowerCase();
    let lowersearch = searchbar.value.toLowerCase();
    if (liText.indexOf(lowersearch) > -1) {
      li.style.display = "";
    } else {
      li.style.display = "none";
    }
    ul.appendChild(li);
    if (searchbar.value == "") {
      li.style.display = "none";
    }
  });
  searchlist.appendChild(ul);
  console.log(searchlist.children);
  searchlist.hidden = false;
}

function clickingLi(t) {
  searchbar.value = t;
  ul.textContent = "";
}

// ... event listeners ... 

previous.addEventListener("click", previousPage);
next.addEventListener("click", nextPage);
cartbtn.addEventListener("click", cartlist);
upperForm.addEventListener("click", searching);
form.addEventListener("submit", filtered);
backtodata.addEventListener("click", mobilelist);
searchbar.addEventListener("keyup", showingSearchList);

// ... functions call on start up ... 
mobileData();
updatingCartItems();