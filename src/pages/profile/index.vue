<template>
  <user :user="userInfo" />
</template>
<script>
import api from '@/http/api'
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
      const res = await api.getInfo(username)
      const data = res.data
      this.userInfo = data
    }
  }
}
</script>

<style lang='scss' scoped>
@import "./style.scss";
</style>
