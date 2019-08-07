console.log('%c HI', 'color: firebrick')
const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = 'https://dog.ceo/api/breeds/list/all'

const selector = document.getElementById("breed-dropdown")


const dogHolder = document.getElementById("dog-image-container")
const breedHolder = document.getElementById("dog-breeds")

const fetchFourBreeds = () =>{
fetch(imgUrl)
    .then(res => res.json())
    .then(images => addImage(images))
}

const addImage = (images) => {
    images['message'].forEach(element => {
        //element is dog url
        let imageTag = document.createElement('img')
        imageTag.src = element
        dogHolder.appendChild(imageTag)
    });
}


const fetchBreeds = () =>{
    fetch(breedUrl)
    .then(res => res.json())
    .then(breeds => { 
        addBreed(breeds) 
    })
        
}

const addBreed = (breeds) => {
    for(const key in breeds['message']){
        
        let breed = document.createElement('li')
        breed.innerText = key
        breed.addEventListener("click", ()=>{
            breed.style.color = "red";
        })
        
        breedHolder.appendChild(breed)
        allbreeds.push(breed)
         
    }
}

let allbreeds = [];

const filterBreeds = (array) => {
    array.forEach(breed => {
        if(breed.innerText[0] !== selector.value){
            breed.style.display = "none";
        } else {
            breed.style.display = ""
        }
    })
}



// selector.addEventListener("select", ()=>{
//     allbreeds.forEach(breed =>{
//         fetchBreeds()
//         if(selector.value !== breed[0]){
//             let breed = document.createElement('li')
//             breed.innerText = key
//             breed.addEventListener("click", ()=>{
//             breed.style.color = "red";
//         })
        
//         breedHolder.appendChild(breed)
//         }

//     })
// })

selector.addEventListener("change",()=>filterBreeds(allbreeds))


fetchFourBreeds()
fetchBreeds()
