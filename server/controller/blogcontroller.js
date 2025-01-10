import blogPostModel from "../model/blogPost.js";

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
