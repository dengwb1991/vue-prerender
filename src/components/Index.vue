<template>
  <div>
    <div class="logo-wrap">
      <img :src="logo"/>
    </div>

    <div class="title-wrap">
      <p>DENG</p>
      <p>Personal</p>
      <p>website</p>
      <p class="me" @click="toWelcome">About Me</p>
    </div>
  </div>
</template>

<script>
import logo from '@/assets/images/dengwb.png'
export default {
  data () {
    return {
      logo
    }
  },
  methods: {
    toWelcome () {
      location.assign('https://www.dengwb.com/app/welcome.html')
    }
  }
}
</script>

<style lang="stylus" scoped>
.me {
  padding-top 40px
  font-family HelveticaNeue-Bold
  font-size 20px
  animation flicker 1s linear infinite
}
.me:hover {
  cursor: pointer
}
@keyframes flicker {
  0% {
    opacity .3
  }
  50% {
    opacity 1
  }
  100% {
    opacity .3
  }
}

.title-wrap {
  font-family HelveticaNeue-Bold
  padding-top 40px
  font-size 30px
  color #181818
  width 200px
  margin auto
  p {
    margin 0
    font-size 30px
    line-height 40px
  }
}
.logo-wrap {
  width 100%
  text-align center
  margin-top 120px
}
img {
  width 200px
}
</style>