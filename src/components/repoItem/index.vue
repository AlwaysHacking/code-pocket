<template>
  <div class="repo">
    <img class="repo-avatar" lazy-load @click="toProfile(repo.owner.login)" :src="repo.owner.avatar_url" alt="avatar"/>
    <div class="repo-title">
      <div class="title-top">
        <img src="../../octicons/svg/repo.svg" class="icon">
        <span>{{repo.full_name}}</span>
      </div>
      <div class="title-middle" v-if="repo.description">
        <span class="description">{{repo.description}}</span>
      </div>
      <div class="title-bottom">
        <p v-if="repo.language"><span class="lang-color" :style="{background: repoColor}"></span>{{repo.language}}</p>
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
    toProfile (username) {
      wx.navigateTo({
        url: '/pages/profile/main?userName=' + username
      })
    }
  }
}
</script>

<style scoped lang='scss'>
  @import './style.scss'
</style>
