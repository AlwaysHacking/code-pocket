<template>
  <div class="repo" @click="toRepo(repoInfo.full_name)">
    <img class="repo-avatar" lazy-load :src="repoInfo.avatar_url" alt="avatar"/>
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
import { formatDateDifference, formatFigure } from '@/utils/index'
import colors from '@/utils/colors'
import api from '@/http/api'

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
      const res = await api.getRepo(this.repoName)
      const data = res.data
      this.repoInfo = this.dealRepoInfo(data)
    },
    dealRepoInfo (data) {
      return {
        avatar_url: data.owner['avatar_url'],
        login: data.owner['login'],
        full_name: data.full_name,
        language: data.language,
        color: colors[data.language],
        stargazers_count: formatFigure(data.stargazers_count),
        description: data.description,
        updated_at: formatDateDifference(data['updated_at'], 'MMM DD, YYYY')
      }
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
