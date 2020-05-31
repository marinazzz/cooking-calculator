const form = document.getElementById('form');
const recipeName = document.querySelector('input[name="recipeName"]');
const servings = document.querySelector('input[name="originalServings"]');
const needsToServe = document.querySelector('input[name="needsToServe"]');
const ingredients = document.getElementsByClassName('ingredients-items__inputs');


//removes class after field is filled out
recipeName.addEventListener('input', () => {
  if (recipeName.classList.contains('invalid') && recipeName.value !== '') {
    recipeName.classList.remove('invalid');
  }
});

servings.addEventListener('input', () => {
  if (servings.classList.contains('invalid') && servings.value !== '') {
    servings.classList.remove('invalid');
  }
});

needsToServe.addEventListener('input', () => {
  if (needsToServe.classList.contains('invalid') && needsToServe.value !== '') {
    needsToServe.classList.remove('invalid');
  }
});

Array.from(ingredients).forEach((ingredient) => {
  const quantity = ingredient.querySelector('input.quantity');
  const measure = ingredient.querySelector('select.measure');
  const name = ingredient.querySelector('input.ingredient');

  quantity.addEventListener('input', () => {
    if (quantity.classList.contains('invalidBorder') && quantity.value !== '') {
      quantity.classList.remove('invalidBorder');
    }
  });

  measure.addEventListener('change', () => {
    if (measure.classList.contains('invalidBorder')) {
      measure.classList.remove('invalidBorder');
    }
  });

  name.addEventListener('input', () => {
    if (name.classList.contains('invalidBorder') && ingredient.value !== '') {
      name.classList.remove('invalidBorder');
    }
  });
});


//submit form validation

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

  const ingredients = Array.from(document.getElementsByClassName('ingredients-items__inputs'));
  ingredients.forEach((ingredient, index) => {
    const quantity = ingredient.querySelector('.quantity');
    if (Number(quantity.value) <= 0 || quantity.value === null) {
      quantity.classList.add('invalidBorder');
    }

    const measurement = ingredient.querySelector('.measure');
    if (measurement.value === '' || measurement.value === null) {
      measurement.classList.add('invalidBorder')
    }

    const ingredientName = ingredient.querySelector('.ingredient');
    if (ingredientName.value === '' || ingredientName.value === null) {
      ingredientName.classList.add('invalidBorder')
    }
  });

});

//add new ingredients fields after button add is clicked



//1.get add button
const addIngredients = document.getElementById('addIngredients');

//2.create function for add row every time clicks add button
function addRow() {
  //get parent node
  const ingredientsItems = document.querySelector('.ingredients-items');

  //create container items
  const ingredientInputs = document.createElement('div');
  ingredientInputs.classList.add('ingredients-items__inputs');

  //create elements quantity

  const inputContainer = document.createElement('div');
  inputContainer.classList.add('input-container--ingredients', 'input-container--ingredients-quantity');

  const inputQuantity = document.createElement('input');
  inputQuantity.classList.add('quantity');
  inputQuantity.placeholder = 'Qty';
  inputQuantity.setAttribute('type', 'number');

  //append input on inputs container
  inputContainer.appendChild(inputQuantity);

  inputQuantity.addEventListener('input', () => {
    if (inputQuantity.classList.contains('invalidBorder') && inputQuantity.value !== '') {
      inputQuantity.classList.remove('invalidBorder');
    }
  });



  //create select element for measure
  const containerSelect = document.createElement('div');
  containerSelect.classList.add('input-container--ingredients');

  const select = document.createElement('select');
  select.classList.add('measure');

  const optionSelect = document.createElement('option');
  optionSelect.label = 'Select type';

  // TODO: make measurements options dynamically generated in order to make the code more readable
  const measurements = {
    volume: [
      { name: 'Cups', value: 'cups' },
      { name: 'Tablespoons', value: 'tablespoons' },
      { name: 'Teaspoons', value: 'teaspoons' },
      { name: 'Milliliters', value: 'milliliters' },
      { name: 'Liter', value: 'liter' },
      { name: 'Ounces', value: 'ounces' },
      { name: 'Pints', value: 'pints' },
      { name: 'Quarts', value: 'quarts' },
      { name: 'Gallon', value: 'gallon' }
    ],
    weight: [
      { name: 'Each', value: 'each' },
      { name: 'Cups', value: 'cups' },
      { name: 'Grams', value: 'grams' },
      { name: 'Kilogram', value: 'kilogram' },
      { name: 'Ounces', value: 'ounces' },
      { name: 'Pounds', value: 'pounds' },
    ]
  };

  const optionVolume = document.createElement('optgroup');
  optionVolume.label = 'Volume';
  measurements.volume.forEach((measurement, index) => {
    const optionV = document.createElement('option');
    optionV.innerText = measurement.name;
    optionV.value = measurement.value;
    optionVolume.append(optionV);
  });

  const optionWeight = document.createElement('optgroup');
  optionWeight.label = 'Weight';
  measurements.weight.forEach((measurement, index) => {
    const optionW = document.createElement('option');
    optionW.innerText = measurement.name;
    optionW.value = measurement.value;
    optionWeight.append(optionW);
  });


  //append on select element
  select.append(optionSelect, optionVolume, optionWeight);
  //append all on container select
  containerSelect.append(select);

  select.addEventListener('change', () => {
    if (select.classList.contains('invalidBorder')) {
      select.classList.remove('invalidBorder');
    }
  });

  //create input elements for ingredient

  const ingredientInputContainer = document.createElement('div');
  ingredientInputContainer.classList.add('input-container--ingredients', 'input-container--ingredients-ingredient');

  const inputIngredient = document.createElement('input');
  inputIngredient.classList.add('ingredient');

  inputIngredient.placeholder = 'Ingredient';
  inputIngredient.setAttribute('type', 'text');

  //append input on container div
  ingredientInputContainer.appendChild(inputIngredient);

  inputIngredient.addEventListener('input', () => {
    if (inputIngredient.classList.contains('invalidBorder') && inputIngredient.value !== '') {
      inputIngredient.classList.remove('invalidBorder');
    }
  });

  //append all fields on ingredient inputs div
  ingredientInputs.append(inputContainer, containerSelect, ingredientInputContainer);
  //append all elements on parent ingredients items
  ingredientsItems.append(ingredientInputs);
}

