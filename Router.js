const express = require('express');
const router = express.Router();
const infoRouter = require('./infoSchema');
const crypto = require("crypto");
const path = require("path");
const mongoose = require("mongoose");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");

//MONGOURI
const mongoURI = "mongodb://localhost:27017/mern";

//  MONGO connection
const conn = mongoose.createConnection(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//init gfs
let gfs;
conn.once('open', () => {
  //init gfs stream
 gfs  = Grid(conn.db,mongoose.mongo);
 gfs.collection('uploads');
})

// Storage
const storage = new GridFsStorage({
   url: mongoURI,
   file: (req, file) => {
     return new Promise((resolve, reject) => {
       crypto.randomBytes(16, (err, buf) => {
         if (err) {
           return reject(err);
         }
         const filename = buf.toString("hex") + path.extname(file.originalname);
         const fileInfo = {
           filename: filename,
           bucketName: "uploads"
         };
         resolve(fileInfo);
       });
     });
   }
 });
 
 const upload = multer({
   storage
 });



router.post("/", upload.single('file'),async(req,res) => {
    console.log(req.body);
    var data = new infoRouter({
        Name:req.body.Name,
        Age:req.body.Age,
        City:req.body.City,
        Image:req.file
        
    });
    await data.save();
     res.json(data);
})
 
//getall
 router.get('/',async(req,res) => {
     var finddata = await infoRouter.find();
     res.json(finddata);

 })

 //update
 router.put('/update',async(req,res) => {
     var update = await infoRouter.update({_id:req.body._id},{$set:{
         Name:req.body.Name,
         Age:req.body.Age,
         City:req.body.City
     }});
     res.json(update);
 })
 
//delete
router.delete("/del/:id",async(req,res)=> {
    var delData = await infoRouter.findByIdAndRemove(req.params.id).then(e => {
        res.json({message:"deleted sucess"});
    })
})

router.get("/", (req,res) => {
    console.log('test');
    res.json('im Router');
})

 module.exports = router;