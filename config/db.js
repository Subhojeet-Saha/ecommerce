import mongoose from 'mongoose';
import colors from 'colors';


const connectdb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`connected to mongo db database ${conn.connection.host}`.bgMagenta.white)
    }
    catch (error) {
        console.log(`error in mongodb ${error}`.bgRed.white);
    }
}

export default connectdb;