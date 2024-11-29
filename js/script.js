let boardState = false
let boardrotate = false
let pieceUP = null

let cellNumsTranslate = {
   'a': "1",
   'b': "2",
   'c': "3",
   'd': "4",
   'e': "5",
   'f': "6",
   'g': "7",
   'h': "8"
};

let cellNumsTranslateBack = {
   "1": "a",
   "2": "b",
   "3": "c",
   "4": "d",
   "5": "e",
   "6": "f",
   "7": "g",
   "8": "h"
};

const darkbg = getComputedStyle(document.documentElement).getPropertyValue('--dark-cells').trim()
const whitebg = getComputedStyle(document.documentElement).getPropertyValue('--white-cells').trim()
const cellElements = document.querySelectorAll('.board li')


function figure(cellElement, callback) {
   const pieces = ['wpawn', 'bpawn', 'wbichep', 'bbichep', 'wknight', 'bknight',
      'wrook', 'brook', 'wqueen', 'bqueen', 'wking', 'bking'];

   const found = pieces.find(piece => cellElement.classList.contains(piece));
   return callback(found, cellElement)
}

function removeFigure(found, cellElement) {
   cellElement.classList.remove(found)
}

function returnFigure(found) {
   return found || null;
}

function resetBG() {
   cellElements.forEach(item => item.classList.remove("whitecell", "darkcell"));
   console.log(cellElements);
}

const blackLastRow = ['a1', 'b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1']
const whiteLastRow = ['a8', 'b8', 'c8', 'd8', 'e8', 'f8', 'g8', 'h8']

const Bbicheps = ['bbichep', 'bqueen']
const Brooks = ['bqueen', 'brook']
const Bpawns = ['bpawn']
const Bknights = 'bknight'
const AllBlack = ['bbichep', 'bqueen', 'brook', 'bpawn', 'bknight', 'bking']

const Wbicheps = ['wbichep', 'wqueen']
const Wrooks = ['wqueen', 'wrook']
const Wpawns = ['wpawn']
const Wknights = 'wknight'
const AllWhite = ['wbichep', 'wqueen', 'wrook', 'wpawn', 'wknight', 'wking']

function reset() {

   //white
   //pawns
   document.querySelector('.a2').classList.add('wpawn');
   document.querySelector('.b2').classList.add('wpawn');
   document.querySelector('.c2').classList.add('wpawn');
   document.querySelector('.d2').classList.add('wpawn');
   document.querySelector('.e2').classList.add('wpawn');
   document.querySelector('.f2').classList.add('wpawn');
   document.querySelector('.g2').classList.add('wpawn');
   document.querySelector('.h2').classList.add('wpawn');

   //bicheps
   document.querySelector('.c1').classList.add('wbichep');
   document.querySelector('.f1').classList.add('wbichep');

   //knight
   document.querySelector('.b1').classList.add('wknight');
   document.querySelector('.g1').classList.add('wknight');

   //rook
   document.querySelector('.a1').classList.add('wrook');
   document.querySelector('.h1').classList.add('wrook');

   //queen
   document.querySelector('.d1').classList.add('wqueen');

   //king
   document.querySelector('.e1').classList.add('wking');

   //black
   //pawns
   document.querySelector('.a7').classList.add('bpawn');
   document.querySelector('.b7').classList.add('bpawn');
   document.querySelector('.c7').classList.add('bpawn');
   document.querySelector('.d7').classList.add('bpawn');
   document.querySelector('.e7').classList.add('bpawn');
   document.querySelector('.f7').classList.add('bpawn');
   document.querySelector('.g7').classList.add('bpawn');
   document.querySelector('.h7').classList.add('bpawn');

   //bicheps
   document.querySelector('.c8').classList.add('bbichep');
   document.querySelector('.f8').classList.add('bbichep');

   //knight
   document.querySelector('.b8').classList.add('bknight');
   document.querySelector('.g8').classList.add('bknight');

   //rook
   document.querySelector('.a8').classList.add('brook');
   document.querySelector('.h8').classList.add('brook');

   //queen
   document.querySelector('.d8').classList.add('bqueen');

   //king
   document.querySelector('.e8').classList.add('bking');
}

function pawnendchoise(n) {
   return new Promise((resolve) => {
      let choisemenu;
      let choisebuttons;

      console.log(n);

      if (n) {
         choisemenu = document.querySelector('.wpawnchoise');
         choisebuttons = document.querySelectorAll('.wpawnchoise button');
         console.log('white')
      } else {
         choisemenu = document.querySelector('.bpawnchoise');
         choisebuttons = document.querySelectorAll('.bpawnchoise button');
         console.log('black')
      }

      choisemenu.classList.remove('none');

      choisebuttons.forEach(choisebutton => {
         choisebutton.onclick = () => {
            choisemenu.classList.add('none');
            resolve(choisebutton.name); // Возвращаем значение через resolve
         };
      });
   });
}

