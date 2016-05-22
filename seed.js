/**
 * Created by alexs_000 on 21.05.2016.
 */
var fs = require('fs');
var _ = require('lodash');

var groups = ['managers', 'clients', 'admins', 'designers', null];
var strValues = "qwertyuiopasdfghjklzxcvbnm1234567890";
var chars = "qwertyuiopasdfghjklzxcvbnm";

var users = _.map(_.range(310), function(i) {
    return {
        id: i,
        name: makeName((1 % 4) + 4),
        email: makeEmail((1 % 4) + 4, (1 % 4) + 3),
        group: chooseGroup()
    };
});

saveFile('mock_data.json', users);

function saveFile(outputFilename, userData) {
    fs.writeFile(outputFilename, JSON.stringify(userData), function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log("--> saved to " + outputFilename);
        }
    });
}

function makeEmail(n, m) {
    var strEmail = "";
    var strTmp;
    for (var i=0;i<n;i++) {
        strTmp = strValues.charAt(Math.round(strValues.length*Math.random()));
        strEmail = strEmail + strTmp;
    }
    strTmp = "";
    strEmail = strEmail + "@";
    for (var j=0;j<m;j++) {
        strTmp = strValues.charAt(Math.round(strValues.length*Math.random()));
        strEmail = strEmail + strTmp;
    }
    strEmail = strEmail + (Math.random() > 0.5 ? ".ru" : ".com");
    return strEmail;
}

function makeName(n) {
    var name = "";
    var strTmp;
    for (var i=0;i<n;i++) {
        strTmp = chars.charAt(Math.round(chars.length*Math.random()));
        name = name + strTmp;
    }
    return name;
}

function chooseGroup() {
    var index = Math.round(groups.length * Math.random());
    return groups[index];
}
