var express     = require("express"),

    app         = express(),

    bodyParser  = require("body-parser"),

    methodOverride = require("method-override"),

    //session library
    
    session = require('express-session'),

    //Allows to open browser from node js code

    opn = require('opn'),
    
    config = require('./config.json');

    //routes
    
    routes = require('./routes/home'),
    
    user = require('./routes/user'),

    search = require('./routes/search'),
    
    inserts = require('./routes/inserts'),
    
    update = require('./routes/update'),
    
    deleteRoute = require('./routes/delete');

    /* 
    Also: 
    npm i ejs
    npm i nodemon
    */

    /* 
    SQL
     */

    /*
    Run in terminal everytime: export PATH=${PATH}:/usr/local/mysql/bin
    or
    save in .bash_profile

    or:
    echo 'export PATH="/usr/local/mysql/bin:$PATH"' >> ~/.bash_profile

    cat .bash_profile
    */

    /*
    npm install mysql --save 
    mysql --version
    mysql -u root -p

    If you get this: 
    Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.
    mysql>

    mysql> exit

    mysql> CREATE DATABASE csc675;

    mysql> USE mydb;
     */

    
    const mysql = require('mysql');
    const db = mysql.createConnection({
        host: config.host,
        user: config.username,
        password: config.password,
        database: config.database
    });

    db.connect((err) => {
        if(err) {
            throw err;
        }
        console.log('Connected to csc675course SQL Database.');
        db.query('USE csc675course');
    });
    
    app.db = db;

    /* 
    Start Program:
    nodemon app.js
    */
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.set("view engine", "ejs");
    
app.use(methodOverride("_method"));
    
app.use(require("express-session")({
    secret: "spongebob",
    resave: false,
    saveUninitialized: false,
}));

var child = require("child_process");

var cmd = 'mysql --user="root" --password="password" < databasemodel.sql';

var cmd2 = 'mysql --user="root" --password="password" < inserts.sql';

//mysql --user="root" --password="password" < inserts.sql

//mysql --user="root" --password="password" < databasemodel.sql

child.exec(cmd, cmd2, function(err, result, field) {
    console.log(err);
});

/* Routes Here */

//const homeRouter = require('./routes/home');

//app.use(homeRouter);

/* get/post here */

app.get("/", routes.home);

app.get("/signup", user.signup);
app.post("/signup", user.signup);
app.get("/login", user.login);
app.post("/login", user.login);
app.get("/logout", user.logout);

app.get("/user/profile", user.profile); //error TBD

/* search */

app.get("/search", search.searchData);
app.post("/search", search.searchData);

app.get("searchNotFound", search.searchData);

app.get("/searchResult", search.searchResult);

app.post("/searchResult", search.searchResult);

app.get("/searchFilter", search.searchData);

/* END OF SEARCH Route HERE */

/* insert */


app.get("/submitted/inserts", inserts.Submitted);

app.get("/inserts/School", inserts.School);
app.get("/inserts/Course", inserts.Course);
app.get("/inserts/Major", inserts.Major);
app.get("/inserts/Certificate", inserts.Certificate);
app.get("/inserts/Degree", inserts.Degree);
app.get("/inserts/Services", inserts.Services);
app.get("/inserts/Transcript", inserts.Transcript);
app.get("/inserts/Student", inserts.School);
//app.get("/insert/User", inserts.School);
app.get("/inserts/Languages", inserts.Languages);

app.get("/inserts/Admin", inserts.Admin);
app.get("/inserts/SupportTeam", inserts.SupportTeam);
app.get("/inserts/Teacher", inserts.Teacher);
app.get("/inserts/PoliceOfficer", inserts.PoliceOfficer);
app.get("/inserts/NetworkSecuritySpecialist", inserts.NetworkSecuritySpecialist);
app.get("/inserts/Counselor", inserts.Counselor);
app.get("/inserts/President", inserts.President);
app.get("/inserts/Employee", inserts.Employee);
app.get("/inserts/TeachingAssistant", inserts.TeachingAssistant);
app.get("/inserts/CommunityCollege", inserts.CommunityCollege);

app.get("/inserts/University", inserts.University);
app.get("/inserts/RoomType", inserts.RoomType);
app.get("/inserts/Rooms", inserts.Rooms);
app.get("/inserts/Classroom", inserts.Classroom);
app.get("/inserts/Auditorium", inserts.Auditorium);
app.get("/inserts/Labatory", inserts.Labatory);
app.get("/inserts/Office", inserts.Office);
app.get("/inserts/Cafeteria", inserts.Cafeteria);
app.get("/inserts/HealthRoom", inserts.HealthRoom);
app.get("/inserts/Library", inserts.Library);

app.get("/inserts/StudentEvaluation", inserts.StudentEvaluation);
app.get("/inserts/Department", inserts.Department);
app.get("/inserts/CourseSection", inserts.CourseSection);
app.get("/inserts/CourseDescription", inserts.CourseDescription);
app.get("/inserts/Schedule", inserts.Schedule);
app.get("/inserts/SchoolCalendar", inserts.SchoolCalendar);
app.get("/inserts/CourseSchedule", inserts.CourseSchedule);
app.get("/inserts/ClubMeeting", inserts.ClubMeeting);
app.get("/inserts/Syllabus", inserts.Syllabus);
app.get("/inserts/Subjects", inserts.Subjects);

