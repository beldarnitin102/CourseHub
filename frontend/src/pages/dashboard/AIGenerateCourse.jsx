import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import DashboardLayout from "./DashboardLayout";

import { generateCourse } from "../../services/operations/aiAPI";
import { getCategories }
from "../../services/operations/courseAPI";
export default function AIGenerateCourse() {

const { token } = useSelector(
(state) => state.auth
);

const [playlistUrl, setPlaylistUrl] =
useState("");

const [categoryId, setCategoryId] =
useState("");

const [categories, setCategories] =
useState([]);

const [loading, setLoading] =
useState(false);

const [generatedCourse,
setGeneratedCourse] =
useState(null);

useEffect(() => {
  const fetchCategories = async () => {
    const result = await getCategories();

    if (result?.data) {
      setCategories(result.data);
    }
  };

  fetchCategories();
}, []);

const handleGenerateCourse =
async () => {


  try {

    setLoading(true);

    const response =
      await generateCourse(
        {
          playlistUrl,
          categoryId,
        },
        token
      );
      console.log(response);

    setGeneratedCourse(
      response.data
    );

  } catch (error) {
    console.log(error);
  }

  setLoading(false);
};


return ( <DashboardLayout>

  <div className="mx-auto max-w-5xl">

    <h1 className="mb-8 text-4xl font-bold">
      AI Course Generator
    </h1>

    <div className="rounded-xl bg-white p-6 shadow">

      <label className="mb-2 block font-semibold">
        Playlist URL
      </label>

      <input
        type="text"
        value={playlistUrl}
        onChange={(e) =>
          setPlaylistUrl(e.target.value)
        }
        placeholder="Paste YouTube Playlist URL"
        className="mb-6 w-full rounded-lg border p-3"
      />

      <label className="mb-2 block font-semibold">
        Category
      </label>

      <select
        value={categoryId}
        onChange={(e) =>
          setCategoryId(e.target.value)
        }
        className="mb-6 w-full rounded-lg border p-3"
      >
        <option value="">
          Select Category
        </option>

        {
          categories.map(
            (category) => (
              <option
                key={category._id}
                value={category._id}
              >
                {category.name}
              </option>
            )
          )
        }

      </select>

      <button
        onClick={
          handleGenerateCourse
        }
        disabled={loading}
        className="rounded-lg bg-yellow-400 px-5 py-3 font-semibold"
      >
        {
          loading
            ? "Generating..."
            : "Generate Course"
        }
      </button>

    </div>

    {
      generatedCourse && (
        <div className="mt-10 rounded-xl bg-white p-6 shadow">

          <img
            src={
              generatedCourse.thumbnail
            }
            alt={
              generatedCourse.courseName
            }
            className="mb-5 h-60 w-full rounded-lg object-cover"
          />

          <h2 className="mb-3 text-3xl font-bold">
            {
              generatedCourse.courseName
            }
          </h2>

          <p className="mb-5">
            {
              generatedCourse.courseDescirption
            }
          </p>

          <h3 className="mb-3 text-xl font-semibold">
            Course Sections
          </h3>

          {
            generatedCourse.courseContent?.map(
              (section) => (
                <div
                  key={section._id}
                  className="mb-5"
                >
                  <h4 className="font-bold">
                    {
                      section.sectionName
                    }
                  </h4>

                  <ul className="ml-5 list-disc">
                    {
                      section.subSection?.map(
                        (lecture) => (
                          <li
                            key={lecture._id}
                          >
                            {
                              lecture.title
                            }
                          </li>
                        )
                      )
                    }
                  </ul>

                </div>
              )
            )
          }

        </div>
      )
    }

  </div>

</DashboardLayout>


);
}
