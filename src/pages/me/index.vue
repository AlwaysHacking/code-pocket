<template>
  <user :user="userInfo" />
</template>
<script>
import api from '@/http/api'
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
      const res = await api.getMyInfo()
      const data = res.data
      this.userInfo = data
    }
  }
}
</script>

<style lang='scss' scoped>
@import "./style.scss";
</style>
