$( function() {
    var formatted_date = "";
    $("#beforeDate").datepicker();
    $("#afterDate").datepicker();
    
    $("#addrange").on("click", function(){
        var before_date = $("#beforeDate").datepicker("getDate"); //to store it in a variable.
        var after_date = $("#afterDate").datepicker("getDate"); //to store it in a variable.
        if (before_date != null && after_date != null){
            formatted_date = "(after:" + after_date.getFullYear() + "-" + (after_date.getMonth()+1) + "-" + after_date.getDate() + " before:"+ before_date.getFullYear() + "-" + (before_date.getMonth()+1) + "-" + before_date.getDate() + ")";
            document.getElementById("savedDate").innerHTML += "<p>" + formatted_date + "</p>";
            $('#beforeDate').datepicker('setDate', null);
            $('#afterDate').datepicker('setDate', null);
        }else{
            alert("input box is empty");
        }
        
    });

    $("#copybutton").on("click", function(){
        var copy_date = "";
        var pp = document.getElementsByTagName("p");
        for(var i = 0; i < pp.length; i++){
            if(i == 0){
                copy_date = pp[i].innerHTML;
            }
            else{
                copy_date = copy_date + " OR " + pp[i].innerHTML;
            }
        }
        if(copy_date == ""){
            alert("nothing to copy, add time range.");
        }
        copyTextToClipboard(copy_date);
    });
    
} );

function copyTextToClipboard(text) {
    //Create a textbox field where we can insert text to. 
    var copyFrom = document.createElement("textarea");
  
    //Set the text content to be the text you wished to copy.
    copyFrom.textContent = text;
  
    //Append the textbox field into the body as a child. 
    //"execCommand()" only works when there exists selected text, and the text is inside 
    //document.body (meaning the text is part of a valid rendered HTML element).
    document.body.appendChild(copyFrom);
  
    //Select all the text!
    copyFrom.select();
  
    //Execute command
    document.execCommand('copy');
  
    //(Optional) De-select the text using blur(). 
    copyFrom.blur();
  
    //Remove the textbox field from the document.body, so no other JavaScript nor 
    //other elements can get access to this.
    document.body.removeChild(copyFrom);
  }




  