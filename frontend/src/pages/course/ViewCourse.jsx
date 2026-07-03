import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

import {
  getCourseProgress,
  markLectureComplete,
  updateLastViewedLecture,
} from "../../services/operations/courseProgressAPI";

import CourseHeader from "./CourseHeader";
import VideoPlayer from "./VideoPlayer";
import VideoSidebar from "./VideoSidebar";
import LectureContent from "./LectureContent";
import LectureNavigation from "./LectureNavigation";
import MobileSidebar from "./MobileSidebar";

export default function ViewCourse() {
  const { courseId } = useParams();

  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const [course, setCourse] = useState(null);
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [loading, setLoading] = useState(true);

  // temporary state
  const [completedLectures, setCompletedLectures] = useState([]);

  const totalLectures = useMemo(() => {
    if (!course) return 0;

    return course.courseContent.reduce(
      (acc, sec) => acc + (sec.subSection?.length || 0),
      0,
    );
  }, [course]);

  const completedSections = course?.courseContent
  ?.filter((section) =>
    section.subSection.every((lecture) =>
      completedLectures.includes(lecture._id)
    )
  )
  ?.map((section) => section.sectionName) || [];

const progress =
  totalLectures > 0
    ? Math.round((completedLectures.length / totalLectures) * 100)
    : 0;


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

      const progress = await getCourseProgress(courseId, token);

      if (progress?.data?.completedVideos) {
        setCompletedLectures(
          progress.data.completedVideos.map((video) => video._id),
        );
      }

      if (progress?.data?.lastViewedVideo) {
        const lecture = courseData.courseContent
          .flatMap((section) => section.subSection)
          .find((item) => item._id === progress.data.lastViewedVideo);

        if (lecture) {
          setSelectedLecture(lecture);
        }
      } else if (
        courseData.courseContent?.length &&
        courseData.courseContent[0]?.subSection?.length
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

  const handleVideoEnd = () => {
    if (nextLecture) {
      setSelectedLecture(nextLecture);
    }
  };

  const markCompleted = async () => {
    if (completedLectures.includes(selectedLecture._id)) return;

    const response = await markLectureComplete(
      courseId,
      selectedLecture._id,
      token,
    );

    if (response?.success) {
      setCompletedLectures((prev) => [...prev, selectedLecture._id]);
    }
  };

  useEffect(() => {
    if (!selectedLecture) return;

    updateLastViewedLecture(courseId, selectedLecture._id, token);
  }, [selectedLecture]);

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
            setSelectedLecture={setSelectedLecture}
          />
        </aside>

        {/* Main */}

        <MobileSidebar
          sections={course.courseContent}
          selectedLecture={selectedLecture}
          setSelectedLecture={setSelectedLecture}
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

          <CourseHeader
            course={course}
            totalLectures={totalLectures}
            completedLectures={completedLectures.length}
          />

          {/* Video */}

          <VideoPlayer
            selectedLecture={selectedLecture}
            onVideoEnd={handleVideoEnd}
          />

          {/* Lecture */}

          <LectureContent
           course={course}
            selectedLecture={selectedLecture}
            courseId={courseId}
            completed={completedLectures.includes(selectedLecture?._id)}
            markCompleted={markCompleted}
              completedSections={completedSections}
    progress={progress}
          />

          {/* Navigation */}

          <LectureNavigation
            previousLecture={previousLecture}
            nextLecture={nextLecture}
            setSelectedLecture={setSelectedLecture}
            markCompleted={markCompleted}
            completed={completedLectures.includes(selectedLecture?._id)}
          />
        </main>
      </div>
    </div>
  );
}
