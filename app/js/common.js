$(function() {

	// Custom JS
    dropMenuHover();
    headerButtonActive();
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