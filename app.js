// Category
axios.get("https://www.themealdb.com/api/json/v1/1/categories.php")
.then(res => printCategory(res.data.categories).then(() => {
    search()
}))

function printCategory(data){

    return new Promise((resolve,reject) => {
        const window = document.getElementById("categories")

        data.forEach(item => {
            window.innerHTML += `<div class="name">${item.strCategory}</div>`
        })

        resolve()
    })
}

function search(){
    const buttons = document.getElementsByClassName("name")
    for (let i = 0; i<buttons.length; i++){
        buttons[i].onclick = (e) => {
            axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${e.target.textContent}`)
            .then(res => {
                printSearchData(res.data.meals)
                window.open("#search-section","_self")
            })
            .catch(err => console.log(err))
        }
    }
}

// Random Recipe
axios.get("https://www.themealdb.com/api/json/v1/1/random.php")
.then(res => printRandomData(res.data.meals[0]))
.catch(err => console.log(err))

function printRandomData(data){

    const window = document.getElementById("random-food")

    let tableData = ""
    for (let i = 0; i<=20; i++){
        if (data[`strIngredient${i}`]){
            tableData += `<tr>
                        <td>${data[`strIngredient${i}`]}</td>
                        <td>${data[`strMeasure${i}`]}</td>
                    </tr>`
        }
    }

    window.innerHTML = `<div class="food-card" onclick="document.getElementById('random-model').style.display='block'">
                    <img src="${data.strMealThumb}" alt="food-img">
                    <div class="food-name">${data.strMeal}</div>
                </div>
                
                <div id="random-model" class="w3-modal">
                    <div class="w3-modal-content w3-animate-top w3-poppins">

                        <header class="w3-container w3-teal">
                            <span onclick="document.getElementById('random-model').style.display='none'"
                            class="w3-button w3-display-topright">&times;</span>
                            <h2>${data.strMeal}</h2>
                        </header>

                        <table class="w3-table w3-border">
                            <tr>
                                <th>Ingredient</th>
                                <th>Quantity</th>
                            </tr>
                            ${tableData}
                        </table>
                    </div>
                </div>`
}

// Category Search Recipe
function printSearchData(data){

    document.getElementById("search-section").innerHTML = `<div class="subtitle">Purrsipe that you searched</div><div id="search-food"></div>`
    const window = document.getElementById("search-food")

    data.forEach((item,index) => {

        let tableData = ""
        axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${item.idMeal}`)
        .then(res => {
            
            for (let i = 0; i<=20; i++){
                if (res.data.meals[0][`strIngredient${i}`]){
                    tableData += `  <tr>
                                        <td>${res.data.meals[0][`strIngredient${i}`]}</td>
                                        <td>${res.data.meals[0][`strMeasure${i}`]}</td>
                                    </tr>`
                }
            }

            window.innerHTML += `<div class="food-card" onclick="document.getElementById('idno${index}').style.display='block'">
                    <img src="${item.strMealThumb}" alt="food-img">
                    <div class="food-name">${item.strMeal}</div>
                </div>
                
                <div id="idno${index}" class="w3-modal">
                    <div class="w3-modal-content w3-animate-top w3-poppins">

                        <header class="w3-container w3-teal">
                            <span onclick="document.getElementById('idno${index}').style.display='none'"
                            class="w3-button w3-display-topright">&times;</span>
                            <h2>${item.strMeal}</h2>
                        </header>

                        <table class="w3-table w3-border">
                            <tr>
                                <th>Ingredient</th>
                                <th>Quantity</th>
                            </tr>
                            ${tableData}
                        </table>
                    </div>
                </div>`
        })
        .catch(err => console.log(err))        
    })
}

// Ingredent search

const button = document.getElementById("search")

button.onclick = () => {
    let category = document.getElementById("category").value.toLowerCase()
    category = category[0].toUpperCase() + category.substring(1)

    axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    .then(res => {
        printSearchData(res.data.meals)
        window.open("#search-section","_self")
    })
    .catch(err => console.log(err))
}