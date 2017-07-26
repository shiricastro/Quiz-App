var myApp = angular.module('quiz',['ui.router']);
myApp.controller('quizCtrl',quizCtrlFun);

function quizCtrlFun(QuestionsService){
    this.dataB = QuestionsService;
    console.log(QuestionsService);
}

myApp.config(function($stateProvider){    
   var questionNo1={
        name:'default',
        url:'',
        component:'question'
   };
   var questionNo2={
       name:'questionNo2',
       url:'/questionNo2',
       component:'question'

   };
   var questionNo3={
       name:'questionNo3',
       url:'/questionNo3',
       component:'question'

   };
   var questionNo4={
       name:'questionNo4',
       url:'/questionNo4',
       component:'question' 

   };
   var finish={
       name:'finish',
       url:'/finish',
       component:'finish'        
   };
   $stateProvider.state(questionNo1);
   $stateProvider.state(questionNo2);
   $stateProvider.state(questionNo3);
   $stateProvider.state(questionNo4);
   $stateProvider.state(finish);   
});

myApp.component('question',{
    template:`<div class="container">
                <h3>{{item.data.quesrion}}</h3>
                <ul>
                    <li ng-repeat="answer in item.data.options" ng-click="item.answer(answer)">{{answer}}</li>
                </ul>
                <a ui-sref="{{item.data.text}}" ui-sref-active="active">{{item.data.text}}</a>
              </div>`,
    bindings: { data: '<' },
    controller:function(){
        this.answers=[];
                
        this.answer = function(answer){
            console.log(answer);
           this.answers.push(answer);
           console.log(this.answers);
           
 
        };
        console.log(this.answers);
    },
    controllerAs:'item'

});

myApp.component('finish',{
    template:`<h3>Quiz is over</h3>
<a class="again" ui-sref="default" ui-sref-active="active">Play again</a>`,
    controller:function(){}
});

myApp.service('QuestionsService', function($http) {
  

	 return $http({
	 	url: 'qustions.json' 
	 }).then(function (response) {
	 	if (response.status != 200) {
			throw new Error('Check it pls!');
	 	}
	 	return response.data;
	});
  
});
