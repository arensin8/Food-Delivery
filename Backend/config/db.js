import mongoose from "mongoose";

export const connectToDB = async () => {
    await mongoose.connect('mongodb+srv://arensin:arensin2002@cluster0.gwixf9b.mongodb.net/Food-delivery')
        .then(() => {
            console.log('DB connected!');
        })
}