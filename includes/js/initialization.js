// console.log('init');
// console.log('----');

//TESTING STORE2

//clearing localstorage during development, remove this line when testing.
store.clear();

//if there's no db info, create the defaults: a couple of modules, each with content and soulFields
if (!store.get("database")) {
	console.log("no database found. creating database...");
	store("database", {
		modules: [
			{
				id: "1",
				mainEditorContent:
					'<p class="bg-blue-900 text-white py-24 px-8">Hello, I am module 1!</p>',
				mainEditorTextarea:'',
				mainEditorInstance:'',
				mergedEditorContent:
					'<p class="bg-blue-900 text-white py-24 px-8">Hello, I am module 1!</p>',
				mergedEditorTextarea:'',
				mergedEditorInstance:'',
				soulFields: {
					"{{greeting}}": "Hey There Bruh",
					"{{bg-color}}": "bg-blue-900"
				}
			},
			{
				id: "2",
				mainEditorContent:
					'<p class="bg-blue-200 text-black py-24 px-8">Hello, I am module 2!</p>',
				mainEditorTextarea:'',
				mainEditorInstance:'',
				mergedEditorContent:
					'<p class="bg-blue-200 text-black py-24 px-8">Hello, I am module 2!</p>',
				mergedEditorTextarea:'',
				mergedEditorInstance:'',
				soulFields: {
					"{{greeting}}": "Hey There Dude",
					"{{bg-color}}": "bg-blue-800"
				}
			},
			{
				id: "3",
				mainEditorContent:
					'<p class="bg-white text-black py-24 px-8">Hello, I am module 3!</p>',
				mainEditorTextarea:'',
				mainEditorInstance:'',
				mergedEditorContent:
					'<p class="bg-white text-black py-24 px-8">Hello, I am module 3!</p>',
				mergedEditorTextarea:'',
				mergedEditorInstance:'',
				soulFields: {
					"{{greeting}}": "Hey There Dude",
					"{{bg-color}}": "bg-blue-800"
				}
			},
			{
				id: "4",
				mainEditorContent:
					'<p class="bg-black text-white py-24 px-8">Hello, I am module 4!</p>',
				mainEditorTextarea:'',
				mainEditorInstance:'',
				mergedEditorContent:
					'<p class="bg-black text-white py-24 px-8">Hello, I am module 4!</p>',
				mergedEditorTextarea:'',
				mergedEditorInstance:'',
				soulFields: {
					"{{greeting}}": "Hey There Dude",
					"{{bg-color}}": "bg-blue-800"
				}
			}
		]
	});
} else {
	console.log("existing database found.");
}

//store what you've fetched in a variable that you can read/write to, while keeping the actual db query intact in case you need to cancel your changes and revert to what was last saved. Module/layout saves will update this variable
window.mobius = store().database;

//loop through the db and create the modules inside newsections

