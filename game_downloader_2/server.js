import express, { json } from "express"                               ;
import { capture } from "express-device"                              ;
import connectDB from './config/dbConnector'                          ;
import userAuth from './routes/api/userAuth'                          ;
import bodyParser from 'body-parser'                                  ; 
import fs from 'fs';
const PORT = process.env.PORT || 5027                                 ;

/*
 * TODO: Please for the love of the dear Lord, implement mocha too!
 * NPM installing it doesn't do anything, targt is at least 80% coverage :)
 */


//**********************************Inits**********************************/
const app = express();
app.use(capture());
app.use(bodyParser.json())
connectDB();
app.use(json({extended: false}));

//Basic Sanity testing!
//Basic Sanity testing!
app.get("/windows", (req, res) => {
    return new Promise((resolve, reject) => {
        return resolve(`adamya_winx64.zip`);
    })
    .then((file) => {
        return new Promise((resolve, reject) => {
            if(fs.existsSync(`./files/${file}`)) {
                return resolve(`./files/${file}`)
            }
            return reject(`File '${file}' was not found.`);
        })
    })
    .then((filePath) => {
        res.download(filePath);
    })
    .catch((e) => {
        res.status(400).send({
            message: e,
        });
    });
});


//Basic Sanity testing!
app.get("/linux", (req, res) => {
    return new Promise((resolve, reject) => {
        return resolve(`adamya_linux_x64.zip`);
    })
    .then((file) => {
        return new Promise((resolve, reject) => {
            if(fs.existsSync(`./files/${file}`)) {
                return resolve(`./files/${file}`)
            }
            return reject(`File '${file}' was not found.`);
        })
    })
    .then((filePath) => {
        res.download(filePath);
    })
    .catch((e) => {
        res.status(400).send({
            message: e,
        });
    });
});

//**********************************Routes**********************************/
 app.use('/api/userAuth',userAuth);

app.listen(PORT, () => {
  console.log("Server Started");
});
