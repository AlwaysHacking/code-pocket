<template>
  <div class="repos">
    <div v-for="(item, index) in repos" :key="index">
      <div class="repo-item">
        <repo-item :repoName="item.full_name" />
      </div>
    </div>
  </div>
</template>
<script>
import repoItem from '@/components/repoItem/index'
import { get } from '@/utils/index'

export default {
  onLoad () {
    this.getRepos()
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
    async getRepos () {
      // @TODO 替换token
      // let token = wx.getStorageSync('auth').token
      let token = '081d665ed24b369bcffdfffbf0d154b8c69c40c3'
      const header = {
        Authorization: 'token ' + token
      }

      const data = await get('/users/yellowpig/repos', '', header)
      this.repos = data
    }
  }
}
</script>

<style lang='scss' scoped>
@import "./style.scss"
</style>
