import mongoose from "mongoose";

const categoryschema = new mongoose.Schema({
    name: {
        type: String,
        // required: true,
        // unique: true
    },
    slug:{
        type:String,
        lowwercase:true
    }

})

export default mongoose.model('Category',categoryschema);