function isCheck(kingClasses, color) {
   let kingX = cellNumsTranslate[kingClasses.charAt(0)];
   let kingY = kingClasses.charAt(1);

   let Y = kingY
   let X = kingX

   let ownPieces
   let opponentPieces
   let rooks
   let bicheps
   let pawns
   let knight

   if (color) {
      ownPieces = AllWhite
      opponentPieces = AllBlack
      rooks = Brooks
      bicheps = Bbicheps
      pawns = Bpawns
      knight = 'bknight'

      if ((Y++ < 8) && (X++ < 8)) {
         let checkAnotherClasses = document.querySelector(`.${cellNumsTranslateBack[X]}${Y}`)
         let hasAnyPawn = pawns.some(cls => checkAnotherClasses.classList.contains(cls));
         if (hasAnyPawn) {
            return true
         }
      }

      Y = kingY
      X = kingX

      if ((Y++ < 8) && (X-- > 1)) {
         let checkAnotherClasses = document.querySelector(`.${cellNumsTranslateBack[X]}${Y}`)
         let hasAnyPawn = pawns.some(cls => checkAnotherClasses.classList.contains(cls));
         if (hasAnyPawn) {
            return true
         }
      }
   }
   else {
      ownPieces = AllBlack
      opponentPieces = AllWhite
      rooks = Wrooks
      bicheps = Wbicheps
      pawns = Wpawns
      knight = 'wknight'

      if ((Y-- > 1) && (X++ < 8)) {
         let checkAnotherClasses = document.querySelector(`.${cellNumsTranslateBack[X]}${Y}`)
         let hasAnyPawn = pawns.some(cls => checkAnotherClasses.classList.contains(cls));
         if (hasAnyPawn) {
            return true
         }
      }

      Y = kingY
      X = kingX

      if ((Y-- > 1) && (X-- > 1)) {
         let checkAnotherClasses = document.querySelector(`.${cellNumsTranslateBack[X]}${Y}`)
         let hasAnyPawn = pawns.some(cls => checkAnotherClasses.classList.contains(cls));
         if (hasAnyPawn) {
            return true
         }
      }
   }

   Y = kingY
   X = kingX

   while (Y++ < 8) {
      // console.log(X, Y)

      let checkAnotherClasses = document.querySelector(`.${cellNumsTranslateBack[X]}${Y}`)
      let hasOwnPieces = ownPieces.some(cls => checkAnotherClasses.classList.contains(cls))
      if (hasOwnPieces) break
      let hasOpponentPieces = opponentPieces.some(cls => checkAnotherClasses.classList.contains(cls));
      if (hasOpponentPieces) {
         let hasAnyRook = rooks.some(cls => checkAnotherClasses.classList.contains(cls));
         if (hasAnyRook) {
            return true
         } else break
      }
   }

   Y = kingY
   X = kingX

   while (Y-- > 1) {
      // console.log(X, Y)

      let checkAnotherClasses = document.querySelector(`.${cellNumsTranslateBack[X]}${Y}`)
      let hasOwnPieces = ownPieces.some(cls => checkAnotherClasses.classList.contains(cls))
      if (hasOwnPieces) break
      let hasOpponentPieces = opponentPieces.some(cls => checkAnotherClasses.classList.contains(cls));
      if (hasOpponentPieces) {
         let hasAnyRook = rooks.some(cls => checkAnotherClasses.classList.contains(cls));
         if (hasAnyRook) {
            return true
         } else break
      }
   }

   Y = kingY
   X = kingX

   while (X-- > 1) {
      // console.log(X, Y)

      let checkAnotherClasses = document.querySelector(`.${cellNumsTranslateBack[X]}${Y}`)
      let hasOwnPieces = ownPieces.some(cls => checkAnotherClasses.classList.contains(cls))
      if (hasOwnPieces) break
      let hasOpponentPieces = opponentPieces.some(cls => checkAnotherClasses.classList.contains(cls));
      if (hasOpponentPieces) {
         let hasAnyRook = rooks.some(cls => checkAnotherClasses.classList.contains(cls));
         if (hasAnyRook) {
            return true
         } else break
      }
   }

   Y = kingY
   X = kingX

   while (X++ < 8) {
      // console.log(X, Y)

      let checkAnotherClasses = document.querySelector(`.${cellNumsTranslateBack[X]}${Y}`)
      let hasOwnPieces = ownPieces.some(cls => checkAnotherClasses.classList.contains(cls))
      if (hasOwnPieces) break
      let hasOpponentPieces = opponentPieces.some(cls => checkAnotherClasses.classList.contains(cls));
      if (hasOpponentPieces) {
         let hasAnyRook = rooks.some(cls => checkAnotherClasses.classList.contains(cls));
         if (hasAnyRook) {
            return true
         } else break
      }
   }

   Y = kingY
   X = kingX
   // console.log('recycle')
   // console.log(`x: ${X} y: ${Y}`)
   while ((X++ < 8) && (Y++ < 8)) {
      let checkAnotherClasses = document.querySelector(`.${cellNumsTranslateBack[X]}${Y}`)
      let hasOwnPieces = ownPieces.some(cls => checkAnotherClasses.classList.contains(cls))
      if (hasOwnPieces) break
      let hasOpponentPieces = opponentPieces.some(cls => checkAnotherClasses.classList.contains(cls));
      if (hasOpponentPieces) {
         let hasAnyBichep = bicheps.some(cls => checkAnotherClasses.classList.contains(cls));
         if (hasAnyBichep) {
            return true
         } else break
      }
   }

   Y = kingY
   X = kingX

   while ((X++ < 8) && (Y-- > 1)) {
      let checkAnotherClasses = document.querySelector(`.${cellNumsTranslateBack[X]}${Y}`)
      let hasOwnPieces = ownPieces.some(cls => checkAnotherClasses.classList.contains(cls))
      if (hasOwnPieces) break
      let hasOpponentPieces = opponentPieces.some(cls => checkAnotherClasses.classList.contains(cls));
      if (hasOpponentPieces) {
         let hasAnyBichep = bicheps.some(cls => checkAnotherClasses.classList.contains(cls));
         if (hasAnyBichep) {
            return true
         } else break
      }
   }

   Y = kingY
   X = kingX

   while ((X-- > 1) && (Y++ < 8)) {
      let checkAnotherClasses = document.querySelector(`.${cellNumsTranslateBack[X]}${Y}`)
      let hasOwnPieces = ownPieces.some(cls => checkAnotherClasses.classList.contains(cls))
      if (hasOwnPieces) break
      let hasOpponentPieces = opponentPieces.some(cls => checkAnotherClasses.classList.contains(cls));
      if (hasOpponentPieces) {
         let hasAnyBichep = bicheps.some(cls => checkAnotherClasses.classList.contains(cls));
         if (hasAnyBichep) {
            return true
         } else break
      }
   }

   Y = kingY
   X = kingX

   while ((X-- > 1) && (Y-- > 1)) {
      let checkAnotherClasses = document.querySelector(`.${cellNumsTranslateBack[X]}${Y}`)
      let hasOwnPieces = ownPieces.some(cls => checkAnotherClasses.classList.contains(cls))
      if (hasOwnPieces) break
      let hasOpponentPieces = opponentPieces.some(cls => checkAnotherClasses.classList.contains(cls));
      if (hasOpponentPieces) {
         let hasAnyBichep = bicheps.some(cls => checkAnotherClasses.classList.contains(cls));
         if (hasAnyBichep) {
            return true
         } else break
      }
   }

   Y = kingY
   X = kingX

   if ((+Y < 7) && (+X < 8)) {
      let checkAnotherClasses = document.querySelector(`.${cellNumsTranslateBack[+X + 1]}${+Y + 2}`);
      let hasAnyKnight = checkAnotherClasses && checkAnotherClasses.classList.contains(knight);
      if (hasAnyKnight) {
         return true;
      }
   }

   Y = kingY
   X = kingX

   if ((+Y < 8) && (+X < 7)) {
      let checkAnotherClasses = document.querySelector(`.${cellNumsTranslateBack[+X + 2]}${+Y + 1}`);
      let hasAnyKnight = checkAnotherClasses && checkAnotherClasses.classList.contains(knight);
      if (hasAnyKnight) {
         return true;
      }
   }

   Y = kingY
   X = kingX

   if ((+Y > 1) && (+X < 7)) {
      let checkAnotherClasses = document.querySelector(`.${cellNumsTranslateBack[+X + 2]}${+Y - 1}`);
      let hasAnyKnight = checkAnotherClasses && checkAnotherClasses.classList.contains(knight);
      if (hasAnyKnight) {
         return true;
      }
   }

   Y = kingY
   X = kingX

   if ((+Y > 2) && (+X < 8)) {
      let checkAnotherClasses = document.querySelector(`.${cellNumsTranslateBack[+X + 1]}${+Y - 2}`);
      let hasAnyKnight = checkAnotherClasses && checkAnotherClasses.classList.contains(knight);
      if (hasAnyKnight) {
         return true;
      }
   }

   Y = kingY
   X = kingX

   if ((+Y > 2) && (+X > 1)) {
      let checkAnotherClasses = document.querySelector(`.${cellNumsTranslateBack[+X - 1]}${+Y - 2}`);
      let hasAnyKnight = checkAnotherClasses && checkAnotherClasses.classList.contains(knight);
      if (hasAnyKnight) {
         return true;
      }
   }

   Y = kingY
   X = kingX

   if ((+Y > 1) && (+X > 2)) {
      let checkAnotherClasses = document.querySelector(`.${cellNumsTranslateBack[+X - 2]}${+Y - 1}`);
      let hasAnyKnight = checkAnotherClasses && checkAnotherClasses.classList.contains(knight);
      if (hasAnyKnight) {
         return true;
      }
   }

   Y = kingY
   X = kingX

   if ((+Y < 8) && (+X > 2)) {
      let checkAnotherClasses = document.querySelector(`.${cellNumsTranslateBack[+X - 2]}${+Y + 1}`);
      let hasAnyKnight = checkAnotherClasses && checkAnotherClasses.classList.contains(knight);
      if (hasAnyKnight) {
         return true;
      }
   }

   Y = kingY
   X = kingX

   if ((+Y < 7) && (+X > 1)) {
      let checkAnotherClasses = document.querySelector(`.${cellNumsTranslateBack[+X - 1]}${+Y + 2}`);
      let hasAnyKnight = checkAnotherClasses && checkAnotherClasses.classList.contains(knight);
      if (hasAnyKnight) {
         return true;
      }
   }

   return false
}

