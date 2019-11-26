$(document).ready(function(){
    animatedNavigate();
});
  $(document).ready(function(){
  $('.showLoginPopup').on('click', function(){
    showLoginPopup();
  });

  $('.popup #close').on('click', function(){
    hideLoginPopup();
  });

  $('#submit').click(function(e){
    e.preventDefault();
    validateLoginForm();
  });

  
});


function animatedNavigate() {
  $('a[href^="#"]').click(function(){ //берем все ссылки атрибут href которых начинается с #
      if(document.getElementById($(this).attr('href').substr(1)) != null) { //на странице есть элемент с нужным нам id
         $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top }, 500); // анимируем скролл к элементу
      }     
      return false;
    });
}
(function ($) {
  $.fn.countTo = function (options) {
    options = options || {};
    
    return $(this).each(function () {
      // set options for current element
      var settings = $.extend({}, $.fn.countTo.defaults, {
        from:            $(this).data('from'),
        to:              $(this).data('to'),
        speed:           $(this).data('speed'),
        refreshInterval: $(this).data('refresh-interval'),
        decimals:        $(this).data('decimals')
      }, options);
      
      // how many times to update the value, and how much to increment the value on each update
      var loops = Math.ceil(settings.speed / settings.refreshInterval),
        increment = (settings.to - settings.from) / loops;
      
      // references & variables that will change with each update
      var self = this,
        $self = $(this),
        loopCount = 0,
        value = settings.from,
        data = $self.data('countTo') || {};
      
      $self.data('countTo', data);
      
      // if an existing interval can be found, clear it first
      if (data.interval) {
        clearInterval(data.interval);
      }
      data.interval = setInterval(updateTimer, settings.refreshInterval);
      
      // initialize the element with the starting value
      render(value);
      
      function updateTimer() {
        value += increment;
        loopCount++;
        
        render(value);
        
        if (typeof(settings.onUpdate) == 'function') {
          settings.onUpdate.call(self, value);
        }
        
        if (loopCount >= loops) {
          // remove the interval
          $self.removeData('countTo');
          clearInterval(data.interval);
          value = settings.to;
          
          if (typeof(settings.onComplete) == 'function') {
            settings.onComplete.call(self, value);
          }
        }
      }
      
      function render(value) {
        var formattedValue = settings.formatter.call(self, value, settings);
        $self.html(formattedValue);
      }
    });
  };
  
  $.fn.countTo.defaults = {
    from: 0,               // the number the element should start at
    to: 0,                 // the number the element should end at
    speed: 1000,           // how long it should take to count between the target numbers
    refreshInterval: 100,  // how often the element should be updated
    decimals: 0,           // the number of decimal places to show
    formatter: formatter,  // handler for formatting the value before rendering
    onUpdate: null,        // callback method for every time the element is updated
    onComplete: null       // callback method for when the element finishes updating
  };
  
  function formatter(value, settings) {
    return value.toFixed(settings.decimals);
  }
}(jQuery));

jQuery(function ($) {
  // custom formatting example
  $('.count-number').data('countToOptions', {
  formatter: function (value, options) {
    return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
  }
  });
  
  // start all the timers
  $('.timer').each(count);  
  
  function count(options) {
  var $this = $(this);
  options = $.extend({}, options || {}, $this.data('countToOptions') || {});
  $this.countTo(options);
  }
});

  var top_show = 150; // В каком положении полосы прокрутки начинать показ кнопки "Наверх"
  var delay = 1000; // Задержка прокрутки
  $(document).ready(function() {
    $(window).scroll(function () { // При прокрутке попадаем в эту функцию
      /* В зависимости от положения полосы прокрукти и значения top_show, скрываем или открываем кнопку "Наверх" */
      if ($(this).scrollTop() > top_show) $('#top').fadeIn();
      else $('#top').fadeOut();
    });
    $('#top').click(function () { // При клике по кнопке "Наверх" попадаем в эту функцию
      /* Плавная прокрутка наверх */
      $('body, html').animate({
        scrollTop: 0
      }, delay);
    });
  });


function showLoginPopup(){
  $('.popup, .shadow').css({
    display: 'block'
  });
}

function hideLoginPopup(){
  $('.popup, .shadow').css({
    display: 'none'
  });
}


