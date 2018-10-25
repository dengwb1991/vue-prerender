<!-- 上传照片 -->
<template>
  <div class="upload">
    <section>
      <h2>单图</h2>
      <button @click="tapFile">选择图片</button>

      <input type="file"
             class="file"
             accept="image/*"
             ref="file"
             @change="changeImg($event)"/>

      <img v-if="imgSrc" :src="imgSrc"/>
    </section>

    <section>
      <h2>多图</h2>
      <button @click="tapFiles">选择图片</button>
      <input type="file"
             class="file"
             multiple="multiple"
             accept="image/*"
             ref="files"
             @change="changeImgs($event)"/>
      <div class="multiple-img-wrap">
        <div class="img-box"
             v-for="item in imgsSrc"
             v-dragging="{ item: item, list: imgsSrc, group: 'item' }"
             :key="item.src">
          <img :src="item.src"/>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data () {
    return {
      imgSrc: '',
      imgsSrc: []
    }
  },
  methods: {
    tapFiles () {
      this.$refs.files.click()
    },
    changeImgs (event) {
      const files = event.target.files
      for (let i = 0, len = files.length; i < len; i++) {
        const file = files[i]
        if (!(/^image\/.*$/i.test(file.type))) {
          continue
        }
        const freader = new FileReader()
        freader.readAsDataURL(file)
        freader.onload = e => {
          this.imgsSrc.push({
            src: e.target.result,
            index: this.imgsSrc.length
          })
        }
      }
    },
    tapFile () {
      this.$refs.file.click()
    },
    changeImg (event) {
      const files = event.target.files
      for (let i = 0, len = files.length; i < len; i++) {
        const file = files[i]
        if (!(/^image\/.*$/i.test(file.type))) {
          continue
        }
        const freader = new FileReader()
        freader.readAsDataURL(file)
        freader.onload = e => {
          this.imgSrc = e.target.result
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.upload
  section
    margin 20px
    width 500px
    border: 1px solid #bfcbd9;
    border-radius: 5px;
    padding: 20px 10px;
    overflow: hidden;
    .img-box
      width 100px
      height 100px
      display inline-block
    .multiple-img-wrap
      width 500px
    h2
      margin: 0
    img
      display inline-block
      padding 5px
      width 100px
      height 100px
    button
      padding 7px 9px
      font-size 12px
      border-radius 4px
      color #fff
      background-color #20a0ff
      border none
      user-select none
      outline none
      margin-right 20px
    input
      display none
</style>