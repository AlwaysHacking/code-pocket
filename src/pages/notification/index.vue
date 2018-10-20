<template>
  <div>
    <div v-for="(item, index) in receivedEvents" :key="index" class="received-event">
      <div class="info-item">
        <img class="info-avatar" lazy-load :src="item.actor.avatar_url" alt="avatar"/>
        <div class="info-title">
          <p class="highlight">{{item.actor.login}}</p>
          <p class="info-action">{{item.payload.action||'created'}}</p>
          <p class="highlight">{{item.repo.name}}</p>
        </div>
      </div>
      <div class="repo-item">
        <repo-item :repoName="item.repo.name" />
      </div>
    </div>
  </div>
</template>

<script>
import repoItem from '@/components/repoItem/index'
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
    repoItem
  },
  data () {
    return {
      receivedEvents: []
    }
  },
  methods: {
    async getReceivedEvents () {
      // @TODO 替换token
      // let token = wx.getStorageSync('auth').token
      let token = '081d665ed24b369bcffdfffbf0d154b8c69c40c3'
      const header = {
        Authorization: 'token ' + token
      }

      const data = await get('/users/yellowpig/received_events', '', header)
      this.receivedEvents = data
    }
  }
}
</script>

<style lang='scss' scoped>
@import "./style.scss"
</style>