reset()

cellElements.forEach(function (cellElement) {
   cellElement.addEventListener('click', function () {
      const realbg = window.getComputedStyle(cellElement).backgroundColor

      if (!pieceUP) {
         pieceUP = figure(cellElement, returnFigure)
         cellElement.classList.remove(pieceUP)
         cellElement.classList.remove('wkingChecked')
         cellElement.classList.remove('bkingChecked')
         follower.classList.add(pieceUP)
         document.body.style.cursor = 'grabbing';
         resetBG()

      } else {
         figure(cellElement, removeFigure)
         console.log(typeof pieceUP)
         if ((pieceUP == 'bpawn') && (blackLastRow.some(cls => cellElement.classList.contains(cls)))) {
            // pieceUP = 'bqueen'
            // pieceUP = pawnendchoise(0)
            pawnendchoise(false).then(choice => {
               cellElement.classList.remove('bpawn');
               cellElement.classList.add(choice);
               console.log(`Код после выбора пользователя ${choice}`);
               pieceUP = null
               // follower.classList.remove(figure(cellElement, returnFigure))
               follower.classList.remove(...follower.classList);
               // console.log(figure(cellElement, returnFigure))
               document.body.style.cursor = 'default';
               let Wking = document.querySelector('.wking')
               let Bking = document.querySelector('.bking')
               let WkingClasses = Wking.className
               let BkingClasses = Bking.className
               if (isCheck(WkingClasses, 1)) {
                  Wking.classList.add('wkingChecked')
               } else {
                  Wking.classList.remove('wkingChecked')
               }

               if (isCheck(BkingClasses, 0)) {
                  Bking.classList.add('bkingChecked')
               } else {
                  Bking.classList.remove('bkingChecked')
               }
            });
         } else if ((pieceUP == 'wpawn') && (whiteLastRow.some(cls => cellElement.classList.contains(cls)))) {
            // pieceUP = 'wqueen'
            // pieceUP = pawnendchoise(1)
            pawnendchoise(true).then(choice => {
               cellElement.classList.remove('wpawn');
               cellElement.classList.add(choice);
               console.log(`Код после выбора пользователя ${choice}`);
               pieceUP = null
               // follower.classList.remove(figure(cellElement, returnFigure))
               follower.classList.remove(...follower.classList);
               // console.log(figure(cellElement, returnFigure))
               document.body.style.cursor = 'default';
               let Wking = document.querySelector('.wking')
               let Bking = document.querySelector('.bking')
               let WkingClasses = Wking.className
               let BkingClasses = Bking.className
               if (isCheck(WkingClasses, 1)) {
                  Wking.classList.add('wkingChecked')
               } else {
                  Wking.classList.remove('wkingChecked')
               }

               if (isCheck(BkingClasses, 0)) {
                  Bking.classList.add('bkingChecked')
               } else {
                  Bking.classList.remove('bkingChecked')
               }
            });
         }
         // pieceUP = 'wqueen'
         // console.log(pieceUP)
         // follower.classList.remove(figure(cellElement, returnFigure))
         // console.log(figure(cellElement, returnFigure))
         cellElement.classList.add(pieceUP)
         pieceUP = null
         // follower.classList.remove(figure(cellElement, returnFigure))
         follower.classList.remove(...follower.classList);
         // console.log(figure(cellElement, returnFigure))
         document.body.style.cursor = 'default';
         let Wking = document.querySelector('.wking')
         let Bking = document.querySelector('.bking')
         let WkingClasses = Wking.className
         let BkingClasses = Bking.className
         if (isCheck(WkingClasses, 1)) {
            Wking.classList.add('wkingChecked')
         } else {
            Wking.classList.remove('wkingChecked')
         }

         if (isCheck(BkingClasses, 0)) {
            Bking.classList.add('bkingChecked')
         } else {
            Bking.classList.remove('bkingChecked')
         }

      }

      if (realbg == darkbg) {
         cellElement.classList.add('darkcell')
         // console.log('darkcell')
      }
      else if (realbg == whitebg) {
         cellElement.classList.add('whitecell')
         // console.log('whitecell')
      }
      else {
         cellElement.classList.remove('whitecell', 'darkcell')
      }
   });
});

