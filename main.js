let frenzy = false;
let actionSurge = false;
let reloadOnBonusAction = false;
let currentGunStack = 0;
let reapersBloodHp = 0;
let sharpShooterList = [1,1,1];
let sharpShooterSavedList = [1,1,1,1,1,1,1,1]
let hexList = [0,0,0];
let hexSavedList = [0,0,0,0,0,0,0,0];
let cursedList = [0,0,0];
let cursedSavedList = [0,0,0,0,0,0,0,0];
let advList = [0,0,0];
let advSavedList = [0,0,0,0,0,0,0,0];
let proficiencyBonus = 4;
let toHitAdd = 12;
let totalGlobal=0;
let necroGlobal=0;
let piercGlobal=0;
let globalCrit = false;



//noter: lav hex toggle
//du mangler sharpshooter

let attackCount = 3;

//---------initial event listeners----------


//--------------make-togglers------------------------

const frenzyTog = document.getElementById("frenzyTog");
const actionSurgeTog = document.getElementById("actionSurgeTog");
const reloadTog = document.getElementById("reloadTog");
const gunStackTog0 = document.getElementById("gunStackTog0")
const gunStackTog1 = document.getElementById("gunStackTog1")
const gunStackTog2 = document.getElementById("gunStackTog2")
const hpInput = document.getElementById("hp");
const critTog = document.getElementById("autocritTog");


frenzyTog.addEventListener("click", e => {
  frenzyTog.classList.toggle("off");
  frenzyTog.classList.toggle("on");
  frenzy = !frenzy;

  if(attackCount===7){
    attackCount=8;
  }

  if(frenzy){
    if(actionSurge){
      attackCount +=2;
    }else{
      attackCount +=1;
    }
  }else{
    if(actionSurge){
      attackCount-=2;
    }else{
      attackCount-=1;
    }
  }

  if(attackCount>6){
    let reloader = document.getElementById("reload-con");
    reloader.classList.remove("hidden");

    if(!reloadOnBonusAction){
      if(attackCount===8){
        attackCount=7;
      }
    }

  }else{
    let reloader = document.getElementById("reload-con");
    reloader.classList.add("hidden");
  }

  updateMultiTogglers();
  updateNumberOfAttacks();
})

actionSurgeTog.addEventListener("click", e => {
  actionSurgeTog.classList.toggle("off");
  actionSurgeTog.classList.toggle("on");
  actionSurge = !actionSurge;
  if(attackCount===7){
    attackCount=8;
  }

  if(actionSurge){
    attackCount = attackCount*2;
  }
  else{
    attackCount = attackCount/2;
  }

  if(attackCount>6){
    let reloader = document.getElementById("reload-con");
    reloader.classList.remove("hidden");

    if(!reloadOnBonusAction){
      attackCount-=1;
    }
  }else{
    let reloader = document.getElementById("reload-con");
    reloader.classList.add("hidden");
  }

  updateMultiTogglers();
  updateNumberOfAttacks();
})

reloadTog.addEventListener("click", e => {
  reloadTog.classList.toggle("off");
  reloadTog.classList.toggle("on");
  reloadOnBonusAction = !reloadOnBonusAction;

  if(reloadOnBonusAction){
    attackCount +=1;
  }else{
    attackCount-=1;
  }

  updateMultiTogglers();
  updateNumberOfAttacks();
})

critTog.addEventListener("click", e => {
  critTog.classList.toggle("off");
  critTog.classList.toggle("on");
  globalCrit = !globalCrit;
})