//3.add event listener on add button
addIngredients.addEventListener('click', addRow);



//TODO: on submit get data from all inputs

//BUG: every submit creates elements, needs to create elements only when inputs have data,
//      if statment is not good

form.addEventListener('submit', () => {

  let formValues = new FormData(document.forms[0]);
  //let originalServingsValue = formValues.get('originalServings');
  let measureValue = formValues.get('measure');
  let ingredientValue = formValues.get('ingredient');

  if (recipeName.value === '' || recipeName.value === null) {

    let recipeValue = formValues.get('recipeName');
    let recipe = document.createElement('h3');
    recipe.textContent = recipeValue;
    document.querySelector('.section-results__content').append(recipe);
  }

  if (Number(needsToServe.value) != 0 || needsToServe.value !== null) {

    let needsToServeValue = formValues.get('needsToServe');
    let wishServings = document.createElement('p');
    wishServings.textContent = 'Serves for:' + ' ' + needsToServeValue;
    document.querySelector('.section-results__content').append(wishServings);
  }

  const ingredientsList = document.createElement('ul');
  ingredientsList.setAttribute('class', 'result-ingredients-list')
  Array.from(ingredients).forEach(ingredient => {
    const ingredientListItem = document.createElement('li');

    const ingredientQuantity = ingredient.querySelector('.quantity').value;
    const ingredientQuantityNode = document.createElement('span');
    ingredientQuantityNode.innerText = ingredientQuantity;
    // ingredientMeasureNode.classList.add('ingredient-quantity');
    ingredientListItem.appendChild(ingredientQuantityNode);

    const ingredientMeasure = ingredient.querySelector('.measure').value;
    const ingredientMeasureNode = document.createElement('span')
    ingredientMeasureNode.innerText = ingredientMeasure;
    // ingredientMeasureNode.classList.add('ingredient-measure');
    ingredientListItem.appendChild(ingredientMeasureNode);

    const ingredientName = ingredient.querySelector('.ingredient').value;
    const ingredientNameNode = document.createElement('span');
    ingredientNameNode.innerText = ingredientName;
    // ingredientMeasureNode.classList.add('ingredient-name');
    ingredientListItem.appendChild(ingredientNameNode);

    ingredientsList.appendChild(ingredientListItem);
  });

  document.querySelector('.section-results__content').append(ingredientsList);

  // if (ingredients[0].value !== '' || ingredients[0].value !== null ) {

  //   let quantity = document.getElementsByClassName('quantity');
  //   quantity = formValues.get('quantity');
  //   let quantities = document.createElement('li');
  //   quantities.textContent = quantity;

  //   document.querySelector('.section-results__content').append(quantities);
  //   quantities.append(' ' + measureValue + ' ' + ingredientValue);

  // }
});


