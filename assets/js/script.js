$(function() {

    $('.navbar-toggle').click(function() {
        $(this).toggleClass('act');
            if($(this).hasClass('act')) {
                $('.main-menu').addClass('act');
            }
            else {
                $('.main-menu').removeClass('act');
            }
    });

    //jQuery for page scrolling feature - requires jQuery Easing plugin
    $(document).on('click', '.page-scroll a', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1000, 'easeInOutExpo');
        event.preventDefault();
    });

    // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '.site-header',
        offset: 10
    });

	/* Progress bar */
    var $section = $('.section-skills');
    function loadDaBars() {
	    $('.progress .progress-bar').progressbar({
	        transition_delay: 500
	    });
    }
    
    $(document).bind('scroll', function(ev) {
        var scrollOffset = $(document).scrollTop();
        var containerOffset = $section.offset().top - window.innerHeight;
        if (scrollOffset > containerOffset) {
            loadDaBars();
            // unbind event not to load scrolsl again
            $(document).unbind('scroll');
        }
    });

    /* Counters  */
    if ($(".section-counters .start").length>0) {
        $(".section-counters .start").each(function() {
            var stat_item = $(this),
            offset = stat_item.offset().top;
            $(window).scroll(function() {
                if($(window).scrollTop() > (offset - 1000) && !(stat_item.hasClass('counting'))) {
                    stat_item.addClass('counting');
                    stat_item.countTo();
                }
            });
        });
    };

	// another custom callback for counting to infinity
	$('#infinity').data('countToOptions', {
		onComplete: function (value) {
		  count.call(this, {
		    from: value,
		    to: value + 1
		  });
		}
	});

	$('#infinity').each(count);

	function count(options) {
        var $this = $(this);
        options = $.extend({}, options || {}, $this.data('countToOptions') || {});
        $this.countTo(options);
    }

    // Navigation overlay
    var s = skrollr.init({
            forceHeight: false,
            smoothScrolling: false,
            mobileDeceleration: 0.004,
            mobileCheck: function() {
                //hack - forces mobile version to be off
                return false;
            }
    });
    
});

document.addEventListener('DOMContentLoaded', function() {
    const galleryScroll = document.querySelector('.gallery-wrapper');
    const images = document.querySelectorAll('.gallery-item');

    // Set the width of the gallery scroll based on the number of images
    const totalWidth = images.length * 14; // Assuming each image takes 100% width
    galleryScroll.style.width = totalWidth + '%';

    // Function to animate individual images
    function animateImages() {
        images.forEach((image, index) => {
            image.style.animation = `scroll-left 10s linear infinite ${index * 0.5}s`;
        });
    }

    animateImages();
});

document.addEventListener('DOMContentLoaded', function() {
    const themeSwitch = document.getElementById('themeSwitch');
    const heroSection = document.getElementById('hero'); // Select the hero section
    // const logo = document.getElementById('site-logo'); // Select the logo
    const body = document.body; // Save the body element in a variable
    const frontEndIcon = document.querySelector('.front-end-icon'); // Select the front-end icon
    const backEndIcon = document.querySelector('.back-end-icon'); // Select the back-end icon
    const travelIcon = document.getElementById('travel-icon'); // Select the travel icon

    // Check for saved user preference
    if (localStorage.getItem('dark-mode') === 'enabled') {
        document.body.classList.add('dark-mode');
        heroSection.style.backgroundImage = "url('assets/img/heroDark.png')"; // Set dark mode background for hero section
        body.style.backgroundImage = "url('assets/img/heroDark.png')"; // Set dark mode background for body
        // logo.src = "assets/img/logoWhite.png"; // Change logo to white version
        themeSwitch.checked = true; // Set switch to checked
        updateServiceIcons(true); // Update icons for dark mode
    }

    themeSwitch.addEventListener('change', function() {
        const isDarkMode = document.body.classList.toggle('dark-mode'); // Toggle dark mode and store the state

        // Change background image and logo based on dark mode status
        if (isDarkMode) {
            localStorage.setItem('dark-mode', 'enabled');
            heroSection.style.backgroundImage = "url('assets/img/heroDark.png')"; // Set dark mode background for hero section
            body.style.backgroundImage = "url('assets/img/heroDark.png')"; // Set dark mode background for body
            // logo.src = "assets/img/logoWhite.png"; // Change logo to white version
        } else {
            localStorage.setItem('dark-mode', 'disabled');
            heroSection.style.backgroundImage = "url('assets/img/hero.jpg')"; // Set light mode background for hero section
            body.style.backgroundImage = "url('assets/img/hero.jpg')"; // Set light mode background for body
            // logo.src = "assets/img/logo.png"; // Change logo back to original version
        }

        updateServiceIcons(isDarkMode); // Update icons based on the current mode
    });

    function updateServiceIcons(isDarkMode) {
        if (isDarkMode) {
            frontEndIcon.src = 'assets/img/front-end-white.svg'; // Change to white icon
            backEndIcon.src = 'assets/img/back-end-white.svg'; // Change to white icon
            travelIcon.src = 'assets/img/consultancyWhite.svg'; // Change to white icon
        } else {
            frontEndIcon.src = 'assets/img/front-end.svg'; // Change back to original icon
            backEndIcon.src = 'assets/img/back-end.svg'; // Change back to original icon
            travelIcon.src = 'assets/img/consultancy.svg'; // Change to white icon
        }
    }
});
