const form = document.querySelector('form');
const successDiv = document.querySelector('.success');

const popUpMessage = {
        success: "TAK!",
        failure: "User is allready exist",
};


form.addEventListener('submit', function(event) {
    event.preventDefault();

    let statusMessage = document.createElement('div');
    statusMessage.classList.add('status');
    successDiv.classList.add('shown');
    successDiv.appendChild(statusMessage);
    

    const nameSub = document.getElementById('fname').value;
    console.log(nameSub);

    const emailSub = document.getElementById('lname').value;
    console.log(emailSub);

    const messageSub = document.getElementById('comment').value;
    console.log(messageSub);

     const newSubscribe = {
        "name": nameSub,
        "email": emailSub,
        "message": messageSub,
    }
 

    fetch ("https://smuknu.webmcdm.dk/subscribe", {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify(newSubscribe),
        })
        .then(  (response) => {
            if (!response.ok) {
                throw Error(statusMessage.innerHTML = 
        `<p class="error-text">Du har enten testet ugyldigt navn eller en e-mail, eller brugeren allerede er registreret</p>
        <a href="./membership.html" class="btn-success">Prøv igen</button>`);
            }
             return response;
        }).then (response => response.json())
        .then(statusMessage.innerHTML = 
            `<h2 class="success-title">Tak!</h2> 
            <p class="accent-text">${newSubscribe.name}</p>
            <p class="success-text">Vi er enormt glade for at få dig som medlem.</p>
            <img class="success-image" src="../assets/products/product1.jpg"></img>
            <p class="success-text">Kig I din inbox vi har sendt en lille velkomst gave.</p>
            <a href="./index.html" class="btn-success">Til Forsiden</button>
            `)
        .then(data => console.log(data))
        .then(form.reset())
        .catch(function(error) {
            console.log(error);
        });
    
})

