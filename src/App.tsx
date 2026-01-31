import { useState, useEffect, useCallback } from 'react'

type Screen = 'setup' | 'alarm-set' | 'alarm-ringing' | 'snoozed' | 'cancelled'

interface Photo {
  id: number
  name: string
  size: string
  url: string
}

const embarrassingPhotos: Photo[] = [
  { id: 1, name: 'IMG_2904.JPG', size: '2.4 MB', url: 'https://picsum.photos/seed/embarrassing1/400/300' },
  { id: 2, name: 'IMG_1337.JPG', size: '3.1 MB', url: 'https://picsum.photos/seed/embarrassing2/400/300' },
  { id: 3, name: 'IMG_0420.JPG', size: '1.8 MB', url: 'https://picsum.photos/seed/embarrassing3/400/300' },
  { id: 4, name: 'IMG_6969.JPG', size: '2.7 MB', url: 'https://picsum.photos/seed/embarrassing4/400/300' },
  { id: 5, name: 'IMG_8008.JPG', size: '4.2 MB', url: 'https://picsum.photos/seed/embarrassing5/400/300' },
]

function App() {
  const [screen, setScreen] = useState<Screen>('setup')
  const [alarmTime, setAlarmTime] = useState('07:00')
  const [groupName, setGroupName] = useState('Family Group')
  const [countdown, setCountdown] = useState(5)
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const selectRandomPhoto = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * embarrassingPhotos.length)
    setSelectedPhoto(embarrassingPhotos[randomIndex])
  }, [])

  const handleSetAlarm = () => {
    setScreen('alarm-set')
  }

  const handleTriggerAlarm = () => {
    selectRandomPhoto()
    setScreen('alarm-ringing')
  }

  const handleSnooze = () => {
    setCountdown(5)
    setScreen('snoozed')
  }

  const handleWakeUp = () => {
    setScreen('cancelled')
  }

  const handleReset = () => {
    setScreen('setup')
    setCountdown(5)
    setSelectedPhoto(null)
  }

  useEffect(() => {
    if (screen === 'snoozed' && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    } else if (screen === 'snoozed' && countdown === 0) {
      setScreen('alarm-ringing')
    }
  }, [screen, countdown])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Phone Frame */}
        <div className="bg-black rounded-[3rem] p-3 shadow-2xl">
          {/* Dynamic Island */}
          <div className="bg-black rounded-[2.5rem] overflow-hidden">
            {/* Status Bar */}
            <div className="bg-gray-50 px-8 pt-3 pb-2 flex justify-between items-center">
              <span className="text-sm font-semibold">{formatTime(currentTime)}</span>
              <div className="w-28 h-8 bg-black rounded-full mx-auto"></div>
              <div className="flex items-center gap-1">
                <div className="flex gap-0.5">
                  <div className="w-1 h-2 bg-gray-800 rounded-sm"></div>
                  <div className="w-1 h-3 bg-gray-800 rounded-sm"></div>
                  <div className="w-1 h-4 bg-gray-800 rounded-sm"></div>
                  <div className="w-1 h-3 bg-gray-300 rounded-sm"></div>
                </div>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
                </svg>
                <div className="flex items-center">
                  <div className="w-6 h-3 border border-gray-800 rounded-sm relative">
                    <div className="absolute inset-0.5 bg-gray-800 rounded-sm" style={{width: '60%'}}></div>
                  </div>
                  <div className="w-0.5 h-1.5 bg-gray-800 rounded-r-sm"></div>
                </div>
              </div>
            </div>

            {/* Screen Content */}
            <div className="bg-gray-50 min-h-[600px] px-6 pb-8">
              {screen === 'setup' && (
                <div className="pt-8 space-y-6">
                  <div className="text-center">
                    <div className="text-6xl mb-4">⏰</div>
                    <h1 className="text-2xl font-bold text-gray-900">Photo Threat Alarm</h1>
                    <p className="text-gray-500 mt-2 text-sm">Wake up or face the consequences</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Alarm Time</label>
                      <input
                        type="time"
                        value={alarmTime}
                        onChange={(e) => setAlarmTime(e.target.value)}
                        className="w-full px-4 py-3 text-2xl text-center border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Send to Group</label>
                      <input
                        type="text"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="Family Group"
                      />
                    </div>
                  </div>

                  <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">⚠️</span>
                      <div>
                        <p className="text-sm font-medium text-red-800">Warning</p>
                        <p className="text-xs text-red-600 mt-1">If you snooze, a random photo from your gallery will be sent to "{groupName}"</p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleSetAlarm}
                    className="w-full bg-gray-900 text-white py-4 rounded-2xl font-semibold text-lg hover:bg-gray-800 transition-colors"
                  >
                    Set Alarm
                  </button>
                </div>
              )}

              {screen === 'alarm-set' && (
                <div className="pt-12 space-y-8 text-center">
                  <div>
                    <div className="text-6xl mb-4">✅</div>
                    <h1 className="text-2xl font-bold text-gray-900">Alarm Set!</h1>
                    <p className="text-gray-500 mt-2">Don't oversleep...</p>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <p className="text-6xl font-light text-gray-900">{alarmTime}</p>
                    <p className="text-gray-500 mt-2">Tomorrow morning</p>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                    <p className="text-sm text-amber-800">
                      📸 {embarrassingPhotos.length} photos ready to send to <strong>{groupName}</strong>
                    </p>
                  </div>

                  <button
                    onClick={handleTriggerAlarm}
                    className="w-full bg-red-500 text-white py-4 rounded-2xl font-semibold text-lg hover:bg-red-600 transition-colors"
                  >
                    🔔 Simulate Alarm
                  </button>

                  <button
                    onClick={handleReset}
                    className="text-gray-500 text-sm hover:text-gray-700"
                  >
                    Cancel Alarm
                  </button>
                </div>
              )}

              {screen === 'alarm-ringing' && (
                <div className="pt-8 space-y-6 text-center">
                  <div className="shake">
                    <div className="text-7xl">🔔</div>
                  </div>
                  <div>
                    <p className="text-6xl font-light text-gray-900">{alarmTime}</p>
                    <p className="text-gray-500 mt-2">WAKE UP!</p>
                  </div>

                  <div className="space-y-3">
                    <button
                      onClick={handleWakeUp}
                      className="w-full bg-green-500 text-white py-4 rounded-2xl font-semibold text-lg hover:bg-green-600 transition-colors"
                    >
                      I'm Awake!
                    </button>
                    <button
                      onClick={handleSnooze}
                      className="w-full bg-gray-200 text-gray-700 py-4 rounded-2xl font-semibold text-lg hover:bg-gray-300 transition-colors"
                    >
                      Snooze (5 min)
                    </button>
                  </div>

                  <p className="text-red-500 text-sm font-medium pulse-red">
                    ⚠️ Snoozing will trigger photo selection!
                  </p>
                </div>
              )}

              {screen === 'snoozed' && selectedPhoto && (
                <div className="pt-6 space-y-4">
                  <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-medium">
                    <span>⚠️</span>
                    <span>ALARM SNOOZED</span>
                  </div>

                  <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900">Oh no! You went back to sleep.</h1>
                    <p className="text-gray-500 mt-2 text-sm">
                      We selected a random photo from your gallery. sending it to "{groupName}" in...
                    </p>
                  </div>

                  <div className="text-center">
                    <p className="text-7xl font-bold text-red-500 pulse-red">{countdown}</p>
                    <p className="text-red-500 text-sm">seconds</p>
                  </div>

                  <div className="bg-white rounded-2xl p-4 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-sm">👥</span>
                        </div>
                        <span className="text-sm font-medium">Sending photo...</span>
                      </div>
                      <span className="text-gray-400">✈️</span>
                    </div>
                    <div className="rounded-xl overflow-hidden bg-gray-100">
                      <img
                        src={selectedPhoto.url}
                        alt="Random gallery photo"
                        className="w-full h-48 object-cover"
                      />
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-gray-500">
                      <span>{selectedPhoto.name}</span>
                      <span>{selectedPhoto.size}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleWakeUp}
                    className="w-full bg-gray-900 text-white py-4 rounded-2xl font-semibold text-lg flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors"
                  >
                    <span>✕</span>
                    <span>I'M AWAKE!</span>
                  </button>

                  <p className="text-center text-gray-400 text-sm">Tap to cancel send</p>
                </div>
              )}

              {screen === 'cancelled' && (
                <div className="pt-16 space-y-8 text-center">
                  <div>
                    <div className="text-7xl mb-4">😮‍💨</div>
                    <h1 className="text-2xl font-bold text-gray-900">Phew! That was close.</h1>
                    <p className="text-gray-500 mt-2">Photo send cancelled. You're safe... for now.</p>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                    <p className="text-green-800">
                      ✅ No embarrassing photos were sent to {groupName}
                    </p>
                  </div>

                  <button
                    onClick={handleReset}
                    className="w-full bg-gray-900 text-white py-4 rounded-2xl font-semibold text-lg hover:bg-gray-800 transition-colors"
                  >
                    Set New Alarm
                  </button>
                </div>
              )}
            </div>

            {/* Home Indicator */}
            <div className="bg-gray-50 pb-2 pt-1">
              <div className="w-32 h-1 bg-gray-900 rounded-full mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App