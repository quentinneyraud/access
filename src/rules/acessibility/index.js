import alt from './alt'
import retinaAssets from './retinaAsset'

export default (page) => ({
  alt: alt(page),
  retinaAssets: retinaAssets(page)
})
