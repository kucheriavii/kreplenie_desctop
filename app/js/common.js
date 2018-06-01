$(function() {
    $(".slides-scroll").mCustomScrollbar({
        scrollInertia: 0,
        scrollButtons: {enable: true},
    });
    $(".item__the-same-wrapper").mCustomScrollbar({
        scrollInertia: 0,
        scrollButtons: {enable: true},
        scrollbarPosition: "outside"
    });


    $('.slides-scroll li').click(function(){
        console.log($(this));
    });
    $('.item__slider-wrap').slick({
        arrows: false
    });
    $('.slider__item').magnificPopup({
        type:'image',
        delegate: 'a'
    });
    $('.gallery-item').magnificPopup({
        type: 'image',
        gallery:{
            enabled: true
        }
    });
    // Custom JS
    dropMenuHover();
    setActive();
    slickGoTo('.slides-scroll__item','.item__slider-wrap')
    rating();
    item_counter();
    showMore();
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

var setActive = function () {
  var headerButton = $('.header-buttons__item');
  var itemLikes = $('.item-likes');
  var itemMenuElement = $(".item-main-menu__link");
  var itemTheSameLike = $('.item__the-same-like');
  headerButton.on('click', function(){
      headerButton.removeClass('active');
      $(this).toggleClass('active');
  });
  itemLikes.on('click', function(){
      $(this).toggleClass('active');
  });
  itemMenuElement.on('click', function(e){
      e.preventDefault();
      itemMenuElement.parents('.item-main-menu').find('.item-main-menu__element').removeClass('active');
      $(this).parents('.item-main-menu__element').addClass('active');
      var elementMenuChosen = $(this).parents('.item-main-menu__element').index('.item-main-menu__element');
      $(".item-main-menu__block").removeClass('active').end();
      $(".item-main-menu__block").eq(elementMenuChosen).addClass('active');

  });
  itemTheSameLike.on('click', function(){
      $(this).toggleClass('active');
  });
};

var slickGoTo = function(el, slider) {
    $(el).parent().on('click', el , function () {
        var n=$(el).index(this);
        $(slider).slick('slickGoTo',n,true)
    });

};
/******rating*****/
var rating = function() {
    var star = $(".rating__star");
    var h = $(this).parents('.rating').find('.active').length;
    /*add stable class*/
    star.parent().on('click', ".rating__star" , function () {
        $(this).siblings('.rating__star').removeClass('active');
        $(this).prevAll(".rating__star").addClass("active").end().addClass('active');
        h = $(this).parents('.rating').find('.active').length;//remember how many stars is after click
    });
    /*add tempreory class*/
    star.parent().on('mouseenter', ".rating__star" , function () {
        h = $(this).parents('.rating').find('.active').length;//remember how many stars was before start
        $(this).siblings('.rating__star').removeClass('active_js').removeClass('active').end().removeClass('active');
        $(this).prevAll(".rating__star").addClass("active_js").end().addClass('active_js');
    });
    /*remove tempreory class*/
    star.parent().on('mouseleave', ".rating__star" , function () {
        $('.active_js').removeClass('active_js');
        $(this).parents('.rating').children('.rating__star').eq(h-1).prevAll('.rating__star').addClass('active').end().addClass('active')//return old star counter
    });
};

/*******************counter**************************/
var item_counter = function(){
    var counter = $('.item-counter__input').val(),
        input = $('.item-counter__input')
        button_minus = $('.item-counter__button').eq(0),
        button_plus = $('.item-counter__button').eq(1);
    button_minus.click(function () {
        counter = input.val();
        counter--;
        counter<1?counter=1:counter;
        input.val(counter);
    });

    button_plus.click(function () {
        counter = $('.item-counter__input').val();
        counter++;
        counter>9999?counter=9999:counter;
        input.val(counter);
    });

    input.blur(function(){
        counter = $('.item-counter__input').val();
        counter>9999?counter=9999:counter;
        counter = parseInt(counter);
        input.val(isNaN(counter)?1:counter);
    })
};

var showMore = function(){
    var text,
        feedbacks_height = parseInt($('.feedback-item__answers').height());
    console.log(feedbacks_height)
    $(document).on('click', '.show-more', function(e){
       e.preventDefault();
       e.stopPropagation();
       text = $(this).text();
       $('.item-main-menu__block-description').animate({height:'100%'});
       $(this).removeClass("show-more").addClass('show-less').text('Скрыть текст');
    });
    $(document).on('click', '.show-less', function(e){
       e.preventDefault();
       console.log("test");
       e.stopPropagation();
       $('.item-main-menu__block-description').css({height:'200px'});
       $(this).removeClass("show-less").addClass('show-more').text(text);
    });

    //feedback answers
    $(document).on('click', '.feedback-item__answer-show-more', function(e){
        e.preventDefault();
        e.stopPropagation();
        text = $(this).text();
        $('.feedback-item__answers').animate({height:'100%'});
        $(this).removeClass("feedback-item__answer-show-more").addClass('feedback-item__answer-show-less').text('Скрыть ответы');
    });
    $(document).on('click', '.feedback-item__answer-show-less', function(e){
        e.preventDefault();
        console.log("test");
        e.stopPropagation();
        $('.feedback-item__answers').css({height:feedbacks_height});
        $(this).removeClass("feedback-item__answer-show-less").addClass('feedback-item__answer-show-more').text(text);
    });
};
//slider main
