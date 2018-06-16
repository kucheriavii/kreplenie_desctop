$(function() {
    filterPrice();
    mainSliderPopup();


    $('.item__slider-wrap').slick({
        arrows: true
    });
    /*$('.slider__item').magnificPopup({
        type:'image',
        delegate: 'a'
    });*/

    for(var i=0; i<$('.feedback-item').length;i++){
        $('.feedback-item').eq(i).find('.gallery-item').magnificPopup({
            type: 'image',
            gallery:{
                enabled: true
            }
        });
    }

    // Custom JS
    swichVersion();
    dropMenuHover();
    searchHeader();
    setActive();
    slickGoTo('.slides-scroll__item','.item__slider-wrap');
    rating();
    item_counter();
    showMore();
    orderPage(); //Функция ответственая за страницу заказа
    catalogFilter();
    scroolBar();
    horizontalScrollItem();
    basketInit();
    catalogItemDetail(); //показывать детальную информацию о товаре в catalog.html
    popup();
});

var searchHeader = function () {
    $('.search-box__input').focus(function(){
        sliceResult();
        $('.search-box__result').css('display','block');
    });
    $(document).on('click', function(e){
        if($(e.target).parents('.search-box').length==0){
            $('.search-box__result').css('display','none');
        }
    });
    $(document).on('click', '.search-box__result .show-more', function(e){
        $('.search-box__result .catalog__item-link').slideDown(100);
        $(this).text("Скрыть результаты").removeClass('show-more').addClass('show-less');
    });
    $(document).on('click', '.search-box__result .show-less', function(e){
        $('.search-box__result .catalog__item-link').slice(1,3).slideUp(100);
        $(this).text("Показать все результаты").removeClass('show-less').addClass('show-more');
    });
    var sliceResult = function(){
        if($('.search-box__result .catalog__item-link').length>3){
            $('.search-box__result-box .show-more').remove();
            $('.search-box__result-box .show-less').remove();
            $('.search-box__result .catalog__item-link').slice(3).css('display','none');
            var showMoreResult = $('<a href="#" class="show-more gray-dashed-link">Показать все результаты</a>');
            showMoreResult.appendTo('.search-box__result-box');
        }
    }

};

var debug = function(){
    var deb_a = $('.other-categories__item').clone(true);
    console.log(deb_a);
    deb_a.insertAfter($('.other-categories__item:last-child'))
};

var dropMenuHover = function(){
    var dropMenuButton = $('.drop-menu-button');
    var dropMenu = $('.drop-menu');
    var dropMenuHeight = 50*$('.drop-menu__submenu-item').length; /*высота пункта меню 50px*/
    console.log(dropMenuHeight)

    $(".drop-menu__submenu").css({'min-height':dropMenuHeight});
    dropMenuButton.on('mouseenter', function (){
        dropMenu.addClass('drop-menu--active');
    });
    $('.header-menu__wrapper').on('mouseleave', function (e){
        dropMenu.removeClass('drop-menu--active');
    });
};

