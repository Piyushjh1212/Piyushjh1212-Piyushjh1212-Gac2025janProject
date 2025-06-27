import { Menu, X, Award, Clock, BookOpen } from "lucide-react";
import "./ProgressHeader.css";

const ProgressHeader = ({
  course,
  completedCount,
  totalCount,
  sidebarOpen,
  setSidebarOpen,
}) => {
  const progressPercentage =
    totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <header className="progress-header">
      <div className="header-left">
        <button
          className="sidebar-toggle"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <div className="course-info">
          <h1 className="course-title">{course.title}</h1>
          <div className="course-stats">
            <div className="stat">
              <BookOpen size={16} />
              <span>
                {completedCount}/{totalCount} Lessons
              </span>
            </div>
            <div className="stat">
              <Clock size={16} />
              <span>{course.duration}</span>
            </div>
            <div className="stat">
              <Award size={16} />
              <span>{course.level}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="header-right">


        {progressPercentage === 100 && (
          <div className="completion-badge">
            <Award className="badge-icon" />
            <span>Completed!</span>
          </div>
        )}
      </div>
    </header>
  );
};

export default ProgressHeader;
