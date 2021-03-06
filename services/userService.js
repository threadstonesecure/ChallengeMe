var userModel=require("../models/userModel");
var catModel     = require("../models/catModel"); 
var counterModel     = require("../models/counterModel"); 
var locationModel = require("../models/locationModel");
var categoryService=require("../services/categoryService");
var nconf = require('nconf');

var userService =function(){

return{

createOrSaveUser : function(userDetails,categories, callback){
	 var path = nconf.get("profile").profilePath;
    var query = userModel.findOne({"emailId":userDetails.emailId});
    query.exec(function(err, users){
        if(err)
           callback(err);
        
        var user ;
        if(users!==null){
        	 var conditions = { "_id":users._id }; 
        	 var update = { $set: {"username": userDetails.username,"name": userDetails.name,"emailId":userDetails.emailId ,"title":userDetails.title,"phone":userDetails.phone,"businessUnit":userDetails.businessUnit,"adminIndicator":userDetails.adminIndicator}};
        	 userModel.update(conditions, update, callback1);
        	function callback1 (err, numAffected) {
        	
        		console.log(numAffected + "rows updates");
        		 var query = userModel.findOne({"emailId":userDetails.emailId});
                 query.exec(function(err, updatedUser){
                     if(err)
                     	callback(err);
                     	updatedUser.imagePath = path+updatedUser.emailId+".jpg";
                     callback(null,updatedUser);
                 });
        	};
        	 
        }else{
        	counterModel.findByIdAndUpdate({_id : "userId"}, {$inc: {seq: 1} }, function(error, counter)   {
  		       if(error)
  		            callback(error);
  		     categoryService.getCategories(function(err,categories){
  		    	 
  		    	 if(err)
                 	callback(err);
  		    	 user = new userModel({"_id":counter.seq ,"username": userDetails.username,"name": userDetails.name,"emailId":userDetails.emailId ,"title":userDetails.title,"phone":userDetails.phone,"businessUnit":userDetails.businessUnit,"adminIndicator":userDetails.adminIndicator,"location":userDetails.location,"empId": userDetails.empId,"categories":categories,"title":userDetails.title,"phone":userDetails.phone,"businessUnit":userDetails.businessUnit});
  	  		      user.save(function(err){
  	                if(err)
  	                	callback(err);
  	                
  	                var query = userModel.findOne({"emailId":userDetails.emailId});
  	                query.exec(function(err, newUser){
  	                    if(err)
  	                    	callback(err);
  	                    	newUser.imagePath = path+newUser.emailId+".jpg";
  	                    callback(null,newUser);
  	                });
  	              });
  		    	 
  		     });
  		     
        	});
        }
    });
    
},
updateUser:function(userDetails,callBackForUserUpdate){
	 var conditions = { "emailId":userDetails.emailId }; 
	 var update = { $set: {"empId": userDetails.empId,"workPhone": userDetails.workPhone,"categories":userDetails.categories}};
	 userModel.update(conditions, update, callback1);
	function callback1 (err, numAffected) {
		if(err)
			callBackForUserUpdate("error");
		
		var query = userModel.findOne({"emailId":userDetails.emailId});
        query.exec(function(err, updatedUser){
            if(err)
            	callback("error");
            callBackForUserUpdate(err,updatedUser)
        });
		console.log(numAffected.n + "rows updates");
	};
}


};
};


module.exports=userService();
