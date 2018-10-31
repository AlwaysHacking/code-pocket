<template>
  <div class="repo" @click="toRepo(repoInfo.full_name)">
    <img class="repo-avatar" lazy-load :src="repoInfo.avatar_url" alt="avatar"/>
    <div class="repo-title">
      <div class="title-top">
        <img src="../../octicons/svg/repo.svg" class="icon">
        <span>{{repoInfo.name}}</span>
      </div>
      <div class="title-middle" v-if="repoInfo.description">
        <span class="description">{{repoInfo.description}}</span>
      </div>
      <div class="title-bottom">
        <p><span class="lang-color" :style="{background: repoInfo.color||'black'}"></span>{{repoInfo.language||'unknown'}}</p>
        <p><img class="icon" src="../../octicons/svg/star.svg"/>{{repoInfo.stargazers_count||0}}</p>
        <p><img class="icon" src="../../octicons/svg/git-branch.svg"/>{{repoInfo.forks_count||0}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import colors from '@/utils/colors'
import { formatFigure } from '@/utils/index'

export default {
  props: {
    repo: {
      types: Object,
      defalt: {}
    }
  },
  created () {
    this.repoInfo = this.dealRepoInfo(this.repo)
  },
  data () {
    return {
      repoInfo: {}
    }
  },
  methods: {
    dealRepoColor (data) {
      return colors[data.language]
    },
    dealRepoInfo (data) {
      return {
        avatar_url: data.owner['avatar_url'],
        full_name: data.full_name,
        name: data.name,
        language: data.language,
        color: colors[data.language],
        stargazers_count: formatFigure(data.stargazers_count),
        forks_count: formatFigure(data.forks_count),
        description: data.description,
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
