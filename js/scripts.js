document.addEventListener( "DOMContentLoaded", function(){
  document.removeEventListener( "DOMContentLoaded", arguments.callee, false );

  let
      mainClass = '.box',
      boxes = [],
      title = document.getElementById('title'),
      arr = [],
      numOfClicks,
      tried = 0,
      success = 0,
      priseIndex,
      numberOfBoxes = 3;

  function getFakeTargetIndex(avoidIndex, maxIndex) {
    let fakeIndex;

    do {
      fakeIndex = Math.floor(Math.random() * maxIndex);
    } while (fakeIndex === avoidIndex);

    return fakeIndex;
  }

  function addListeners(thisIndex) {
    boxes[thisIndex].addEventListener('click', (e) => {
      if (/(miss|hit)/.test(boxes[thisIndex].className)) return;

      if (numOfClicks < 1) {
        numOfClicks++;
        e.target.className += ' select';
        title.className += ' select';
        selectedIndex = thisIndex;

        setTimeout(() => {
          const fakeIndex = thisIndex === priseIndex ? getFakeTargetIndex(thisIndex, boxes.length) : thisIndex;
          for (let i = 0; i < boxes.length; i++) {
            if (arr[i] === false && i !== fakeIndex && i !== thisIndex) {
              boxes[i].className += ' miss';
            }
          }
        }, 200);
      } else if (numOfClicks < 2) {
        tried++;
        numOfClicks++;

        if (thisIndex === priseIndex) {
          success++;
          title.className += ' success';
          e.target.className += ' hit';
        } else {
          title.className = ' miss';
          e.target.className += ' miss';
          boxes[priseIndex].className += ' hit';
        }

        title.innerHTML = `You tried ${tried} time${tried === 1 ? '' : 's'} and ${success} time${success === 1 ? '' : 's'} successfully (accuracy is ${(success / tried * 100).toFixed(2)}%)`;

        setTimeout(startMontyHall, 1000);
      }
    });
  }

  function start() {
    boxes = document.querySelectorAll(mainClass);
    priseIndex = Math.floor(boxes.length * Math.random());
    numOfClicks = 0;
    title.className = '';
    selectedIndex = -1;
    arr = new Array(boxes.length);

    for (let i = 0; i < boxes.length; i++) {
      boxes[i].className = 'box';

      addListeners(i);

      arr[i] = priseIndex === i;
    }
  }

  window.startMontyHall = (n = numberOfBoxes) => {
    n = parseInt(n, 10);
    numberOfBoxes = n;
    const boxHolder = document.querySelector('.box-holder');
    boxHolder.innerHTML = '';
    boxHolder.innerHTML = new Array(n).fill('<div class="box"></div>').join('');
    start();
  }

  document.getElementById('boxes-count').addEventListener('change', (e) => {
    title.innerHTML = '';
    tried = 0;
    success = 0;

    startMontyHall(e.target.value);
  });

  startMontyHall();
}, false );
