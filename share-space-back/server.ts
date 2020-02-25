import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mysqlConnector from './module/mysql-connector';
import api from './module/api';
import utility from './module/utility';

mysqlConnector.startDB();

const app = express();
const port = 8080;

// middleware
app.use(bodyParser.json());
app.use(cors());

// route
app.use('/api', api);

app.listen(port, () => utility.print(`Server listening on port ${port}...`));
