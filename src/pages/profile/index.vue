<template>
  <div class="profile">
    <div class="baseInfo borderTop borderBottom">
      <div class="avatar">
        <img :src="userInfo.avatar_url" alt="avatar" class="avatarImg">
      </div>
      <div class="info">
        <div class="login">{{userInfo.login}}</div>
        <ul class="userDetail">
          <li>
             <img src="../../octicons/svg/location.svg" class="svg">
             <span>{{userInfo.location||''}}</span>
          </li>
          <li>
             <img src="../../octicons/svg/mail.svg" class="svg">
             <span>{{userInfo.email||''}}</span>
          </li>
          <li>
             <img src="../../octicons/svg/link.svg" class="svg">
             <span class="html_url">{{userInfo.html_url||''}}</span>
          </li>
        </ul>
        <div class="follow borderTop">
          <span>Followers</span><span class="number">{{userInfo.followers}}</span>
          <span>Following</span><span class="number">{{userInfo.following}}</span>
        </div>
        <div class="bio borderTop" v-if="userInfo.bio">
          <span>{{userInfo.bio||''}}</span>
        </div>
        <div class="organizarions borderTop">
          Organizarions:
        </div>
      </div>
    </div>
    <div class="blank"></div>
    <div class="codeInfo">
      <div class="block borderTop borderBottom" @click="toRepo">
        <img src="../../octicons/svg/repo.svg" class="icon">
        Repositories
        <div class="arrow">
          <img src="../../../static/images/icon_arrow_right.png" class="icon">
        </div>
      </div>
      <div class="block borderTop borderBottom">
        <img src="../../octicons/svg/star.svg" class="icon">
        Stars
        <div class="arrow">
          <img src="../../../static/images/icon_arrow_right.png" class="icon">
        </div>
      </div>
    </div>
    <div class="blank"></div>
  </div>
</template>
<script>
import { get } from '@/utils/index'

export default{
  onLoad () {
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
      // @TODO 替换token
      // let token = wx.getStorageSync('auth').token
      let token = '081d665ed24b369bcffdfffbf0d154b8c69c40c3'
      const header = {
        Authorization: 'token ' + token
      }
      const data = await get('/user', '', header)
      this.userInfo = data
    },
    toRepo () {
      wx.navigateTo({
        url: '/pages/repositories/main'
      })
    }
  }
}
</script>

<style lang='scss' scoped>
@import "./style.scss";
</style>
