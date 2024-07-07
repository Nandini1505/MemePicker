import { catsData } from '/data.js'

const emotionRadios = document.getElementById("emotion-radios")
const getImageBtn = document.getElementById("get-img-btn")
const memeBox = document.getElementById("meme-box")
const memeContent = document.getElementById("meme-content")
const memeCloseBtn = document.getElementById("meme-close-btn")
const gifsOnly = document.getElementById("gifs-only")

emotionRadios.addEventListener('change', highlightCheckedOpt)

memeCloseBtn.addEventListener('click', closeModal)

getImageBtn.addEventListener('click', renderMeme)

function highlightCheckedOpt(e){
    const radios = document.getElementsByClassName("radio")
    for (let radio of radios){
        radio.classList.remove("highlight")
    }
    document.getElementById(e.target.id).parentElement.classList.add("highlight")
}

function closeModal(){
    memeBox.style.display = 'none'
}

function renderMeme(){
    const catObject = getSingleCat()
    memeContent.innerHTML =  `
        <img 
        class="cat-img" 
        src="./images/${catObject.image}"
        alt="${catObject.alt}"
        >
        `
    memeBox.style.display = 'flex'
}

function getSingleCat(){
    const catsArray = getMatchingCatsArray()

    if(catsArray.length === 1){
        return catsArray[0]
    }
    else{
        const randomNum = Math.floor(Math.random() * catsArray.length)
        return catsArray[randomNum]
    }
}

function getMatchingCatsArray(){
    if(document.querySelector("input[type='radio']:checked")){
        const emotion = document.querySelector("input[type='radio']:checked").value
        const isGif = gifsOnly.checked

        const matchingCatsArray = catsData.filter(function(cat){
            if(isGif){
                return cat.emotionTags.includes(emotion) && cat.isGif
            }
            else {
                return cat.emotionTags.includes(emotion)
            }
        })
        return matchingCatsArray  
    }   
}

function getEmotionsArray(cats) {
    const emotionsArray = []
    for (let cat of cats){
        for (let emotion of cat.emotionTags){
            if(!emotionsArray.includes(emotion)){
                emotionsArray.push(emotion)
            }
        }
    }
    return emotionsArray
}

function renderEmotionRadios(cats) {
    let radioitems = ``
    const emotionArray = getEmotionsArray(cats)
    for(let emotion of emotionArray){
        radioitems += `
                    <div class="radio">
                        <label for="${emotion}">${emotion}</label>
                        <input 
                        type="radio"
                        id="${emotion}"
                        value="${emotion}"
                        name="emotion"
                        >
                    </div>`
    }
    emotionRadios.innerHTML = radioitems
}

renderEmotionRadios(catsData)