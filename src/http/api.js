import {request, requestForOthers} from './request'

const api = {
  /**
   * Notification
  */
  getMyActivity: (page) => request('/users/yellowpig/received_events?page=' + page),

  /**
   * Search
  */
  getRepoSearchResult: (text) => request('/search/repositories?sort=starts&order=desc&q=' + text + '&per_page=20'),
  getUserSearchResult: (text) => request('/search/users?sort=starts&order=desc&q=' + text + '&per_page=20'),
  /**
   * Trending
  */
  getTrending: (time) => request('/search/repositories?sort=starts&order=desc&q=created:>' + time + '&per_page=20'),
  /**
   * Respositories
  */
  getContributorList: (repofullname) => request('/repos/' + repofullname + '/contributors'),
  getIsStar: (repofullname) => request('/user/starred/' + repofullname),
  deleteStar: (repofullname) => request('/user/starred/' + repofullname, 'DELETE'),
  putStar: (repofullname) => request('/user/starred/' + repofullname, 'PUT'),
  /**
   * Profile
   * follow接口需要用户使用范围登录并使用基本身份验证或OAuth进行身份验证user:follow
  */
  getIsFollow: (user) => request('/user/following/' + user),
  putFollow: (user) => request('/user/following/' + user, 'PUT'),
  deleteFollow: (user) => request('/user/following/' + user, 'DELETE'),
  /**
   * Public
  */
  login: (body, header) => request('/authorizations/clients/{#client_id}', 'PUT', body, header), // @TODO 登录接口待测试
  getRepo: (repofullname) => request('/repos/' + repofullname),
  getInfo: (user) => request('/users/' + user),
  getMyInfo: () => request('/user'),
  getReadme: (repofullname) => request('/repos/' + repofullname + '/contents/README.md'),
  getUserRepos: (user) => request('/users/' + user + '/repos'),
  getStarred: (user) => request('/users/' + user + '/starred'),
  /**
   * Others
   * 来自 https://github.com/sallar/github-contributions-api 封装的API
  */
  getContributionsHistory: (user) => requestForOthers('https://github-contributions-api.now.sh/v1/' + user)
}

export default api
