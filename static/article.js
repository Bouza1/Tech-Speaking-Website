let likeBtn = document.getElementById('like-btn')
let dislikeBtn = document.getElementById('dislike-btn')

likeBtn.addEventListener('click', function(){
  voteOnArticle(this.id)
})

dislikeBtn.addEventListener('click', function(){
  voteOnArticle(this.id)
})

function voteOnArticle(elementId){
  if(elementId === 'like-btn'){
    let likeScore = document.getElementById('like-score')
    let og_score = Number(likeScore.innerText)
    likeScore.innerText = og_score + 1
    sendVote2Server('like')
  } else if(elementId ==='dislike-btn'){
    let dislikeScore = document.getElementById('dislike-score')
    let ogDisScore = Number(dislikeScore.innerText)
    dislikeScore.innerText = ogDisScore + 1
    sendVote2Server('dislike')
  }
}

function createVoteObject(vote){
  let id = document.getElementById('hidden-id')
  let obj = {"id":id.innerText, "vote": vote}
  return obj
}

async function sendVote2Server(vote){
  try {
    const response = await fetch('/api/vote_on_article', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(createVoteObject(vote)),
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data['message']);
    } else {
      console.error('Error sending vote to server:', response.status);
    }
  } catch (error) {
    console.error('Error sending vote to server:', error);
  }
}