import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import VideoSidebar from "../../components/video/VideoSidebar";
import LectureContent from "../../components/video/LectureContent";

export default function ViewCourse() {
  const { courseId } = useParams();

  const [course, setCourse] = useState(null);
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourseDetails();
  }, [courseId]);

  const fetchCourseDetails = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `http://localhost:3000/api/v1/course/getCourseDetails/${courseId}`
      );

      const courseData = response.data.data;

      setCourse(courseData);

      if (
        courseData?.courseContent?.length &&
        courseData.courseContent[0]?.subSection?.length
      ) {
        setSelectedLecture(courseData.courseContent[0].subSection[0]);
      }
    } catch (error) {
      console.log(error);
      setCourse(null);
    } finally {
      setLoading(false);
    }
  };

  const getEmbedUrl = (url) => {
    if (!url) return "";

    const match = url.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/i
    );

    if (!match) return "";

    return `https://www.youtube.com/embed/${match[1]}`;
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-2xl font-semibold">
        Loading Course...
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex h-screen items-center justify-center text-2xl font-semibold text-red-500">
        Course Not Found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="grid lg:grid-cols-[340px_1fr]">

        {/* Sidebar */}

        <div className="border-r bg-white h-screen overflow-y-auto">
          <VideoSidebar
            sections={course.courseContent}
            selectedLecture={selectedLecture}
            setSelectedLecture={setSelectedLecture}
          />
        </div>

        {/* Main */}

        <div className="p-6">

          {selectedLecture && (
            <>
              {/* Video */}

              <div className="overflow-hidden rounded-xl bg-black shadow-lg">

                <div className="aspect-video">

                  <iframe
                    src={getEmbedUrl(selectedLecture.videoUrl)}
                    title={selectedLecture.title}
                    className="h-full w-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />

                </div>

              </div>

              {/* Lecture Info */}

              <div className="mt-6 rounded-xl bg-white p-6 shadow">

                <h1 className="text-3xl font-bold">
                  {selectedLecture.title}
                </h1>

                <p className="mt-2 text-sm text-gray-500">
                  Duration : {selectedLecture.timeDuration}
                </p>

                <hr className="my-5" />

                <p className="leading-7 text-gray-700">
                  {selectedLecture.description}
                </p>

              </div>

              <LectureContent
                selectedLecture={selectedLecture}
              />
            </>
          )}

        </div>
      </div>
    </div>
  );
}