<template>
  <div>
    <div v-for="(item, index) in receivedEvents" :key="index" class="received-event">
      <div class="info-item">
        <img class="info-avatar" lazy-load @click="toProfile(item.actor.login)" :src="item.actor.avatar_url" alt="avatar"/>
        <div class="info-title">
          <p class="highlight" @click="toProfile(item.actor.login)">{{item.actor.login}}</p>
          <p class="info-action">{{item.payload.action||'created'}}</p>
          <p class="highlight">{{item.repo.name}}</p>
        </div>
      </div>
      <div class="repo-item">
        <activity-item :repoName="item.repo.name" />
      </div>
    </div>
  </div>
</template>

<script>
import activityItem from '@/components/activityItem/index'
import { get } from '@/utils/index'

export default {
  onLoad () {
    // @TODO 创建后台，存储token

    // 从缓存中获取token，判断是否显示登录页
    // const token = wx.getStorageSync('auth').token || ''
    // if (!token) {
    //   console.log('未认证，跳转到登录页')
    //   wx.redirectTo({
    //     url: '/pages/login/main'
    //   })
    // }
    this.getReceivedEvents()
  },
  components: {
    activityItem
  },
  data () {
    return {
      receivedEvents: []
    }
  },
  methods: {
    async getReceivedEvents () {
      // @TODO 替换token
      let auth = {}
      auth.token = ''
      wx.setStorageSync('auth', auth)
      let token = wx.getStorageSync('auth').token
      const header = {
        Authorization: 'token ' + token
      }

      const data = await get('/users/yellowpig/received_events', '', header)
      this.receivedEvents = data
    },
    toProfile (username) {
      wx.navigateTo({
        url: '/pages/profile/main?userName=' + username
      })
    }
  }
}
</script>

<style lang='scss' scoped>
@import "./style.scss"
</style>
