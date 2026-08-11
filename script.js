let id;

function show(id) {
  document.querySelectorAll(".panel").forEach(p => {
    p.style.display = "none";
    p.classList.remove("fadeOut");
  });

  document.getElementById(id).style.display = "grid";
  document.getElementById("darken").style.display = "block";
}

function hide(id) { 
  const el = document.getElementById(id); 
  el.classList.add("fadeOut"); 
  el.addEventListener("animationend", () => {
    el.style.display = "none";
    el.classList.remove("fadeOut");
  }, { once: true });
  document.getElementById("darken").style.display = "none";
}

let lightMode = localStorage.getItem('lightMode');
const themeSwitch = document.getElementById('themeSwitch');

const enableLightMode = () => {
  document.body.classList.add('lightMode');
  localStorage.setItem('lightMode', 'active');
  document.getElementById('modeStatus').textContent = 'Light';
  document.getElementById('pic').src = 'sun-boiled.png';
}

const disableLightMode = () => {
  document.body.classList.remove('lightMode');
  localStorage.setItem('lightMode', null);
  document.getElementById('modeStatus').textContent = 'Dark';
  document.getElementById('pic').src = 'moon-boiled.png';
}

if (lightMode === 'active') {
  enableLightMode();
}

themeSwitch.addEventListener("click", () => {
  lightMode = localStorage.getItem('lightMode');
  lightMode !== 'active' ? enableLightMode() : disableLightMode();
});

const hvrAboutme = document.querySelector("#aboutme-button");
const hvrEducation = document.querySelector("#education-button");
const hvrSocials = document.querySelector("#socials-button");
const hvrPortfolio = document.querySelector("#portfolio-button");

hvrAboutme.addEventListener("mouseover", () => {
  document.getElementById("center-pic").src = "center-pic/about-me-boiled.png";
});
hvrEducation.addEventListener("mouseover", () => {
  document.getElementById("center-pic").src = "center-pic/education-boiled.png";
});
hvrSocials.addEventListener("mouseover", () => {
  document.getElementById("center-pic").src = "center-pic/socials-boiled.png";
});
hvrPortfolio.addEventListener("mouseover", () => {
  document.getElementById("center-pic").src = "center-pic/portfolio-boiled.png";
});

const aboutmeContent = document.getElementById('aboutme-content');
const aboutmeHeader = document.getElementById('aboutme-header');
const educationContent = document.getElementById('education-content');
const educationHeader = document.getElementById('education-header');
const socialsContent = document.getElementById('socials-content');
const socialsHeader = document.getElementById('socials-header');
const portfolioContent = document.getElementById('portfolio-content');
const portfolioHeader = document.getElementById('portfolio-header');
const creditsContent = document.getElementById('credits-content');
const creditsHeader = document.getElementById('credits-header');

aboutmeContent.addEventListener('scroll', () => {
  if (aboutmeContent.scrollTop > 5) {
    aboutmeHeader.classList.add('header-shadow');
  } else {
    aboutmeHeader.classList.remove('header-shadow');
  }
});
educationContent.addEventListener('scroll', () => {
  if (educationContent.scrollTop > 5) {
    educationHeader.classList.add('header-shadow');
  } else {
    educationHeader.classList.remove('header-shadow');
  }
});
socialsContent.addEventListener('scroll', () => {
  if (socialsContent.scrollTop > 5) {
    socialsHeader.classList.add('header-shadow');
  } else {
    socialsHeader.classList.remove('header-shadow');
  }
});
portfolioContent.addEventListener('scroll', () => {
  if (portfolioContent.scrollTop > 5) {
    portfolioHeader.classList.add('header-shadow');
  } else {
    portfolioHeader.classList.remove('header-shadow');
  }
});
creditsContent.addEventListener('scroll', () => {
  if (creditsContent.scrollTop > 5) {
    creditsHeader.classList.add('header-shadow');
  } else {
    creditsHeader.classList.remove('header-shadow');
  }
});

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const masterGain = audioCtx.createGain();
masterGain.connect(audioCtx.destination);
masterGain.gain.value = 0;

let isMuted = true;
let bgMusicBuffer, hoverBuffer, clickBuffer, bgMusicSource;

async function loadSound(url) {
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  return await audioCtx.decodeAudioData(arrayBuffer);
}

loadSound('audio/background.mp3').then(data => bgMusicBuffer = data);
loadSound('audio/hover.wav').then(data => hoverBuffer = data);
loadSound('audio/click.wav').then(data => clickBuffer = data);
loadSound('audio/close.wav').then(data => closeBuffer = data);

function playSound(buffer) {
  if (!buffer) return; 
  const source = audioCtx.createBufferSource();
  source.buffer = buffer;
  source.connect(masterGain);
  source.start(0);
}

function playBackgroundMusic(buffer) {
  bgMusicSource = audioCtx.createBufferSource();
  bgMusicSource.buffer = buffer;
  bgMusicSource.loop = true;
  bgMusicSource.connect(masterGain);
  bgMusicSource.start(0);
}

const musicSwitch = document.getElementById('musicSwitch');

musicSwitch.addEventListener('click', async () => {
  if (audioCtx.state === 'suspended') await audioCtx.resume();

  isMuted = !isMuted;

  if (!isMuted) {
    masterGain.gain.value = 1; 
    document.getElementById('musicStatus').textContent = 'On';
    document.getElementById('music-pic').src = 'musicon.png';
    if (!bgMusicSource && bgMusicBuffer) playBackgroundMusic(bgMusicBuffer);
  } else {
    masterGain.gain.value = 0; 
    document.getElementById('musicStatus').textContent = 'Off';
    document.getElementById('music-pic').src = 'musicoff.png';
  }
});

document.querySelectorAll(".panel-button").forEach(button => {
  button.addEventListener("mouseenter", () => playSound(hoverBuffer));
  button.addEventListener("click", () => playSound(clickBuffer));
});

document.querySelectorAll(".close-button").forEach(button => {
  button.addEventListener("click", () => playSound(closeBuffer));
});

document.querySelectorAll(".light-mode-toggle").forEach(button => {
  button.addEventListener("click", () => playSound(closeBuffer));
});