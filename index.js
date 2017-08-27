var http = require('http');
const osmosis = require('osmosis');
const url = "http://orienteeringonline.net/";
let links = [];
var datos;

var server = http.createServer(function(request, response) {

    response.writeHead(200, {"Content-Type": "text/plain"});
    osmosis
	    .get('orienteeringonline.net/CompetitionSearch.aspx')
	    .find('#ctl00_PH_Main_CountryComboBox_DDD_L_LBT')
	    .set({'countries': ['td']})
	    .find('#ctl00_PH_Main_CompetitionsGridView_DXMainTable')
	    .set({'competitions': ['.dxgvDataRow td'], 'links':['a@href']})
	    .log(console.log)
	    .data(function(data){
		datos = JSON.stringify(data);		
	    })
    	    .error(console.log);
    response.end(datos);

});

var port = process.env.PORT || 1337;
server.listen(port);

console.log("Server running at http://localhost:%d", port);
