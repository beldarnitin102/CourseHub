const express = require("express");

const router = express.Router();

const { auth, isAdmin } = require("../middleware/auth");

const { getDashboardStats } = require("../controllers/Admin/dashboard");

const { getAllUsers, deleteUser } = require("../controllers/Admin/users");

const { getAllCourses, deleteCourse, getCourseDetailsAdmin } = require("../controllers/Admin/courses");

const {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
} = require("../controllers/Admin/categories");

const { getInstructorDetails , getStudentDetails } = require("../controllers/Admin/userController");


router.get("/student/:id", auth, isAdmin, getStudentDetails);

router.get("/instructor/:id", auth, isAdmin, getInstructorDetails);

router.get("/dashboard", auth, isAdmin, getDashboardStats);

router.get("/users", auth, isAdmin, getAllUsers);

router.delete("/users/:userId", auth, isAdmin, deleteUser);

router.get("/courses", auth, isAdmin, getAllCourses);

router.delete("/courses/:courseId", auth, isAdmin, deleteCourse);

router.post("/create-category", auth, isAdmin, createCategory);

router.get("/get-all-categories", auth, isAdmin, getAllCategories);

router.put("/update-category", auth, isAdmin, updateCategory);

router.delete("/delete-category", auth, isAdmin, deleteCategory);

router.get(
    "/course/:courseId",
    auth,
    isAdmin,
    getCourseDetailsAdmin
);

module.exports = router;
