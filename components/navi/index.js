// components/navi/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: '...'
    },
    latest: { // 最后一期期刊, 是最新一期期刊
      type: Boolean,
      value: false,
      observer: function() {}
    },
    first: { // 第一期期刊
      type: Boolean,
      value: false,
      observer: function() {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    disLeftSrc: 'images/triangle.dis@left.png',
    leftSrc: 'images/triangle@left.png',
    disRightSrc: 'images/triangle.dis@right.png',
    rightSrc: 'images/triangle@right.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLeft() {
      if (!this.data.latest) {
        this.triggerEvent('left', {}, {})
      }
    },
    onRight () {
      if (!this.data.first) {
        this.triggerEvent('right', {}, {})
      }
    }
  }
})
