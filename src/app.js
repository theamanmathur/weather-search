/*jshint esversion: 6 */
/*jshint esversion: 7 */
/*jshint esversion: 8 */
/* jshint -W097 */
/* jshint -W117 */
/* jshint -W087 */
'use strict';

const express=require('express');
const path=require('path');
const hbs=require('hbs');
const forecast=require('./utils/forecast.js');
const geocode=require('./utils/geocode.js');

console.log(__dirname);
console.log(path.join(__dirname,'../public'));


const app=express();
const port=process.env.PORT ||3000;

//define paths for express config
const publicPath=path.join(__dirname,'../public');
const viewsPath=path.join(__dirname,'../templates/views');
const partialsPath=path.join(__dirname,'../templates/partials');


//setup handlebars engine and views location
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicPath));

app.get('',(req,res)=>{
    res.render('index',{
        title:'myWeather : Fastest Weather Search Engine',
        name :'Aman Mathur'
    });
});

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'about me', 
        name:'aman mathur'
    });
});

app.get('/help',(req,res)=>{
    res.render('help',{
        helpText:'Help me please!',
        title:'help',
        name:'aman'
    });
});

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({error:'Please enter a location!!'});
    }

    geocode(req.query.address,(error,data)=>{
        if(error){
            return res.send({error});
        }
        forecast(data,(error,forecast)=>{
            if(error){
                return res.send({error});
            }
                res.send({
                    forecast,
                    location:data.location,
                    address:`You searched for ${req.query.address}`
                });
        });
    });
});


app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Aman Mathur',
        errorMessage:'Page Not Found'
    });
}); 

app.listen(port,()=>{
    console.log(`Server is up on port ${port}`);
}); 