document.addEventListener("DOMContentLoaded", function() {
    getNewsFromServer();
})

function getNewsFromServer() {
  fetch('/api/get_articles') // Fetch data from the Flask server
    .then(response => response.json()) // Parse the JSON response
    .then(json => loop_articles(json)) // Log the JSON data to the console
    .catch(error => console.error('Error fetching JSON:', error));
}

function loop_articles(json){
  for(let i = 0; i < 3; i++){
    createArticleCard(json[i], i)
  }
}

function createArticleCard(article, loop_count){
  let row = document.getElementById('card-row')
  let col = document.createElement("div")
  col.setAttribute('class', 'col-lg-4 col-md-6 col-12')
  if(loop_count === 1){
    col.setAttribute('class', 'col-lg-4 col-md-6 col-12 d-none d-md-block')
  }
  if(loop_count === 2){
    col.setAttribute('class', 'col-lg-4 col-md-6 col-12 d-none d-lg-block')
  }
  let cardholder = document.createElement("div")
  cardholder.setAttribute('class', 'card shadow mb-3 bg-white rounded')
  cardholder.setAttribute('id', 'card')
  let topContainer = document.createElement("div")
  topContainer.setAttribute('class', 'container')
  topContainer.setAttribute('id', 'top-container')
  let cardbody = document.createElement("div")
  cardbody.setAttribute('class', 'card-body align-items-center')
  let image = document.createElement("img")
  image.src = article['imagelink']
  image.setAttribute('class', 'card-img-top text-center')
  image.setAttribute('id', 'card-image')
  let title = document.createElement("H5")
  title.setAttribute('class', 'card-title')
  title.innerText = article['title']
  let content = document.createElement("p")
  content.setAttribute('class', 'card-text')
  content.setAttribute('id', 'card-text')
  content.innerText = article['content']
  let buttonContainer = document.createElement('div')
  buttonContainer.setAttribute('class', 'container')
  let openButton = document.createElement("button")
  openButton.setAttribute('class', 'btn btn-primary card-btn')
  openButton.setAttribute('id', article['id'])
  openButton.innerText = "Read More"
  openButton.addEventListener('click', function () {
    openArticlePage(this.id)
    console.log(this.id)
  })
  cardbody.appendChild(image)
  cardbody.appendChild(title)
  cardbody.appendChild(content)
  buttonContainer.appendChild(openButton)
  topContainer.appendChild(cardbody) 
  cardholder.appendChild(topContainer)
  cardholder.appendChild(buttonContainer)
  col.appendChild(cardholder)
  row.appendChild(col)
}

function openArticlePage(id){
  window.open("https://techspeaking.s4820791.repl.co/news/article/" + id)
}