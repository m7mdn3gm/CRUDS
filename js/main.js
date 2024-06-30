var titleInput = document.getElementById('title');
var priceInput = document.getElementById('price');
var taxesInput = document.getElementById('taxes');
var adsInput = document.getElementById('ads');
var discountInput = document.getElementById('discount');
var totalInput = document.getElementById('total');
var countInput = document.getElementById('count');
var categoryInput = document.getElementById('category');
var searchInput = document.getElementById('search');
var alertTitle = document.getElementById('alertTitle');
var alertCategory = document.getElementById('alertCategory');

var mood = "create";
var tmp;

var productList;
if ( localStorage.getItem("productss") != null ) {
    productList = JSON.parse(localStorage.getItem("productss"));
    displayProduct() 
}else {
    productList = [];
}

// ===== Total Product =====
function totalPoduct() {
    if (priceInput.value != '') {
        var result = (Number(priceInput.value)+Number(taxesInput.value)+Number(adsInput.value)) - (Number(discountInput.value));
        totalInput.innerHTML = result;
        totalInput.style.background = "#198754";
    }else {
        totalInput.innerHTML = '';
        totalInput.style.background = "#dc3545";
    }
}

// ===== Create Product =====
function createProduct() {
    if (validTitle() && validPrice() && validTaxes() && validAds() && validDiscount() && validcategory() ) {
        var product = {
            title: titleInput.value,
            price: priceInput.value,
            taxes: taxesInput.value,
            ads: adsInput.value,
            discount: discountInput.value,
            total: totalInput.innerHTML,
            category: categoryInput.value,
        }
        if (mood === "create") {
            // ===== Count Product =====
            if (countInput.value > 0) {
                for (var i = 0 ; i < countInput.value ; i++) {
                    productList.push(product);
                }
            }else {
                productList.push(product);
            }
        }else {
            document.getElementById('create').innerHTML = 'Create';
            productList[tmp] = product
            mood = "Create";
            countInput.style.display = "block";
        }
        localStorage.setItem("productss" , JSON.stringify(productList));
        displayProduct();   
        clearProduct();
    }
}

// ===== Display Product =====
function displayProduct() {
    var temp = '';
    for (var i = 0 ; i < productList.length ; i++) {
        temp += `   <tr>
                        <td>`+(i+1)+`</td>
                        <td>`+productList[i].title+`</td>
                        <td>`+productList[i].price+`</td>
                        <td>`+productList[i].taxes+`</td>
                        <td>`+productList[i].ads+`</td>
                        <td>`+productList[i].discount+`</td>
                        <td>`+productList[i].total+`</td>
                        <td>`+productList[i].category+`</td>
                        <td><button onclick = "updateProduct(${i})" class="btn btn-outline-warning">Update</button></td>
                        <td><button onclick = "deleteProduct(`+i+`)" class="btn btn-outline-danger">Delete</button></td>
                    </tr>`
    }
    document.getElementById('myData').innerHTML = temp;

    // ===== Add Key Delete All =====
    if ( productList.length > 0) {
        document.getElementById("deletall").innerHTML = `
        <button onclick = "deleteAll()" class="btn btn-success w-50 d-block mx-auto">Delete All ( <span>`+productList.length+`</span> )</button>`
    }else {
        document.getElementById("deletall").innerHTML = "";
    }
}

// ===== Clear Product =====
function clearProduct() {
    titleInput.value = '';
    priceInput.value = '';
    taxesInput.value = '';
    adsInput.value = '';
    discountInput.value = '';
    totalInput.innerHTML = '';
    countInput.value = '';
    categoryInput.value = '';

    titleInput.classList.remove('is-valid');
    priceInput.classList.remove('is-valid');
    taxesInput.classList.remove('is-valid');
    adsInput.classList.remove('is-valid');
    discountInput.classList.remove('is-valid');
    countInput.classList.remove('is-valid');
    categoryInput.classList.remove('is-valid');
}

// ===== Delete Product =====
function deleteProduct(index) {
    productList.splice(index,1);
    localStorage.setItem("productss" , JSON.stringify(productList));
    displayProduct();
}

// ===== Delete All Product =====
function deleteAll() {
    productList.splice(0);
    localStorage.clear();
    displayProduct();
}
// ===== Update Product =====
function updateProduct(i) {
    titleInput.value = productList[i].title;
    priceInput.value = productList[i].price;
    taxesInput.value = productList[i].taxes;
    adsInput.value = productList[i].ads;
    discountInput.value = productList[i].discount;
    totalPoduct();
    countInput.style.display = "none";
    categoryInput.value = productList[i].category;

    document.getElementById('create').innerHTML = 'Update';

    mood = "update";
    tmp = i;
    
    scroll ({
        top: 0,
        behavior: 'smooth',
    })
}

// ===== Search Product =====
var searchMood = "title";

function getSearchMood(id) {
    if (id == 'searchTitle'){
        searchMood = "title";
        searchInput.placeholder = 'Search By Title';
    }else {
        searchMood = "category";
        searchInput.placeholder = 'Search By Category';
    }
    searchInput.focus();
}

