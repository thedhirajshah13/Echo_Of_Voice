// import blogModel from "../model/blogPost.js";
import blogPostModel from "../model/blogPost.js";
import commentModel from "../model/commentPost.js";

export const postBlog = async (req, res) => {
  try {
    const { title, catergories, blog, image } = req.body;
    console.log(title, catergories, blog, image);

    const blogPost = new blogPostModel({
      title,
      catergories,
      blog,
      image,
      user: req.user,
    });

    await blogPost.save();
    res.status(200).json({ msg: "blog posted succesfully" });
  } catch (error) {
    res.status(502).json({ msg: error });
  }
};

export const getpost = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.body.limit) || 3;
    const skip = (page - 1) * limit;

    const posts = await blogPostModel.find().skip(skip).limit(limit);
    const totalPosts = await blogPostModel.countDocuments();

    res.status(200).json({
      success: true,
      posts,
      totalPosts,
      totalPages: Math.ceil(totalPosts / limit),
      currentpage: page,
    });
  } catch (error) {
    res.status(500).json({ success: false, msg: "Server error", error });
  }
};

export const fullBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const fullBlog = await blogPostModel
      .findOne({ _id: id })
      .populate("user", "-password")
      .populate({
        path: "comments",
        populate: {
          path: "user",
          select: "-password",
        },
      });

    

    if (!fullBlog) {
      res.status(404).json({ success: false, msg: "Blog Not Found" });
    }
    // 
    if (fullBlog) {
      res.status(200).json({ success: true, fullBlog });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, msg: "Server error", error });
  }
};

export const postComment = async (req, res) => {
  try {
    const { message, blog } = req.body;
    console.log(req.user._id);

    const blogComment = new commentModel({
      message,
      blog,
      user: req.user._id,
    });

    await blogComment.save();
    await blogPostModel.findByIdAndUpdate(blog, {
      $push: { comments: blogComment._id },
    });
    res
      .status(200)
      .json({ success: true, msg: "your comments has been posted Thanku" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, msg: "Server Error" });
  }
};
