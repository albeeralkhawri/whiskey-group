$(document).ready(function () {
  function uuidv4() {
  }
  GetLocation();

});

let apiToken = JSON.stringify({
});

function GetLocation() {
$.ajax({
  data: apiToken,
  dataType: "json",
})
  .done(function (data) {
    if (data.message) {
      //Calling to IP-API
      if ($("#country").val() == "") {
        $.getJSON("https://ipapi.co/json/", function (data) {
          // Formlanguage = data.country.toLowerCase();

          $.each(options, (index, value) => {
            if ($(value).attr("data-country") == data.country) {
              // set as selected
              $(value).prop("selected", true);
              // add to prefix field
              $("#phoneprefix").val("+" + $(value).attr("value"));
            }
          });
          watchOptions();
        });
        $(".gifContainer").css("display", "none");
      } else {
        let countrycodeval = $("#country").val();
        $("#phoneprefix").val("+" + countrycodeval);
        watchOptions();
        $(".gifContainer").css("display", "none");
      }
      startValidation();
    } else {
      //store result from fxoro service IP
      currentip = data.ipAddress;
      currentcountryname = data.name;
      currentcountrycode = data.isoCode;
      // Formlanguage  = data.IsoCode.toLowerCase();
      mycountrycode = currentcountrycode;
      mycountryname = currentcountryname;
      ipcountry = data.name;

      // console.log(Formlanguage);

      // set option as selected
      if ($("#country").val() == "") {
        let options = $("#country option");

        $.each(options, (index, value) => {
          if ($(value).attr("data-country") == currentcountrycode) {
            // set as selected
            $(value).prop("selected", true);
            // add to prefix field
            $("#phoneprefix").val("+" + $(value).attr("value"));
          }
        });
        watchOptions();
        $(".gifContainer").css("display", "none");
      } 
      startValidation();
    }
    $(".country_flag").attr( "src", "https://flagcdn.com/16x12/"+ data.isoCode.toLowerCase() +".png");
  })
  .fail(function (errMsg) {
    console.log(errMsg);
    //Calling to IP-API
    if ($("#country").val() == "") {
      $.getJSON("https://ipapi.co/json/", function (data) {
        let options = $("#country option");

        // Formlanguage = data.country.toLowerCase();

        $.each(options, (index, value) => {
          if ($(value).attr("data-country") == data.country) {
            // set as selected
            $(value).prop("selected", true);
            // add to prefix field
            $("#phoneprefix").val("+" + $(value).attr("value"));
          }
        });
        $(".country_flag").attr( "src", "https://flagcdn.com/16x12/"+ data.country.toLowerCase() +".png");
       
       
      });
    } else {
      countrycodeval = $("#country").val();
      $("#phoneprefix").val("+" + countrycodeval);
     
      startValidation();
      $(".gifContainer").css("display", "none");
    }
  });
}