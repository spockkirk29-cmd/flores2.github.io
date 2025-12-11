

let stopwatchInterval;
let elapsedTime = 0;
let running = false;
let lapTimes = []; // Stores laps (ARRAY requirement)

/**
 * Formats milliseconds into HH:MM:SS.ms
 * RETURN VALUE function
 */
function formatStopwatchTime(ms) {
    let totalSeconds = Math.floor(ms / 1000);
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = totalSeconds % 60;
    let milliseconds = Math.floor((ms % 1000) / 10);

    return (
        String(hours).padStart(2, "0") + ":" +
        String(minutes).padStart(2, "0") + ":" +
        String(seconds).padStart(2, "0") + "." +
        String(milliseconds).padStart(2, "0")
    );
}

/**
 * Updates the display (NO RETURN VALUE)
 * (DOM manipulation)
 */
function updateStopwatchDisplay() {
    document.getElementById("stopwatchDisplay").textContent =
        formatStopwatchTime(elapsedTime);
}

/** Starts or stops the stopwatch */
function startStopwatch() {
    if (!running) {
        running = true;
        let startTime = Date.now() - elapsedTime;

        stopwatchInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateStopwatchDisplay();
        }, 10);

        document.getElementById("startStopwatchBtn").textContent = "Pause";
    } else {
        running = false;
        clearInterval(stopwatchInterval);
        document.getElementById("startStopwatchBtn").textContent = "Start";
    }
}

/** Resets stopwatch */
function resetStopwatch() {
    running = false;
    clearInterval(stopwatchInterval);
    elapsedTime = 0;
    updateStopwatchDisplay();
    document.getElementById("startStopwatchBtn").textContent = "Start";
    lapTimes = [];
    renderLaps();
}

/** Records a lap */
function recordLap() {
    if (elapsedTime === 0) return;

    lapTimes.push(formatStopwatchTime(elapsedTime));
    renderLaps();
}

/** Renders laps (LOOP requirement) */
function renderLaps() {
    let lapList = document.getElementById("lapList");
    lapList.innerHTML = "";

    lapTimes.forEach((lap, index) => {
        let li = document.createElement("li");
        li.textContent = `Lap ${index + 1}: ${lap}`;
        lapList.appendChild(li);
    });
}



let timerInterval;
let timerRemaining = 0;
let timerRunning = false;

/** Formats timer display */
function formatTimerDisplay(seconds) {
    let mins = Math.floor(seconds / 60);
    let secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function updateTimerDisplay() {
    document.getElementById("timerDisplay").textContent =
        formatTimerDisplay(timerRemaining);
}

/** Starts countdown timer */
function startTimer() {
    if (timerRunning) {
        timerRunning = false;
        clearInterval(timerInterval);
        document.getElementById("startTimerBtn").textContent = "Start";
        return;
    }

    if (timerRemaining === 0) {
        let mins = parseInt(document.getElementById("minutesInput").value);
        let secs = parseInt(document.getElementById("secondsInput").value);

        if (isNaN(mins)) mins = 0;
        if (isNaN(secs)) secs = 0;

        timerRemaining = mins * 60 + secs;
        updateTimerDisplay();
    }

    timerRunning = true;
    document.getElementById("startTimerBtn").textContent = "Pause";

    timerInterval = setInterval(() => {
        timerRemaining--;

        if (timerRemaining <= 0) {
            clearInterval(timerInterval);
            timerRunning = false;
            timerRemaining = 0;
        }

        updateTimerDisplay();
    }, 1000);
}

/** Resets timer */
function resetTimer() {
    timerRunning = false;
    clearInterval(timerInterval);
    timerRemaining = 0;
    updateTimerDisplay();
    document.getElementById("startTimerBtn").textContent = "Start";
}

/**************************************************
 TAB SWITCHING LOGIC
**************************************************/

function switchTab(showStopwatch) {
    const sw = document.getElementById("stopwatchSection");
    const tm = document.getElementById("timerSection");

    if (showStopwatch) {
        sw.classList.remove("hidden");
        tm.classList.add("hidden");
        document.getElementById("stopwatchTab").classList.add("active");
        document.getElementById("timerTab").classList.remove("active");
    } else {
        tm.classList.remove("hidden");
        sw.classList.add("hidden");
        document.getElementById("timerTab").classList.add("active");
        document.getElementById("stopwatchTab").classList.remove("active");
    }
}

/**************************************************
 EVENT LISTENERS
**************************************************/

document.getElementById("startStopwatchBtn").addEventListener("click", startStopwatch);
document.getElementById("resetStopwatchBtn").addEventListener("click", resetStopwatch);
document.getElementById("lapBtn").addEventListener("click", recordLap);

document.getElementById("startTimerBtn").addEventListener("click", startTimer);
document.getElementById("resetTimerBtn").addEventListener("click", resetTimer);

document.getElementById("stopwatchTab").addEventListener("click", () => switchTab(true));
document.getElementById("timerTab").addEventListener("click", () => switchTab(false));
