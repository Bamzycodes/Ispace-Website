import mongoose from 'mongoose';

const mainSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    pname: { type: String, required: true },
    paname: { type: String, required: true },
    phone: { type: Number, required: true },
    grade: { type: String, required: true },
    platform: { type: String, required: true },
    location: { type: [String], required: true },
    disability: { type: String },
    disability_desc: { type: String},
    course: { type: [String], required: true },
    session: { type: [String], required: true },
    about: { type: [String], required: true },
    other: { type: String},
  },
  {
    timestamps: true,
  }
);

const Main = mongoose.model('Main', mainSchema);
export default Main;