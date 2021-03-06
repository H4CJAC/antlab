var app=angular.module('app',['ngRoute','angularFileUpload']);
app.config(["$routeProvider",function($routeProvider){
	$routeProvider.when("/",{
		template:"<h1>欢迎使用AntLab后台管理系统！</h1>",
		controller:'indexCtrl'
	}).when("/tableActivitys",{
		templateUrl:"tables/activitys.html",
		controller:'tableActivitysCtrl'
	}).when("/formActivity/:id",{
		templateUrl:"forms/activity.html",
		controller:'formActivityCtrl'
	}).when("/tableAnnos",{
		templateUrl:"tables/annos.html",
		controller:'tableAnnosCtrl'
	}).when("/formAnno/:id",{
		templateUrl:"forms/anno.html",
		controller:'formAnnoCtrl'
	}).when("/tablePapers",{
		templateUrl:"tables/papers.html",
		controller:'tablePapersCtrl'
	}).when("/formPaper/:id",{
		templateUrl:"forms/paper.html",
		controller:'formPaperCtrl'
	}).when("/tableResearchs",{
		templateUrl:"tables/researchs.html",
		controller:'tableResearchsCtrl'
	}).when("/formResearch/:id",{
		templateUrl:"forms/research.html",
		controller:'formResearchCtrl'
	}).when("/tableMemtypes",{
		templateUrl:"tables/memtypes.html",
		controller:'tableMemtypesCtrl'
	}).when("/formMemtype/:id",{
		templateUrl:"forms/memtype.html",
		controller:'formMemtypeCtrl'
	}).when("/tableMembers",{
		templateUrl:"tables/members.html",
		controller:'tableMembersCtrl'
	}).when("/formMember/:id",{
		templateUrl:"forms/member.html",
		controller:'formMemberCtrl'
	}).when("/formIntro",{
		templateUrl:"forms/intro.html",
		controller:'formIntroCtrl'
	}).when("/tableManagers",{
		templateUrl:"tables/managers.html",
		controller:'tableManagersCtrl'
	}).when("/formManager/:id",{
		templateUrl:"forms/manager.html",
		controller:'formManagerCtrl'
	}).otherwise({
		template:'404',
		controller:''
	});
}]);
app.filter('to_trusted_url', 
	['$sce', function ($sce) {  
		return function (url) {  
			return $sce.trustAsResourceUrl(url);  
			}  
		}
	]
);