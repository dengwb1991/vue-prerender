import { trackEvent } from './track.js'

const directive = {}

directive.install = Vue => {
  Vue.directive('trackLoad', {
    bind: (el, binding) => {
      el.onload = trackEvent(binding.value)
    }
  })
  Vue.directive('trackTap', {
    bind: (el, binding) => {
      el.onclick = () => trackEvent(binding.value).then(() => console.log('resolve'))
    }
  })
}

export default directive