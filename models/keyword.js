import {HTTP} from '../util/http';

class KeyworldModel extends HTTP {
  key = 'q'
  maxLength = 10
  // 获取历史搜索数据
  getHistory () { 
    return wx.getStorageSync(this.key) 
  } 

  // 获取热门搜索
  getHot () {
    return this.request({
      url: 'book/hot_keyword'
    })
  }
  // 关键字写入缓存
  addToHistory (keyword) {
    let words = this.getHistory() || []
    const has = words.includes(keyword)
    if (!has) {
      words.unshift(keyword)
      words = words.slice(0, this.maxLength);
      wx.setStorageSync(this.key, words)
    }
  } 
}

export {KeyworldModel}