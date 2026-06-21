import React, { useState, useEffect, useRef } from 'react';
import QRCodePreview from './components/QRCodePreview';
import { 
  Link2, 
  Type, 
  Mail, 
  Phone, 
  Wifi, 
  Upload, 
  QrCode, 
  Lock, 
  User, 
  Globe, 
  Info,
  Calendar,
  Layers,
  ArrowRight,
  Maximize2,
  Trash2,
  Sparkles
} from 'lucide-react';

const Github = ({ size = 16, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Linkedin = ({ size = 16, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// Default Globe logo matching the purple globe logo in the image
const DEFAULT_GLOBE_LOGO = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjN0MzQUVEIiBzdHJva2Utd2lkdGg9IjIuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCIvPjxwYXRoIGQ9Ik0xMiAyYTE0LjUgMTQuNSAwIDAgMCAwIDIwIDE0LjUgMTQuNSAwIDAgMCAwLTIwIi8+PHBhdGggZD0iTTIgMTJoMjAiLz48L3N2Zz4=`;

export default function App() {
  // Tabs State: url, text, email, phone, wifi
  const [activeTab, setActiveTab] = useState('url');
  
  // Input values State
  const [url, setUrl] = useState('https://example.com');
  const [text, setText] = useState('Hello World!');
  const [emailAddress, setEmailAddress] = useState('bhardwajram9120@gmail.com');
  const [emailSubject, setEmailSubject] = useState('Hello From Custom QR');
  const [emailBody, setEmailBody] = useState('Check out this custom QR code generator!');
  const [phoneNumber, setPhoneNumber] = useState('+91 8858463946');
  const [wifiSsid, setWifiSsid] = useState('MyWiFiNetwork');
  const [wifiPassword, setWifiPassword] = useState('SuperSecretPassword');
  const [wifiEncryption, setWifiEncryption] = useState('WPA');

  // Styles preset State: standard, dots, rounded, classy
  const [stylePreset, setStylePreset] = useState('standard');

  // Colors State
  const [foregroundCol, setForegroundCol] = useState('#000000');
  const [backgroundCol, setBackgroundCol] = useState('#FFFFFF');

  // Logo State
  const [logoUrl, setLogoUrl] = useState(DEFAULT_GLOBE_LOGO);
  const [logoSize, setLogoSize] = useState(20);
  const [logoName, setLogoName] = useState('Default Globe');
  const [dragActive, setDragActive] = useState(false);

  // QR rendering trigger (for button click animation/sync)
  const [qrData, setQrData] = useState('https://example.com');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationTime, setGenerationTime] = useState('');

  // Handle active input value formatting
  const getFormattedData = (tabType) => {
    switch (tabType) {
      case 'url':
        if (!url) return '';
        return url.startsWith('http://') || url.startsWith('https://') ? url : `https://${url}`;
      case 'text':
        return text || '';
      case 'email':
        if (!emailAddress) return '';
        return `mailto:${emailAddress}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
      case 'phone':
        if (!phoneNumber) return '';
        return `tel:${phoneNumber.replace(/\s+/g, '')}`;
      case 'wifi':
        if (!wifiSsid) return '';
        return `WIFI:S:${wifiSsid};T:${wifiEncryption};P:${wifiPassword};;`;
      default:
        return '';
    }
  };

  // Synchronize data immediately on input change (real-time feel)
  useEffect(() => {
    setQrData(getFormattedData(activeTab));
    setGenerationTime(new Date().toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }));
  }, [activeTab, url, text, emailAddress, emailSubject, emailBody, phoneNumber, wifiSsid, wifiPassword, wifiEncryption]);

  // Handle mock Generation effect
  const handleGenerateClick = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setQrData(getFormattedData(activeTab));
      setGenerationTime(new Date().toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }));
    }, 600);
  };

  // Handle custom logo uploads
  const handleLogoFile = (file) => {
    if (file) {
      if (file.size > 1024 * 1024) {
        alert('File size exceeds 1MB limits.');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setLogoUrl(reader.result);
        setLogoName(file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleLogoFile(e.dataTransfer.files[0]);
    }
  };

  const clearLogo = () => {
    setLogoUrl(null);
    setLogoName('');
  };

  const resetToDefaultLogo = () => {
    setLogoUrl(DEFAULT_GLOBE_LOGO);
    setLogoName('Default Globe');
  };

  return (
    <div className="min-h-screen text-gray-100 flex flex-col justify-between py-12 px-4 md:px-8 bg-[#0B0A19] relative overflow-hidden select-none">
      {/* Background Glows for visual excellence */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-900/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-900/10 blur-[150px] pointer-events-none" />

      {/* Main Content Area */}
      <main className="max-w-6xl w-full mx-auto flex-grow flex flex-col justify-center items-center">
        {/* Title / Header */}
        <div className="text-center mb-8 flex flex-col items-center">
          <div className="flex items-center gap-3.5 mb-3">
            <QrCode size={40} className="text-[#818CF8]" />
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              <span className="text-white">QR Code </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#60A5FA] via-[#C084FC] to-[#E879F9]">
                Generator
              </span>
            </h1>
          </div>
          <p className="text-gray-400 text-base max-w-md">
            Create beautiful, customizable QR codes in seconds. <br/>
            Fast, free, and easy to use.
          </p>
        </div>

        {/* Dashboard Frame */}
        <div className="glass-panel w-full rounded-[24px] p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 shadow-2xl relative">
          
          {/* Left Column - Inputs & Options (7 cols) */}
          <div className="lg:col-span-7 space-y-6 flex flex-col justify-between">
            {/* Top Tabs */}
            <div className="bg-[#131129] p-1.5 rounded-xl border border-white/5 grid grid-cols-5 gap-1">
              <button
                onClick={() => setActiveTab('url')}
                className={`flex flex-col md:flex-row items-center justify-center gap-1.5 py-2.5 px-2 rounded-lg text-xs md:text-sm font-medium transition duration-200 ${
                  activeTab === 'url' 
                    ? 'bg-[#7C3AED] text-white shadow-md' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Link2 size={16} />
                <span className="hidden sm:inline">URL</span>
              </button>
              <button
                onClick={() => setActiveTab('text')}
                className={`flex flex-col md:flex-row items-center justify-center gap-1.5 py-2.5 px-2 rounded-lg text-xs md:text-sm font-medium transition duration-200 ${
                  activeTab === 'text' 
                    ? 'bg-[#7C3AED] text-white shadow-md' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Type size={16} />
                <span className="hidden sm:inline">Text</span>
              </button>
              <button
                onClick={() => setActiveTab('email')}
                className={`flex flex-col md:flex-row items-center justify-center gap-1.5 py-2.5 px-2 rounded-lg text-xs md:text-sm font-medium transition duration-200 ${
                  activeTab === 'email' 
                    ? 'bg-[#7C3AED] text-white shadow-md' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Mail size={16} />
                <span className="hidden sm:inline">Email</span>
              </button>
              <button
                onClick={() => setActiveTab('phone')}
                className={`flex flex-col md:flex-row items-center justify-center gap-1.5 py-2.5 px-2 rounded-lg text-xs md:text-sm font-medium transition duration-200 ${
                  activeTab === 'phone' 
                    ? 'bg-[#7C3AED] text-white shadow-md' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Phone size={16} />
                <span className="hidden sm:inline">Phone</span>
              </button>
              <button
                onClick={() => setActiveTab('wifi')}
                className={`flex flex-col md:flex-row items-center justify-center gap-1.5 py-2.5 px-2 rounded-lg text-xs md:text-sm font-medium transition duration-200 ${
                  activeTab === 'wifi' 
                    ? 'bg-[#7C3AED] text-white shadow-md' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Wifi size={16} />
                <span className="hidden sm:inline">WiFi</span>
              </button>
            </div>

            {/* Dynamic Content Inputs */}
            <div className="space-y-4">
              {activeTab === 'url' && (
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-300">Enter URL</label>
                  <div className="relative flex items-center">
                    <Link2 className="absolute left-4 text-gray-500" size={18} />
                    <input
                      type="text"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="https://example.com"
                      className="w-full bg-[#1B1931] border border-[#2B294A] focus:border-[#7C3AED] rounded-xl pl-12 pr-4 py-3.5 text-white outline-none transition placeholder-gray-600 text-sm font-medium"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'text' && (
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-300">Enter Text</label>
                  <div className="relative flex items-start">
                    <Type className="absolute left-4 top-4 text-gray-500" size={18} />
                    <textarea
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      placeholder="Enter your message or raw text..."
                      rows={3}
                      className="w-full bg-[#1B1931] border border-[#2B294A] focus:border-[#7C3AED] rounded-xl pl-12 pr-4 py-3 text-white outline-none transition placeholder-gray-600 text-sm font-medium resize-none"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'email' && (
                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-400">Email Address</label>
                    <div className="relative flex items-center">
                      <Mail className="absolute left-4 text-gray-500" size={16} />
                      <input
                        type="email"
                        value={emailAddress}
                        onChange={(e) => setEmailAddress(e.target.value)}
                        placeholder="your.email@example.com"
                        className="w-full bg-[#1B1931] border border-[#2B294A] focus:border-[#7C3AED] rounded-xl pl-11 pr-4 py-3 text-white outline-none transition placeholder-gray-600 text-sm"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-gray-400">Subject</label>
                      <input
                        type="text"
                        value={emailSubject}
                        onChange={(e) => setEmailSubject(e.target.value)}
                        placeholder="Subject (optional)"
                        className="w-full bg-[#1B1931] border border-[#2B294A] focus:border-[#7C3AED] rounded-xl px-4 py-3 text-white outline-none transition placeholder-gray-600 text-sm"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-gray-400">Message Body</label>
                      <input
                        type="text"
                        value={emailBody}
                        onChange={(e) => setEmailBody(e.target.value)}
                        placeholder="Message body (optional)"
                        className="w-full bg-[#1B1931] border border-[#2B294A] focus:border-[#7C3AED] rounded-xl px-4 py-3 text-white outline-none transition placeholder-gray-600 text-sm"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'phone' && (
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-300">Enter Phone Number</label>
                  <div className="relative flex items-center">
                    <Phone className="absolute left-4 text-gray-500" size={18} />
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="+92 300 1234567"
                      className="w-full bg-[#1B1931] border border-[#2B294A] focus:border-[#7C3AED] rounded-xl pl-12 pr-4 py-3.5 text-white outline-none transition placeholder-gray-600 text-sm font-medium"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'wifi' && (
                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-400">Network Name (SSID)</label>
                    <div className="relative flex items-center">
                      <Wifi className="absolute left-4 text-gray-500" size={16} />
                      <input
                        type="text"
                        value={wifiSsid}
                        onChange={(e) => setWifiSsid(e.target.value)}
                        placeholder="My WiFi SSID"
                        className="w-full bg-[#1B1931] border border-[#2B294A] focus:border-[#7C3AED] rounded-xl pl-11 pr-4 py-3 text-white outline-none transition placeholder-gray-600 text-sm"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-gray-400">Password</label>
                      <div className="relative flex items-center">
                        <Lock className="absolute left-4 text-gray-500" size={16} />
                        <input
                          type="password"
                          value={wifiPassword}
                          onChange={(e) => setWifiPassword(e.target.value)}
                          placeholder="Password"
                          className="w-full bg-[#1B1931] border border-[#2B294A] focus:border-[#7C3AED] rounded-xl pl-11 pr-4 py-3 text-white outline-none transition placeholder-gray-600 text-sm"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-gray-400">Network Security</label>
                      <select
                        value={wifiEncryption}
                        onChange={(e) => setWifiEncryption(e.target.value)}
                        className="w-full bg-[#1B1931] border border-[#2B294A] focus:border-[#7C3AED] rounded-xl px-4 py-3 text-white outline-none transition text-sm appearance-none cursor-pointer"
                      >
                        <option value="WPA">WPA / WPA2</option>
                        <option value="WEP">WEP</option>
                        <option value="nopass">None (Open)</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Style Selector */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-300">Choose QR Code Style</label>
              <div className="grid grid-cols-4 gap-3">
                {/* Style 1: Standard */}
                <button
                  onClick={() => setStylePreset('standard')}
                  className={`relative aspect-square bg-[#1B1931] border-2 rounded-xl flex items-center justify-center p-2.5 transition group overflow-hidden ${
                    stylePreset === 'standard' ? 'border-[#7C3AED] bg-purple-900/10' : 'border-[#2B294A] hover:border-gray-500'
                  }`}
                >
                  <svg viewBox="0 0 40 40" className="w-full h-full text-gray-400 group-hover:text-white transition">
                    <rect x="2" y="2" width="12" height="12" fill="currentColor" />
                    <rect x="4" y="4" width="8" height="8" fill="var(--bg-color, #1B1931)" />
                    <rect x="5" y="5" width="6" height="6" fill="currentColor" />
                    
                    <rect x="26" y="2" width="12" height="12" fill="currentColor" />
                    <rect x="28" y="4" width="8" height="8" fill="var(--bg-color, #1B1931)" />
                    <rect x="29" y="5" width="6" height="6" fill="currentColor" />

                    <rect x="2" y="26" width="12" height="12" fill="currentColor" />
                    <rect x="4" y="28" width="8" height="8" fill="var(--bg-color, #1B1931)" />
                    <rect x="5" y="29" width="6" height="6" fill="currentColor" />

                    {/* standard blocks */}
                    <rect x="18" y="4" width="4" height="4" fill="currentColor" />
                    <rect x="18" y="12" width="4" height="4" fill="currentColor" />
                    <rect x="10" y="18" width="4" height="4" fill="currentColor" />
                    <rect x="22" y="18" width="4" height="4" fill="currentColor" />
                    <rect x="18" y="26" width="4" height="4" fill="currentColor" />
                    <rect x="26" y="18" width="4" height="4" fill="currentColor" />
                    <rect x="26" y="26" width="8" height="4" fill="currentColor" />
                    <rect x="30" y="30" width="4" height="8" fill="currentColor" />
                  </svg>
                </button>

                {/* Style 2: Dots */}
                <button
                  onClick={() => setStylePreset('dots')}
                  className={`relative aspect-square bg-[#1B1931] border-2 rounded-xl flex items-center justify-center p-2.5 transition group overflow-hidden ${
                    stylePreset === 'dots' ? 'border-[#7C3AED] bg-purple-900/10' : 'border-[#2B294A] hover:border-gray-500'
                  }`}
                >
                  <svg viewBox="0 0 40 40" className="w-full h-full text-gray-400 group-hover:text-white transition">
                    {/* Circle Finder square */}
                    <rect x="2" y="2" width="12" height="12" rx="6" fill="currentColor" />
                    <rect x="4" y="4" width="8" height="8" rx="4" fill="var(--bg-color, #1B1931)" />
                    <circle cx="8" cy="8" r="3" fill="currentColor" />
                    
                    <rect x="26" y="2" width="12" height="12" rx="6" fill="currentColor" />
                    <rect x="28" y="4" width="8" height="8" rx="4" fill="var(--bg-color, #1B1931)" />
                    <circle cx="32" cy="8" r="3" fill="currentColor" />

                    <rect x="2" y="26" width="12" height="12" rx="6" fill="currentColor" />
                    <rect x="4" y="28" width="8" height="8" rx="4" fill="var(--bg-color, #1B1931)" />
                    <circle cx="8" cy="32" r="3" fill="currentColor" />

                    {/* dotted points */}
                    <circle cx="20" cy="6" r="2.2" fill="currentColor" />
                    <circle cx="20" cy="14" r="2.2" fill="currentColor" />
                    <circle cx="12" cy="20" r="2.2" fill="currentColor" />
                    <circle cx="24" cy="20" r="2.2" fill="currentColor" />
                    <circle cx="20" cy="28" r="2.2" fill="currentColor" />
                    <circle cx="28" cy="20" r="2.2" fill="currentColor" />
                    <circle cx="28" cy="28" r="2.2" fill="currentColor" />
                    <circle cx="34" cy="28" r="2.2" fill="currentColor" />
                    <circle cx="32" cy="34" r="2.2" fill="currentColor" />
                  </svg>
                </button>

                {/* Style 3: Rounded */}
                <button
                  onClick={() => setStylePreset('rounded')}
                  className={`relative aspect-square bg-[#1B1931] border-2 rounded-xl flex items-center justify-center p-2.5 transition group overflow-hidden ${
                    stylePreset === 'rounded' ? 'border-[#7C3AED] bg-purple-900/10' : 'border-[#2B294A] hover:border-gray-500'
                  }`}
                >
                  <svg viewBox="0 0 40 40" className="w-full h-full text-gray-400 group-hover:text-white transition">
                    <rect x="2" y="2" width="12" height="12" rx="3.5" fill="currentColor" />
                    <rect x="4" y="4" width="8" height="8" rx="2" fill="var(--bg-color, #1B1931)" />
                    <circle cx="8" cy="8" r="3.2" fill="currentColor" />
                    
                    <rect x="26" y="2" width="12" height="12" rx="3.5" fill="currentColor" />
                    <rect x="28" y="4" width="8" height="8" rx="2" fill="var(--bg-color, #1B1931)" />
                    <circle cx="32" cy="8" r="3.2" fill="currentColor" />

                    <rect x="2" y="26" width="12" height="12" rx="3.5" fill="currentColor" />
                    <rect x="4" y="28" width="8" height="8" rx="2" fill="var(--bg-color, #1B1931)" />
                    <circle cx="8" cy="32" r="3.2" fill="currentColor" />

                    {/* rounded points */}
                    <rect x="18" y="4" width="4" height="4" rx="2" fill="currentColor" />
                    <rect x="18" y="12" width="4" height="4" rx="2" fill="currentColor" />
                    <rect x="10" y="18" width="4" height="4" rx="2" fill="currentColor" />
                    <rect x="24" y="18" width="4" height="4" rx="2" fill="currentColor" />
                    <rect x="18" y="26" width="4" height="4" rx="2" fill="currentColor" />
                    <rect x="28" y="20" width="4" height="4" rx="2" fill="currentColor" />
                    <rect x="28" y="28" width="8" height="4" rx="2" fill="currentColor" />
                    <rect x="30" y="33" width="4" height="5" rx="2" fill="currentColor" />
                  </svg>
                </button>

                {/* Style 4: Classy */}
                <button
                  onClick={() => setStylePreset('classy')}
                  className={`relative aspect-square bg-[#1B1931] border-2 rounded-xl flex items-center justify-center p-2.5 transition group overflow-hidden ${
                    stylePreset === 'classy' ? 'border-[#7C3AED] bg-purple-900/10' : 'border-[#2B294A] hover:border-gray-500'
                  }`}
                >
                  <svg viewBox="0 0 40 40" className="w-full h-full text-gray-400 group-hover:text-white transition">
                    <rect x="2" y="2" width="12" height="12" rx="3.5" fill="currentColor" />
                    <rect x="4" y="4" width="8" height="8" rx="2" fill="var(--bg-color, #1B1931)" />
                    <circle cx="8" cy="8" r="3" fill="currentColor" />
                    
                    <rect x="26" y="2" width="12" height="12" rx="3.5" fill="currentColor" />
                    <rect x="28" y="4" width="8" height="8" rx="2" fill="var(--bg-color, #1B1931)" />
                    <circle cx="32" cy="8" r="3" fill="currentColor" />

                    <rect x="2" y="26" width="12" height="12" rx="3.5" fill="currentColor" />
                    <rect x="4" y="28" width="8" height="8" rx="2" fill="var(--bg-color, #1B1931)" />
                    <circle cx="8" cy="32" r="3" fill="currentColor" />

                    {/* classy layout style (lines/dots) */}
                    <path d="M18 6 A 2.2 2.2 0 1 1 22.4 6" fill="currentColor" />
                    <path d="M18 14 A 2.2 2.2 0 1 1 22.4 14" fill="currentColor" />
                    <circle cx="12" cy="20" r="2.2" fill="currentColor" />
                    <rect x="23" y="18" width="2" height="4" rx="1" fill="currentColor" />
                    <rect x="19" y="26" width="2" height="4" rx="1" fill="currentColor" />
                    <circle cx="28" cy="20" r="2.2" fill="currentColor" />
                    <path d="M28 28 A 2.2 2.2 0 1 1 32.4 28" fill="currentColor" />
                    <circle cx="34" cy="28" r="2" fill="currentColor" />
                    <circle cx="32" cy="34" r="2" fill="currentColor" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Customize Colors */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-300">Customize Colors</label>
              <div className="grid grid-cols-2 gap-4">
                {/* Foreground Color */}
                <div className="space-y-1.5">
                  <span className="text-xs font-semibold text-gray-400">Foreground Color</span>
                  <div className="relative flex items-center bg-[#1B1931] border border-[#2B294A] rounded-xl px-3 py-2">
                    <input 
                      type="color" 
                      value={foregroundCol} 
                      onChange={(e) => setForegroundCol(e.target.value)} 
                      className="w-7 h-7 rounded-md cursor-pointer border-0 p-0 mr-2.5 bg-transparent"
                    />
                    <input 
                      type="text" 
                      value={foregroundCol} 
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val.length <= 7) setForegroundCol(val);
                      }}
                      className="bg-transparent text-white w-full outline-none text-xs font-medium uppercase"
                    />
                  </div>
                </div>

                {/* Background Color */}
                <div className="space-y-1.5">
                  <span className="text-xs font-semibold text-gray-400">Background Color</span>
                  <div className="relative flex items-center bg-[#1B1931] border border-[#2B294A] rounded-xl px-3 py-2">
                    <input 
                      type="color" 
                      value={backgroundCol} 
                      onChange={(e) => setBackgroundCol(e.target.value)} 
                      className="w-7 h-7 rounded-md cursor-pointer border-0 p-0 mr-2.5 bg-transparent border-white/10"
                    />
                    <input 
                      type="text" 
                      value={backgroundCol} 
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val.length <= 7) setBackgroundCol(val);
                      }}
                      className="bg-transparent text-white w-full outline-none text-xs font-medium uppercase"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Add Logo */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-gray-300">Add Logo (Optional)</label>
                <div className="flex gap-2">
                  <button 
                    type="button" 
                    onClick={resetToDefaultLogo} 
                    className="text-[11px] text-purple-400 hover:text-purple-300 font-medium transition"
                  >
                    Reset Default Globe
                  </button>
                  {logoUrl && (
                    <button 
                      type="button" 
                      onClick={clearLogo} 
                      className="text-[11px] text-red-400 hover:text-red-300 font-medium transition"
                    >
                      Clear Logo
                    </button>
                  )}
                </div>
              </div>

              {/* Upload Drag & Drop Box */}
              <div 
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                className={`relative border-2 border-dashed rounded-xl p-5 flex flex-col items-center justify-center cursor-pointer transition ${
                  dragActive 
                    ? 'border-[#7C3AED] bg-purple-900/5' 
                    : logoUrl 
                      ? 'border-green-600/30 bg-[#161427]/40' 
                      : 'border-[#2B294A] hover:border-gray-500 bg-[#1B1931]/30'
                }`}
              >
                <input
                  type="file"
                  id="logo-upload"
                  accept="image/*"
                  onChange={(e) => handleLogoFile(e.target.files[0])}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                
                <Upload size={22} className={logoUrl ? "text-green-400 mb-1.5" : "text-gray-500 mb-1.5"} />
                {logoUrl ? (
                  <div className="text-center">
                    <p className="text-sm text-green-400 font-medium truncate max-w-[240px]">
                      Logo Active: {logoName || 'Custom Image'}
                    </p>
                    <p className="text-[10px] text-gray-500">Drag/Click to change</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <p className="text-sm text-gray-300 font-semibold">Upload Logo</p>
                    <p className="text-[10px] text-gray-500 mt-0.5">PNG, JPG, SVG (Max. 1MB)</p>
                  </div>
                )}
              </div>

              {/* Logo Size Slider */}
              {logoUrl && (
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-gray-400">
                    <span>Logo Size</span>
                    <span>{logoSize}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="30"
                    value={logoSize}
                    onChange={(e) => setLogoSize(parseInt(e.target.value))}
                    className="w-full accent-purpleAccent cursor-pointer"
                  />
                </div>
              )}
            </div>

            {/* Action Button */}
            <button
              onClick={handleGenerateClick}
              disabled={isGenerating}
              className="w-full flex items-center justify-center gap-2 bg-[#7C3AED] hover:bg-[#8B5CF6] text-white font-semibold py-4 px-6 rounded-xl transition duration-150 shadow-lg shadow-purpleAccent/25 hover:shadow-purpleAccent/40 active:scale-[0.99] border-t border-white/10 mt-2"
            >
              {isGenerating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  Generating QR Code...
                </>
              ) : (
                <>
                  <Sparkles size={18} />
                  Generate QR Code
                </>
              )}
            </button>
          </div>

          {/* Right Column - QR Code Preview (5 cols) */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            {/* Header Title */}
            <div>
              <h3 className="text-base font-semibold text-gray-300 mb-4">QR Code Preview</h3>
              
              {/* QR Preview Widget */}
              <QRCodePreview
                data={qrData}
                stylePreset={stylePreset}
                foregroundCol={foregroundCol}
                backgroundCol={backgroundCol}
                logoUrl={logoUrl}
                logoSize={logoSize}
              />
            </div>

            {/* Info details card */}
            <div className="bg-[#131129] border border-white/5 rounded-2xl p-4.5 space-y-3 text-xs md:text-sm">
              <h4 className="font-semibold text-gray-300 flex items-center gap-2">
                <Info size={15} className="text-purple-400" />
                About This QR Code
              </h4>
              
              <div className="grid grid-cols-3 gap-y-2.5 text-gray-400 font-medium">
                <div>Type:</div>
                <div className="col-span-2 text-white capitalize">{activeTab}</div>

                <div>Data:</div>
                <div className="col-span-2 text-white truncate max-w-[200px]" title={qrData || 'Empty'}>
                  {qrData || 'Empty'}
                </div>

                <div>Size:</div>
                <div className="col-span-2 text-white">512 x 512</div>

                <div>Created:</div>
                <div className="col-span-2 text-white flex items-center gap-1">
                  <Calendar size={12} className="text-gray-500" />
                  {generationTime || 'Just now'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Details */}
      <footer className="max-w-6xl w-full mx-auto mt-16 border-t border-[#232140]/60 pt-10 text-gray-400 text-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10 px-2">
          {/* Badge Widget */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2.5 border border-purple-500/20 bg-purple-500/5 px-4 py-2 rounded-xl text-purple-300 font-semibold shadow-inner shadow-purple-500/5">
              <Sparkles size={16} />
              <a href="https://digitalheroesco.com">Built for Digital Heroes</a>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed font-medium">
              Proudly built for Digital Heroes. <br/>
              <a 
                href="https://digitalheroesco.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[#7C3AED] hover:text-[#8B5CF6] underline font-semibold transition"
              >
                https://digitalheroesco.com
              </a>
            </p>
          </div>

          {/* About Me Section */}
          <div className="space-y-3.5">
            <h4 className="text-white font-semibold flex items-center gap-2 text-sm">
              <User size={16} className="text-purple-400" />
              About Me
            </h4>
            <div className="space-y-1.5 text-xs font-medium text-gray-500">
              <p className="text-gray-300">Ram Ji</p>
              <p>Full Stack Developer</p>
            </div>
          </div>

          {/* Contact Section */}
          <div className="space-y-3.5">
            <h4 className="text-white font-semibold flex items-center gap-2 text-sm">
              <Mail size={16} className="text-purple-400" />
              Contact
            </h4>
            <div className="space-y-2 text-xs font-medium text-gray-500">
              <a href="mailto:bhardwajram9120@gmail.com" className="hover:text-white transition cursor-pointer block">bhardwajram9120@gmail.com</a>
              <a href="tel:+918858463946" className="hover:text-white transition cursor-pointer block">+91 8858463946</a>
            </div>
          </div>

          {/* Connect Links */}
          <div className="space-y-3.5">
            <h4 className="text-white font-semibold flex items-center gap-2 text-sm">
              <Layers size={16} className="text-purple-400" />
              Connect
            </h4>
            <div className="space-y-2 text-xs font-semibold">
              <a 
                href="https://github.com/RamJi2001-R" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 text-gray-500 hover:text-white transition"
              >
                <Github size={14} />
                GitHub
              </a>
              <a 
                href="https://www.linkedin.com/in/ram-ji-bhardwaj-8a82a7329/?skipRedirect=true" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 text-gray-500 hover:text-white transition"
              >
                <Linkedin size={14} />
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="text-center text-xs text-gray-600 border-t border-[#232140]/30 pt-6">
          &copy; 2026 Ram Ji. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
