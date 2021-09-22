const DOWN = 'DOWN'
const UP = 'UP'

const sidebar = document.querySelector('.sidebar')
const mainSlide = document.querySelector('.main-slide')
const container = document.querySelector('.container')
const slidesCount = mainSlide.querySelectorAll('div').length

let activeSlideIndex = slidesCount - 1

sidebar.style.top = `-${activeSlideIndex * 100}vh`

const upButton = document.querySelector('.up-button')
const downButton = document.querySelector('.down-button')

upButton.addEventListener('click', () => changeSlide(UP))
downButton.addEventListener('click', () => changeSlide(DOWN))

function changeSlide(direction) {
  if (direction === UP) {
    activeSlideIndex++

    if (activeSlideIndex >= slidesCount) {
      activeSlideIndex = 0
    }
  }

  if (direction === DOWN) {
    activeSlideIndex--

    if (activeSlideIndex < 0) {
      activeSlideIndex = slidesCount - 1
    }
  }

  const height = container.clientHeight
  mainSlide.style.transform = `translateY(-${activeSlideIndex * height}px)`
  sidebar.style.transform = `translateY(${activeSlideIndex * height}px)`
}
