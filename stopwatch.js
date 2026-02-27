// let second = 0;
// let minute = 0;
// let hour = 0;
const time = {
  second : 0 ,
  minute : 0 , 
  hour : 0
}
let isClockRunning = false;
let isStop = false;
let intervalId;

let start = document.getElementById('start-btn');
let secondElement = document.getElementById('second');
let minuteElement = document.getElementById('minute');
let hourElement = document.getElementById('hour');
let stopResume = document.getElementById('stop-resume-btn');

start.addEventListener('click',()=>{
  beginEnd();
});

function beginEnd(){
  if(!isClockRunning) { 
    startTimer();
    start.innerText = 'Reset';
  }else{
    reset();
    start.innerText = 'Start';
  }
}

function startTimer(){
  isClockRunning = true;
  intervalId = setInterval(() => {
    time.second++;
    if (time.second > 59) {
      time.second = 0;
      time.minute++;
      secondElement.textContent = `${time.second}`;
      minuteElement.textContent = `${time.minute}`;
      if (time.minute > 59) {
        time.minute = 0;
        time.hour++;
        minuteElement.textContent = `${time.minute}`;
        hourElement.textContent = `${time.hour}`;
      } else {
        minuteElement.textContent = `${time.minute}`;
      }
    }else{
      secondElement.textContent = `${time.second}`;
    }
  }, 1000);
}

stopResume.addEventListener('click',()=>{
  playPause();
});

function playPause(){
  if(isClockRunning) {
    if (!isStop) {
      isStop = true;
      clearInterval(intervalId);
      stopResume.innerText = 'Resume';  
    }else{
      startTimer();
      isStop = false;
      stopResume.innerText = 'Stop';
    }
  }
}
function reset(){
  time.second = 0;
  time.minute = 0;
  time.hour = 0;
  isClockRunning = false;
  isStop = false;
  clearInterval(intervalId);
  stopResume.innerText = 'Stop';
  // secondElement.textContent = `${second++}_s`;
  secondElement.textContent = `0${time.second}`;
  minuteElement.textContent = `0${time.minute}`;
  hourElement.textContent = `0${time.hour}`;
}

const themeToggle = document.getElementById('theme-toggle');

themeToggle.addEventListener('click', () => {
  changeTheme();
});

function changeTheme(){
  document.body.classList.toggle('dark');
  document.body.classList.toggle('light');
  
  themeToggle.textContent =
    document.body.classList.contains('dark')
      ? "Light Mode"
      : "Dark Mode";

}

document.addEventListener('keydown',(event)=>{
  const key = event.key;
  if (key === 'Enter' || key.toLocaleLowerCase() === 's' /*|| key === 'S' using lowercase*/) {
    beginEnd();
  }
  else if(key.toLocaleLowerCase() === 'p' || key === 'MediaPlayPause'){
    playPause();
  }
  else if(key.toLocaleLowerCase() === 'd'){
    changeTheme();
  }
});
