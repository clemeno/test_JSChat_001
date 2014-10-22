'use strict';

/**
 * @ngdoc function
 * @name testJschat001App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the testJschat001App
 */
angular.module(	'testJschat001App'	)
	.controller(	'MainCtrl',	function(	$scope,	socket	)	{
		//	view data
		$scope.messages	=	[];	//	message	=	{	_id:	MongoDBgeneratedID,	usename:	givenUsername,	message:	givenMessage	}

		//	RECV part: control server events
		socket.on(	'message:previousMessages',	function(	previousMessages	)	{
			previousMessages.forEach(	function(	previousMessage	)	{
				$scope.messages.push(	previousMessage	);
			});
		});

		socket.on(	'message:messageAdded',	function(	newMessage	)	{
			$scope.messages.push(	newMessage	);
		});	//	was on new message added
		socket.on(	'message:messageDeleted',	function(	deletedMessage	)	{
			$scope.messages.splice(	deletedMessage.index,	1	);
		});

		//	SEND part: control view events
		$scope.addMsg	=	function()	{
			var	bEmptyMsg	=	(	!$scope.msg	||	$scope.msg.trim().length	===	0	);
			if	(	!bEmptyMsg	)	{
				var	bEmptyUsername	=	(	!$scope.username	||	$scope.username.trim().length	===	0	);
				if	(	!!bEmptyUsername	)	{	$scope.username	=	'John Bob';	}

				socket.emit(	'message:addMessage',	{	username:	$scope.username,	message:	$scope.msg	}	);
				$scope.msg	=	'';

				if	(	!!bEmptyUsername	)	{	$scope.username	=	'';					}
			}
		};
		$scope.removeMsg	=	function(	index,	id	)	{
			socket.emit(	'message:deleteMessage',	{	index:	index,	_id:	id	}	);
		};
	}).filter(	'reverse',	function()	{
		return function(	items	)	{
			return items.slice().reverse();
		};
	});
