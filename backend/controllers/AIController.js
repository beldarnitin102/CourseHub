exports.generateCourseFromPlaylist =
async (req,res)=>{
  try{

    const playlistUrl = req.body 

    return res.status(200).json({
      success:true,
      data: playlistUrl
    })
  }
  catch(error){
    console.log(error);

    return res.status(500).json({
      success:false,
      message:error.message
    });
  }
}