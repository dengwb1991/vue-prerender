import { trackEvent } from './track'

export const decorator = (name, attr, cb) => (target, mname, descriptor) => {
  const fn = descriptor.value
  descriptor.value = function (...arg) {
    Promise.resolve(fn.apply(this, arg)).then(data => {
      if (Object.prototype.toString.call(data) === '[object Object]') {
        const { trackName, trackAttr, callback } = data
        trackEvent({
          trackName: trackName || name,
          trackAttr: trackAttr || attr,
          callback: callback || cb
        })
      } else {
        trackEvent({ trackName: name, trackAttr: attr, callback: cb })
      }
    })
  }
}