var setActive = function () {
  var headerButton = $('.header-buttons__item');
  var itemLikes = $('.item-likes');
  var itemMenuElement = $(".item-main-menu__link");
  var itemTheSameLike = '.item__the-same-like';
  var otherCategoriesMenuItem = $('.other-categories__menu-item');
  var otherCategoriesItemLike = '.other-categories__item-like';
  var historyItemsItemLike = ".history-items__item-like";
  var interestedItemsItemLike = ".interested-items__item-like";
  var leaveFeedback = $(".leave-feedback__button");
  var catalogSortLink = $(".catalog__sort-link");
  var catalogItemButton = '.catalog__item .button--buy';
  var pagenav = '.pagenav-button';
  var promoButton = $('basket__promocode-ok');

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

      //Feedbacks menu
      if ($(this).hasClass('item-main-menu__link-characteristic')||$(this).text().match("Отзывы")){ //двойная проверка на случай если реализация отдельного класса для елемента меню недопустима
          $('.leave-feedback__wrapper').fadeIn(500);
          $('.item__feedback .feedback-item').fadeOut(300)
      } else{

          $('.leave-feedback__wrapper').fadeOut(300);
          $('.item__feedback .feedback-item').fadeIn(500);
      }

      //Accessories menu
      var leftBlock = $(this).parents('.row').children().eq(0),
          rightBlock = $(this).parents('.row').children().eq(1)
      if ($(this).hasClass('item-main-menu__link-accessories')||$(this).text().match("Аксессуары")){ //двойная проверка на случай если реализация отдельного класса для елемента меню недопустима
          leftBlock.removeAttr('class').addClass('col-sm-24');
          rightBlock.addClass('hidden');
      } else{
          leftBlock.removeAttr('class').addClass('col-md-16 col-sm-14');
          rightBlock.removeClass('hidden');
      }
  });

  $(document).on('click', itemTheSameLike, function (e) {
      e.preventDefault();
      $(e.target).toggleClass('active')
  } );

  otherCategoriesMenuItem.on('click', function (e) {
    otherCategoriesMenuItem.removeClass('active');
    $(this).addClass('active');
    var categorytMenuChosen = $(this).index('.other-categories__menu-item');
    $('.other-categories__item-box').removeClass('active');
    $('.other-categories__item-box').eq(categorytMenuChosen).addClass('active');
  });

  $(document).on('click', otherCategoriesItemLike, function (e) {
    e.preventDefault();
    $(e.target).toggleClass('active')
  } );

  $(document).on('click', historyItemsItemLike, function (e) {
      e.preventDefault();
      $(e.target).toggleClass('active')
  } );

  $(document).on('click', interestedItemsItemLike, function (e) {
      e.preventDefault();
      $(e.target).toggleClass('active')
  } );

  leaveFeedback.on('click', function(){
      $('.leave-feedback__wrapper').fadeIn(500);
      if(!($('.item__feedback .feedback__wrapper').hasClass('disactive'))){
          $('.item__feedback .feedback__wrapper').addClass('disactive');
      } else {
          $('.item__feedback .feedback__wrapper').removeClass('disactive');
      }
  });

  catalogSortLink.on('click', function(){
      if($(this).hasClass('active')){
          if($(this).hasClass('asc')){
              $(this).removeClass('asc').addClass('desc');
          } else if ($(this).hasClass('desc')){
              $(this).removeClass('desc').addClass('asc');
          }
      } else{
          catalogSortLink.removeClass('active');
          $(this).addClass('active asc');
      }
  });

  $(document).on('click', catalogItemButton, function(e){
      $(e.target).toggleClass('active');
      var textBtn = $(e.target).text();
      if($(e.target).hasClass('active')){
          $(e.target).html('Товар <br>в корзине');
          $(e.target).css({
              'font-size': '12px',
              'line-height': '12px',
              'display': 'block',
              'text-align': 'left'
          })
      } else{
          $(e.target).text("Купить");
          console.log(e.target)
          $(e.target).removeAttr('style');
      }
  })

  $(document).on('click', pagenav, function(e){
      $(pagenav).removeClass('active');
      $(e.target).addClass('active');
  })

  promoButton.on('click',function(e){
      e.preventDefault();
  })
};

