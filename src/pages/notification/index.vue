<template>
  <div class="notification">
    <div v-for="(item, index) in receivedEvents" :key="index" class="received-event" v-if="item.type==='WatchEvent'||item.type==='CreateEvent'||item.type==='ForkEvent'">
      <div class="info-item">
        <img class="info-avatar" lazy-load @click="toProfile(item.actor.login)" :src="item.actor.avatar_url" alt="avatar"/>
        <div class="info-title">
          <div class="title-text">
            <p class="highlight limitWidth" @click="toProfile(item.actor.login)">{{item.actor.login}}</p>
            <p class="action">
              <span v-if="item.type==='WatchEvent'">started</span>
              <span v-if="item.type==='CreateEvent'">created</span>
              <span v-if="item.type==='ForkEvent'">forked</span>
            </p>
            <p class="highlight limitWidth" @click="toRepo(item.repo.name)">{{item.repo.name}}</p>
          </div>
          <div class="title-time">{{item['created_at']}}</div>
        </div>
      </div>
      <div class="repo-item">
        <activity-item :repoName="item.repo.name" />
      </div>
    </div>
    <div class="footer" v-if="receivedEvents">--The END--</div>
  </div>

</template>

<script>
import activityItem from '@/components/activityItem/index'
import { formatDateDifference } from '@/utils/index'
import api from '@/http/api'

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
  async onPullDownRefresh () {
    await this.getReceivedEvents()
    wx.stopPullDownRefresh()
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

      const res = await api.getMyActivity()
      const data = res.data
      this.receivedEvents = this.dealEvents(data)
    },
    toProfile (username) {
      wx.navigateTo({
        url: '/pages/profile/main?userName=' + username
      })
    },
    toRepo (reponame) {
      wx.navigateTo({
        url: '/pages/repo/main?repoFullName=' + reponame
      })
    },
    dealEvents (data) {
      let events = []
      events = data.map(item => {
        return {
          type: item.type,
          actor: {
            login: item.actor.login,
            avatar_url: item.actor['avatar_url']
          },
          repo: {
            name: item.repo.name
          },
          created_at: formatDateDifference(item['created_at'], 'MMM DD, YYYY')
        }
      })
      return events
    }
  }
}
</script>

<style lang='scss' scoped>
@import "./style.scss"
</style>
