(function() {
  let firstCard = null;
  let secondCard = null;
  let count = 8;

  const container = document.getElementById('game');

  function createGameForm() {
    const form = document.createElement('form');
    const label = document.createElement('label');
    const div = document.createElement('div');
    const input = document.createElement('input');
    const button = document.createElement('button');

    form.classList.add('form');
    div.classList.add('input-button__wrapper');
    label.classList.add('label');
    input.classList.add('input');
    button.classList.add('btn', 'go-btn');

    form.id = 'form';
    input.id = 'input';
    label.setAttribute('for', 'input')

    label.textContent = 'Для начала давай выберем количество пар:'
    input.placeholder = 'Введите число от 2 до 10';
    button.textContent = 'Начнём!'
    button.disabled = input.value === '';

    form.append(label);
    div.append(input);
    div.append(button);
    form.append(div);


    function btnDisabled() {
      input.value.trim(' ') === '' ? button.disabled = true : button.disabled = false;
    }
    btnDisabled();
    input.addEventListener('input', btnDisabled);
    document.addEventListener('DOMContentLoaded', function() {

      let gameTitle = createGameTitle();
      let gameBoard = createGameBoard();

      container.append(gameTitle);
      container.append(form);
      container.append(gameBoard);
    });

    form.addEventListener('submit', function(e) {
      e.preventDefault();

      if (!input.value) {
        return;
      }

      if (input.value >= 2 && input.value <= 10) {
        count = input.value;
        startGame(count);
      } else {
        alert('Введите число от 2 до 10');
        input.value = '';
        return;
      }

      input.value = '';
      input.disabled = true;
    });

    return {
      form,
      input,
      button
    };
  }
  createGameForm();

  function createGameTitle() {
    const title = document.createElement('h1');
    title.classList.add('title');
    title.textContent = 'Игра в пары';

    return title;
  }

  function createGameBoard() {
    let board = document.createElement('ul');
    board.classList.add('game-board');
    board.id = 'board';

    return board;
  }

  function startGame(count) {
    function createNumbersArray(count) {
      let numbersArray = [];
      let min = 1;

      for (let i = min; i <= count; i++) {
      numbersArray.push(i);
      numbersArray.push(i);
      }

      return numbersArray;
    }

    function shuffle() {
      const arr = createNumbersArray(count);
      let shuffleArr = [...arr];
      for (let i = shuffleArr.length - 1; i--;) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = shuffleArr[i];
        shuffleArr[i] = shuffleArr[j];
        shuffleArr[j] = temp;
      }
      return shuffleArr;
    }

    const shuffleArr = shuffle();

    let gameForm = document.getElementById('form');
    let gameBoard = document.getElementById('board');

    for (let i = 0; i < shuffleArr.length; i++) {
      gameBoard.append(createGameCard(shuffleArr[i]));
    }

    console.log(shuffleArr);

    let columns = 2;
    switch (count) {
      case '2':
        columns = 2
        break;
      case '3':
        columns = 3
        break;
      case '4':
        columns = 4
        break;
      case '5':
        columns = 5
        break;
      case '6':
        columns = 4
        break;
      case '7':
        columns = 4
        break;
      case '8':
        columns = 4
        break;
      case '9':
        columns = 5
        break;
      case '10':
        columns = 5
        break;
    }
    gameBoard.style = `grid-template-columns: repeat(${columns}, 1fr);`;

    function createGameCard(number) {
      let card = document.createElement('li');
      card.classList.add('card');
      card.textContent = number;

      card.addEventListener('click', function() {
        if (card.classList.contains('open') || card.classList.contains('success')) {
          return;
        }

        if (firstCard !== null && secondCard !== null) {
          firstCard.classList.remove('open');
          secondCard.classList.remove('open');

          firstCard = null;
          secondCard = null;
        }
        card.classList.add('open');

        if (firstCard === null) {
          firstCard = card;
        } else {
          secondCard = card;
        }

        if (firstCard !== null && secondCard !== null) {
          let firstCardNumber = firstCard.textContent;
          let secondCardNumber = secondCard.textContent;
          if (firstCardNumber === secondCardNumber) {
            firstCard.classList.add('success');
            secondCard.classList.add('success');
          }
        }

        if (shuffleArr.length === document.querySelectorAll('.success').length) {
          setTimeout(function() {
            const video = document.getElementById('video');
            const modalOverlay = document.getElementById('modal-overlay');
            const modal = document.getElementById('modal');

            video.style.display = 'block';
            modalOverlay.style.display = 'block';
            modal.style.display = 'block';

            const restartButton = document.getElementById('restart');

            restartButton.addEventListener('click', function() {
              gameBoard.innerHTML = '';

              video.style.display = 'none';
              modalOverlay.style.display = 'none';
              modal.style.display = 'none';

              createGameForm();
              input.disabled = false;
            });
          }, 600);
        }
      });

      return card;
    }

    document.addEventListener('DOMContentLoaded', function() {
      let gameTitle = createGameTitle();

      container.append(gameTitle);
      container.append(gameForm);
      container.append(gameBoard);
    });
  }
})();


