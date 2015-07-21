module.exports = function (req, res, next) {
	var model = req.options.model;

	if (!model) throw "model is required for ownResource policy";

	var Model = req._sails.models[model];

	Model.findOne(req.params.id).exec(function (err, record) {
		if (!record.user) throw "model requires owner property for ownResource policy";

		if (record.user !== req.userId)
			return res.status(401).send({
				error: 'You do not have access to that resource'
			});

		req.record = record;
		next();
	})
};