var slickGoTo = function(el, slider) {
    $(el).parent().on('click', el , function (e) {
        var n=$(this).parent().children(el).index(this);
        //$(slider).slick('slickGoTo',n,true)
        var actualSlider = ($(e.target).parents('.item-slider').find('.item__slider-wrap'));
        actualSlider.slick('slickGoTo',n,true)
        $(this).closest('.item__slider-wrap').slick('slickGoTo',n,true);
    });

};
/******rating*****/
var rating = function() {
    var star = $(".rating__star");
    var h = $(this).parents('.rating').find('.active').length;
    /*add stable class*/
    star.parent().on('click', ".rating__star" , function () {

        if($(this).parents('.rating').hasClass('rating-off')){
            return 0;
        }

        $(this).siblings('.rating__star').removeClass('active');
        $(this).prevAll(".rating__star").addClass("active").end().addClass('active');
        h = $(this).parents('.rating').find('.active').length;//remember how many stars is after click
    });
    /*add tempreory class*/

    star.parent().on('mouseenter', ".rating__star" , function () {

        if($(this).parents('.rating').hasClass('rating-off')){
            return 0;
        }

        h = $(this).parents('.rating').find('.active').length;//remember how many stars was before start
        $(this).siblings('.rating__star').removeClass('active_js').removeClass('active').end().removeClass('active');
        $(this).prevAll(".rating__star").addClass("active_js").end().addClass('active_js');
    });
    /*remove tempreory class*/
    star.parent().on('mouseleave', ".rating__star" , function () {

        if($(this).parents('.rating').hasClass('rating-off')){
            return 0;
        }

        $('.active_js').removeClass('active_js');
        $(this).parents('.rating').children('.rating__star').eq(h-1).prevAll('.rating__star').addClass('active').end().addClass('active')//return old star counter
    });
};
var scroolBar = function(){
    $(".slides-scroll").mCustomScrollbar({
        scrollInertia: 0,
        scrollButtons: {enable: true},
    });
    $(".popup-content").mCustomScrollbar({
        scrollInertia: 0,
        scrollbarPosition: "outside"
    });


    if($(window).width()>=1280){
        $(".item__the-same-wrapper").mCustomScrollbar({
            scrollInertia: 0,
            scrollButtons: {enable: true},
            scrollbarPosition: "outside"
        });
    } else{
        $(".item__the-same-wrapper").mCustomScrollbar({
            axis:"x",
            scrollInertia: 0,
            advanced:{ autoExpandHorizontalScroll:true }
        });
    }


    $(".other-categories__item-box").mCustomScrollbar({
        axis:"x",
        scrollInertia: 0,
        advanced:{ autoExpandHorizontalScroll:true }
    });

    $(".history-items__item-box").mCustomScrollbar({
        axis:"x",
        scrollInertia: 0,
        advanced:{ autoExpandHorizontalScroll:true }
    });
    $(".interested-items__item-box").mCustomScrollbar({
        axis:"x",
        scrollInertia: 0,
        advanced:{ autoExpandHorizontalScroll:true }
    });

    $(".accessories-items__item-box").mCustomScrollbar({
        axis:"x",
        scrollInertia: 0,
        advanced:{ autoExpandHorizontalScroll:true }
    });
};
/*******************counter**************************/
var item_counter = function(){
    var counter = $('.item-counter__input').val(),
        input = $('.item-counter__input')
        button_minus = $('.item-counter__button-minus'),
        button_plus = $('.item-counter__button-plus');
    button_minus.click(function (e) {
        e.preventDefault();
        counter = $(this).parents('.item-counter').find('.item-counter__input').val();
        counter--;
        counter<1?counter=1:counter;
        $(this).parents('.item-counter').find('.item-counter__input').val(counter);
    });

    button_plus.click(function (e) {
        e.preventDefault();
        counter = $(this).parents('.item-counter').find('.item-counter__input').val();
        counter++;
        counter>9999?counter=9999:counter;
        $(this).parents('.item-counter').find('.item-counter__input').val(counter);
    });

    input.blur(function(){
        counter = $(this).parents('.item-counter').find('.item-counter__input').val();
        counter>9999?counter=9999:counter;
        counter = parseInt(counter);
        $(this).parents('.item-counter').find('.item-counter__input').val(isNaN(counter)?1:counter);
    })
};

