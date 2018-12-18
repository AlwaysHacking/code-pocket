<template>
  <div class="repo" @click="toProfile(userInfo.login)">
    <img class="repo-avatar" lazy-load :src="userInfo.avatar_url" alt="avatar"/>
    <div class="repo-title">
      <div class="title-top">
        <span>{{userInfo.login}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      types: Object,
      defalt: {}
    }
  },
  created () {
    this.userInfo = this.dealUserInfo(this.user)
  },
  data () {
    return {
      userInfo: {}
    }
  },
  methods: {
    dealUserInfo (data) {
      return {
        avatar_url: data['avatar_url'],
        login: data.login
      }
    },
    toProfile (username) {
      wx.navigateTo({
        url: '/pages/profile/main?userName=' + username
      })
    },
  }
}
</script>

<style scoped lang='scss'>
  @import './style.scss'
</style>
