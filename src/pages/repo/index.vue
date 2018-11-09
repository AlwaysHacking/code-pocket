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
      <div class="readme">
        <wxParse :content="readme"/>
      </div>
    </div>
  </div>
</template>
<script>
import { formatFigure } from '@/utils/index'
import { format } from 'date-fns'
import { Base64 } from 'js-base64'
import marked from 'marked'
import wxParse from 'mpvue-wxparse'
import api from '@/http/api'

export default {
  onLoad (options) {
    this.repoInfo = {}
    this.readme = '<p>此仓库无README.</p>'
    this.repoName = options.repoFullName

    this.getRepoInfo(this.repoName)
    this.getReadMe(this.repoName)
  },
  mounted () {
  },
  async onPullDownRefresh () {
    await this.getRepoInfo(this.repoName)
    await this.getReadMe(this.repoName)
    wx.stopPullDownRefresh()
  },
  data () {
    return {
      repoInfo: {},
      repoName: '',
      readme: ''
    }
  },
  components: {
    wxParse
  },
  methods: {
    async getRepoInfo (reponame) {
      const res = await api.getRepo(reponame)
      const data = res.data
      // @TODO item.owner.avatar_url在DOM渲染时报avatar_url属性undefined的错误
      // get请求是异步的,意味着该函数的执行不会阻塞后面代码的执行。所以会先执行下一个函数,再获得全部data数据
      this.repoInfo = this.dealRepo(data)
    },
    async getReadMe (reponame) {
      const res = await api.getReadme(reponame)
      const data = res.data
      // @TODO 仓库无README时会报404错误
      if (data === false) {
        this.readme = '<p>此仓库无README.</p>'
      } else {
        let readme = Base64.decode(data.content)
        this.readme = marked(readme)
        console.log(this.readme)
      }
    },
    dealRepo (data) {
      return {
        updated_at: format(data.updated_at, 'MMM DD'),
        avatar_url: data.owner['avatar_url'],
        login: data.owner['login'],
        name: data.name,
        description: data.description,
        stargazers_count: formatFigure(data.stargazers_count),
        watchers: formatFigure(data.watchers),
        forks: formatFigure(data.forks),
        open_issues: data.open_issues
      }
    }
  }
}
</script>

<style lang='scss' scoped>
@import "./style.scss";
@import url("~mpvue-wxparse/src/wxParse.css");
</style>
