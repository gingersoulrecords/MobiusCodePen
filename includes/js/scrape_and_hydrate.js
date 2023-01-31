// console.log('scrape_and_hydrate');
// console.log('----');

window.soulFieldsObject = {};

		window.scrapeAndHydrateSoulFields = function ($thisVal) {
			window.soulFieldsObject = {};
			
			//scrape the soul fields and build the object
			$(".soulfields [data-repeater-item]").each(function () {
				$this = $(this);
				$thisLabelText = $this.find(".label").val();
				$thisInputVal = $this.find(".input").val();
				window.soulFieldsObject[$thisLabelText] = $thisInputVal;
			});

			//replace all soul field object keys with their respective values
			var re = new RegExp(Object.keys(window.soulFieldsObject).join("|"), "gi");
			$thisVal = $thisVal.replace(re, function (matched) {
				return window.soulFieldsObject[matched];
			});

			//set the MERGED editor instance's value to this new string
			window.mergedEditorInstance.setValue($thisVal);
		};