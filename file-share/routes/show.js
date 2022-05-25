const router= require('express').Router();
const File = require('../model/file');
require('dotenv').config();
router.get('/:uuid',async (req,res)=>{
try{
    const file = await File.findOne({uuid:req.params.uuid});
    if(!file){
        res.status(404).render('download',{error:"link has been expired"});
    }
    return res.render('download',{
        uuid:file.uuid,
        fileName:file.filename,
        fileSize:file.size,
        downloadLink:`${process.env.APP_BASE_URL}/files/download/${file.uuid}`
        // http:localhos:3000/files/download/trew-2edhjbnm
    })
}catch(e){
  return res.status(500).render('download',{error:"something went wrong in downloading"});
}

})



module.exports= router;