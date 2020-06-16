/*jshint esversion: 6 */
/*jshint esversion: 7 */
/*jshint esversion: 8 */
/* jshint -W097 */
/* jshint -W117 */
/* jshint -W087 */
'use strict';

console.log("Client side javascript is loaded");


const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const msg1 = document.querySelector('#forecast');
const msg2 = document.querySelector('#location');
const msg3 = document.querySelector('#address');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    console.log('testing!!');
    msg1.textContent = "Loading...";
    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) msg1.textContent = data.error;
            else {
                // console.log(data.location);
                // console.log(data.forecast);
                // console.log(data.address);

                msg1.textContent = data.forecast;
                msg2.textContent = data.location;
                msg3.textContent = data.address;
            }
        });
    });
});