var showMore = function(){
    var text,
        feedbacks_height;// = parseInt($('.feedback-item__answers').height());
    $(document).on('click', '.item-main-menu__block .show-more', function(e){
       e.preventDefault();
       e.stopPropagation();
       text = $(this).text();
       $('.item-main-menu__block-description').animate({height:'100%'});
       $(this).removeClass("show-more").addClass('show-less').text('Скрыть текст');
    });
    $(document).on('click', '.item-main-menu__block .show-less', function(e){
       e.preventDefault();
       e.stopPropagation();
       $('.item-main-menu__block-description').css({height:'200px'});
       $(this).removeClass("show-less").addClass('show-more').text(text);
    });
    //feedback answers
    $(document).on('click', '.feedback-item__answer-show-more', function(e){
        e.preventDefault();
        e.stopPropagation();
        text = $(this).text();
        var answers = ($(this).parents('.feedback-item').find('.feedback-item__answers'));
        answers.animate({height:'100%'});
        $(this).removeClass("feedback-item__answer-show-more").addClass('feedback-item__answer-show-less').text('Скрыть ответы');
        feedbacks_height = parseInt(answers.height());
    });
    $(document).on('click', '.feedback-item__answer-show-less', function(e){
        e.preventDefault();
        e.stopPropagation();
        var answers = ($(this).parents('.feedback-item').find('.feedback-item__answers'));
        answers.css({height:feedbacks_height});
        $(this).removeClass("feedback-item__answer-show-less").addClass('feedback-item__answer-show-more').text(text);
    });

    //filter options showmore (affter 5 elements)
    $('.filter-option').each(function(){
        if($(this).children('.filter-options__label').length>5){
            $(this).children('.filter-options__label').slice(5).css('display','none');
            $('<span class="gray-dashed-link show-more">Показать все</span>').appendTo($(this))
        }
        $(document).on('click', '.filter-option .show-more', function(e){
            $(this).parents('.filter-option').children('.filter-options__label').removeAttr('style');
            $(this).text('скрыть елементы').removeClass('show-more').addClass('show-less');
        });
        $(document).on('click', '.filter-option .show-less', function(e){
            $(this).parents('.filter-option').children('.filter-options__label').slice(5).css('display','none');
            $(this).text('Показать все').removeClass('show-less').addClass('show-more')
        })
    })

    //filter all options hide/show
    $(document).on('click','.filter-header-scroll',function(){
        if($(this).parents('.filter-option').children('.filter-options__label').is(':visible')){
            $(this).parents('.filter-option').addClass('closed').children('.show-more').remove();
            $(this).parents('.filter-option').children('.show-less').remove();
            $(this).parents('.filter-option').children('.filter-options__label').slideUp(300);
        } else {
            if($(this).parents('.filter-option').removeClass('closed').children('.filter-options__label').length>5){
                $('<span class="gray-dashed-link show-more">Показать все</span>').appendTo($(this).parents('.filter-option'))
            }
            $(this).parents('.filter-option').removeClass('closed').children('.filter-options__label').slice(0,5).slideDown(300);

        }
    })
};

var horizontalScrollItem = function (e) {
    $("<span class='other-categories-left-scroll'></span>").insertBefore($(".other-categories__item-box"));
    $("<span class='other-categories-right-scroll'></span>").insertAfter($(".other-categories__item-box"));

    $('.other-categories-left-scroll').on('click',function () {
        $(".other-categories__item-box").mCustomScrollbar('scrollTo',"+=100");
    });
    $('.other-categories-right-scroll').on('click', function () {
        $(".other-categories__item-box").mCustomScrollbar('scrollTo',"-=100");
    });

    //History items scroll
    $('.history-items__item-box').each(function(){
        if($(this).parents('.row').width()<($(this).find('.history-items__item').width()+20)*$(this).find('.history-items__item').length){
            $("<span class='history-items-left-scroll'></span>").insertBefore($(this));
            $("<span class='history-items-right-scroll'></span>").insertAfter($(this));

            $('.history-items-left-scroll').on('click',function () {
                $(this).parents(".history-items").find('.history-items__item-box').mCustomScrollbar('scrollTo',"+=100");

            });
            $('.history-items-right-scroll').on('click', function () {
                $(this).parents(".history-items").find('.history-items__item-box').mCustomScrollbar('scrollTo',"-=100");
            });
        }
    });
    //.interested-items scroll
    $('.interested-items__item-box').each(function(){
        if($(this).parents('.row').width()<($(this).find('.interested-items__item').width()+32)*$(this).find('.interested-items__item').length){
            $("<span class='interested-items-left-scroll'></span>").insertBefore($(this));
            $("<span class='interested-items-right-scroll'></span>").insertAfter($(this));

            $('.interested-items-left-scroll').on('click',function () {
                $(this).parents(".interested-items").find('.interested-items__item-box').mCustomScrollbar('scrollTo',"+=100");

            });
            $('.interested-items-right-scroll').on('click', function () {
                $(this).parents(".interested-items").find('.interested-items__item-box').mCustomScrollbar('scrollTo',"-=100");
            });
        }
    });
    /*
    $("<span class='history-items-left-scroll'></span>").insertBefore($(".history-items__item-box"));
    $("<span class='history-items-right-scroll'></span>").insertAfter($(".history-items__item-box"));

    $('.history-items-left-scroll').on('click',function () {
        $(".history-items__item-box").mCustomScrollbar('scrollTo',"+=100");

    });
    $('.history-items-right-scroll').on('click', function () {
        $(".history-items__item-box").mCustomScrollbar('scrollTo',"-=100");
    });

    //The same things horizontal item for resolution = 1024
    if($(window).width()<1280){
        $("<span class='item__the-same-left-scroll'></span>").insertBefore($(".item__the-same-wrapper"));
        $("<span class='item__the-same-right-scroll'></span>").insertAfter($(".item__the-same-wrapper"));
    }
*/
    //accessories item
    $('.accessories-items__item-box').each(function(){

        var scrollItemWidth = ($(this).find('.accessories-items__item').width()+20)*$(this).find('.accessories-items__item').length;

        if($(this).parents('.row').width()<scrollItemWidth){
            $("<span class='accessories-items-left-scroll'></span>").insertBefore($(this));
            $("<span class='accessories-items-right-scroll'></span>").insertAfter($(this));

            $('.accessories-items-left-scroll').on('click',function () {
                $(this).parents(".accessories-items").find('.accessories-items__item-box').mCustomScrollbar('scrollTo',"+=100");

            });
            $('.accessories-items-right-scroll').on('click', function () {
                $(this).parents(".accessories-items").find('.accessories-items__item-box').mCustomScrollbar('scrollTo',"-=100");
            });
        }
    });


};

