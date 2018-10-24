<template>
  <div class="repo">
    <div class="repoInfo">
      <div class="baseInfo">
        <div class="base_user">
          <img class="avatarImg" lazy-load :src="repoInfo.owner.avatar_url" alt="avatar"/>
          <div>{{repoInfo.owner.login}}</div>
        </div>
        <div class="base_name">{{repoInfo.name}}</div>
        <div class="base_description" v-if="repoInfo.description">{{repoInfo.description}}</div>
        <div class="base_star">
          <button class="starBtn">Star</button>
          <div>{{repoInfo.stargazers_count}}</div>
        </div>
      </div>
      <div class="dataInfo">
        <div class="buttonBar">
          <div class="bar">
            <img src="../../octicons/svg/eye.svg" class="iconMini"><span class="textMini">watch</span>{{repoInfo.watchers}}
          </div>
          <div class="bar">
            <img src="../../octicons/svg/git-branch.svg" class="iconMini"><span class="textMini">fork</span>{{repoInfo.forks}}
          </div>
          <div class="bar">
            <img src="../../octicons/svg/issue-opened.svg" class="iconMini"><span class="textMini">issues</span>{{repoInfo.open_issues}}
          </div>
          <div class="bar">
            <img src="../../octicons/svg/calendar.svg" class="iconMini"><span class="textMini">updated</span>
          </div>
        </div>
        <div class="contributorList">
          <div class="listText">Contributor list</div>
        </div>
      </div>
    </div>
    <div class="repoToolbar">
      <div class="block borderTop borderBottom">
        <img src="../../octicons/svg/file-code.svg" class="icon">
        View Code
        <div class="arrow">
          <img src="../../../static/images/icon_arrow_right.png" class="icon">
        </div>
      </div>
      <div class="block borderTop borderBottom">
        <img src="../../octicons/svg/issue-opened.svg" class="icon">
        Issue
        <div class="arrow">
          <img src="../../../static/images/icon_arrow_right.png" class="icon">
        </div>
      </div>
    </div>
    <div class="repoReadMe">
      <div class="block borderTop borderBottom">
        <img src="../../octicons/svg/book.svg" class="icon">
        README.md
      </div>
    </div>
  </div>
</template>
<script>
import { get } from '@/utils/index'

export default {
  onLoad (options) {
    this.getRepoInfo(options.repoFullName)
  },
  mounted () {
  },
  data () {
    return {
      repoInfo: {}
    }
  },
  methods: {
    async getRepoInfo (reponame) {
      let token = wx.getStorageSync('auth').token
      const header = {
        Authorization: 'token ' + token
      }
      let url = '/repos/' + reponame

      const data = await get(url, '', header)
      this.repoInfo = data
    }
  }
}
</script>

<style lang='scss' scoped>
@import "./style.scss"
</style>
