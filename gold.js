var canvas = document.getElementsByTagName("canvas")[0];
canvas.width = 800;
canvas.height = 500;
var ctx = canvas.getContext("2d");
var timer_update;
var game_end = false;
var game_pause = false;
var players = [];
var gold_arr = [];
var bomb_arr = [];
var price = [];
var goal = 200;
var level = 1;
var mode;
var in_shop = false;
var time_limit;
var time_all = 60;
var total_money = 0;
var pause_num = 0;
var pause_time = 0;
var timer_pause_animation;
var x_explode;
var y_explode;
var explodeRatius;
var isExploding = false;
var money_size = 20;
var money_status = 0;
var money_value = 0;
var money_pos_x = 700;
var money_pos_y = 30;
var catching_object = 0;
var catching_object1 = 0;
var isBombing_arr = [];
var name = document.getElementById("name");
var mapCanvas = document.getElementById("mapCanvas");
var gameLines = document.getElementById("gameLines");
var gameBoard = document.getElementById("gameBoard");
var gameStart = document.getElementById("gameStart");
var gameHelp = document.getElementById("gameHelp");
var gameAbout = document.getElementById("gameAbout");
var gameQuit = document.getElementById("gameQuit");
var gameMode = document.getElementById("gameMode");
var singleMode = document.getElementById("singleMode");
var pairMode = document.getElementById("pairMode");
var nextLevel = document.getElementById("nextLevel");
var enhanceStrength = document.getElementById("enhanceStrength");
var fourLeaf = document.getElementById("fourLeaf");
var addStoneValue = document.getElementById("addStoneValue");
var addDiamondValue = document.getElementById("addDiamondValue");
var bom = document.getElementById("bom");
var bomPrice = document.getElementById("bomPrice");
var enhancePrice = document.getElementById("enhancePrice");
var leafPrice = document.getElementById("leafPrice");
var stonePrice = document.getElementById("stonePrice");
var diamondPrice = document.getElementById("diamondPrice");
var gameLoseBoard = document.getElementById("gameLoseBoard");
var gameLose = document.getElementById("gameLose");
var score = document.getElementById("score");
var restart = document.getElementById("restart");
var key_W = document.getElementById("key_W");
var key_S = document.getElementById("key_S");
var key_up = document.getElementById("key_up");
var key_down = document.getElementById("key_down");
var exit_level = document.getElementById("exit_level");
var pause = document.getElementById("pause");
var pause_animation = document.getElementById("pause_animation");
var money = document.getElementById("money");
var shopName = document.getElementById("shopName");
var bg = document.getElementById("bg");

var BGM = document.getElementById("BGM");
var intro = document.getElementById("intro");
var deathAudio = document.getElementById("death");
var explodeAudio = document.getElementById("explode");
var cursor = document.getElementById("cursor");

let gameFrame;

// var startX;
// var startY;
var angleCurrent;

