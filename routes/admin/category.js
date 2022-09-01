const express = require('express');
const mongoose = require('mongoose');
const { findByIdAndDelete, findByIdAndRemove } = require('../../models/Category');
//var { body, expressValidator} = require('express-validator');
const Category =require('../../models/Category')
const router = express.Router();

// GET category 
router.get('/', (req, res) => {
    Category.find(function (err, categories) {
        if (err) return console.log(err);
        res.render('admin/category',
            { categories: categories });
    })
})
// GET add-category 
router.get('/add-category', (req, res) => {
    var title = "";
    res.render('admin/add-category');
    title:title
 })
 // POST add-category  
router.post('/add-category', (req, res) => {
    req.checkBody('title', 'Title must  have a value.').notEmpty();
    var title = req.body.title;
    var slug = title.replace(/\s+/g, '-').toLowerCase();
    var errors = req.validationErrors();
    if (errors) {
        res.render('admin/add-category', {
            errors: errors,
            title: title
        });
    }
    else {
        Category.findOne({ slug: slug }, function (err, category) {
            if (category) {
                req.flash('danger', 'Category title exist, choose another');
                res.render('admin/add-category', {
                    title: title
                });
            } else {
                var category = new Category({
                    title: title,
                    slug: slug
                });
                category.save(function (err) {
                    if (err) 
                        return console.log(err);
                        req.flash('success', 'Category added successfully!');
                        res.redirect('/admin/category');
                    });
            }
        });
    }
});
// GET edit-category  
router.get('/edit-category/:id', function (req, res) {
    Category.findById(req.params.id, function (err, category) {
        if (err) 
            return console.log(err);
            res.render('admin/edit-category', {
                title: category.title,
                id: category._id
            });
        });
});
// POST edit-category  
router.post('/edit-category/:id', (req, res) => {
    req.checkBody('title', 'Title must have a value.').notEmpty();
    var title = req.body.title;
    var slug = title.replace(/\s+/g, '-').toLowerCase();
    var id = req.params.id;
    var errors = req.validationErrors();
    if (errors) {
        res.render('admin/edit-category', {
            errors: errors,
            title: title,
            id: id,
        });
    } else {
        Category.findOne({ slug: slug, _id: { '$ne': id } }, function (err, category) {
            if (category) {
                req.flash('danger', 'Category already exist');
                res.render('admin/edit-category', {
                    title: title,
                    id: id
                });
            } else {
                Category.findById(id, function (err, category) {
                    if (err) 
                        return console.log(err);
                        category.title = title;
                        category.slug = slug;
                        category.save(function (err) {
                            if (err)
                                return console.log(err);
                            req.flash('success', 'Category edited successfully!');
                            res.redirect('/admin/category');
                        });
                    });
            }
        });
    }
});
// DELETE category 
router.get('/delete-category/:id', function (req, res) {
    Category.findByIdAndRemove(req.params.id, function (err) {
        if (err)
            return console.log(err);
        req.flash('success', 'category deleted successfully!');
        res.redirect('/admin/category');
    });
});
module.exports = router;
