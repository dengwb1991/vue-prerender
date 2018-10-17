<!-- 首页 -->
<template>
  <div class="prerender-index">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" class="shadow">
      <text x="0" y="50" class="small">Dengwb web</text>
    </svg>

    <div class="gooey" @click="toWelcome"></div>
  </div>
</template>

<script>
export default {
  methods: {
    toWelcome () {
      location.assign('https://www.dengwb.com/app/welcome.html')
    }
  }
}
</script>

<style lang="stylus" scoped>
.prerender-index
  .gooey
    // background-image: linear-gradient(120deg, #34e0f0 0%, #b400ff 100%);
    background-image: linear-gradient(120deg, #F08080 0%, #FF0000 100%);
    border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%;
    width: 150px;
    height: 144px
    animation: morph 3s linear infinite;
    transform-style: preserve-3d;
    outline: 1px solid transparent;
    will-change: border-radius;
    font-size 26px
    color #FFF;
    display inline-block
    font-family: 'Pacifico', Helvetica, sans-serif;

  .gooey:before,
  .gooey:after
    content: '';
    width: 100%;
    height: 100%;
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%;
    box-shadow: 5px 5px 89px rgba(139, 0, 0, 0.21);
    // box-shadow: 5px 5px 89px rgba(0, 102, 255, 0.21);
    will-change: border-radius, transform, opacity;
    animation-delay: 200ms;
    background-image: linear-gradient(120deg, rgba(255,160,122, .55) 0%, rgba(255,69,0,.89) 100%);
    // background-image: linear-gradient(120deg, rgba(0,67,255,.55) 0%, rgba(0,103,255,.89) 100%);

  .gooey:before
    animation: morph 3s linear infinite;
    opacity: .21;
    animation-duration: 1.5s;

  .gooey:after
    animation: morph 3s linear infinite;
    animation-delay: 400ms;
    opacity: .89;
    content: "About me";
    line-height: 120px;
    text-indent: -21px;

@keyframes morph{
  0%,100%{
  border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%;
    transform: translate3d(0,0,0) rotateZ(0.01deg);
  }
  34%{
      border-radius: 70% 30% 46% 54% / 30% 29% 71% 70%;
    transform:  translate3d(0,5px,0) rotateZ(0.01deg);
  }
  50%{
    opacity: .89;
    transform: translate3d(0,0,0) rotateZ(0.01deg);
  }
  67%{
    border-radius: 100% 60% 60% 100% / 100% 100% 60% 60% ;
    transform: translate3d(0,-3px,0) rotateZ(0.01deg);
  }
}

@keyframes fadeIn{
  100%{
    transform: scale(1.03);
    opacity: 0;
  }
}

@media only screen and (max-width: 800px)
  .prerender-index
    svg text
      font-size 42px

@media only screen and (max-width: 500px)
  .prerender-index
    svg text
      font-size 36px

.prerender-index
  text-align center
  background-color black
  svg
    height: 60vh;
    width 100%;
  text
    font-family: 'Pacifico', Helvetica, sans-serif;
    font-size: 50px;
    display: block;
    animation: dash .5s linear infinite;
    fill: orange;
    stroke: orange;
    stroke-width: .3px;
    stroke-dashoffset: 30;
    stroke-dasharray: 15;
  .shadow
    -webkit-filter: drop-shadow( -5px -5px 5px #000 );
    filter: drop-shadow( 5px 3px 3px white) drop-shadow( 0px 0px 5px orange) drop-shadow(4px 2px 15px red);
  @keyframes dash
    to
      stroke-dashoffset: 0;
</style>