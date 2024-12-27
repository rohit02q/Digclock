let time= document.getElementById("time");
let format=document.getElementById("am-pm");
setInterval(() => {
    let newDate = new Date();
let hr = newDate.getHours()
let mins = newDate.getMinutes();
let secs= newDate.getSeconds();
if (secs>=0&& secs<10){
        secs= "0"+secs
    }
if (hr>=0&& hr<10){
        hr= "0"+hr
    }
    if (mins>=0&& mins<10){
        mins= "0"+mins
    }
    if(hr>=0 && hr<12){
        format.innerText='AM'
    }
    else{
        format.innerText='PM'
    }
    if(hr>12 && hr<22){
        hr="0"+(hr-12)
    }
time.innerText= `${hr} : ${mins} : ${secs}`
},1000)

// codes for changing
let btn1 = document.getElementById('btn1')
let btn2 = document.getElementById('btn2')
let clock=document.getElementById('clock')
let stopwatch=document.getElementById('stopwatch')
btn1.addEventListener('click', ()=>{
    btn1.style.backgroundColor="rgba(255,255,255,0.5)"
    btn2.style.backgroundColor="transparent"
    clock.style.display="flex";
    stopwatch.style.display="none"; 
})
btn2.addEventListener('click', ()=>{
    btn2.style.backgroundColor="rgba(255,255,255,0.5)"
    btn1.style.backgroundColor="transparent"
    clock.style.display="none";
  stopwatch.style.display="block"; 
})
//codes for stopwatch
let time2 = document.getElementById("time2");
let ms = 0, sec = 0, min = 0, hr2 = 0;
let interval;
let isRunning = false;
let startTime; // Start time for the stopwatch
let elapsedTime = 0; // Total elapsed time in milliseconds

// Update the stopwatch display
function updateStopwatchDisplay() {
    let totalMs = elapsedTime;

    let totalSeconds = Math.floor(totalMs / 1000);
    let totalMinutes = Math.floor(totalSeconds / 60);
    let totalHours = Math.floor(totalMinutes / 60);

    ms = Math.floor((totalMs % 1000) / 10);
    sec = totalSeconds % 60;
    min = totalMinutes % 60;
    hr2 = totalHours;

    let formattedMs = ms < 10 ? "0" + ms : ms;
    let formattedSec = sec < 10 ? "0" + sec : sec;
    let formattedMin = min < 10 ? "0" + min : min;
    let formattedHr = hr2 < 10 ? "0" + hr2 : hr2;

    time2.innerText = `${formattedHr} : ${formattedMin} : ${formattedSec} : ${formattedMs}`;
}

// Save stopwatch state to localStorage
function saveStopwatchState() {
    let state = {
        startTime: startTime,
        elapsedTime: elapsedTime,
        isRunning: isRunning,
    };
    localStorage.setItem("stopwatchState", JSON.stringify(state));
}

// Load stopwatch state from localStorage
function loadStopwatchState() {
    let savedState = JSON.parse(localStorage.getItem("stopwatchState"));
    if (savedState) {
        startTime = savedState.startTime;
        elapsedTime = savedState.elapsedTime;
        isRunning = savedState.isRunning;

        if (isRunning) {
            // Calculate elapsed time since the stopwatch started
            elapsedTime += Date.now() - startTime;
            startStopwatch();
        }
        updateStopwatchDisplay();
    }
}

// Start the stopwatch
function startStopwatch() {
    if (!isRunning) {
        isRunning = true;
        startTime = Date.now();
        interval = setInterval(() => {
            elapsedTime += 10; // Increment elapsed time by 10ms
            updateStopwatchDisplay();
            saveStopwatchState(); // Save state regularly
        }, 10);
        saveStopwatchState(); // Save initial state
    }
}

// Pause the stopwatch
function pauseStopwatch() {
    clearInterval(interval);
    isRunning = false;
    saveStopwatchState(); // Save paused state
}

// Reset the stopwatch
function resetStopwatch() {
    clearInterval(interval);
    elapsedTime = 0;
    isRunning = false;
    updateStopwatchDisplay();
    localStorage.removeItem("stopwatchState"); // Clear state from storage
}

// Event listeners for buttons
let startBtn = document.getElementById("Start");
let pauseBtn = document.getElementById("pause");
let resetBtn = document.getElementById("reset");

startBtn.addEventListener("click", () => {
    startStopwatch();
    startBtn.style.display = "none";
    pauseBtn.style.display = "inline";
    resetBtn.style.display = "inline";
});

pauseBtn.addEventListener("click", () => {
    pauseStopwatch();
    startBtn.style.display = "inline";
    pauseBtn.style.display = "none";
});

resetBtn.addEventListener("click", () => {
    resetStopwatch();
    startBtn.style.display = "inline";
    pauseBtn.style.display = "none";
    resetBtn.style.display = "none";
});

const btnsContainer = document.querySelector(".btns");

// Add click event listeners to the buttons
btn1.addEventListener("click", () => {
    btnsContainer.classList.remove("btn2-active");
    btn1.classList.add("active");
    btn2.classList.remove("active");
});

btn2.addEventListener("click", () => {
    btnsContainer.classList.add("btn2-active");
    btn2.classList.add("active");
    btn1.classList.remove("active");
});

// Load saved stopwatch state on page load
window.onload = loadStopwatchState;

