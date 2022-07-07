var connect = require('./connect');
var con = connect.start();

function insert_stall(stall_no, stall_price, stall_size, is_booked, event_name) {
    var sql = `SELECT event_id FROM eventt WHERE event_name = '${event_name}'`;
    con.query(sql, function(err, result, fields) {
        var sql1 = "INSERT INTO `stall` (`stall_no`, `stall_price`, `stall_size`, `is_booked`, `event_id`) VALUES( '" + stall_no + "', '" + stall_price + "', '" + stall_size + "', '" + is_booked + "', '" + result[0].event_id + "')"
        con.query(sql1, function(err, result1, fields) {
            if (err) throw err;
        });
        if (err) throw err;
    });
}

function delete_stall(stallid) {
    var sqlDelete = `DELETE FROM stall WHERE stall_id = '${stallid}'`;
    con.query(sqlDelete, function(err, result, fields) {
        if (err) throw err;
        console.log("Given stall id deleted");
    });
}

function update_stall(stall_id, stall_no, stall_price, stall_size, is_booked, event_name) {
    var sql = `SELECT event_id FROM eventt WHERE event_name = '${event_name}'`;
    con.query(sql, function(err, result, fields) {
        var sql1 = `UPDATE stall SET stall_no='${stall_no}', stall_price='${stall_price}',stall_size='${stall_size}',is_booked='${is_booked}',event_id='${result[0].event_id}' WHERE stall_id = '${stall_id}'`;
        con.query(sql1, function(err, result1, fields) {
            if (err) throw err;
        });
        if (err) throw err;
    });
}

async function display_stall() {
    try {
        var result = await getDisplay4();
        // console.log(result);
        return result;
    } catch (error) {
        console.log(error)
    }
}

function getDisplay4() {
    return new Promise((resolve, reject) => {
        var sqlDisplay = "SELECT stall_id,stall_no,stall_price,stall_size,is_booked,event_name FROM stall JOIN eventt ON stall.event_id=eventt.event_id";
        con.query(
            sqlDisplay,
            (err, result) => {
                return err ? reject(err) : resolve(result);
            }
        );
    });
}

module.exports = {
    insert_stall: insert_stall,
    display_stall: display_stall,
    delete_stall: delete_stall,
    update_stall: update_stall
}