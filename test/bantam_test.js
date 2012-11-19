/*
	Assuming that the format for the messaging should be:
	
	$M.sub('/namespace/topic', function (){});
	$M.pub('/namespace/topic', [arguments...]);
	$M.unsub('/namespace/topic') // unsub all
	$M.unsub('/namespace/topic', function (){}); // unsub specific.

*/


module("Basic function pattern")

test("Subscribing", function () {
	// subscribe to one event
	// subscribe to many events
	// subscribe many listeners for one event
	// subscribe many listeners to many events
});

test("Publishing", function () {
	// publish an event with only namespace/topic
	// publish an event with namespace/topic & callback;
});
test("Unsubscribing", function () {});


module("Advanced functions");
test("Event context referral", function () {});
test("Subscribing to remote events", function () {});
test("Publishing to remote subsribers", function () {});