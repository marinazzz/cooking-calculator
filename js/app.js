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


//add new ingredients fields

//1.get add button
const addIngredients = document.querySelector('.ingredients-items__button-add');

const inputs = document.querySelector('.ingredients-items');

/* const generateTemplate = field => {
      const html = `
      <div id="inputsIngredients" class="ingredients-items__inputs inputsIngredients">
                <div class="input-container--ingredients input-container--ingredients-quantity">
                  <input type="number" class="quantity" placeholder="Qty." name="originalEnter" />
                </div>
                <span>${field}</span>
                <div class="input-container--ingredients">
                  <select>
                    <option value="selectMeasurement">Select type</option>
                    <optgroup label="Volume">
                      <option value="Cups">Cups</option>
                      <option value="Tablespoons">Tablespoons</option>
                      <option value="Teaspoons">Teaspoons</option>
                      <option value="Milliliters">Milliliters</option>
                      <option value="Liter">Liter</option>
                      <option value="Ounces">Ounces</option>
                      <option value="Pints">Pints</option>
                      <option value="Quarts">Quarts</option>
                      <option value="Gallon">Gallon</option>
                    </optgroup>
                    <optgroup label="Weight">
                      <option value="Each">Each</option>
                      <option value="Cups">Cups</option>
                      <option value="Tablespoons">Tablespoons</option>
                      <option value="Teaspoons">Teaspoons</option>
                      <option value="Grams">Grams</option>
                      <option value="Kilogram">Kilogram</option>
                      <option value="Ounces">Ounces</option>
                      <option value="Pounds">Pounds</option>
                    </optgroup>
                  </select>
                </div>
                <div class="input-container--ingredients input-container--ingredients-ingredient">
                  <input type="text" class="ingredient" placeholder="Ingredient" name="originalEnter" />
                </div>
      `;

      inputs.innerHTML = html;
};


//2.add event listener

addIngredients.addEventListener('click', () => {
    //3.add new ingredients
    generateTemplate(field);

});
 */

//get all inputs ingredients

/* let ingredients = document.querySelectorAll('.inputsIngredients');
console.log(ingredients);

ingredients.forEach (ingredient => {
  ingredient.addEventListener('click', e => {
    e.target.remove();

});
}); */
