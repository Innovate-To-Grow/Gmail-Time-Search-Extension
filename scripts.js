$( function() {
    var formatted_date = "";
    flatpickr(".beforeDate");
    flatpickr(".afterDate");
    
    $("#addrange").on("click", function(){
        var before_date_text = document.getElementsByClassName("beforeDate")[0].value; //YYYY-MM-DD.
        var after_date_text = document.getElementsByClassName("afterDate")[0].value; //YYYY-MM-DD.
        
        if (before_date_text != "" && after_date_text  != ""){
            formatted_date = "(after:" + after_date_text + " before:"+ before_date_text + ")";
            document.getElementById("savedDate").innerHTML += "<p>" + formatted_date + "</p>";
            document.getElementsByClassName("beforeDate")[0].value = "";
            document.getElementsByClassName("afterDate")[0].value = "";
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

    $("#resetbutton").on("click", function(){
        $( "p" ).remove();
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




  