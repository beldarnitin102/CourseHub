import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import DashboardLayout from "../DashboardLayout";
import CourseInformationForm from "../../../components/course/CourseInformationForm";
import AddSection from "../../../components/course/AddSection";

import { getCourseDetails } from "../../../services/operations/courseAPI";

import {
setCourse,
setEditCourse,
} from "../../../redux/slices/courseSlice";

export default function EditCourse() {
const { courseId } = useParams();

const dispatch = useDispatch();

useEffect(() => {
fetchCourse();


return () => {
  dispatch(setEditCourse(false));
};


}, []);

const fetchCourse = async () => {
const result = await getCourseDetails(courseId);


console.log(result);

if (result?.success) {
  dispatch(setCourse(result.data));
  dispatch(setEditCourse(true));
}


};

return ( <DashboardLayout> <h1 className="mb-8 text-4xl font-bold">
Edit Course </h1>

  <CourseInformationForm />

  <div className="mt-8">
    <AddSection courseId={courseId} />
  </div>
</DashboardLayout>


);
}
