/**
 * 埋点
 */
export function trackEvent ({ trackName, trackAttr, callback }) {
  return new Promise((resolve, reject) => {
    console.log('埋点:', trackName, trackAttr, callback)
    callback && callback()
    resolve(true)
  }).catch(err => {
    callback && callback()
    reject(err)
  })
}

// export function trackEvent ({ trackName, trackAttr, callback }) {
//   console.log(trackName, trackAttr, callback)
//   return new Promise((resolve, reject) => {
//     zhuge.track(trackName, trackAttr, () => {
//       callback && callback()
//       resolve(true)
//     })
//   }).catch(err => {
//     callback && callback()
//     reject(err)
//   })
// }

// export function trackEvent (name, attr, callBack) {
//   try {
//     if (/(m|new-beta)\.wecash|shanshanhua/.test(location.host)) {
//       zhuge.track(name, attr, function () {
//         callBack && callBack()
//       })
//     }
//   } catch (err) {
//     callBack && callBack()
//   }
// }






