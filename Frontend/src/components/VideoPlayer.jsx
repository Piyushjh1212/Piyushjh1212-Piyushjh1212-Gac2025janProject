import { useState, useRef, useEffect } from 'react'
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw, Settings, CheckCircle2 } from 'lucide-react'
import './VideoPlayer.css'

const VideoPlayer = ({ lesson, isPlaying, setIsPlaying, onLessonComplete, isCompleted }) => {
  const videoRef = useRef(null)
  const progressRef = useRef(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [playbackRate, setPlaybackRate] = useState(1)
  const [showSettings, setShowSettings] = useState(false)
  const [watchedPercentage, setWatchedPercentage] = useState(0)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const updateTime = () => setCurrentTime(video.currentTime)
    const updateDuration = () => setDuration(video.duration)
    
    const updateProgress = () => {
      const percentage = (video.currentTime / video.duration) * 100
      setWatchedPercentage(percentage)
      
      // Mark as complete when 90% watched
      if (percentage >= 90 && !isCompleted) {
        onLessonComplete()
      }
    }

    video.addEventListener('timeupdate', updateTime)
    video.addEventListener('timeupdate', updateProgress)
    video.addEventListener('loadedmetadata', updateDuration)
    video.addEventListener('ended', onLessonComplete)

    return () => {
      video.removeEventListener('timeupdate', updateTime)
      video.removeEventListener('timeupdate', updateProgress)
      video.removeEventListener('loadedmetadata', updateDuration)
      video.removeEventListener('ended', onLessonComplete)
    }
  }, [lesson, onLessonComplete, isCompleted])

  const togglePlay = () => {
    const video = videoRef.current
    if (video.paused) {
      video.play()
      setIsPlaying(true)
    } else {
      video.pause()
      setIsPlaying(false)
    }
  }

  const handleProgressClick = (e) => {
    const rect = progressRef.current.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const newTime = (clickX / rect.width) * duration
    videoRef.current.currentTime = newTime
  }

  const toggleMute = () => {
    const video = videoRef.current
    video.muted = !video.muted
    setIsMuted(video.muted)
  }

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    videoRef.current.volume = newVolume
    setIsMuted(newVolume === 0)
  }

  const changePlaybackRate = (rate) => {
    videoRef.current.playbackRate = rate
    setPlaybackRate(rate)
    setShowSettings(false)
  }

  const rewind10 = () => {
    videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 10)
  }

  const toggleFullscreen = () => {
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen()
    }
  }

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="video-player">
      <div className="video-container">
        <video
          ref={videoRef}
          className="video-element"
          poster={lesson.thumbnail}
          onClick={togglePlay}
        >
          <source src={lesson.videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {isCompleted && (
          <div className="completion-overlay">
            <div className="completion-badge">
              <CheckCircle2 size={48} />
              <span>Lesson Completed!</span>
            </div>
          </div>
        )}

        <div className="video-controls">
          <div className="progress-container" onClick={handleProgressClick} ref={progressRef}>
            <div className="progress-background">
              <div 
                className="progress-fill"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              ></div>
              <div 
                className="progress-watched"
                style={{ width: `${watchedPercentage}%` }}
              ></div>
            </div>
          </div>

          <div className="controls-row">
            <div className="controls-left">
              <button className="control-btn" onClick={togglePlay}>
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </button>
              
              <button className="control-btn" onClick={rewind10}>
                <RotateCcw size={18} />
              </button>

              <div className="volume-control">
                <button className="control-btn" onClick={toggleMute}>
                  {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="volume-slider"
                />
              </div>

              <div className="time-display">
                <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
              </div>
            </div>

            <div className="controls-right">
              <div className="settings-control">
                <button 
                  className="control-btn"
                  onClick={() => setShowSettings(!showSettings)}
                >
                  <Settings size={18} />
                </button>
                
                {showSettings && (
                  <div className="settings-menu">
                    <div className="settings-section">
                      <span className="settings-label">Playback Speed</span>
                      {[0.5, 0.75, 1, 1.25, 1.5, 2].map(rate => (
                        <button
                          key={rate}
                          className={`settings-option ${playbackRate === rate ? 'active' : ''}`}
                          onClick={() => changePlaybackRate(rate)}
                        >
                          {rate}x
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <button className="control-btn" onClick={toggleFullscreen}>
                <Maximize size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="lesson-header">
        <div className="lesson-meta">
          <h2 className="lesson-title">{lesson.title}</h2>
          <div className="lesson-stats">
            <span className="lesson-duration">{lesson.duration}</span>
            <span className="lesson-difficulty">{lesson.difficulty}</span>
            {isCompleted && (
              <span className="completed-badge">
                <CheckCircle2 size={16} />
                Completed
              </span>
            )}
          </div>
        </div>
        
        <div className="progress-ring">
          <svg width="60" height="60" className="progress-circle">
            <circle
              cx="30"
              cy="30"
              r="25"
              stroke="rgba(255, 255, 255, 0.2)"
              strokeWidth="4"
              fill="none"
            />
            <circle
              cx="30"
              cy="30"
              r="25"
              stroke="#10b981"
              strokeWidth="4"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 25}`}
              strokeDashoffset={`${2 * Math.PI * 25 * (1 - watchedPercentage / 100)}`}
              className="progress-circle-fill"
            />
          </svg>
          <span className="progress-text">{Math.round(watchedPercentage)}%</span>
        </div>
      </div>
    </div>
  )
}

export default VideoPlayer