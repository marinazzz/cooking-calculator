//prevent default
/*
document.getElementById('form').addEventListener("submit", function(event){
    event.preventDefault();
});
*/

let form = document.getElementById('form');
form.addEventListener ('submit', function(event){
    event.preventDefault();
});


//message

let recipeName = document.queryCommandIndeterm('recipe-name');

