const dayEL=document.querySelector(".Days");
const hoursEL=document.querySelector(".Hours");
const minutesEL=document.querySelector(".Minutes");
const secEL=document.querySelector(".Seconds");
const DaysInput=document.querySelector('input[name="days"]');
const HoursInput=document.querySelector('input[name="hours"]');
const MinutesInput=document.querySelector('input[name="minutes"]');
const SecondsInput=document.querySelector('input[name="seconds"]');
const EventInput=document.querySelector('input[name="event"]');
const StartButton=document.querySelector("button");
const lastbox=document.querySelector(".last-box");
const ResetButton=document.querySelector(".reset-btn");
let targetTime;
let eventname = ""; 


let timerInterval;

ResetButton.addEventListener("click",function(){
  clearInterval(timerInterval);
  document.querySelector(".userinput").style.display="flex";
  document.querySelector(".main-section").style.display="none";
  DaysInput.value = "";
  HoursInput.value = "";
  MinutesInput.value = "";
  SecondsInput.value = "";
  EventInput.value = "";

  dayEL.innerText = "00";
  hoursEL.innerText = "00";
  minutesEL.innerText = "00";
  secEL.innerText = "00";
  lastbox.innerText = "Get Ready for:";


  ResetButton.style.display = "none";



});
StartButton.addEventListener("click",function(e){
  e.preventDefault();
  let days=Number(DaysInput.value)||0;
  let hours=Number(HoursInput.value)||0;
  let minutes=Number(MinutesInput.value)||0;
  let seconds=Number(SecondsInput.value)||0;
   eventname=EventInput.value.trim()||"Your Event";
  if(eventname===""){
    eventname="Your Event";
  }
  let totalMilliseconds=(days*24*60*60*1000)+
  (hours*60*60*1000)+
  (minutes*60*1000)+
  (seconds*1000);
  if (
    isNaN(days) || isNaN(hours) || isNaN(minutes) || isNaN(seconds) || 
    totalMilliseconds <= 0
  ) {
    alert("Please enter a valid time to start the countdown.");
    return; 
  }
  targetTime=Date.now()+totalMilliseconds;
  document.querySelector(".userinput").style.display="none";
  document.querySelector(".main-section").style.display="block";
  clearInterval(timerInterval);

  timerInterval=setInterval(updateCountdown, 1000);
  lastbox.innerText=`Get Ready for: ${eventname}`;
  DaysInput.value = "";
  HoursInput.value = "";
  MinutesInput.value = "";
  SecondsInput.value = "";
  EventInput.value = ""; 
  





});
function animatePulse(el){
  el.classList.add("pulse");
  setTimeout(()=>{
    el.classList.remove("pulse");

  },300);
}


function updateCountdown(){



const now=new Date().getTime();
const diff=targetTime-now;
const Seconds=Math.floor((diff/1000)%60);
const Minutes=Math.floor((diff/(1000*60))%60);
const Hours=Math.floor((diff/(1000*60*60))%24);
const Days=Math.floor(diff/(1000*60*60*24));
dayEL.innerText = formatTime(Days);
animatePulse(dayEL);
hoursEL.innerText = formatTime(Hours);
animatePulse(hoursEL);
minutesEL.innerText = formatTime(Minutes);
animatePulse(minutesEL);
secEL.innerText = formatTime(Seconds);
animatePulse(secEL);


if(diff<=0){
  clearInterval(timerInterval);
  ResetButton.style.display = "inline-block";

 
  dayEL.innerText="00";
  hoursEL.innerText="00";
  minutesEL.innerText="00";
  secEL.innerText="00";
  lastbox.innerText = `🎉 ${eventname} has started! 🎉`;
  confetti({
    particleCount:150,
    spread:90,
    origin:{y:0.6}

  });
  let audio=new Audio("https://www.soundjay.com/buttons/sounds/button-10.mp3");
  audio.play();
  return;
}
}

function formatTime(time){ 
  return time<10 ? `0${time}` : time;
  
}



