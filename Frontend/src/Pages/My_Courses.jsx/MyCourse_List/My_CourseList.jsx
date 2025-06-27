import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ProgressHeader from "./ProgressHeader";
import CoursesSidebar from "./CoursesSidebar";
import VideoPlayer from "./VideoPlayer";
import LessonContent from "./LessonContent";

import "./CoursesPage.css";
import { coursesData } from "./Coursedata";

const MyCourse_ListPage = () => {
  const [selectedCourse, setSelectedCourse] = useState(coursesData[0]);
  const [selectedLesson, setSelectedLesson] = useState(
    coursesData[0].modules[0].lessons[0]
  );
  const [completedLessons, setCompletedLessons] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLessonComplete = (lessonId) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons([...completedLessons, lessonId]);
    }
  };

  const location = useLocation();
  const IsMultiplePage = location.pathname.startsWith("/My_Courses_Leacture");
  console.log("🚀 Current Path:", location.pathname);


  const getTotalLessons = (course) => {
    return course.modules.reduce(
      (total, module) => total + module.lessons.length,
      0
    );
  };

  const getCompletedCount = (course) => {
    const allLessonIds = course.modules.flatMap((module) =>
      module.lessons.map((lesson) => lesson.id)
    );
    return allLessonIds.filter((id) => completedLessons.includes(id)).length;
  };

  return (
    <div className="courses-page">
      {!IsMultiplePage && (
        <ProgressHeader style={{ display: IsMultiplePage ? "none" : "block" }}
          course={selectedCourse}
          completedCount={getCompletedCount(selectedCourse)}
          totalCount={getTotalLessons(selectedCourse)}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
      )}

      <div className="courses-main">
        <CoursesSidebar
          courses={coursesData}
          selectedCourse={selectedCourse}
          selectedLesson={selectedLesson}
          completedLessons={completedLessons}
          onCourseSelect={setSelectedCourse}
          onLessonSelect={setSelectedLesson}
          isOpen={sidebarOpen}
        />

        <div className={`content-area ${!sidebarOpen ? "full-width" : ""}`}>
          <div className="video-section">
            <VideoPlayer
              lesson={selectedLesson}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
              onLessonComplete={() => handleLessonComplete(selectedLesson.id)}
              isCompleted={completedLessons.includes(selectedLesson.id)}
            />
          </div>

          <div className="lesson-details">
            <LessonContent
              lesson={selectedLesson}
              course={selectedCourse}
              isCompleted={completedLessons.includes(selectedLesson.id)}
              onComplete={() => handleLessonComplete(selectedLesson.id)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCourse_ListPage;
