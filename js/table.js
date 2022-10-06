
const description = document.querySelector("#description");
const subtotal = document.querySelector("#subtotal");
const totalSell = document.querySelector("#total-sell");
const totalBuy = document.querySelector("#total-buy");

const table = document.querySelector("table");

document.querySelector("#submit-btn").addEventListener("click", () => {

    const transactionType = document.querySelectorAll("input[name=\"transaction-type\"]:checked");
    const ivaType = document.querySelectorAll("input[name=\"iva-type\"]:checked");

    let safe = true;
    // a &= b is equivalent to a = a & b 
    safe &= valid(description, [
        (a)=>{return a.value.length != 0},
        (a)=>{return typeof a.value == "string"}, 
    ]);
    safe &= valid(subtotal, [
        (a)=>{return !isNaN(parseInt(a.value))}
    ]);
    
    if (transactionType.length == 0){
        errorNodeListMsg(document.querySelectorAll("input[name=\"transaction-type\"]"));
        safe = false;
    }
    if (ivaType.length == 0){
        errorNodeListMsg(document.querySelectorAll("input[name=\"iva-type\"]"));
        safe = false;
    }
    if (!safe) return;


    const numSubtotal = parseInt(subtotal.value);
    const total = numSubtotal * (1 + ivaType[0].value/100);

    table.insertAdjacentHTML("beforeend", 
    `<tr class="text-center">
        <th scope="row" class="text-wrap">
            ${description.value}
        </th>
        <td>${transactionType[0].value}</td>
        <td>${numSubtotal}</td>
        <td>${ivaType[0].value}</td>
        <td>${total.toFixed(2)}</td>

    </tr>`);
    
    if (transactionType[0].value == "Compra")
        totalBuy.innerText = (parseInt(totalBuy.innerText) + total).toFixed(2);
    else
        totalSell.innerText = (parseInt(totalSell.innerText) + total).toFixed(2);

    description.value = "";
});

function errorMsg(el) {
    el.style.border = "2px solid red";
    setTimeout( () => {
        el.style.border = "";
    },3000);
}

function errorNodeListMsg(nodeList) {
    for (const el of nodeList)
        errorMsg(el);
}

function valid(inputNode, validations) {
    for (const val of validations){
        if (!val(inputNode)) {
            errorMsg(inputNode);
            return false;
        }
    }
    return true;
}