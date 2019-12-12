// components/classic/music/index.js
import {classicBeh} from '../classic-beh.js'
import {config} from '../../../config'


const innerAudioContext = wx.createInnerAudioContext()

Component({
  /**
   * 组件的属性列表
   */
  behaviors: [classicBeh],
  properties: {
    src: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    playing: false,
    pauseSrc: 'images/player@waitting.png',
    playSrc: 'images/player@playing.png'
  },
  // 生命周期开始
  attached () {
    this._recoverStatus()
    this._monitorSwitch()
  },
  // 生命周期结束
  detached () {
    this._recoverStatus()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPlay (event) {
      const {playing, src} = this.data
      if (!playing) {
        innerAudioContext.src = `${config.api_url}${src}`
        innerAudioContext.play()
      } else {
        innerAudioContext.pause()
      }
      this.setData({
        playing: !playing
      })
    },

    _recoverStatus () {
      if (innerAudioContext.paused) {
        this.setData({
          playing: false
        })
        return
      }
      console.log(innerAudioContext, 12312)
      if (innerAudioContext.src == `${config.api_url}${this.data.src}`) {
        this.setData({
          playing: true
        })
      }
    },
     
    _monitorSwitch () {
      innerAudioContext.onPlay(() => {
        this._recoverStatus()
      })
      innerAudioContext.onPause(() => {
        this._recoverStatus()
      })
      innerAudioContext.onStop(() => {
        this._recoverStatus()
      })
      innerAudioContext.onEnded(() => {
        this._recoverStatus()
      })
    }
  }
})
