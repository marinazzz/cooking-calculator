const form = document.getElementById('form');
const recipeName = document.querySelector('input[name="recipeName"]');
const servings = document.querySelector('input[name="originalServings"]');
const needsToServe = document.querySelector('input[name="needsToServe"]');
const ingredients = document.getElementsByClassName('ingredients-items__inputs');

// SUBMIT LISTENER
form.addEventListener('submit', function (event) {
  event.preventDefault();

  if (validateForm()) {
    removeDefaultHeading();
    outputRecipe();
    printRecipe();
  }

});

/// RESET LISTENER
form.addEventListener('reset', resetRecipe);


// FORM VALIDATION
function validateForm() {

  const validationObj = {
    recipeName: false,
    servings: false,
    needsToServe: false,
    ingredients: []
  };

  if (recipeName.value === '' || recipeName.value === null) {
    recipeName.classList.add('invalid');
  } else {
    recipeName.classList.remove('invalid');
    validationObj.recipeName = true;
  }

  if (Number(servings.value) <= 0 || servings.value === null) {
    servings.classList.add('invalid');
  } else {
    servings.classList.remove('invalid');
    validationObj.servings = true;
  }

  if (Number(needsToServe.value) <= 0 || needsToServe.value === null) {
    needsToServe.classList.add('invalid');
  } else {
    needsToServe.classList.remove('invalid');
    validationObj.needsToServe = true;
  }

  const ingredients = Array.from(document.getElementsByClassName('ingredients-items__inputs'));
  ingredients.forEach((ingredient, index) => {
    validationObj.ingredients[index] = {
      quantity: false,
      measurement: false,
      ingredientName: false
    }
    const quantity = ingredient.querySelector('.quantity');
    if (Number(quantity.value) <= 0 || quantity.value === null) {
      quantity.classList.add('invalidBorder');
    } else {
      validationObj.ingredients[index].quantity = true;
    }

    const measurement = ingredient.querySelector('.measure');
    if (document.querySelector('option').selected) {
      measurement.classList.add('invalidBorder');
    } else {
      validationObj.ingredients[index].measurement = true;
    }

    const ingredientName = ingredient.querySelector('.ingredient');
    if (ingredientName.value === '' || ingredientName.value === null) {
      ingredientName.classList.add('invalidBorder')
    } else {
      validationObj.ingredients[index].ingredientName = true;
    }
  });

  const formValid = validationObj.recipeName && validationObj.servings && validateIngredients(validationObj.ingredients);
  return formValid;
}

function validateIngredients(ingredientsValidationObj) {
  const validIngredients = ingredientsValidationObj.map((ingredient) => {
    return ingredient.ingredientName && (ingredient.measurement != '') && (ingredient.quantity > 0)
  });
  const l = validIngredients.length;
  for (let i = 0; i < l; i++) {
    if (validIngredients[i] === false) {
      return false;
    }
  }
  return true;
}


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


// FUNCTION remove default heading before calculated recipe shows

function removeDefaultHeading() {
  const defaultHeading = document.querySelector('.section-results__title');
  defaultHeading.innerHTML = '';
}

// DISPLAY CALCULATED RECIPE

function outputRecipe() {
  const recipeCalculated = document.querySelector('.section-results__content');

  const recipeTitle = document.createElement('h3');
  const servingAmount = document.createElement('p');

  recipeTitle.innerText = recipeName.value;
  servingAmount.innerText = `Serves for: ${needsToServe.value}`;

  const ingredientsList = document.createElement('ul');
  Array.from(ingredients).forEach(ingredient => {

    const ingredientQuantity = ingredient.querySelector('.quantity').value;
    const ingredientMeasure = ingredient.querySelector('.measure').value;
    const ingredientName = ingredient.querySelector('.ingredient').value;

    const ingredientListItem = document.createElement('li');
    const calculatedQuantity = document.createElement('span');
    const ingredientMeasureDisplay = document.createElement('span');
    const ingredientNameDisplay = document.createElement('span');

    calculatedQuantity.innerText = ingredientQuantity;
    ingredientMeasureDisplay.innerText = ingredientMeasure;
    ingredientNameDisplay.innerText = ingredientName;

    calculatedQuantity.classList.add('ingredient-quantity');
    ingredientMeasureDisplay.classList.add('ingredient-measure');

    ingredientListItem.append(calculatedQuantity, ingredientMeasureDisplay, ingredientNameDisplay);

    ingredientsList.setAttribute('class', 'result-ingredients-list');
    ingredientsList.appendChild(ingredientListItem);

    //invoke function to calculate the recipe
    calculateRecipe(needsToServe, servings, ingredientQuantity, calculatedQuantity);

  });

  recipeCalculated.append(recipeTitle, servingAmount, ingredientsList);
}

