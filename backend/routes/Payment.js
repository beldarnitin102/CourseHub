const express = require("express")
const router = express.Router()

const {capturePayment, verifySignature} = require("../controllers/Payment")
const {auth, isInstructor, isStudent} = require("../middleware/auth")

router.post("/capturePayment", auth,isStudent,capturePayment)
router.post(
  "/verifySignature",
  (req,res,next)=>{
    console.log("VERIFY ROUTE HIT");
    next();
  },
  verifySignature
);

module.exports = router 