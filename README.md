# webstarToCSV

This project is my attempt to make a program using nodejs to convert the webstar page into an ics file

so far i have been able to successfully convert and import the current printer friendly listview page from webstar

usage is main.js -f "path to printer friendly list view page with extension" the program will print test.ics to the working directory and you should be able to just import this file into google calandar.

[![Build Status](https://travis-ci.org/jfmherokiller/webstarToCSV.svg?branch=master)](https://travis-ci.org/jfmherokiller/webstarToCSV)

[![Coverage Status](https://coveralls.io/repos/github/jfmherokiller/webstarToCSV/badge.svg?branch=master)](https://coveralls.io/github/jfmherokiller/webstarToCSV?branch=master)

```
javascript:(function()%7Bfunction%20callback()%7Bconsole.log(%22test%22)%7Dvar%20s%3Ddocument.createElement(%22script%22)%3Bs.src%3D%22https%3A%2F%2Fgitcdn.xyz%2Frepo%2Fjfmherokiller%2FwebstarToCSV%2Fmaster%2Fpublic%2Fbookie.js%22%3Bif(s.addEventListener)%7Bs.addEventListener(%22load%22%2Ccallback%2Cfalse)%7Delse%20if(s.readyState)%7Bs.onreadystatechange%3Dcallback%7Ddocument.body.appendChild(s)%3B%7D)()
```
^ the above is the bookmark version just add it to a bookmark in your browser and run it on the listview printer friendly page
