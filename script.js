/*      IFFF funtion that calls it self.
(function(){
    
    let createWorker = function(){
        let workCount = 0;
        let task1 = function(){
            workCount += 1;
            alert("task1" + workCount);
        };
        let task2 = function(){
            workCount += 1;
            alert("task2" + workCount);
        };

        return{
            job1: task1,
            job2: task2
        };
    };

    let worker = createWorker();
    worker.job1();
    worker.job2();

}());
*/
(function(){
    let app = angular.module("githubViewer", []);  

     let MainCtrl = function($sn, gith, $in, $log, $aScroll, $locat){   /* $sn and $scope are the same*/

        let onUserComplete = function (data){
            $sn.user = data;
           gith.getRepos($sn.user).then(onRepos, onError);
        };

        let onRepos = function(data){
            $sn.repos = data;
            $locat.hash("userDetails");
            $aScroll();
        };

        let onError = function(reason){
            $sn.error = "Could not fetch the dtat";
        };

        let decrementCountdown = function(){
            $sn.countdown -= 1;
            if($sn.countdown < 1){
                $sn.search($sn.username);
            }
        };

        let countdownInterval = true;
        let startCountdown = function(){
            $in(decrementCountdown, 1000,  $sn.countdown);
        };
/*
        $h.get("https://api.github.com/users/Sam")
        .then(onUserComplete , onError);
*/
        $sn.search = function(username){
            $log.info("Searching for " + username);  /* Will show me the value of username */
            gith.getUser(username).then(onUserComplete , onError);
            if(countdownInterval = true){
                $in.cancel(countdownInterval);
                $sn.countdown = null;
            }
        };
        $sn.username = "angular";
        $sn.message = "GitHub Viewer";
        $sn.repoSortOrder = "stargazers_count";
        $sn.countdown = 5;
        startCountdown();
     };

    app.controller("MainCtrl", ["$scope", "github", "$interval","$log","$anchorScroll","$location",MainCtrl]);

}());

