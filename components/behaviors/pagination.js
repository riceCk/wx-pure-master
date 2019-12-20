let paginationBev = Behavior({
  properties: {},
  data: {
    dataArray: [],
    total: null,
    noneResult: false,
  },
  methods: {
    // 合并处理列表数据
    setMoreData (dataArray) {
      const tempArray = this.data.dataArray.concat(dataArray)
      this.setData({
        dataArray: tempArray
      })
    },

    // 计算起始请求的记位数
    getCurrentStart () {
      return this.data.dataArray.length
    },

    // 设置数据总数
    setTotal (total) {
      if (total == 0) {
        this.setData({
          noneResult: true
        })
      } 
      this.data.total = total
    },

    // 是否还有更多的数据需要加载
    hasMore () {
      const {total, dataArray} = this.data
      if (dataArray.length >= total) {
        return false 
      }
      return true
    },
    
    // 清空数据
    initialize () {
      this.setData({
        dataArray: [],
        total: null,
        noneResult: false,
      })
    }
  }
})

export { paginationBev }