const express = require('express');
const mongoose = require('mongoose');
const About =require('../../models/about')
const router = express.Router();
const multer = require('multer');
var fs = require('fs');
//  CONTENT LIST
router.get("/", function(req, res){
  About.find({}, function (err, about) {
      about = about.reverse();
      res.render("admin/manage_about_contents", { about: about
        });
    });
  });
//image upload
const storage = multer.diskStorage({
  destination:function(req, file, cb){
    cb(null, './about_images')
  },
  filename: function(req, file, cb){
    cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  },
});
const upload = multer({
  storage: storage,
}).single('image');

  // load add form
  router.get("/add_about_content", function(req, res){
  res.render("admin/add_about_content");
});

//post for adding .. inserting  ABOUT CONTENTS(...new) to the database
  router.post("/add_about_content", upload, function(req, res){
    const about = new About({
      title: req.body.postTitle,
      content: req.body.postBody,
      image: req.file.filename,
    });
    about.save(function (err) {
      if (err) {
        res.json({ message: err.message, type: 'danger' });
      }
      else {
        req.session.message = {
          type: 'success',
          message: 'content added successfully!'
        };
         res.redirect("/admin/about");
      }
    });
  });

//.....updating form load existing data from db 
  router.get("/update_about_contents/:id", function(req, res){
    let id = req.params.id;
    About.findById(id, function(err, about){
        if (err){
            res.redirect('/admin/about');
              }
        else{
            if (about== null){
              res.redirect('/admin/about')  
            }
            else{
              res.render('admin/update_about_contents',
                { title: 'Update Post', about: about, });
            }
        }
    });
  });



//post for update ...save changes to the database
  router.post('/update_about_contents/:id', upload, (req, res) =>{
    let id = req.params.id;
    let new_image ='';
    if (req.file){
        new_image = req.file.filename;
        try{
            fs.unlinkSync('./about_images/' + req.body.old_image);
        }catch (err){
            console.log(err);
        }
    } else {
        new_image = req.body.old_image;
    }
    About.findByIdAndUpdate(id, {
        title: req.body.title,
        content: req.body.content,
        image: new_image,
},  (err, result) => {
    if (err) {
      res.json({ message: err.message, type: 'danger' });
    } else {
      req.session.message = {
        type: 'success',
        message: 'about page updated successfully!'
      };
      res.redirect('/admin/about');
    }
    });
  });

// after delete button is clicked 
router.get("/delete_about_contents/:id", function (req, res) {
    let id = req.params.id;
    About.findByIdAndRemove(id, function (err, result) {
        if (result.image != '') {
            try {
                fs.unlinkSync('./about_images/' + result.image);
            } catch (err) {
                console.log(err);
            }
        }
        if (err) {
            res.json({ message: err.message });
        } else {
            req.session.message = {
                type: 'info',
                message: 'Content deleted successfully!',
            };
            res.redirect('/admin/about');
        }
    })     
})







 
module.exports = router