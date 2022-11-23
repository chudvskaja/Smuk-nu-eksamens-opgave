function fetchData() {
fetch("https://smuknu.webmcdm.dk/products")
.then(response => {
    console.log(response)
    return response.json();
})
.then(data => {
    for (el of data) {
        if(el.discountInPercent !== ""){
            console.log(el)
        }
    }
    
})
.catch(error => {
    console.log(error)
})
}

fetchData();