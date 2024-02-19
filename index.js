const {dbConn} = require('./src/utils/dbConn');
const express = require("express");
const routes = require('./src/routes');
const bodyParser  = require('body-parser');
const cors        = require('cors');


dbConn().then((db)=>{
    const port = 3001;    
    const app = express();
    
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(cors())
    app.get("/", (req, res)=>res.send("Hello World"));
    
    routes(app);
    
    app.listen(port, ()=>console.log(`hipPos Running on http://localhost:${port}`) );

}).catch(err=>console.log(err));