gunStackTog0.addEventListener("click", e => {
  if(currentGunStack===0){
    //nothing
  }
  if(currentGunStack===1){
    currentGunStack-=1;
    gunStackTog1.classList.toggle("off");
    gunStackTog1.classList.toggle("on");

    gunStackTog0.classList.toggle("on");
    gunStackTog0.classList.toggle("off");
  }
  if(currentGunStack===2){
    currentGunStack-=2;
    gunStackTog2.classList.toggle("off");
    gunStackTog2.classList.toggle("on");

    gunStackTog0.classList.toggle("on");
    gunStackTog0.classList.toggle("off");
  }
})
gunStackTog1.addEventListener("click", e => {
  if(currentGunStack===0){
    currentGunStack+=1;
    gunStackTog0.classList.toggle("off");
    gunStackTog0.classList.toggle("on");

    gunStackTog1.classList.toggle("on");
    gunStackTog1.classList.toggle("off");
  }
  if(currentGunStack===1){
    //nothing
  }
  if(currentGunStack===2){
    currentGunStack-=1;
    gunStackTog2.classList.toggle("off");
    gunStackTog2.classList.toggle("on");

    gunStackTog1.classList.toggle("on");
    gunStackTog1.classList.toggle("off");
  }
})
gunStackTog2.addEventListener("click", e => {
  if(currentGunStack===0){
    currentGunStack+=2;
    gunStackTog0.classList.toggle("off");
    gunStackTog0.classList.toggle("on");

    gunStackTog2.classList.toggle("on");
    gunStackTog2.classList.toggle("off");
  }
  if(currentGunStack===1){
    currentGunStack+=1;
    gunStackTog1.classList.toggle("off");
    gunStackTog1.classList.toggle("on");

    gunStackTog2.classList.toggle("on");
    gunStackTog2.classList.toggle("off");
  }
  if(currentGunStack===2){
    //nothing
  }
})

//----------------------------------

const updateMultiTogglers = () =>{
  //reset all
  let sharpConn = document.getElementById("sharpCon");
  sharpConn.innerHTML = "";
  let hexConn = document.getElementById("hexCon");
  hexConn.innerHTML = "";
  let curseConn = document.getElementById("curseCon");
  curseConn.innerHTML = "";
  let advConn = document.getElementById("advCon");
  advConn.innerHTML = "";

  //run through each attackNumber
  for(let i = 0; i<attackCount;i++){
    //create each toggler div
    let newTogglerSharp = document.createElement("div");
    let newTogglerHex = document.createElement("div");
    let newTogglerCurse = document.createElement("div");
    let newTogglerAdv = document.createElement("div");

    //give them togglerBut class
    newTogglerSharp.classList.add("togglerBut");
    newTogglerHex.classList.add("togglerBut");
    newTogglerCurse.classList.add("togglerBut");
    newTogglerAdv.classList.add("togglerBut");

    //check if each is on or off
    //sharp
    if(sharpShooterSavedList[i]===1){
      newTogglerSharp.classList.add("on");
      sharpShooterList[i]=1;
    }else{
      newTogglerSharp.classList.add("off");
      sharpShooterList[i]=0;
    }
    //hex
    if(hexSavedList[i]===1){
      newTogglerHex.classList.add("on");
      hexList[i]=1;
    }else{
      newTogglerHex.classList.add("off");
      hexList[i]=0;
    }
    //curse
    if(cursedSavedList[i]===1){
      newTogglerCurse.classList.add("on");
      cursedList[i]=1;
    }else{
      newTogglerCurse.classList.add("off");
      cursedList[i]=0;
    }
    //adv
    if(advSavedList[i]===1){
      newTogglerAdv.classList.add("on");
      advList[i]=1;
    }else{
      newTogglerAdv.classList.add("off");
      advList[i]=0;
    }

    //get each container and append the toggler
    const container1 = document.getElementById("sharpCon");
    container1.appendChild(newTogglerSharp);
    const container2 = document.getElementById("hexCon");
    container2.appendChild(newTogglerHex);
    const container3 = document.getElementById("curseCon");
    container3.appendChild(newTogglerCurse);
    const container4 = document.getElementById("advCon");
    container4.appendChild(newTogglerAdv);

    setSharpEventListener(newTogglerSharp, i);
    setHexEventListener(newTogglerHex, i);
    setCurseEventListener(newTogglerCurse, i);
    setAdvEventListener(newTogglerAdv, i);
  }
  checkAndChangeSharpBut();
  checkAndChangeHexBut();
  checkAndChangeCurseBut();
  checkAndChangeAdvBut();

};

const updateNumberOfAttacks = () =>{
  let container = document.getElementById("noOfAttacks");
  container.innerText = `${attackCount}`;

}

//-----------several toggle listeners----------------------------

