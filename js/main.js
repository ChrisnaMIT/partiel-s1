let token = null
const loginButtonLogin = document.querySelector(".loginButtonLogin")
const loginButtonRegister = document.querySelector(".loginButtonRegister")

const registerButtonLogin = document.querySelector(".registerButtonLogin")


const containerLogin = document.querySelector(".containerLogin")
const containerRegister = document.querySelector(".containerRegister")
const hoppingList = document.querySelector(".shoppingList")

function register(){
    let parametres = {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({
            username : "",
            password : "",
        })
    }
    fetch('https://partiel-s1-b1dev-2425.esdlyon.dev/api/register', parametres)
        .then((response) => response.json())
        .then(data => console.log(data) )
}




async function login(username, password){
    console.log(username, password)
    let params = {
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
            "Authorization" : "Bearer " + token
        },
        body : JSON.stringify({
            username: username,
            password: password,
        }),
    }
    return await fetch('https://partiel-s1-b1dev-2425.esdlyon.dev/api/login', params)
        .then(response => response.json())
        .then((json) => {
            console.log(json)
            return json.token
        })
}


function displayRegisterForm(){
   containerLogin.style.display = "none"
    containerRegister.style.display = "block"

     let username = document.querySelector(".username")
    let password = document.querySelector(".password")
    const registerButtonRegister = document.querySelector(".registerButtonRegister")

   registerButtonRegister.addEventListener("click",() => {

        login(username.value, password.value).then((data) => {

            displayLoginform()
            console.log(data)
        })

    })
}

function displayLoginform(){
    containerLogin.style.display = "block"
    containerRegister.style.display = "none"
    let username = document.querySelector(".username")
    let password = document.querySelector(".password")


    loginButtonLogin.addEventListener("click", () =>{

        login(username.value, password.value).then((data) => {
            token = data


            // à ce moment afficher le reste des pages
            console.log(token)
        })
    })
}

function addShoppingList(){
    let paramsAddItems = {
        method : "POST",
        headers: ({
            "Content-Type" : "application/json",
            "Authorization" : "Bearer " + token,
        }),
        body : JSON.stringify({
            name : "",
            description : "",
        })
    }

    fetch('https://partiel-s1-b1dev-2425.esdlyon.dev/api/mylist/new')
        .then((response) => response.json())
        .then(data => console.log(data))
}










if(!token){
    displayRegisterForm()
}else{
    displayLoginform()
}