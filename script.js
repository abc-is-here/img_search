const accessKey = 'rfjlH5VmLaSZCQvojfpUO5rPGtJavQ5Kir4qmGYht20'

const formEl = document.querySelector('form')
const inpEl = document.getElementById('sea_inp')
const resEl = document.querySelector('.sea_results')
const showMore = document.getElementById('sh-mo')

let inputData = ""
let page = 1

async function searchImages(){
    inputData = inpEl.value
    const url = `https://api.unsplash.com/search/photos?query=${inputData}&page=${page}&client_id=${accessKey}`
    const res = await fetch(url)
    const data = await res.json()
    const result = data.results
    
    if (page === 1){
        resEl.innerHTML = ""
}

    result.map((img) => {
        const imgEl = document.createElement('div')
        imgEl.classList.add('sea_result')
        const imgTag = document.createElement('img')
        imgTag.src = img.urls.small
        imgTag.alt = img.alt_description
        const imgLink = document.createElement('a')
        imgLink.href = img.links.html
        imgLink.target = "_blank"
        imgLink.textContent = img.alt_description

        imgEl.appendChild(imgTag)
        imgEl.appendChild(imgLink)
        resEl.appendChild(imgEl)
    })
    page++
    if (page > 1){
        showMore.style.display = "block"
    }
}

formEl.addEventListener('submit', (e) => {
    e.preventDefault()
    page = 1
    searchImages()
})

showMore.addEventListener('click', () => {
    searchImages()
})