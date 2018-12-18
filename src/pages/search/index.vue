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
        :scroll-top="scrollTopRepo"
        @scrolltolower="scrollToLowerRepo('event')"
        @scroll="scroll">
          <div class="search-result" v-if="reposTotalCount">{{reposTotalCount}} repositoriy results</div>
          <div v-for="(item, index) in reposResult" :key="index">
            <div class="repo-item">
              <repo-item :repo="item" />
            </div>
          </div>
        </scroll-view>
      </swiper-item>
      <swiper-item item-id="users">
        <scroll-view
        :style="{height: ViewHeight + 'px'}"
        enable-back-to-top="true"
        scroll-y="true"
        :scroll-top="scrollTopUser"
        @scrolltolower="scrollToLowerUser('event')"
        @scroll="scroll">
          <div class="search-result" v-if="usersTotalCount">{{usersTotalCount}} user results</div>
          <div v-for="(item, index) in usersResult" :key="index">
            <div class="repo-item">
              <user-item :user="item" />
            </div>
          </div>
        </scroll-view>
      </swiper-item>
    </swiper>
  </div>
</template>
<script>
import repoItem from '@/components/repoItem/index'
import userItem from '@/components/userItem/index'
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
    userItem,
    repoItem,
    tabs
  },
  mounted () {
  },
  data () {
    return {
      reposResult: [],
      usersResult: [],
      scrollTopRepo: 1,
      scrollTopUser: 1,
      reposSearchPage: 1,
      usersSearchPage: 1,
      reposTotalCount: 0,
      usersTotalCount: 0,
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
    async getRepoSearchResult (text, page) {
      var res = []
      res = await api.getRepoSearchResult(text, page)
      this.reposTotalCount = res.data.total_count
      this.reposResult = this.reposResult.concat(res.data.items)
    },
    async getUserSearchResult (text, page) {
      var res = []
      res = await api.getUserSearchResult(text, page)
      this.usersTotalCount = res.data.total_count
      this.usersResult = this.usersResult.concat(res.data.items)
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
      if (this.currentId === 'repos') {
        this.reposSearchPage = 1
        this.reposResult = []
        this.scrollTopRepo = 0
        this.getRepoSearchResult(searchText, 1)
      } else if (this.currentId === 'users') {
        this.usersSearchPage = 1
        this.usersResult = []
        this.scrollTopUser = 0
        this.getUserSearchResult(searchText, 1)
      }
    },
    getTab (data) {
      this.currentId = data.id
    },
    scroll (e) {
      /**
       * @TODO mpvue scroll-view设置scroll-top自动回弹bug
       * 微信小程序的scroll-view组件设置竖向滚动条位置scroll-top设置项时如果参数一样,页面不会重新渲染
       * 但mpvue在更新某个属性时都会更新整个data
       * 使得scroll-view组件绑定scrollTop时，会出现组件所在vue实例data发生改变时自动回弹到最上方的情况
       * 参考：https://github.com/Meituan-Dianping/mpvue/issues/639
      **/
      this.scrollTopRepo = 1
      this.scrollTopUser = 1
    },
    scrollToLowerRepo () {
      var searchText = this.searchText
      this.scrollTopRepo = 1
      this.reposSearchPage += 1
      this.getRepoSearchResult(searchText, this.reposSearchPage)
    },
    scrollToLowerUser () {
      var searchText = this.searchText
      this.scrollTopUser = 1
      this.usersSearchPage += 1
      this.getUserSearchResult(searchText, this.usersSearchPage)
    }
  }
}
</script>

<style lang='scss' scoped>
@import "./style.scss"
</style>
