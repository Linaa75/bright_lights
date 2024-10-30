import { Pagination } from 'swiper/modules';
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
    music.src = "/IChooseMe-Amanati-Roniit.m4a";

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


// burger
(function () {
	const isOpen = document.querySelector(".header__inner-burger")
	const isClose = document.querySelector(".header__nav-close")
	const navigation = document.querySelector(".header__nav")

	isOpen.addEventListener('click', () => {
		navigation.classList.add('active')
	})

	isClose.addEventListener('click', () => {
		navigation.classList.remove('active')
	})
})();

var swiper = new Swiper(".swiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 40,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },

    pagination: {
      el: ".swiper-pagination",
    },
});