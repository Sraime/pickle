const FeatureService = require('../../services/feature/feature.service');
const BoardService = require('../../services/board/board.service');

const FeatureController = {
	getFeature: (req, res) => {
		return FeatureService.getFeatureById(req.params.featureId)
			.then((result) => {
				if (!result) {
					res.status(404).send('feature does not exist');
				}
				res.json(result);
			})
			.catch((error) => {
				res.status(400).send(error.message);
			});
	},

	getAllCodeblocksByFeature: (req, res) => {
		return BoardService.getCodeblocksByFeatureId(req.params.featureId)
			.then((dbCodeblocks) => {
				res.json(dbCodeblocks);
			})
			.catch((error) => {
				res.status(400).send(error.message);
			});
	},

	addNewFeature: (req, res) => {
		const userId = req.user.id;
		return FeatureService.createFeature(req.body.name, userId)
			.then((createdFeature) => {
				res.json(createdFeature);
			})
			.catch((error) => {
				res.status(400).send();
			});
	},
};

module.exports = FeatureController;
