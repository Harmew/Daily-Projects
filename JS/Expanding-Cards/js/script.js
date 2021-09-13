const imgs = document.querySelectorAll('img')

const animationCharger = (event => {
    imgs.forEach(item => item.classList.remove('active'))
    event.target.classList.add('active')
})

imgs.forEach(item => item.addEventListener('click', animationCharger))
