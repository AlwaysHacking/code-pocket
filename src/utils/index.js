import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'
import differenceInCalendarDays from 'date-fns/difference_in_calendar_days'
import { format } from 'date-fns'

function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

export function formatDateDifference (time) {
  // 获取与当前时间的天数差
  let distanceToNowNum = differenceInCalendarDays(new Date(), time)

  if (distanceToNowNum <= 30) {
    let words = distanceInWordsToNow(time)
    if (words.indexOf('day') !== -1) {
      return words + ' ago'
    }
    return words
  }
  return format(time, 'MMM DD, YYYY')
}

export function formatFigure (num) {
  // 换算千以上的数字，用于展示star数量
  // 1300=1.3k
  if (num < 1000) {
    return num
  } else if (num >= 1000) {
    return Math.round(num / 100) / 10 + 'k'
  }
}

export default {
  formatNumber,
  formatTime
}

// -------------------------------------------------------------------------请求的封装

const host = 'https://api.github.com'
export {
  host
}
// 请求封装
function request (url, method, data, header = {'content-type': 'application/json'}) {
  wx.showLoading({
    title: '加载中' // 数据请求前loading
  })
  return new Promise((resolve, reject) => {
    wx.request({
      url: host + url,
      method: method,
      data: data,
      header: header,
      success: function (res) {
        wx.hideLoading()
        resolve(res.data)
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
export function get (url, data, header) {
  return request(url, 'GET', data, header)
}
export function post (url, data) {
  return request(url, 'POST', data)
}
export function put (url, data, header) {
  return request(url, 'PUT', data, header)
}
// -------------------------------------------------------------------------请求的封装
