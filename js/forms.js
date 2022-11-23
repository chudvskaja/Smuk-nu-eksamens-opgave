import e from "express";

const forms = () => {
    const form = document.querySelectorAll('form'),
    inputs = document.querySelectorAll('input');
    const message = {
        loading: 'vent et øjeblik ',
        success: 'Tak for din bestilling',
        failure: 'Noget gik galt'
    };

    const postData = async (url, data) => {
        document.querySelector('.status').innerHTML = message.loading;
        let result = await fetch(url, {
            method: "POST",
            body: data
        });
        return await result.text();
    };

    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = '';
        })
    }

    form.forEach(item => {
        item.addEventListener('submit', (e) => {
           e.preventDefault();

           let statusMessage = document.createElement('div');
           statusMessage.classList.add('status');
           item.appendChild(statusMessage);
        
        const formData = new FormData(item);

        let object = {};
        formData.forEach(function(value, key){
            object[key] = value;
        });
        let jsonForm = JSON.stringify(object);
        postData('./server.php', jsonForm)
        .then(result => {
            console.log(result);
            statusMessage.textContent = message.success;
        })
        .catch(() => statusMessage.textContent = message.failure)
        .finally(() => {
            clearInputs();
            setTimeout(() => {
                statusMessage.remove();
            }, 5000);
        })
        })
    })
}

export default forms;