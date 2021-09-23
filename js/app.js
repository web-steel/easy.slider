const DOWN = 'DOWN'
const UP = 'UP'

const sidebar = document.querySelector('.sidebar')
const mainSlide = document.querySelector('.main-slide')
const container = document.querySelector('.container')
const slides = mainSlide.querySelectorAll('.main-slide > div')

let activeSlideIndex = slides.length - 1
let activeVideo = getActiveVideoByIndex(0)

activeVideo.autoplay = true
sidebar.style.top = `-${activeSlideIndex * 100}vh`

const upButton = document.querySelector('.up-button')
const downButton = document.querySelector('.down-button')

const pauseButton = document.querySelector('.pause-button')
const iconPauseIcon = pauseButton.querySelector('i')

const volumeButton = document.querySelector('.volume-button')
const iconVolumeIcon = volumeButton.querySelector('i')

const moves = document.querySelectorAll('video')

pauseButton.addEventListener('click', toggleRunVideo)
volumeButton.addEventListener('click', toggleVolumeVideo)

upButton.addEventListener('click', () => changeSlide(UP))
downButton.addEventListener('click', () => changeSlide(DOWN))

/**
 *
 * @param {string} direction
 */
function changeSlide(direction) {
  if (direction === UP) {
    activeSlideIndex++

    if (activeSlideIndex >= slides.length) {
      activeSlideIndex = 0
    }
  }

  if (direction === DOWN) {
    activeSlideIndex--

    if (activeSlideIndex < 0) {
      activeSlideIndex = slides.length - 1
    }
  }

  activeVideo = getActiveVideoByIndex(activeSlideIndex)
  allVideoPause()

  if (isPauseVideo()) {
    activeVideo.play().then()
  }

  const height = container.clientHeight
  mainSlide.style.transform = `translateY(-${activeSlideIndex * height}px)`
  sidebar.style.transform = `translateY(${activeSlideIndex * height}px)`
}

function toggleRunVideo() {
  let removeClass = 'fa-play'
  let addClass = 'fa-pause'

  if (isPauseVideo()) {
    removeClass = 'fa-pause'
    addClass = 'fa-play'
  }

  iconPauseIcon.classList.remove(removeClass)
  iconPauseIcon.classList.add(addClass)

  allVideoPause()

  if (isPauseVideo()) {
    activeVideo.play().then()
  }
}

function toggleVolumeVideo() {
  let removeClass = 'fa-volume-up'
  let addClass = 'fa-volume-mute'

  if (isMutedVideo()) {
    removeClass = 'fa-volume-mute'
    addClass = 'fa-volume-up'
  }

  iconVolumeIcon.classList.remove(removeClass)
  iconVolumeIcon.classList.add(addClass)

  toggleVideoVolume(isMutedVideo())
}

/**
 *
 * @return {boolean}
 */
function isMutedVideo() {
  return iconVolumeIcon.classList.contains('fa-volume-mute')
}

/**
 *
 * @return {boolean}
 */
function isPauseVideo() {
  return iconPauseIcon.classList.contains('fa-pause')
}

function allVideoPause() {
  for(const video of moves) {
    video.pause()
  }
}

/**
 *
 * @param {boolean} toggle
 */
function toggleVideoVolume(toggle) {
  for(const video of moves) {
    video.muted = toggle
  }
}

/**
 *
 * @param {number} index
 * @return {HTMLElement}
 */
function getActiveVideoByIndex(index) {
  return slides[index].querySelector('video')
}
