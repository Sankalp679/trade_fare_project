var moment = require('moment');
var connect = require('./connect');
var con = connect.start();

function insert_mccard(spend_amt, spend_date, payment_mode, event_name, email_id, email_id_visitor) {
    var sql = `SELECT event_id FROM eventt WHERE event_name = '${event_name}'`;
    con.query(sql, function(err, result, fields) {
        var sql1 = `SELECT exhibitor_id FROM exhibitor WHERE email_id = '${email_id}'`;
        con.query(sql1, function(err, result1, fields) {
            var sql2 = `SELECT booking_id FROM booking WHERE event_id = '${result[0].event_id}' AND exhibitor_id = '${result1[0].exhibitor_id}'`;
            con.query(sql2, function(err, result2, fields) {
                if (result2.length == 0) {
                    console.log("Enter correct event and correct associated exhibitor (have booking in their name for that particular event i.e verify from booking page)")
                } else {
                    var sql3 = `SELECT visitor_id FROM visitor WHERE email_id_visitor = "${email_id_visitor}"`;
                    con.query(sql3, function(err, result3, fields) {
                        var sql4 = `insert into megaconsumercard values(null, "${spend_amt}", DATE_ADD("${spend_date}", INTERVAL 0 MINUTE), "${payment_mode}", "${result[0].event_id}", "${result3[0].visitor_id}", "${result2[0].booking_id }","${result1[0].exhibitor_id }")`;
                        con.query(sql4, function(err, result4, fields) {
                            if (err) throw err;
                        });
                        if (err) throw err;
                    });
                    if (err) throw err;
                }
            });
            if (err) throw err;
        });
        if (err) throw err;
    });
}

function delete_mccard(card_id) {
    var sqlDelete = `DELETE FROM megaconsumercard WHERE card_id = '${card_id}'`;
    con.query(sqlDelete, function(err, result, fields) {
        if (err) throw err;
        console.log("Given mccard id deleted");
    });
}

function update_mccard(card_id, spend_amt, spend_date, payment_mode, event_name, email_id, email_id_visitor) {
    spend_date = moment(new Date(spend_date).toISOString()).format("YYYY/MM/DD");
    var sql = `SELECT event_id FROM eventt WHERE event_name = '${event_name}'`;
    con.query(sql, function(err, result, fields) {
        var sql1 = `SELECT exhibitor_id FROM exhibitor WHERE email_id = '${email_id}'`;
        con.query(sql1, function(err, result1, fields) {
            var sql2 = `SELECT booking_id FROM booking WHERE event_id = '${result[0].event_id}' AND exhibitor_id = '${result1[0].exhibitor_id}'`;
            con.query(sql2, function(err, result2, fields) {
                var sql3 = `SELECT visitor_id FROM visitor WHERE email_id_visitor = "${email_id_visitor}"`;
                if (result2.length == 0) {
                    console.log("Enter correct event and correct associated exhibitor (have booking in their name for that particular event i.e verify from booking page)")
                } else {
                    con.query(sql3, function(err, result3, fields) {
                        var sql4 = `UPDATE megaconsumercard SET spend_amt = "${spend_amt}", spend_date = DATE_ADD("${spend_date}", INTERVAL 0 MINUTE), payment_mode = "${payment_mode}", event_id = "${result[0].event_id}", visitor_id = "${result3[0].visitor_id}",booking_id = "${result2[0].booking_id}",exhibitor_id = "${result1[0].exhibitor_id }" WHERE card_id = "${card_id}"`;
                        con.query(sql4, function(err, result4, fields) {
                            if (err) throw err;
                        });
                        if (err) throw err;
                    });
                }
                if (err) throw err;
            });
            if (err) throw err;
        });
        if (err) throw err;
    });
}

async function display_mccard() {
    try {
        var result = await getDisplay9();
        // console.log(result);
        return result;
    } catch (error) {
        console.log(error)
    }
}

function getDisplay9() {
    return new Promise((resolve, reject) => {
        var sqlDisplay = "SELECT card_id, spend_amt, spend_date, payment_mode, event_name, exhibitor.email_id, email_id_visitor FROM megaconsumercard JOIN eventt ON megaconsumercard.event_id = eventt.event_id JOIN visitor ON megaconsumercard.visitor_id = visitor.visitor_id JOIN exhibitor ON megaconsumercard.exhibitor_id = exhibitor.exhibitor_id order by card_id  ";
        con.query(
            sqlDisplay,
            (err, result) => {
                // console.log(result);
                return err ? reject(err) : resolve(result);
            }
        );
    });
}

module.exports = {
    insert_mccard: insert_mccard,
    delete_mccard: delete_mccard,
    update_mccard: update_mccard,
    display_mccard: display_mccard
}