const template = ({ id, mainEditorContent, mergedEditorContent }) => `
	<module id="${id}" class="relative">

	    <div class="module-toolbar">

	        <button class="drag-module cursor-move">

	            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
	                <path d="M13.28 7.78l3.22-3.22v2.69a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.69l-3.22 3.22a.75.75 0 001.06 1.06zM2 17.25v-4.5a.75.75 0 011.5 0v2.69l3.22-3.22a.75.75 0 011.06 1.06L4.56 16.5h2.69a.75.75 0 010 1.5h-4.5a.747.747 0 01-.75-.75zM12.22 13.28l3.22 3.22h-2.69a.75.75 0 000 1.5h4.5a.747.747 0 00.75-.75v-4.5a.75.75 0 00-1.5 0v2.69l-3.22-3.22a.75.75 0 10-1.06 1.06zM3.5 4.56l3.22 3.22a.75.75 0 001.06-1.06L4.56 3.5h2.69a.75.75 0 000-1.5h-4.5a.75.75 0 00-.75.75v4.5a.75.75 0 001.5 0V4.56z" />
	            </svg>

	        </button>

	        <button class="edit-module cursor-pointer" onclick="window.mobiusPanel(${id})">

	            <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
	                <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
	                <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
	            </svg>

	        </button>

	        <button class="duplicate-module cursor-pointer" onclick="alert('duplicate')">

	            <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
	                <path d="M7 3.5A1.5 1.5 0 018.5 2h3.879a1.5 1.5 0 011.06.44l3.122 3.12A1.5 1.5 0 0117 6.622V12.5a1.5 1.5 0 01-1.5 1.5h-1v-3.379a3 3 0 00-.879-2.121L10.5 5.379A3 3 0 008.379 4.5H7v-1z" />
	                <path d="M4.5 6A1.5 1.5 0 003 7.5v9A1.5 1.5 0 004.5 18h7a1.5 1.5 0 001.5-1.5v-5.879a1.5 1.5 0 00-.44-1.06L9.44 6.439A1.5 1.5 0 008.378 6H4.5z" />
	            </svg>

	        </button>

	        <button class="delete-module cursor-pointer">

	            <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
	                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
	            </svg>

	        </button>

	    </div>

	    <output class="relative" id="module-${id}-output">

	        ${mergedEditorContent}

	    </output>

	    <div class="module-${id}-tabs w-full flex flex-col hidden">

	        <ul class="hiddenx">
	            <li><a href="#module-${id}-tabs-1">Editor</a></li>
	            <li><a href="#module-${id}-tabs-2">Content</a></li>
	        </ul>

	        <div id="module-${id}-tabs-1" class="hiddenx">
	            <textarea id="module-${id}-main-textarea" class="main-textarea">${mainEditorContent}</textarea>
	            <textarea id="module-${id}-merged-textarea" class="merged-textarea">${mergedEditorContent}</textarea>
	        </div>

	        <div id="module-${id}-tabs-2" class="hiddenx">
	            <p>Styles go here!</p>
	        </div>

	    </div>

	</module>
	`;

// Add all of the database's modules to the destination element

var mobiusDestination = $(".newsections");

mobiusDestination.html(window.mobius.modules.map(template).join(""));



// Allow module sorting
Sortable.create(mobiusDestination[0], {
	handle: ".drag-module",
	animation: 300,
});

window.mobiusPanel = function (id) {
	//console.log(id);
	var tabString = ".module-" + id + "-tabs";
	//console.log($(tabString));

	$(tabString).toggleClass("hidden");
};

//MAKE TABS FOR EACH MODULE

// $.each(window.database.modules, function (key, value) {
// 	$(".module-" + value.id + "-tabs").tabs();
// });

//LIFECYCLE

// When mobius is turned on
// 1. Get the post and module data from the database as JS, build an object. Maybe replace the post content with a stack of the modules' HTML so they can be edited. Their contents will all be bundled together when you save the layout.

// 2. When a module is long-pressed, open its main editor as a panel.

// When a module is changed, update the display
// When a module is saved, update the JS objects (module content and post content) that's going to be sent back to the server on Publish. Use the JS -> localStorage -> db path?

//Since settings will be saved to localStorage, you can

// OLD IDEAS BELOW

// if (!window.database) {
// 	//if the database doesn't exist yet, set it to its defaults.

// 	window.database = {
// 		//the postContent is the sum of all of modules' mergedEditorContent.
// 		//postContent: mainEditorContent,

// 		//every module has an id, editor contents, and soulFields object so it can be populated when summoned (or lazily).
// 		//the soulfields object may need a 'type' to distinguish between input types, image uploads etc, and it also might need values for main/merged states (if its main value is a shortcode and the merged is the evaluated shortcode, for example).
// 		//consider re-evaluating the shortcode if the Soulfield is being edited.
// 		modules: {
// 			1: {
// 				mainEditorContent: "",
// 				mergedEditorContent: "",
// 				soulFieldsObject: {}
// 			}
// 		}
// 	};

// 	//localStorage.setItem("DB", JSON.stringify(defaultDB));

// 	window.mobius = {};
// }
