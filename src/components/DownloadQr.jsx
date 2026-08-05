import QRCode from 'react-qr-code'
import { DOWNLOAD_PAGE_URL } from '../constants/stores'

export default function DownloadQr({
  className = '',
  size = 112,
  showLabel = true,
  labelClassName = 'mt-2 text-sm text-gray-600',
}) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <QRCode
        value={DOWNLOAD_PAGE_URL}
        size={size}
        bgColor="#FFFFFF"
        fgColor="#000000"
        aria-label="Scan to download DATER"
      />
      {showLabel && <span className={labelClassName}>Scan to download</span>}
    </div>
  )
}
