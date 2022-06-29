// Get the modal
var modal = document.getElementById("disclaimerModal");

// Get the button that opens the modal
var btn = document.getElementById("disclaimer");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// Whisky Quotes
var whisky_quote = [];
whisky_quote[0] =
  "There is no bad whiskey. There are only some whiskeys that aren’t as good as others.";
whisky_quote[1] = "Too much of anything is bad, but too much good whiskey is barely enough.";
whisky_quote[2] =
  "The water was not fit to drink. To make it palatable, we had to add whisky. By diligent effort, I learned to like it.";
whisky_quote[3] =
  "I’m on a whisky diet. I’ve lost three days already";
whisky_quote[4] =
  "His last words were, “I should never have switched from Scotch to Martinis.";
whisky_quote[5] =
  "Happiness is having a rare steak, a bottle of whisky, and a dog to eat the rare steak.";
whisky_quote[6] =
  "I’m a simple man. All I want is enough sleep for two normal men, enough whiskey for three, and enough women for four.";
whisky_quote[7] =
  "Tell me what brand of whiskey that Grant drinks. I would like to send a barrel of it to my other generals.";
whisky_quote[8] =
  "Ninety percent I’ll spend on good times, women, and Irish Whiskey. The other ten percent I’ll probably waste.";
whisky_quote[9] =
  "A good gulp of hot whiskey at bedtime—it’s not very scientific, but it helps.";
whisky_quote[10] =
  "“I like my whisky old and my women young.";
whisky_quote[11] =
  "Love makes the world go round? Not at all. Whiskey makes it go round twice as fast.";
whisky_quote[12] =
  "Americans are big boys. You can talk them into almost anything. Just sit with them for half an hour over a bottle of whiskey and be a nice guy."

var cq = 0;

var whisky_q = document.getElementById("whisky_quotes");
setInterval(function() {
  $("#whisky_quotes").fadeOut("slow", function() {
    whisky_q.innerHTML = whisky_quote[cq];
    cq++;
    if (cq == whisky_quote.length) {
      cq = 0;
    }
    $("#whisky_quotes").fadeIn("slow");
  });
}, 9999);


// Filter Menu

function openMenu() {
  document.getElementById("navbar").style.width = "100%";
}
function exitMenu() {
  document.getElementById("navbar").style.width = "0%";
}


// Pagepiling

$(document).ready(function() {
  $("#pagepiling").pagepiling({
    menu: null,
    direction: "horizontal",
    verticalCentered: true,
    sectionsColor: [ '#3b1817', '#3b1817','#3b1817' ,'#3b1817','#3b1817','#3b1817'],
    anchors: ["welcome_section", "introduction_section", "piecharts_section", "barchart_section", "datatable_section","thank_you_section"],
    scrollingSpeed: 700,
    easing: "swing",
    loopBottom: false,
    loopTop: false,
    css3: true,
    navigation: {
      textColor: "#f17e19",
      bulletsColor: "#f17e19",
      position: "",
      tooltips: []
    },
    normalScrollElements: null,
    normalScrollElementTouchThreshold: 5,
    keyboardScrolling: true,
    sectionSelector: ".section",
    animateAnchor: false,
    
  });
});


//Media Queries

checkSize();
window.addEventListener('resize', checkSize);

function checkSize(){if(document.documentElement.clientWidth < 991) {
  $('#introduction_section').addClass('pp-scrollable');
  $('#piecharts_section').addClass('pp-scrollable');
  $('#thank_you_section').addClass('pp-scrollable');
  $('#btn-sm-view').addClass('mb-3');
}
}

// input from the search text widget not matching data available 

function noDataMatch() {
  if ($(".dc-table-column").length == 0) {
    $("#no_data_found, #no_data_found_too")
      .html(
        "<alert class='mx-5 alert-warning'>No luck! We didn't find anything. Try something else. </alert>"
      )
      .show()
      .fadeOut(2000);
  } else {
    $("#no_data_found, #no_data_found_too").hide();
  }
}