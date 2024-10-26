import '../scss/style.scss'
//import switchThemeColor from './localstaradge.js'
//switchThemeColor()

const music = document.querySelector("#audio");
const slider = document.querySelector(".hero__player-slider");
const currentTime = document.querySelector(".hero__player-time-current");
const durationTime = document.querySelector(".hero__player-time-duration");
const playBtn = document.querySelector(".hero__player-controls-btn");

let intervalId;

playBtn.addEventListener("click", () => {
    if(playBtn.className.includes('pause')) {
        music.play();
        startUpdateTime();
    } else {
        music.pause();
        clearInterval(intervalId);
    }
    playBtn.classList.toggle("pause");
});

const playMusic = () => {
    music.src = "/src/audio/IChooseMe-Amanati-Roniit.m4a";

    currentTime.innerHTML = "00:00";

    music.addEventListener("loadedmetadata", () => {
        slider.max = music.duration;
        durationTime.innerHTML = formatTime(music.duration);
    });

    music.addEventListener("ended", () => {
        music.currentTime = 0;
        currentTime.innerHTML = "00:00";
        slider.value = 0;
        playBtn.classList.add("pause");
        clearInterval(intervalId);
    })
}

const formatTime = (time) => {
    const min = String(Math.floor(time / 60)).padStart(2, "0");
    const sec = String(Math.floor(time % 60)).padStart(2, "0");

    return `${min}:${sec}`;
};

const startUpdateTime = () => {
    intervalId = setInterval(() => {
        slider.value = music.currentTime
        currentTime.innerHTML = formatTime(music.currentTime)
    }, 500)
}

slider.addEventListener("change", () => {
    music.currentTime = slider.value
})

playMusic();