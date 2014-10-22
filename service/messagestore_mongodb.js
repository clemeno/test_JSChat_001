var	app					=	require(	'express'		)();
var	http				=	require(	'http'			).Server(	app	);
var	io					=	require(	'socket.io'	)(	http	);
var	mongodb			=	require(	'mongodb'		);
var	monk				=	require(	'monk'			);
var	db					=	monk(	'localhost:27017/test'	);
var	collection	=	db.get(	'testData'	);

http.listen(	8989,	function()	{
	console.log(	'MongoDB link service ready (port 8989)'	);
});	//	was http listen 8989

io.on(	'connection',	function(	socket	)	{
	console.log(	'new client connected'	);

	collection.find(	{},	function(	err,	storedMessages	)	{
		if(	!err	)	{
			console.log(	storedMessages	);
			socket.emit(	'previousMessages',	storedMessages	);
			console.log(	'previous messages sent'	);
		}	else	{
			console.log(	'ERROR: '	+	err	);
		}
	});	//	was get data from base

	socket.on(	'addMessage',	function(	messageToAdd	)	{
		collection.insert(	messageToAdd,	function(	err,	storedMessage	)	{
			if(	!err	)	{
				io.sockets.emit(	'messageAdded',	storedMessage	);
				console.log(
					'new message added: "'	+	storedMessage.message	+
					'" by '	+	storedMessage.username	+
					'	_id:	'	+	storedMessage._id
				);
			}	else	{
				console.log(	'ERROR: '	+	err	);
			}
		});	//	was store message entry in testData
	});	//	was adding a new message

	socket.on(	'deleteMessage',	function(	indexAndID	)	{
		collection.remove(	{	"_id"	:	indexAndID._id	},	function()	{
			io.sockets.emit(	'messageDeleted',	{	index:	indexAndID.index	}	);
		});
	});

	socket.on(	'disconnect',	function()	{
		console.log(	'client disconnected'	);
	});
});
