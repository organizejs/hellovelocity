/* global $*/
/* global mobile */

/* hide mobile only or desktop only */
$(document).ready(function() {
  if (window.mobilecheck()) {
    $(".mobile-only").show();
    $(".desktop-only").hide();
  } else {
    $(".mobile-only").hide();
    $(".desktop-only").show();
  }
});


/* force set load page for 400 milliseconds */
setTimeout( function() {
  $(".loading-overlay").fadeOut();
  window.onbeforeunload = function(){ window.scrollTo(0,0); }
}, 400);


/* Manage Slide Content */
$(document).ready(function() {
  setInterval(function() {
    $(".slide-image-content.active").each(function() {
      var activeImage = $(this);
      if (activeImage.hasClass("fix")) {
        // skipp for debugging purposes  
      } else {
        activeImage.removeClass("active");
        if (activeImage.next(".slide-image-content").length) {
          activeImage.next(".slide-image-content").addClass("active");
        } else {
          activeImage.parent().find(".slide-image-content:first-child").addClass("active");
        }  
      }
    });
  }, 2000);
});

/* Navigation */
$(document).ready(function() {
  var navigationBtn = $(".navigation-btn");
  var nativationOptions;

  if (window.mobilecheck()) {
    navigationOptions = $(".navigation-options.mobile-only");
  } else {
    navigationOptions = $(".navigation-options.desktop-only");
  }
  
  $(".nav-el-menu").click(function() {
    showOptions();
  });
  
  $(".nav-el-close, .nav-el-option").click(function() {
    showMenuBtn();
  });
  
  function showOptions() {
    navigationBtn.animate({
      "right": "-400px"
    }, 200, function() {
      navigationOptions.animate({
        "right": "10px"  
      }, 100);  
    });   
  }
  
  function showMenuBtn() {
    navigationOptions.animate({
      "right": "-400px"
    }, 200, function() {
      navigationBtn.animate({
        "right": "10px"  
      }, 100);  
    });   
  }
  
});

/* Scroll attachment*/
$(document).ready(function() {
  scrollSetup();
    
  // start the page by scrolling 1 pixel. This will kick off all the positioning set above
  $('body, html').animate({
    scrollTop: 1
  }, 1);
  
});
  
function scrollSetup() {
  
  // set the unit of a slide
  var slideHeight = $(window).height();
  
  // set height of page to vh * number of slides
  var numSlides = $(".slide:last").data("position") + 1;
  $("body").height(slideHeight * numSlides);
  
  // initialize scroll index
  var currScrollIndex = Math.floor($(window).scrollTop() / slideHeight);
     
  // activate the data-bg-color and data-color settings on each slide 
  var slide = $('.slide[data-position="'+currScrollIndex+'"]');
  slide.find(".slide-container").css({ "background-color": slide.data("bg-color") });
  slide.css({ "color": slide.data("color") });
  
  if (window.mobilecheck()) {
    if (slide.data("m-bg-color")) {
      slide.find(".slide-container").css({ "background-color": slide.data("m-bg-color") });
    }
    if (slide.data("m-color")) {
      slide.css({ "color": slide.data("m-color") });
    }
  }
  
  $(window).scroll(function() {
    // set scroll position
    var scrollPos = $(window).scrollTop();
    
    // set slide-title for each slide
    $(".title").each(function() {
      var title = $(this);
      var i = title.data("position");
      title.css({
        'margin-top': (i * slideHeight) - scrollPos
      });
    });
    
    // set slide-direction method for each slide
    $(".slide").each(function() {
      var slide = $(this);  
      var i = slide.data("position");
       
      // set background color
      var slideBgColor = slide.data("bg-color");
      if (window.mobilecheck() && slide.data("m-bg-color")) { slideBgColor = slide.data("m-bg-color"); }
      slide.find(".slide-container").css({ "background-color": slideBgColor });
      
      // set text color on slide
      var slideColor = slide.data("color");
      if (window.mobilecheck() && slide.data("m-color")) { slideColor = slide.data("m-color"); }
      slide.css({ "color": slideColor });     
      
      if (!window.mobilecheck()) {
        switch (true) {
          case slide.hasClass("diagonal-right"):
            slide.css({
              'margin-left': (i * slideHeight) - scrollPos,
              'margin-top': (i * slideHeight) - scrollPos
            }); 
            break;
          case slide.hasClass("diagonal-left"):
            slide.css({
              'margin-left': - (i * slideHeight) + scrollPos,
              'margin-top': (i * slideHeight) - scrollPos
            }); 
            break;
          case slide.hasClass("vertical"):
            slide.css({
              'margin-top': (i * slideHeight) - scrollPos
            });          
            break;
          case slide.hasClass("horizontal-right"):
            slide.css({
              'margin-left': (i * slideHeight) - scrollPos
            });    
            break;
          case slide.hasClass("horizontal-left"):
            slide.css({
              'margin-left': - (i * slideHeight) + scrollPos
            });          
            break;
        }
      }
    });
    
    var newScrollIndex = Math.floor((.5 * slideHeight + scrollPos)/slideHeight);
    // var newScrollIndex = Math.floor(scrollPos/slideHeight) + 1;
   
    if (currScrollIndex != newScrollIndex) {
      // get prev slide based on scrollIndex
      var prevSlide = $('.slide[data-position="'+currScrollIndex+'"]');
      var prevTitle = $('.title[data-position="'+currScrollIndex+'"]');
     
      // get current slide based on scrollIndex
      var currSlide = $('.slide[data-position="'+newScrollIndex+'"]');
      var currTitle = $('.title[data-position="'+newScrollIndex+'"]');

      
      // set title color 
      var titleColor = currTitle.data("color");
      currTitle.css({ "color": titleColor });
      
      // set title background color 
      var titleBgColor = currTitle.data("bg-color");
      currTitle.find(".title-container").css({ "background-color": titleBgColor });
               
      // update currScrollIndex
      currScrollIndex = newScrollIndex;
    }

  }); 

}
   
function scrollToSlide(slideIndex) {
  $('body, html').animate({
    scrollTop: slideIndex * $(window).height()
  }, 1000);
}

function scrollToElement(elementId) {
  $('body, html').animate({
    scrollTop: $("#"+elementId).position().top + 60
  }, 1000);
}

/* Manage widen-screen notification */
$(window).resize(function() {
  widenScreenNotification();
  scrollSetup();
});
$(document).ready(function() {
  widenScreenNotification();
});

function widenScreenNotification() {
  if (!window.mobilecheck()) {  
    if ($(window).width() < 960) {
      $(".widen-screen-notification").slideDown();
    } else {
      $(".widen-screen-notification").slideUp();
    }
  }
}
