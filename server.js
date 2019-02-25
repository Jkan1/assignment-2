//System Modules
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./swagger.json');

//Constants
const CONFIG = require('./config/config');
const DATABASE = require('./service/database');

//Routers
const recordsRouter = require('./router/recordsRouter');
const homeRouter = require('./router/homeRouter');
const otherRouter = require('./router/otherRouter');

//Database connection
DATABASE.connect((err) => {
    if (err) console.log(err);
});

//Application Middlewares
app.use(express.static('public'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

//Custom Middleware
app.use((req, res, next) => {
    console.log("1> From /");
    next();
});

//Routing Middlewares
app.use('/records/', recordsRouter);
app.use('/home/', homeRouter);
app.use('/other/',otherRouter);

app.listen(CONFIG.PORT, () => {
    console.log("Server listening at port " + CONFIG.PORT)
});