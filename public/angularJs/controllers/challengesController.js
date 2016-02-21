angular.module("challengeMeApp").controller("challengesController",["$scope","$http","$state","$rootScope",function($scope,$http,$state,$rootScope){
	

	$scope.challenges=[];
	$rootScope.previousOpenedChallengeIndex=-1;
	$scope.colspan=5;
	$scope.addAttributesToChallenge=function(challenges){
		angular.forEach(challenges,function(challenge,index){
			challenge.collapse=false;
			challenge.index=index;
		});
		$scope.challenges=challenges;
	};
	
	$scope.getMyChallenges=function(){
		$http.get("/challenge/mychallenges/"+$scope.userDetails.emailId).success(function(response){
			$scope.redirectToLoginIfSessionExpires(response);
			$scope.addAttributesToChallenge(response);
			}).error(function(error){
				$scope.errorMessage="Some thing went wrong.";
			});
	};
	
	$scope.getAllChallenges=function(){
		$http.get("/challenge/categories/"+JSON.stringify($scope.userDetails.categories)).success(function(response){
			$scope.redirectToLoginIfSessionExpires(response);
			$scope.addAttributesToChallenge(response);
			}).error(function(error){
				$scope.errorMessage="Some thing went wrong.";
			});
	};
	
	   $scope.getSubcribeChallenges=function(){
			$http.get("/subcribeChallenge").success(function(response){
				$scope.redirectToLoginIfSessionExpires(response);
				$scope.addAttributesToChallenge(response);
				}).error(function(error){
					$scope.errorMessage="Some thing went wrong.";
				});
		};

	if($state.current.name==="main.myChallenges"){
		$scope.getMyChallenges();
	}else if($state.current.name==="main.allChallenges"){
		$scope.getAllChallenges();
	}else if($state.current.name==="main.subcribedChallenges"){
		$scope.getSubcribeChallenges();
	}
	
	$scope.subcribeChallenge=function(challengeObj){
		var data={"challengeId":challengeObj._id};
		$http.post("/subcribeChallenge",data).success(function(response){
		if(response==="subcribed"){
			$state.go("main.subcribedChallenges");
		}else{
			$scope.errorMessage="Some thing went wrong.";
		}
			}).error(function(error){
				$scope.errorMessage="Some thing went wrong.";
			});
	};
	
}]);
