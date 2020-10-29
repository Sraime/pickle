const FeatureModel = require('../../models/feature.model');

const FeatureService = {
	getFeatureById(featureId) {
		return FeatureModel.findById(featureId);
	},

	updateFeature(featureId, featureData) {
		return FeatureModel.findByIdAndUpdate(featureId, featureData);
	},

	createFeature(name = '', userId) {
		const newFeature = new FeatureModel({ name, userId });
		return newFeature.save();
	},
};

module.exports = FeatureService;
