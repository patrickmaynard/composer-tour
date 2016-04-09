//Credit where due: This player code was pulled nearly wholesale from http://jsfiddle.net/M78zz/ via http://fancyapps.com/fancybox/


// Fires whenever a player has finished loading
function onPlayerReady(event) {
    event.target.playVideo();
}


// The API will call this function when the page has finished downloading the JavaScript for the player API
function onYouTubePlayerAPIReady() {
    
    // Initialise the fancyBox after the DOM is loaded
    $(document).ready(function() {
        $(".fancybox")
            .attr('rel', 'gallery')
            .fancybox({
								showCloseButton: true,
                padding     : 50,
                margin      : 50,
                beforeShow  : function() {
                    // Find the iframe ID
                    var id = $.fancybox.inner.find('iframe').attr('id');
                    
                    // Create video player object and add event listeners
                    var player = new YT.Player(id, {
                        events: {
                            'onReady': onPlayerReady,
                        }
                    });
                }
            });
    });
    
}
