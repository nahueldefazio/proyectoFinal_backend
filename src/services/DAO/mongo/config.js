import dotenv from 'dotenv';
import mongoose from 'mongoose';
import logger from '../../../utils/logger.js';

dotenv.config()

mongoose.connect(process.env.MONGO_URI, (err) => {
    if (err) {
        logger.error('MongoDB error conection');
    } else {
        logger.info('**MONGODB ON**')
    }});

export default mongoose;