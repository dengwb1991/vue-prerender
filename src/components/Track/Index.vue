<template>
  <div>
    <p v-track-tap="{ trackName, trackAttr, callback }">
      指令点击埋点
    </p>

    <p v-track-load="{ trackName, trackAttr, callback }">
      指令加载埋点
    </p>

    <p @click="method1('123')">
      修饰器点击埋点
    </p>

    <p @click="method2('data')">
      修饰器点击逻辑埋点
    </p>
  </div>
</template>

<script>
import { decorator } from '../../plugins/decorator.js'

const trackData = {
  name: 'trackName1',
  attr: { key: 'key1' },
  callback: () => console.log('callback1')
}

export default {
  data () {
    return {
      trackName: 'trackName',
      trackAttr: {
        key: 'key'
      },
      callback: () => console.log('callback')
    }
  },
  methods: {
    @decorator(trackData.name, trackData.attr, trackData.callback)
    method1 (data) {
      console.log(data)
    },
    @decorator('trackName2')
    method2 (params) {
      return new Promise((resolve, reject) => {
        resolve({
          trackAttr: {
            key: 'key2'
          },
          callback: () => {
            console.log(params, 'callback2')
          }
        })
      })
    }
  }
}
</script>

<style scoped>
p {
  padding-left: 20px;
  font-size: 20px;
  line-height: 40px;
}
</style>