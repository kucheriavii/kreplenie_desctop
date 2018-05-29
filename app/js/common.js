$(function() {
    $(".slides-scroll").mCustomScrollbar({
        scrollInertia: 0,
        scrollButtons: {enable: true},
    });
    $('.slides-scroll li').click(function(){
        console.log($(this));
    });
    $('.item__slider-wrap').slick({
        arrows: false
    });


   /* $('.slider__item').magnificPopup({
        type:'image',
        delegate: 'a'
    });*/
	// Custom JS
    dropMenuHover();
    headerButtonActive();
    slickGoTo('.slides-scroll__item','.item__slider-wrap')
});

var dropMenuHover = function(){
    var drop_menu = $('.drop-menu');
    drop_menu.on('mouseenter', function (){
        drop_menu.addClass('drop-menu--active');
    });
    drop_menu.on('mouseleave', function (){
        drop_menu.removeClass('drop-menu--active');
    });
};

var headerButtonActive = function (e) {
  var headerButton = $('.header-buttons__item');
  headerButton.on('click', function(){
      headerButton.removeClass('active');
      $(this).toggleClass('active')
  })
};

var slickGoTo = function(el, slider) {

    $(el).parent().on('click', el , function () {
        var n=$(el).index(this);
        $(slider).slick('slickGoTo',n,true)
    });

};

//slider main
