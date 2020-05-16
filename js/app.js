//prevent default
/*
document.getElementById('form').addEventListener("submit", function(event){
    event.preventDefault();
});
*/
/*
let form = document.getElementById('form');
form.addEventListener ('submit', (event) => {
    event.preventDefault();
    let recipeName = document.forms["calculator"]["originalEnter"];
    let message = document.querySelector('.required');
    let alertMessage = '';
    if (recipeName.value === '' || recipeName.value == null) {
        alertMessage = 'Recipe name is required.';
        message.innerHTML = alertMessage;
        return false;
    }
});*/



let form = document.getElementById('form');
form.addEventListener ('submit', (event) => {
    event.preventDefault();
    let recipeName = document.getElementById('recipe');
    let servings = document.getElementById('originalServings');
    let needServings = document.getElementById('needServings');
    let message = document.createElement('p');
    message.className= 'error';

    if (recipeName.value == "" || recipeName.value.trim()== "") {
        message.innerText = '*Recipe name is required.';
        document.querySelector('.input-container__input-name').append(message);
        return false;
    }


    if (servings.value == "" || servings.value.trim()== "") {
        message.innerText = '*Original recipe servings is required.';
        document.querySelector('.input-container__input-original').append(message);
        return false;
    }

    if (needServings.value == "" || needServings.value.trim()== "") {
        message.innerText = '*Recipe servings is required.';
        document.querySelector('.input-container__input-need').append(message);
        return false;
    }
    return true;
});

