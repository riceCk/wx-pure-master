import {HTTP} from '../util/http.js'

class LikeModel extends HTTP {
  like (behavior, artId, category) {
    let url = behavior === 'like' ? 'like' : 'like/cancel'
    return this.request({
      url: url,
      method: 'POST',
      data: {
        art_id: artId,
        type: category
      }
    })
  }
  getClassicLikeStatus (artId, category) {
    return this.request({
      url: `classic/${category}/${artId}/favor`,
    })
  }
}

export {LikeModel}