import React, { useEffect, useRef, useState } from 'react';
import QRCodeStyling from 'qr-code-styling';
import { Download, FileCode, Copy, Check } from 'lucide-react';

const QRCodePreview = ({ 
  data, 
  stylePreset, 
  foregroundCol, 
  backgroundCol, 
  logoUrl, 
  logoSize,
  qrCodeRefInstance // to pass the reference out to parent if needed
}) => {
  const containerRef = useRef(null);
  const qrCodeInstanceRef = useRef(null);
  const [copied, setCopied] = useState(false);

  // Map style preset to qr-code-styling options
  const getStyleOptions = (preset) => {
    switch (preset) {
      case 'dots':
        return {
          dotsType: 'dots',
          cornerSquareType: 'dot',
          cornerDotType: 'dot',
        };
      case 'rounded':
        return {
          dotsType: 'rounded',
          cornerSquareType: 'extra-rounded',
          cornerDotType: 'dot',
        };
      case 'classy':
        return {
          dotsType: 'classy',
          cornerSquareType: 'extra-rounded',
          cornerDotType: 'dot',
        };
      case 'standard':
      default:
        return {
          dotsType: 'square',
          cornerSquareType: 'square',
          cornerDotType: 'square',
        };
    }
  };

  useEffect(() => {
    const { dotsType, cornerSquareType, cornerDotType } = getStyleOptions(stylePreset);

    const qrCode = new QRCodeStyling({
      width: 320,
      height: 320,
      type: 'svg',
      data: data || 'https://example.com',
      image: logoUrl || undefined,
      dotsOptions: {
        color: foregroundCol || '#000000',
        type: dotsType,
      },
      backgroundOptions: {
        color: backgroundCol || '#FFFFFF',
      },
      imageOptions: {
        crossOrigin: 'anonymous',
        hideBackgroundDots: true,
        imageSize: logoSize ? logoSize / 100 : 0.2, // scale 0-100 to 0-1
        margin: 4,
      },
      cornersSquareOptions: {
        color: foregroundCol || '#000000',
        type: cornerSquareType,
      },
      cornersDotOptions: {
        color: foregroundCol || '#000000',
        type: cornerDotType,
      },
    });

    qrCodeInstanceRef.current = qrCode;
    if (qrCodeRefInstance) {
      qrCodeRefInstance.current = qrCode;
    }

    if (containerRef.current) {
      containerRef.current.innerHTML = '';
      qrCode.append(containerRef.current);
    }

    // Cleanup logic
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [data, stylePreset, foregroundCol, backgroundCol, logoUrl, logoSize]);

  const handleDownload = (ext) => {
    if (qrCodeInstanceRef.current) {
      qrCodeInstanceRef.current.download({
        name: 'custom-qr-code',
        extension: ext,
      });
    }
  };

  const handleCopyToClipboard = async () => {
    if (!qrCodeInstanceRef.current) return;
    try {
      const blob = await qrCodeInstanceRef.current.getRawData('png');
      if (blob) {
        await navigator.clipboard.write([
          new ClipboardItem({
            [blob.type]: blob,
          }),
        ]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
      // Fallback
      alert('Could not copy image automatically. Please use the Download buttons.');
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* QR Code Container Card */}
      <div className="bg-white p-6 rounded-2xl shadow-xl flex items-center justify-center border border-white/10 w-fit mx-auto mb-6">
        <div 
          ref={containerRef} 
          className="qr-code-svg-container overflow-hidden w-[320px] h-[320px] flex items-center justify-center"
        />
      </div>

      {/* Buttons */}
      <div className="w-full space-y-3">
        <button
          onClick={() => handleDownload('png')}
          className="w-full flex items-center justify-center gap-2 bg-[#7C3AED] hover:bg-[#8B5CF6] text-white font-medium py-3.5 px-6 rounded-xl transition duration-150 shadow-lg shadow-purpleAccent/25 hover:shadow-purpleAccent/40 active:scale-[0.98]"
        >
          <Download size={18} />
          Download PNG
        </button>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => handleDownload('svg')}
            className="flex items-center justify-center gap-2 bg-[#1B1931] hover:bg-[#252244] text-gray-300 hover:text-white border border-[#2B294A] font-medium py-3 px-4 rounded-xl transition duration-150 active:scale-[0.98]"
          >
            <FileCode size={16} />
            Download SVG
          </button>
          
          <button
            onClick={handleCopyToClipboard}
            className="flex items-center justify-center gap-2 bg-[#1B1931] hover:bg-[#252244] text-gray-300 hover:text-white border border-[#2B294A] font-medium py-3 px-4 rounded-xl transition duration-150 active:scale-[0.98]"
          >
            {copied ? (
              <>
                <Check size={16} className="text-green-400" />
                Copied!
              </>
            ) : (
              <>
                <Copy size={16} />
                Copy Clipboard
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QRCodePreview;
