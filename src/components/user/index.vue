<template>
  <div class="profile">
    <div class="baseInfo borderTop borderBottom">
      <div class="avatar">
        <img :src="user.avatar_url" alt="avatar" class="avatarImg">
      </div>
      <div class="info">
        <div class="login">{{user.login}}</div>
        <ul class="userDetail">
          <li>
             <img src="../../octicons/svg/location.svg" class="userIcon">
             <span>{{user.location||''}}</span>
          </li>
          <li>
             <img src="../../octicons/svg/mail.svg" class="userIcon">
             <span>{{user.email||''}}</span>
          </li>
          <li>
             <img src="../../octicons/svg/link.svg" class="userIcon">
             <span class="html_url">{{user.html_url||''}}</span>
          </li>
        </ul>
        <div class="follow borderTop">
          <span>Followers</span><span class="number">{{user.followers}}</span>
          <span>Following</span><span class="number">{{user.following}}</span>
        </div>
        <div class="bio borderTop" v-if="user.bio">
          <span>{{user.bio||''}}</span>
        </div>
        <div class="organizarions borderTop">
          Organizarions:
        </div>
      </div>
    </div>
    <div class="codeToolbar">
      <div class="block borderTop borderBottom" @click="toRepo">
        <img src="../../octicons/svg/repo.svg" class="icon">
        Repositories
        <div class="arrow">
          <img src="../../../static/images/icon_arrow_right.png" class="icon">
        </div>
      </div>
      <div class="block borderTop borderBottom" @click="toStarredRepo">
        <img src="../../octicons/svg/star.svg" class="icon">
        Stars
        <div class="arrow">
          <img src="../../../static/images/icon_arrow_right.png" class="icon">
        </div>
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
  },
  data () {
    return {
    }
  },
  methods: {
    toRepo () {
      wx.navigateTo({
        url: '/pages/repositories/main?type=myrepo&userName=' + this.user.login
      })
    },
    toStarredRepo () {
      wx.navigateTo({
        url: '/pages/repositories/main?type=starredrepo&userName=' + this.user.login
      })
    }
  }
}
</script>

<style lang='scss' scoped>
@import "./style.scss";
</style>
