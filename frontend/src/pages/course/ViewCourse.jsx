import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import CourseHeader from "./CourseHeader";
import VideoPlayer from "./VideoPlayer";
import VideoSidebar from "./VideoSidebar";
import LectureContent from "./LectureContent";
import LectureNavigation from "./LectureNavigation";
import MobileSidebar from "./MobileSidebar";

export default function ViewCourse() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [loading, setLoading] = useState(true);

  // temporary state
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    fetchCourseDetails();
  }, [courseId]);

  const fetchCourseDetails = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `http://localhost:3000/api/v1/course/getCourseDetails/${courseId}`,
      );

      const courseData = response.data.data;

      setCourse(courseData);

      if (
        courseData?.courseContent?.length > 0 &&
        courseData.courseContent[0]?.subSection?.length > 0
      ) {
        setSelectedLecture(courseData.courseContent[0].subSection[0]);
      }
    } catch (err) {
      console.log(err);
      setCourse(null);
    } finally {
      setLoading(false);
    }
  };

  const totalLectures = useMemo(() => {
    if (!course) return 0;

    return course.courseContent.reduce(
      (acc, sec) => acc + (sec.subSection?.length || 0),
      0,
    );
  }, [course]);

  const allLectures =
    course?.courseContent?.flatMap((section) => section.subSection) || [];

  const currentIndex = allLectures.findIndex(
    (lecture) => lecture._id === selectedLecture?._id,
  );

  const previousLecture =
    currentIndex > 0 ? allLectures[currentIndex - 1] : null;

  const nextLecture =
    currentIndex < allLectures.length - 1
      ? allLectures[currentIndex + 1]
      : null;

  const markCompleted = () => {
    setCompleted(true);
  };

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center text-2xl">
        Loading...
      </div>
    );

  if (!course)
    return (
      <div className="flex h-screen items-center justify-center text-2xl">
        Course Not Found
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="grid lg:grid-cols-[330px_1fr]">
        {/* Sidebar */}

        <aside className="sticky top-0 hidden h-screen overflow-y-auto border-r bg-white lg:block">
          <VideoSidebar
            sections={course.courseContent}
            selectedLecture={selectedLecture}
            setSelectedLecture={(lecture) => {
              setSelectedLecture(lecture);
              setCompleted(false);
            }}
          />
        </aside>

        {/* Main */}

        <MobileSidebar
          sections={course.courseContent}
          selectedLecture={selectedLecture}
          setSelectedLecture={(lecture) => {
            setCompleted(false);
            setSelectedLecture(lecture);
          }}
        />

        <main className="space-y-6 p-6">
          {/* Back */}

          <button
            onClick={() => navigate(-1)}
            className="rounded-lg border bg-white px-4 py-2 font-medium shadow hover:bg-gray-100"
          >
            ← Back
          </button>

          {/* Header */}

          <CourseHeader course={course} totalLectures={totalLectures} />

          {/* Video */}

          <VideoPlayer selectedLecture={selectedLecture} />

          {/* Lecture */}

          <LectureContent
            selectedLecture={selectedLecture}
            completed={completed}
            markCompleted={markCompleted}
          />

          {/* Navigation */}

          <LectureNavigation
            previousLecture={previousLecture}
            nextLecture={nextLecture}
            setSelectedLecture={(lecture) => {
              setCompleted(false);
              setSelectedLecture(lecture);
            }}
            markCompleted={markCompleted}
            completed={completed}
          />
        </main>
      </div>
    </div>
  );
}
