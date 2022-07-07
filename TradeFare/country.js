var connect = require('./connect');
var con = connect.start();

function insert_country(country_name) {
    var sql = "INSERT INTO `country` (`country_name`) VALUES('" + country_name + "')";
    con.query(sql, function(err, result, fields) {
        if (err) throw err;
    });
}

function delete_country(countryid) {
    var sqlDelete = `DELETE FROM country WHERE country_id = '${countryid}'`;
    con.query(sqlDelete, function(err, result, fields) {
        if (err) throw err;
        console.log("Given User Id deleted");
    });
}

function update_country(country_name, country_id) {
    var sqlUpdate = `UPDATE country SET country_name = '${country_name}' WHERE country_id  = '${country_id}'`;
    con.query(sqlUpdate, function(err, result, fields) {
        if (err) throw err;
    });
}

async function display_country() {
    try {
        var result = await getDisplay();
        // console.log(result);
        return result;
    } catch (error) {
        console.log(error)
    }
}

function getDisplay() {
    return new Promise((resolve, reject) => {
        var sqlDisplay = "SELECT * FROM country";
        con.query(
            sqlDisplay,
            (err, result) => {
                return err ? reject(err) : resolve(result);
            }
        );
    });
}

module.exports = {
    insert_country: insert_country,
    delete_country: delete_country,
    update_country: update_country,
    display_country: display_country
}