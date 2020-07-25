
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function saveScore(arr){
  localStorage.setItem('scorecard', JSON.stringify(arr));
};

function getSavedScore(){

  let background = JSON.parse(localStorage.getItem('background'));
  $('head').append('<style>#personal-grid__grid:before{background-image: url("/images/backgrounds/background-' + background + '.jpg");}</style>');

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
  wrapper.removeClass('loaded')
  wrapper.empty()

  scorecard.forEach((item, i) => {
    let element = document.createElement('div')
    element.setAttribute('class', 'personal-grid__item')
    element.setAttribute('data-arr', i)


    if(item === 1) element.classList.add('active')
    if(item === 2) element.classList.add('clicked')

    wrapper.append(element)
  });

  showScore(scorecard)
  clickHandlers(scorecard)
  wrapper.addClass('loaded')
}

function toggleValue(v){
  if(v == 0){
    return 2
  } else if (v == 2){
    return 0
  }
}

function newScorecard(){
  let scorecard = createScorecard();
  let background = appVersion === 'nsfw' ? getRandomInt(1,64) : getRandomInt(101,103);

  localStorage.setItem('background', JSON.stringify(background));
  $('head').append('<style>#personal-grid__grid:before{background-image: url("/images/backgrounds/background-' + background + '.jpg");}</style>');

  saveScore(scorecard);

  return scorecard;
}

function clickHandlers(scorecard){
  let items = $('.personal-grid__item');

  items.on('click', function(){
    let target = $(this);
    let id = target.attr('data-arr');
    let current = scorecard[id];

    if(current !== 1){
      let newV = toggleValue(current);

      scorecard.splice(id, 1, newV);
      saveScore(scorecard);
      renderScorecard(scorecard);
    }
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

});
