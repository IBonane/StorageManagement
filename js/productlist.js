showProducts();

function showProducts(){

    fetch("http://localhost:8080/productList")

    .then(response => response.json())

    .then(data =>{
        let tableInfo = "";
        data.forEach(element => tableInfo+=`
            <tr>
                <td>${element.id}</td>
                <td>${element.name}</td>
                <td>${element.amount}</td>
                <td><button>view</button></td>
            </tr>
        `)

        document.querySelector("#listTable").innerHTML = tableInfo;
    });
    
}