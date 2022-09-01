const express = require('express');
const mkdirp = require('mkdirp');
const resizeImg = require('resize-img');
//const fs = require('fs-extra');
const Category =require('../../models/Category')
const Product =require('../../models/Product')
const path = require('path');
const router = express.Router();

// Multer start here
const multer = require('multer');
var fs = require('fs');
const storage = multer.diskStorage({
  destination:function(req, file, cb){
    cb(null, './product_images')
  },
  filename: function(req, file, cb){
    cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  },
});
const upload = multer({
  storage: storage,
}).single('image');
//Multer end here


// GET product index
router.get('/', (req, res) => {
       var count;
    Product.count(function (err, c) {
        count = c;
    });
    Product.find({},function (err, products) {
res.render('admin/product',{products: products,count: count} );
    });

});
// GET add-product 
router.get('/add-product', (req, res) => {
    var title = '';
    var description = '';
    var price = '';
    Category.find(function (err, categories) {
        res.render('admin/add-product', {
            title: title,
            description: description,
            categories: categories,
            price: price
        });
    })
});
    // POST add-product
router.post('/add-product',upload, function (req, res) {
    //var imageFile = typeof req.files.image !== "undefined" ? req.file.filename : "";
        var imageFile = req.file.filename;
    req.checkBody('title', ' Title must have a value.').notEmpty();
    req.checkBody('description', ' description must have a value.').notEmpty();
    req.checkBody('price', ' price must have a value.').isDecimal();
  // req.checkBody('image', ' you must upload an image.').isImage(imageFile);
    var title = req.body.title;
    var slug = title.replace(/\s+/g, '-').toLowerCase();
    var description = req.body.description;
    var price = req.body.price;
    var category = req.body.category;
    var errors = req.validationErrors();
    if (errors) {
        Category.find(function (err, categories) {
            res.render('admin/add-product', {
                errors: errors,
                title: title,
                description: description,
                categories: categories,
                price: price
            });
        });
    } else {
        Product.findOne({ slug: slug }, function (err, product) {
            if (product) {
                req.flash('danger', 'product exist, choose another.');
                Category.find(function (err, categories) {
                    res.render('admin/add-product', {
                        title: title,
                        description: description,
                        categories: categories,
                        price: price
                    });
                });
            } else {
                var price2 = parseFloat(price).toFixed(2);
                var product = new Product({
                    title: title,
                    slug: slug,
                    description: description,
                    price: price2,
                    category: category,
                    image: imageFile
                });
                product.save(function (err) {
                    if (err) 
                        return console.log(err);
                //    mkdirp('public/product_images/' + product._id);
                //     mkdirp('public/product_images/' + product._id + '/gallery');
                //     mkdirp('public/product_images/' + product._id + '/gallery/thumbs');
                //     if (imageFile != "") {
                //         var productImage =  await req.files.image;
                //         var path = './public/product_images/' + product._id + '/' + imageFile;
                //         productImage.mv(path, function (err) {
                //             return console.log(err);
                //         });
                //     }
                    req.flash('success', 'product added successfully!');
                    res.redirect('/admin/product');
                });
            }
        } );
    }
});
// //EDIT product
// router.get('/edit-product/:id', function (req, res) {
//     var errors;
//     if (req.session.errors)
//         errors = req.session.errors;
//            req.session.errors = null;
//     Category.find(function (err, categories) {
//           Product.findById(req.params.id, function (err, p) {
//               if (err) {
//                   return console.log(err);
//                     res.redirect('/admin/product');
// }
//         else {
//           var galleryDir = 'public/product_images'+p._id+'/gallery';
//             var galleryImages = null;
//             fs.readdir(galleryDir, function (err, files) {
//                 if (err) {
//                     console.log(err);
//                 } else {
//                     galleryImages = files;
//                     res.render('admin/edit-product', {
//                         title: p.title,
//                         errors: errors,
//                         description: p.description,
//                         categories: categories,
//                         category: p.category.replace(/\s+/g, '-').toLowerCase(),
//                         price: p.price,
//                         image: p.image,
//                         galleryImages: galleryImages
//                     });
//                                         }
//             })
//             }
//         });
// });
// })
//GET edit product
router.get("/edit-product/:id", function (req, res) {
      var errors;
    if (req.session.errors)
        errors = req.session.errors;
    req.session.errors = null;
    
    Category.find(function (err, categories) {
    let id = req.params.id;
    Product.findById(id, function (err, product) {
        if (err) {
              return console.log(err);
            res.redirect('/admin/product');
        }
        else {
            if (product == null) {
                res.redirect('/admin/product');
            }
            else {
                res.render('admin/edit-product',
                    {
                        title: product.title,
                        errors: errors,
                        description: product.description,
                        categories: categories,
                        category: product.category.replace(/\s+/g, '-').toLowerCase(),
                        price: product.price,
                        image: product.image,
                        product: product,
                    });
            }
        }
    });
    })
    
  });





    // POST edit-product