//function to calculate recipe and check if need to round result on 2 decimals

function calculateRecipe(val1, val2, amount, node) {
  let result = val1.value / val2.value * amount;

  if (!Number.isInteger(result)) {
    node.textContent = result.toFixed(2);
  } else node.textContent = result;

}


function printRecipe() {

  let recipeContent = document.querySelector('.section-results__content');

  let printIcon = document.createElement('a');
  printIcon.innerHTML = '<i class="fa fa-print fas" aria-hidden="true"></i>';
  recipeContent.appendChild(printIcon);

  printIcon.addEventListener('click', () => window.print());
}


function resetRecipe() {
  const recipeCalculated = document.querySelector('.section-results__content');
  recipeCalculated.innerHTML = '';
}


// FUNCTION to create elements, after clicked add button

const addIngredients = document.getElementById('addIngredients');
addIngredients.addEventListener('click', addRow);

function addRow() {

  const ingredientsItems = document.querySelector('.ingredients-items');

  const ingredientInputs = document.createElement('div');
  const inputContainer = document.createElement('div');
  const inputQuantity = document.createElement('input');

  ingredientInputs.classList.add('ingredients-items__inputs');
  inputContainer.classList.add('input-container--ingredients', 'input-container--ingredients-quantity');

  inputQuantity.classList.add('quantity');
  inputQuantity.placeholder = 'Qty';
  inputQuantity.setAttribute('type', 'number');
  inputContainer.appendChild(inputQuantity);

  inputQuantity.addEventListener('input', () => {
    if (inputQuantity.classList.contains('invalidBorder') && inputQuantity.value !== '') {
      inputQuantity.classList.remove('invalidBorder');
    }
  });

  const containerSelect = document.createElement('div');
  const select = document.createElement('select');

  const optionSelect = document.createElement('option');
  optionSelect.label = 'Select type';

  containerSelect.classList.add('input-container--ingredients');
  select.classList.add('measure');

  const measurements = {
    volume: [
      { name: 'Cups', value: 'cups' },
      { name: 'Tablespoons', value: 'Tbsp' },
      { name: 'Teaspoons', value: 'tsp' },
      { name: 'Milliliters', value: 'ml' },
      { name: 'Liter', value: 'L' },
      { name: 'Ounces', value: 'oz' },
      { name: 'Pints', value: 'pt' },
      { name: 'Quarts', value: 'qt' },
      { name: 'Gallon', value: 'gal' }
    ],
    weight: [
      { name: 'Each', value: '' },
      { name: 'Cups', value: 'cups' },
      { name: 'Grams', value: 'g' },
      { name: 'Kilogram', value: 'kg' },
      { name: 'Ounces', value: 'oz' },
      { name: 'Pounds', value: 'lb' },
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


  select.append(optionSelect, optionVolume, optionWeight);
  containerSelect.append(select);

  select.addEventListener('change', () => {
    if (select.classList.contains('invalidBorder')) {
      select.classList.remove('invalidBorder');
    }
  });

  const ingredientInputContainer = document.createElement('div');
  const inputIngredient = document.createElement('input');

  ingredientInputContainer.classList.add('input-container--ingredients', 'input-container--ingredients-ingredient');
  inputIngredient.classList.add('ingredient');

  inputIngredient.placeholder = 'Ingredient';
  inputIngredient.setAttribute('type', 'text');

  ingredientInputContainer.appendChild(inputIngredient);

  inputIngredient.addEventListener('input', () => {
    if (inputIngredient.classList.contains('invalidBorder') && inputIngredient.value !== '') {
      inputIngredient.classList.remove('invalidBorder');
    }
  });

  ingredientInputs.append(inputContainer, containerSelect, ingredientInputContainer);
  ingredientsItems.append(ingredientInputs);
}