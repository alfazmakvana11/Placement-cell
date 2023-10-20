const express = require("express");
const {
    addInterview,
    create,
    enrollInInterview,
    deallocate,
    // deleteInterview,
} = require("../controllers/interviewController");
const router = express.Router();

// rendering add interview page
router.get("/add-interview", addInterview);

// create add interview page
router.post("/create", create);

// enrolling student in an interview
router.post("/enroll-in-interview/:id", enrollInInterview);

// deallocate the student from te interview
router.get("/deallocate/:studentId/:interviewId", deallocate);

// // Add a new route for deleting interviews
// router.get("/delete/:id", deleteInterview);

// exporting the router
module.exports = router;