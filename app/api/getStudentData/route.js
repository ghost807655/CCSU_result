import mongoose from 'mongoose';
import { configDotenv } from 'dotenv';

configDotenv()

// Connect to MongoDB
const connectDB = async () => {
  if (mongoose.connections[0].readyState) {
    return;
  }
  await mongoose.connect(process.env.MONGODB_URL);
};

// Define the Student schema
const resultSchema = new mongoose.Schema({
  name: { type: String, required: true },
    rollNumber: { type: String, required: true, unique: true },
    enrollmentNo: String,
    fatherName: String,
    motherName: String,
    subjects: [
        {
            courseTitle: String,
            codeNo: String,
            maxMarks: String,
            minMarks: String,
            extMarks: Number,
            intMarks: Number,
        }
    ],
    preGrd:Number,
}, { timestamps: true });

const Student = mongoose.models.Student || mongoose.model('Student', resultSchema);

export async function GET(request) {
  console.log("ab ye ")
  const url = new URL(request.url);
  const rollNo = url.searchParams.get('rollNo');

  if (!rollNo) {
    return new Response(JSON.stringify({ error: 'Roll number is required' }), { status: 400 });
  }

  try {
    await connectDB();
    const student = await Student.findOne({ rollNumber: rollNo });

    if (!student) {
      return new Response(JSON.stringify({ error: 'Student not found' }), { status: 404 });
    }

    return new Response(JSON.stringify(student), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch student data' }), { status: 500 });
  }
}
