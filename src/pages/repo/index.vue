<template>
  <div class="repo">
    <div class="repoInfo">
      <div class="baseInfo">
        <div class="base_user">
          <img class="avatarImg" lazy-load :src="repoInfo.avatar_url" alt="avatar"/>
          <div>{{repoInfo.login}}</div>
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
            <img src="../../octicons/svg/calendar.svg" class="iconMini"><span class="textMini">updated</span>{{repoInfo['updated_at']}}
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
import { format } from 'date-fns'

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
      // @TODO item.owner.avatar_url在DOM渲染时报avatar_url属性undefined的错误
      // get请求是异步的,意味着该函数的执行不会阻塞后面代码的执行。所以会先执行下一个函数,再获得全部data数据
      this.repoInfo = this.dealRepo(data)
      console.log(this.repoInfo)
    },
    dealRepo (data) {
      return {
        updated_at: format(data.updated_at, 'MMM DD'),
        avatar_url: data.owner['avatar_url'],
        login: data.owner['login'],
        name: data.name,
        description: data.description,
        stargazers_count: data.stargazers_count,
        watchers: data.watchers,
        forks: data.forks,
        open_issues: data.open_issues
      }
    }
  }
}
</script>

<style lang='scss' scoped>
@import "./style.scss"
</style>
