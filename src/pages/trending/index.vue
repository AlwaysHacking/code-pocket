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
import { getDateLastWeek } from '@/utils/index'
import api from '@/http/api'

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
      let last7date = getDateLastWeek()
      // 通过Github Search API 获得一周内创建同时start数量最多项目
      const res = await api.getTrending(last7date)
      const data = res.data
      this.repos = data.items
    }
  }
}
</script>

<style lang='scss' scoped>
@import "./style.scss"
</style>