var swichVersion = function(){
  var startResolution = $(window).width();
  var activeResolution;
  var catalogBanners = $('.catalog__banners-link');
  $(window).resize(function(){
      activeResolution = $(window).width();
      if(startResolution>=1280 && activeResolution<1280){
          location.reload();
      } else if(startResolution<=1280 && activeResolution>1280){
          location.reload();
      }
  })

};

var popup = function(e){
    var popup = $('.popup-close');
    popup.on('click', function(e){
        e.preventDefault();
        $(this).parents('.popup').removeClass('active');
        $('.popup').parents('.popup-wrapper').removeClass('active');

        $('.basket-button').removeClass('active');
    });

    $('.delivery-and-payment__link').click(function (e) {
        e.preventDefault();
        $('.delivery-and-payment__popup').addClass('active');
        $('.delivery-and-payment__popup').parents('.popup-wrapper').addClass('active');
    });


    $('.basket-button').click(function (e) {
        e.preventDefault();
        $('.basket__popup').addClass('active');
        $('.basket__popup').parents('.popup-wrapper').addClass('active');
    });
    /*Закрытие по нажатию на wrapper*/
    $(document).click(function (e) {
        var container = $(".popup");
        if (e.target!=container[0]&&container.has(e.target).length === 0 && $(e.target).hasClass('popup-wrapper')){
            container.removeClass('active');
            $('.popup').parents('.popup-wrapper').removeClass('active');
            $('.basket-button').removeClass('active');
        }
    });
};

var mainSliderPopup = function(){
    var slider = $('.item-slider').clone(true);
    var n;
    var name = $('.item-name h1').text();
    $('.item-code').eq(0).clone().insertBefore('.main-slider__popup .popup-name');
    $('.main-slider__popup .popup-content').append(slider);
    $('.main-slider__popup .popup-name').text(name);
    $('.slider__item-link').click(function (e) {
        e.preventDefault();
        n = $(this).parents('.slider__item').index('.slider__item')-1;
        $('.main-slider__popup').addClass('active').parents('.popup-wrapper').addClass('active');
        $('.item__slider-wrap').slick('slickGoTo',n,true)
    })
};

