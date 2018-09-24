// import axios from 'axios'

// const base = 'https://api.github.com'

export function searchApi (query) {
  // return axios.get(`${base}/search/repositories`, {
  //   q: query
  // })
  wx.showLoading({
    title: '加载中',
  })
  return new Promise((resolve, reject) => {
    wx.request({
      url: 'https://api.github.com/search/repositories',
      data: { q: 'react' },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {
      //   'X-Bmob-Application-Id': bmobConfig.applicationId,
      //   'X-Bmob-REST-API-Key': bmobConfig.restApiKey,
      //   'Content-Type': 'application/json'
      // }, // 设置请求的 header
      success: function (res) {
        // success
        wx.hideLoading()
        if (res.statusCode !== 200) {
          wx.showToast({
            title: '网络出错，稍后再试',
            icon: 'none',
          })
          return false
        }
        resolve(res.data)
        console.log(res.data)
      },
      fail: function (error) {
        // fail
        wx.hideLoading()
        reject(error) // 请求失败
      },
      complete: function () {
        wx.hideLoading()
        // complete
      },
    })
  })
  // console.log(wx.requset('https://api.github.com/search/repositories'))
}
