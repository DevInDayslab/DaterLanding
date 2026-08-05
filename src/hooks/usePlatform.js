import { useEffect, useState } from 'react'

export function usePlatform() {
  const [platform, setPlatform] = useState('desktop')

  useEffect(() => {
    const userAgent = navigator.userAgent
    if (/android/i.test(userAgent)) {
      setPlatform('android')
    } else if (/iPad|iPhone|iPod/.test(userAgent)) {
      setPlatform('ios')
    } else {
      setPlatform('desktop')
    }
  }, [])

  return platform
}
