function subApp(app) {
  app.get("/world", (req, res) => res.json("Halo World"));
}

module.exports = subApp;
