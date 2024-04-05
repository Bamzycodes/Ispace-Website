import  mongoose from 'mongoose';

const postSchema = new mongoose.Schema({ 
  image: [ String ],
  date: { type: String, },
  title: { type: String,  },
  description: { type: String, },
  },
  {
    timestamps: true
  }
) 

const Post = mongoose.model("Post", postSchema)
export default Post