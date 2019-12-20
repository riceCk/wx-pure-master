// pages/book-detail/book-detail.js
import {
  BookModel
} from '../../models/book'
import {
  LikeModel
} from '../../models/like'
const bookModel = new BookModel()
const likeModel = new LikeModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    comments: [],
    book: null,
    likeStatus: false,
    likeCount: 0,
    posting: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading()
    const {bid} = options
    const detail = bookModel.getDetail(bid);
    const comments = bookModel.getComments(bid);
    const likeStatus = bookModel.getLikeStatus(bid)
    Promise.all([detail, comments, likeStatus])
    .then(res => {
      this.setData({
        book: res[0],
        comments: res[1],
        likeStatus: res[2].comments.fav_nums,
        likeCount: res[2].comments.like_status
      })
      wx.hideLoading()
    })
  },

  // 点赞事件
  onLike (event) {
    const {behavior} = event.detail
    const {id} = this.data.book
    likeModel.like(behavior, id, 400)
  },
  /**
   * 设置短评遮罩开关
   */
  onFakePost: function() {
    this.setData({
      posting: true
    })
  },
  onCancel: function() {
    this.setData({
      posting: false
    })
  },
  // 短评点击加1
  onPost (event) {
    const comment = event.detail.value || event.detail.text
    const {comments, book} = this.data
    if (comment.length > 12) {
      wx.showToast({
        title: '短评最多12个字',
        icon: 'none'
      })
      return
    }
    bookModel.postComment(book.id, comment)
    .then(res => {
      wx.showToast({
        title: `${comment} + 1`,
        icon: 'none'
      }) 
    })
    comments.unshift({
      content: comment,
      nums: 1
    })
    this.setData({
      comments,
      posting: false
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})