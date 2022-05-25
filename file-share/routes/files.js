const express = require('express');
const multer = require('multer')
const path = require('path');
const File= require('../model/file')
const {v4:uuid4} = require('uuid')
const router = express();

let storage=multer.diskStorage({
    destination:(req,file,cb)=>cb(null,'uploads/'),
    filename:(req,file,cb)=>{
    const uniqueNmae= `${Date.now()}-${Math.round(Math.random()*1E9)}${path.extname(file.originalname)}`;
        cb(null,uniqueNmae);
    }
})
let upload = multer({
    storage,
    limits:{fileSize:100000*100}
}).single('myFile');//name attribute value or key value in postman
router.post('/',(req,res)=>{
  
      //validate request
       
      //store files
        upload(req,res,async (error)=>{

            if(error){
                console.log(error,error.message)
                return res.status(500).send({error:error.message})} 
             if(!req.file){
                return res.json({error:'all fielsd are required'});   
             }
             //store into database

            const file = new File({
                filename:req.file.filename,
                uuid:uuid4(),
                path:req.file.path,
                size:req.file.size
            });

            const response = await file.save();
            return res.json({file:`${process.env.App_BASE_URL}/files/${response.uuid}`});
            http:localhost:3000/files/hjkl23jk-rewqsc
        })
      //send response
})

router.post('/send',async (req,res)=>{
  const {uuid,emailTo,emailFrom}=req.body;
  if(!uuid||!emailTo||!emailFrom){
      return res.status(422).send({error:"All fields arr necessory"});
  }
  const file=  await  File.findOne({uuid});
  if(file.sender){
    return res.status(422).send({error:"Email already sent"});
  }
  file.sender=emailFrom;
  file.receiver=emailTo;

 const response =await file.save();

//   send email
   const sendMail= require('../services/emailServices');
  sendMail({
    from:emailFrom,
    to:emailTo,
    subject:"File sharing",
    text:`${emailFrom} shared file with you`,
    html:require('../services/emailTemplate')({
        emailFrom,
        downloadLink:`${process.env.App_BASE_URL}/files/${uuid}`,
        size:parseInt(file.size/1000)+'KB',
        expires:'24 hours'
    })
    })

})

module.exports=router;