const setSharpEventListener = (toggler, index) =>{
  toggler.addEventListener("click", e => {
    if(sharpShooterList[index]===1){
      sharpShooterSavedList[index]=0;
      sharpShooterList[index]=0;
    }else{
      sharpShooterSavedList[index]=1;
      sharpShooterList[index]=1;
    }
    toggler.classList.toggle("on");
    toggler.classList.toggle("off");
    checkAndChangeSharpBut();
  })
}
const setHexEventListener = (toggler,index) =>{
  toggler.addEventListener("click", e => {
    if(hexList[index]===1){
      hexSavedList[index]=0;
      hexList[index]=0;
    }else{
      hexSavedList[index]=1;
      hexList[index]=1;
    }
    toggler.classList.toggle("on");
    toggler.classList.toggle("off");
    checkAndChangeHexBut();
  })
}
const setCurseEventListener = (toggler, index) =>{
  toggler.addEventListener("click", e => {
    if(cursedList[index]===1){
      cursedSavedList[index]=0;
      cursedList[index]=0;
    }else{
      cursedSavedList[index]=1;
      cursedList[index]=1;
    }
    toggler.classList.toggle("on");
    toggler.classList.toggle("off");
    checkAndChangeCurseBut();
  })
}
const setAdvEventListener = (toggler, index) =>{
  toggler.addEventListener("click", e => {
    if(advList[index]===1){
      advSavedList[index]=0;
      advList[index]=0;
    }else{
      advSavedList[index]=1;
      advList[index]=1;
    }
    toggler.classList.toggle("on");
    toggler.classList.toggle("off");
    checkAndChangeAdvBut();
  })
}

//----------all-sharp-button---------------

const checkAndChangeSharpBut = () =>{
  let OneAllZeroNotAll = 1;
  for(let i = 0; i<attackCount;i++){
    if(sharpShooterList[i]===0){
      OneAllZeroNotAll=0;
    }
  }

  let button = document.getElementById("sharpAllButton");

  if(OneAllZeroNotAll===1){
    //make sharp button active
    if(!button.classList.contains("onButn")){
      button.classList.toggle("onButn");
    }
  }else{
    //make sharp button not active
    if(button.classList.contains("onButn")){
      button.classList.remove("onButn");
    }
  }
}

const allSharpButton = document.getElementById("sharpAllButton");
allSharpButton.addEventListener("click", e => {
    let comp = 0;
    for(let i=0;i<attackCount;i++){
      if(sharpShooterList[i]===1){
        comp++;
      }
    }

    if(comp===attackCount){
      disableAllSharp();
    }else{
      enableAllSharp();
    }
  checkAndChangeSharpBut();
})

const enableAllSharp = () =>{
  const container = document.getElementById("sharpCon");
  for(let i = 0;i<attackCount;i++){
    const toggler = container.children[i];
    if(sharpShooterList[i]===0){
      toggler.classList.toggle("on");
      toggler.classList.toggle("off");
      sharpShooterList[i]=1;
      sharpShooterSavedList[i]=1;
    }
  }
}
const disableAllSharp = () =>{
  const container = document.getElementById("sharpCon");
  for(let i = 0;i<attackCount;i++){
    const toggler = container.children[i];
    if(sharpShooterList[i]===1){
      toggler.classList.toggle("on");
      toggler.classList.toggle("off");
      sharpShooterList[i]=0;
      sharpShooterSavedList[i]=0;
    }
  }
}

//-----------all-hex-button---------

const checkAndChangeHexBut = () =>{
  let OneAllZeroNotAll = 1;
  for(let i = 0; i<attackCount;i++){
    if(hexList[i]===0){
      OneAllZeroNotAll=0;
    }
  }

  let button = document.getElementById("hexAllButton");

  if(OneAllZeroNotAll===1){
    //make sharp button active
    if(!button.classList.contains("onButn")){
      button.classList.toggle("onButn");
    }
  }else{
    //make sharp button not active
    if(button.classList.contains("onButn")){
      button.classList.remove("onButn");
    }
  }
}

const allHexButton = document.getElementById("hexAllButton");
allHexButton.addEventListener("click", e => {
  let comp = 0;
  for(let i=0;i<attackCount;i++){
    if(hexList[i]===1){
      comp++;
    }
  }

  if(comp===attackCount){
    disableAllHex();
  }else{
    enableAllHex();
  }
  checkAndChangeHexBut();
})

