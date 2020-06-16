/*jshint esversion: 6 */
/*jshint esversion: 7 */
/*jshint esversion: 8 */
/* jshint -W097 */
/* jshint -W117 */
/* jshint -W087 */
'use strict';

const chalk=require('chalk');
const API=require('./config');
const request=require('request');

const forecast=({latitude:lat,longitude:long},callback)=>{
    const url=`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=metric&exclude=daily,hourly,minutely&appid=${API.owmAPI.key}`;

    //const url=`https://api.weatherbit.io/v2.0/subscription/usage?key=${API.wbitAPI.key}&units=S&lat=25.59408&lon=85.13563`;
    
    request({url,json:true},(error,{body})=>{
        if(error){
            callback(chalk.inverse('No connection to the weather service!'),undefined);
        }else if(body.cod==400){
            console.log(chalk.inverse("Unable to find location OR Invalid set of coordinates!!"),undefined);
        }else if(body.cod==401){
            console.log("Invalid API key!!",undefined);
        }
        else{callback(undefined,`It is currently ${body.current.temp} degrees.`);
        }
        //console.log(data);
    });
};

module.exports=forecast;