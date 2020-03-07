import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mysqlManager from './src/mysql-manager';
import api from './src/api';
import utility from './src/utility';

// database
mysqlManager.startDB();

const app = express();
const port = 8080;

// middleware
app.use(bodyParser.json());
app.use(cors());

// route
app.use('/api', api);

app.listen(port, () => utility.print(`Server listening on port ${port}...`));
