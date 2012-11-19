

/*! pubsub */
/*
	TO DO
	JSLint 
	Pass context of initialising event through the pubsub system
	Ensure unsub works as expected
	Ensure you can overload 
	Work with Node.js to pass back / forth to server (would we have to write native socket handling shizzle?)
	* Would it be possible / useful to be able to subscribe many callback functions to one event - or should we simply subscribe many times?
	* Is a N to 0 iteration over an array really faster than 0 to N?
	Put better comments in  :)
*/

/*
File: pubsub.js
	pub/sub messaging system (library independent)
	Based on jQuery pub/sub plugin by Peter Higgins (dante@dojotoolkit.org)
	LG: Amended so you can overload the pub function rather than put the variables in an array
		Change priority of the if statement to test fs.CONF
		 first.
*/

/*
	TODO:
		Create some kind of default binding, so that any element with a attribute of data-pub will automatically just publish some data
*/

(function(me, undefined){
	"Use strict";

	// the topic/subscription hash
	var cache = {};

	me.pub = function(topic){
		var args = [].slice.call(arguments); // converts arguments to an array;
		args.shift(); // pop the topic from the first item. 

		// summary: 
		//		Publish some data on a named topic.
		// topic: String
		//		The channel to publish on
		//
		// example:
		//		Publish stuff on '/some/topic'. Anything subscribed will be called
		//		with a function signature like: function(a,b,c){ ... }
		//
		//	|		fs.msg.pub("/some/topic", 'as', 'many', ['variables', 'as'], {'you' : 'like'});

		//toy.log.console('_M.pub' + topic);

		if(!cache[topic]){ return false; }
		var fns = cache[topic],
			x = 0;
		for (x; x < fns.length; x++){
			fns[x].apply(me, args || []);
		}

		return true;
	};

	me.sub = function(/* String */topic, /* Function */callback){
		//log('********** SUB',topic);
		// summary:
		//		Register a callback on a named topic.
		// topic: String
		//		The channel to subscribe to
		// callback: Function
		//		The handler event. Anytime something is fs.msg.pub'ed on a 
		//		subscribed channel, the callback will be called with the
		//		published array as ordered arguments.
		//
		// returns: Array
		//		A handle which can be used to unsubscribe this particular subscription.
		//	
		// example:
		//	|	fs.msg.sub("/some/topic", function(a, b, c){ /* handle data */ });
		//
		if(!cache[topic]){ cache[topic] = []; }
		cache[topic].push(callback);
		return [topic, callback]; // Array
	};

	me.unsub = function(/* string */handle, /* Function */ callback ){
		// summary:
	    //		Disconnect a subscribed function for a topic.
	    //      
		// handle: string
	    //		the return handle for the fs.msg.sub call.
	    // callback : function 
	    //      the function for a specific match. If not supplied, all matching functions will be unsubscribed
	    
		// example:
		//	|	var handle = fs.msg.sub("/something", function(){});
	    //	|	fs.msg.unsub(handle);

	    if (!cache[handle] || cache[handle].length <= 0) { // if it's not in the cache, no point trying to unsubscribe anything right?
	        return false; // because there's nothing to unbind
	    }

		var topics = cache[handle],
			x = 0;
	    
		for (x; x < topics.length; x++){
			if(topics[x] == callback){
				cache[handle].splice(x, 1);
			}
		}
	    return true; // has successfully unbound
	};

	//return me;

})($M = {});