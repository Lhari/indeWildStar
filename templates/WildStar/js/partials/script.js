var isOpen = false;

jQuery(document).ready(function () {
	$('.js-offcanvas__toggle').click(function() {
		$('.js-offcanvas').slideToggle();

		if(!isOpen) {
			$('.js-offcanvas__toggle').html('<i class="icon-up-dir"></i>');
			isOpen = true;
		} else {
			$('.js-offcanvas__toggle').html('<i class="icon-down-dir"></i>');
			isOpen = false;
		}
		
	})
	$('.js__more--toggle').click(function() {
		$('.js__more--toggle').parent().next('js__more').slideToggle();
	})
});