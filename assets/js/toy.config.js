// config first kids...

// let's talk about namespacing. Ours is toy. If you want another one... well that's for you to work out. At the moment.

var toy = {},
	
	

toy.CONFIG = {
	isDev : true, // putting this in development mode will turn on all console logs.
	pubLogs : true,
	paths : {
		/* NB - always include trailing slash on paths. Relative and absolute paths are valid. */
		templates : ['assets/html/'],
		js : ['assets/js/'],
		libs : ['assets/js/libs']
	},
	revision : 1 // this is for some basic cache busting shizzle. 
};
