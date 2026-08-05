import { STORE_LINKS } from '../constants/stores'

export function getStoreRedirectUrl(userAgent = navigator.userAgent) {
  if (/android/i.test(userAgent)) {
    return STORE_LINKS.android
  }

  if (/iPad|iPhone|iPod/.test(userAgent)) {
    return STORE_LINKS.ios
  }

  return '/'
}
