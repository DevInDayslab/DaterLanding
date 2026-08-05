import qrCodeImage from '../assets/qr_code.png'

export default function DownloadQr({
  className = '',
  size = 128,
  showLabel = true,
  labelClassName = 'mt-2 text-sm text-gray-600',
}) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <img
        src={qrCodeImage}
        alt="Scan to download DATER"
        width={size}
        height={size}
        className="block shrink-0"
        style={{ width: size, height: size }}
      />
      {showLabel && <span className={labelClassName}>Scan to download</span>}
    </div>
  )
}