const enableAllHex = () =>{
  const container = document.getElementById("hexCon");
  for(let i = 0;i<attackCount;i++){
    const toggler = container.children[i];
    if(hexList[i]===0){
      toggler.classList.toggle("on");
      toggler.classList.toggle("off");
      hexList[i]=1;
      hexSavedList[i]=1;
    }
  }
}
const disableAllHex = () =>{
  const container = document.getElementById("hexCon");
  for(let i = 0;i<attackCount;i++){
    const toggler = container.children[i];
    if(hexList[i]===1){
      toggler.classList.toggle("on");
      toggler.classList.toggle("off");
      hexList[i]=0;
      hexSavedList[i]=0;
    }
  }
}

//-----------all-cursed-button---------

const checkAndChangeCurseBut = () =>{
  let OneAllZeroNotAll = 1;
  for(let i = 0; i<attackCount;i++){
    if(cursedList[i]===0){
      OneAllZeroNotAll=0;
    }
  }

  let button = document.getElementById("curseAllButton");

  if(OneAllZeroNotAll===1){
    //make button active
    if(!button.classList.contains("onButn")){
      button.classList.toggle("onButn");
    }
  }else{
    //make button not active
    if(button.classList.contains("onButn")){
      button.classList.remove("onButn");
    }
  }
}

const allCurseButton = document.getElementById("curseAllButton");
allCurseButton.addEventListener("click", e => {
  let comp = 0;
  for(let i=0;i<attackCount;i++){
    if(cursedList[i]===1){
      comp++;
    }
  }

  if(comp===attackCount){
    disableAllCurse();
  }else{
    enableAllCurse();
  }
  checkAndChangeCurseBut();
})

const enableAllCurse = () =>{
  const container = document.getElementById("curseCon");
  for(let i = 0;i<attackCount;i++){
    const toggler = container.children[i];
    if(cursedList[i]===0){
      toggler.classList.toggle("on");
      toggler.classList.toggle("off");
      cursedList[i]=1;
      cursedSavedList[i]=1;
    }
  }
}
const disableAllCurse = () =>{
  const container = document.getElementById("curseCon");
  for(let i = 0;i<attackCount;i++){
    const toggler = container.children[i];
    if(cursedList[i]===1){
      toggler.classList.toggle("on");
      toggler.classList.toggle("off");
      cursedList[i]=0;
      cursedSavedList[i]=0;
    }
  }
}

//-----------all-adv-button---------

const checkAndChangeAdvBut = () =>{
  let OneAllZeroNotAll = 1;
  for(let i = 0; i<attackCount;i++){
    if(advList[i]===0){
      OneAllZeroNotAll=0;
    }
  }

  let button = document.getElementById("advAllButton");

  if(OneAllZeroNotAll===1){
    //make button active
    if(!button.classList.contains("onButn")){
      button.classList.toggle("onButn");
    }
  }else{
    //make button not active
    if(button.classList.contains("onButn")){
      button.classList.remove("onButn");
    }
  }
}

const allAdvButton = document.getElementById("advAllButton");
allAdvButton.addEventListener("click", e => {
  let comp = 0;
  for(let i=0;i<attackCount;i++){
    if(advList[i]===1){
      comp++;
    }
  }

  if(comp===attackCount){
    disableAllAdv();
  }else{
    enableAllAdv();
  }
  checkAndChangeAdvBut();
})

const enableAllAdv = () =>{
  const container = document.getElementById("advCon");
  for(let i = 0;i<attackCount;i++){
    const toggler = container.children[i];
    if(advList[i]===0){
      toggler.classList.toggle("on");
      toggler.classList.toggle("off");
      advList[i]=1;
      advSavedList[i]=1;
    }
  }
}
const disableAllAdv = () =>{
  const container = document.getElementById("advCon");
  for(let i = 0;i<attackCount;i++){
    const toggler = container.children[i];
    if(advList[i]===1){
      toggler.classList.toggle("on");
      toggler.classList.toggle("off");
      advList[i]=0;
      advSavedList[i]=0;
    }
  }
}


