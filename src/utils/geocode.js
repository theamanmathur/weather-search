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

const geocode=(address,callback)=>{
    const url=`https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${API.mapboxapi.key}&limit=1`;

    request({url,json:true},(error,{body}={})=>{
        // let body=null;
        // if(response){
        //     body=response.body;
        // }
        if(error)
        callback(chalk.inverse('Unable to connect to MapBox service'),undefined);
        else if(!body.features)
        callback(chalk.inverse('No input!!'),undefined);
        else if(body.features.length===0)
        callback(chalk.inverse('Unable to find location!!'),undefined);
        else{
            callback(undefined,{
            latitude:body.features[0].center[1],
            longitude:body.features[0].center[0],
            location:body.features[0].place_name,
            });
        }
    });
};

module.exports=geocode;