window.onload = function() {
  const holes = document.querySelectorAll(".hole");
  const scoreBoard = document.querySelector(".score");
  const moles = document.querySelectorAll(".mole");
  const startBtn = document.getElementById("start_btn");
  let titleH1 = document.getElementById("title");

  let lastHole;
  let timeUp = false;
  let score = 0;
  let gameTime = 10000;

  startBtn.addEventListener( "click", function() {
      showBtnAnimation();
      startGame();
    }, false);

  function showBtnAnimation() {
    event.preventDefault();

    startBtn.classList.add("animate");
    // 按钮动画延时，按钮动画结束后发生的事：换为正常状态（class中的animate去掉），开始按钮消失
    setTimeout(() => {
      startBtn.classList.remove("animate");
      startBtn.style.display = "none";
    }, 700);
  }

  function startGame() {
    resetScoreAndTime();

    var intervalID = setInterval(peep, 800);
    setTimeout(_ => {
      clearInterval(intervalID);
    }, gameTime - 500);

    setTimeout(_ => {
      startBtn.style.display = "inline-block";
      startBtn.innerText = "Replay!";
      titleH1.innerHTML = "TimeUp! ";
      startBtn.disabled = false;
      timeUp = true;
    }, gameTime);
  }

  function peep() {
    const time = randomTime(200, 1000);
    const holeIndex = randomHole(holes);
    comeOutAndStop(holeIndex, time);
  }

  function resetScoreAndTime() {
    score = 0;
    scoreBoard.innerText = 0;
    startBtn.innerText = "Start!";
    titleH1.innerText = "WHACK-A-MOLE! ";
  }

  function randomTime(min, max) {
    return min + Math.random() * max;
  }

  function randomHole(holes) {
    var holeIndex = "hole" + Math.ceil(Math.random() * 6);
    if (holeIndex === lastHole) {
      return randomHole(holes);
    }
    return holeIndex;
  }

  function comeOutAndStop(holeIndex, time) {
    lastHole = holeIndex;
    var hole = document.querySelector(`.${holeIndex}`);
    hole.classList.add("up");
    setTimeout(_ => {
      hole.classList.remove("up");
    }, time);
  }

  moles.forEach(mole =>
    mole.addEventListener("click", function(event) {
      var target = event.target;
      var hole = target.parentNode;
      if (hole.classList.contains("up")) {
        scoreBoard.innerText = ++score;
        hole.classList.remove("up");
      }
    })
  );
};
