

function saveScore(arr){
  localStorage.setItem('scorecard', JSON.stringify(arr));
};

function getSavedScore(){
  let scorecard = JSON.parse(localStorage.getItem('scorecard'));
  return scorecard
}

function createScorecard(){
  let scorecard = [];
  for (let i = 0; i < 81; i++){
    scorecard.push(0)
  }
  return scorecard;
}

const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

function showScore(scorecard){
  let scoreW = $('#grid-score')
  let score = scorecard.length - countOccurrences(scorecard, 1);
  scoreW.html(score)
}

function renderScorecard(scorecard){
  let wrapper = $('#personal-grid__grid')

  wrapper.empty()

  scorecard.forEach((item, i) => {
    let element = document.createElement('div')
    element.setAttribute('class', 'personal-grid__item')
    element.setAttribute('data-arr', i)


    if(item === 1) element.classList.add('active')

    wrapper.append(element)
  });

  showScore(scorecard)
  clickHandlers(scorecard)

}

function toggleValue(v){
  if(v == 1){
    return 0
  } else if (v == 0){
    return 1
  }
}

function newScorecard(){
  let scorecard = createScorecard();
  saveScore(scorecard);
  return scorecard;
}

function clickHandlers(scorecard){
  let items = $('.personal-grid__item');
  console.log('donk')

  items.on('click', function(){
    let target = $(this);
    let id = target.attr('data-arr');
    let current = scorecard[id];
    let newV = toggleValue(current);

    scorecard.splice(id, 1, newV);
    saveScore(scorecard);
    renderScorecard(scorecard);
  })

}

$(() => {

  let grid = $('#personal-grid__grid');

  let scorecard = getSavedScore();


  if(scorecard !== null){
    renderScorecard(scorecard);
  } else {
    scorecard = newScorecard()
    renderScorecard(scorecard);
  }

  $('#clearScore').on('click', function(){
    scorecard = newScorecard();
    renderScorecard(scorecard);
  })

});
