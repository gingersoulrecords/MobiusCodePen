// console.log('create_codemirrors');
// console.log('----');

CodeMirror.defineMode("mobius", function (config, parserConfig) {
	var mobiusOverlay = {
		token: function (stream, state) {
			var ch;
			if (stream.match("{{")) {
				while ((ch = stream.next()) != null)
					if (ch == "}" && stream.next() == "}") {
						stream.eat("}");
						return "mobius";
					}
			}
			while (stream.next() != null && !stream.match("{{", false)) {}
			return null;
		}
	};
	return CodeMirror.overlayMode(
		CodeMirror.getMode(config, parserConfig.backdrop || "text/html"),
		mobiusOverlay
	);
});

// window.mainEditorTextarea = $(".main-textarea")[0];
// window.mergedEditorTextarea = $(".merged-textarea")[0];

//     window.mainEditorTextarea = document.querySelectorAll(".main-textarea")[0];
//     window.mergedEditorTextarea = document.querySelectorAll(".merged-textarea")[0];

// 		window.mainEditorInstance = CodeMirror.fromTextArea(mainEditorTextarea, {
// 			lineNumbers: true,
// 			mode: "mobius",
// 			theme: "twilight",
// 			lineWrapping: true,
// 			autoRefresh: true
// 		});

// 		window.mergedEditorInstance = CodeMirror.fromTextArea(
// 			mergedEditorTextarea,
// 			{
// 				lineNumbers: true,
// 				mode: "htmlmixed",
// 				theme: "twilight",
// 				lineWrapping: true,
// 				autoRefresh: true
// 			}
// 		);

//////  NEW

//Loop through each module and make mirrors and changes happen
$.each(window.mobius.modules, function (key, value) {
	//assigning this to self so we can reference it inside onchange/oninput event handlers.
	var self = this;
	var id = value.id;
	var $mainTextArea = $("#module-" + id + "-main-textarea");
	var $mergedTextArea = $("#module-" + id + "-merged-textarea");
	var $outputContainer = $("#module-" + id + "-output");


	//main
	self.mainTextarea = $mainTextArea[0];
	self.mainEditorInstance = CodeMirror.fromTextArea(this.mainTextarea, {
		lineNumbers: true,
		mode: "mobius",
		theme: "twilight main",
		lineWrapping: true,
		autoRefresh: true
	});

	//merged
	self.mergedTextarea = $mergedTextArea[0];
	self.mergedEditorInstance = CodeMirror.fromTextArea(this.mergedTextarea, {
		lineNumbers: true,
		mode: "htmlmixed",
		theme: "twilight merged",
		lineWrapping: true,
		autoRefresh: true
	});

	//mirror changes

	//when the MAIN instance changes, trigger a change on the MAIN textarea.
	self.mainEditorInstance.on("changes", function (cm) {
		//console.log('module #'+id+' main editor instance changed.');
		$mainTextArea.val(cm.getValue()).trigger("change");
	});

	//when the MAIN textarea changes, SANITIZE and send its value to the MERGED instance.
	//for now, we're just going to send the unsanitized value.
	$mainTextArea.on("change", function () {
		//window.scrapeAndHydrateSoulFields($thisVal);
		self.mergedEditorInstance.setValue($mainTextArea.val());
	});
	
			//when the MERGED instance changes, mirror its value to the MERGED textarea and trigger a change
		self.mergedEditorInstance.on("changes", function (cm) {
			$mergedTextArea.val(cm.getValue()).trigger("change");
		});
	
			//when the MERGED textarea changes, send its value to the OUTPUT container.
		$mergedTextArea.on("change", function () {
			$this = $(this);
			$thisVal = $this.val();

			$outputContainer.html($thisVal);
		});
	
	//trigger a change on load (might not be necessary)
	$mainTextArea.trigger('change');
	
	//make tabs happen
	$('.module-'+ id +'-tabs').tabs();
	
	
});
