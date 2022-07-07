var connect = require('./connect');
var con = connect.start();

function insert_venue(venue_city, venue_addr, state_name, country_name) {
    var sql = `SELECT country_id FROM country WHERE country_name = '${country_name}'`;
    con.query(sql, function(err, result, fields) {
        var sql1 = `SELECT state_id FROM state WHERE state_name = '${state_name}'`;
        con.query(sql1, function(err, result1, fields) {
            var sql2 = "INSERT INTO `venue` (`venue_city`,`venue_addr`,`state_id`,`country_id`) VALUES ('" + venue_city + "','" + venue_addr + "','" + result1[0].state_id + "','" + result[0].country_id + "');";
            con.query(sql2, function(err, result2, fields) {
                if (err) throw err;
            });
            if (err) throw err;
        });
        if (err) throw err;
    });
}

function delete_venue(venueid) {
    var sqlDelete = `DELETE FROM venue WHERE venue_id = '${venueid}'`;
    con.query(sqlDelete, function(err, result, fields) {
        if (err) throw err;
        console.log("Given Venue Id deleted");
    });
}

function update_venue(venue_id, venue_city, venue_addr, state_name, country_name) {
    var sql = `SELECT country_id FROM country WHERE country_name = '${country_name}'`;
    con.query(sql, function(err, result, fields) {
        var sql1 = `SELECT state_id FROM state WHERE state_name = '${state_name}'`;
        con.query(sql1, function(err, result1, fields) {
            var sql2 = `UPDATE venue SET venue_city='${venue_city}',venue_addr='${venue_addr}',state_id='${result1[0].state_id}',country_id='${result[0].country_id}' WHERE venue_id = '${venue_id}'`;
            con.query(sql2, function(err, result2, fields) {
                if (err) throw err;
            });
            if (err) throw err;
        });
        if (err) throw err;
    });
}

async function display_venue() {
    try {
        var result = await getDisplay2();
        return result;
    } catch (error) {
        console.log(error)
    }
}

function getDisplay2() {
    return new Promise((resolve, reject) => {
        var sqlDisplay = "SELECT venue_id, venue_city, venue_addr, state_name, country_name FROM venue JOIN state ON venue.state_id = state.state_id JOIN country ON venue.country_id = country.country_id ";
        con.query(
            sqlDisplay,
            (err, result) => {
                return err ? reject(err) : resolve(result);
            }
        );
    });
}

module.exports = {
    display_venue: display_venue,
    insert_venue: insert_venue,
    update_venue: update_venue,
    delete_venue: delete_venue
}