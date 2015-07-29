/**
 * EventController
 *
 * @description :: Server-side logic for managing events
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	 schedule: function(req, res) {
        User.findOne(req.userId, function(err, user){
			 
			var event = req.body.message;
				
		 Event.create({
				title : event.title,
				allDay : event.allDay,
            	start: event.start,
				end: event.end,
				editable: event.editable,
				group: event.groupId,
				personal: user
			}).exec(function(err, event){
				 res.status(200).end();
			})
		})
	
		},
		update: function(req,res){
			
			
		},
		remove: function(req,res){
			Event.destroy({id: req.body.id}, function(err){
				if(err) return res.json({error:err}, 500);
				res.status(200).end();
			})
		}
};

