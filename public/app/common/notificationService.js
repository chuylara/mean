angular.module('app').value('myToastr', toastr);

angular.module('app').factory('notificationService', function(myToastr) {
   return {
       notify: function(msg) {
           myToastr.success(msg);
           console.log(msg);
       }
   }
});