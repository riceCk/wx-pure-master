import {ClassicModel} from '../../models/classic.js';
import {LikeModel} from '../../models/like';

const classicModel = new ClassicModel();
const likeModel = new LikeModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    classic: null,
    latest: true,
    first: false,
    likeCount: 0,
    likeStatus: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const res = classicModel.getLatet()
    res.then(res => {
      this.setData({
        classic: res,
        likeCount: res.fav_nums,
        likeStatus: res.like_status
      })
    })
  },
  // 点赞
  onLike (event) {
    const {behavior} = event.detail
    const {id, type} = this.data.classic
    likeModel.like(behavior, id, type)
  },
  // 获取下一期刊数据
  onNext () {
    this._updateClassic('next')
  },

  // 获取上一期刊数据
  onPrevious () {
    this._updateClassic('previous')
  },

  _updateClassic (nextOrPrevious) {
    const {index} = this.data.classic
    const previous = classicModel.getClassic(nextOrPrevious, index)
    previous.then(res => {
      this.setData({
        classic: res,
        first: classicModel.isFirst(res.index),
        latest: classicModel.isLatest(res.index)
      })
      this._getLikeStatus(res.id, res.type)
    })
  },

  _getLikeStatus (artID, category) {
    const likeStatus = likeModel.getClassicLikeStatus(artID, category)
    likeStatus.then(res => {
      this.setData({
        likeCount: res.fav_nums,
        likeStatus: res.like_status
      })
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