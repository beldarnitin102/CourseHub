const express = require("express");
const router = express.Router();

const {
 generateCourseFromPlaylist
} = require("../controllers/AIController");
const { auth, isInstructor } =
require("../middleware/auth");


router.post(
 "/generate-course", auth,
  isInstructor,
 generateCourseFromPlaylist
);

module.exports = router;

// //Server is running on port 3000
// connected to database
// ValidationError: Course validation failed: category: Path `category` is required.
//     at model.validate (C:\Users\Admin\OneDrive\Desktop\mega backend\backend\node_modules\mongoose\lib\document.js:2864:36)
//     at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
//     at async model.$__save (C:\Users\Admin\OneDrive\Desktop\mega backend\backend\node_modules\mongoose\lib\model.js:393:7)
//     at async model.save (C:\Users\Admin\OneDrive\Desktop\mega backend\backend\node_modules\mongoose\lib\model.js:667:5)
//     at async Function.create (C:\Users\Admin\OneDrive\Desktop\mega backend\backend\node_modules\mongoose\lib\model.js:2747:5)
//     at async exports.createCourseFromAI (C:\Users\Admin\OneDrive\Desktop\mega backend\backend\services\courseGenerator.js:13:20)
//     at async exports.generateCourseFromPlaylist (C:\Users\Admin\OneDrive\Desktop\mega backend\backend\controllers\AIController.js:79:27) {
//   errors: {
//     category: ValidatorError: Path `category` is required.
//         at SchemaObjectId.doValidate (C:\Users\Admin\OneDrive\Desktop\mega backend\backend\node_modules\mongoose\lib\schemaType.js:1514:13)
//         at model.validate (C:\Users\Admin\OneDrive\Desktop\mega backend\backend\node_modules\mongoose\lib\document.js:2842:20)
//         at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
//         at async model.$__save (C:\Users\Admin\OneDrive\Desktop\mega backend\backend\node_modules\mongoose\lib\model.js:393:7)
//         at async model.save (C:\Users\Admin\OneDrive\Desktop\mega backend\backend\node_modules\mongoose\lib\model.js:667:5)
//         at async Function.create (C:\Users\Admin\OneDrive\Desktop\mega backend\backend\node_modules\mongoose\lib\model.js:2747:5)
//         at async exports.createCourseFromAI (C:\Users\Admin\OneDrive\Desktop\mega backend\backend\services\courseGenerator.js:13:20)
//         at async exports.generateCourseFromPlaylist (C:\Users\Admin\OneDrive\Desktop\mega backend\backend\controllers\AIController.js:79:27) {
//       properties: [Object],
//       kind: 'required',
//       path: 'category',
//       value: undefined,
//       reason: undefined,
//       [Symbol(mongoose#validatorError)]: true
//     }
//   },
//   _message: 'Course validation failed'
// }
