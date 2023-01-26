// ripple.js
import Vue from 'vue'

function addRippleEffect(el) {
    el.addEventListener('mousedown', e => {
        const ripple = document.createElement('div')
        ripple.classList.add('ripple-effect')
        const x = e.clientX - el.getBoundingClientRect().left
        const y = e.clientY - el.getBoundingClientRect().top
        ripple.style.left = x + 'px'
        ripple.style.top = y + 'px'
        el.appendChild(ripple)
    })
    el.addEventListener('mouseup', e => {
        const ripple = el.querySelector('.ripple-effect')
        ripple.remove()
    })
}

Vue.directive('ripple', {
    bind(el, binding) {
        addRippleEffect(el)
    }
})
