// components/tag/index.js
Component({
  /**
   * 组件的属性列表
   */
  options: {
    multipleSlots: true, // 启动插槽
  },
  externalClasses: ['tag-class'],
  properties: {
    text: String
  },

  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap (event) {
      console.log(123123)
      this.triggerEvent('tapping', {
        text: this.data.text
      })
    }
  }
})
