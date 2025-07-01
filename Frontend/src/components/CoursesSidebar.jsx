import { useState, useEffect } from "react";
import {
  ChevronDown,
  ChevronRight,
  Play,
  CheckCircle2,
  Lock,
  Star,
} from "lucide-react";
import "./CoursesSidebar.css";

const CoursesSidebar = ({
  courses,
  selectedCourse,
  selectedLesson,
  completedLessons,
  onCourseSelect,
  onLessonSelect,
  isOpen,
}) => {
  const [expandedModules, setExpandedModules] = useState([
    selectedCourse.modules[0].id,
  ]);
  const [product, setProducts] = useState([]);

  const toggleModule = (moduleId) => {
    setExpandedModules((prev) =>
      prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const getDifficultyColor = (level) => {
    switch (level.toLowerCase()) {
      case "beginner":
        return "#10b981";
      case "intermediate":
        return "#f59e0b";
      case "advanced":
        return "#ef4444";
      default:
        return "#6b7280";
    }
  };

  const isLessonLocked = (lesson, moduleIndex, lessonIndex) => {
    if (moduleIndex === 0 && lessonIndex === 0) return false;

    const allPreviousLessons = [];
    for (let i = 0; i <= moduleIndex; i++) {
      const lessons = selectedCourse.modules[i].lessons;
      if (i === moduleIndex) {
        allPreviousLessons.push(...lessons.slice(0, lessonIndex));
      } else {
        allPreviousLessons.push(...lessons);
      }
    }

    return !allPreviousLessons.every((lesson) =>
      completedLessons.includes(lesson.id)
    );
  };

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `http://localhost:5000/api/v1/my_courses/My_Products/${id}`
        );
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        console.log(data);
        setProducts(data.data);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
    console.log(product)
  }, []);

  return (
    <div className={`courses-sidebar ${isOpen ? "open" : "closed"}`}>
      <div className="sidebar-content">
        <div className="course-selector">
          <h3>Available Courses</h3>
          <div className="My-courses-list">
            {courses.map((course) => (
              <div
                key={course.id}
                className={`My-course-item ${
                  selectedCourse.id === course.id ? "active" : ""
                }`}
                onClick={() => onCourseSelect(course)}
              >
                <div className="course-info">
                  <h4>{course.title}</h4>
                  <div className="course-meta">
                    <span
                      className="difficulty-badge"
                      style={{
                        backgroundColor: getDifficultyColor(course.level),
                      }}
                    >
                      {course.level}
                    </span>
                    <span className="duration">{course.duration}</span>
                  </div>
                </div>
                <div className="course-rating">
                  <Star size={14} fill="currentColor" />
                  <span>{course.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="course-content">
          <h3>Course Content</h3>
          <div className="modules-list">
            {selectedCourse.modules.map((module, moduleIndex) => (
              <div key={module.id} className="module-item">
                <div
                  className="module-header"
                  onClick={() => toggleModule(module.id)}
                >
                  <div className="module-info">
                    {expandedModules.includes(module.id) ? (
                      <ChevronDown size={16} />
                    ) : (
                      <ChevronRight size={16} />
                    )}
                    <span className="module-title">{module.title}</span>
                  </div>
                  <span className="lessons-count">
                    {module.lessons.length} lessons
                  </span>
                </div>

                {expandedModules.includes(module.id) && (
                  <div className="lessons-list">
                    {module.lessons.map((lesson, lessonIndex) => {
                      const isCompleted = completedLessons.includes(lesson.id);
                      const isActive = selectedLesson.id === lesson.id;
                      const isLocked = isLessonLocked(
                        lesson,
                        moduleIndex,
                        lessonIndex
                      );

                      return (
                        <div
                          key={lesson.id}
                          className={`lesson-item ${isActive ? "active" : ""} ${
                            isCompleted ? "completed" : ""
                          } ${isLocked ? "locked" : ""}`}
                          onClick={() => !isLocked && onLessonSelect(lesson)}
                        >
                          <div className="lesson-icon">
                            {isLocked ? (
                              <Lock size={16} />
                            ) : isCompleted ? (
                              <CheckCircle2 size={16} />
                            ) : (
                              <Play size={16} />
                            )}
                          </div>
                          <div className="lesson-info">
                            <span className="lesson-title">{lesson.title}</span>
                            <span className="lesson-duration">
                              {lesson.duration}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursesSidebar;