function init() {
  //初始化函数
  // gameBoard.style.left = ((window.innerWidth - 720) / 2).toString() + 'px';
  // gameBoard.style.top = ((window.innerHeight - 510) / 2).toString() + 'px';
  // intro.play();
  gameFrame++;
  time_all = 60;
  players.splice(0, players.length);
  key_W.style.display = "none";
  key_S.style.display = "none";
  key_up.style.display = "none";
  key_down.style.display = "none";
  //key_W.style.left = 180;
  gameLoseBoard.style.display = "none";
  gameLose.style.display = "none";
  score.style.display = "none";
  restart.style.display = "none";
  nextLevel.style.display = "none";
  enhanceStrength.style.display = "none";
  fourLeaf.style.display = "none";
  addStoneValue.style.display = "none";
  addDiamondValue.style.display = "none";
  bom.style.display = "none";
  bomPrice.style.display = "none";
  enhancePrice.style.display = "none";
  leafPrice.style.display = "none";
  stonePrice.style.display = "none";
  diamondPrice.style.display = "none";
  canvas.style.display = "none";
  exit_level.style.display = "none";
  pause.style.display = "none";
  pause_animation.style.display = "none";
  money.style.display = "none";
  shopName.style.display = "none";
  //  key_W.style.left = canvas.width/2;
  bg.style.backgroundImage = "url(img/open.jpg)";
  bg.style.opacity = 0.7;
  //   gameBoard.style.backgroundColor = '#8D8DD4';
  gameWords.style.lineHeight = "450px";
  gameWords.style.fontSize = 70;
  gameWords.style.color = "#472226";
  gameWords.innerHTML = "<h2>欢迎进入黄鸡矿工的世界</h2>";
  gameWords.style.display = "block";
  setTimeout("openWords()", 1000); //开场文字
}
function openWords() {
  gameWords.style.opacity = 0.9;
  setTimeout("closeWords()", 1000); //关闭开场文字
}
function closeWords() {
  gameWords.style.opacity = 0;
  setTimeout("closeWordsWait()", 1000); //显示主界面
}
function closeWordsWait() {
  var name = document.getElementById("name");
  name.style.display = "block";
  gameStart.style.display = "block";
  gameHelp.style.display = "block";
  gameAbout.style.display = "block";
  gameQuit.style.display = "block";
  gameWords.style.lineHeight = "450px";
  gameWords.style.display = "none";
  name.style.opacity = 0;
  gameStart.style.opacity = 0;
  gameHelp.style.opacity = 0;
  gameAbout.style.opacity = 0;
  gameQuit.style.opacity = 0;
  setTimeout("setgameBoard()", 1000);
}
function setgameBoard() {
  //打开游戏面板
  var name = document.getElementById("name");

  name.style.opacity = 1;
  gameStart.style.opacity = 1;
  gameHelp.style.opacity = 1;
  gameAbout.style.opacity = 1;
  gameQuit.style.opacity = 1;
}
gameStart.onclick = function () {
  var name = document.getElementById("name");
  name.style.display = "none";
  gameStart.style.display = "none";
  gameHelp.style.display = "none";
  gameAbout.style.display = "none";
  gameQuit.style.display = "none";
  singleMode.style.display = "block";
  pairMode.style.display = "block";
  name.style.display = "block";
  name.style.opacity = 0;
  singleMode.style.opacity = 0;
  pairMode.style.opacity = 0;
  setTimeout("chooseModeBoard()", 1000);
};
function chooseModeBoard() {
  //模式选择面板
  var name = document.getElementById("name");
  name.style.opacity = 1;
  singleMode.style.opacity = 1;
  pairMode.style.opacity = 1;
  mapCanvas.style.display = "none";
  gameWords.style.lineHeight = "450px";
  gameWords.style.display = "none";
}
singleMode.onclick = function () {
  var name = document.getElementById("name");
  name.style.display = "none";
  singleMode.style.display = "none";
  pairMode.style.display = "none";
  mode = 0;
  initGameGradient();
  intro.pause();
};
pairMode.onclick = function () {
  var name = document.getElementById("name");
  name.style.display = "none";
  singleMode.style.display = "none";
  pairMode.style.display = "none";
  mode = 1;
  initGameGradient();
  intro.pause();
};
gameHelp.onclick = function () {
  var name = document.getElementById("name");
  gameWords.style.lineHeight = "60px";
  gameWords.innerHTML =
    '<br>帮助<br><br>单人模式：上/W键炸弹，下/S键钩取 <br> 双人模式：左边上键炸弹，下键钩取; 右边W键炸弹，S键钩取<br><br><br><div id = "back" style = "position: relative; ">返回</div>';
  gameWords.style.display = "block";
  gameWords.style.opacity = 1;
  name.style.display = "none";
  gameStart.style.display = "none";
  gameHelp.style.display = "none";
  gameAbout.style.display = "none";
  gameQuit.style.display = "none";

  var gameBack = document.getElementById("back");
  gameBack.onclick = function () {
    closeWordsWait();
  };
  gameBack.onmousemove = moveTo;
  gameBack.onmouseleave = leaveFrom;
};
gameAbout.onclick = function () {
  gameWords.innerHTML =
    '<br>关于<br><br>这是一个效仿黄金矿工的小游戏，欢迎试玩后提供反馈意见。<br>打赏请联系wjc，有bug请联系joy。<br><br><br><div id = "back" style = "position: relative;">返回</div>';
  var name = document.getElementById("name");
  gameWords.style.lineHeight = "60px";
  gameWords.style.display = "block";
  gameWords.style.opacity = 1;
  name.style.display = "none";
  gameStart.style.display = "none";
  gameHelp.style.display = "none";
  gameAbout.style.display = "none";
  gameQuit.style.display = "none";

  var gameBack = document.getElementById("back");
  gameBack.onclick = function () {
    closeWordsWait();
  };
  gameBack.onmousemove = moveTo;
  gameBack.onmouseleave = leaveFrom;
};
gameQuit.onclick = function () {
  window.close();
};
function initGameGradient() {
  gameWords.style.display = "none";
  mapCanvas.style.display = "block";
  gameLines.style.display = "block";
  key_W.style.display = "block";
  exit_level.style.display = "block";
  pause.style.display = "block";
  key_S.style.display = "block";
  key_up.style.display = "block";
  key_down.style.display = "block";
  key_W.innerHTML = "W";
  key_S.innerHTML = "S";
  key_up.innerHTML = "up";
  key_down.innerHTML = "down";
  key_W.style.opacity = 0;
  exit_level.style.opacity = 0;
  pause.style.opacity = 0;
  key_S.style.opacity = 0;
  key_up.style.opacity = 0;
  key_down.style.opacity = 0;
  mapCanvas.style.opacity = 0;

  setTimeout("initGame()", 500);
}
function initGame() {
  // setTimeout("BGM.play()", 1000);
  mapCanvas.style.opacity = 1;
  key_W.style.opacity = 0;
  key_S.style.opacity = 0;
  key_up.style.opacity = 0;
  key_down.style.opacity = 0;
  exit_level.style.opacity = 0;
  pause.style.opacity = 0;
  if (mode == 0) players.push(new player(0));
  else {
    for (var i = 0; i < 2; i++) players.push(new player(i));
  }
  level = 1;
  total_money = 0;
  createLevel(level);
  // timer_update = setInterval(timeUpdate, 100);
}

