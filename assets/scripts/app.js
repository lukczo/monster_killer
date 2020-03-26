const ATTACK_VALUE = 10;
const ATTACK_VALUE_MONSTER = 14;
const STRONG_ATTACK_VALUE = 20;
const HEAL_VALUE = 10;

const enteredValue = prompt('Enter your and monster HP', '100');

let chosenMaxLife = parseInt(enteredValue);

if (isNaN(chosenMaxLife) || chosenMaxLife <= 0) {
  chosenMaxLife = 100;
}
const MODE_ATTACK = 'ATTACK';
const MODE_STRONG_ATTACK = 'STRONG_ATTACK';

const LOG_EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK = 'PLAYER_STRONG_ATTACK';
const LOG_EVENT_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOG_EVENT_PLAYER_HEAL = 'PLAYER_HEAL';
const LOG_EVENT_GAME_OVER = 'GAME_OVER';

let battleLog = [];

function writeToLog(eve, val, monsterHealth, playerHealth){
let logEntry;
if (eve === LOG_EVENT_PLAYER_ATTACK) {
  logEntry = {
  event: eve,
  value: val,
  target: 'Monster',
  finalMonsterHealth: monsterHealth,
  finalPlayerHealth: playerHealth
};
battleLog.push(logEntry);
} else if (eve === LOG_EVENT_PLAYER_STRONG_ATTACK){
  logEntry = {
  event: eve,
  value: val,
  target: 'Monster',
  finalMonsterHealth: monsterHealth,
  finalPlayerHealth: playerHealth
};
battleLog.push(logEntry);
} else if (eve === LOG_EVENT_MONSTER_ATTACK){
  logEntry = {
    event: eve,
    value: val,
    target: 'Player',
    finalMonsterHealth: monsterHealth,
    finalPlayerHealth: playerHealth
  };
  battleLog.push(logEntry);
} else if (eve === LOG_EVENT_PLAYER_HEAL ){
logEntry = {
  event: eve,
  value: val,
  target: 'Player',
  finalMonsterHealth: monsterHealth,
  finalPlayerHealth: playerHealth
};
battleLog.push(logEntry);
} else if (eve === LOG_EVENT_GAME_OVER){
  logEntry = {
    event: eve,
    value: val,
    finalMonsterHealth: monsterHealth,
    finalPlayerHealth: playerHealth
  };
  battleLog.push(logEntry);
}
}

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

adjustHealthBars(chosenMaxLife);

function reset(){
  currentMonsterHealth = chosenMaxLife;
  currentPlayerHealth = chosenMaxLife;
  resetGame(chosenMaxLife);
}

function round(){
  const initialPlayerHealth = currentPlayerHealth;
  damageReceived = dealPlayerDamage(ATTACK_VALUE_MONSTER);
  currentPlayerHealth -= damageReceived;

/* writeToLog(
  LOG_EVENT_MONSTER_ATTACK,
  damageReceived,
  currentMonsterHealth,
  currentPlayerHealth
); */

if (currentPlayerHealth <= 0 && hasBonusLife){
  hasBonusLife = false;
  removeBonusLife();
  currentPlayerHealth = initialPlayerHealth;
  setPlayerHealth(initialPlayerHealth);
  alert('Bonus life used');
}
  if (currentPlayerHealth > 0 && currentMonsterHealth <= 0) {
    alert("You have won, sire!");
    writeToLog(
      LOG_EVENT_GAME_OVER,
      "Player won",
      currentMonsterHealth,
      currentPlayerHealth
    );
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert("YOU LOSE");
    writeToLog(
      LOG_EVENT_GAME_OVER,
      "Player lose",
      currentMonsterHealth,
      currentPlayerHealth
    );
  } else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
    alert("You have a draw");
    writeToLog(
      LOG_EVENT_GAME_OVER,
      "A draw",
      currentMonsterHealth,
      currentPlayerHealth
    );
  }

    if (currentPlayerHealth <= 0 || currentMonsterHealth <= 0)
    {
      reset();
    } 
}

function attackMonster(mode){
  let maxDamage;
  let logEvent;
  if (mode === 'ATTACK'){
    maxDamage = ATTACK_VALUE;
    logEvent = LOG_EVENT_PLAYER_ATTACK;
  } else {
    maxDamage = STRONG_ATTACK_VALUE;
    logEvent = LOG_EVENT_PLAYER_STRONG_ATTACK;
  }
  maxDamage = dealMonsterDamage(maxDamage);
  currentMonsterHealth -= maxDamage;
  round();
  writeToLog(logEvent,maxDamage,currentMonsterHealth,currentPlayerHealth)
}

function attackHandler() {
 attackMonster('ATTACK');
}

function strongAttackHandler(){
  attackMonster('STRONG ATTACK');
}

function healHandler(){
  let healValue;
  if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE){
    alert('You cant heal more than your initial health')
  } else {
    healValue = HEAL_VALUE;
  }
increasePlayerHealth(HEAL_VALUE);
currentPlayerHealth += HEAL_VALUE;
round();
writeToLog(LOG_EVENT_PLAYER_HEAL, healValue, currentMonsterHealth,currentPlayerHealth)
}


function printLogHandler(){
  console.log(battleLog);
};

healBtn.addEventListener('click', healHandler)
attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
logBtn.addEventListener('click', printLogHandler)