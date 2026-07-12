const express = require("express");
const app = express();

require("dotenv").config();

const PORT = process.env.PORT || 4000;

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const courseRoutes = require("./routes/Course");
const paymentRoutes = require("./routes/Payment");
const AI = require("./routes/AI");
const lectureNoteRoutes = require("./routes/LectureNote");
const courseProgressRoutes = require("./routes/CourseProgress");
const adminRoutes = require("./routes/Admin");
const mentorRoutes = require("./routes/mentorRoutes");
const certificateRoutes = require("./routes/Certificate");

const dbConnect = require("./config/database");
dbConnect();

const cors = require("cors");

const cookieParser = require("cookie-parser");

const { cloudinaryConnect } = require("./config/cloudinary");
cloudinaryConnect();

const fileUpload = require("express-fileupload");

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173", process.env.FRONTEND_URL],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  }),
);
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/ai", AI);
app.use("/api/v1/progress", courseProgressRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/mentor", mentorRoutes);
app.use("/api/v1/certificate", certificateRoutes);
app.use("/api/v1/lecture", lectureNoteRoutes);

app.get("/", (req, res) => {
  res.send("<h1>Your server is up and running  </h1>");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
