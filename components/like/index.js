// components/like/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    like: {
      type: Boolean,
      value: false
    },
    count: {
      type: Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    yesSrc: 'images/like.png',
    noSrc: 'images/like@dis.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike () {
      let {like, count} = this.data
      count = like ? count - 1 : count + 1
      this.setData({
        count,
        like: !like
      })
      let behavior = !like ? 'like' : 'cancel'
      this.triggerEvent('like', {
        behavior
      }, {})
    }
  }
})
