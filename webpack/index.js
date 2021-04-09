/*
Two terminal tabs.
1. cd into site folder: "jekyll serve"
2. cd from Sites like normal: "yarn build" or "yarn dev"

When webpack tosses the new JS into the jekyll assets folder, Jekyll picks it up and builds.

Aaaaand... everything in this repo will not be present in the actual repo. I have a set of 
utilities that I don't want to write a bunch of times. So I'm importing a utils file from 
somewhere in the depths of my hard drive.

There's no need to put all of this into a closure here because webpack will put the entire 
pile of stuff into a closure when it compiles the pile of stuff.
*/
import {tmc_transEnd, tmc_documentHidden, tmc_RAF, tmc_throttle, tmc_debounce, tmc_groupBy, encodeHtmlEntities, decodeHtmlEntities, tmc_splitOnTags} from '../../_vendor/tmc/tmc-utils';
import search from './search';

// Doing this through a function so we don't ask for this stuff before it exists.
let utils = (function(){
	tmc_RAF(); 										// Polyfills the window.requestAnimationFrame object.
	let ut = tmc_documentHidden();  				// returns several settings in an object
	ut.trans_end 			= tmc_transEnd();		// returns the name of the transition end event
	ut.throttle 			= tmc_throttle;
	ut.debounce 			= tmc_debounce;
	ut.groupBy 				= tmc_groupBy;
	ut.encodeHtmlEntities 	= encodeHtmlEntities;
	ut.decodeHtmlEntities 	= decodeHtmlEntities;
	ut.splitOnTags 			= tmc_splitOnTags;
	return ut;
}());


let TMC = {
	eventTasks:{
		click:[],
		keyup:[]
	},
	init: function() {
		this.addListeners();
		this.search.init(this);
	},
	addListeners: function() {

		$('body').on({
			click: (evt)=>{
				this.eventTasks.click.forEach((task)=>{
					task.apply(this, [evt]);
				});
				//if (evt.target.id === 'tmc-search-button') {
				//	this.search.run();
				//}
			},
			keyup: (evt)=>{
				//if (evt.target.id === 'tmc-search-input' && evt.keyCode === 13) {
				//	this.search.run();
				//}
				this.eventTasks.keyup.forEach((task)=>{
					task.apply(this, [evt]);
				});
			}
		});

		/*
		this.manageResize();// Once after page load.
		const tHandler = utils.debounce(250, this.manageResize);
		window.addEventListener("resize", tHandler);
		*/
	},
	manageResize: function() {
		let footerHeight = $('#main-footer').outerHeight(true);
		$('body').css('padding-bottom', footerHeight+'px');
	},
	utils,
	search
}


$(document).ready(function(){
	TMC.init();
	//console.log('TMC', TMC);
});
