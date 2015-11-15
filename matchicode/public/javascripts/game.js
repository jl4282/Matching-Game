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
      return sym.concat(sym);
    }
    function createCards(sym){
      for (var i = 0; i < sym.length; i++){
        var card = createElement('div', 'card', null ,[createElement('p', 'symbol' ,sym[i])]);
        card.addEventListener('click', cardClick);
        document.getElementById('game').appendChild(card);
      }



      function createElement(type, classes, text, children){
        var card = document.createElement(type);
        if (classes){
         card.classList.toggle(classes);
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
    }
    var cards = createCards(symbols);

    function cardClick(evt){
      console.log('card clicked');
    }
  }
})();
