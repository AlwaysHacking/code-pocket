<template>
  <user :user="userInfo" />
</template>
<script>
import { get } from '@/utils/index'
import user from '@/components/user/index'

export default{
  onLoad () {
  },
  components: {
    user
  },
  mounted () {
    this.getData()
  },
  data () {
    return {
      userInfo: {},
    }
  },
  methods: {
    async getData () {
      let token = wx.getStorageSync('auth').token
      const header = {
        Authorization: 'token ' + token
      }
      const data = await get('/user', '', header)
      this.userInfo = data
    }
  }
}
</script>

<style lang='scss' scoped>
@import "./style.scss";
</style>
