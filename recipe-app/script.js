const mealsEl = document.getElementById('meals');
const favoriteContainerEl = document.getElementById('fav-meals');
const mealPopupEl = document.getElementById('meal-popup');
const mealInfoEl = document.getElementById('meal-info')
const popupCloseBtn = document.getElementById('close-popup');
const searchTermEl = document.getElementById('search-term');
const searchBtn = document.getElementById('search');

async function getRandomMeal() {
    const res = (await (await fetch('https://www.themealdb.com/api/json/v1/1/random.php')).json()).meals[0];
    addMeal(res, true);
}

async function getMealById(id) {
    return (await (await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)).json()).meals[0];
}

async function getMealsBySearch(term) {
    return (await (await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)).json()).meals;
}

async function fetchFavMeals() {
    // clean the container
    favoriteContainerEl.innerHTML = '';

    const mealIds = getMealsFromLS();

    for (let i = 0; i < mealIds.length; i++) {
        const mealId = mealIds[i];
        addMealFav(await getMealById(mealId));
    }
}

function getMealsFromLS() {
    return !JSON.parse(localStorage.getItem('mealsIds')) ? [] : JSON.parse(localStorage.getItem('mealsIds'));
}

function AddMealToLS(mealId) {
    const mealsIds = getMealsFromLS();
    localStorage.setItem('mealsIds', JSON.stringify([...mealsIds, mealId]));
}

function RemoveMealFromLS(mealId) {
    const mealsIds = getMealsFromLS();
    localStorage.setItem('mealsIds', JSON.stringify(mealsIds.filter(id => id !== mealId)));
}

function addMeal(mealData, random = false) {
    const meal = document.createElement('div');
    meal.classList.add('meal');

    meal.innerHTML = `
        <div class="meal-header">
            ${random ? '<span class="random">Random Recipe</span>' : ''}
            <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}" id="thumbnail-${mealData.idMeal}">
        </div>
        <div class="meal-body">
            <h4>${mealData.strMeal}</h4>
            <button class="fav-btn"><i class="fas fa-heart"></i></button>
        </div>
    `;

    const btn = meal.querySelector('.meal-body .fav-btn')
    btn.addEventListener('click', () => {
        if (btn.classList.contains('active')) RemoveMealFromLS(mealData.idMeal);
        else AddMealToLS(mealData.idMeal);
        btn.classList.toggle('active');

        fetchFavMeals();
    });

    mealsEl.appendChild(meal);

    document.getElementById(`thumbnail-${mealData.idMeal}`).addEventListener('click', () => {
        showMealInfo(mealData);
    });
}

function addMealFav(mealData) {
    const favMeal = document.createElement('li');

    favMeal.innerHTML = `
        <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}" id="thumbnail-${mealData.idMeal}">
        <span>${mealData.strMeal}</span>
        <button class="clear"><i class="fas fa-window-close"></i></button>
    `

    const btn = favMeal.querySelector('.clear');
    btn.addEventListener('click', () => {
        RemoveMealFromLS(mealData.idMeal);
        fetchFavMeals();
    });

    
    favoriteContainerEl.appendChild(favMeal);

    document.getElementById(`thumbnail-${mealData.idMeal}`).addEventListener('click', () => {
        showMealInfo(mealData);
    });
}

function showMealInfo(mealData) {
    // clean ti up
    mealInfoEl.innerHTML = '';

    // update Meal info
    const mealEl = document.createElement('div');

    const ingredients = [];
    // get ingredients and measures
    for (let i = 1; i <= 20; i++) {
        if (mealData[`strIngredient${i}`]) ingredients.push(`${mealData[`strIngredient${i}`]} - ${mealData[`strMeasure${i}`]}`)
        else break;
    }

    mealEl.innerHTML = `
        <h1>${mealData.strMeal}</h1>
        <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
        <p>${mealData.strInstructions}</p>
        <h3>Ingredients:</h3>
        <ul>
            ${ingredients.map(ing => `<li>${ing}</li>`).join('')}
        </ul>
    `;

    mealInfoEl.appendChild(mealEl);

    // show the popup
    mealPopupEl.classList.remove('hidden')
}

searchBtn.addEventListener('click', async () => {
    const search = searchTermEl.value;
    const meals = await getMealsBySearch(search);

    if (!meals) return alert(`No meal found with ${search}`);

    // clean container
    mealsEl.innerHTML = '';

    meals.forEach(meal => {
        addMeal(meal);
    });

});

popupCloseBtn.addEventListener('click', () => {
    mealPopupEl.classList.add('hidden');
});

getRandomMeal();
fetchFavMeals();