//--------------------------------------
/*
let addedList = [];

let addbuttons = document.querySelectorAll(".add-die");
addbuttons.forEach((button) => {button.addEventListener("click", (e) => {
  const container = button.parentElement;
  const strID = container.id;
  const number = parseInt(strID, 10)

  addedList.push(number);

})})*/

function toHitCall(){
  let roll = Math.floor(Math.random()*20)+1;
  if(roll===20){
    return 100;
  }
  return roll+toHitAdd;
}

const calculateSingleAttack = (attackNumber, useSharpShooter, hexed, hexCursed, adv, reaper) =>{
    //attackNumber: which attack is it?
    //useSharpShooter: 1 or 0
    //hexed: 1 or 0
    //hexCursed: 1 or 0
    //adv: 1 or 0
    //reaper: 1 or 0

    //calc reaper amount
    let reaperAmount = 0;
    if(reaper===1){
      reaperAmount = Math.floor(reapersBloodHp/10);
    }

    //to hit
    let toHit = toHitCall();
    if(adv===1 || reaper===1){
      let secondToHit = toHitCall();
      let thirdToHit = toHitCall();
      toHit = Math.max(toHit, secondToHit, thirdToHit)+reaperAmount;
      console.log(`on attack ${attackNumber+1}, you rolled toHit=${toHit}(${toHit},${secondToHit},${thirdToHit})`);
    }else{
      console.log(`on attack ${attackNumber+1}, you rolled toHit=${toHit}`);
    }

    //consider global crit
    if(globalCrit===true){
        toHit=100;
    }

    let isCrit = false;
    let toHitInfo = `${toHit}`;
    //crit
    if(toHit===100 || toHit >100){
      isCrit=true;
      toHitInfo = `(NAT 20!)`;
    }

    let sharpDmg=0;
    if(useSharpShooter===1){
      sharpDmg=10;
      toHit = toHit-5;
      if(isCrit===false){
        console.log(`sharpShooter made it ${toHit} to hit and added ${sharpDmg} damage`);
      }
    }

    //damage die
    let damageDie = calcDmgDie()

    //do damage
    let pierc1 = Math.floor(Math.random()*damageDie)+1;
    let pierc2 = Math.floor(Math.random()*damageDie)+1;
    let piercNormalBonus = 6;
    let finalPierc = pierc1+pierc2+sharpDmg+piercNormalBonus;

    console.log(`your magical pierc was ${finalPierc} (${pierc1}+${pierc2})`);

    //hexblades curse
    if(hexCursed===1){
      finalPierc += proficiencyBonus;
      console.log(`with hexblade's curse (${proficiencyBonus}), it became ${finalPierc} magical piercing`);
    }


    let necro =0;

    //hex
    if(hexed===1){
      let hexDmg = Math.floor(Math.random()*6)+1;
      necro = necro+hexDmg;
      console.log(`Hex added (${hexDmg}) necrotic`);
    }
    //reaper necrotic
    if(reaper===1){
      let addUp = 0;
      for(let i=0; i<reaperAmount;i++){
        let reap1 = Math.floor(Math.random()*8)+1;
        let reap2 = Math.floor(Math.random()*8)+1;
        addUp+=reap1+reap2;
      }
      necro += addUp;
      console.log(`Reaper added (${addUp}) necrotic`);
    }

  //add if crit
  if(isCrit){
    finalPierc +=2*damageDie; //add base to crit

    if(reaper===1){
      necro += reaperAmount*16;
      console.log(`added ${reaperAmount*16} necro from reaper crit`);
    }

    if(hexed===1){
      necro += 6;
      console.log(`added ${6} necro from hex crit`);
    }

  }

    makeRollStats(attackNumber, toHitInfo, necro, finalPierc, (reaper===1), (hexed===1), (hexCursed===1), (adv===1), (useSharpShooter===1));

}

function calcDmgDie(){
  let damageDie = 6;
  if(currentGunStack===1){
    damageDie=8;
  }
  if(currentGunStack===2){
    damageDie=10;
  }
  console.log(`Your damage die is a d${damageDie}`);
  return damageDie;
}



