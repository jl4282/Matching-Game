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
    console.log(num);
  }
  function createGameBoard(num){
    var symbols = generateUnicode(num);

    function generateUnicode(num){
      var symbols = [];
      while (num > 0){
        var sym = Math.floor(Math.random() * (9884 - 9728)) + 9728;
        if (symbols.indexOf(sym) <= 0){
          symbols.push('&#' + sym);
          num--;
        }
      }
      return symbols;
    }
  }
})();
