const searchFood = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText);

    //to remove input value after search
    searchField.value = '';

    if (searchText == '') {
        return 'please write something';
    } else {
        //load data
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s= ${searchText}
    `;
        fetch(url)
            .then(Response => Response.json())
            .then(data => displaySearchResult(data.meals))
    }


};
const displaySearchResult = (meals) => {
    // console.log(meals);
    const searchResult = document.getElementById('search-result');

    //===================clear inner html 2 way ============
    // searchResult.innerHTML = ''; 
    searchResult.textContent = '';

    //======== result not found========
    if (meals.length == 0) {
        return 'Show no result';
    }

    //========== for each loop===========
    meals.forEach(meal => {
        // console.log(meal); //onk gulo fish k pacchi 
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = ` 
        <div  onclick="loadMealDetail(${meal.idMeal})"  class="card h-100">
        <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>
            <p class="card-text">${meal.strInstructions.slice(0, 200)}</p>
        </div>
    </div>`    ;
        searchResult.appendChild(div);
    })
};

const loadMealDetail = (mealId) => {
    console.log(mealId);
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    fetch(url)
        .then(Response => Response.json())
        .then(data => displayMealDetail(data.meals[0]))
};

const displayMealDetail = meal => {
    console.log(meal); // meal info 

    const mealDetails = document.getElementById('meal-details');

    mealDetails.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <img src=" ${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text">${meal.strInstructions.slice(0, 150)}</p>
                <a href="${meal.strYoutube}" class="btn btn-primary">Go somewhere</a>
            </div>
    `;
    mealDetails.appendChild(div);
}

