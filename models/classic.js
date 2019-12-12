import {HTTP} from '../util/http.js'

class ClassicModel extends HTTP {
  // 最新一期期刊
  getLatet() {
   const latet = this.request({
      url: 'classic/latest'
    })
    latet.then(res => {
      this._setLatestIndex(res.index)
      wx.setStorageSync(this._getKey(res.index), res)
    })
    return latet
  }
  /**
   * 思路：
   * 1、先判断是否有缓存
   * 2、有缓存取缓存，否则在请求
   * 3、没有缓存定义缓存
   * @param {上下期判断} nextOrPrevious 
   * @param {期刊index} index 
   */
  getClassic (nextOrPrevious, index) {
    let key = nextOrPrevious == 'next' ? this._getKey(index + 1) : this._getKey(index - 1);
    let classic = wx.getStorageSync(key)
    if (!classic) {
      classic = this.request({
        url: `classic/${index}/${nextOrPrevious}`
      })
      classic.then(res => {
        wx.setStorageSync(this._getKey(res.index), res)
      })
    }
    return Promise.resolve(classic)
  }
  /**
   * 设置缓存期刊缓存机制
   */
  // 设置缓存机制期刊的key值
  _getKey (index) {
    let key = 'classic-' + index
    return key
  }
  // 上一期期刊是否可点击
  isFirst (index) {
    return index == 1 ? true : false
  }
  // 下一期期刊是否可点击
  isLatest (index) {
    return index == this._getLatestIndex() ? true : false
  }

  // 同步缓存最新期刊index
  _setLatestIndex(index) {
    wx.setStorageSync('latest', index)
  }

  // 读取缓存中的信息
  _getLatestIndex() {
    return wx.getStorageSync('latest')
  }
}

export {ClassicModel}