$( function() {
    $("#beforeDate").datepicker();
    $("#afterDate").datepicker();
    $("#button").on("click", function(){
        var before_date = $("#beforeDate").datepicker("getDate"); //to store it in a variable.
        var after_date = $("#afterDate").datepicker("getDate"); //to store it in a variable.
        console.log(before_date.getDate());
        console.log(before_date.getMonth() + 1);
        console.log(before_date.getFullYear());
        console.log(after_date);
    });
    
} );




  