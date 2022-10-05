var express    = require('express');
var router     = new express.Router();
var Car        = require('../models/car.js')
var middleware = require("../middleware")




//CAMPGROUND PAGE REQUEST
  router.get("/cars",function(req,res){
  // Get all campgrounds from DB
    Car.find({},function(err,dbcars){
      if(err){
        console.log(err);
      }else{
        res.render("cars/index.ejs" ,{cars: dbcars,currentUser: req.user});   //In {thevariableinejs: thedatawearepassing}
      }
    });
  });
  
  
  router.get("/cars/new",middleware.isLoggedIn,function(req,res){
  
    res.render("cars/newform.ejs")
  });
  
  router.post("/cars",middleware.isLoggedIn,function(req,res){
    //get data from form and add to array
      var name = req.body.name;
      var image = req.body.image;
      var description = req.body.description;
      var author = {

        id: req.user._id,
        username: req.user.username
      };
      var newCar = {name: name,image: image,description:description , author: author}
     Car.create(newCar , function(err,newlyCreated){
       if(err){
         console.log(err);
       }else{
         //redirect to campground page
           res.redirect("/cars");
       }
     });
    
    });
  
  
  
  //Shows more info about one Campground with ID
  router.get("/cars/:id",function(req,res){
    // Find Campground with provided ID
    Car.findById(req.params.id).populate('comments').exec(function(err, foundCar){
      if(err){
        console.log(err);
      }else{
  
        res.render("cars/show.ejs" , {cars: foundCar});
      }
    });
  });


  


//   //EDIT CAMPGROUND ROUTES
// router.get("/cars/:id/edit",middleware.CheckcarOwner,function(req,res){
//   Car.findById(req.params.id,function(err,foundCar){
//     if(err){
//       console.log(err);
//       res.redirect('back');
//     }else{
//       res.render("cars/edit.ejs",{cars: foundCar});
//     }
//   });
// });


// //Update Campground
// router.put("/cars/:id",middleware.CheckcarOwner,function(req,res){
//   var name = req.body.name;
//   var image = req.body.image;
//   var description = req.body.description;
//   var updatedCar = {name: name,image: image,description:description};
//   Car.findByIdAndUpdate(req.params.id,updatedCar,function(err,updatedCar){
//     if(err){
//       res.redirect('/cars');
//     }else{
//       res.redirect('/cars/'+req.params.id);
//     }
//   });
// });


// //DELETE CAMPGROUND
// router.delete('/cars/:id',middleware.CheckcarOwner,function(req,res){
//   //Destroy Campground
//   Car.findByIdAndRemove(req.params.id,function(err){
//     if(err){
//       res.redirect('/cars');
//     }else{
//       req.flash('success','Car Deleted !');
//       res.redirect("/cars");
   
//     }
//   });
// });

module.exports = router;