import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`.brightCyan.bold);
    } catch (error) {
        console.error(`Error: ${error.message}`.brightRed.bold);
        process.exit(1);
    }
}

export default connectDB;