const app=getApp()
const calculateScore = require('../../classes/calculatescore.js')
//var pr=4;
//var mon=2000;
//var count=0;
class sezi {
  constructor(){
    this.dice_point = 0;
    this.dice_state = true;
  }
  initDice() {
    this.dice_point = 0;
    this.dice_state = true;
  }
  roll () {
      this.dice_point =  Math.floor(Math.random() * 6 + 1)
  }     
  newstate(){
        this.dice_state = false;
  }

  havedicestate(){ 
    return this.dice_state
  }
  havedicepoint(){ 

    return this.dice_point

  }
}
class Player {
  constructor(chip) {
    this.dice_list = [];
    for (let i = 0; i < 5; i++) {
      this.dice_list.push(new sezi()); // 骰子列表
    }
    this.fenshu = 0; // 得分
    this.chip = chip; // 筹码
    this.lock = true; // 玩家状态
  }
  initPlayer() {
    for(let d1 of this.dice_list){
      d1.initDice();
    } 
  }
  updatePlayerState() {
    if (this.chip <= 0) {
      this.state = false;
    }
  }

  updateDicesState(index) {
        this.dice_list[index].newstate();
  }

  dicesRoll() {
    for (let d1 of this.dice_list) {
      if (d1.havedicestate()) {
        d1.roll();
      }
    }
  }
  havescore() {
    const dices = this.dice_list.map((d1) => d1.havedicepoint());
    this.score = calculateScore(dices);
    return this.score;
  }
  havedicestate() {
    const dice_state = this.dice_list.map((d1) => d1.havedicestate());
    return dice_state
  }
  havedices() {
    const dices = this.dice_list.map((d1) => d1.havedicepoint());
    return dices;
  }
  getChip() {
    return this.chip;
  }
  getState() {
    return this.state;
  }
}
class Game {
  constructor(playerNum, chip, gamenum) {
    this.playerNum = playerNum; // 玩家人数
    this.players = []; // 玩家列表
    for (let i = 0; i < playerNum; i++) {
      this.players.push(new Player(chip));
    }
    this.jiabei = 1; 
    this.lock = true; 
    this.scores = [];
    this.gamenum = gamenum;
  }

  getChips() {
  
    const chips = this.players.map((player) => player.getChip());
    return chips
  }
  updateGame(){
    for(let player of this.players){
      player.initPlayer();
    }
  }
  Person(){
    return this.players;
  }
  
  updateMagnification(jiabei) {
    this.jiabei += jiabei;
  }

  getScores() {
    this.scores = this.players.map((player) => player.havescore());
    return this.scores;
  }

  updatePlayerChip(score, maxScoreIndex) {
    for (let i = 0; i < score.length; i++) {
      if (i === maxScoreIndex) {
        continue;
      }
      const a = (score[maxScoreIndex] - score[i]) * this.jiabei;
      this.players[i].chip=this.players[i].chip-a;
      this.players[maxScoreIndex].chip=this.players[i].chip-a;
    }
  }
  person(){
    return this.players;
  }

  getState() {
    return this.state;
  }

  updateState() {
    for (const player of this.players) {
      if (player.getChip() <= 0) {
        this.state = false;
        break;
      }
    }
  }
  getPlayersDices(){
    const players_dices = this.players.map((player) => player.havedices());
    return players_dices;
  }
  getMagnification() {
    return this.jiabei;
  }
}
Page({
  data: {
    people:0,//游戏人数
    sum1:0,//筹码初始值
    gamesum:0,//设定的游戏局数
    touzi:[1,2,3,4,5],
    lock:[true,true,true,true,true],
    fenshu:0,//玩家得分
    peoplenum:0,//玩家序号
    rates:["0","1","2","3"],
    chip:[],
    jiabei:1,
    count:0,
    flag:false,
    round:1,
    gameno:1,
    count1:0,
    scores:[],
  },
  start:null,
  
  
 lockthis(event){
    if (this.data.count == 1){
      this.start.person()[this.data.peoplenum].updateDicesState(event.target.dataset.nid);
      this.setData({lock:this.start.person()[this.data.peoplenum].havedicestate()})
    }
  },
  queding(){
    if (this.data.count === 1 && !this.data.flag){
      this.setData({
        count:(this.data.count+1)%2
      });
      if (this.data.peoplenum == this.data.people-1)
        this.setData({
          flag:true
        });
      if (this.data.flag){
        this.setData({
          peoplenum:0
        });
      }
      else{
        this.nextstep();
      }
    }
  },
 touzhi:function(){
  if(!this.data.flag&&this.data.count === 0)
  {
    this.start.person()[this.data.peoplenum].dicesRoll()
    this.setData({
      count:(this.data.count+1)%2,
      fenshu:this.start.person()[this.data.peoplenum].havescore(),
      touzi: this.start.person()[this.data.peoplenum].havedices(),
      scores:this.start.getScores(),
    });
    if(this.data.round === 3)
      {
        this.setData({
          count:(this.data.count+1)%2  
        })
        if (this.data.peoplenum == this.data.people-1){
          const maxValue = Math.max(...this.start.getScores());
          const maxIndex = this.start.getScores().indexOf(maxValue);
          this.start.updatePlayerChip(this.start.getScores(),maxIndex)
          this.setData({
            chip:this.start.getChips(),
            round:1,
            gameno:(this.data.gameno+1)%(this.data.gamesum+1),
          });
          this.start.updateState();
          if (!this.start.getState())
            this.isover();
        }
        this.nextstep();
      }
  }
 },
 isover:function(){
  app.globalData.point=this.data.chip
  app.globalData.scores=this.data.scores
  console.log(app.globalData.point)

  wx.navigateTo({
    url: '../final/final',
  })
 },

  jiabei(event){
    if (this.data.flag){
      this.start.updateMagnification(event.target.dataset.nid);
      this.setData({
        jiabei:this.start.getMagnification(),
        peoplenum:(this.data.peoplenum+1)%(this.data.people)
      });
      if (this.data.peoplenum === 0){
        this.setData({
          flag:false
        });
        this.setData({
          round:this.data.round+1
        })
        this.remake();
      }
    }
  },
  remake(){
    this.setData({
      
      lock:this.start.person()[this.data.peoplenum].havedicestate(),
      dices:this.start.getPlayersDices(),
      touzi:this.start.person()[this.data.peoplenum].havedices(),
      fenshu:this.start.person()[this.data.peoplenum].havescore(),
      scores:this.start.getScores(),
    });
  },
  nextstep(){
    this.setData({
      peoplenum:(this.data.peoplenum+1)%(this.data.people)
    });
    this.remake()
  },
  onLoad(options) {
    this.start = new Game(app.globalData.pr,app.globalData.sum1,app.globalData.gamesum);
    var a=app.globalData.pr;
    var b=app.globalData.sum1;
    var c=app.globalData.gamesum

    this.setData({
      people:a,//游戏人数
      sum1:b,//筹码初始值
      gamesum:c//设定的游戏局数

    });
    console.log(app.globalData.pr)
  this.setData({
    touzi:this.start.person()[0].havedices(),
    lock:this.start.person()[0].havedicestate(),
    fenshu:this.start.person()[0].havescore(),
    chip:this.start.getChips()
  });
},
})

