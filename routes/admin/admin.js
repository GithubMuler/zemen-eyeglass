const express = require('express');
const router = express.Router();
router.get('/admin', (req, res) => {
    return res.render('admin/home')
})
 router.get('/404', (req, res) => {
    return res.render('admin/404')
 })
 router.get('/blank', (req, res) => {
    return res.render('admin/blank')
 })
 router.get('/button', (req, res) => {
    return res.render('admin/button')
 })
router.get('/chart', (req, res) => {
    return res.render('admin/chart');
});
router.get('/element', (req, res) => {
    return res.render('admin/element')
});
router.get('/form', (req, res) => {
    return res.render('admin/form')
});
router.get('/signin', (req, res) => {
    return res.render('admin/signin')
});
router.get('/signup', (req, res) => {
    return res.render('admin/signup')
});
router.get('/table', (req, res) => {
    return res.render('admin/table')
});
router.get('/typography', (req, res) => {
    return res.render('admin/typography')
});
router.get('/widget', (req, res) => {
    return res.render('admin/widget')
}) 
module.exports =router;