var filterPrice = function(){
    var minimumRange = parseInt($('.amount-left').val());
    var maximumRange = parseInt($('.amount-right').val());
   // maximumRange>0?maximumRange:parseInt($('.amount-right').val());
    var amountleft = $(".amount-left");
    var amountright = $(".amount-right");
    $( ".slider-range" ).slider({
        range: true,
        min: 0,
        max: maximumRange,
        values: [ minimumRange, maximumRange ],
        slide: function( event, ui ) {
            amountleft.val(ui.values[ 0 ]);
            amountright.val(ui.values[ 1 ]);
        }
    });
    amountleft.val( $( ".slider-range" ).slider( "values", 0 ));
    amountright.val( $( ".slider-range" ).slider( "values", 1 ));
    $('body').append('<a href="#" id="go-top" title="Вверх"></a>');


    //хендлер введения минимального значения для ползунка в фильтре каталога
    $(".amount-left").keyup(function(){
        var minimumRange = parseInt(amountleft.val());
        var maximumRange = parseInt(amountright.val());
        //определение минимальной цены в фильтре и приближения к ползунку максимальной цены
        if($.isNumeric(minimumRange) && (maximumRange-minimumRange)>0 ){
            $( ".slider-range" ).slider({
                range: true,
                min: 0,
                max: maximumRange,
                values: [ minimumRange, maximumRange ],
                slide: function( event, ui ) {
                    amountleft.val(ui.values[ 0 ]);
                    amountright.val(ui.values[ 1 ]);
                }
            });
            amountleft.val( $( ".slider-range" ).slider( "values", 0 ));
            amountright.val( $( ".slider-range" ).slider( "values", 1 ));
        } else {
            $( ".slider-range" ).slider({
                range: true,
                min: 0,
                max: maximumRange,
                values: [ 0, maximumRange ],
                slide: function( event, ui ) {
                    amountleft.val(ui.values[ 0 ]);
                    amountright.val(ui.values[ 1 ]);
                }
            });
            amountleft.val( $( ".slider-range" ).slider( "values", 0 ));
            amountright.val( $( ".slider-range" ).slider( "values", 1 ));
        }
    });
    //определение максимальной цены в фильтре и приближения к ползунку минимальной цены
    $(".amount-right").blur(function(){
        var minimumRange = parseInt(amountleft.val());
        var maximumRange = parseInt(amountright.val());
        if($.isNumeric(maximumRange) && (maximumRange-minimumRange)>0 ){
            $( ".slider-range" ).slider({
                range: true,
                min: 0,
                max: maximumRange,
                values: [ minimumRange, maximumRange ],
                slide: function( event, ui ) {
                    amountleft.val(ui.values[ 0 ]);
                    amountright.val(ui.values[ 1 ]);
                }
            });
            amountleft.val( $( ".slider-range" ).slider( "values", 0 ));
            amountright.val( $( ".slider-range" ).slider( "values", 1 ));
        } else {
            maximumRange = 9999;
            $( ".slider-range" ).slider({
                range: true,
                min: 0,
                max: maximumRange,
                values: [ minimumRange, maximumRange ],
                slide: function( event, ui ) {
                    amountleft.val(ui.values[ 0 ]);
                    amountright.val(ui.values[ 1 ]);
                }
            });
            amountleft.val( $( ".slider-range" ).slider( "values", 0 ));
            amountright.val( $( ".slider-range" ).slider( "values", 1 ));
        }
    });
};

var catalogFilter = function(e){
  $(document).on('click', '.filter-result__button-refresh', function(e){
      e.preventDefault();
      $(this).parents('.filter-options').find('input:checked').prop('checked', false);
  });

    $(document).on('click', '.filter-result__button-ok', function(e){
        var selectedInputs = $(this).parents('.filter-options').find('input:checked').parents('.filter-options__label');
        var selectedText = [];
        $('.filter-selected-params__block .filter-selected-params__label').remove();
        for(i=0;i<selectedInputs.length;i++){
              selectedText[i] = $(this).parents('.filter-options').find('input:checked').eq(i).parents('.filter-options__label').text()
              $("<label class='filter-selected-params__label'><input type='checkbox' name='filter-selected-params' checked>"+selectedText[i]+'</label>').appendTo('.filter-selected-params__block');
          }
        $('html, body').animate({
            scrollTop: 0
        }, 400);
    });

    $(document).on('click','.filter-selected-params__reset-params',function(e){
        e.preventDefault();
       $(this).parents('.filter-selected-params').find('.filter-selected-params__label').remove();
    })
};

var basketInit = function(){
    var close = $('.catalog__item .close');
    $(document).on('click', close, function(e){
        if($(e.target).hasClass('close')){
            $(e.target).parents('.catalog__item').remove();
        }
    })
};

