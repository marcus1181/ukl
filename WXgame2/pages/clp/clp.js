// pages/page3/page3.js
var count=0
var pr=3
var lun=1
var jushu=3
Page({
  data: {
    msg:"投掷",
    prr:pr,
    current_id:1,
    lunshu:0,
    people:[{
      id:"人",
      touzi:[1,2,3,4,5],
      states:[true,true,true,true,true],
      chouma:0,
      fenshu:0,
    }],
    robot:[{
      id:"机器",
      touzi:[1,2,3,4,5],
      states:[true,true,true,true,true],
      chouma:0,
      fenshu:0,
    }],
  
  
  },

  rock: function() {
    let pid=count%pr;
    let peopleCopy = this.data.people;
    let robotCopy= this.data.robot;
    for (let i = 0; i < 5; i++) {
      if (peopleCopy[0].states[i]) {
        peopleCopy[0].touzi[i] = Math.floor(Math.random() * 6 + 1);
      }}
      for (let i = 0; i < 5; i++) {
        if (robotCopy[0].states[i]) {
          robotCopy[0].touzi[i] = Math.floor(Math.random() * 6 + 1);
        }}
    this.setData({
      people: peopleCopy,
      robot: robotCopy,
    });
    console.log(people.touzi)
    count=count+1;
    this.setData({
     lunshu:count,
    });

  },
  robotlock:function(){
    
      let robotCopy = this.data.robot[0]
      console.log(robotCopy.touzi)
      robotCopy.touzi.sort(function(a, b) {
        return a - b;
      });
      if (robotCopy.touzi[0] === robotCopy.touzi[4]) 
      {
        robotCopy.states==[false,false,false,false,false];
      }
      else if(robotCopy.touzi[0] === robotCopy.touzi[3] || robotCopy.touzi[1] === robotCopy.touzi[4]){
        robotCopy.states==[false,false,false,false,false];
      }
      else if((robotCopy.touzi[0] === robotCopy.touzi[2] && robotCopy.touzi[3] === robotCopy.touzi[4]) || (robotCopy.touzi[0] === robotCopy.touzi[1] && robotCopy.touzi[2] === robotCopy.touzi[4])){
        robotCopy.states==[false,false,false,false,false];
      }
     else{
       if( robotCopy.states[0] === robotCopy.states[2] )
       {
        robotCopy.states==[false,false,false,true,true];
       }
       else if( robotCopy.states[1] === robotCopy.states[3] )
       {
        robotCopy.states==[true,false,false,false,true];
       }
       else if( robotCopy.states[2] === robotCopy.states[4] )
       {
        robotCopy.states==[true,true,false,false,false];
       }
     }


this.setData({

  robot:robotCopy 
})
     
  },
  
  
  queding: function(e) {
    const nid = e.target.dataset.nid;
    console.log(nid);
    let count1=count-1;
    let pid=count1%pr;
    console.log(pid);
    let peopleCopy =this.data.people; 
    peopleCopy[0].states[nid]=false;
    this.setData({
      people: peopleCopy,
    });
  },

  quxiao:function(e){
    const nid = e.target.dataset.nid;
    console.log(nid);
    let count1=count-1;
    let pid=count1%pr;
    let peopleCopy =this.data.people; 
    peopleCopy[pid].states[nid]=true;
    this.setData({
      people: peopleCopy,
    });
  },
 

  
})
