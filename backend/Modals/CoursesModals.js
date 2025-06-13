import mongoose, {Schema} from "mongoose";

const courseItemSchema = new Schema(
  {
    CourseId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: [true, "title is required"],
      trim: [true],
      minlength: [3, "Title must be at least 3 characters long"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      minlength: [10, "Description must be at least 10 characters long"],
    },
    image: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      trim: true,
      validate: {
        validator: function (v) {
          return !v || /^https?:\/\/.+/.test(v);
        },
        message: "Please enter a valid URL",
      },
    },
  },
  { timestamps: true }
);

const CourseItem =
  mongoose.models.CourseItem || mongoose.model("CourseItem", courseItemSchema);

export default CourseItem;
