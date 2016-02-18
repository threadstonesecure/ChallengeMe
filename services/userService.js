var userModel=require("../models/userModel");
var catModel     = require("../models/catModel"); 
var counterModel     = require("../models/counterModel"); 

var userService =function(){

return{

createOrSaveUser : function(userDetails,categories, callback){
	
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
                     callback(null,updatedUser);
                 });
        	};
        	 
        }else{
        	counterModel.findByIdAndUpdate({_id : "userId"}, {$inc: {seq: 1} }, function(error, counter)   {
  		       if(error)
  		            callback(error);
  		       
  		      user = new userModel({"_id":counter.seq ,"username": userDetails.username,"name": userDetails.name,"emailId":userDetails.emailId ,"title":userDetails.title,"phone":userDetails.phone,"businessUnit":userDetails.businessUnit,"adminIndicator":userDetails.adminIndicator});
  		      user.save(function(err){
                if(err)
                	callback(err);
                
                var query = userModel.findOne({"emailId":userDetails.emailId});
                query.exec(function(err, newUser){
                    if(err)
                    	callback(err);
                    callback(null,newUser);
                });
              });
        	});
        }
         //callback(null,users);
    });
    
},
updateUser:function(userDetails){
	 var conditions = { "_id":userDetails._id }; 
	 var update = { $set: {"empId": userDetails.empId,"workPhone": userDetails.workPhone,"location":userDetails.location,"categories":userDetails.categories}};
	 userModel.update(conditions, update, callback1);
	function callback1 (err, numAffected) {
		console.log(numAffected + "rows updates");
	};
}



};
};


module.exports=userService();