const search = document.getElementById('search'),
submit = document.getElementById('submit'),
random = document.getElementById('random'),
mealsEl = document.getElementById('meals'),
resultHeadingEl = document.getElementById('result-heading'),
singleMealEl = document.getElementById('single-meal');



//Search meal and fech from the API :
function getMeal(e) {
e.preventDefault();  //

//clear single-mealelement:
singleMealEl.innerHTML = '';

//get search term

const term = search.value;

//console.log(term)

//check for empty: 

if(term.trim()) {  //trim() for eliminating whitespace
fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
.then(res => res.json())
.then(data => {
    console.log(data)
    resultHeadingEl.innerHTML = `<h2>The searched meal is '${term}'</h2>`;
    if (data.meal === null) {
        resultHeadingEl.innerHTML=`<p>There are nosearch results!</p>`
    } else {
        mealsEl.innerHTML = data.meals.map(meal => `
        <div class="meal">
        <img src="${data.strMealThumb}" alt="${meal.strMeal}"/>
        <div class="meal-info" data-mealID="${meal.idMeal}" > 
            <h3>${meal.strMeal}</h3>
        
        </div>
        </div>
        `)
        .join('')  //to display as string
    }

});

//Clear search text:
search.value= '';


}else {
    alert("Please enter a earch term!")
}


}


//Add event Listener

submit.addEventListener('submit', getMeal);
mealsEl.addEventListener('click', e => {
    const mealInfo = e.path.find(item => {
        if(item.classList) {
            return item.classList.contains('meal-info');
        } else {
            return false;
        }
    });


});