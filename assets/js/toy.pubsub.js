/*! pubsub */

/*
File: pubsub.js
	pub/sub messaging system (library independent)
	Based on jQuery pub/sub plugin by Peter Higgins (dante@dojotoolkit.org)
	LG: Amended so you can overload the pub function rather than put the variables in an array
		Change priority of the if statement to test fs.CONFIG first.
*/

// essential variables
if (!fs) { var fs = {}; }
if (!testMode) { var testMode = {}; }

(function(m, t){
	// the topic/subscription hash
	var cache = t.cache || {};

	m.pub = function(topic){
		var args = Array.prototype.slice.call(arguments); // converts arguments to an array;
		args.shift(); // pop the topic from the first item.



		if (fs.CONFIG.pubLogs && topic.indexOf('/log') !== 0) { log('********** PUB',topic,args); }

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

		if(!cache[topic]){ return false }
		var fns = cache[topic],
			x = 0;
		for (x; x < fns.length; x++){
			fns[x].apply(m, args || []);
			// (function(fn){
			// 	fn.apply(m,args || []);
			// })(fns[key])
		}
		return true;
	};

	m.sub = function(/* String */topic, /* Function */callback){
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

	m.unsub = function(/* Array */handle){
		log('********** UNSUB',handle);
		// summary:
		//		Disconnect a subscribed function for a topic.
		// handle: Array
		//		The return value from a fs.msg.sub call.
		// example:
		//	|	var handle = fs.msg.sub("/something", function(){});
		//	|	fs.msg.unsub(handle);
		var t = handle[0];

		if(!cache[t]){ return false; }

		var topics = cache[t],
			x = 0;

		for (x; x < topics.length; x++){
			if(topics[x] == handle[1]){
				cache[t].splice(x, 1);
			}
		}
	};

	return m;

})(fs.msg = fs.msg || {}, testMode.msg || {});

/*! End pubsub */