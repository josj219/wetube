import routes from "../routes";
import Video from "../models/Video"
import Comment from "../models/Comment"

export const home = async(req,res) => {
    try {
        const videos = await Video.find({});
        res.render("home",{pageTitle : 'Home', videos});

    }catch(error){
        console.log(error);        
        res.render("home",{pageTitle : 'Home', videos});
    }

};

export const search = (req,res) => {
    const {
        query : { term : searchingBy }
    } = req;
    res.render("search",{pageTitle : 'Search',searchingBy,videos});
};

export const video = (req,res) => (res.render("video",{pageTitle : 'Videos'}));

export const getUpload = (req,res) => {
    res.render("upload",{pageTitle : 'Upload'});
};

export const postUpload = async (req,res) => {
    const { 
        body : {title, description},
        file : {path}
              } = req;
    const newVideo = await Video.create({
        fileUrl : path,
        title,
        description,
        creator: req.user.id
    });
    req.user.videos.push(newVideo.id);
    req.user.save();    
    res.redirect(routes.videoDetail(newVideo.id));
    
};


export const upload = (req,res) => (res.render("upload",{pageTitle : 'Upload'}));


export const videoDetail = async (req,res) => {
    const {
        params:{id}
    }=req;
    try {
        const video = await Video.findById(id).populate("creator").populate("comments");    
        res.render("videoDetail",{pageTitle : 'Video Detail',video});
    }catch(error){
        console.log(error);
        console.log("######################################################################");
        //console.log(error);
        //res.redirect(routes.home);
    }
};

// Edit Video

export const getEditVideo = async (req, res) => {
    const {
      params: { id }
    } = req;
    try {
      const video = await Video.findById(id);
      if (video.creator.toString() !== req.user.id) {
        throw Error();
      } else {
        res.render("editVideo", { pageTitle: `Edit ${video.title}`, video });
      }
    } catch (error) {
      res.redirect(routes.home);
    }
  };
  
  export const postEditVideo = async (req, res) => {
    const {
      params: { id },
      body: { title, description }
    } = req;
    try {
      await Video.findOneAndUpdate({ _id: id }, { title, description });
      res.redirect(routes.videoDetail(id));
    } catch (error) {
      res.redirect(routes.home);
    }
  };

export const deleteVideo = async (req, res) => {
    const {
      params: { id }
    } = req;
    try {
        const video = await Video.findById(id);
        if (video.creator.toString() !== req.user.id) {
          throw Error();
        } else {
          await Video.findOneAndRemove({ _id: id });
        }
    } catch (error) {
      console.log(error);
    }
    res.redirect(routes.home);
  };

  
// Register Video View

export const postRegisterView = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const video = await Video.findById(id);
    video.views += 1;
    video.save();
    res.status(200);
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};


// Add Comment

export const postAddComment = async (req, res) => {
  const {
    params: { id },
    body: { comment },
    user
  } = req;
  try {
    const video = await Video.findById(id);
    const newComment = await Comment.create({
      text: comment,
      creator: user.id
    });
    video.comments.push(newComment.id);
    video.save();
    console.log('HI');
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};