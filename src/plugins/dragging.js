export default (Vue, options) => {
  Vue.directive('dragging', {
    bind: addDragEvent
  })

  function addDragEvent (event) {
    console.log(event, options)
  }
}