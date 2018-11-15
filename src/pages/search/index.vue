<template>
  <div class="repos">
    <div class="search">
      <div class="search-btn">
        <img src="../../../static/images/icon_search.png" class="search-icon"/>
        <input style="text" id="search-input" placeholder="Search..." @confirm="search"/>
      </div>
    </div>
    <div>
      <div class="search-result" v-if="repos.total_count">{{repos.total_count}} repositoriy results</div>
      <div v-for="(item, index) in repos.items" :key="index">
        <div class="repo-item">
          <repo-item :repo="item" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import repoItem from '@/components/repoItem/index'
import api from '@/http/api'

export default {
  onLoad (options) {
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
    async getRepos (text) {
      const res = await api.getSearchResult(text)
      const data = res.data
      this.repos = data
    },
    search (e) {
      var searchText = e.mp.detail.value
      if (searchText === '') {
        wx.showToast({
          title: '搜索不能为空',
          icon: 'loading',
          duration: 1200
        })
        return
      }
      this.getRepos(searchText)
    }
  }
}
</script>

<style lang='scss' scoped>
@import "./style.scss"
</style>
