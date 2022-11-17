import mongoose from 'mongoose'
import app from './app.js'
import { Tour } from './models/tourModel.js'

const DB = process.env.DATABASE.replace('PASSWORD', process.env.DATABASE_PASSWORD)

mongoose.connect(DB, {
    useNewUrlParser : true,
}).then(conn => {
    console.log("Database is connected");
}).catch(err => {
    console.log(err);
})



// const testTour = new Tour({
//     name : 'The west forest',
//     price : 496
// })

// testTour.save().then(doc => console.log(doc)).catch(err => console.log(err))

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running');
})