import express from 'express';
//import bodyParser from 'body-parser';
import path from 'path';
import http from 'http';
import request from 'request';
import timeout from 'connect-timeout';
import createError from 'http-errors';
import jwt from 'jsonwebtoken';
import session from 'express-session';
import {jwtSecret} from './config';

import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config.dev';

let app = express();
const compiler = webpack(webpackConfig);
let tempdata = {};
let backend = 'put your api HOST + PORT here';

app.use(webpackMiddleware(compiler, {
  publicPath:webpackConfig.output.publicPath,
}));


app.use(session({
  secret: 'w)iw#%2^-qwzxqy^ww7*6yc3qum9_99a6o6!wxm997vr142w=y',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 60000*24*30 }
}));

//app.use(bodyParser.text());
//app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/*',timeout('30s'), (req, res) => {
  if(req.timedout)return next(createError(503,'Response timeout'));
  var url = backend + req.url;
  //Add any additional headers like token, API key etc here
  //req.headers['key'] = 'value';

  req.pipe(request(url).on('error',function(err){
    console.log("error " + err);
  })).pipe(res);
});

app.put('/api/*', timeout('30s'), (req, res) => {
  if(req.timedout)return next(createError(503,'Response timeout'));
  var url = backend + req.url;
  //Add any additional headers like token, API key etc here
  //req.headers['key'] = 'value';

  req.pipe(request(url).on('error',function(err){
    console.log("error " + err);
  })).pipe(res);
});

app.post('/api/*', timeout('30s'), (req, res) => {
  if(req.timedout)return next(createError(503,'Response timeout'));
  var url = backend + req.url;
  //Add any additional headers like token, API key etc here
  //req.headers['key'] = 'value';

  if(req.session.xtoken) {
    //Logged in user token header to be set here , like so
    //req.headers['X-token'] = req.session.xtoken;
  }

  if(req.url.indexOf('user/login') != -1) {
    req.pipe(request(url,function(error,response,body){
      let jsonResponse = JSON.parse(response.body);
      if(jsonResponse.error === false) {
        let token = '';
        if(jsonResponse.response.token) {
          token = jsonResponse.response.token;
        }

        const jwtToken = jwt.sign({
          user_details:{
            user_id:jsonResponse.response.user_id,
            first_name:jsonResponse.response.first_name,
            last_name:jsonResponse.response.last_name,
          },
        }, jwtSecret);

        jsonResponse.response = {};
        jsonResponse.response.token = jwtToken;
        req.session.xtoken = jsonResponse.response.token;
        req.session.user = jwtToken;
      }
      res.json(jsonResponse);
      res.send();

      //console.log('response ' , jsonresp.error);
    }));
  }


  else {
    req.pipe(request(url).on('error',function(err){
      console.log("error " + err);
    })).pipe(res);
  }
});

var errorFilter = (err, req, res, next) => {
    if(!res.headersSent) { 
        let errcode = err.status || 500; 
        let msg = err.message || 'server error!';
        let errResJSON = {};
        errResJSON.msg = msg;
        console.log("error is " , msg);
        res.status(errcode).send(errResJSON); 
    }
};

app.use(errorFilter);

app.use('/assets', express.static(__dirname + '/assets'));

app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'));
});



app.listen(3333, () => console.log('Running on host'));
