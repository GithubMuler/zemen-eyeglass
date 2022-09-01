// const AdminBroExpress = require('admin-bro-expressjs')
// const AdminBro = require('admin-bro')
// const AdminBroMongoose = require('admin-bro-mongoose')
// const mongoose = require('mongoose');
// const Product = require("../models/product");
// const admin_user = require("../models/admin_user");
// const Order = require("../models/order");
// const Category = require("../models/category");
// const Post = require("../models/Post");
// AdminBro.registerAdapter(AdminBroMongoose)
// const adminBro = new AdminBro({ 
//    databases: [mongoose],
//       rootPath: '/admin',
// 	  branding: {
//     companyName: "ዘመን መነጸር",
//     logo: "/images/shop-icon.png",
//     softwareBrothers: false,
//   },
//     resources: [
//     {
//       resource: Product,
//       options: {
//         parent: {
//           name: "Admin Content",
//           icon: "InventoryManagement",
//         },
//         properties: {
//           uploadImage: {
//             components: {
//               Edit: AdminBro.bundle(
//               '../components/upload-image.edit.tsx'
//               ),
//             },
//           },
          

//           description: {
//             type: "richtext",
//             isVisible: { list: false, filter: true, show: true, edit: true },
//           },
//           _id: {
//             isVisible: { list: false, filter: true, show: true, edit: false },
//           },
//           title: {
//             isTitle: true,
//           },
//           price: {
//             type: "number",
//           },
       
		  
          
		  
		  
//         },
//       },
//     },
//     {
//       resource: admin_user,
//       options: {
//         parent: {
//           name: "User Content",
//           icon: "User",
//         },
//         properties: {
//           _id: {
//             isVisible: { list: false, filter: true, show: true, edit: false },
//           },
//           username: {
//             isTitle: true,
//           },
//         },
//       },
//     },
//     {
//       resource: Order,
//       options: {
//         parent: {
//           name: "User Content",
//           icon: "User",
//         },
//         properties: {
//           user: {
//             isTitle: true,
//           },
//           _id: {
//             isVisible: { list: false, filter: true, show: true, edit: false },
//           },
//           paymentId: {
//             isVisible: { list: false, filter: true, show: true, edit: false },
//           },
//           address: {
//             isVisible: { list: false, filter: true, show: true, edit: false },
//           },
//           createdAt: {
//             isVisible: { list: true, filter: true, show: true, edit: false },
//           },
//           cart: {
//             isVisible: { list: false, filter: false, show: true, edit: false },
//             components: {
//               show: AdminBro.bundle("../components/admin-order-component.jsx"),
//             },
//           },
//           "cart.items": {
//             isVisible: {
//               list: false,
//               filter: false,
//               show: false,
//               edit: false,
//             },
//           },
//           "cart.totalQty": {
//             isVisible: {
//               list: false,
//               filter: false,
//               show: false,
//               edit: false,
//             },
//           },
//           "cart.totalCost": {
//             isVisible: {
//               list: false,
//               filter: false,
//               show: false,
//               edit: false,
//             },
//           },
//         },
//       },
//     },
//     {
//       resource: Category,
//       options: {
//         parent: {
//           name: "Admin Content",
//           icon: "User",
//         },
//         properties: {
//           _id: {
//             isVisible: { list: false, filter: true, show: true, edit: false },
//           },
//           slug: {
//             isVisible: { list: false, filter: false, show: false, edit: false },
//           },
//           title: {
//             isTitle: true,
//           },
//         },
//       },
//     },
//   ],
 
//   locale: {
//     translations: {
//       labels: {
//         loginWelcome: "Admin Panel Login",
		
//       },
//       messages: {
//         loginWelcome:
//           "Please enter your credentials to log in and manage your website contents",
//       },
//     },
//   },
//    dashboard: {
//     component: AdminBro.bundle("../components/admin-dashboard-component.jsx"),
//   },
	  
// })



// const ADMIN = {
//     email: process.env.ADMIN_EMAIL || 'mulerselinger@gmail.com',
//     password: process.env.ADMIN_PASSWORD || 'Mulugeta12@'
// }


// const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
//     cookieName: process.env.ADMIN_COOKIE_NAME || 'admin-bro',
//     cookiePassword: process.env.ADMIN_COOKIE_PASS || 'secrete',
//     authenticate: async (email, password) => {
//         if (email === ADMIN.email && password === ADMIN.password){
//             return ADMIN
//         }
//         return null;
//     },},null,
//  {
//     resave: false,
//  saveUninitialized: true
// })
// module.exports = router
