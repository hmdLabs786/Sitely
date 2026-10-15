/**
 * Sitely Interactive Scripts
 * Powered by Wuaze Studio
 */

$(function () {
    "use strict";

    // 1. Header Sticky Scroll State
    function updateHeader() {
        if ($(window).scrollTop() >= 50) {
            $("header").addClass("fixed-header");
        } else {
            $("header").removeClass("fixed-header");
        }
    }
    $(window).on("scroll", updateHeader);
    updateHeader();

    // 2. Featured Projects Carousel
    var $projectCarousel = $('.featured-projects-slider .owl-carousel');
    if ($projectCarousel.length) {
        $projectCarousel.owlCarousel({
            center: true,
            loop: true,
            margin: 28,
            nav: false,
            dots: true,
            autoplay: true,
            autoplayTimeout: 4500,
            autoplayHoverPause: true,
            smartSpeed: 600,
            responsive: {
                0: {
                    items: 1,
                    center: false,
                    margin: 16
                },
                640: {
                    items: 2,
                    center: false,
                    margin: 20
                },
                1024: {
                    items: 3,
                    center: true,
                    margin: 24
                },
                1280: {
                    items: 4,
                    center: true,
                    margin: 28
                }
            }
        });
    }

    // 3. Animated Number Counters
    var counted = false;
    function triggerCounters() {
        if ($('.count').length && !counted) {
            var oTop = $('.count').first().offset().top - window.innerHeight;
            if ($(window).scrollTop() > oTop) {
                $('.count').each(function () {
                    var $this = $(this);
                    var target = parseInt($this.attr('data-target') || $this.text(), 10);
                    if (!isNaN(target)) {
                        $({ countNum: 0 }).animate({
                            countNum: target
                        }, {
                            duration: 1400,
                            easing: 'swing',
                            step: function () {
                                $this.text(Math.floor(this.countNum));
                            },
                            complete: function () {
                                $this.text(this.countNum);
                            }
                        });
                    }
                });
                counted = true;
            }
        }
    }
    $(window).on("scroll", triggerCounters);
    triggerCounters();

    // 4. Smooth Scroll for Anchor Links
    $('a[href^="#"]').on('click', function (e) {
        var target = $(this.getAttribute('href'));
        if (target.length) {
            e.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 90
            }, 600);
        }
    });

    // 5. Scroll-to-Top Button
    var $scrollBtn = $("#scrollToTopBtn");
    if ($scrollBtn.length) {
        $(window).on("scroll", function () {
            if ($(this).scrollTop() > 300) {
                $scrollBtn.fadeIn(300).css("display", "flex");
            } else {
                $scrollBtn.fadeOut(300);
            }
        });

        $scrollBtn.on("click", function (e) {
            e.preventDefault();
            $("html, body").animate({ scrollTop: 0 }, 600);
        });
    }

    // 6. Interactive Contact Form Handler with Validation and User Feedback
    $("form.sitely-contact-form, .get-in-touch form").on("submit", function (e) {
        e.preventDefault();
        var $form = $(this);
        var $btn = $form.find("button[type='submit']");
        var $name = $form.find("input[type='text']");
        var $email = $form.find("input[type='email']");
        var $msg = $form.find("textarea");

        // Validate basic inputs
        if (!$name.val().trim() || !$email.val().trim() || !$msg.val().trim()) {
            alert("Please fill in your name, email address, and project details.");
            return;
        }

        // Button state
        var originalText = $btn.find(".btn-text").text();
        $btn.prop("disabled", true).find(".btn-text").text("Sending message...");

        // Simulate delivery & display confirmed alert
        setTimeout(function () {
            $btn.prop("disabled", false).find(".btn-text").text(originalText);
            
            // Check if alert container exists or create one
            var $feedback = $form.find(".form-feedback-alert");
            if (!$feedback.length) {
                $feedback = $('<div class="form-feedback-alert success mt-4 p-4 rounded-3 border"></div>');
                $form.append($feedback);
            }

            $feedback.html(
                '<div class="d-flex align-items-start gap-3">' +
                '  <iconify-icon icon="lucide:check-circle" class="fs-7 text-primary flex-shrink-0 mt-1"></iconify-icon>' +
                '  <div>' +
                '    <h5 class="mb-1 fw-bold text-dark">Message Received!</h5>' +
                '    <p class="mb-2 text-dark opacity-85">Thank you, ' + $('<div>').text($name.val().trim()).html() + '! Your inquiry has been logged. Our engineering and design team will review your requirements and respond at <strong>' + $('<div>').text($email.val().trim()).html() + '</strong> promptly.</p>' +
                '    <p class="mb-0 fs-3 text-muted">Direct contact: <a href="mailto:habban.madani786@gmail.com" class="text-primary fw-bold">habban.madani786@gmail.com</a></p>' +
                '  </div>' +
                '</div>'
            ).fadeIn(300);

            // Reset form inputs
            $name.val('');
            $email.val('');
            $msg.val('');
        }, 800);
    });

    // 7. Initialize AOS Animations
    if (typeof AOS !== 'undefined') {
        AOS.init({
            once: true,
            duration: 800,
            offset: 80
        });
    }
});
