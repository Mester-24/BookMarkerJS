var SiteNameInput = document.getElementById("SiteNameInput");
var SiteUrlInput = document.getElementById("SiteUrlInput");
var submitBtn = document.getElementById("submitBtn");
var updateMode = false;
var mainIndex;
var productArr = JSON.parse(localStorage.getItem("products")) ?? [];

displayProducts();

submitBtn.addEventListener("click", function() {
    addUpdateProduct();
});

function addUpdateProduct() {
    if (!validateInputs(SiteNameInput.value, SiteUrlInput.value)) {
        showInvalidUrlModal();
        return;
    }

    if (!updateMode) {
        addProducts(getProducts());
    } else {
        updateProducts(getProducts());
    }

    displayProducts();
    onDataChange();
    clearForm();
}

function getProducts() {
    var Product = {
        name: SiteNameInput.value,
        SiteUrl: SiteUrlInput.value,
    };
    return Product;
}

function addProducts(Product) {
    productArr.push(Product);
}

function updateProducts(Product) {
    productArr[mainIndex] = Product;
    submitBtn.innerHTML = "Submit";
    updateMode = false;
}

function displayProducts() {
    var cartoona = "";
    for (var i = 0; i < productArr.length; i++) {
        cartoona += `
            <tr>
                <td>${i + 1}</td>
                <td>${productArr[i].name}</td>
                <td><a href="${productArr[i].SiteUrl}" target="_blank" class="btn btn-success"><i class="fa-solid fa-eye pe-2"></i> Visit</a></td>
                <td><button onclick="deleteProducts(${i})" type="button" class="btn btn-danger"><i class="fa-solid fa-trash-can pe-2"></i> Delete</button></td>
            </tr>
        `;
    }

    document.getElementById("tableBody").innerHTML = cartoona;
}

function clearForm() {
    SiteNameInput.value = "";
    SiteUrlInput.value = "";
}

function onDataChange() {
    localStorage.setItem("products", JSON.stringify(productArr));
}

function deleteProducts(index) {
    productArr.splice(index, 1);
    onDataChange();
    displayProducts();
}

function patchValues(index) {
    mainIndex = index;
    updateMode = true;
    SiteNameInput.value = productArr[index].name;
    SiteUrlInput.value = productArr[index].SiteUrl;
    submitBtn.innerHTML = "Update";
}

function validateInputs(name, url) {
    if (name === '' || url === '') {
        return false;
    }

    const urlPattern = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])?$/;
    return urlPattern.test(url);
}

function showInvalidUrlModal() {
    var invalidUrlModal = new bootstrap.Modal(document.getElementById('invalidUrlModal'));
    invalidUrlModal.show();
}
