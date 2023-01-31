// console.log('mirror_changes');
// console.log('----');


		//when the MAIN instance changes, trigger a change on the MAIN textarea.
		window.mainEditorInstance.on("changes", function (cm) {
			$(mainEditorTextarea).val(cm.getValue()).trigger("change");
		});

		//when the MAIN textarea changes, SANITIZE and send its value to the MERGED instance.
		$(mainEditorTextarea).on("change", function () {
			$this = $(this);
			$thisVal = $this.val();

			window.scrapeAndHydrateSoulFields($thisVal);
		});

		//when the MERGED instance changes, mirror its value to the MERGED textarea and trigger a change
		window.mergedEditorInstance.on("changes", function (cm) {
			$(mergedEditorTextarea).val(cm.getValue()).trigger("change");
		});

		//when the MERGED textarea changes, send its value to the OUTPUT container.
		$(mergedEditorTextarea).on("change", function () {
			$this = $(this);
			$thisVal = $this.val();

			//$("output").html($thisVal);
		});
	

		//Trigger an inital change on load.
		$(mainEditorTextarea).trigger("change");
