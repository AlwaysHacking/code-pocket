<template>
  <user :user="userInfo" />
</template>
<script>
import { get } from '@/utils/index'
import user from '@/components/user/index'

export default{
  onLoad (options) {
    var vm = this
    vm.userInfo = {}
    vm.getData(options.userName)
  },
  components: {
    user
  },
  data () {
    return {
      userInfo: {},
    }
  },
  methods: {
    async getData (username) {
      let token = wx.getStorageSync('auth').token
      const header = {
        Authorization: 'token ' + token
      }
      let url = '/users/' + username
      const data = await get(url, '', header)
      this.userInfo = data
    }
  }
}
</script>

<style lang='scss' scoped>
@import "./style.scss";
</style>
