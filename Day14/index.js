const express = require("express");
const path = require("path");
const { Sequelize, QueryTypes } = require("sequelize");
const config = require("./config/config.json");
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
app.post("/delete-project/:id", deleteProject);
app.get("/my-project-detail/:id", projectDetail);
app.get("/contact-me", contactme);
app.get("/testimonial", testimonial);

async function home(req, res) {
  try {
    const query = `SELECT * FROM "projects"`;
    const obj = await sequelize.query(query, { type: QueryTypes.SELECT });

    const projects = obj.map((project) => {
      const totalMonths = project.duration;
      const years = Math.floor(totalMonths / 12);
      const months = totalMonths % 12;
      project.durationFiltered =
        years > 0 ? `${years} tahun ${months} bulan` : `${months} bulan`;
      return project;
    });

    res.render("index", { data: projects });
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
    const datemodif = date.toISOString().slice(0, 19).replace("T", " ");
    const startd = new Date(startdate);
    const endd = new Date(enddate);

    const startYear = startd.getFullYear();
    const startMonth = startd.getMonth();
    const endYear = endd.getFullYear();
    const endMonth = endd.getMonth();

    const totalMonthsStart = startYear * 12 + startMonth;
    const totalMonthsEnd = endYear * 12 + endMonth;
    const totalMonths = totalMonthsEnd - totalMonthsStart;

    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;

    let duration;
    if (years > 0) {
      duration = years * 12 + months;
    } else {
      duration = months;
    }
    console.log(duration);

    const query = `INSERT INTO "projects" (projectname, startdate, enddate, "desc", nodejs, javascript, reactjs, android, duration, "createdAt", "updatedAt") VALUES ('${projectname}', '${startdate}', '${enddate}', '${desc}', ${
      nodejs ? true : false
    }, ${javascript ? true : false}, ${reactjs ? true : false}, ${
      android ? true : false
    }, ${duration}, '${datemodif}', '${datemodif}')`;

    const obj = await sequelize.query(query, { type: QueryTypes.INSERT });

    console.log("Data success!", obj);
    res.redirect("/");
  } catch (error) {
    console.log("Error occurred :", error);
  }
}

async function viewEdit(req, res) {
  try {
    const { id } = req.params;
    console.log(`URL Parameter id: ${id}`);

    const query = `SELECT * FROM "projects" WHERE id=${id}`;
    const obj = await sequelize.query(query, { type: QueryTypes.SELECT });
    console.log("Database Result:", obj);

    if (obj.length === 0) {
      res.status(404).send("Project not found");
      return;
    }

    res.render("edit-project", { data: obj[0] });
  } catch (error) {
    console.log("Error Occurred:", error);
    res.status(500).send("An error occurred");
  }
}
async function editProject(req, res) {
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

    console.log("Project ID:", id);
    console.log("Project name:", projectname);
    console.log("Start Date:", startdate);
    console.log("End Date:", enddate);
    console.log("Description:", desc);
    console.log("Node JS:", nodejs ? true : false);
    console.log("JavaScript:", javascript ? true : false);
    console.log("React JS:", reactjs ? true : false);
    console.log("Android:", android ? true : false);

    if (projectname === "") {
      res.status(400).send("Project name must be filled !!!");
      return;
    } else if (startdate === "") {
      res.status(400).send("Choose start date !!!");
      return;
    } else if (enddate === "") {
      res.status(400).send("Choose end date !!!");
      return;
    } else if (desc === "") {
      res.status(400).send("Description must be inputted !!!");
      return;
    }

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
    const totalMonths = totalMonthsEnd - totalMonthsStart;

    if (totalMonths > 0) {
      duration = totalMonths;
    } else {
      duration = 0;
    }
    console.log(duration);

    const query = `UPDATE "projects" SET projectname='${projectname}', startdate='${startdate}', enddate='${enddate}', "desc"='${desc}', nodejs=${
      nodejs ? true : false
    }, javascript=${javascript ? true : false}, reactjs=${
      reactjs ? true : false
    }, android=${
      android ? true : false
    }, duration='${duration}', "createdAt"='${datemodif}', "updatedAt"='${datemodif}' WHERE id=${id}`;

    const obj = await sequelize.query(query, { type: QueryTypes.UPDATE });

    console.log("Data terupdate", obj);

    res.redirect("/");
  } catch (error) {
    console.log("Error Occured : ", error);
  }
}

async function deleteProject(req, res) {
  try {
    const { id } = req.params;

    const query = `DELETE FROM "projects" WHERE id=${id}`;

    const obj = await sequelize.query(query, { type: QueryTypes.DELETE });

    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
}

async function projectDetail(req, res) {
  const { id } = req.params;

  const query = `SELECT * FROM "projects" WHERE id='${id}'`;
  const obj = await sequelize.query(query, { type: QueryTypes.SELECT });

  if (obj.length === 0) {
    res.status(404).send("Project not found");
    return;
  }

  res.render("myproject-detail", { detail: obj[0] });
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
