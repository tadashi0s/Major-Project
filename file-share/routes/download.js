const router = require('express').Router();
const File = require('../model/file');
router.get('/:uuid',async(req,res)=>{
    try{
        const file =  await File.findOne({uuid:req.params.uuid});
        if(!file){
            return res.status(400).render('download',{error:"link expired"})
        }
       const filePath=`${__dirname}/../${file.path}`;
       res.download(filePath);
    }catch(error){
        return res.status(500).render('download',{error:error})
    }
    
})










module.exports= router;