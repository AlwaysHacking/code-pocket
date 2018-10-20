import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

// 此部分在app.json中设置
// export default {
//   // 这个字段设置路由、title、tabbar
//   config: {
//     // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
//     // eslint检测字符串必须用单引号
//     'pages': ['^pages/notification/main', 'pages/trending/main', 'pages/profile/main', 'pages/search/main'],
//     'window': {
//       'backgroundTextStyle': 'light',
//       'navigationBarBackgroundColor': '#fff',
//       'navigationBarTitleText': 'MiniGithub',
//       'navigationBarTextStyle': 'black'
//     },
//     'tabBar': {
//       'backgroundColor': '#fafafa',
//       'borderStyle': 'white',
//       'selectedColor': '#b4282d',
//       'color': '#666',
//       'list': [{
//         'pagePath': 'pages/notification/main',
//         // "iconPath": "static/images/ic_menu_choice_nor.png",
//         // "selectedIconPath": "static/images/ic_menu_choice_pressed.png",
//         'text': 'Notification'
//       },
//       {
//         'pagePath': 'pages/trending/main',
//         // "iconPath": "static/images/ic_menu_choice_nor.png",
//         // "selectedIconPath": "static/images/ic_menu_choice_pressed.png",
//         'text': 'Trending'
//       },
//       {
//         'pagePath': 'pages/profile/main',
//         // "iconPath": "static/images/ic_menu_choice_nor.png",
//         // "selectedIconPath": "static/images/ic_menu_choice_pressed.png",
//         'text': 'Profile'
//       },
//       {
//         'pagePath': 'pages/search/main',
//         // "iconPath": "static/images/ic_menu_choice_nor.png",
//         // "selectedIconPath": "static/images/ic_menu_choice_pressed.png",
//         'text': 'Search'
//       }
//       ]
//     }
//   }
// }
