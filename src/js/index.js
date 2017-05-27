import $ from 'jquery';
import './move-top';
import './easing';
import 'owl.carousel';

import 'owl.carousel/dist/assets/owl.carousel.css';
import 'bootstrap/dist/css/bootstrap.css';
import '../css/style.css';

function hideURLbar() {
	window.scrollTo(0, 1);
}

$(function () {
	/*
	var defaults = {
		containerID: 'toTop', // fading element id
		containerHoverID: 'toTopHover', // fading element hover id
		scrollSpeed: 1200,
		easingType: 'linear'
	};
	*/
	setTimeout(hideURLbar, 0);
	$('.scroll').click(function (event) {
		event.preventDefault();
		$('html,body').animate({
			scrollTop: $(this.hash).offset().top,
		}, 1000);
	});
	$('#owl-demo, #owl-demo1').owlCarousel({
		items: 1,
		lazyLoad: true,
		autoPlay: true,
		navigation: false,
		navigationText: false,
		pagination: true,
	});
	$().UItoTop({
		easingType: 'easeOutQuart',
	});
});
