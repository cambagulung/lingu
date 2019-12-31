const fs = require("fs");
const path = require("path");
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");

const { Nuxt, Builder } = require("nuxt");

const app = express();

const host = process.env.HOST || "127.0.0.1";
const port = process.env.PORT || 3000;

app.models = require("./models");

app.set("port", port);

// Import and Set Nuxt.js options
const config = require("../nuxt.config.js");
config.dev = process.env.NODE_ENV !== "production";

// All the server-side stuff before rendering Nuxt!
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(bodyParser.json());

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60000
    }
  })
);

function loadApss(dir, app = null) {
  const dirApp = app || express();

  fs.readdirSync(dir, {
    withFileTypes: true
  })

    .filter(
      file =>
        file.isDirectory() ||
        (file.name.indexOf(".") !== 0 && file.name.slice(-3) === ".js")
    )

    .forEach(file => {
      file.path = path.join(dir, file.name);

      if (file.isDirectory()) {
        dirApp.use("/" + file.name, loadApss(file.path));
      } else {
        const fileApp = express();
        require(file.path)(fileApp);
        dirApp.use(
          "/" + file.name.substring(0, file.name.lastIndexOf(".js")),
          fileApp
        );
      }
    });

  return dirApp;
}

async function start() {
  // Loading subApps
  loadApss(path.join(__dirname, "apps"), app);

  // Init Nuxt.js
  const nuxt = new Nuxt(config);

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  } else {
    await nuxt.ready();
  }

  // Give nuxt middleware to express
  app.use(nuxt.render);

  // Listen the server
  app.listen(port, host);
  console.log("Server listening on http://" + host + ":" + port); // eslint-disable-line no-console
}

start();
