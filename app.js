import {HTTP} from './util/http.js'
const http = new HTTP()

//app.js
App({
  onLaunch: function () {
    // 登录
    wx.login({
      success: res => {
        if (res.code) {
          const tonken = http.getToken({
            url: 'token',
            method: 'POST',
            data: {
              account: res.code,
              type: '100'
            }
          })
          tonken.then(res => {
            wx.setStorageSync('token', res.data.token)
          })
        }
      }
    })
  }
})