import { useState } from 'react'
import { CheckCircle2, Clock, Award, BookOpen, Users, Star, Download, Share2, Edit3 } from 'lucide-react'
import './LessonContent.css'

const LessonContent = ({ lesson, course, isCompleted, onComplete }) => {
  const [activeTab, setActiveTab] = useState('overview')
  const [notes, setNotes] = useState('')

  const handleMarkComplete = () => {
    if (!isCompleted) {
      onComplete()
    }
  }

  const handleSaveNotes = () => {
    // In a real app, this would save to a database
    console.log('Notes saved:', notes)
    alert('Notes saved successfully!')
  }

  return (
    <div className="lesson-content">
      <div className="content-header">
        <div className="lesson-info">
          <h2 className="lesson-title">{lesson.title}</h2>
          <p className="lesson-description">{lesson.description}</p>
          
          <div className="lesson-stats">
            <div className="stat-item">
              <Clock size={16} />
              <span>{lesson.duration}</span>
            </div>
            <div className="stat-item">
              <Award size={16} />
              <span>{lesson.difficulty}</span>
            </div>
            <div className="stat-item">
              <BookOpen size={16} />
              <span>{lesson.type}</span>
            </div>
            <div className="stat-item">
              <Users size={16} />
              <span>{lesson.studentsCount || '1.2k'} students</span>
            </div>
            <div className="stat-item rating">
              <Star size={16} fill="currentColor" />
              <span>{lesson.rating || '4.8'}</span>
            </div>
          </div>
        </div>

        <div className="content-actions">
          <button 
            className={`complete-btn ${isCompleted ? 'completed' : ''}`}
            onClick={handleMarkComplete}
            disabled={isCompleted}
          >
            <CheckCircle2 size={20} />
            {isCompleted ? 'Completed' : 'Mark Complete'}
          </button>
          
          <div className="action-buttons">
            <button className="action-btn">
              <Download size={18} />
              <span>Resources</span>
            </button>
            <button className="action-btn">
              <Share2 size={18} />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>

      <div className="content-tabs">
        <div className="tabs-nav">
          <button 
            className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <BookOpen size={18} />
            Overview
          </button>
          <button 
            className={`tab-btn ${activeTab === 'notes' ? 'active' : ''}`}
            onClick={() => setActiveTab('notes')}
          >
            <Edit3 size={18} />
            Notes
          </button>
          <button 
            className={`tab-btn ${activeTab === 'transcript' ? 'active' : ''}`}
            onClick={() => setActiveTab('transcript')}
          >
            <BookOpen size={18} />
            Transcript
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'overview' && (
            <div className="overview-content">
              <div className="content-section">
                <h3>What You'll Learn</h3>
                <div className="key-points">
                  <ul className="points-list">
                    {lesson.keyPoints?.map((point, index) => (
                      <li key={index} className="point-item">
                        <CheckCircle2 size={16} className="point-icon" />
                        <span>{point}</span>
                      </li>
                    )) || [
                      "Understanding the fundamental concepts and core principles",
                      "Practical implementation techniques with real examples",
                      "Best practices and common pitfalls to avoid",
                      "Real-world application scenarios and use cases",
                      "Advanced tips and optimization strategies"
                    ].map((point, index) => (
                      <li key={index} className="point-item">
                        <CheckCircle2 size={16} className="point-icon" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="content-section">
                <h3>Course Progress</h3>
                <div className="progress-grid">
                  <div className="progress-card">
                    <div className="progress-icon">
                      <BookOpen size={24} />
                    </div>
                    <div className="progress-info">
                      <span className="progress-label">Current Module</span>
                      <span className="progress-value">{course.currentModule || 'Frontend Fundamentals'}</span>
                    </div>
                  </div>
                  
                  <div className="progress-card">
                    <div className="progress-icon">
                      <Clock size={24} />
                    </div>
                    <div className="progress-info">
                      <span className="progress-label">Estimated Time</span>
                      <span className="progress-value">{lesson.estimatedTime || '15 min'}</span>
                    </div>
                  </div>
                  
                  <div className="progress-card">
                    <div className="progress-icon">
                      <Award size={24} />
                    </div>
                    <div className="progress-info">
                      <span className="progress-label">Next Lesson</span>
                      <span className="progress-value">{lesson.nextLesson || 'Advanced Concepts'}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="content-section">
                <h3>Lesson Resources</h3>
                <div className="resources-grid">
                  <div className="resource-item">
                    <Download size={20} />
                    <div>
                      <h4>Code Examples</h4>
                      <p>Download source code and examples</p>
                    </div>
                  </div>
                  <div className="resource-item">
                    <BookOpen size={20} />
                    <div>
                      <h4>Reading Materials</h4>
                      <p>Additional articles and documentation</p>
                    </div>
                  </div>
                  <div className="resource-item">
                    <Award size={20} />
                    <div>
                      <h4>Practice Exercises</h4>
                      <p>Hands-on exercises to reinforce learning</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notes' && (
            <div className="notes-content">
              <div className="notes-header">
                <h3>Personal Notes</h3>
                <p>Take notes while watching the lesson to enhance your learning experience.</p>
              </div>
              
              <div className="notes-editor">
                <textarea 
                  placeholder="Start typing your notes here... 

• Key concepts to remember
• Important code snippets
• Questions to explore further
• Personal insights and observations"
                  className="notes-textarea"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows="12"
                />
                <div className="notes-actions">
                  <button className="save-notes-btn" onClick={handleSaveNotes}>
                    <Edit3 size={16} />
                    Save Notes
                  </button>
                  <span className="notes-count">{notes.length} characters</span>
                </div>
              </div>

              <div className="notes-tips">
                <h4>💡 Note-taking Tips</h4>
                <ul>
                  <li>Write down key concepts in your own words</li>
                  <li>Note any questions that come up during the lesson</li>
                  <li>Record important code snippets or commands</li>
                  <li>Summarize main points at the end of each section</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'transcript' && (
            <div className="transcript-content">
              <div className="transcript-header">
                <h3>Video Transcript</h3>
                <p>Follow along with the complete transcript of this lesson.</p>
              </div>
              
              <div className="transcript-text">
                <div className="transcript-intro">
                  <p><strong>Welcome to {lesson.title}!</strong> In this comprehensive lesson, we'll dive deep into the essential concepts that will help you master this topic and apply it in real-world scenarios.</p>
                </div>
                
                <div className="timestamp-section">
                  <span className="timestamp">00:00</span>
                  <div className="transcript-block">
                    <p>Hello everyone, and welcome to this lesson on <strong>{lesson.title.toLowerCase()}</strong>. I'm excited to guide you through this important topic that will significantly enhance your understanding and skills.</p>
                  </div>
                </div>
                
                <div className="timestamp-section">
                  <span className="timestamp">00:45</span>
                  <div className="transcript-block">
                    <p>Let's start by understanding why this topic is crucial in modern development. We'll explore the fundamental principles and see how they apply to real-world projects.</p>
                  </div>
                </div>
                
                <div className="timestamp-section">
                  <span className="timestamp">02:30</span>
                  <div className="transcript-block">
                    <p>Now, let's dive into the practical aspects. I'll show you step-by-step how to implement these concepts, and we'll work through several examples together.</p>
                  </div>
                </div>
                
                <div className="timestamp-section">
                  <span className="timestamp">05:15</span>
                  <div className="transcript-block">
                    <p>Here's where it gets interesting. We'll explore some advanced techniques and best practices that will help you avoid common pitfalls and write more efficient code.</p>
                  </div>
                </div>
                
                <div className="timestamp-section">
                  <span className="timestamp">08:20</span>
                  <div className="transcript-block">
                    <p>Let's look at a real-world example. This is exactly the kind of scenario you might encounter in your projects, and I'll show you how to approach it systematically.</p>
                  </div>
                </div>
                
                <div className="timestamp-section">
                  <span className="timestamp">11:45</span>
                  <div className="transcript-block">
                    <p>To wrap up, let's review the key points we've covered and discuss how you can continue practicing and improving your skills in this area.</p>
                  </div>
                </div>

                <div className="transcript-summary">
                  <h4>📝 Lesson Summary</h4>
                  <p>In this lesson, we covered the essential concepts of {lesson.title.toLowerCase()}, including practical implementation techniques, best practices, and real-world applications. Make sure to practice these concepts and refer back to this transcript as needed.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {isCompleted && (
        <div className="completion-celebration">
          <div className="celebration-content">
            <div className="celebration-icon">
              <Award size={32} />
            </div>
            <h4>🎉 Lesson Completed!</h4>
            <p>Excellent work! You've successfully completed this lesson. Keep up the momentum and continue your learning journey!</p>
            <div className="achievement-badges">
              <span className="badge">Quick Learner</span>
              <span className="badge">+50 XP</span>
              <span className="badge">Progress Master</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default LessonContent