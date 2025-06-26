import mongoose from "mongoose";

const LearnCourseModleSchema = new mongoose.Schema({
    CourseId: {
        Type: String,
        requierd : [True, "Course_id Is required"]
    },
    CourseName: {
        Type: String,
    },
    CourseLevel:{
        Type:String
    },
    CourseRating: {
        type: Number,
        default: 0,
    },
    StudentsEnrolled: {
        Type: Number
    },
    CourseTime: {
        Type: Number
    },
    OverView: {
        Type: String
    },
    Transcript: {
        Type: String
    }
});

const My_LEARNCourseModle =

    mongoose.models.My_LEARNCourseModle || mongoose.model("My_LEARNCourseModle", LearnCourseModleSchema, "My_LEARNCourseModle");

export default My_LEARNCourseModle;
