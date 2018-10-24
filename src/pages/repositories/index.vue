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
import { get } from '@/utils/index'

export default {
  onLoad (options) {
    var vm = this
    vm.getRepos(options.type, options.userName)
  },
  components: {
    repoItem
  },
  mounted () {
  },
  data () {
    return {
      repos: []
    }
  },
  methods: {
    async getRepos (type, name) {
      let token = wx.getStorageSync('auth').token
      let url = ''
      const header = {
        Authorization: 'token ' + token
      }

      // 判断页面是reposities还是starred
      if (type === 'myrepo') {
        url = '/users/' + name + '/repos'
      } else if (type === 'starredrepo') {
        url = '/users/' + name + '/starred'
      }

      const data = await get(url, '', header)
      this.repos = data
    }
  }
}
</script>

<style lang='scss' scoped>
@import "./style.scss"
</style>
