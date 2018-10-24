<template>
  <div class="repo" @click="toRepo(repo.full_name)">
    <img class="repo-avatar" lazy-load :src="repo.owner.avatar_url" alt="avatar"/>
    <div class="repo-title">
      <div class="title-top">
        <img src="../../octicons/svg/repo.svg" class="icon">
        <span>{{repo.name}}</span>
      </div>
      <div class="title-middle" v-if="repo.description">
        <span class="description">{{repo.description}}</span>
      </div>
      <div class="title-bottom">
        <p v-if="repo.language"><span class="lang-color" :style="{background: repoColor||'black'}"></span>{{repo.language||'unknown'}}</p>
        <p><img class="icon" src="../../octicons/svg/star.svg"/>{{repo.stargazers_count||0}}</p>
        <p><img class="icon" src="../../octicons/svg/git-branch.svg"/>{{repo.forks_count||0}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import colors from '@/utils/colors'

export default {
  props: {
    repo: {
      types: Object,
      defalt: {}
    }
  },
  created () {
    this.repoColor = this.dealRepoColor(this.repo)
  },
  data () {
    return {
      repoColor: ''
    }
  },
  methods: {
    dealRepoColor (data) {
      return colors[data.language]
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
