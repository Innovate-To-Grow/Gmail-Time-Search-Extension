$(function() {
    var formatted_date = "";
    var formatted_from = "";
    var formatted_to = "";
    var formatted_cc = "";
    var formatted_subject = "";
    var formatted_label = "";
    var formatted_attachment = "";
    var formatted_utc_time = ""; // New variable for UTC time filter
  
    flatpickr(".beforeDate");
    flatpickr(".afterDate");
  
    $("#addrange").on("click", function() {
      var before_date_text = document.getElementsByClassName("beforeDate")[0].value; //YYYY-MM-DD.
      var after_date_text = document.getElementsByClassName("afterDate")[0].value; //YYYY-MM-DD.
      var from = document.getElementsByClassName("from")[0].value; //email@gmail.com
      var to = document.getElementsByClassName("to")[0].value; //email@gmail.com
      var cc = document.getElementsByClassName("ccinput")[0].value; //email@gmail.com
      var subject = document.getElementsByClassName("subinput")[0].value; //Subject
      var label = document.getElementsByClassName("labinput")[0].value; //Label
      var attachment = document.getElementById("attachment").value; //true or false
      var utc_hours = document.getElementById("utc_hours").value; //UTC hours input
      var utc_minutes = document.getElementById("utc_minutes").value; //UTC minutes input
  
      var str1 = "(";
      var str2 = ")";
  
      if (before_date_text != "" && after_date_text == "") {
        formatted_date = "before:" + before_date_text;
        document.getElementsByClassName("beforeDate")[0].value = "";
        document.getElementsByClassName("afterDate")[0].value = "";
      } else if (before_date_text == "" && after_date_text != "") {
        formatted_date = "after:" + after_date_text;
        document.getElementsByClassName("beforeDate")[0].value = "";
        document.getElementsByClassName("afterDate")[0].value = "";
      } else if (before_date_text != "" && after_date_text != "") {
        formatted_date = "after:" + after_date_text + " before:" + before_date_text;
        document.getElementsByClassName("beforeDate")[0].value = "";
        document.getElementsByClassName("afterDate")[0].value = "";
      }
  
      if (from != "") {
        formatted_from = "from:" + from;
        document.getElementsByClassName("from")[0].value = "";
      }
      if (to != "") {
        formatted_to = "to:" + to;
        document.getElementsByClassName("to")[0].value = "";
      }
      if (cc != "") {
        formatted_cc = "cc:" + cc;
        console.log(document.getElementById("cc").checked);
        document.getElementById("cc").checked = false;
        document.getElementsByClassName("ccinput")[0].value = "";
        $('input[name="ccinput"]').hide();
      }
      if (subject != "") {
        formatted_subject = "subject:" + subject;
        document.getElementById("subject").checked = false;
        document.getElementsByClassName("subinput")[0].value = "";
        $('input[name="subinput"]').hide();
      }
      if (label != "") {
        formatted_label = "label:" + label;
        document.getElementById("label").checked = false;
        document.getElementsByClassName("labinput")[0].value = "";
        $('input[name="labinput"]').hide();
      }
      if (attachment == "true") {
        formatted_attachment = "has:attachment";
        document.getElementById("attachment").checked = false;
        document.getElementById("attachment").value = "false";
      }
  
      if (utc_hours != "" && utc_minutes != "") {
        formatted_utc_time = "after:" + before_date_text + " " + utc_hours + ":" + utc_minutes + " " + "before:" + before_date_text;
        document.getElementById("utc_hours").value = "";
        document.getElementById("utc_minutes").value = "";
      }
  
      if (
        formatted_date != "" ||
        formatted_from != "" ||
        formatted_to != "" ||
        formatted_cc != "" ||
        formatted_subject != "" ||
        formatted_label != "" ||
        formatted_attachment != "" ||
        formatted_utc_time != ""
      ) {
        var final_format =
          str1 +
          formatted_date +
          " " +
          formatted_from +
          " " +
          formatted_to +
          " " +
          formatted_cc +
          " " +
          formatted_subject +
          " " +
          formatted_label +
          " " +
          formatted_attachment +
          " " +
          formatted_utc_time +
          str2;
        document.getElementById("savedDate").innerHTML += "<p>" + final_format + "</p>";
        formatted_date = "";
        formatted_from = "";
        formatted_to = "";
        formatted_cc = "";
        formatted_subject = "";
        formatted_label = "";
        formatted_attachment = "";
        formatted_utc_time = "";
        checkList.classList.remove("visible");
      } else {
        alert("Input is empty.");
      }
    });
  
    $("#copybutton").on("click", function() {
      var copy_date = "";
      var pp = document.getElementsByTagName("p");
      for (var i = 0; i < pp.length; i++) {
        if (i == 0) {
          copy_date = pp[i].innerHTML;
        } else {
          copy_date = copy_date + " OR " + pp[i].innerHTML;
        }
      }
      if (copy_date == "") {
        alert("nothing to copy, add time range.");
      }
      copyTextToClipboard(copy_date);
    });
  
    $("#saveButton").on("click", function() {
      var filterName = prompt("Enter a name for the filter:");
      if (filterName !== null && filterName.trim() !== "") {
        var savedDate = document.getElementById("savedDate").innerHTML;
        localStorage.setItem(filterName, savedDate);
        showNotification("Filter '" + filterName + "' saved successfully.");
      } else {
        showNotification("Please enter a valid filter name.");
      }
    });
  
    $("#loadButton").on("click", function() {
      var filterName = prompt("Enter the name of the filter to load:");
      if (filterName !== null && filterName.trim() !== "") {
        var savedDate = localStorage.getItem(filterName);
        if (savedDate !== null) {
          document.getElementById("savedDate").innerHTML = savedDate;
          showNotification("Filter '" + filterName + "' loaded successfully.");
        } else {
          showNotification("No saved filter found with the name '" + filterName + "'.");
        }
      } else {
        showNotification("Please enter a valid filter name.");
      }
    });
  
    // Function to show notification
    function showNotification(message) {
      alert(message);
    }
  
    var checkList = document.getElementById("list1");
    checkList.getElementsByClassName("anchor")[0].onclick = function(evt) {
      if (checkList.classList.contains("visible")) checkList.classList.remove("visible");
      else checkList.classList.add("visible");
    };
  
    $('input[name="ccinput"]').hide();
    $('input[name="subinput"]').hide();
    $('input[name="labinput"]').hide();
    //show it when the checkbox is clicked
    $('input[name="cc"]').on("click", function() {
      if ($(this).prop("checked")) {
        $('input[name="ccinput"]').fadeIn();
      } else {
        $('input[name="ccinput"]').hide();
      }
    });
    $('input[name="subject"]').on("click", function() {
      if ($(this).prop("checked")) {
        $('input[name="subinput"]').fadeIn();
      } else {
        $('input[name="subinput"]').hide();
      }
    });
    $('input[name="label"]').on("click", function() {
      if ($(this).prop("checked")) {
        $('input[name="labinput"]').fadeIn();
      } else {
        $('input[name="labinput"]').hide();
      }
    });
    $('input[name="attachment"]').on("change", function() {
      if ($(this).is(":checked")) {
        $(this).attr("value", "true");
      } else {
        $(this).attr("value", "false");
      }
    });
  });
  
  function copyTextToClipboard(text) {
    var copyFrom = document.createElement("textarea");
    copyFrom.textContent = text;
    document.body.appendChild(copyFrom);
    copyFrom.select();
    document.execCommand("copy");
    copyFrom.blur();
    document.body.removeChild(copyFrom);
  }
  