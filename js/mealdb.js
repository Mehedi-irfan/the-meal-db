const searchFood = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';
    if(searchText == ''){
        const errorMessage = document.getElementById('error');
        const h3 = document.createElement('h3');
        h3.classList.add('text-center');
        h3.classList.add('text-danger');
        h3.innerText = 'Please search your favourite food';
        
        errorMessage.appendChild(h3);
        
    }
    else{
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`
        fetch(url)
        .then(res => res.json())
        .then(data => displayFood(data.meals))
        document.getElementById('error').innerText = '';
    }
    
    
   
}
const displayFood = meals => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    meals.forEach(meal => {
        console.log(meal);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        
        <div class="card">
            <img onclick="foodDetail(${meal.idMeal})" src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text">${meal.strInstructions.slice(0, 250)}</p>
            </div>
            </div>
        `
        searchResult.appendChild(div);
    })
} 
const foodDetail = mealId => {
    const url =`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayFoodDetail(data.meals[0]))
}
const displayFoodDetail = meal => {
    const foodDetail = document.getElementById('food-detail');
    foodDetail.textContent = '';
    const div = document.createElement('div');
    div.innerHTML = `
    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${meal.strMeal}</h5>
          <p class="card-text">${meal.strInstructions.slice(0, 150)}</p>
          <a href="${meal.strYoutube}" class="btn btn-primary">Food Details</a>
        </div>
    `
    foodDetail.appendChild(div);
}