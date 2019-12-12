import {
  HTTP
} from '../util/http.js'

class BookModel extends HTTP {
  getHotList () {
    return this.request({
      url: 'book/hot_list'
    })
  }

  getMyBookCount () {
    return this.request({
      url: 'book/favor/count'
    })
  }
}

export {BookModel}