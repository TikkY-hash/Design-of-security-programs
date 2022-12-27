import mongoose from 'mongoose'
import app from './app.js'

const DB = process.env.DATABASE.replace('PASSWORD', process.env.DATABASE_PASSWORD)

mongoose.connect(DB, {
    useNewUrlParser : true,
}).then(conn => {
    console.log("Database is connected");
}).catch(err => {
    console.log(err);
})



app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running');
})