let bigRollButton = document.querySelector(".big-roll");
bigRollButton.addEventListener("click", (e) => {
  let resCon = document.getElementById("res-con");
  resCon.innerHTML = "";
  totalGlobal=0;
  necroGlobal=0;
  piercGlobal=0;


  //update reapers blood hp:
  reapersBloodHp = document.getElementById("hp").value;


  for(let i=0;i<attackCount;i++){
    if(reapersBloodHp>0 && i===0){
      console.log(`---------attack: ${i+1}-------------`);
      calculateSingleAttack(i, sharpShooterList[i],hexList[i],cursedList[i],advList[i],1);
    }else{
      console.log(`---------attack: ${i+1}-------------`);
      calculateSingleAttack(i, sharpShooterList[i],hexList[i],cursedList[i],advList[i], 0);
    }
  }
})

const makeRollStats = (attackNumber, toHit, necro, pierc, reaper, hexed, hexCursed, adv, useSharpShooter) => {
  //attackNumber: int (0, n-1)
  //toHit: string
  //necro: int
  //pierc: int
  //reaper: true/false
  //hexed: true/false
  //hexCursed: true/false
  //adv: true/flase
  //useSharpShooter: true/false

  let rollStatCon = document.createElement("div");
  rollStatCon.classList.add("rollStatContainer");
  const container = document.getElementById("res-con");
  container.appendChild(rollStatCon);

  let rollStatButton = document.createElement("button");
  rollStatButton.classList.add("rollStatButton");

  let rollStatInfo = document.createElement("div");
  rollStatInfo.classList.add("rollStatInfo");

  rollStatCon.appendChild(rollStatButton);
  rollStatCon.appendChild(rollStatInfo);

  let reaperText = `reaper/`;
  let hexedText = `hex/`;
  let advText = `adv/`;
  let hexCursedText = `hexblade/`;
  let sharpText = `sharp/`;
  let extraInfo = ``;

  if(reaper){
    extraInfo=`${extraInfo}${reaperText}`;
  }
  if(hexed){
    extraInfo=`${extraInfo}${hexedText}`;
  }
  if(adv){
    extraInfo=`${extraInfo}${advText}`;
  }
  if(hexCursed){
    extraInfo=`${extraInfo}${hexCursedText}`;
  }
  if(useSharpShooter){
    extraInfo=`${extraInfo}${sharpText}`;
  }
  if(reaper || hexed || adv || hexCursed || useSharpShooter){
    if(necro>0){
      rollStatInfo.innerText = `${toHit} to hit. |  ${necro+pierc} damage (${pierc} magical piercing, ${necro} necrotic) (${extraInfo})`;
    }
    else{
      rollStatInfo.innerText = `${toHit} to hit. |  ${necro+pierc} magical piercing damage (${extraInfo})`;
    }
  }
  else{
    if(necro>0){
      rollStatInfo.innerText = `${toHit} to hit. |  ${necro+pierc} damage (${pierc} magical piercing, ${necro} necrotic)`;
    }else{
      rollStatInfo.innerText = `${toHit} to hit. |  ${pierc} magical piercing damage`;
    }
  }

  rollStatButton.innerText=`${attackNumber+1}`;

  //give button eventListener:
  rollStatButton.addEventListener("click", (e)=>{
    buttonStuff(rollStatButton, necro, pierc);
  });
}

//initialize first event listeners
updateMultiTogglers();


//----------adding to total-------------

const makeTotalText = (total, necro, mp) =>{
  const t = document.getElementById("final-result-t");
  const n = document.getElementById("final-result-n");
  const map = document.getElementById("final-result-mp");


  t.innerText = `${totalGlobal} `;
  n.innerText = `(${necroGlobal} necrotic, `;
  map.innerText = `${piercGlobal} magical piercing)`;
}


const buttonStuff = (button, necro, pierc) =>{
  button.classList.toggle("onButton");

  if(button.classList.contains("onButton")){
    totalGlobal += necro+pierc;
    necroGlobal +=necro;
    piercGlobal+=pierc;
    makeTotalText();
  }else{
    totalGlobal -= necro+pierc;
    necroGlobal -=necro;
    piercGlobal-=pierc;
    makeTotalText();
  }
}

