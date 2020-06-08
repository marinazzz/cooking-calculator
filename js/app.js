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

function outputRecipe() {

  const formValues = new FormData(document.forms[0]);
  const originalServingsValue = formValues.get('originalServings');
  const resultContainer = document.querySelector('.section-results__content');

  let recipeTitle = formValues.get('recipeName');
  const recipeNode = document.createElement('h3');
  recipeNode.innerText = recipeTitle;
  resultContainer.append(recipeNode);

  if (recipeNode) {
    recipeName.addEventListener('change', function() {
      while (resultContainer.firstChild) {
        resultContainer.removeChild(resultContainer.firstChild);
      }
    })
  }

  let servingTitle = formValues.get('needsToServe');
  const servingTitleNode = document.createElement('p');
  servingTitleNode.innerText = 'Serves for:' + ' ' + servingTitle;
  resultContainer.append(servingTitleNode);

  if (servingTitleNode) {
    needsToServe.addEventListener('change', function() {
      while (resultContainer.firstChild) {
        resultContainer.removeChild(resultContainer.firstChild);
      }
    })
  }

  const ingredientsList = document.createElement('ul');
  ingredientsList.setAttribute('class', 'result-ingredients-list')
  Array.from(ingredients).forEach(ingredient => {
    const ingredientListItem = document.createElement('li');

    const ingredientQuantity = ingredient.querySelector('.quantity').value;
    const ingredientQuantityNode = document.createElement('span');
    ingredientQuantityNode.innerText = ingredientQuantity;
    ingredientQuantityNode.classList.add('ingredient-quantity');
    ingredientListItem.appendChild(ingredientQuantityNode);

    if (ingredientQuantityNode) {
      document.querySelector('input.quantity').addEventListener('change', function() {
        while (resultContainer.firstChild) {
          resultContainer.removeChild(resultContainer.firstChild);
        }
      })
    }

    const ingredientMeasure = ingredient.querySelector('.measure').value;
    const ingredientMeasureNode = document.createElement('span')
    ingredientMeasureNode.innerText = ingredientMeasure;
    ingredientMeasureNode.classList.add('ingredient-measure');
    ingredientListItem.appendChild(ingredientMeasureNode);

    if (ingredientMeasureNode) {
      document.querySelector('.measure').addEventListener('change', function() {
        while (resultContainer.firstChild) {
          resultContainer.removeChild(resultContainer.firstChild);
        }
      })
    }


    const ingredientName = ingredient.querySelector('.ingredient').value;
    const ingredientNameNode = document.createElement('span');
    ingredientNameNode.innerText = ingredientName;
    ingredientListItem.appendChild(ingredientNameNode);

    if (ingredientNameNode) {
      document.querySelector('.ingredient').addEventListener('change', function() {
        while (resultContainer.firstChild) {
          resultContainer.removeChild(resultContainer.firstChild);
        }
      })
    }

    ingredientsList.appendChild(ingredientListItem);
  });
  resultContainer.append(ingredientsList);

}

form.addEventListener('submit', function (event) {
  event.preventDefault();

  if (validateForm()) {
    outputRecipe();
  }
});

//add new ingredients fields after button add is clicked

const addIngredients = document.getElementById('addIngredients');

function addRow() {

  const ingredientsItems = document.querySelector('.ingredients-items');

  const ingredientInputs = document.createElement('div');
  ingredientInputs.classList.add('ingredients-items__inputs');

  const inputContainer = document.createElement('div');
  inputContainer.classList.add('input-container--ingredients', 'input-container--ingredients-quantity');

  const inputQuantity = document.createElement('input');
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
  containerSelect.classList.add('input-container--ingredients');

  const select = document.createElement('select');
  select.classList.add('measure');

  const optionSelect = document.createElement('option');
  optionSelect.label = 'Select type';

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
  ingredientInputContainer.classList.add('input-container--ingredients', 'input-container--ingredients-ingredient');

  const inputIngredient = document.createElement('input');
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

addIngredients.addEventListener('click', addRow);