let token = null

const loginButtonRegister = document.querySelector(".loginButtonRegister")

const registerButtonLogin = document.querySelector(".registerButtonLogin")


const containerLogin = document.querySelector(".containerLogin")
const containerRegister = document.querySelector(".containerRegister")
const bigContainerTwo = document.querySelector(".bigContainerTwo")

function register(){
    let paramsRegister = {
        method : "POST ",
        headers : {
            "Content-Type" : "application/json",
        },
        body : JSON.stringify({
            username : username,
            password : password,
        })
    }

    return fetch ('https://partiel-s1-b1dev-2425.esdlyon.dev/api/register', paramsRegister)
        .then((response) => response.json())
        .then((data) => (data.json))

}




async function login(username, password){
    console.log(username, password)
    let paramsLogin = {
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
            "Authorization" : "Bearer " + token

        },
        body : JSON.stringify({
            username : username,
            password : password,
        })
    }

    return await fetch ('https://partiel-s1-b1dev-2425.esdlyon.dev/api/login', paramsLogin)
        .then((response) => response.json())
        .then((json) => {
            return json.token
        })
}



function displayLoginForm(){
    containerLogin.style.display ="block"
    bigContainerTwo.style.display ="none"

    let username = document.querySelector(".username")
    let password =  document.querySelector(".password")
    let  loginButtonLogin = document.querySelector(".loginButtonLogin")

    loginButtonLogin.addEventListener("click", () => {

        login(username.value, password.value).then((data) =>{
            token = data
            displayList()

            console.log(token)

        })
    })
}

function  displayList(){
    containerLogin.style.display = "none"
    bigContainerTwo.style.display  = "block"
}

function addNameURL(){
    let urlName = {
        method : "GET",
        headers : {
            "Content-Type" : "application/json",
            "Authorization" : "Bearer " + token
        },
        body : JSON.stringify({})
    }

    fetch(' https://partiel-s1-b1dev-2425.esdlyon.dev/api/whoami', urlName)
        .then((response) => response.json())
        .then (data => console.log(data))
}




function collectList(){
    let paramsCollectList ={
        method : "GET",
        headers : {
            "Content-Type" : "application/json",
            "Autorization" : "Bearer " + token
        },
        body:JSON.stringify({
            name : "",
            description : "",
        })
    }
    fetch('https://partiel-s1-b1dev-2425.esdlyon.dev/api/mylist', paramsCollectList)
        .then((response) => response.json())
        .then(json => {
            console.log("la liste est la ")
            return json
        })
}

function createItem(){
    let createItemInfo = {
        method :"POST",
        headers : {
            "Content-Type" : "application/json",
            "Authorization" : "Bearer " + token
        },
        body : JSON.stringify({
            name : "",
        })
    }
    fetch('https://partiel-s1-b1dev-2425.esdlyon.dev/api/mylist/new', createItemInfo)
        .then((response) => response.json())
        .then(data => {
            `<div class="card" style="width: 18rem;">
                    <div class="card-body">
                         <h5 class="card-title">${name}</h5>
                         <p class="card-text">${description}</p>
                         <a href="#" class="btn btn-primary">Ajouter</a>
                         <a href="#" class="btn btn-primary">Supprimer</a>
                     </div>
            </div>
            `
        })

}

function deleteItem(id){
    let paramsDeleteItem = {
        method : "DELETE",
        headers: {
            "Content-Type" : "application/json",
            "Authorization" : "Bearer " + token
        },
        body : JSON. stringify({
            id : ""
        })
    }
    fetch('https://partiel-s1-b1dev-2425.esdlyon.dev/api/mylist/delete/' + id, paramsDeleteItem)
        .then((response) => response.json())
        .then (data => {

        })
    //
}

function switchStatus(id){
    let paramsSwitchStatus = {
        method :"PATCH",
        headers : {
            "Content-Type" : "application/json",
            "Authorization" : "Bearer " + token,
        },
        body : JSON.stringify({
            name : "",
            description : "",
        })
    }
    fetch (' https://partiel-s1-b1dev-2425.esdlyon.dev/api/mylist/switchstatus/' + id, paramsSwitchStatus )
        .then((response) => response.json())
        .then(data => {

        })
    //
}



function clearList(){
    let paramsClearList = {
        method :"DELETE",
        headers : {
            "Content-Type" : "application/json",
            "Authorization" : "Bearer " + token,
        },
        body : JSON.stringify({

        })
    }
    fetch(': https://partiel-s1-b1dev-2425.esdlyon.dev/api/mylist/clear', paramsClearList)
        .then((response) => response.json())
        .then(data => {


        })
    //

}



if(!token){
    displayLoginForm()
}else{
displayList()
}