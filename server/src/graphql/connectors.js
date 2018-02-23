var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;

class sqlConnector {
	constructor(config) {
		this.config = config;

		this.connection = new Connection(config);

		this.connection.on('connect', function(err) {
		  if (err) {
		    console.log(err);
		  } else {
		    console.log('Connected');
		    //executeStatement();
		  }
		});
	}

	executeSQL(sqlString, args) {
    	return new Promise((resolve, reject) => {
	        var request = new Request(sqlString, function(err, rowCount, rows) {
	            
	            if (err) {
	                console.log(err);
	            } else {
	                console.log(rowCount + ' rows');
	                //console.log(rows);

	                var jsonArray = [];
	                rows.forEach(function (columns) {
	                  var rowObject ={};
	                  columns.forEach(function(column) {
	                      rowObject[column.metadata.colName] = column.value;
	                  });
	                  jsonArray.push(rowObject)
	                });


	                console.log(jsonArray.length);
	                console.log(jsonArray[1]);

	                if(jsonArray.length < 2) {
	                    console.log("sent first");
	                    resolve(jsonArray[0]);
	                }
	                else {
	                    console.log("sent all");
	                    resolve(jsonArray);
	                }
	            }
	        });

	        for(let i = 0; i < Object.keys(args).length; i++) {
	            console.log("added parameter " + args[i].name + " with value " + args[i].arg);
	            request.addParameter(args[i].name, args[i].type, args[i].arg);
	            //request.addOutputParameter(args[i].name, args[i].type);
	        }
        
	        console.log("execute command");
	        this.connection.execSql(request);
	    })
	}
}

export default sqlConnector;
