export default [
  {
    path: '/magic/fireLogoBySvg',
    name: 'fireLogoBySvg',
    meta: {
      backgroundColor: 'black',
      title: 'Dengwb Web'
    },
    component: () => import('@/components/Magic/FireLogoBySvg.vue')
  },
  {
    path: '/magic/shakeBox',
    name: 'shakeBox',
    meta: {
      title: 'Dengwb Web'
    },
    component: () => import('@/components/Magic/ShakeBox.vue')
  }
]