function searchProduct() {
    var temp = '';
    if (searchMood == "title"){
        var searchVal = searchInput.value.toLowerCase();
        for (var i = 0 ; i < productList.length ; i++) {
            if (productList[i].title.toLowerCase().includes(searchVal) == true) {
                temp += `   <tr>
                <td>`+(i+1)+`</td>
                <td>`+productList[i].title.toLowerCase().replace(searchVal , '<span class="bg-info text-light">'+searchVal+'</span>')+`</td>
                <td>`+productList[i].price+`</td>
                <td>`+productList[i].taxes+`</td>
                <td>`+productList[i].ads+`</td>
                <td>`+productList[i].discount+`</td>
                <td>`+productList[i].total+`</td>
                <td>`+productList[i].category+`</td>
                <td><button onclick = "updateProduct(${i})" class="btn btn-outline-warning">Update</button></td>
                <td><button onclick = "deleteProduct(${i})" class="btn btn-outline-danger">Delete</button></td>
            </tr>`
            }
        }
    }else {
        var searchVal = searchInput.value.toLowerCase();
        for (var i = 0 ; i < productList.length ; i++) {
            if (productList[i].category.toLowerCase().includes(searchVal) == true) {
                temp += `   <tr>
                <td>`+(i+1)+`</td>
                <td>`+productList[i].title+`</td>
                <td>`+productList[i].price+`</td>
                <td>`+productList[i].taxes+`</td>
                <td>`+productList[i].ads+`</td>
                <td>`+productList[i].discount+`</td>
                <td>`+productList[i].total+`</td>
                <td>`+productList[i].category.toLowerCase().replace(searchVal , '<span class="bg-info text-light">'+searchVal+'</span>')+`</td>
                <td><button onclick = "updateProduct(${i})" class="btn btn-outline-warning">Update</button></td>
                <td><button onclick = "deleteProduct(${i})" class="btn btn-outline-danger">Delete</button></td>
            </tr>`
            }
        }
    }
    document.getElementById('myData').innerHTML = temp;
}


// ===== Valid Product =====
titleInput.addEventListener("change" , validTitle );
function validTitle(){
    var regextitle = /^[a-zA-Z]+[0-9]{0,6}?$/
    if(regextitle.test(titleInput.value)){
        titleInput.classList.add('is-valid');
        titleInput.classList.remove('is-invalid');
        alertTitle.classList.add('d-none');
        return true;
    }else {
        titleInput.classList.add('is-invalid');
        titleInput.classList.remove('is-valid');
        alertTitle.classList.remove('d-none');
        return false;
    }
}

priceInput.addEventListener("change" , validPrice);
function validPrice(){
    var regexprice = /^([0-9]{1,6})$/;
    if(regexprice.test(priceInput.value)){
        priceInput.classList.add('is-valid');
        priceInput.classList.remove('is-invalid');
        return true;
    }else {
        priceInput.classList.add('is-invalid');
        priceInput.classList.remove('is-valid');
        return false;
    }
}

taxesInput.addEventListener("change" , validTaxes);
function validTaxes(){
    var regextaxes = /^([0-9]{1,6})$/;
    if(regextaxes.test(taxesInput.value)){
        taxesInput.classList.add('is-valid');
        taxesInput.classList.remove('is-invalid');
        return true;
    }else {
        taxesInput.classList.add('is-invalid');
        taxesInput.classList.remove('is-valid');
        return false;
    }
}

adsInput.addEventListener("change" , validAds);
function validAds(){
    var regexads = /^([0-9]{1,6})$/;
    if(regexads.test(adsInput.value)){
        adsInput.classList.add('is-valid');
        adsInput.classList.remove('is-invalid');
        return true;
    }else {
        adsInput.classList.add('is-invalid');
        adsInput.classList.remove('is-valid');
        return false;
    }
}

discountInput.addEventListener("change" , validDiscount);
function validDiscount(){
    var regexdiscount = /^([0-9]{1,6})$/;
    if(regexdiscount.test(discountInput.value)){
        discountInput.classList.add('is-valid');
        discountInput.classList.remove('is-invalid');
        return true;
    }else {
        discountInput.classList.add('is-invalid');
        discountInput.classList.remove('is-valid');
        return false;
    }
}

countInput.addEventListener("change" , validcount);
function validcount(){
    var regexcount = /^([0-9]{1,6})$/;
    if(regexcount.test(countInput.value)){
        countInput.classList.add('is-valid');
        countInput.classList.remove('is-invalid');
        return true;
    }else {
        countInput.classList.add('is-invalid');
        countInput.classList.remove('is-valid');
        return false;
    }
}

categoryInput.addEventListener("change" , validcategory );
function validcategory(){
    var regextitle = /^[a-zA-Z]+[0-9]{0,6}?$/
    if(regextitle.test(categoryInput.value)){
        categoryInput.classList.add('is-valid');
        categoryInput.classList.remove('is-invalid');
        alertCategory.classList.add('d-none');
        return true;
    }else {
        categoryInput.classList.add('is-invalid');
        categoryInput.classList.remove('is-valid');
        alertCategory.classList.remove('d-none');
        return false;
    }
}
