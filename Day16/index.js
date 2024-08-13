const express = require("express");
const path = require("path");
const { Sequelize, QueryTypes } = require("sequelize");
const config = require("./config/config.json");
const sequelize = new Sequelize(config.development);
const bcrypt = require("bcrypt");
const flash = require("express-flash");
const session = require("express-session");
const upload = require("./assets/middlewares/uploadFile");

const app = express();

const port = 3002;

let data = [];

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "/assets/views"));

app.use("/assets", express.static(path.join(__dirname, "/assets")));
app.use("/uploads", express.static(path.join(__dirname, "assets/uploads")));

app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    name: "admin",
    secret: "ngr261027",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use(flash());

app.use((req, res, next) => {
  res.locals.isLogin = req.session.isLogin || false;
  res.locals.user = req.session.user || {};
  next();
});

function auth(req, res, next) {
  console.log("Auth middleware:", req.session.isLogin);
  if (req.session.isLogin) {
    return next();
  }
  req.flash("danger", "You must be logged in to view this page.");
  res.redirect("/login");
}

// Project Web
app.get("/", home);
app.get("/add-project", auth, viewProject);
app.post("/add-project", auth, upload.single("image"), addProject);
app.get("/edit-project/:id", auth, viewEdit);
app.post("/edit-project", auth, upload.single("image"), editProject);
app.post("/delete-project/:id", auth, deleteProject);
app.get("/my-project-detail/:id", projectDetail);
app.get("/contact-me", contactme);
app.get("/testimonial", testimonial);

// Users
app.get("/login", loginView);
app.get("/register", registerView);
app.post("/login", login);
app.post("/register", register);
app.get("/logout", auth, logout);

function home(req, res) {
  if (req.session.isLogin) {
    homeProjects(req, res);
  } else {
    res.render("index", { data: [], isLogin: false, user: {} });
  }
}
async function homeProjects(req, res) {
  try {
    const userID = req.session.user.id;

    const query = `
      SELECT * FROM projects WHERE user_id=${userID}
    `;
    const obj = await sequelize.query(query, { type: QueryTypes.SELECT });
    if (req.session.user) {
      const user_id = req.session.user.id;
      console.log("Fetch user id : ", user_id);
    } else {
      console.log("No user is logged in.");
    }

    const projects = obj.map((project) => {
      const totalMonths = project.duration;
      const years = Math.floor(totalMonths / 12);
      const months = totalMonths % 12;
      project.durationFiltered =
        years > 0 ? `${years} tahun ${months} bulan` : `${months} bulan`;
      return project;
    });

    const isLogin = req.session.isLogin;
    const user = req.session.user;

    res.render("index", { data: projects, isLogin, user });
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

    const image = req.file.filename;

    const author = req.session.user.username;

    const user_id = req.session.user.id;

    console.log("Image URL : ", image);
    console.log("Author name : ", author);
    console.log("User id : ", user_id);

    const query = `INSERT INTO "projects" (user_id, author, projectname, startdate, enddate, "desc", nodejs, javascript, reactjs, android, duration, image, "createdAt", "updatedAt") VALUES ('${user_id}', '${author}', '${projectname}', '${startdate}', '${enddate}', '${desc}', ${
      nodejs ? true : false
    }, ${javascript ? true : false}, ${reactjs ? true : false}, ${
      android ? true : false
    }, ${duration}, '${image}', '${datemodif}', '${datemodif}')`;

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

    const image = req.file.filename;

    console.log("Project ID : ", id);
    console.log("Project name : ", projectname);
    console.log("Start Date : ", startdate);
    console.log("End Date : ", enddate);
    console.log("Description : ", desc);
    console.log("Node JS : ", nodejs ? true : false);
    console.log("JavaScript : ", javascript ? true : false);
    console.log("React JS : ", reactjs ? true : false);
    console.log("Android : ", android ? true : false);
    console.log("Image : ", image);

    if (projectname === "") {
      req.flash("danger", "Edit failed : Please enter project name !!!");
      return;
    } else if (startdate === "") {
      req.flash("danger", "Edit failed : Please enter start date !!!");
      return;
    } else if (enddate === "") {
      req.flash("danger", "Edit failed : Please enter end date !!!");
      return;
    } else if (desc === "") {
      req.flash("danger", "Edit failed : Please enter description");
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
    }, duration='${duration}', "image"=${image}, "createdAt"='${datemodif}', "updatedAt"='${datemodif}' WHERE id=${id}`;

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

function loginView(req, res) {
  res.render("login");
}

async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    req.flash("danger", "Login Failed: Email and Password must be provided!");
    return res.redirect("/login");
  }

  try {
    const query = `SELECT * FROM "users" WHERE email='${email}'`;
    const obj = await sequelize.query(query, { type: QueryTypes.SELECT });

    if (!obj.length) {
      req.flash("danger", "Login Failed: Email is wrong!");
      return res.redirect("/login");
    }

    bcrypt.compare(password, obj[0].password, (err, result) => {
      if (err) {
        req.flash("danger", "Login Failed: Internal Server Error");
        return res.redirect("/login");
      }

      if (result) {
        req.session.isLogin = true;
        req.session.user = {
          id: obj[0].id,
          username: obj[0].username,
          email: obj[0].email,
        };
        req.session.save(() => {
          req.flash("success", "Login Successful!");
          res.redirect("/");
        });
      } else {
        req.flash("danger", "Login Failed: Password is wrong!");
        res.redirect("/login");
      }
    });
  } catch (error) {
    console.error("Error during login:", error);
    req.flash("danger", "Login Failed: Internal Server Error");
    res.redirect("/login");
  }
}

function registerView(req, res) {
  res.render("register");
}

async function register(req, res) {
  const { username, email, password } = req.body;
  const crypt = 10;

  bcrypt.hash(password, crypt, async (err, hash) => {
    if (err) {
      console.error("Error hashing password:", err);
      req.flash("danger", "Register Failed!");
      return res.redirect("/register");
    }

    const query = `INSERT INTO "users" (username, email, password) VALUES ('${username}', '${email}', '${hash}')`;

    try {
      await sequelize.query(query, { type: QueryTypes.INSERT });
      req.flash("success", "Register Successful!");
      res.redirect("/login");
    } catch (error) {
      console.error("Error registering user:", error);
      if (!res.headersSent) {
        req.flash("danger", "Register Failed!");
        res.redirect("/register");
      }
    }
  });
}

function logout(req, res) {
  req.session.destroy((err) => {
    if (err) throw err;
    res.redirect("/login");
  });
}

app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});
