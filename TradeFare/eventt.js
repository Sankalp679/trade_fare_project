var moment = require('moment');
var connect = require('./connect');
var con = connect.start();

function insert_event(event_name, booking_start_date, event_start_date, event_end_date, venue_addr) {
    var sql = `SELECT venue_id FROM venue WHERE venue_addr = '${venue_addr}'`;
    con.query(sql, function(err, result, fields) {
        var sql1 = `insert into eventt values(null,'${event_name}',DATE_ADD('${booking_start_date}', INTERVAL 0 MINUTE),DATE_ADD('${event_start_date}',INTERVAL 0 MINUTE),DATE_ADD('${event_end_date}',INTERVAL 0 MINUTE),'${result[0].venue_id}')`;
        con.query(sql1, function(err, result1, fields) {
            if (err) throw err;
        });
        if (err) throw err;
    });
}

function delete_event(eventid) {
    var sqlDelete = `DELETE FROM eventt WHERE event_id = '${eventid}'`;
    con.query(sqlDelete, function(err, result, fields) {
        if (err) throw err;
        console.log("Given Event Id deleted");
    });
}

function update_event(event_id, event_name, booking_start_date, event_start_date, event_end_date, venue_addr) {
    var sql = `SELECT venue_id FROM venue WHERE venue_addr = '${venue_addr}'`;
    booking_start_date = moment(new Date(booking_start_date).toISOString()).format("YYYY/MM/DD");
    event_start_date = moment(new Date(event_start_date).toISOString()).format("YYYY/MM/DD");
    event_end_date = moment(new Date(event_end_date).toISOString()).format("YYYY/MM/DD");
    con.query(sql, function(err, result, fields) {
        var sql1 = `UPDATE eventt SET event_name='${event_name}',booking_start_date=(DATE_ADD('${booking_start_date}', INTERVAL 0 MINUTE)), event_start_date=(DATE_ADD('${event_start_date}', INTERVAL 0 MINUTE)),event_end_date=(DATE_ADD('${event_end_date}', INTERVAL 0 MINUTE)),venue_id = '${result[0].venue_id}' WHERE event_id = '${event_id}'`;
        con.query(sql1, function(err, result1, fields) {
            if (err) throw err;
        });
        if (err) throw err;
    });
}

async function display_event() {
    try {
        var result = await getDisplay3();
        // console.log(result);
        return result;
    } catch (error) {
        console.log(error)
    }
}

function getDisplay3() {
    return new Promise((resolve, reject) => {
        var sqlDisplay = "SELECT event_id,event_name,booking_start_date,event_start_date,event_end_date,venue_addr FROM eventt JOIN venue ON eventt.venue_id=venue.venue_id";
        con.query(
            sqlDisplay,
            (err, result) => {
                return err ? reject(err) : resolve(result);
            }
        );
    });
}

module.exports = {
    insert_event: insert_event,
    display_event: display_event,
    delete_event: delete_event,
    update_event: update_event
}