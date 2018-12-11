<template>
  <div class="repos">
    <div class="search">
      <div v-if="currentId==='repos'" class="search-btn" >
        <img src="../../../static/images/icon_search.png" class="search-icon"/>
        <input style="text" id="search-repo" placeholder="search Repositories.." @confirm="search" v-model="searchText"/>
      </div>
      <div v-if="currentId==='users'" class="search-btn" >
        <img src="../../../static/images/icon_search.png" class="search-icon"/>
        <input style="text" id="search-repo" placeholder="search Users.." @confirm="search" v-model="searchText"/>
      </div>
    </div>
    <div>
      <tabs @getTab="getTab" :tabs="tabs"></tabs>
    </div>
    <swiper :current-item-id="currentId" :style="{height: ViewHeight + 'px'}">
      <swiper-item item-id="repos">
        <scroll-view
        :style="{height: ViewHeight + 'px'}"
        enable-back-to-top="true"
        scroll-y="true"
        @scrolltolower="scrollToLower('event')"
        @scroll="scroll">
          <div class="search-result" v-if="reposResult.total_count">{{reposResult.total_count}} repositoriy results</div>
          <div v-for="(item, index) in reposResult.items" :key="index">
            <div class="repo-item">
              <repo-item :repo="item" />
            </div>
          </div>
        </scroll-view>
      </swiper-item>
      <swiper-item item-id="users">
        <div>
          <div class="search-result" v-if="usersResult.total_count">{{usersResult.total_count}} user results</div>
          <!-- <div v-for="(item, index) in usersResult.items" :key="index">
            <div class="repo-item">
              <repo-item :repo="item" />
            </div>
          </div> -->
        </div>
      </swiper-item>
    </swiper>
  </div>
</template>
<script>
import repoItem from '@/components/repoItem/index'
import tabs from '@/components/tabs/index'
import api from '@/http/api'

export default {
  created () {
    wx.getSystemInfo({
      success: (res) => {
        this.ViewHeight = res.windowHeight - 100
      }
    })
  },
  onLoad (options) {
  },
  components: {
    repoItem,
    tabs
  },
  mounted () {
  },
  data () {
    return {
      reposResult: [],
      usersResult: [],
      currentId: 'repos',
      tabs: [{
        id: 'repos',
        name: 'Repositories'
      }, {
        id: 'users',
        name: 'Users'}
      ],
      ViewHeight: 0,
      searchText: ''
    }
  },
  methods: {
    async getSearchResult (text) {
      var res = []
      if (this.currentId === 'repos') {
        res = await api.getRepoSearchResult(text)
        this.reposResult = res.data
      } else if (this.currentId === 'users') {
        res = await api.getUserSearchResult(text)
        this.usersResult = res.data
      }
    },
    search (e) {
      var searchText = e.mp.detail.value
      this.searchText = searchText
      if (searchText === '') {
        wx.showToast({
          title: '搜索不能为空',
          icon: 'loading',
          duration: 1200
        })
        return
      }
      this.getSearchResult(searchText)
    },
    getTab (data) {
      this.currentId = data.id
    },
    scrollToLower () {
      // @TODO 分页
      // var searchText = this.searchText
      // this.getSearchResult(searchText)
    },
  }
}
</script>

<style lang='scss' scoped>
@import "./style.scss"
</style>
