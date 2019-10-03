/**
 * USAGE: TO READ IN A DATABASE TABLE VIA MYSQL SERVER DOCKER CONTAINER.
 * NOTE: THIS IS A KSU DATABASE PROJECT TO SHOW HOW TO READ INTO TWO TABLES FROM A DATABASE UTILIZING SQL JOIN STATEMENT. 
 *       THE TABLES THAT ARE USE ARE: patient , room
 * STEPS TO CREATE DOCKER CONTAINER:
         * docker run --name db -d \
          -e MYSQL_ROOT_PASSWORD=*** \
          \ -p 3306:3306 \
          mysql/mysql-server

          * CREATE A USER WITH mysql_native_password PLUGIN WITHIN THE SERVER WITH ALL ACCESS RIGHTS
  * STEPS TO CREATING DATABASE WITH UI TOOL:
          * CONNECTED MYSQL DOCKER CONTAINER TO MYSQL WORKBENCH
          * CREATED DATABASE
          * CREATE TABLES VIA EER DIAGRAM 
  * STEPS TO RUN CODE:
  *  NOTE: NODE NEEDS TO BE INSTALL
  *   npm install
  *   npm start 
  *   
  * OUTPUT: PATIENT AND ROOM TABLE RESULTS TO CONSOLE AND TO A JSON FILE - QueryResults.json
  * AUTHOR: PARIS WALTERS      
 */

var mysql = require('mysql');
var fs = require('fs');

var con = mysql.createConnection({
    host: "localhost",
    user: "foo",
    password: "bar"
  });
  
  con.connect(function(err) {
    if (err) throw err;
    con.query("Select ElijayDB.patient.* , ElijayDB.room.* FROM ElijayDB.patient INNER JOIN ElijayDB.room on ElijayDB.patient.roomid = ElijayDB.room.RoomID;", function (err, result, fields) {
      if (err) throw err;
      console.log(result);

      fs.writeFile("QueryResults.json",JSON.stringify(result, null, 2),'utf-8', (err) => {
        if (err) console.log(err);
        console.log("Successfully Written to File.");
      });
    });
  });

  