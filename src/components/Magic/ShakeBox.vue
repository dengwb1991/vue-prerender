<!-- 抖动 -->
<template>
  <div class="aaa">
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
           @touchstart="doTouchStart($event, item, index)"
           @touchmove="doTouchMove($event, index)"
           @touchend="doTouchEnd($event, index)">
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
        { text: 'D', color: 'red' },
        { text: 'E', color: 'yellow' },
        { text: 'N', color: 'blue' },
        { text: 'G', color: 'pink' },
        { text: 'W', color: 'white' },
        { text: 'B', color: 'orange' }
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
      this.$set(this.arr, index, {
        ...this.arr[index],
        transition: null
      })
    },
    doTouchMove (event, index) {
      event.preventDefault()
      clearTimeout(this.timer)
      if (this.longClick) {
        let x = event.touches[0].pageX - this.checkedItem.x
        let y = event.touches[0].pageY - this.checkedItem.y
        this.$set(this.arr, index, {
          ...this.arr[index],
          left: x + this.checkedItem.left,
          top: y + this.checkedItem.top,
          isShaking: false,
          zIndex: 2,
          pointerEvents: 'none'
        })
        let el = this.getBlockEl(this.getOverElementFromTouch(event))

        if (!el || !this.checkedItem) return

        if (this.lock || !el.getAttribute('class') || !el.getAttribute('class').includes('animat') || el === this.checkedItem.el) return

        this.lock = true
        const targetIndex = el.getAttribute('data-index')
        this.targetItem = this.arr[targetIndex]

        this.$set(this.arr, targetIndex, {
          ...this.targetItem,
          left: this.left,
          top: this.top,
          transition: 'all 0.4s ease'
        })
        this.top = this.targetItem.top
        this.left = this.targetItem.left
        this.resetTimer = setTimeout(() => {
          this.$set(this.arr, targetIndex, {
            ...this.arr[targetIndex],
            transition: null
          })
          this.lock = false
          clearTimeout(this.resetTimer)
        }, 400)
      }
    },
    doTouchEnd (event, index) {
      const left = this.targetItem ? this.targetItem.left : this.checkedItem.left
      const top = this.targetItem ? this.targetItem.top : this.checkedItem.top
      this.$set(this.arr, index, {
        ...this.arr[index],
        transition: 'all 0.4s ease',
        left,
        top,
        isShaking: true,
        pointerEvents: null,
        zIndex: 1
      })

      // this.resetTimer = setTimeout(() => {
      //   this.$set(this.arr, index, {
      //     ...this.arr[index],
      //     transition: null,
      //     zIndex: null
      //   })
      //   clearTimeout(this.resetTimer)
      // }, 400)
      clearTimeout(this.timer)
      if (!this.longClick) {
        this.animat = false
      }
      return false
    },
    getOverElementFromTouch (event) {
      const touch = event.touches[0]
      const el = document.elementFromPoint(touch.clientX, touch.clientY)
      return el
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
    // transition all 0.4s ease
  .animat
    animation shake-crazy .75s infinite linear
  .animat:nth-child(2n)
    animation shake-crazy .6s infinite linear
  .animat:nth-child(2n + 1)
    animation shake-crazy .7s infinite linear
@keyframes shake-crazy {
  0% {
    transform: translate(0px, 0px) rotate(0deg);
  }
  17% {
    transform: translate(.2px, .2px) rotate(4deg)
  }
  34% {
    transform: translate(-.2px, -.2px) rotate(-4deg)
  }
  51% {
    transform: translate(0px, -.4px) rotate(0deg)
  }
  68% {
    transform: translate(.2px, -.2px) rotate(4deg)
  }
  85% {
    transform: translate(-.2px, .2px) rotate(-4deg)
  }
  100% {
    transform:translate(0px, .4px) rotate(0deg)
  }
}
</style>