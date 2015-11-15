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
      for (var i = 0; i < sym.length; i++){
        var card = createElement('div', ['card'], null ,[createElement('p', ['symbol','hidden'] ,sym[i])]);
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
    }
    var cards = createCards(symbols);

    function cardClick(evt){
      console.log('card clicked', evt);
      console.log(evt.target.children[0].childNodes[0].nodeValue);
    }
  }
})();
