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
import { get } from '@/utils/index'

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
      let token = wx.getStorageSync('auth').token
      let url = ''
      const header = {
        Authorization: 'token ' + token
      }

      url = '/search/repositories?sort=starts&order=desc&q=' + text + '&per_page=20'

      const data = await get(url, '', header)
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
