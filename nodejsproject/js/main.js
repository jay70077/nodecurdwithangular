var app = angular.module('myapp', []);
app.controller('mycntr', function($scope, $http) {
    $scope.firstname = "jaydeep";
    $scope.lastname = "vishwakarma";
    $scope.phoneNumbr = /^\+?\d{2}[- ]?\d{3}[- ]?\d{5}$/;

    $scope.fullname = function() {
        return $scope.firstname + ' ' + $scope.lastname
    };
    $scope.submit = function($scope) {
        $scope.submitted = true;

    };
    $scope.admindata = ['aaa', 'bsss', 'cxxss'];
    $scope.booksdata = [{
        bookname: "bookname",
        description: "description",

    }, ];

    $http({
        method: "GET",
        url: "http://localhost:8081/readdata"

    }).success(function(resultdata) {

        $scope.booksdata = resultdata;
    })

    function getbookdata(objectid) {
        for (var i = 0; i < $scope.booksdata.length; i++)
            if ($scope.booksdata[i].id == objectid) {
                return i;
                return -1;
            }
    }

    $scope.delete = function(objectid) {
        //alert("deleted");
        var result = confirm("are you sure want to delete the data");
        if (result == true) {

            $http({
                method: "DELETE",
                url: "http://localhost:8081/readdata/" + objectid._id

            }).success(function(datatest) {
                var index = getbookdata(objectid);
                $scope.booksdata.splice(index, 1);
                $scope.datadeleted = "data deleted sucessfully";
            });

        }




    };


    $scope.update = function(objectid) {


        $http({
            method: "GET",
            url: "http://localhost:8081/readdata/" + objectid._id


        }).success(function(alldata) {
            console.log(alldata);
            var indexnew = getbookdata(objectid);
            var productbook = $scope.booksdata[indexnew];
            console.log(indexnew);
            // $scope.bookname1 = productbook.bookname;
            // $scope.description1 = productbook.description;
        })
        
    };
});


  

