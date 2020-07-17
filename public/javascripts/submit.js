    const socket = io()
    let alreadyPlaying = false


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

      const name = document.createElement('h3')
      name.innerHTML = player.name
      wrap.appendChild(name)

      const chance = document.createElement('div')
      chance.setAttribute('class', 'player_chance')

      const chanceBtn = document.createElement('button')
      chanceBtn.innerHTML = 'Second Chance'
      chanceBtn.setAttribute('class', 'btn btn-success ajax')
      chanceBtn.setAttribute('name', 'action')
      chanceBtn.setAttribute('value', 'chance')
      chanceBtn.setAttribute('player', player.name)

      chance.appendChild(chanceBtn)

      if(player.secondChances > 0){
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
      let currentCards = obj.currentCards;
      let players = obj.players;

      if (currentCards.length > 0){
        renderCards(currentCards);
      } else if (obj.currentDeck.length === 0) {
        $('#card-row').empty()
        alert('create new game')
      }

      if (players.length > 0){
        renderPlayers(players);
      }

      $('.btn.ajax').on('click', function(e){

        $('.btn.ajax').off('click');

        $('.wt-popover').removeClass('open')

        let player;

        if($(this).attr('player')){
          player = $(this).attr('player');
        }

        const req = {
          action: $(this).attr('value'),
          player: player,
        }

        $.post("/deck", req )
      })

    }



  $(() => {
    // $('.btn.ajax').on('click', function(e){
    //   $('.wt-popover').removeClass('open')
    //
    //   let player;
    //
    //   if($(this).attr('player')){
    //     player = $(this).attr('player');
    //   }
    //
    //   const req = {
    //     action: $(this).attr('value'),
    //     player: player,
    //   }
    //
    //   $.post("/deck", req )
    // })
  })
