app.controller("tableManagersCtrl",['$scope','RQ',function($scope,RQ){

    $scope.pageNo=1;
    $scope.pageSize=10;
    $scope.totalPage=1;
    $scope.totalCount=0;
    $scope.pageNs=[];
    var getNum=0;

    var cover=function(){
        $scope.main.complete=false;
        getNum++;
    }

    var uncover=function(){
        getNum--;
        if (getNum==0) {
            $scope.main.complete=true;
        };
    }

    $scope.del=function(manager,index){
        if (confirm("将要删除‘"+manager.username+"’！请确认，删除后将无法恢复！")) {
            $scope.main.complete=false;
            RQ.get(RQ.host + 'manager/man-del', {
                id:manager.id
            }, function(res) {
                res=res.msg;
                if (res.code == 0) {
                    $scope.init();
                } else {
                    alert(res.info);
                }
                $scope.main.complete=true;
            });
        }
    }

    $scope.init=function(){
        cover();
        RQ.get(RQ.host+"manager/man-list",{
            pageNo:$scope.pageNo,
            pageSize:$scope.pageSize,
            username:$scope.SPusername,
            nickname:$scope.SPnickname
        },function(res){
            res=res.msg;
            if (res.code==0) {
                $scope.managers=res.data.managers;
                $scope.totalPage = parseInt((res.data.totalCount - 1) / $scope.pageSize) + 1;
                $scope.totalCount=res.data.totalCount;
                $scope.pageNinit();
            }else{
                alert(res.info);
            }
            uncover();
        });
    }

    $scope.pageNinit=function(){
        $scope.pageNs=[];
        if ($scope.totalPage<=9) {
            for (var i = $scope.totalPage - 1; i >= 0; i--) {
                $scope.pageNs[i]=i+1;
            };
        }else if ($scope.pageNo<=5) {
            for (var i = 8; i >= 0; i--) {
                $scope.pageNs[i]=i+1;
            };
        }else if ($scope.totalPage-$scope.pageNo<=4) {
            for (var i = 8; i >= 0; i--) {
                $scope.pageNs[i]=$scope.totalPage-8+i;
            };
        } else{
            for (var i = 8; i >= 4; i--) {
                $scope.pageNs[i]=$scope.pageNo+i-4;
            };
            for (var i = 3; i >= 0; i--) {
                $scope.pageNs[i]=$scope.pageNo-(4-i);
            };
        }
    }    

    $scope.change = function(type) {
        if (type == 1) {
            if ($scope.pageNo > 1) {
                $scope.pageNo = $scope.pageNo - 1;
                $scope.init();
            }
        } else if (type == 2) {
            if ($scope.pageNo < $scope.totalPage) {
                $scope.pageNo = $scope.pageNo + 1;
                $scope.init();
            }
        }
    }

    $scope.goto=function(pageN){
        if ($scope.pageNo!=pageN) {
            $scope.pageNo=pageN;
            $scope.init();
        };
    }

    $scope.sizeChange=function(){
        $scope.pageNo=1;
        $scope.init();
    }

    $scope.search=function(){
        $scope.pageNo=1;
        $scope.init();
    }


}]);