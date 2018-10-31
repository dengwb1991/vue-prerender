<!-- 抖动 -->
<template>
  <div class="shake-box">
    <div class="box" style="background-color: red">D</div>
    <div class="box" style="background-color: yellow">E</div>
    <div class="box" style="background-color: blue">N</div>
    <div class="box" style="background-color: pink">G</div>
  </div>
</template>

<style lang="stylus" scoped>
.shake-box
  padding 20px
  .box
    display inline-block
    width 40px
    height 40px
    margin 10px
    border 1px solid black
    border-radius 10px
    text-align center
    line-height 40px
    animation shake-crazy .8s infinite linear
  .box:nth-child(2)
    animation shake-calm .7s infinite linear

@keyframes shake-calm {
  0% {
    transform translate(0px, -.2px) rotate(2deg)
  }
  20% {
    transform translate(-.4px, -.4px) rotate(-4deg)
  }
  40% {
    transform translate(-.4px, .2px) rotate(4deg)
  }
  60% {
    transform translate(.2px, .2px) rotate(-4deg)
  }
  80% {
    transform translate(.2px, -.4px) rotate(4deg)
  }
  100% {
    transform translate(-.2px, 0px) rotate(-2deg)
  }
}

@keyframes shake-crazy {
  0% {
    transform translate(-.2px, 0px) rotate(-2deg)
  }
  20% {
    transform translate(.2px, -.4px) rotate(4deg)
  }
  40% {
    transform translate(.2px, .2px) rotate(-4deg)
  }
  60% {
    transform translate(-.4px, .2px) rotate(4deg)
  }
  80% {
    transform translate(-.4px, -.4px) rotate(-4deg)
  }
  100% {
    transform translate(0px, -.2px) rotate(2deg)
  }
}
</style>