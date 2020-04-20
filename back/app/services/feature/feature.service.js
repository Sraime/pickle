const FeatureModel = require('../../models/feature.model');

const FeatureService = {
	getFeatureById(featureId) {
		return FeatureModel.findById(featureId);
	},

	updateFeature(featureId, featureData) {
		return FeatureModel.findByIdAndUpdate(featureId, featureData);
	}
};

module.exports = FeatureService;
