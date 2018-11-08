<!-- 抖动 -->
<template>
  <div>
    <div class="shake-box">
      <div :class="['box', item.isShaking !== false && isAnimation]"
           v-for="(item, index) in arr"
           :style="{
             'background-color': item.color,
             left: `${item.left}px`,
             top: `${item.top}px`,
             transition: item.transition,
             'z-index': item.zIndex,
             'pointer-events': item.pointerEvents
           }"
           :data-index="index"
           :key="index"
           @touchstart="doTouchStart($event, item, item._index)"
           @touchmove="doTouchMove($event)"
           @touchend="doTouchEnd($event)">
        {{item.text}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      animat: false,  // 是否抖动
      timer: 0,  // 长按timer
      resetTimer: 0,  // 重置位置timer
      longClick: false,  // 是否长按
      checkedItem: null,  // 选中的元素
      targetItem: null,
      lock: false,
      top: 0,
      left: 0,
      arr: [
        { text: 'D', color: 'red', _index: 0 },
        { text: 'E', color: 'yellow', _index: 1 },
        { text: 'N', color: 'blue', _index: 2 },
        { text: 'G', color: 'pink', _index: 3 },
        { text: 'W', color: 'white', _index: 4 },
        { text: 'B', color: 'orange', _index: 5 }
      ]
    }
  },
  methods: {
    doTouchStart (event, item, index) {
      event.preventDefault()
      this.timer = setTimeout(() => {
        this.longClick = true
        this.animat = true
      }, 500)
      this.targetItem = null
      this.checkedItem = {
        ...item,
        x: event.touches[0].pageX,
        y: event.touches[0].pageY,
        index,
        el: this.getBlockEl(event.target)
      }
      this.top = this.arr[index].top
      this.left = this.arr[index].left
      this.setArray(index, { transition: null })
    },
    doTouchMove (event) {
      event.preventDefault()
      clearTimeout(this.timer)
      if (!this.longClick) return

      const CI = this.checkedItem
      this.setArray(CI.index, {
        left: event.touches[0].pageX - CI.x + CI.left,
        top: event.touches[0].pageY - CI.y + CI.top,
        isShaking: false,
        zIndex: 1,
        pointerEvents: 'none'
      })
      const el = this.getBlockEl(this.getOverElementFromTouch(event))

      if (!el || !CI || this.lock || !el.getAttribute('class') || !el.getAttribute('class').includes('animat') || el === CI.el) return

      this.lock = true
      const targetIndex = el.getAttribute('data-index')
      const TI = this.targetItem = this.arr[targetIndex]

      this.setArray(targetIndex, {
        left: this.left,
        top: this.top,
        transition: 'all 0.4s ease'
      })
      this.top = TI.top
      this.left = TI.left

      this.resetTimer = setTimeout(() => {
        this.lock = false
        this.setArray(targetIndex, { transition: null })
        let index = this.arr[targetIndex]._index
        this.arr[targetIndex]._index = this.arr[CI.index]._index
        this.arr[CI.index]._index = index
      }, 400)
    },
    doTouchEnd (event) {
      const CI = this.checkedItem
      const TI = this.targetItem
      const left = TI ? TI.left : CI.left
      const top = TI ? TI.top : CI.top

      this.setArray(CI.index, {
        transition: 'all 0.4s ease',
        left,
        top,
        isShaking: true,
        pointerEvents: null,
        zIndex: 2
      })
      this.resetTimer = setTimeout(() => {
        this.setArray(CI.index, { zIndex: null, transition: null })
        this.arr.sort((prev, curr) => +prev._index - +curr._index)
        clearTimeout(this.resetTimer)
      }, 400)
      clearTimeout(this.timer)
      if (!this.longClick) {
        this.animat = false
      }
      return false
    },
    setArray (index, obj) {
      this.$set(this.arr, index, { ...this.arr[index], ...obj })
    },
    getOverElementFromTouch (event) {
      const touch = event.touches[0]
      return document.elementFromPoint(touch.clientX, touch.clientY)
    },
    getBlockEl (el) {
      if (!el) return
      while (el.parentNode) {
        if (el.getAttribute) {
          return el
        } else {
          el = el.parentNode
        }
      }
    }
  },
  computed: {
    isAnimation () {
      return this.animat ? 'animat' : null
    }
  },
  created () {
    this.arr = this.arr.map((item, index) => {
      return {
        ...item,
        left: (2 + (index % 4 * 6)) * 12,
        top: (~~(index / 4) * 6 + 2) * 12
      }
    })
  }
}
</script>

<style lang="stylus" scoped>
.shake-box
  position relative
  margin auto
  width 26em
  height 20em
  .box
    position absolute
    display inline-block
    width 4em
    height 4em
    border 1px solid black
    border-radius 10px
    text-align center
    line-height 4em
  .animat
    animation shake-crazy .75s infinite linear
  .animat:nth-child(2n)
    animation shake-crazy .6s infinite linear
  .animat:nth-child(2n + 1)
    animation shake-crazy .7s infinite linear
@keyframes shake-crazy {
  0% {
    transform: translate3d(0, 0, 0) rotate(0deg);
  }
  17% {
    transform: translate3d(.2px, .2px, 0) rotate(4deg)
  }
  34% {
    transform: translate3d(-.2px, -.2px, 0) rotate(-4deg)
  }
  51% {
    transform: translate3d(0px, -.4px, 0) rotate(0deg)
  }
  68% {
    transform: translate3d(.2px, -.2px, 0) rotate(4deg)
  }
  85% {
    transform: translate3d(-.2px, .2px, 0) rotate(-4deg)
  }
  100% {
    transform: translate3d(0px, .4px, 0) rotate(0deg)
  }
}
</style>