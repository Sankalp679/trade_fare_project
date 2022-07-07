var moment = require('moment');
var connect = require('./connect');
var con = connect.start();

function insert_booking(booking_date, total_amount, event_name, email_id) {
    var sql = `SELECT event_id FROM eventt WHERE event_name = '${event_name}'`;
    con.query(sql, function(err, result, fields) {
        var sql1 = `SELECT exhibitor_id FROM exhibitor WHERE email_id  = '${email_id}'`;
        con.query(sql1, function(err, result1, fields) {
            var sql2 = `insert into booking values(null,DATE_ADD('${booking_date}', INTERVAL 0 MINUTE),'${total_amount}','${result[0].event_id}','${result1[0].exhibitor_id}')`;
            con.query(sql2, function(err, result2, fields) {
                if (err) throw err;
            });
            if (err) throw err;
        });
        if (err) throw err;
    });
}

function delete_booking(bookingid) {
    var sqlDelete = `DELETE FROM booking WHERE booking_id = '${bookingid}'`;
    con.query(sqlDelete, function(err, result, fields) {
        if (err) throw err;
        console.log("Given Booking Id Deleted");
    });
}

function update_booking(booking_id, booking_date, total_amount, event_name, email_id) {
    booking_date = moment(new Date(booking_date).toISOString()).format("YYYY/MM/DD");
    var sql = `SELECT event_id FROM eventt WHERE event_name = '${event_name}'`;
    con.query(sql, function(err, result, fields) {
        var sql1 = `SELECT exhibitor_id FROM exhibitor WHERE email_id = '${email_id}'`;
        con.query(sql1, function(err, result1, fields) {
            var sql2 = `UPDATE booking SET booking_date=DATE_ADD("${booking_date}", INTERVAL 0 MINUTE),total_amount="${total_amount}",event_id="${result[0].event_id}",exhibitor_id="${result1[0].exhibitor_id}" WHERE booking_id = "${booking_id}"`;
            con.query(sql2, function(err, result2, fields) {
                if (err) throw err;
            });
            if (err) throw err;
        });
        if (err) throw err;
    });
}

async function display_booking() {
    try {
        var result = await getDisplay7();
        // console.log(result);
        return result;
    } catch (error) {
        console.log(error)
    }
}

function getDisplay7() {
    return new Promise((resolve, reject) => {
        var sqlDisplay = "SELECT booking_id, booking_date, total_amount, event_name, email_id FROM booking join eventt on booking.event_id = eventt.event_id join exhibitor on exhibitor.exhibitor_id = booking.exhibitor_id order by booking_id ";
        con.query(
            sqlDisplay,
            (err, result) => {
                return err ? reject(err) : resolve(result);
            }
        );
    });
}

module.exports = {
    insert_booking: insert_booking,
    delete_booking: delete_booking,
    update_booking: update_booking,
    display_booking: display_booking
}