const follower = document.getElementById('cursor');
const board = document.querySelector('.board')

follower.style.width = ((parseFloat(getComputedStyle(board).width) / 8) + 'px');

document.addEventListener('mousemove', (event) => {
   follower.style.left = (event.clientX) + 'px';
   follower.style.top = (event.clientY) + 'px';
});

window.addEventListener('resize', function () {
   follower.style.width = ((parseFloat(getComputedStyle(board).width) / 8) + 'px');
});

function showInfo() {
   alert(
      `Инструкция к сайту
      
"-" — развернуть на весь экран
"Esc" — свернуть
"=" — перевернуть доску
"Tab" — открыть снова это окно
      
Курсор перекрашен в цвет фона вне области доски, чтобы не мешать наблюдением за партией

GitHub: Catsker`)
}

// setTimeout(showInfo, 500)


//Настройка игрока
const playerNames = document.querySelectorAll('.playerName')

document.addEventListener('keydown', function (event) {
   if (event.key == 'Tab') {
      event.preventDefault();
      showInfo()
   }
})

playerNames.forEach(function (playerName) {
   playerName.addEventListener('keydown', function () {
      playerName.ariaPlaceholder = playerName.value
   })
})


function openFullscreen() {
   const elem = document.documentElement;

   if (elem.requestFullscreen) {
      elem.requestFullscreen();
   } else if (elem.webkitRequestFullscreen) { // Safari
      elem.webkitRequestFullscreen();
   } else if (elem.msRequestFullscreen) { // IE11
      elem.msRequestFullscreen();
   }
}

