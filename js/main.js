(function() {    



  var app = {

  	// инициализация

  	initialize : function(){

  		// инциализируем события

  		this.eventsRun();

  		// инициализируем слайдер

  		this.slider.initialize();

  		// инициализируем кастом скролл

  		$('.scroll-pane').jScrollPane();

  		//привозим селект из-за пределов страницы и прячем, чтобы правильно работали fadeIn/fadeOut

  		$(".scroll-pane").css({"left":"-1px", "display":"none"});

  	},

  	//вешаем события

  	eventsRun: function(){

  		$(document).on('click', app.closeSelect); //клик по документу

  		$(".select-button").on('click', app.selectIn); //открываем/закрываем селект по нажатию кнопки

  		$(".scroll-pane").find("a").on('click', app.valSelect); //клик по значению на псевдо-селект

  		$("#submitForm").on('click', app.formSend); // отправляем форму

  	},

  	// закрываем селект при клике в любое место странице, кроме скролла

  	closeSelect: function(e){

  		if($(e.target)[0].className != "jspTrack" && $(e.target)[0].className != "jspDrag jspHover"){

			$(".scroll-pane").slideUp(200);

		}

  	},

  	// открываем, закрываем слайдер

  	selectIn: function(){

  		selectList = $(this).nextAll("ul");

		if(selectList.is(':visible')){

			selectList.slideUp(200);

		}else{

			//сперва все select свернем, потом откроем нужный, делаем полный аналог стандартного селекта=)

			$(".select-button").nextAll("ul").slideUp(200);

			selectList.slideDown(200);

		}

		return false;

	},

	// берем значение из псевдо-селекта, передаем в наш инпут

	valSelect: function(){

		$(this).parents(".selectOuter").find("input").val($(this).text());

		$(this).parents("ul").slideUp(200);

		return false;

	},

	// работаем с формой

	formSend: function(){
		jQuery.ajax({
	            url:     "feedback.php", //Адрес подгружаемой страницы
	            type:     "POST", //Тип запроса
	            dataType: "html", //Тип данных
	            data: jQuery(".formaCall").serialize(), 
	            success: function(response) { //Если все нормально
	            console.log(response);
	        },
	        error: function(response) { //Если ошибка
	        	console.log("Ошибка при отправке формы");
	        }
	     });
		return false;
	},

	// объект слайдера

	slider: {

		// определяем необходимые переменные

		elem: $(".slide").size() - 1, // общее число слайдов

		numer: $(".slide").size() - 1, // счетчик для понимания на каком слайде находимся

		sumWidth: $(".slide").outerWidth(true), // ширина одного слайда

		prevBtn: $("#prev"), //кнопка слайдера назад

		nextBtn: $("#next"), //кнопка слайдера вперед

		// инициализируем события

		initialize: function(){

			this.prevBtn.on('click', this.sliderPrev); // двигать слайдер назад

  			this.nextBtn.on('click', this.sliderNext); // двигать слайдер вперед

		},

		// прокрутка слайдера назад

		sliderPrev: function(){

			if (app.slider.numer < 0 || app.slider.numer > (app.slider.elem - 1)) {

				} else {

				if(app.slider.numer == 0){

					app.slider.nextBtn.fadeIn();

				}

				app.slider.numer++;

				if(app.slider.numer == 2) {

					$(this).fadeOut();

				}

				app.slider.legendView('-200px',300);

				$(".sliderWrap").animate({

					marginLeft: "+=" + app.slider.sumWidth + "px"

				}, 500);

				app.slider.legendView('0px',300);

			}

			return false;

		},

		// прокрутка слайдера вперед

		sliderNext: function(){

			if (app.slider.numer <= 0 || app.slider.numer > app.slider.elem) {

			} else {

				if(app.slider.numer == 2){

					app.slider.prevBtn.fadeIn();

				}

				app.slider.numer--;

				if(app.slider.numer == 0) {

					$(this).fadeOut();	

				}

				app.slider.legendView('-200px',300);

				$(".sliderWrap").animate({

					marginLeft: "-=" + app.slider.sumWidth + "px"

				}, 500);

				app.slider.legendView('0px',300);

			}

			return false;

		},

		// скрываем или показываем легенду к слайдеру

		legendView: function(value,speed){

			$(".legend").animate({

					bottom: value

				}, speed);

		}

	}

}

	// инициализация всего приложения

	app.initialize();



}());