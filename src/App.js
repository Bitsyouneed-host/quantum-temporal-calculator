import React, { useState } from 'react';
import { Calendar, Plus, Minus, Cog, Settings, Monitor } from 'lucide-react';

export default function DateCounterApp() {
  const [days, setDays] = useState('');
  const [targetDate, setTargetDate] = useState(null);
  const [isNegative, setIsNegative] = useState(false);
  const [mode, setMode] = useState('days'); // 'days' or 'date'
  const [selectedDate, setSelectedDate] = useState('');
  const [daysDifference, setDaysDifference] = useState(null);
  const [theme, setTheme] = useState('steampunk'); // 'steampunk' or 'neon'

  const calculateDate = (dayCount) => {
    const today = new Date();
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + dayCount);
    return futureDate;
  };

  const calculateDaysDifference = (dateString) => {
    const today = new Date();
    const selected = new Date(dateString);
    const timeDiff = selected.getTime() - today.getTime();
    const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return dayDiff;
  };

  const handleDaysChange = (e) => {
    const value = e.target.value;
    setDays(value);
    
    if (value && !isNaN(value)) {
      const dayCount = isNegative ? -parseInt(value) : parseInt(value);
      setTargetDate(calculateDate(dayCount));
    } else {
      setTargetDate(null);
    }
  };

  const handleDateChange = (e) => {
    const dateValue = e.target.value;
    setSelectedDate(dateValue);
    
    if (dateValue) {
      const daysDiff = calculateDaysDifference(dateValue);
      setDaysDifference(daysDiff);
    } else {
      setDaysDifference(null);
    }
  };

  const toggleSign = () => {
    setIsNegative(!isNegative);
    if (days && !isNaN(days)) {
      const dayCount = !isNegative ? -parseInt(days) : parseInt(days);
      setTargetDate(calculateDate(dayCount));
    }
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const today = new Date();

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{
        background: theme === 'neon' 
          ? 'linear-gradient(135deg, #0a0a0a 0%, #1a0f2e 50%, #0d0520 100%)'
          : 'linear-gradient(135deg, #2c1810 0%, #1a0f08 50%, #0d0603 100%)'
      }}
    >
      {/* Theme selector */}
      <div className="absolute top-4 right-4 z-20">
        <div 
          className="inline-flex rounded-lg p-1"
          style={{
            background: theme === 'neon'
              ? 'linear-gradient(145deg, #1a1a40 0%, #2d2d5f 50%, #1a1a40 100%)'
              : 'linear-gradient(145deg, #654321 0%, #8B4513 50%, #A0522D 100%)',
            border: theme === 'neon' ? '1px solid #00ffff' : '2px solid #4A2C17'
          }}
        >
          <button
            onClick={() => setTheme('steampunk')}
            className={`px-3 py-2 rounded-md font-semibold text-xs transition-all duration-200 flex items-center space-x-1 ${
              theme === 'steampunk' ? '' : 'hover:opacity-80'
            }`}
            style={theme === 'steampunk' 
              ? {
                  background: 'linear-gradient(145deg, #FFD700 0%, #DAA520 50%, #B8860B 100%)',
                  color: '#2F1B14'
                }
              : { color: theme === 'neon' ? '#00ffff' : '#DEB887' }
            }
          >
            <Cog className="w-3 h-3" />
            <span>Steampunk</span>
          </button>
          <button
            onClick={() => setTheme('neon')}
            className={`px-3 py-2 rounded-md font-semibold text-xs transition-all duration-200 flex items-center space-x-1 ${
              theme === 'neon' ? '' : 'hover:opacity-80'
            }`}
            style={theme === 'neon' 
              ? {
                  background: 'linear-gradient(145deg, #00ffff 0%, #0080ff 50%, #0040ff 100%)',
                  color: '#000020'
                }
              : { color: theme === 'neon' ? '#00ffff' : '#DEB887' }
            }
          >
            <Monitor className="w-3 h-3" />
            <span>Neon</span>
          </button>
        </div>
      </div>

      {/* Decorative elements */}
      {theme === 'steampunk' && (
        <>
          <div className="absolute top-10 left-10 opacity-20">
            <Cog className="w-20 h-20 text-amber-600 animate-spin" style={{ animationDuration: '20s' }} />
          </div>
          <div className="absolute bottom-20 right-16 opacity-15">
            <Settings className="w-16 h-16 text-orange-500 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />
          </div>
          <div className="absolute top-1/3 right-8 opacity-10">
            <Cog className="w-12 h-12 text-yellow-600 animate-spin" style={{ animationDuration: '25s' }} />
          </div>
        </>
      )}

      {theme === 'neon' && (
        <>
          <div className="absolute top-10 left-10 opacity-30">
            <div className="w-20 h-20 rounded-full animate-pulse" style={{ 
              background: 'radial-gradient(circle, #00ffff 0%, transparent 70%)',
              animation: 'pulse 3s ease-in-out infinite'
            }}></div>
          </div>
          <div className="absolute bottom-20 right-16 opacity-20">
            <div className="w-16 h-16 rounded-full animate-ping" style={{ 
              background: 'radial-gradient(circle, #ff00ff 0%, transparent 70%)',
              animation: 'ping 4s linear infinite'
            }}></div>
          </div>
          <div className="absolute top-1/3 right-8 opacity-25">
            <div className="w-12 h-12 rounded-full animate-bounce" style={{ 
              background: 'radial-gradient(circle, #00ff00 0%, transparent 70%)',
              animation: 'bounce 2s infinite'
            }}></div>
          </div>
        </>
      )}

      <div 
        className="relative w-full max-w-md rounded-lg shadow-2xl overflow-hidden"
        style={{
          background: theme === 'neon'
            ? 'linear-gradient(145deg, #0f0f23 0%, #1a1a40 30%, #0a0a1f 60%, #050510 100%)'
            : 'linear-gradient(145deg, #8B4513 0%, #A0522D 30%, #CD853F  60%, #D2691E  100%)',
          border: theme === 'neon' ? '2px solid #00ffff' : '3px solid #654321',
          boxShadow: theme === 'neon'
            ? '0 0 30px rgba(0,255,255,0.3), 0 20px 40px rgba(0,0,0,0.6), inset 0 1px 0 rgba(0,255,255,0.1)'
            : '0 20px 40px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.2)'
        }}
      >
        {/* Frame effect */}
        {theme === 'steampunk' && <div className="absolute inset-2 border-2 border-amber-400 opacity-30 rounded"></div>}
        {theme === 'neon' && <div className="absolute inset-1 border border-cyan-400 opacity-50 rounded" style={{ boxShadow: 'inset 0 0 10px rgba(0,255,255,0.3)' }}></div>}
        
        <div className="relative z-10 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div 
              className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 relative"
              style={{
                background: theme === 'steampunk' 
                  ? 'radial-gradient(circle, #FFD700 0%, #B8860B  50%, #8B6914 100%)'
                  : 'radial-gradient(circle, #ff00ff 0%, #cc00cc 50%, #990099 100%)',
                border: theme === 'steampunk' ? '3px solid #654321' : '2px solid #ff00ff',
                boxShadow: theme === 'steampunk' 
                  ? 'inset 0 2px 4px rgba(0,0,0,0.3), 0 4px 8px rgba(0,0,0,0.4)'
                  : 'inset 0 0 15px rgba(255,0,255,0.4), 0 0 25px rgba(255,0,255,0.6)'
              }}
            >
              <Calendar className={`w-10 h-10 ${theme === 'steampunk' ? 'text-amber-900' : 'text-white'}`} />
              <div className={`absolute inset-1 border rounded-full opacity-40 ${
                theme === 'steampunk' ? 'border-yellow-400' : 'border-pink-300'
              }`}></div>
            </div>
            <h1 
              className="text-3xl font-bold mb-2"
              style={{
                color: theme === 'steampunk' ? '#2F1B14' : '#00ffff',
                fontFamily: theme === 'steampunk' ? 'serif' : 'monospace',
                textShadow: theme === 'steampunk' 
                  ? '2px 2px 4px rgba(0,0,0,0.5), 0 0 10px rgba(255,215,0,0.3)'
                  : '0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 30px #00ffff'
              }}
            >
              {theme === 'steampunk' ? 'Temporal Chronometer' : 'Quantum Time Matrix'}
            </h1>
            <p className="font-semibold" style={{ 
              color: theme === 'steampunk' ? '#8B4513' : '#ff00ff' 
            }}>
              {theme === 'steampunk' ? 'Victorian Date Calculator' : 'Futuristic Date Counter'}
            </p>
          </div>

          <div className="space-y-6">
            {/* Today's date display */}
            <div 
              className="rounded-lg p-4 text-center relative"
              style={{
                background: theme === 'neon' 
                  ? 'linear-gradient(145deg, #1a0f2e 0%, #2d1a40 50%, #1a0f2e 100%)'
                  : 'linear-gradient(145deg, #654321 0%, #8B4513 50%, #A0522D 100%)',
                border: theme === 'neon' ? '2px solid #ff00ff' : '2px solid #4A2C17',
                boxShadow: theme === 'neon' 
                  ? 'inset 0 0 15px rgba(255,0,255,0.3), 0 0 20px rgba(255,0,255,0.4)'
                  : 'inset 0 2px 4px rgba(0,0,0,0.3)'
              }}
            >
              {theme === 'neon' && <div className="absolute inset-1 border border-pink-400 opacity-40 rounded"></div>}
              {theme === 'steampunk' && <div className="absolute inset-1 border border-amber-600 opacity-20 rounded"></div>}
              <p className={`text-sm mb-1 font-semibold ${theme === 'steampunk' ? 'text-amber-200' : 'text-pink-300'}`}>
                {theme === 'steampunk' ? 'Present Day' : 'Current Timestamp'}
              </p>
              <p className={`text-lg font-bold ${theme === 'steampunk' ? 'text-amber-100' : 'text-white'}`} 
                 style={{ fontFamily: theme === 'steampunk' ? 'serif' : 'monospace' }}>
                {formatDate(today)}
              </p>
            </div>

            {/* Mode Toggle */}
            <div className="flex justify-center">
              <div 
                className="inline-flex rounded-lg p-1"
                style={{
                  background: theme === 'neon'
                    ? 'linear-gradient(145deg, #1a1a40 0%, #2d2d5f 50%, #1a1a40 100%)'
                    : 'linear-gradient(145deg, #654321 0%, #8B4513 50%, #A0522D 100%)',
                  border: theme === 'neon' ? '1px solid #00ffff' : '2px solid #4A2C17',
                  boxShadow: theme === 'steampunk' ? 'inset 0 2px 4px rgba(0,0,0,0.3)' : ''
                }}
              >
                <button
                  onClick={() => setMode('days')}
                  className={`px-4 py-2 rounded-md font-semibold text-sm transition-all duration-200 ${
                    mode === 'days' ? '' : 'hover:opacity-80'
                  }`}
                  style={mode === 'days' 
                    ? (theme === 'steampunk' 
                        ? {
                            background: 'linear-gradient(145deg, #FFD700 0%, #DAA520 50%, #B8860B 100%)',
                            color: '#2F1B14',
                            fontFamily: 'serif',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                          }
                        : {
                            background: 'linear-gradient(145deg, #00ffff 0%, #0080ff 50%, #0040ff 100%)',
                            color: '#000020',
                            fontFamily: 'monospace'
                          }
                      )
                    : { 
                        color: theme === 'neon' ? '#00ffff' : '#DEB887',
                        fontFamily: theme === 'steampunk' ? 'serif' : 'monospace'
                      }
                  }
                >
                  {theme === 'steampunk' ? 'Days Calculator' : 'Day Counter'}
                </button>
                <button
                  onClick={() => setMode('date')}
                  className={`px-4 py-2 rounded-md font-semibold text-sm transition-all duration-200 ${
                    mode === 'date' ? '' : 'hover:opacity-80'
                  }`}
                  style={mode === 'date' 
                    ? (theme === 'steampunk' 
                        ? {
                            background: 'linear-gradient(145deg, #FFD700 0%, #DAA520 50%, #B8860B 100%)',
                            color: '#2F1B14',
                            fontFamily: 'serif',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                          }
                        : {
                            background: 'linear-gradient(145deg, #00ffff 0%, #0080ff 50%, #0040ff 100%)',
                            color: '#000020',
                            fontFamily: 'monospace'
                          }
                      )
                    : { 
                        color: theme === 'neon' ? '#00ffff' : '#DEB887',
                        fontFamily: theme === 'steampunk' ? 'serif' : 'monospace'
                      }
                  }
                >
                  {theme === 'steampunk' ? 'Date Calculator' : 'Date Scanner'}
                </button>
              </div>
            </div>

            {/* Controls - Days Mode */}
            {mode === 'days' && (
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={toggleSign}
                    className="flex items-center justify-center w-14 h-14 rounded-full transition-all duration-200 transform hover:scale-105 active:scale-95"
                    style={{
                      background: isNegative 
                        ? (theme === 'steampunk' 
                            ? 'linear-gradient(145deg, #8B0000 0%, #A52A2A 50%, #DC143C 100%)'
                            : 'linear-gradient(145deg, #ff0040 0%, #cc0030 50%, #990020 100%)'
                          )
                        : (theme === 'steampunk'
                            ? 'linear-gradient(145deg, #006400 0%, #228B22 50%, #32CD32 100%)'
                            : 'linear-gradient(145deg, #00ff00 0%, #00cc00 50%, #009900 100%)'
                          ),
                      border: theme === 'steampunk' ? '3px solid #4A2C17' : '2px solid #00ffff',
                      boxShadow: theme === 'steampunk'
                        ? '0 6px 12px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.2)'
                        : '0 0 15px rgba(0,255,255,0.4), inset 0 1px 0 rgba(255,255,255,0.1)'
                    }}
                  >
                    {isNegative ? 
                      <Minus className={`w-6 h-6 ${theme === 'steampunk' ? 'text-red-100' : 'text-white'}`} /> : 
                      <Plus className={`w-6 h-6 ${theme === 'steampunk' ? 'text-green-100' : 'text-white'}`} />
                    }
                  </button>
                  
                  <div className="flex-1 relative">
                    <input
                      type="number"
                      value={days}
                      onChange={handleDaysChange}
                      placeholder={theme === 'steampunk' ? "Enter number of days..." : "Input day count..."}
                      className="w-full px-6 py-4 text-lg font-semibold rounded-lg focus:outline-none transition-all duration-200"
                      style={{
                        background: theme === 'steampunk'
                          ? 'linear-gradient(145deg, #F4E4BC 0%, #DEB887 50%, #D2B48C 100%)'
                          : 'linear-gradient(145deg, #0a0a1f 0%, #1a1a40 50%, #0a0a1f 100%)',
                        border: theme === 'steampunk' ? '3px solid #8B4513' : '2px solid #00ffff',
                        color: theme === 'steampunk' ? '#2F1B14' : '#00ffff',
                        fontFamily: theme === 'steampunk' ? 'serif' : 'monospace',
                        boxShadow: theme === 'steampunk'
                          ? 'inset 0 3px 6px rgba(0,0,0,0.2), 0 2px 4px rgba(0,0,0,0.1)'
                          : 'inset 0 0 10px rgba(0,255,255,0.2), 0 0 10px rgba(0,255,255,0.3)'
                      }}
                      min="0"
                    />
                    <div className={`absolute inset-1 border opacity-30 rounded pointer-events-none ${
                      theme === 'steampunk' ? 'border-amber-400' : 'border-cyan-400'
                    }`}></div>
                  </div>
                </div>

                {/* Preset buttons */}
                <div className="space-y-3">
                  <p className={`text-center font-semibold text-sm ${theme === 'steampunk' ? 'text-amber-200' : 'text-cyan-300'}`} 
                     style={{ fontFamily: theme === 'steampunk' ? 'serif' : 'monospace' }}>
                    {theme === 'steampunk' ? 'Quick Temporal Calculations' : 'Preset Time Jumps'}
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {[10, 100, 1000, 10000].map(presetDays => (
                      <button
                        key={presetDays}
                        onClick={() => {
                          setDays(presetDays.toString());
                          const dayCount = isNegative ? -presetDays : presetDays;
                          setTargetDate(calculateDate(dayCount));
                        }}
                        className="px-4 py-3 text-sm font-bold rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95"
                        style={{
                          background: theme === 'steampunk'
                            ? 'linear-gradient(145deg, #B8860B 0%, #DAA520 50%, #CD853F 100%)'
                            : 'linear-gradient(145deg, #ff00ff 0%, #cc00cc 50%, #990099 100%)',
                          border: theme === 'steampunk' ? '2px solid #8B6914' : '1px solid #00ffff',
                          color: theme === 'steampunk' ? '#2F1B14' : '#ffffff',
                          fontFamily: theme === 'steampunk' ? 'serif' : 'monospace',
                          boxShadow: theme === 'steampunk'
                            ? '0 4px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)'
                            : '0 0 10px rgba(255,0,255,0.4), inset 0 1px 0 rgba(255,255,255,0.1)'
                        }}
                      >
                        {presetDays.toLocaleString()} {theme === 'steampunk' ? 'Days' : 'DAYS'}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="text-center">
                  <p className={`font-semibold ${theme === 'steampunk' ? 'text-amber-200' : 'text-cyan-300'}`} 
                     style={{ fontFamily: theme === 'steampunk' ? 'serif' : 'monospace' }}>
                    {theme === 'steampunk' 
                      ? (isNegative ? 'Days Past from Present' : 'Days Hence from Present')
                      : (isNegative ? 'Days Back in Time' : 'Days Into Future')
                    }
                  </p>
                </div>
              </div>
            )}

            {/* Controls - Date Mode */}
            {mode === 'date' && (
              <div className="space-y-4">
                <div className="space-y-3">
                  <p className={`text-center font-semibold text-sm ${theme === 'steampunk' ? 'text-amber-200' : 'text-cyan-300'}`} 
                     style={{ fontFamily: theme === 'steampunk' ? 'serif' : 'monospace' }}>
                    {theme === 'steampunk' ? 'Select a Date to Calculate Distance' : 'Target Date Selection'}
                  </p>
                  <div className="relative">
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={handleDateChange}
                      className="w-full px-6 py-4 text-lg font-semibold rounded-lg focus:outline-none transition-all duration-200"
                      style={{
                        background: theme === 'steampunk'
                          ? 'linear-gradient(145deg, #F4E4BC 0%, #DEB887 50%, #D2B48C 100%)'
                          : 'linear-gradient(145deg, #0a0a1f 0%, #1a1a40 50%, #0a0a1f 100%)',
                        border: theme === 'steampunk' ? '3px solid #8B4513' : '2px solid #00ffff',
                        color: theme === 'steampunk' ? '#2F1B14' : '#00ffff',
                        fontFamily: theme === 'steampunk' ? 'serif' : 'monospace',
                        boxShadow: theme === 'steampunk'
                          ? 'inset 0 3px 6px rgba(0,0,0,0.2), 0 2px 4px rgba(0,0,0,0.1)'
                          : 'inset 0 0 10px rgba(0,255,255,0.2), 0 0 10px rgba(0,255,255,0.3)'
                      }}
                    />
                    <div className={`absolute inset-1 border opacity-30 rounded pointer-events-none ${
                      theme === 'steampunk' ? 'border-amber-400' : 'border-cyan-400'
                    }`}></div>
                  </div>
                </div>
              </div>
            )}

            {/* Result displays */}
            {mode === 'days' && targetDate && (
              <div 
                className="rounded-lg p-6 text-center relative transform transition-all duration-500 scale-105"
                style={{
                  background: theme === 'steampunk'
                    ? 'linear-gradient(145deg, #B8860B 0%, #DAA520 30%, #FFD700 60%, #FFA500 100%)'
                    : 'linear-gradient(145deg, #00ffff 0%, #0080ff 30%, #ff00ff 60%, #ff0080 100%)',
                  border: theme === 'steampunk' ? '3px solid #8B6914' : '2px solid #00ffff',
                  boxShadow: theme === 'steampunk'
                    ? '0 10px 20px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.3), 0 0 20px rgba(255,215,0,0.3)'
                    : '0 0 30px rgba(0,255,255,0.6), 0 10px 20px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.2)'
                }}
              >
                {theme === 'steampunk' && <div className="absolute inset-2 border-2 border-yellow-400 opacity-40 rounded"></div>}
                {theme === 'neon' && <div className="absolute inset-1 border border-cyan-300 opacity-60 rounded" style={{ boxShadow: 'inset 0 0 10px rgba(0,255,255,0.3)' }}></div>}
                <p className={`text-sm mb-2 font-bold ${theme === 'steampunk' ? 'text-amber-900' : 'text-black'}`} 
                   style={{ fontFamily: theme === 'steampunk' ? 'serif' : 'monospace' }}>
                  {theme === 'steampunk' 
                    ? (isNegative ? `${days} days past was` : `In ${days} days hence shall be`)
                    : (isNegative ? `${days} DAYS AGO` : `${days} DAYS FROM NOW`)
                  }
                </p>
                <p className={`text-xl font-bold ${theme === 'steampunk' ? 'text-amber-900' : 'text-black'}`} 
                   style={{ 
                     fontFamily: theme === 'steampunk' ? 'serif' : 'monospace', 
                     textShadow: theme === 'steampunk' ? '1px 1px 2px rgba(0,0,0,0.3)' : 'none'
                   }}>
                  {formatDate(targetDate)}
                </p>
              </div>
            )}

            {mode === 'date' && daysDifference !== null && (
              <div 
                className="rounded-lg p-6 text-center relative transform transition-all duration-500 scale-105"
                style={{
                  background: theme === 'steampunk'
                    ? 'linear-gradient(145deg, #B8860B 0%, #DAA520 30%, #FFD700 60%, #FFA500 100%)'
                    : 'linear-gradient(145deg, #00ffff 0%, #0080ff 30%, #ff00ff 60%, #ff0080 100%)',
                  border: theme === 'steampunk' ? '3px solid #8B6914' : '2px solid #00ffff',
                  boxShadow: theme === 'steampunk'
                    ? '0 10px 20px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.3), 0 0 20px rgba(255,215,0,0.3)'
                    : '0 0 30px rgba(0,255,255,0.6), 0 10px 20px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.2)'
                }}
              >
                {theme === 'steampunk' && <div className="absolute inset-2 border-2 border-yellow-400 opacity-40 rounded"></div>}
                {theme === 'neon' && <div className="absolute inset-1 border border-cyan-300 opacity-60 rounded" style={{ boxShadow: 'inset 0 0 10px rgba(0,255,255,0.3)' }}></div>}
                <p className={`text-sm mb-2 font-bold ${theme === 'steampunk' ? 'text-amber-900' : 'text-black'}`} 
                   style={{ fontFamily: theme === 'steampunk' ? 'serif' : 'monospace' }}>
                  {formatDate(new Date(selectedDate))} {theme === 'steampunk' ? 'is' : 'OCCURS'}
                </p>
                <p className={`text-xl font-bold ${theme === 'steampunk' ? 'text-amber-900' : 'text-black'}`} 
                   style={{ 
                     fontFamily: theme === 'steampunk' ? 'serif' : 'monospace', 
                     textShadow: theme === 'steampunk' ? '1px 1px 2px rgba(0,0,0,0.3)' : 'none'
                   }}>
                  {Math.abs(daysDifference).toLocaleString()} {theme === 'steampunk' ? 'days' : 'DAYS'} {daysDifference >= 0 ? (theme === 'steampunk' ? 'in the future' : 'IN FUTURE') : (theme === 'steampunk' ? 'in the past' : 'IN PAST')}
                </p>
                {Math.abs(daysDifference) > 365 && (
                  <p className={`text-sm mt-2 font-semibold ${theme === 'steampunk' ? 'text-amber-800' : 'text-gray-800'}`} 
                     style={{ fontFamily: theme === 'steampunk' ? 'serif' : 'monospace' }}>
                    ({theme === 'steampunk' ? 'Approximately' : 'APPROX'} {Math.round(Math.abs(daysDifference) / 365 * 10) / 10} {theme === 'steampunk' ? 'years' : 'YEARS'})
                  </p>
                )}
              </div>
            )}

            {((mode === 'days' && !days) || (mode === 'date' && !selectedDate)) && (
              <div className="text-center py-8">
                <p className={`italic font-semibold ${theme === 'steampunk' ? 'text-amber-300' : 'text-cyan-400'}`} 
                   style={{ fontFamily: theme === 'steampunk' ? 'serif' : 'monospace' }}>
                  {mode === 'days' 
                    ? (theme === 'steampunk' ? 'Enter a quantity to divine the date...' : 'INPUT DAYS TO CALCULATE...')
                    : (theme === 'steampunk' ? 'Select a date to calculate the temporal distance...' : 'SELECT TARGET DATE...')
                  }
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Corner decorations */}
        {theme === 'steampunk' && (
          <>
            <div 
              className="absolute top-2 left-2 w-4 h-4 rounded-full opacity-60"
              style={{ background: 'radial-gradient(circle, #FFD700, #B8860B)' }}
            ></div>
            <div 
              className="absolute top-2 right-2 w-4 h-4 rounded-full opacity-60"
              style={{ background: 'radial-gradient(circle, #FFD700, #B8860B)' }}
            ></div>
            <div 
              className="absolute bottom-2 left-2 w-4 h-4 rounded-full opacity-60"
              style={{ background: 'radial-gradient(circle, #FFD700, #B8860B)' }}
            ></div>
            <div 
              className="absolute bottom-2 right-2 w-4 h-4 rounded-full opacity-60"
              style={{ background: 'radial-gradient(circle, #FFD700, #B8860B)' }}
            ></div>
          </>
        )}

        {theme === 'neon' && (
          <>
            <div 
              className="absolute top-2 left-2 w-3 h-3 opacity-80"
              style={{ 
                background: '#00ffff',
                boxShadow: '0 0 10px #00ffff',
                clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
              }}
            ></div>
            <div 
              className="absolute top-2 right-2 w-3 h-3 opacity-80"
              style={{ 
                background: '#ff00ff',
                boxShadow: '0 0 10px #ff00ff',
                clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
              }}
            ></div>
            <div 
              className="absolute bottom-2 left-2 w-3 h-3 opacity-80"
              style={{ 
                background: '#00ff00',
                boxShadow: '0 0 10px #00ff00',
                clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)'
              }}
            ></div>
            <div 
              className="absolute bottom-2 right-2 w-3 h-3 opacity-80"
              style={{ 
                background: '#ffff00',
                boxShadow: '0 0 10px #ffff00',
                clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)'
              }}
            ></div>
          </>
        )}
      </div>
    </div>
  );
}