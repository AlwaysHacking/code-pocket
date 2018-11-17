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
import api from '@/http/api'

export default {
  onLoad (options) {
    var vm = this
    vm.repos = []
    vm.userName = options.userName
    vm.pageType = options.type
    vm.getRepos(vm.pageType, vm.userName)
  },
  components: {
    repoItem
  },
  mounted () {
  },
  data () {
    return {
      repos: [],
      userName: '',
      pageType: ''
    }
  },
  methods: {
    async getRepos (type, name) {
      var res = {}
      // 判断页面是reposities还是starred
      if (type === 'myrepo') {
        res = await api.getUserRepos(name)
      } else if (type === 'starredrepo') {
        res = await api.getStarred(name)
      }

      const data = res.data
      this.repos = data
    }
  }
}
</script>

<style lang='scss' scoped>
@import "./style.scss"
</style>
