app.controller("tableAnnosCtrl",['$scope','RQ',function($scope,RQ){

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

    $scope.top=function(id){
        cover();
        RQ.get(RQ.host + 'anno/man-top', {
            id:id
        }, function(res) {
            uncover();
            res=res.msg;
            if (res.code == 0) {
                $scope.init();
                alert("已置顶。");
            } else {
                alert(res.info);
            }
        });
    }

    $scope.topc=function(id){
        cover();
        RQ.get(RQ.host + 'anno/man-top-c', {
            id:id
        }, function(res) {
            uncover();
            res=res.msg;
            if (res.code == 0) {
                $scope.init();
                alert("已取消置顶。");
            } else {
                alert(res.info);
            }
        });
    }

    $scope.del=function(anno,index){
        if (confirm("将要删除‘"+anno.title+"’！请确认，删除后将无法恢复！")) {
            $scope.main.complete=false;
            RQ.get(RQ.host + 'anno/man-del', {
                id:anno.id
            }, function(res) {
                res=res.msg;
                if (res.code == 0) {
                    RQ.get(RQ.host + 'pic/man-m-del', {
                        oid:anno.id,
                        type:1
                    }, function(res) {
                        res=res.msg;
                        if (res.code == 0) {
                        } else {
                            alert(res.info);
                        }
                        $scope.main.complete=true;
                    });
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
        RQ.get(RQ.host+"anno/man-list",{
            pageNo:$scope.pageNo,
            pageSize:$scope.pageSize,
            title:$scope.SPtitle,
            intro:$scope.SPintro
        },function(res){
            res=res.msg;
            if (res.code==0) {
                $scope.annos=res.data.annos;
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