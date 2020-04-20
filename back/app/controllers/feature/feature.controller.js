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
			})
	},

	getAllScenariosByFeature : (req, res) => {
		return BoardService.getScenarioByFeatureId(req.params.featureId)
			.then((dbScenarios) => {
				res.json(dbScenarios);
			})
			.catch((error) => {
				res.status(400).send(error.message);
			})
  }
};

module.exports = FeatureController;
