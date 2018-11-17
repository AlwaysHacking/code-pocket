import {request} from './request'

const api = {
  /**
   * Notification
  */
  getMyActivity: () => request('/users/yellowpig/received_events'),

  /**
   * Search
  */
  getSearchResult: (text) => request('/search/repositories?sort=starts&order=desc&q=' + text + '&per_page=20'),

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
   * Public
  */
  login: (body, header) => request('/authorizations/clients/{#client_id}', 'PUT', body, header), // @TODO 登录接口待测试
  getRepo: (repofullname) => request('/repos/' + repofullname),
  getInfo: (user) => request('/users/' + user),
  getMyInfo: () => request('/user'),
  getReadme: (repofullname) => request('/repos/' + repofullname + '/contents/README.md'),
  getUserRepos: (user) => request('/users/' + user + '/repos'),
  getStarred: (user) => request('/users/' + user + '/starred')
}

export default api