router.post('/edit-product/:id', upload, (req, res) => {
             
    req.checkBody('title', ' Title must have a value.').notEmpty();
    req.checkBody('description', ' description must have a value.').notEmpty();
    req.checkBody('price', ' price must have a value.').isDecimal();
    

    let id = req.params.id;
    let new_image ='';
    if (req.file){
        new_image = req.file.filename;
        try{
            fs.unlinkSync('./product_images/' + req.body.old_image);
        }catch (err){
            console.log(err);
        }
    } else {
        new_image = req.body.old_image;
    }
req.checkBody('image', ' you must upload an image.').isImage(new_image);

    Product.findByIdAndUpdate(id, {
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        price:req.body.price,
        image: new_image
},  (err, result) => {
    if (err) {
      res.json({ message: err.message, type: 'danger' });
    } else {
      req.session.message = {
        type: 'success',
        message: 'product  updated successfully!'
      };
      res.redirect('/admin/product');
    }
    });
});
  // DELETE product 
router.get('/delete-product/:id', function (req, res) {
      let id = req.params.id;
    Product.findByIdAndRemove(id, function (err, result) {
      if (result.image != '') {
            try {
                fs.unlinkSync('./product_images/' + result.image);
            } catch (err) {
                console.log(err);
            }
        }
        if (err)
            return console.log(err);
         req.flash('success', 'product deleted successfully!');
      
       res.redirect('/admin/product');
    });
});
//POST
// router.post('/edit-product', upload, function (req, res) {
//     //var imageFile = typeof req.files.image !== "undefined" ? req.file.filename : "";
//     var imageFile = req.file.filename;
//     req.checkBody('title', ' Title must have a value.').notEmpty();
//     req.checkBody('description', ' description must have a value.').notEmpty();
//     req.checkBody('price', ' price must have a value.').isDecimal();
//     req.checkBody('image', ' you must upload an image.').isImage(imageFile);

//     var title = req.body.title;
//     var slug = title.replace(/\s+/g, '-').toLowerCase();
//     var description = req.body.description;
//     var price = req.body.price;
//     var category = req.body.category;
//     var pimage = req.body.pimage;
//     var id = req.params.id;
//     var errors = req.validationErrors();
//     if (errors) {
//         req.session.errors = errors;
//         res.redirect('/admin/product/edit-product' + id);
//     } else {
//         Product.findOne({ slug: slug, _id: { '$ne': id } }, function (err, p) {
//             if (err) console.log(err);
//             if (p) {
//                 req.flash('danger', 'Product title exist, choose another.');
//                 res.redirect('/admin/product/edit-product' + id);
//             } else {
//                 product.findById(id, function (err, p) {
//                     if (err) console.log(err);
//                     else {
//                         p.title = title;
//                         p.slug = slug;
//                         p.description = description;
//                         p.price = parseFloat(price).toFixed(2);
//                         p.category = category;
//                         if (imageFile != "") {
//                             p.image = imageFile;
//                         }
//                         p.save(function (err) {
//                             if (err) console.log(err);
//                             if (imageFile != "") {
//                                 if (pimage != "") {
//                                     fs.remove('public/product_images/' + id + '/' + pimage, function (err) {
//                                         if (err) console.log(err);
//                                     });
//                                 }
//                                 var productImage = req.files.image;
//                                 var path = '/public/product_images/' + id + '/' + imageFile;
//                                 productImage.mv(path, function (err) {
//                                     return console.log(err);
//                                 });
                            
//                             }
//                             req.flash('success', 'product edited successfully! ');
//                             res.redirect('/admin/product');
//                         });
//                     }
//                     });
//             }
//         });
//     }
// });
module.exports =router;