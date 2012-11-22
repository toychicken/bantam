/*
	Assuming that the format for the messaging should be:
	
	bantam.sub('/namespace/topic', function (){});
	bantam.pub('/namespace/topic', [arguments...]);
	bantam.unsub('/namespace/topic') // unsub all
	bantam.unsub('/namespace/topic', function (){}); // unsub specific.

*/
var	g = {},
	func = function (msg) {
		var out = msg || false;
		console.log('func msg = ', out);
		g.msg = out;
	},
	swch = function () {
		var args = [].slice.call(arguments); // converts arguments to an array;
		for (var i = args.length - 1; i >= 0; i--) {
			g.arr[i] = args[i] || false;
		}; 
	},
	reset = function (){
		g = {
			arr : [false, false, false],
			msg : false
		}
		return true;
	};
reset();

module("Test functions", {
	setup : reset
});

test("Check basic messaging function", function (){
	ok(g.msg === false, 'msg starts as false');
	func(true);
	ok(g.msg, "msg is now true");
});

test("Check array", function (){
	for (var i = g.arr.length - 1; i >= 0; i--) {
		ok(g.arr[i] === false, 'arr[' + i + '] is now false');
	};
	deepEqual(g.arr, [false, false, false], 'check deepEqual');

});

test("Check modify array", function (){
	g.arr[0] = true;
	deepEqual(g.arr , [true, false, false]);

});

test("Check swch()", function (){
	swch(true, 'sausage');
	deepEqual(g.arr , [true, 'sausage', false], 'swch successfully modified first 2 values');
	swch(true, true, true, true, true);
	ok(g.arr.length === 5, 'swch added new values');
	deepEqual(g.arr, [true, true, true, true, true], 'swch correctly set all values to true');
});



module("Subscribing", {
	setup : reset
});

test("If I fail to pass a callback, I expect a false state or error", function (){
	var sub2 = bantam.sub('/test/two');
	ok(sub2 === false);
});

test("Stuff I expect when making a subscription", function () {
	// subscribe to one event
		// should return a tuple of [topic, callback]
	var sub1 = bantam.sub('/test/one', func);
	ok(sub1.length === 2, 'It\'s a tuple!');
	ok(sub1[0] === '/test/one', 'It\'s the same \'/namespace/topic\' that I passed as the subscription handler');
	ok(sub1[1] === func, 'It\'s the same function, that I passed as a callback');
	bantam.pub('/test/one');
});

module('Unsubscribing', {
	setup : {
		reset();
		bantam.sub('/unsub/one', func);
		bantam.sub('/unsub/two', function () {console.log('unsubbed', arguments); })
	}
	checkUnsub : function () {console.log('unsubbed', arguments); },
	badUnsub : function () {console.log('shouldnt unsub me', arguments); }
});

module('Publishing' {
	setup : function () {
		reset();
		bantam.sub('/test/publish', func);
	},
	teardown : function () {
		bantam.unsub('/test/publish', func);
	}
});
test("Publishing", function () {
	// publish an event with only namespace/topic
	// publish an event with namespace/topic & callback;
});
test("Unsubscribing", function () {});


module("Advanced functions");
test("Event context referral", function () {

});
test("Subscribing to remote events", function () {

});
test("Publishing to remote subsribers", function () {

});