// Вызвать функцию можно по клику на кнопку или другому событию
document.addEventListener('keydown', function (event) {
   if (event.key == '-') {
      openFullscreen()
   }
});






document.querySelectorAll('.ava').forEach(container => {
   const dropZone = container.querySelector('.drop-zone');
   const imageInput = container.querySelector('.file-input');
   const preview = container.querySelector('.preview-image');

   // Обработка клика по зоне
   dropZone.addEventListener('click', () => {
      imageInput.click();
   });

   // Обработка выбора файла через input
   imageInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
         handleFile(file, dropZone, preview);
      }
   });

   // Обработка drag&drop
   dropZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropZone.classList.add('dragover');
   });

   dropZone.addEventListener('dragleave', () => {
      dropZone.classList.remove('dragover');
   });

   dropZone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropZone.classList.remove('dragover');

      const files = e.dataTransfer.files;
      if (files.length) {
         handleFile(files[0], dropZone, preview);
      }
   });
});

function handleFile(file, dropZone, preview) {
   if (!file.type.startsWith('image/')) {
      alert('Пожалуйста, выберите изображение');
      return;
   }

   const reader = new FileReader();

   reader.onload = function (e) {
      preview.src = e.target.result;
      preview.style.display = 'block';
      dropZone.style.display = 'none';
   }

   reader.readAsDataURL(file);
}

//deskrotate
const boardLines = document.querySelectorAll('.board ul')
const boardCover = document.querySelector('.board-cover')

document.addEventListener('keydown', function (event) {
   if (event.key == '=') {
      boardLines.forEach(function (boardLine) {
         boardLine.classList.toggle('reverseHor')
      })
      board.classList.toggle('reverseVert')
      boardCover.classList.toggle('reverseVert')
   }

});

