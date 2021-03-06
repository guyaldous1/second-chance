    const socket = io()
    let alreadyPlaying = false
    let appVersion = 'sfw';

    socket.on('data', init)

    socket.on('newClient', (obj) => {
      if (!alreadyPlaying)
        init(obj)
      alreadyPlaying = true
    })


    function renderCard(card){
      let cardArr = card.split("");

      const inner = document.createElement('div')
      inner.setAttribute('class', 'card__grid')

      cardArr.forEach((item, i) => {
        let piece = document.createElement('div')
        piece.setAttribute('class', 'card__grid__item')

        if(item === "1"){
          piece.classList.add('card__grid__item--active')
        }

        inner.appendChild(piece);
      });

      const wrap = document.createElement('div')
      wrap.setAttribute('class', 'card')
      wrap.appendChild(inner)

      return wrap
      }

    function renderCards(cards){
      let cardHolder = $('#card-row');

      cardHolder.empty()
      cards.forEach(item => {
        cardHolder.append(renderCard(item))
      })

    }


    function renderPlayer(player){
      const wrap = document.createElement('div')
      wrap.setAttribute('class', 'player')
      if(player.done) wrap.classList.add('player--done')
      if(player.rip) wrap.classList.add('player--rip')

      const name = document.createElement('h3')
      name.innerHTML = player.name
      wrap.appendChild(name)

      const doneBtn = document.createElement('button')
      doneBtn.innerHTML = 'Done'
      doneBtn.setAttribute('class', 'btn btn-success ajax')
      doneBtn.setAttribute('name', 'action')
      doneBtn.setAttribute('value', 'done')
      doneBtn.setAttribute('player', player.name)

      wrap.appendChild(doneBtn)

      const chance = document.createElement('div')
      chance.setAttribute('class', 'player_chance')

      if(player.secondChances.length > 0 && !player.starters){
        const ripBtn = document.createElement('button')
        ripBtn.innerHTML = "I have died"
        ripBtn.setAttribute('class', 'btn btn-dark ajax')
        ripBtn.setAttribute('name', 'action')
        ripBtn.setAttribute('value', 'rip')
        ripBtn.setAttribute('player', player.name)

        wrap.appendChild(ripBtn)

      } else if(!player.starters) {
        const chanceBtn = document.createElement('button')
        chanceBtn.innerHTML = 'Second Chance'
        chanceBtn.setAttribute('class', 'btn btn-warning ajax')
        chanceBtn.setAttribute('name', 'action')
        chanceBtn.setAttribute('value', 'chance')
        chanceBtn.setAttribute('player', player.name)

        chance.appendChild(chanceBtn)
      }

      if(player.secondChances.length > 0){
        let chanceCard = renderCard(player.secondChances[0])
        chance.appendChild(chanceCard)
      }



      wrap.appendChild(chance)

      return wrap
      }

    function renderPlayers(players){
      let playerHolder = $('#players');

      playerHolder.empty()

      players.forEach(item => {
        playerHolder.append(renderPlayer(item))
      })

    }


    function init(obj){
      console.log(obj)

      appVersion = obj.version

      let currentCards = obj.currentCards;
      let players = obj.players;


      //render the scorecard
      if(obj.action === 'newGame'){
        let scorecard = newScorecard()
        renderScorecard(scorecard);
      }

      if(obj.action === 'done' && obj.next === true){
        let scorecard = getSavedScore();

        let newScorecard = scorecard.map(function(item){ return item === 2 ? 1 : item })

        saveScore(newScorecard);
        renderScorecard(newScorecard);
      }


      // render the cards
      if (currentCards.length > 0){
        renderCards(currentCards);
      } else if (obj.currentDeck.length === 0) {
        $('#card-row').empty()
        alert('create new game')
      } else {
        $('#card-row').empty()
        renderCards(currentCards);
      }


      //render the players
      if (players.length > 0){
        renderPlayers(players);
      }


      //button bindings
      $('.btn.ajax').on('click', function(e){

        $('.btn.ajax').off('click');

        $('.wt-popover').removeClass('open')

        if($(this).attr('value') === 'chance' && obj.currentDeck <= 0){
          alert('no more cards')
        } else {

          let player;

          if($(this).attr('player')){
            player = $(this).attr('player');
          }

          const req = {
            action: $(this).attr('value'),
            player: player,
          }

          $.post("/deck", req )
        }
      })

    }



  $(() => {

    $('#newGame--form').on('submit', function(e){
      e.preventDefault();
      let action = $(this).attr('value');

      let newPlayers = []

      $('#newGame--form input').each(function(e){
        let value = $(this).val();
        if(value) newPlayers.push(value)
      })

      if(newPlayers.length < 2){
        alert('add more players')
        return
      }

      $('#card-row').empty()

      $('#newGame--p1').removeClass('d-none')
      $('#newGame--p2').addClass('d-none')
      $('.wt-popover').removeClass('open')

      const pReq = {
        action: action,
        players: JSON.stringify(newPlayers),
      }

      console.log(pReq)

      $.post("/deck", pReq )

    })

  })
