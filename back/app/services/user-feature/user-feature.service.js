const FeatureModel = require('../../models/feature.model');

const UserFeatureService = {
  getUserFeatures(userId) {
    return FeatureModel.find({userId: userId});
  }
}

module.exports = UserFeatureService;