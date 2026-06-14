import React, { useState, useEffect } from 'react';
import { Icons } from '../constants';

interface UPISimulatorProps {
  onPaymentSuccess: (amount: number, merchant: string, type: string) => void;
  isDesktop: boolean;
}

export const UPISimulator: React.FC<UPISimulatorProps> = ({ onPaymentSuccess, isDesktop }) => {
  const [activeUpiMode, setActiveUpiMode] = useState<'scan' | 'generate' | 'tap'>('scan');
  const [scanStep, setScanStep] = useState<'idle' | 'scanning' | 'amount' | 'pin' | 'processing' | 'success'>('idle');
  const [genStep, setGenStep] = useState<'idle' | 'awaiting' | 'success'>('idle');
  const [tapStep, setTapStep] = useState<'idle' | 'holding' | 'processing' | 'success'>('idle');

  // Input States
  const [customAmount, setCustomAmount] = useState<string>('');
  const [selectedMerchant, setSelectedMerchant] = useState<{ name: string; upi: string } | null>(null);
  const [payAmount, setPayAmount] = useState<string>('250');
  const [upiPin, setUpiPin] = useState<string>('');
  const [audioPlayed, setAudioPlayed] = useState<boolean>(false);

  // Merchant presets in India
  const indianMerchants = [
    { name: 'Tata Starbucks (Connaught Place)', upi: 'starbucks@okaxis' },
    { name: 'Zomato Delivery Pro', upi: 'zomatopay@okhdfc' },
    { name: 'Dharavi Art & Craft Centre', upi: 'dharaviarts@okicici' },
    { name: 'Taj Mahal Souvenirs Ag', upi: 'tajmahalcp@okaxis' },
  ];

  // Adjust default UPI mode for Desktop if mobile-only mode is active
  useEffect(() => {
    if (isDesktop && activeUpiMode === 'tap') {
      setActiveUpiMode('scan');
    }
  }, [isDesktop]);

  // Audio simulation (Visual Speak/Ding alert)
  const triggerAudioSettle = (text: string) => {
    if ('speechSynthesis' in window) {
      try {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.0;
        utterance.pitch = 1.1;
        window.speechSynthesis.speak(utterance);
      } catch (e) {
        console.log('Speech synthesis not supported or blocked by browser policies.', e);
      }
    }
  };

  const handleScanStart = (merchantIndex: number) => {
    setSelectedMerchant(indianMerchants[merchantIndex]);
    setScanStep('scanning');
    setUpiPin('');
    
    // Simulate focusing/scanning with laser
    setTimeout(() => {
      setScanStep('amount');
    }, 1500);
  };

  const handleConfirmAmount = () => {
    if (!payAmount || parseFloat(payAmount) <= 0) return;
    setScanStep('pin');
  };

  const handlePinKeyPress = (num: string) => {
    if (upiPin.length < 6) {
      setUpiPin(prev => prev + num);
    }
  };

  const handlePinDelete = () => {
    setUpiPin(prev => prev.slice(0, -1));
  };

  const handlePinSubmit = () => {
    if (upiPin.length < 4) return; // standard Indian PINs are 4 or 6 digits
    setScanStep('processing');
    
    setTimeout(() => {
      setScanStep('success');
      const amt = parseFloat(payAmount) || 0;
      onPaymentSuccess(amt, selectedMerchant?.name || 'UPI Merchant', 'UPI Scan');
      triggerAudioSettle(`Received rupees ${amt} on G Pay`);
    }, 2000);
  };

  // Generate QR flow
  const handleGenerateQR = () => {
    setGenStep('awaiting');
  };

  const simulateExternalScan = () => {
    setGenStep('success');
    const amt = parseFloat(customAmount) || 500;
    triggerAudioSettle(`Rupees ${amt} received on Google Pay`);
    setTimeout(() => {
      onPaymentSuccess(amt, 'Received via UPI QR', 'UPI Collect');
    }, 1000);
  };

  // Tap to Pay Flow (NFC)
  const handleTapStart = () => {
    setTapStep('holding');
    setTimeout(() => {
      setTapStep('processing');
      setTimeout(() => {
        setTapStep('success');
        onPaymentSuccess(120, 'NFC Touch Terminal', 'Tap & Pay');
        triggerAudioSettle('Payment of rupees 120 authorized');
      }, 1500);
    }, 1500);
  };

  const resetAll = () => {
    setScanStep('idle');
    setGenStep('idle');
    setTapStep('idle');
    setUpiPin('');
  };

  // Mock Dynamic SVG QR generation
  const renderMockQR = (amountStr: string) => {
    const amt = amountStr ? parseFloat(amountStr) : 0;
    return (
      <div className="relative p-6 bg-white rounded-3xl shadow-xl flex flex-col items-center justify-center border-4 border-compass-primary/30 max-w-[280px] mx-auto group">
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-blue-50/10 to-transparent pointer-events-none group-hover:scale-105 transition-transform duration-500"></div>
        {/* UPI Header on Card */}
        <div className="flex justify-between items-center w-full mb-3 mb-4 px-2">
          <div className="text-[10px] font-bold text-gray-400 tracking-wider">BHIM UPI</div>
          <div className="text-[10px] font-bold text-blue-600 bg-blue-100/60 px-2 py-0.5 rounded-full">GPAY SECURE</div>
        </div>
        
        {/* Fake QR Pattern Grid SVG */}
        <div className="w-48 h-48 bg-gray-50 flex items-center justify-center p-3 relative rounded-2xl border border-gray-100">
          <svg className="w-full h-full text-slate-800" viewBox="0 0 100 100">
            {/* Corners standard QR markers */}
            <rect x="5" y="5" width="22" height="22" fill="currentColor" rx="2" />
            <rect x="9" y="9" width="14" height="14" fill="white" rx="1" />
            <rect x="12" y="12" width="8" height="8" fill="currentColor" />

            <rect x="73" y="5" width="22" height="22" fill="currentColor" rx="2" />
            <rect x="77" y="9" width="14" height="14" fill="white" rx="1" />
            <rect x="80" y="12" width="8" height="8" fill="currentColor" />

            <rect x="5" y="73" width="22" height="22" fill="currentColor" rx="2" />
            <rect x="9" y="77" width="14" height="14" fill="white" rx="1" />
            <rect x="12" y="80" width="8" height="8" fill="currentColor" />

            {/* Random high fidelity digital QR matrix patterns */}
            <path d="M 35,10 H 45 V 20 H 35 Z M 50,5 H 60 V 15 H 50 Z M 65,15 H 70 V 25 H 65 Z M 40,25 H 55 V 30 H 40 Z" fill="currentColor" />
            <path d="M 10,35 H 20 V 45 H 10 Z M 25,35 H 30 V 55 H 25 Z M 5,50 H 15 V 60 H 5 Z M 35,45 H 60 V 50 H 35 Z" fill="currentColor" />
            <path d="M 45,55 H 55 V 65 H 45 Z M 60,35 H 75 V 45 H 60 Z M 80,40 H 95 V 50 H 80 Z M 65,55 H 70 V 70 H 65 Z" fill="currentColor" />
            <path d="M 35,75 H 40 V 95 H 35 Z M 45,70 H 60 V 75 H 45 Z M 50,80 H 65 V 90 H 50 Z M 75,65 H 90 V 75 H 75 Z" fill="currentColor" />
            <path d="M 70,80 H 85 V 95 H 70 Z M 90,85 H 95 V 90 H 90 Z" fill="currentColor" />

            {/* Micro GPay Logo center overlay */}
            <g transform="translate(42, 42)">
              <rect x="0" y="0" width="16" height="16" rx="3" fill="#0060F0" />
              <path d="M 3,8 C 3,5 5,3 8,3 C 9.5,3 10.7,3.5 11.5,4.3 L 10,5.8 C 9.5,5.3 8.8,5 8,5 C 6.3,5 5,6.3 5,8 C 5,9.7 6.3,11 8,11 C 9.7,11 11,9.7 11,8 L 8,8 L 8,6.5 L 12.5,6.5 C 12.6,7 12.7,7.5 12.7,8 C 12.7,10.5 11,12.5 8,12.5 C 5,12.5 3,10.5 3,8 Z" fill="white" transform="scale(0.8) translate(2, 2)" />
            </g>
          </svg>
          {/* Scan laser line animation */}
          {genStep === 'awaiting' && (
            <div className="absolute left-0 right-0 h-0.5 bg-emerald-500 animate-[bounce_2s_infinite] shadow-[0_0_10px_#10b981]"></div>
          )}
        </div>

        {/* UPI Details */}
        <p className="text-slate-800 font-mono text-sm mt-3 font-semibold tracking-wider">
          {amt > 0 ? `₹${amt.toLocaleString('en-IN')}` : 'Scan to Connect'}
        </p>
        <p className="text-gray-400 text-[10px] mt-1 font-mono break-all">alex.johnson@okchase</p>
      </div>
    );
  };

  return (
    <div className="bg-compass-card rounded-3xl p-6 shadow-xl relative overflow-hidden" id="upi_simulator_module">
      {/* Top Selector Tabs */}
      <div className="flex p-1 bg-compass-bg/60 rounded-xl mb-6">
        <button
          onClick={() => { resetAll(); setActiveUpiMode('scan'); }}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold tracking-wide transition-all ${activeUpiMode === 'scan' ? 'bg-compass-primary text-white shadow-md' : 'text-compass-muted hover:text-compass-text'}`}
        >
          <Icons.QrCode /> Scan & Pay
        </button>
        <button
          onClick={() => { resetAll(); setActiveUpiMode('generate'); }}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold tracking-wide transition-all ${activeUpiMode === 'generate' ? 'bg-compass-primary text-white shadow-md' : 'text-compass-muted hover:text-compass-text'}`}
        >
          <Icons.Transfer /> Receive UPI
        </button>
        
        {/* Contactless tap option ONLY rendered/enabled if NOT on PC */}
        {!isDesktop && (
          <button
            onClick={() => { resetAll(); setActiveUpiMode('tap'); }}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold tracking-wide transition-all ${activeUpiMode === 'tap' ? 'bg-compass-primary text-white shadow-md' : 'text-compass-muted hover:text-compass-text'}`}
          >
            <Icons.Wifi /> Tap to Pay
          </button>
        )}
      </div>

      {/* SCAN AND PAY VIEW */}
      {activeUpiMode === 'scan' && (
        <div className="space-y-4">
          {scanStep === 'idle' && (
            <div className="space-y-4 text-center py-4">
              <div className="w-16 h-16 mx-auto bg-compass-primary/20 rounded-full flex items-center justify-center text-compass-primary animate-pulse shadow-inner">
                <Icons.QrCode />
              </div>
              <div>
                <h3 className="font-bold text-compass-text text-base">UPI GPay Scanner</h3>
                <p className="text-xs text-compass-muted mt-1 max-w-[280px] mx-auto leading-relaxed">
                  Select a mock merchant below to simulate scanning their UPI QR code.
                </p>
              </div>

              {/* Indian QR Presets Grid */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                {indianMerchants.map((merchant, i) => (
                  <button
                    key={i}
                    onClick={() => handleScanStart(i)}
                    className="p-3 bg-compass-bg/50 border border-compass-secondary hover:border-compass-primary rounded-2xl flex flex-col items-center justify-center text-center transition-all group active:scale-95 hover:bg-compass-secondary/40"
                  >
                    <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-400 group-hover:scale-110 transition-transform flex items-center justify-center mb-1 text-xs font-bold">
                      {merchant.name[0]}
                    </div>
                    <span className="text-[10px] text-compass-text font-bold truncate w-full">{merchant.name.split(' ')[0]}</span>
                    <span className="text-[8px] text-compass-muted font-mono truncate w-full mt-0.5">{merchant.upi}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {scanStep === 'scanning' && (
            <div className="flex flex-col items-center py-8 relative">
              <div className="w-48 h-48 border-2 border-compass-primary rounded-3xl relative overflow-hidden flex items-center justify-center bg-black/40">
                {/* Scanner Target Guide Corners */}
                <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-white"></div>
                <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-white"></div>
                <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-white"></div>
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-white"></div>

                <Icons.QrCode />
                
                {/* Floating laser bar */}
                <div className="absolute left-0 right-0 h-1 bg-compass-primary shadow-[0_0_12px_#0060F0] animate-[bounce_1.5s_infinite]"></div>
              </div>
              <p className="text-xs text-compass-muted mt-4 font-mono animate-pulse tracking-widest">
                SCANNING UPI CODE...
              </p>
              <p className="text-xs font-semibold text-compass-primary mt-1">
                {selectedMerchant?.name}
              </p>
            </div>
          )}

          {scanStep === 'amount' && (
            <div className="space-y-4 max-w-[280px] mx-auto py-2">
              <div className="text-center">
                <span className="text-xs font-bold bg-compass-secondary px-3 py-1 rounded-full text-compass-primary border border-compass-primary/20 mb-2 inline-block">
                  Paying Merchant
                </span>
                <h4 className="font-bold text-compass-text text-sm truncate">{selectedMerchant?.name}</h4>
                <p className="text-xs text-compass-muted font-mono">{selectedMerchant?.upi}</p>
              </div>

              <div>
                <label className="text-[10px] text-compass-muted font-bold block mb-1.5 uppercase tracking-wide">Enter Amount (₹)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-lg text-compass-text bg-compass-secondary/50 px-2 py-0.5 rounded">₹</span>
                  <input
                    type="number"
                    value={payAmount}
                    onChange={(e) => setPayAmount(e.target.value)}
                    className="w-full bg-compass-bg border border-compass-secondary/80 focus:border-compass-primary rounded-xl py-3 pl-10 pr-4 font-bold text-lg text-compass-text focus:outline-none transition-colors"
                    placeholder="0"
                  />
                </div>
                {/* Instant Presets */}
                <div className="flex gap-2 mt-2">
                  {['150', '500', '1000', '2500'].map(val => (
                    <button
                      key={val}
                      onClick={() => setPayAmount(val)}
                      className="flex-1 py-1 px-2 text-[10px] bg-compass-secondary font-bold text-compass-text rounded-full hover:bg-compass-primary hover:text-white transition-colors"
                    >
                      ₹{val}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setScanStep('idle')}
                  className="flex-1 py-3 bg-compass-secondary text-compass-text text-xs font-bold rounded-xl active:scale-[0.98] transition-transform"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmAmount}
                  disabled={!payAmount || parseFloat(payAmount) <= 0}
                  className="flex-1 py-3 bg-compass-primary hover:bg-compass-primaryDark text-white text-xs font-bold rounded-xl active:scale-[0.98] transition-all shadow-md active:translate-y-0 transform focus:outline-none disabled:opacity-50"
                >
                  Proceed
                </button>
              </div>
            </div>
          )}

          {scanStep === 'pin' && (
            <div className="space-y-4 max-w-[280px] mx-auto py-2">
              <div className="text-center font-sans">
                <p className="text-xs text-compass-muted font-semibold tracking-wider uppercase">ENTER UPI PIN</p>
                <div className="text-2xl font-bold text-compass-text mt-1">₹{parseFloat(payAmount).toLocaleString('en-IN')}.00</div>
                
                {/* PIN progress dots */}
                <div className="flex justify-center gap-4 mt-4 mb-4">
                  {[0, 1, 2, 3, 4, 5].map((idx) => (
                    <div
                      key={idx}
                      className={`w-3.5 h-3.5 rounded-full border-2 transition-all duration-150 ${
                        idx < upiPin.length
                          ? 'bg-compass-primary border-compass-primary scale-110 shadow-[0_0_8px_#0060F0]'
                          : 'border-compass-secondary bg-compass-bg'
                      }`}
                    ></div>
                  ))}
                </div>
              </div>

              {/* Secure Numeric PIN pad */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-compass-secondary/30">
                {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(num => (
                  <button
                    key={num}
                    onClick={() => handlePinKeyPress(num)}
                    className="py-3 bg-compass-bg/60 active:bg-compass-primary/20 text-compass-text rounded-xl font-bold hover:bg-compass-secondary transition-colors text-center text-sm"
                  >
                    {num}
                  </button>
                ))}
                <button
                  onClick={handlePinDelete}
                  className="py-3 bg-compass-bg/30 text-rose-400 font-bold rounded-xl hover:bg-compass-secondary transition-colors text-center text-xs flex items-center justify-center"
                >
                  Clear
                </button>
                <button
                  onClick={() => handlePinKeyPress('0')}
                  className="py-3 bg-compass-bg/60 text-compass-text rounded-xl font-bold hover:bg-compass-secondary transition-colors text-center text-sm"
                >
                  0
                </button>
                <button
                  onClick={handlePinSubmit}
                  disabled={upiPin.length < 4}
                  className="py-3 bg-emerald-500/20 text-emerald-400 disabled:opacity-30 disabled:hover:bg-emerald-500/10 font-bold rounded-xl hover:bg-emerald-500/30 transition-all text-center text-xs flex items-center justify-center border border-emerald-500/20 shadow-sm"
                >
                  Submit
                </button>
              </div>
            </div>
          )}

          {scanStep === 'processing' && (
            <div className="flex flex-col items-center py-10 space-y-4">
              <div className="w-12 h-12 border-4 border-compass-primary border-t-transparent rounded-full animate-spin"></div>
              <div className="text-center">
                <h4 className="font-bold text-compass-text text-sm">Processing UPI Payment</h4>
                <p className="text-xs text-compass-muted font-mono mt-1">Securing connection with BHIM core...</p>
              </div>
            </div>
          )}

          {scanStep === 'success' && (
            <div className="flex flex-col items-center py-8 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center text-white text-3xl animate-[bounce_1s_infinite] shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                ✓
              </div>
              <div>
                <h4 className="font-bold text-compass-text text-lg">Transaction Successful</h4>
                <p className="text-2xl font-extrabold text-emerald-400 mt-1">₹{parseFloat(payAmount).toLocaleString('en-IN')}</p>
                <p className="text-xs text-compass-muted font-mono mt-1">To: {selectedMerchant?.name}</p>
                <p className="text-[10px] text-compass-muted font-mono mt-0.5">UPI ID: tx_ref_{Math.floor(Math.random() * 900000 + 100000)}</p>
              </div>
              <button
                onClick={resetAll}
                className="py-2.5 px-6 bg-compass-primary text-white text-xs font-bold rounded-xl transition-all shadow-md active:scale-95"
              >
                Scan Another
              </button>
            </div>
          )}
        </div>
      )}

      {/* RECEIVE / GENERATE QR VIEW */}
      {activeUpiMode === 'generate' && (
        <div className="space-y-6">
          {genStep === 'idle' && (
            <div className="space-y-4 text-center max-w-[280px] mx-auto py-2">
              <div className="w-14 h-14 mx-auto bg-indigo-500/10 text-indigo-400 rounded-full flex items-center justify-center text-lg shadow-sm">
                <Icons.Transfer />
              </div>
              <div>
                <h3 className="font-bold text-compass-text text-base">Generate UPI QR</h3>
                <p className="text-xs text-compass-muted mt-1 leading-relaxed">
                  Enter a desired amount in Rupees to automatically customize the GPay on-screen QR code.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <div>
                  <label className="text-[10px] text-compass-muted font-bold block mb-1 text-left uppercase tracking-wide">Custom Amount (Optional)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-sm text-compass-text bg-compass-secondary/80 px-1.5 py-0.5 rounded">₹</span>
                    <input
                      type="number"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      className="w-full bg-compass-bg border border-compass-secondary rounded-xl py-2.5 pl-8 pr-4 font-bold text-sm text-compass-text focus:outline-none focus:border-compass-primary transition-colors"
                      placeholder="Enter amount (e.g. 500)"
                    />
                  </div>
                </div>

                <button
                  onClick={handleGenerateQR}
                  className="w-full py-3 bg-compass-primary hover:bg-compass-primaryDark text-white text-xs font-bold rounded-xl active:scale-[0.98] transition-all shadow-md shadow-blue-900/10"
                >
                  Generate QR Code
                </button>
              </div>
            </div>
          )}

          {(genStep === 'awaiting' || genStep === 'success') && (
            <div className="space-y-6 text-center">
              <div>
                <h4 className="font-bold text-compass-text text-sm">
                  {genStep === 'awaiting' ? 'Awaiting Scan' : 'Payment Received'}
                </h4>
                <p className="text-xs text-compass-muted">
                  {genStep === 'awaiting' ? 'Show this QR to the payee or client' : 'UPI Instant Settlement Done!'}
                </p>
              </div>

              {genStep === 'awaiting' ? (
                <div className="space-y-5">
                  {renderMockQR(customAmount)}
                  
                  {/* Action buttons to simulate QR Scan on PC Dashboard */}
                  <div className="bg-compass-secondary/50 rounded-2xl p-4 border border-compass-secondary/80 max-w-[320px] mx-auto text-left space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-compass-primary/20 text-compass-primary flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-[10px] font-bold">PC</span>
                      </div>
                      <p className="text-[11px] text-compass-muted leading-relaxed">
                        Since you are on the website dashboard, you can trigger a simulate scan action to settle it instantly.
                      </p>
                    </div>

                    <button
                      onClick={simulateExternalScan}
                      className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold rounded-xl active:scale-[0.98] transition-all shadow-lg flex items-center justify-center gap-2"
                    >
                      <span>⚡</span> Simulate QR Scan by App
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 py-4">
                  <div className="w-16 h-16 mx-auto bg-emerald-500 rounded-full flex items-center justify-center text-white text-3xl animate-bounce shadow-lg">
                    ✓
                  </div>
                  <div>
                    <h3 className="font-bold text-compass-text text-lg">UPI Settle Complete</h3>
                    <p className="text-2xl font-extrabold text-emerald-400 mt-1">₹{parseFloat(customAmount || '500').toLocaleString('en-IN')}</p>
                    <p className="text-[10px] text-compass-muted font-mono mt-1">Cleared via Bank-to-Bank IMPS</p>
                  </div>
                  <button
                    onClick={resetAll}
                    className="py-2 px-5 bg-compass-secondary hover:bg-compass-secondary/80 text-compass-text text-xs font-semibold rounded-lg"
                  >
                    Generate New QR
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* MOBILE TAP TO PAY VIEW */}
      {activeUpiMode === 'tap' && !isDesktop && (
        <div className="space-y-6 text-center py-4">
          {tapStep === 'idle' && (
            <div className="space-y-4 max-w-[280px] mx-auto">
              <div className="w-16 h-16 mx-auto bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-xl shadow-lg relative">
                <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping opacity-35"></div>
                <div className="transform rotate-90"><Icons.Wifi /></div>
              </div>
              
              <div>
                <h3 className="font-bold text-compass-text text-base">Contactless Tap to Pay</h3>
                <p className="text-xs text-compass-muted mt-1 leading-relaxed">
                  Hold your phone near any payment terminal standard card reader.
                </p>
              </div>

              {/* Simplified mock credit card visual */}
              <div className="bg-gradient-to-br from-[#0c1e4c] to-[#002d72] rounded-xl p-4 aspect-[1.586/1] w-48 mx-auto flex flex-col justify-between text-left shadow-lg relative overflow-hidden">
                <div className="flex justify-between items-start">
                  <span className="text-[8px] font-bold text-white/80 uppercase tracking-widest font-sans">Chase</span>
                  <div className="text-white transform rotate-90 scale-75"><Icons.Wifi /></div>
                </div>
                <div className="text-white font-mono text-[10px] tracking-widest mb-1">•••• 3456</div>
              </div>

              <button
                onClick={handleTapStart}
                className="w-full py-3 bg-compass-primary hover:bg-compass-primaryDark text-white text-xs font-bold rounded-xl active:scale-[0.98] transition-all shadow-md shadow-blue-900/10"
              >
                Bring Card Close (Simulate)
              </button>
            </div>
          )}

          {tapStep === 'holding' && (
            <div className="flex flex-col items-center py-10 space-y-6">
              <div className="w-20 h-20 rounded-full border-4 border-dashed border-compass-primary animate-[spin_4s_linear_infinite] flex items-center justify-center text-compass-primary">
                <div className="transform rotate-90 scale-125"><Icons.Wifi /></div>
              </div>
              <div>
                <h4 className="font-bold text-compass-text text-base animate-pulse">Reading Antenna...</h4>
                <p className="text-xs text-compass-muted mt-1">Keep card or phone close to terminal</p>
              </div>
            </div>
          )}

          {tapStep === 'processing' && (
            <div className="flex flex-col items-center py-10 space-y-4">
              <div className="w-12 h-12 border-4 border-compass-primary border-t-transparent rounded-full animate-spin"></div>
              <div>
                <h4 className="font-bold text-compass-text text-sm">Authorizing contactless payment...</h4>
              </div>
            </div>
          )}

          {tapStep === 'success' && (
            <div className="flex flex-col items-center py-6 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center text-white text-3xl animate-bounce shadow-lg">
                ✓
              </div>
              <div>
                <h3 className="font-bold text-compass-text text-lg">Tap Paid Successfully</h3>
                <p className="text-2xl font-extrabold text-emerald-400 mt-1">₹120.00</p>
                <p className="text-[10px] text-compass-muted font-mono mt-1">NFC Signature Authorized</p>
              </div>
              <button
                onClick={resetAll}
                className="py-2 px-5 bg-compass-secondary hover:bg-compass-secondary/80 text-compass-text text-sm rounded-lg"
              >
                Done
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
