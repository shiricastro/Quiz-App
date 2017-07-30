var myApp = angular.module('quiz',['ui.router']);
 
myApp.config(function($stateProvider){  
   var questionNo1={
        name:'default',
        url:'',
        component:'question',
        resolve: {
            num: function(){
                return  "0";
            }         
        }   
   };
   var questionNo2={
        name:'questionNo2',
        url:'/questionNo2',
        component:'question',
        resolve: {
            num: function(){
                return  "1";
            }         
        }
   };
   var questionNo3={
       name:'questionNo3',
       url:'/questionNo3',
       component:'question',
        resolve: {
            num: function(){
                return  "2";
            }         
        }
   };
   var questionNo4={
       name:'questionNo4',
       url:'/questionNo4',
       component:'question',
        resolve: {
            num: function(){
                return  "3";
            }         
        }       
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
                <h3>{{item.data[item.num].question}}</h3>
                <ul>
                    <li ng-repeat="answer in item.data[item.num].options" ng-click="item.answer(answer)">{{answer}}</li>
                </ul>
                <a href="#!/{{item.data[item.num].text}}" ui-sref-active="active">{{item.data[item.num].text}}</a>
              </div>`,
bindings:{num:"="},
    controller:function(QuestionsService,AnswersService){
        QuestionsService().then(function(data){
          this.data= data;
        }.bind(this));                
        this.answer = function(answer){
            var good =this.data[this.num].answer;
            AnswersService.check(good,answer);
            AnswersService.setAnswer(answer);
            console.log(AnswersService.get()); 
        };
    },
    controllerAs:'item'

});

myApp.component('finish',{
    template:`<h3>Quiz is over</h3>
    <div>You answered {{sumerry.correct}}  correct answers and {{sumerry.wrong}} wrong answers</div>
            <a class="again" ui-sref="default" ui-sref-active="active">Play again</a>`,
    controller:function(AnswersService){
        this.correct = AnswersService.getCorrectAnswersNum();
        this.wrong = AnswersService.getWrongAnswersNum();
        AnswersService.clean();        
    },
    controllerAs:'sumerry'
});

myApp.service('QuestionsService', function($http) {
    return function(){
      return $http.get("qustions.json")
        .then(function(response) {
            return response.data;
        });
    }; 
});

myApp.service('AnswersService', function() {
    var answers=[];
    var CorrectAnswersNum=0;
    var WrongAnswersNum=0;
    return {
        check:function(CorrectAnswers,ans){
            if(CorrectAnswers === ans){
                CorrectAnswersNum ++;
            }else{
                WrongAnswersNum ++;
            }            
        },
        getCorrectAnswersNum:function () {return CorrectAnswersNum;},
        getWrongAnswersNum:function () {return WrongAnswersNum;},
        clean:function(){
            answers =[];
            CorrectAnswersNum=0;
            WrongAnswersNum=0;
        },
        setAnswer: function (ans) {
            answers.push(ans);
        },
        get: function () {return answers;}
    };
    
});
