var express = require('express'),
	router 	= express.Router(),
	mongojs	= require('mongojs'),
	db 		= mongojs('mongodb://mongodb:mongodb@ds131137.mlab.com:31137/tasklist',['tasks'])


//Get all tasks
router.get('/tasks', function(req,res,next) {
	db.tasks.find(function(error, tasks){
		if (error) 
			res.send(error);
		res.json(tasks);
	});
});

//Get single task
router.get('/tasks/:id', function(req,res,next) {
	db.tasks.findOne({_id: mongojs.ObjectId(req.params.id)},function(error, task){
		if (error) 
			res.send(error);
		res.json(task);
	});
});

//Save task
router.post('/task', function(req,res,next) {
	var task = req.body;
	if (!task.title || (task.isDone + '')) {
		res.status(400);
		res.json({
			"error": "Bad Data"
		})
	}
	else {
		db.tasks.save(task, function(error,task){
			if (error)
				res.send(error);
			res.json(task);
		});
	}
});

//Delete Task
router.delete('/tasks/:id', function(req,res,next) {
	db.tasks.remove({_id: mongojs.ObjectId(req.params.id)},function(error, task){
		if (error) 
			res.send(error);
		res.json(task);
	});
});

//Update Task
router.put('/tasks/:id', function(req,res,next) {
	var task = req.body;
	var UpdateTask = {};
	if (task.isDone)
		UpdateTask.isDone = task.isDone;
	if (task.title)
		UpdateTask.title = task.title;
	if (!UpdateTask) {
		res.status(400);
		res.json({
			"error": "Bad Data"
		})
	}
	else {
		db.tasks.update({_id: mongojs.ObjectId(req.params.id)},UpdateTask,{},function(error, task){
			if (error) 
				res.send(error);
			res.json(task);
		});		
	}

});

module.exports = router;