const form = document.getElementById('form');
const recipeName = document.getElementById('recipeName');
const servings = document.getElementById('originalServings');
const needsToServe = document.getElementById('needsToServe');
const quantity = document.getElementById('quantity');
const measure = document.getElementById('measure');
const ingredient = document.getElementById('ingredient');


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

ingredient.addEventListener('input', () => {
  if (ingredient.classList.contains('invalidBorder') && ingredient.value !== '') {
      ingredient.classList.remove('invalidBorder');
  }
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

  if (Number(quantity.value) <= 0 || quantity.value === null) {
    quantity.classList.add('invalidBorder');
  } else {
    quantity.classList.remove('invalidBorder');
  }

  if (document.querySelector('option').selected) {
    measure.classList.add('invalidBorder');
  } else {
    measure.classList.remove('invalidBorder');
  }

  if (ingredient.value === '' || ingredient.value === null) {
    ingredient.classList.add('invalidBorder');
  } else {
    ingredient.classList.remove('invalidBorder');
  }

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
  inputContainer.classList.add('input-container--ingredients','input-container--ingredients-quantity');

  const inputQuantity = document.createElement('input');
  inputQuantity.classList.add('quantity');
  inputQuantity.placeholder = 'Qty';
  inputQuantity.id = 'quantity';
  inputQuantity.setAttribute('type','number');

  //append input on inputs container
  inputContainer.appendChild(inputQuantity);



  //create select element for measure
  const containerSelect = document.createElement('div');
  containerSelect.classList.add('input-container--ingredients');

  const select = document.createElement('select');
  select.classList.add('measure');

  const optionSelect = document.createElement('option');
  optionSelect.textContent = "Select type";

     //volume
  const optionVolume = document.createElement('optgroup');
  optionVolume.label = 'Volume';

  const optionCups = document.createElement('option');
  optionCups.innerText = 'Cups';

  const optionTablespoons = document.createElement('option');
  optionTablespoons.innerText = 'Tablespoons';

  const optionTeaspoons = document.createElement('option');
  optionTeaspoons.innerText = 'Teaspoons';

  const optionMilliliters = document.createElement('option');
  optionMilliliters.innerText = 'Milliliters';

  const optionLiter = document.createElement('option');
  optionLiter.innerText = 'Liter';

  const optionOunces = document.createElement('option');
  optionOunces.innerText = 'Ounces';

  const optionPints = document.createElement('option');
  optionPints.innerText = 'Pints';

  const optionQuarts = document.createElement('option');
  optionQuarts.innerText = 'Quarts';

  const optionGallon = document.createElement('option');
  optionGallon.innerText = 'Gallon';

  //append options on volume optiongroup
  optionVolume.append(optionCups,optionTablespoons,optionMilliliters,optionLiter,optionOunces,optionPints,optionQuarts,optionGallon);

     //weight
  const optionWeight = document.createElement('optgroup');
  optionWeight.label = 'Weight';

  const optionEach = document.createElement('option');
  optionEach.innerText = 'Each';

  const optionCupsWeight = document.createElement('option');
  optionCupsWeight.innerText = 'Cups';

  const optionTablespoonsWeight = document.createElement('option');
  optionTablespoonsWeight.innerText = 'Tablespoons';

  const optionTeaspoonsWeight = document.createElement('option');
  optionTeaspoonsWeight.innerText = 'Teaspoons';

  const optionGrams = document.createElement('option');
  optionGrams.innerText = 'Grams';

  const optionKilogram = document.createElement('option');
  optionKilogram.innerText = 'Kilogram';

  const optionOuncesWeight = document.createElement('option');
  optionOuncesWeight.innerText = 'Ounces';

  const optionPounds = document.createElement('option');
  optionPounds.innerText = 'Pounds';
   //append options on weight optiongruop
   optionWeight.append(optionEach,optionCupsWeight,optionTablespoonsWeight,optionGrams,optionKilogram,optionOuncesWeight,optionPounds);


   //append on select element
   select.append(optionSelect,optionVolume,optionWeight);

   containerSelect.append(select);

  //create input elements for ingredient

  const ingredientInputContainer = document.createElement('div');
  ingredientInputContainer.classList.add('input-container--ingredients','input-container--ingredients-ingredient');

  const inputIngredient = document.createElement('input');
  inputIngredient.classList.add('ingredient');

  inputIngredient.placeholder = 'Ingredient';
  inputIngredient.id = 'ingredient';
  inputIngredient.setAttribute('type','text');

    //append input on container div
    ingredientInputContainer.appendChild(inputIngredient);



  //append all fields on ingredient inputs div
  ingredientInputs.append(inputContainer,containerSelect,ingredientInputContainer);

  //append all elements on parent ingredients items
  ingredientsItems.append(ingredientInputs);
}

//3.add event listener on add button

addIngredients.addEventListener('click', addRow);