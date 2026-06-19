import { useState } from "react";
import VideoPlayer from "../../components/video/VideoPlayer";
import VideoSidebar from "../../components/video/VideoSidebar";
import LectureContent from "../../components/video/LectureContent";

export default function ViewCourse() {
  const courseSections = [
    {
      _id: 1,
      sectionName: "Getting Started",

      subSections: [
        {
          _id: 11,
          title: "Welcome",
          description:
            "Introduction to the course",

          videoUrl:
            "https://www.w3schools.com/html/mov_bbb.mp4",
        },

        {
          _id: 12,
          title: "Course Roadmap",
          description:
            "Understand the learning path",

          videoUrl:
            "https://www.w3schools.com/html/mov_bbb.mp4",
        },
      ],
    },

    {
      _id: 2,
      sectionName: "React Basics",

      subSections: [
        {
          _id: 21,
          title: "Components",

          description:
            "Understanding Components",

          videoUrl:
            "https://www.w3schools.com/html/mov_bbb.mp4",
        },

        {
          _id: 22,
          title: "Props",

          description:
            "Passing Data Between Components",

          videoUrl:
            "https://www.w3schools.com/html/mov_bbb.mp4",
        },
      ],
    },
  ];

  const [selectedLecture, setSelectedLecture] =
    useState(
      courseSections[0].subSections[0]
    );

  return (
    <div className="min-h-screen bg-[#F3F4F6]">

      <div className="grid min-h-screen lg:grid-cols-[350px_1fr]">

        {/* Sidebar */}

        <div className="border-r">

          <VideoSidebar
            sections={courseSections}
            setSelectedLecture={
              setSelectedLecture
            }
          />

        </div>

        {/* Main Content */}

        <div className="p-4 md:p-8">

          <VideoPlayer
            selectedLecture={selectedLecture}
          />

          <LectureContent
            selectedLecture={selectedLecture}
          />

        </div>

      </div>

    </div>
  );
}