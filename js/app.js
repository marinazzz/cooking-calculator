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

const form = document.getElementById('form');
const recipeName = document.getElementById('recipeName');
const servings = document.getElementById('originalServings');
const needsToServe = document.getElementById('needsToServe');

recipeName.addEventListener('input', () => {
  if (recipeName.classList.contains('invalid') && recipeName.value !== '') {
    recipeName.classList.remove('invalid');
  }
});

form.addEventListener('submit', (event) => {
  event.preventDefault();

  if (recipeName.value === '' || recipeName.value === null) {
    recipeName.classList.add('invalid');
  } else {
    recipeName.classList.remove('invalid');
  }

  if (Number(servings.value) <= 0 || servings.value === null) {
    servings.classList.add('invalid');
  } else {
    servings.classList.remove('invalid');
  }

  if (Number(needsToServe.value) <= 0 || needsToServe.value === null) {
    needsToServe.classList.add('invalid');
  } else {
    needsToServe.classList.remove('invalid');
  }
  // let message = document.createElement('p');
  // message.className= 'error';

  // if (recipeName.value == "" || recipeName.value.trim()== "") {
  //     message.innerText = '*Recipe name is required.';
  //     document.querySelector('.input-container__input-name').append(message);
  //     return false;
  // }


  // if (servings.value == "" || servings.value.trim()== "") {
  //     message.innerText = '*Original recipe servings is required.';
  //     document.querySelector('.input-container__input-original').append(message);
  //     return false;
  // }

  // if (needServings.value == "" || needServings.value.trim()== "") {
  //     message.innerText = '*Recipe servings is required.';
  //     document.querySelector('.input-container__input-need').append(message);
  //     return false;
  // }
  // return true;
});

