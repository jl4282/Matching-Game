(function(){
  document.getElementById('startButton').addEventListener('click', startGame);
  function startGame() {
    var num = document.getElementById('numSymbols').value;
    if (num <= 0 || num >8){
      num = 8;
    }
    //hide form
    document.getElementById('startForm').classList.toggle('hidden');
    //create game board
    createGameBoard(num);
  }
  function createGameBoard(num){
    var symbols = generateUnicode(num);
    function generateUnicode(num){
      var symbols = ['☀' , '☁' , '☂' , '☃', '★', '☎', '☕', '☘'],
          sym = [];
      while (num > 0){
        var random = Math.floor(Math.random() * (symbols.length - 0)) + 0;
        sym.push(symbols[random]);
        symbols.splice(random, 1);
        num--;
      }
      //double the symbols
      sym = sym.concat(sym);
      //shuffle
      finalSym = [];
      while (sym.length > 0){
        var n = Math.floor(Math.random() * (sym.length - 0)) + 0;
        finalSym.push(sym.splice(n, 1));
      }
      return finalSym;
    }
    function createCards(sym){
      //add score
      document.getElementById('game').appendChild(
        createElement('div', ['score-container'], null, [
          createElement('p', null, 'Score: ',[createElement('span', ['score'], '0')])
      ]));
      for (var i = 0; i < sym.length; i++){
        var card = createElement('div', ['card'], null ,[createElement('p', ['hidden'] ,sym[i])]);
        card.addEventListener('click', cardClick);
        if (checkGrid(sym, i)){
          document.getElementById('game').appendChild(createElement('br'));
        }
        document.getElementById('game').appendChild(card);
      }



      function checkGrid(sym, i){
        if (sym.length > 9 && ((i === 4)||(i === 8)||(i === 12))){
          console.log(sym.length, i);
          return true;
        }
        else if ((sym.length <= 9) && (sym.length > 4) && ((i === 3)||(i === 6)||(i === 9))){
          console.log(sym.length, i);
          return true;
        }
        else if (sym.length <= 4 && (i === 2)){
          return true;
        }
        return false;
      }
    }
    var cards = createCards(symbols);

    function cardClick(evt){
      var pnode;
      var dnode;
      if (evt.path[0].nodeName === 'DIV'){
        pnode = evt.path[0].children[0];
        dnode = evt.path[0];
      }
      else {
        pnode = evt.path[0];
      }
      //check if evt is final or already flipped or already 2 cards flipped
      if (!pnode.classList.contains('final') && !pnode.classList.contains('symbol') && (document.querySelectorAll('.symbol').length < 2)){
        pnode.classList.toggle('symbol');
        pnode.classList.toggle('hidden');
        dnode.classList.toggle('flipped-card');
        //get all flipped cards
        var flipped = document.querySelectorAll('.symbol');
        if (flipped.length === 2){
          //increment number of flips...
          document.querySelector('.score').innerText++;
          //show cards
          if (flipped[0].innerText === flipped[1].innerText){
            flipped[0].classList.toggle('symbol');
            flipped[0].classList.toggle('final');
            flipped[1].classList.toggle('symbol');
            flipped[1].classList.toggle('final');
            //check if all classes have final - 1 because start form is hidden too
            if (document.querySelectorAll('.hidden').length === 1){
              endGame();
            }
          }
          else { //set timout to flip them back
            window.setTimeout(flipBack, 500, flipped[0], flipped[1]);
          }
        }
      }
      function flipBack(card1, card2){
        card1.classList.toggle('symbol');
        card1.classList.toggle('hidden');
        card1.parentNode.classList.toggle('flipped-card');
        card2.classList.toggle('symbol');
        card2.classList.toggle('hidden');
        card2.parentNode.classList.toggle('flipped-card');
      }
      function endGame(){
        var cards = document.querySelectorAll('.card');
        for (var i = cards.length - 1; i >= 0; i--){
          cards[i].parentNode.removeChild(cards[i]);
        }
        document.getElementById('game').appendChild(createElement('p', ['endGame'], 'Your done. Thanks for playing!'));
      }
    }
  }
  function createElement(type, classes, text, children){
    var card = document.createElement(type);
    if (classes){
      for (var i = 0; i < classes.length; i++){
        card.classList.toggle(classes[i]);
      }
    }
    if (text){
      card.appendChild(document.createTextNode(text));
    }
    if (children){
      for (var i = 0; i < children.length; i++){
        card.appendChild(children[i]);
      }
    }
    return card;
  }
})();
