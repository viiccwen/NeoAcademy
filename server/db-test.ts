import mongoose, { model, Schema } from 'mongoose';


mongoose.connect(process.env.DATABASE_URL!);

const TestSchema = new Schema({
    name: String,
    age: Number,
});

const TestPerson = model('Test', TestSchema);

const testPerson = new TestPerson({ name: 'henlo', age: 42069 });
const tp = await testPerson.save();
console.log(tp);
console.log(tp._id);
