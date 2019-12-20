import {
  KeyworldModel
} from '../../models/keyword'

import {
  BookModel
} from '../../models/book'

import {paginationBev} from '../behaviors/pagination'

const keyworldModel = new KeyworldModel()
const bookModel = new BookModel()

// components/search/index.js
Component({
  /**
   * 组件的属性列表
   */
  behaviors: [paginationBev],
  properties: {
    more: {
      type: String,
      observer: 'loadMore'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    hotWords: [],
    q: '',
    searching: false,
    loading: false, // 搜索接口锁
    loadingCenter: false, // 页面刚进来时的
  },

  attached () {
     keyworldModel.getHot().then(res => {
      this.setData({
        hotWords: res.hot
      })
    })
    this.setData({
      historyWords: keyworldModel.getHistory()
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 取消按钮
    onCancel () {
      this.triggerEvent('cancel')
      this.initialize()
    },
    // 搜索输入框确认事件
    onConfirm (event) {
      const q = event.detail.value || event.detail.text
      this._showResult(q)
      bookModel.search(0, q).then(res => {
        this._hideLoadingCenter()
        this.setMoreData(res.books)
        this.setTotal(res.total)
        keyworldModel.addToHistory(q)
      })
    },
    
    // 搜索框里差差图片事件
    onDetete () {
      this.initialize()
      this.setData({
        searching: false,
        q: ''
      })
    },
    // 监听book界面下more属性传递过来的变化
    loadMore () {
      const {q, loading} = this.data
      if (!q || loading || !this.hasMore()) {
        return
      }
      this._locked()
      bookModel.search(this.getCurrentStart(), q).then(res => {
        this.setMoreData(res.books)
        this._unLocked()
      }, () => {
        this._unLocked()
      })
    },

    // _搜索图书列表的开关
    _showResult (q) {
      this.setData({
        searching: true,
        loadingCenter: true,
        q
      })
    },
    _hideLoadingCenter () {
      this.setData({
        loadingCenter: false
      })
    },
    // 加载锁
    _locked () {
      this.setData({
        loading: true
      })
    },
    // 解锁
    _unLocked () {
      this.setData({
        loading: false
      })
    }
  }
})
