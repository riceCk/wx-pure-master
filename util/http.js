import { config } from '../config.js'
import { Base64 } from 'js-base64'

const tips = {
  1: '抱歉，出现了一个错误',
  1005: 'appkey无效，请退出重新登录',
  1006: 'token不合法，请重新登录',
  10000: '期刊不存在'
}

class HTTP {
  // 带token
  request({ url, method = 'GET', data = {} }) {
    return new Promise((resolve, reject) => {
      this._request(url,resolve,reject,method,data)
    })
  }
  _request(url, resolve, reject, method, data) {
    wx.request({
      url: config.api_base_url + url,
      method,
      data,
      header: {
        'content-type': 'application/json',
        Authorization: this._encode()
      },
      success: res => {
        const code = res.statusCode.toString();
        if (code.startsWith('2')) {
          resolve(res.data)
        } else {
          const error_code = res.data.error_code
          this._show_error(error_code)
          reject()
        }
      },
      fail: (err) => {
        reject()
        this._show_error(1)
      }
    })
  }

  getToken({ url, method = 'GET', data = {} }) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: config.api_base_url + url,
        method,
        data,
        header: {
          'content-type': 'application/json',
        },
        success: res => {
          const code = res.statusCode.toString();
          if (code.startsWith('2')) {
            resolve(res)
          } else {
            let error_code = res.data.error_code
            this._show_error(error_code)
            reject(res)
          }
        },
        fail: (err) => {
          this._show_error(1)
        }
      })
    })
  }

  _show_error(error_code = 1) {
    const tip = tips[error_code]
    wx.showToast({
      title: tip ? tip : tips[1],
      icon: 'none',
      duration: 2000
    })
  }

  _encode() {
    const token = wx.getStorageSync('token')
    const base64 = Base64.encode(token + ":")
    return 'Basic ' + base64
  }
}

export { HTTP }