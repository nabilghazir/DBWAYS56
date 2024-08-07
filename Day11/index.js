const express = require("express");
const app = express();
const path = require("path");
const port = 3002;

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "/assets/views"));

app.use("/assets", express.static(path.join(__dirname, "/assets")));

app.use(express.urlencoded({ extended: false }));

let data = [];

app.get("/", home);
app.get("/add-project", viewProject);
app.post("/add-project", addProject);
app.get("/my-project-detail/:id", projectDetail);
app.get("/contact-me", contactme);
app.get("/testimonial", testimonial);

function home(req, res) {
  res.render("index", { data });
}

function viewProject(req, res) {
  res.render("addproject");
}

function addProject(req, res) {
  const {
    projectname,
    startdate,
    enddate,
    desc,
    nodejs,
    javascript,
    reactjs,
    android,
  } = req.body;

  console.log("Project name:", projectname);
  console.log("Start Date:", startdate);
  console.log("End Date:", enddate);
  console.log("Description :", desc);
  console.log("Node JS:", nodejs ? true : false);
  console.log("JavaScript:", javascript ? true : false);
  console.log("React JS:", reactjs ? true : false);
  console.log("Android:", android ? true : false);

  const dataProject = {
    projectname,
    startdate,
    enddate,
    desc,
    technologies: {
      nodejs: nodejs ? true : false,
      javascript: javascript ? true : false,
      reactjs: reactjs ? true : false,
      android: android ? true : false,
    },
  };

  data.unshift(dataProject);
  console.log("Data success!", data);

  res.redirect("/");
}

function projectDetail(req, res) {
  const { id } = req.params;

  const detail = data[id];

  console.log("Project detail terpenuhi", detail);

  res.render("myproject-detail", { detail });
}

function testimonial(req, res) {
  res.render("testimonial");
}

function contactme(req, res) {
  res.render("contact");
}

app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});
