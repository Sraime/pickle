export const environment = {
  production: true,
  api: {
    auth: {
      url: "http://pickle.prodgie.tech:3000/auth",
    },
    scenario: {
      url: "http://pickle.prodgie.tech:3000/scenario",
    },
    feature: {
      url: "http://pickle.prodgie.tech:3000/feature",
    },
    project: {
      url: "http://pickle.prodgie.tech:3000/project",
    },
    user: {
      url: "http://pickle.prodgie.tech:3000/user",
    },
  },
  socket: {
    board: {
      url: "http://pickle.prodgie.tech:3000",
    },
  },
};
