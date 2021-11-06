const urlString = window.location.search;
const urlParams = new URLSearchParams(urlString);


let prodId = "";
let prodName = "";
let transactions = [];

showExistingProduct();

function saveProduct()
{
    prodId = document.querySelector("#ProductId").value;

    prodName = document.querySelector("#ProductName").value;
    //console.log(product);

    //Prepare the post request
    fetch("http://localhost:8080/product",
    {
        method:"POST",
        headers: {"Accept":"application/json, text/plain, */*", "Content-type":"application/json"},
        body: JSON.stringify({id:prodId,name:prodName, transactionList:transactions})
    })

    //take the return result from post request
    .then(result => result.json())

    //set the input fields with the return product value
    .then(data =>{
        console.log(data);
        document.getElementById("ProductId").value = data.id;
        document.querySelector('#ProductName').value = data.name;

        transactions = data.transactionList;

        sohwTempMessage(data.name);
        showTransactionList();
    })

}

function sohwTempMessage(message){
    document.querySelector('#SuccessMessage').innerHTML=`
    <p class="successMessage">Product ${message} has been saved successfully</p>`;

    //hide success message after 3 seconds
    setTimeout(function(){
        document.querySelector('#SuccessMessage').innerHTML="";
    }, 3000);
}

function showExistingProduct(){

    if(urlParams.get('id')!=null){
        fetch('http://localhost:8080/product?id='+urlParams.get('id'))
        .then(response => response.json())
        .then(data => {
            document.querySelector('#ProductId').value = data.id;
            document.querySelector("#ProductName").value = data.name;
            transactions = data.transactionList;
            showTransactionList();
        })
    }
}

function saveTransaction(){

    prodId = document.querySelector("#ProductId").value;

    const Qty = document.querySelector("#transactionQty").value;

    if(prodId !='' && Qty !=''){    
        transactions.push({amount:parseInt(Qty)});
        closeModal();
        
        document.querySelector('#transactionQty').value = '';
        saveProduct();
    }

    else{
        alert('Unable to add transaction check amount !');
    }
}

let modalBtn = document.querySelector('.modal-btn');
let modalBg = document.querySelector('.modal-bg');
modalBtn.addEventListener('click', function(){
    modalBg.classList.add('bg-active')
});

function closeModal(){
    modalBg.classList.remove('bg-active');
}

let modalClose = document.querySelector('.modal-close')
modalClose.addEventListener('click', function(){
    closeModal();
});

function setTableHolder(){
    document.getElementById('TableHolder').innerHTML=`
    <table class="content-table">
        <thead>
            <tr>
                <th>date</th>
                <th>amount</th>
            </tr>

        </thead>
        <tbody id="transactionList">
            
        </tbody>
    </table>
    `;
}

function showTransactionList(){

    setTableHolder();
    let transactionTable = '';
    transactions.reverse();
    transactions.forEach(element =>{
        transactionTable +=`
        <tr>
            <td>${element.transactionDateTime}</td>
            <td>${element.amount}</td>
        </tr>
        `;
        document.querySelector("#transactionList").innerHTML = transactionTable;
    });
}