var catalogItemDetail = function(){
    //при наведении мыши открывать детальную инфу о товаре, и обрезать количество елементов галереи
    $(document).on('mouseenter','.catalog__items-list .catalog__item-wrap', function(e){
        $('.catalog__item').removeClass('active');
        $(e.target).parents('.catalog__item').addClass('active');
        $(e.target).parents(".catalog__item").find('.item-catalog__detail-characteristic-option').slice(9).slideUp(100);

        //var toolbarHeight = $('.item-catalog__item-detail').height()+$('.catalog__item.active').children('.catalog__item-wrap').height();
        //$('.catalog__item-gallery-wrap').height(toolbarHeight);
        $('.catalog__item.active').find('.catalog__item-gallery-item').slice(0,2).css('display','none');
    });

    // скрывать инфу если мышь не на объекте
    /*$(document).on('mouseleave','.catalog', function(e){
        if(!$(e.target).hasClass('catalog')){
            $('.catalog__item').removeClass('active');
        }
    })*/
    /*$(document).on('mouseenter','.filter-wrapper', function(e){
        $('.catalog__item').removeClass('active');
    });*/
    $(document).on('mouseleave','.catalog__item', function(e){
        $('.catalog__item').removeClass('active');
    });
        // $('.catalog__item .item-catalog__detail-characteristic-option').slice(9).css('display','none');

    $(document).on('click','.catalog__item-gallery-wrap .show-more', function(e){
        e.preventDefault();
        $(e.target).parents('.catalog__item').find('.catalog__item-gallery-item').slideDown(200);
        $(e.target).text("Скрыть елементы").removeClass('show-more').addClass('show-less');
    });

    $(document).on('click','.catalog__item-gallery-wrap .show-less', function(e){
        e.preventDefault();
        $(e.target).parents('.catalog__item').find('.catalog__item-gallery-item').slice(0,2).slideUp(200);
        $(e.target).text("Показать еще").removeClass('show-less').addClass('show-more');
    });

    $(document).on('click', '.catalog__item-gallery-img', function(e){
        var galleryPicture = $(e.target).attr('src');
        $(e.target).parents(".catalog__item").find('.catalog__item-img').attr('src',galleryPicture);
    });

    $(document).on('click', '.catalog__detail-all-char', function(e){
        e.preventDefault();
        $(e.target).parents(".catalog__item").find('.item-catalog__detail-characteristic-option').slideDown();
        $(e.target).text('Скрыть характеристики').removeClass('item-catalog__detail-characteristic').addClass('item-catalog__detail-characteristic-less');
        //var toolbarHeight = $('.item-catalog__item-detail').height()+$('.catalog__item.active').children('.catalog__item-wrap').height();
        //$(e.target).parents(".catalog__item").find('.catalog__item-gallery-wrap').height(toolbarHeight);
    });
    $(document).on('click', '.item-catalog__detail-characteristic-less', function(e){
        e.preventDefault();
        $(e.target).parents(".catalog__item").find('.item-catalog__detail-characteristic-option').slice(9).slideUp(100);
        $(e.target).text('Все характеристики и описания').removeClass('item-catalog__detail-characteristic-less').addClass('item-catalog__detail-characteristic');
        //var toolbarHeight = $('.item-catalog__item-detail').height()+$('.catalog__item.active').children('.catalog__item-wrap').height();
        //$(e.target).parents(".catalog__item").find('.catalog__item-gallery-wrap').height(toolbarHeight);
    });

};

var orderPage = function(){
    $('.show-variants').click(function(e){
        var delVar = $(this).parents('.delivery-order').find('.variants-delivery');
        if($(this).hasClass('active')){
            delVar.slideUp();
            $(this).removeClass('active');
            $(this).parents('.detail-variant-order').css({
                'background-image':'url("../img/blue-arrow.png")',
                'background-position':'96.5% 13px'
            });
        }else{
            delVar.slideDown();
            $(this).addClass('active');
            $(this).parents('.detail-variant-order')
                .css({
                    'background-image':'url("../img/blue-arrow-down.png")',
                    'background-position':'96.5% 17px'
                });
        }
    });
    $('.comments-order .info span').click(function(e){
        $(this).parent().find(".ar-cmmt").slideToggle(200);
    });

    $('.order-box .order-user button').on('click', function(e){ //скрывать поля для авторизированого юзера
        $('.order-box .order-user button').removeClass('active');
        $(this).addClass('active');
        if($(this).hasClass('new-user')){
            $('.basic-order').fadeIn(300);
        } else if($(this).hasClass('register-user')){
            $('.basic-order').fadeOut(100);
        }
    });
};