async function createLevel(level) {
  function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const mouse_down = function async(event) {
    event.preventDefault();

    const startX = parseInt(event.clientX);

    const startY = parseInt(event.clientY);
    console.log("startX, startY", startX, startY);

    const disX = startX - canvas.width / 2;
    const disY = startY - 120;
    angleCurrent = (Math.atan2(disY, disX) * 180) / Math.PI;

    console.log("angle", angleCurrent);
  };

  canvas.onmousedown = await mouse_down;

  const listen = changeListenerFactory();
  listen(
    () => angleCurrent,
    () => {
      console.log("mememe", angleCurrent);
    }
  );

  console.log("Goc1", angleCurrent);

  mapCanvas.style.opacity = 1;
  key_W.style.opacity = 0;
  key_S.style.opacity = 0;
  key_up.style.opacity = 0;
  key_down.style.opacity = 0;
  exit_level.style.opacity = 0;
  pause.style.opacity = 0;
  pause_num = 0;
  timer_update = setInterval(timeUpdate, 100);

  for (var i = 0; i < players.length; i++) {
    players[i].hook.status = 0;
    if (players[i].hook.object) {
      players[i].hook.object.x = -100;
      players[i].hook.object.y = -100;
      players[i].hook.object.moveSpeed = 0;
      players[i].hook.object = 0;
    }

    if (angleCurrent) {
      players[i].hook.angle = angleCurrent;
    }

    players[i].hook.x = players[i].x + players[i].width / 2;
    players[i].hook.y = 130;

    players[i].hook.rotateSpeed = -5;
    if (players[0].enhanceStrength) players[i].hook.moveSpeed = 20;
    else players[i].hook.moveSpeed = 10;
  }
  switch (level) {
    case 1:
      {
        bg.style.backgroundImage = "url(img/bg1.jpg)";
        // goal = 700;
        gold_arr.splice(0, gold_arr.length);
        gold_arr.push(new gold(700, 350, 1));
        gold_arr.push(new gold(600, 200, 1));
        gold_arr.push(new gold(450, 350, 1));
        gold_arr.push(new gold(550, 400, 1));
        gold_arr.push(new gold(350, 200, 1));
        gold_arr.push(new gold(150, 300, 1));
      }
      break;
  }

  canvas.onclick = function () {
    if (!game_end && !game_pause) {
      if (mode == 1) {
        if (players[1].hook.status == 0) {
          players[1].hook.status = 1;
          timeUpdate();
        }
      } else {
        if (players[0].hook.status == 0) {
          players[0].hook.status = 1;
          timeUpdate();
        }
      }
    }
  };
  window.onclick = function (e) {
    if (mode == 1) {
      if (players[1].hook.status == 0) {
        players[1].hook.status = 1;
        timeUpdate();
        e.preventDefault();
      }
    } else {
      if (players[0].hook.status == 0) {
        players[0].hook.status = 1;
        timeUpdate();
        e.preventDefault();
      }
    }
  };
  time_limit = setInterval(function () {
    time_all++;
  }, 1000);
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
function draw_all() {
  if (!in_shop) {
    clearCanvas();
    for (var i = 0; i < gold_arr.length; i++)
      if (gold_arr[i].owner == 0) gold_arr[i].draw();

    for (var i = 0; i < players.length; i++) {
      players[i].draw();

      if (players[i].hook.object) {
        players[i].hook.object.draw();
      }
      players[i].hook.draw();
    }

    if (isExploding == true) {
      explodeRatius += 5;

      var bombExplode = new Image();
      bombExplode.src = "img/bombExplode.png";
      ctx.drawImage(
        bombExplode,
        x_explode - 30,
        y_explode - 30,
        explodeRatius,
        explodeRatius
      );
    }

    for (var i = 0; i < players.length; i++)
      if (players[i].hook.money_status != 0) {
        console.log(players[i].hook.money_status);
        if (players[i].hook.money_status == 1) {
          players[i].hook.money_size += 2;
          players[i].hook.money_pos_x -= 9;
          players[i].hook.money_pos_y -= 5;
          ctx.fillStyle = "gray";
        } else if (players[i].hook.money_status == 3) {
          players[i].hook.money_size -= 2;
          players[i].hook.money_pos_x -= 8;
          players[i].hook.money_pos_y -= 5;
          ctx.fillStyle = "gray";
        }
      }
  }
}

function check_all() {
  if (time_all == 0) check_money();
  for (var i = 0; i < players.length; i++) {
    players[i].hook.check();
  }
  check_hook_catch_object();
}
function check_money() {
  clearInterval(time_limit);
  for (var i = 0; i < players.length; i++)
    if (players[i].hook.money_status == 0) {
      if (total_money >= goal) {
      } else {
        endCanvas();
      }
    }
}
function check_hook_catch_object() {
  for (var i = 0; i < gold_arr.length; i++) {
    for (var j = 0; j < players.length; j++) {
      if (
        Math.sqrt(
          (gold_arr[i].x - players[j].hook.x) *
            (gold_arr[i].x - players[j].hook.x) +
            (gold_arr[i].y - players[j].hook.y) *
              (gold_arr[i].y - players[j].hook.y)
        ) < gold_arr[i].r &&
        players[j].hook.status == 1 &&
        players[j].hook.moveSpeed > 0 &&
        gold_arr[i].owner == 0
      ) {
        gold_arr[i].x =
          players[j].hook.x +
          gold_arr[i].r * Math.cos((players[j].hook.angle * Math.PI) / 180);
        gold_arr[i].y =
          players[j].hook.y +
          gold_arr[i].r * Math.sin((players[j].hook.angle * Math.PI) / 180);
        players[j].hook.status = 2;
        players[j].hook.object = gold_arr[i];
        gold_arr[i].owner = players[j].hook;
        players[j].hook.moveSpeed =
          -players[j].hook.moveSpeed * gold_arr[i].speed;
      }
    }
  }
}
function drawEnd() {
  BGM.pause();
  // deathAudio.play();
  mapCanvas.style.opacity = 0.5;
  key_W.style.opacity = 0;
  key_S.style.opacity = 0;
  key_up.style.opacity = 0;
  key_down.style.opacity = 0;
  exit_level.style.opacity = 0;
  pause.style.opacity = 0;
  gameLoseBoard.style.display = "block";
  gameLoseBoard.style.color = "white";
  gameLose.style.display = "block";
  gameLose.style.color = "gray";
  score.style.display = "block";
  restart.style.display = "block";
  restart.style.color = "gray";
  restart.onclick = function () {
    clearCanvas();
    gameLoseBoard.style.display = "none";
    gameLose.style.display = "none";
    score.style.display = "none";
    restart.style.display = "none";
    init();
  };
  canvas.onclick = function (e) {
    var keyID = e.keyCode ? e.keyCode : e.which;
    if (keyID === 13 || keyID === 32) {
      // space and enter
      clearCanvas();
      init();

      e.preventDefault();
    }
  };
  // mapCanvas.style.display = "none";
}
function endCanvas() {
  clearInterval(timer_update);
  9;
  gold_arr.splice(0, gold_arr.length);
  bomb_arr.splice(0, bomb_arr.length);
  players.splice(0, players.length);
}

function timeUpdate() {
  draw_all();
  check_all();
}
function gold(x, y, size) {
  this.x = x;
  this.y = y;
  this.size = size;
  this.dx = 3;
  this.dy = -3;
  this.frame = 0;
  this.frameX = 0;
  this.frameY = 0;
  this.spriteWidth = 418;
  this.spriteHeight = 397;
  switch (size) {
    case 1:
      {
        //this.r = canvas.width / 40;
        this.r = 20;
        this.value = 50;
      }
      break;
    case 2:
      {
        //this.r = canvas.width / 40;
        this.r = 25;
        this.value = 100;
      }
      break;
    case 3:
      {
        this.r = 45;
        this.value = 250;
      }
      break;
  }
  this.speed = 40 / this.value;
  this.owner = 0;

  this.moveSpeed = 0;
  this.init();
}
gold.prototype = {
  init: function () {
    // this.draw();
  },
  draw: function () {
    if (gameFrame % 5 == 0) {
      this.frame++;
      if (this.frame >= 12) this.frame = 0;
      if (this.frame == 3 || this.frame == 7 || this.frame == 11) {
        this.frameX = 0;
      } else {
        this.frameX++;
      }
      if (this.frame < 3) this.frameY = 0;
      else if (this.frame < 7) this.frameY = 1;
      else if (this.frame < 11) this.frame = 2;
      else this.frameY = 0;
    }
    if (this.x - 35 < 0 || this.x + 35 > canvas.width) {
      this.dx = -this.dx;
    }

    if (this.y - 35 < 0 || this.y + 35 > canvas.height) {
      this.dy = -this.dy;
    }
    if (this.owner != 0) this.moveSpeed = this.owner.moveSpeed;
    if (this.moveSpeed) {
      this.x += this.moveSpeed * Math.cos((this.owner.angle * Math.PI) / 180);
      this.y += this.moveSpeed * Math.sin((this.owner.angle * Math.PI) / 180);
    } else this.x += this.dx;
    this.y += this.dy;
    var goldImg = new Image();
    goldImg.src = "img/__red_cartoon_fish_01_swim.png";
    if (this.size == 1)
      // ctx.drawImage(goldImg, this.x - 30, this.y - 35, 50, 50);
      ctx.drawImage(
        goldImg,
        this.frameX * this.spriteWidth,
        this.frameY * this.spriteHeight,
        this.spriteWidth,
        this.spriteHeight,
        this.x - 60,
        this.y - 70,
        this.spriteWidth / 3,
        this.spriteWidth / 3
      );
  },
};

function player(num) {
  if (mode == 0) this.x = canvas.width / 2 - 25;
  else {
    this.x = canvas.width / 2 - 75 + 100 * num;
  }
  this.y = 35;
  this.width = 50;
  this.height = 50;
  this.money = 0;
  this.color = "blue";
  this.hook = new hook(this.x + this.width / 2);
  this.hook.owner = this;
  this.enhanceStrength = false;
  this.fourLeaf = false;
  this.addStoneValue = false;
  this.addDiamondValue = false;
  this.bom = false;
  this.bomb_num = 0;
  this.hook.init();
  this.init();
}
player.prototype = {
  init: function () {
    this.draw();
  },
  draw: function () {
    var playerImg = new Image();
    playerImg.src = "img/player.jpeg";
    ctx.drawImage(playerImg, this.x, this.y, this.width, this.height);
  },
};
function hook(x) {
  this.x = x;
  this.y = 250;
  this.angle = 0;
  this.object = 0;
  this.status = 0;
  this.length = 0;
  this.moveSpeed = 10;
  this.rotateSpeed = 5;
  this.r = 10;
  this.maxLength = 500;
  this.color = "black";
  this.owner = 0;
  this.money_status = 0;
  this.money_size = 20;
  this.money_pos_x = 0;
  this.money_pos_y = 0;
  this.money_value = 0;
  //this.init();
}
hook.prototype = {
  init: function () {
    this.draw();
  },
  draw: function () {
    if (this.status == 0) {
      ctx.beginPath();

      //ctx.stroke();
      // if (this.angle <= 10 || this.angle >= 170)
      //   this.rotateSpeed = -this.rotateSpeed;
      // this.angle += this.rotateSpeed;
      //console.log(this.angle);
      ctx.save();
      ctx.translate(
        this.owner.x + this.owner.width / 2,
        this.owner.y + this.owner.height
      );
      // ctx.rotate((this.rotateSpeed * Math.PI) / 180);
      ctx.lineWidth = 1;
      ctx.lineCap = "round";
      ctx.strokeStyle = "gray";
      ctx.beginPath();
      ctx.moveTo(0, 0);
      this.x = 30 * Math.cos((this.angle * Math.PI) / 180);
      this.y = 30 * Math.sin((this.angle * Math.PI) / 180);
      ctx.lineTo(this.x, this.y);
      ctx.stroke();
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.strokeStyle = "gray";
      ctx.beginPath();
      ctx.arc(
        this.x + this.r * Math.cos((this.angle * Math.PI) / 180),
        this.y + this.r * Math.sin((this.angle * Math.PI) / 180),
        this.r,
        ((90 + this.angle) * Math.PI) / 180,
        ((270 + this.angle) * Math.PI) / 180
      );
      ctx.stroke();
      ctx.restore();
      this.x += this.owner.x + this.owner.width / 2;
      this.y += this.owner.y + this.owner.height;
    } else if (this.status == 1) {
      this.x += this.moveSpeed * Math.cos((this.angle * Math.PI) / 180);
      this.y += this.moveSpeed * Math.sin((this.angle * Math.PI) / 180);
      ctx.beginPath();
      ctx.lineWidth = 1;
      ctx.lineCap = "round";
      ctx.strokeStyle = "gray";
      ctx.moveTo(
        this.owner.x + this.owner.width / 2,
        this.owner.y + this.owner.height
      );
      ctx.lineTo(this.x, this.y);
      ctx.stroke();
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.strokeStyle = "gray";
      ctx.beginPath();
      ctx.arc(
        this.x + this.r * Math.cos((this.angle * Math.PI) / 180),
        this.y + this.r * Math.sin((this.angle * Math.PI) / 180),
        this.r,
        ((this.angle + 90) * Math.PI) / 180,
        ((this.angle - 90) * Math.PI) / 180
      );
      ctx.stroke();
    } else if (this.status == 2) {
      this.x += this.moveSpeed * Math.cos((this.angle * Math.PI) / 180);
      this.y += this.moveSpeed * Math.sin((this.angle * Math.PI) / 180);
      ctx.lineWidth = 1;
      ctx.lineCap = "round";
      ctx.strokeStyle = "gray";
      ctx.beginPath();
      ctx.moveTo(
        this.owner.x + this.owner.width / 2,
        this.owner.y + this.owner.height
      );
      ctx.lineTo(this.x, this.y);
      ctx.stroke();
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.strokeStyle = "gray";
      ctx.beginPath();
      ctx.arc(
        this.x + this.r * Math.cos((this.angle * Math.PI) / 180),
        this.y + this.r * Math.sin((this.angle * Math.PI) / 180),
        this.r,
        ((this.angle + 90) * Math.PI) / 180,
        ((this.angle - 90) * Math.PI) / 180
      );
      ctx.stroke();
    }
  },
  check: function () {
    this.length = Math.sqrt(
      (this.x - this.owner.x) * (this.x - this.owner.x) +
        (this.y - this.owner.y) * (this.y - this.owner.y)
    );
    if (this.length >= this.maxLength && this.status == 1) {
      this.moveSpeed = -this.moveSpeed;
    }
    if (
      this.y - this.owner.y - this.owner.height < 30 &&
      this.status != 0 &&
      this.moveSpeed < 0
    ) {
      if (this.status == 2) {
        if (this.object.value == -1) {
          time_all += this.object.timeAdd;
          this.object.x = -100;
          this.object.y = -100;
          this.object.owner = 0;
          this.object.moveSpeed = 0;
          this.object = 0;
          this.status = 0;
          if (players[0].enhanceStrength) this.moveSpeed = 20;
          else this.moveSpeed = 10;
        } else {
          this.money_value = this.object.value;
          if (mode == 0) catching_object = this;
          else {
            if (this == players[0].hook) catching_object = this;
            else catching_object1 = this;
          }
          this.draw_add_money();
          this.moveSpeed = 0;
        }
      } else {
        this.status = 0;
        if (players[0].enhanceStrength) this.moveSpeed = 20;
        else this.moveSpeed = 10;
      }
    }
  },
  draw_add_money: function () {
    this.money_status = 1;
    this.money_size = 20;

    if (mode == 0) {
      this.money_pos_x = 630;
      this.money_pos_y = 105;
      setTimeout("catching_object.money_move_in()", 1000);
    } else {
      if (this == players[0].hook) {
        this.money_pos_x = 440;
        this.money_pos_y = 105;
        setTimeout("catching_object.money_move_in()", 1000);
      } else {
        this.money_pos_x = 670;
        this.money_pos_y = 105;
        setTimeout("catching_object1.money_move_in()", 1000);
      }
    }
  },
  money_move_in: function () {
    this.money_status = 2;
    if (mode == 0) setTimeout("catching_object.money_stop()", 1000);
    else {
      if (this == players[0].hook)
        setTimeout("catching_object.money_stop()", 1000);
      else setTimeout("catching_object1.money_stop()", 1000);
    }
  },
  money_stop: function () {
    this.money_status = 3;

    if (mode == 0) {
      catching_object.object.moveSpeed = 0;
      catching_object.object.x = -100;
      catching_object.object.y = -100;
      catching_object.status = 0;
      catching_object.object.owner.object = 0;
      if (players[0].enhanceStrength) catching_object.moveSpeed = 20;
      else catching_object.moveSpeed = 10;
      catching_object.object.owner = 0;
      setTimeout("catching_object.money_move_out()", 1000);
    } else {
      if (this == players[0].hook) {
        catching_object.object.moveSpeed = 0;
        catching_object.object.x = -100;
        catching_object.object.y = -100;
        catching_object.status = 0;
        catching_object.object.owner = 0;
        catching_object.object = 0;
        if (players[0].enhanceStrength) catching_object.moveSpeed = 20;
        else catching_object.moveSpeed = 10;

        setTimeout("catching_object.money_move_out()", 1000);
      } else {
        catching_object1.object.moveSpeed = 0;
        catching_object1.object.x = -100;
        catching_object1.object.y = -100;
        catching_object1.status = 0;
        catching_object1.object.owner = 0;
        catching_object1.object = 0;
        if (players[0].enhanceStrength) catching_object1.moveSpeed = 20;
        else catching_object1.moveSpeed = 10;

        setTimeout("catching_object1.money_move_out()", 1000);
      }
    }
  },
  money_move_out: function () {
    this.money_status = 0;
    total_money += this.money_value;
  },
};

init();
