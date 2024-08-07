const express = require("express");
const path = require("path");
const { Sequelize, QueryTypes } = require("sequelize");
const config = require("./config/config.json");
const { error } = require("console");
const sequelize = new Sequelize(config.development);

const app = express();

const port = 3002;

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "/assets/views"));

app.use("/assets", express.static(path.join(__dirname, "/assets")));

app.use(express.urlencoded({ extended: false }));

let data = [];

app.get("/", home);
app.get("/add-project", viewProject);
app.post("/add-project", addProject);
app.get("/edit-project/:id", viewEdit);
app.post("/edit-project", editProject);
app.post("/delete-project", deleteProject);
app.get("/my-project-detail/:id", projectDetail);
app.get("/contact-me", contactme);
app.get("/testimonial", testimonial);

function home(req, res) {
  res.render("index", { data });
}

async function home(req, res) {
  try {
    const query = `SELECT * FROM "projects"`;

    const obj = await sequelize.query(query, { type: QueryTypes.SELECT });
    res.render("index", { data: obj });
  } catch (error) {
    console.log(error);
  }
}

function viewProject(req, res) {
  res.render("addproject");
}

async function addProject(req, res) {
  try {
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

    const date = new Date();
    const datemodif = date.toISOString().slice(0, 16).replace("T", " ");

    const startd = new Date(startdate);
    const endd = new Date(enddate);

    const startYear = startd.getFullYear();
    const startMonth = startd.getMonth();
    const endYear = endd.getFullYear();
    const endMonth = endd.getMonth();

    const totalMonthsStart = startYear * 12 + startMonth;
    const totalMonthsEnd = endYear * 12 + endMonth;
    const duration = totalMonthsEnd - totalMonthsStart;

    console.log("Duration (months):", duration);

    const query = `INSERT INTO "projects (projectname, startdate, enddate, desc, nodejs, javascript, reactjs, android, "createdAt", "updatedAt") VALUES (${projectname}, ${startdate}, ${enddate}, ${desc}, ${
      nodejs ? true : false
    }, ${javascript ? true : false}, ${reactjs ? true : false}, ${
      android ? true : false
    }, ${duration}, ${datemodif}, ${datemodif})`;

    const obj = await sequelize.query(query, { type: QueryTypes.INSERT });

    console.log("Data masuk : ", obj);

    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
}

function viewEdit(req, res) {
  const { id } = req.params;
  const datafilter = data[parseInt(id)];
  datafilter.id = parseInt(id);
  res.render("edit-project", { data: datafilter });
}

function editProject(req, res) {
  try {
    const {
      id,
      projectname,
      startdate,
      enddate,
      desc,
      nodejs,
      javascript,
      reactjs,
      android,
    } = req.body;

    data[parseInt(id)] = {
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
    console.log("Project ID:", id);
    console.log("Project name:", projectname);
    console.log("Start Date:", startdate);
    console.log("End Date:", enddate);
    console.log("Description:", desc);
    console.log("Node JS:", nodejs ? true : false);
    console.log("JavaScript:", javascript ? true : false);
    console.log("React JS:", reactjs ? true : false);
    console.log("Android:", android ? true : false);

    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
}

function deleteProject(req, res) {
  const { id } = req.params;

  console.log("Before :", data);
  data.splice(id, 1);
  console.log("After :", data);
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
