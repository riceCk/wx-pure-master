// pages/my/my.js
import {BookModel} from '../../models/book'
import {ClassicModel} from '../../models/classic';

const bookModel = new BookModel();
const classicModel = new ClassicModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    authorized: false,
    userInfo: null,
    bookCount: 0,
    classics: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.userAuthorized()
    this.getMyBookCount()
    this.getMyFavor()
  }, 

  // 喜欢书籍数量
  getMyBookCount () {
    bookModel.getMyBookCount()
    .then(res => {
      this.setData({
        bookCount: res.count
      })
    })
  },

  // 判断用户是否授权
  userAuthorized () {
    wx.getSetting({
      success: data => {
        if (data.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: data => {
              this.setData({
                authorized: true,
                userInfo: data.userInfo
              })
            }
          })
        } else {
          this.setData({
            authorized: false
          })
        }
      }
    })
  },

  // 我喜欢列表
  getMyFavor () {
    classicModel.getMyFavor()
    .then(res => {
      this.setData({
        classics: res
      })
    })
  },

  // 图片btn的获取用户信息事件
  onGetUserInfo (event) {
    const userInfo = event.detail.userInfo
    if (userInfo) {
      this.setData({
        userInfo,
        authorized: true,
      })
    }
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