var moment = require('moment');
var connect = require('./connect');
var con = connect.start();

function insert_visitor(first_name, last_name, addr, pin_code, mob_no, email_id, date_of_birth, gender) {
    var sql = `insert into visitor values(null, "${first_name}", "${last_name}", "${addr}", "${pin_code}", "${mob_no}", "${email_id}", DATE_ADD("${date_of_birth}", INTERVAL 0 MINUTE), "${gender}")`;
    con.query(sql, function(err, result, fields) {
        if (err) throw err;
    });
}

function delete_visitor(visitorid) {
    var sqlDelete = `DELETE FROM visitor WHERE visitor_id = '${visitorid}'  `;
    con.query(sqlDelete, function(err, result, fields) {
        if (err) throw err;
        console.log("Given Visitor Id Deleted");
    });
}

function update_visitor(visitor_id, first_name, last_name, addr, pin_code, mob_no, email_id, date_of_birth, gender) {
    date_of_birth = moment(new Date(date_of_birth).toISOString()).format("YYYY/MM/DD");
    var sql = `UPDATE visitor SET first_name="${first_name}",last_name="${last_name}",addr="${addr}",pin_code="${pin_code}",mob_no="${mob_no}",email_id_visitor="${email_id}",date_of_birth=DATE_ADD("${date_of_birth}", INTERVAL 0 MINUTE),gender="${gender}" WHERE visitor_id = "${visitor_id}"`;
    con.query(sql, function(err, result, fields) {
        if (err) throw err;
    });
}

async function display_visitor() {
    try {
        var result = await getDisplay8();
        // console.log(result);
        return result;
    } catch (error) {
        console.log(error)
    }
}

function getDisplay8() {
    return new Promise((resolve, reject) => {
        var sqlDisplay = "Select * from visitor";
        con.query(
            sqlDisplay,
            (err, result) => {
                return err ? reject(err) : resolve(result);
            }
        );
    });
}

module.exports = {
    insert_visitor: insert_visitor,
    delete_visitor: delete_visitor,
    update_visitor: update_visitor,
    display_visitor: display_visitor
}