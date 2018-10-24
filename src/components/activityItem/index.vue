<template>
  <div class="repo" @click="toRepo(repoInfo.full_name)">
    <img class="repo-avatar" lazy-load @click="toProfile(repoInfo.login)" :src="repoInfo.avatar_url" alt="avatar"/>
    <div class="repo-title">
      <div class="title-top">
        <img src="../../octicons/svg/repo.svg" class="icon">
        <span>{{repoInfo.full_name}}</span>
      </div>
      <div class="title-bottom">
        <p><span class="lang-color" :style="{background: repoInfo.color||'black'}"></span>{{repoInfo.language||'unknown'}}</p>
        <p><img class="icon" src="../../octicons/svg/star.svg"/>{{repoInfo.stargazers_count||0}}</p>
        <p><img class="icon" src="../../octicons/svg/calendar.svg"/>{{repoInfo.updated_at}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { get } from '@/utils/index'
import colors from '@/utils/colors'

export default {
  props: {
    repoName: {
      types: String,
      defalt: ''
    }
  },
  created () {
    this.getRepoInfo()
  },
  data () {
    return {
      repoInfo: {}
    }
  },
  methods: {
    async getRepoInfo () {
      const url = '/repos/' + this.repoName

      // @TODO 替换token
      let token = wx.getStorageSync('auth').token
      var header = {
        Authorization: 'token ' + token
      }

      const data = await get(url, '', header)
      this.repoInfo = this.dealRepoInfo(data)
    },
    dealRepoInfo (data) {
      return {
        avatar_url: data.owner['avatar_url'],
        login: data.owner['login'],
        full_name: data.full_name,
        language: data.language,
        color: colors[data.language],
        stargazers_count: data.stargazers_count,
        forks_count: data.forks_count,
        description: data.description
      }
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
    }
  }
}
</script>

<style scoped lang='scss'>
  @import './style.scss'
</style>
