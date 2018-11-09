const host = 'https://api.github.com'
export {
  host
}

function getAuth () {
  let headers = {}
  let token = wx.getStorageSync('auth').token
  headers = {
    'Authorization': 'token ' + token,
    'content-type': 'application/json'
  }
  return headers
}

// 请求封装
export function request (url, method = 'GET', data = '', headers = getAuth()) {
  wx.showLoading({
    title: '加载中' // 数据请求前loading
  })
  return new Promise((resolve, reject) => {
    wx.request({
      url: host + url,
      method: method,
      data: data,
      header: headers,
      success: function (res) {
        wx.hideLoading()
        resolve(res)
        // 部分github提供的接口回复的信息为404，所以需要返回信息包括状态码
      },
      fail: function (error) {
        if (error) {
          wx.hideLoading()
          reject(new Error('Network request failed'))
        }
      },
      complete: function () {
        wx.hideLoading()
      }
    })
  })
}
