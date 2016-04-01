var express = require('express');
var app = express();
var router = express.Router();
var dashboardService=require("../services/dashboardService");
//var util = require('util');
var _ = require('underscore');


var checkSession=require("../services/checkSessionService");

	router.get('/byIntrest',checkSession.requireLogin,function(req,res,err){
		dashboardService.getChallengesByIntrest(function(err,data){
			if(err){
				console.log("Err",err);
				res.send(err);
			}
			else{
			var keys = _.pluck(data,'_id');
			var count = _.pluck(data,'count');
			var body = [];
			body.push(keys);
			body.push(count);
			res.send(body);
			}
		});
		
			});
	
	router.get('/lastsixmonths',checkSession.requireLogin,function(req,res,err){
		dashboardService.getLastSixMonths(function(err,data){
			if(err){
				console.log("Err",err);
				res.send(err);
			}
			else{
				var monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun",
				                   "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
			var id = _.pluck(data,"_id").reverse().slice(0,6);
			var count =_.pluck(data,'count').reverse().slice(0,6);
			var dates = [];
			var body=[];
			for(var i=0;i<id.length;i++)
			{
				var month = monthNames[(id[i].month)-1];
				dates.push((month+'-'+id[i].year));
			}
			body.push(dates);
			body.push(count);
			res.send(body);
			}
		});
		
	});
	
	router.get('/stats',checkSession.requireLogin,function(req,res,err){
		dashboardService.getStats(function(err,data){
			if(err){
				console.log("Err",err);
				res.send(err);
			}
			else{
			res.send(data);
			}
		});
		
			});
	
	

module.exports = router;