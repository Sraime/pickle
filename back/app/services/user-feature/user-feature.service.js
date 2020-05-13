const FeatureModel = require('../../models/feature.model');

const UserFeatureService = {
  getUserFeatures(userId) {
    return FeatureModel.find({userId: userId}, null, {sort: {name: 1}});
  }
}

module.exports = UserFeatureService;