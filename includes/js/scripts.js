// console.log('scripts');
// console.log('----');



(function ($) {
	
	

        var mobiusTimeOut = 0;

        //doing it with tags
        jQuery(document).on('mousedown', 'module', function(e) {
            // e.preventDefault();
            // e.stopPropagation();
            mobiusTimeOut = setTimeout(function() {
                alert('you long pressed!');
                
            }, 300);
        }).bind('mouseup', function() {
            clearInterval(mobiusTimeOut);
        });
	
	// console.log('$');
	// console.log('----');

	// window.mobius = {
	// 	modules: [
	// 		{
	// 			id: 1,
	// 			content: "",
	// 			mergedContent: ""
	// 		}
	// 	],
	// 	getTextAreaValue: function () {}
	// };

	
	var repeater = $(".repeater-default").repeater({
		initval: 1,
		hide: function (deleteElement) {
                if(confirm('Are you sure you want to delete this element?')) {
                    $(this).remove();
                }
            },
	});

	$(window).on("load", function () {
		
		//$(".module-tabs").tabs();
		
		// console.log('window load');
		// console.log('----');
		
		//whenever a soul field is changed, run the scraping function from the value of the main editor TEXTAREA to populate the merged editor INSTANCE
		$(document).on(
			"input",
			".soulfields :input",
			function () {
				window.scrapeAndHydrateSoulFields($(mainEditorTextarea).val());
			}
		);
		
		
	});
})(jQuery);