app.get("/inserts/Plans", inserts.Plans);
app.get("/inserts/MealPlan", inserts.MealPlan);
app.get("/inserts/HealthPlan", inserts.HealthPlan);
app.get("/inserts/Programs", inserts.Programs);
app.get("/inserts/Organizations", inserts.Organizations);
app.get("/inserts/PaymentType", inserts.PaymentType);
app.get("/inserts/CreditCardPayment", inserts.CreditCardPayment);
app.get("/inserts/BankAccountPayment", inserts.BankAccountPayment);
app.get("/inserts/Scholarship", inserts.Scholarship);
app.get("/inserts/Account", inserts.Account);

app.get("/inserts/FinancialAid", inserts.FinancialAid);
app.get("/inserts/Loan", inserts.Loan);

//Posts

app.post("/inserts/School", inserts.School);
app.post("/inserts/Course", inserts.Course);
app.post("/inserts/Major", inserts.Major);
app.post("/inserts/Certificate", inserts.Certificate);
app.post("/inserts/Degree", inserts.Degree);
app.post("/inserts/Services", inserts.Services);
app.post("/inserts/Transcript", inserts.Transcript);
app.post("/inserts/Student", inserts.School);
//app.get("/insert/User", inserts.School);
app.post("/insert/Languages", inserts.Languages);

app.post("/inserts/Admin", inserts.Admin);
app.post("/inserts/SupportTeam", inserts.SupportTeam);
app.post("/inserts/Teacher", inserts.Teacher);
app.post("/inserts/PoliceOfficer", inserts.PoliceOfficer);
app.post("/inserts/NetworkSecuritySpecialist", inserts.NetworkSecuritySpecialist);
app.post("/inserts/Counselor", inserts.Counselor);
app.post("/inserts/President", inserts.President);
app.post("/inserts/Employee", inserts.Employee);
app.post("/inserts/TeachingAssistant", inserts.TeachingAssistant);
app.post("/inserts/CommunityCollege", inserts.CommunityCollege);

app.post("/inserts/University", inserts.University);
app.post("/inserts/RoomType", inserts.RoomType);
app.post("/inserts/Rooms", inserts.Rooms);
app.post("/inserts/Classroom", inserts.Classroom);
app.post("/inserts/Auditorium", inserts.Auditorium);
app.post("/inserts/Labatory", inserts.Labatory);
app.post("/inserts/Office", inserts.Office);
app.post("/inserts/Cafeteria", inserts.Cafeteria);
app.post("/inserts/HealthRoom", inserts.HealthRoom);
app.post("/inserts/Library", inserts.Library);

app.post("/inserts/StudentEvaluation", inserts.StudentEvaluation);
app.post("/inserts/Department", inserts.Department);
app.post("/inserts/CourseSection", inserts.CourseSection);
app.post("/inserts/CourseDescription", inserts.CourseDescription);
app.post("/inserts/Schedule", inserts.Schedule);
app.post("/inserts/SchoolCalendar", inserts.SchoolCalendar);
app.post("/inserts/CourseSchedule", inserts.CourseSchedule);
app.post("/inserts/ClubMeeting", inserts.ClubMeeting);
app.post("/inserts/Syllabus", inserts.Syllabus);
app.post("/inserts/Subjects", inserts.Subjects);

app.post("/inserts/Plans", inserts.Plans);
app.post("/inserts/MealPlan", inserts.MealPlan);
app.post("/inserts/HealthPlan", inserts.HealthPlan);
app.post("/inserts/Programs", inserts.Programs);
app.post("/inserts/Organizations", inserts.Organizations);
app.post("/inserts/PaymentType", inserts.PaymentType);
app.post("/inserts/CreditCardPayment", inserts.CreditCardPayment);
app.post("/inserts/BankAccountPayment", inserts.BankAccountPayment);
app.post("/inserts/Scholarship", inserts.Scholarship);
app.post("/inserts/Account", inserts.Account);

app.post("/inserts/FinancialAid", inserts.FinancialAid);
app.post("/inserts/Loan", inserts.Loan);


//End of inserts

/* Begin of update */

app.get("/update", update.updateData);
app.post("/update", update.updateData);

/* END OF UPDATE */


/* BEGIN OF DELETE */

app.get("/delete", deleteRoute.deleteData);
app.post("/delete", deleteRoute.deleteData);

/* END OF DELETE */

app.get("/exit", function(req, res) {
    res.render("exit");
    console.log("Exitting now.");
    process.exit();
});

app.use(function(req, res, next) {
    if(req.session.user) {
        res.locals.currentUser = req.session.userId;
        console.log("App.js = " + res.locals.currentUser);
        next();
        res.redirect("/");
    }
    else {
        res.redirect("/");
    }
});



/* Functions */

function isLoggedIn(req, res, next) {
    if(req.session.user) {

        return next();
    }
    res.redirect("/login");
}

/*
app.get("/home", function(req, res) {
    
    res.render("home");
});

app.get("/login", function(req, res) {
    
    res.render("login");
});

app.get("/signup", function(req, res) {
    
    res.render("signup");
});
*/


/* Server Here */

var port = 3010;

//0 and 1 number

var random = Math.floor(Math.random() * 10);

if(random == 0) {

    port = 3010;
}
else if(random == 1) {

    port = 3001;
}
else if(random == 2) {

    port = 3002;
}
else if(random == 3) {

    port = 3003;
}
else if(random == 4) {

    port = 3004;
}
else if(random == 5) {

    port = 3005;
}
else if(random == 6) {

    port = 3006;
}
else if(random == 7) {

    port = 3007;
}
else if(random == 8) {

    port = 3008;
}
else {

    port = 3009;
}

//port is randomly selected and this code will execute and open localhost in the browser automatically

app.listen(port, process.env.IP, function(req, res) {
    console.log("The Server Has Started!");

    console.log("Opening on PORT: " + port + " in default browser");

    opn('http://localhost:' + port);

    
});


