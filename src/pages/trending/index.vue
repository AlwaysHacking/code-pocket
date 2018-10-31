<template>
  <div class="repos">
    <div v-for="(item, index) in repos" :key="index">
      <div class="repo-item">
        <repo-item :repo="item" />
      </div>
    </div>
  </div>
</template>
<script>
import repoItem from '@/components/repoItem/index'
import { get, getDateLastWeek } from '@/utils/index'

export default {
  onLoad (options) {
    var vm = this
    vm.getRepos()
  },
  components: {
    repoItem
  },
  mounted () {
  },
  async onPullDownRefresh () {
    await this.getRepos()
    wx.stopPullDownRefresh()
  },
  data () {
    return {
      repos: []
    }
  },
  methods: {
    async getRepos () {
      let token = wx.getStorageSync('auth').token
      let url = ''
      let last7date = getDateLastWeek()
      const header = {
        Authorization: 'token ' + token
      }

      // 通过Github Search API 获得一周内创建同时start数量最多项目
      url = '/search/repositories?sort=starts&order=desc&q=created:>' + last7date + '&per_page=20'

      const data = await get(url, '', header)
      this.repos = data.items
    }
  }
}
</script>

<style lang='scss' scoped>
@import "./style.scss"
</style>
