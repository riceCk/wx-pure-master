import {
  HTTP
} from '../util/http.js'

class BookModel extends HTTP {
  // 获取热门书籍列表信息
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

  // 获取书籍详细信息
  getDetail (bid) {
    return this.request({
      url: `book/${bid}/detail`
    })
  }
  // 获取短评
  getLikeStatus (bid) {
    return this.request({
      url: `book/${bid}/favor`
    })
  }

  getComments (bid) {
    return this.request({
      url: `book/${bid}/short_comment`
    })
  }

  // 提交短评接口
  postComment(bid, comment) {
    return this.request({
      url: 'book/add/short_comment',
      method: 'POST',
      data: {
        book_id: bid,
        content: comment
      }
    })
  }

  // 搜索书籍接口
  search(start, q) {
    return this.request({
      url: 'book/search?summary=1',
      data: {
        q,
        start
      }
    })
  }
}

export {BookModel}