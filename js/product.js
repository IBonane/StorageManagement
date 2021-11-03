function saveProduct(form)
{
    const product = {id:form.ProductId.value,name:form.ProductName.value};

    //console.log(product);

    //Prepare the post request
    fetch("http://localhost:8080/product",
    {
        method:"POST",
        headers: {"Accept":"application/json, text/plain, */*", "Content-type":"application/json"},
        body: JSON.stringify({id:product.id,name:product.name})
    })

    //take the return result from post request
    .then(result => result.json())

    //set the input fields with the return product value
    .then(data =>{
        console.log(data);
        document.getElementById("ProductId").value = data.id;
        document.querySelector('#ProductName').value = data.name;

        sohwTempMessage(data.name);
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