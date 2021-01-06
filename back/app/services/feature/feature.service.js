const FeatureModel = require('../../models/feature.model');

const FeatureService = {
	getFeatureById(featureId) {
		return FeatureModel.findById(featureId);
	},

	updateFeature(featureId, featureData) {
		return FeatureModel.findByIdAndUpdate(featureId, featureData);
	},

	createFeature(name = '', userId, projectId) {
		const newFeature = new FeatureModel({ name, projectId });
		return newFeature.save();
	},

	getProjectFeatures(projectId) {
		return FeatureModel.find({ projectId: projectId }, null, { sort: { name: 1 } });
	},
};

module.exports = FeatureService;
