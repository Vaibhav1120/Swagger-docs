const express = require("express");

const fileUpload = require("express-fileupload");
const app = express();

const swaggerUi = require('swagger-ui-express');
const fs = require("fs")
const YAML = require('yamljs')

const file  = fs.readFileSync('./swagger.yaml', 'utf8')
const swaggerDocument = YAML.parse(file)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());
app.use(fileUpload());

const port = process.env.PORT || 4000;

let courses = [
    {
      id: "11",
      name: "learn Reactjs",
      price: 299
    },
    {
        id: "22",
        name: "Learn angularjs",
        price: 399
    },
    {
        id: "33",
        name: "learn backend",
        price: 499
    }
];

app.get("/", (req,res) => {
 
  res.send("<h1>Everything is working fine</h1>")

});

app.get("/api/v1/vaibhav", (req,res) => {
 
    res.send("<h1>Hii everyone I am Vaibhav</h1>")
  
  });

app.get("/api/v1/vaibhavobject", (req,res) => {
 
    res.send({id: "55", name: "Learning Backend", price: 599});
  
  });

  app.get("/api/v1/courses", (req,res) => {
 
    res.send(courses);
  
  });

  app.get("/api/v1/mycourse/:courseId", (req,res) => {
 
    const course = courses.find((course) => course.id === req.params.courseId);
    res.send(course);
  
  });

  app.get("/api/v1/coursequery", (req,res) => {

   let location = req.query.location
   let device = req.body.device

   res.send({location , device});

  });
  
  app.post("/api/v1/addCourse", (req,res) => {

      console.log(req.body);
      courses.push(req.body);
      res.send(true);


  });

  app.post("/api/v1/courseUpload", (req,res) => {

      const file = req.files.file;

      let path = __dirname + "/images/" + Date.now() + ".jpg";

      file.mv(path, (err) => {
   
        if(err)
        {
          res.send(true);
        }
        else
        {
          res.send(false);
        }
   
      });
  
});
  

app.listen(port, () => console.log(`Server is running on port ${port}`)
);