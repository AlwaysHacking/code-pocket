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
    <div class="codeToolBar">
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
    <div class="contributionBar">
      <div class="block borderTop borderBottom contributionTotal">
        {{totalInfo.total}} contribututions in {{totalInfo.year}}
      </div>
      <!-- 如果从网页爬标签，一般放在后台处理  -->
      <!-- <scroll-view :style="{'height': '200px'}" :scroll-x="true">
        <img src="../../calendarSVG/20170521-20180521.svg" style="height:150px;width:600px"/>
      </scroll-view> -->
     </div>
  </div>
</template>

<script>
import api from '@/http/api'

export default {
  props: {
    user: {
      types: Object,
      defalt: {}
    }
  },
  watch: {
    // 父组件向子组件异步传值时,子组件methods方法获取不到数据,需要watch监听
    user: function (newVal, oldVal) {
      this.user = newVal
      /** @TODO 两种方法获取提交日历：
       * 1.前端：github-contributions-api获取数据，手写js渲染
       * 2.后端：用cheerio.js从页面中截取svg标签部分储存成svg文件，页面中用img标签读入
       * **/
      this.getContributions(this.user.login)
    }
  },
  data () {
    return {
      user: {},
      totalInfo: {},
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
    },
    async getContributions (username) {
      var res = await api.getContributionsHistory(username)
      var data = res.data
      console.log(data)
      this.totalInfo = data.years[0]
    }
  }
}
</script>

<style lang='scss' scoped>
@import "./style.scss";
</style>
