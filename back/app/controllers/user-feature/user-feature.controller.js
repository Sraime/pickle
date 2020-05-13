const UserFeatureService = require('../../services/user-feature/user-feature.service');

const UserFeatureController = {
  
  getUserFeatures: async(req, res) => {
    if(req.params.pseudo !== req.user.pseudo) {
      res.status(403).send();
      return;
    }
    const userFeatures = await UserFeatureService.getUserFeatures(req.user.id);
    res.json(userFeatures);
  }
}

module.exports = UserFeatureController;