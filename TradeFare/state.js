var connect = require('./connect');
var con = connect.start();

// async function insert_state(state_name, country_name) {
//     try {
//         var result = await getId(country_name);
//         var sql1 = "INSERT INTO `state` (`state_name`, `country_id`) VALUES('" + state_name + " ', '" + result[0].country_id + "')";
//         con.query(sql1, function(err, result2, fields) {
//             if (err) throw err;
//         });
//     } catch (error) {
//         console.log(error)
//     }
// }

// function getId(country_name) {
//     return new Promise((resolve, reject) => {
//         var sql = `SELECT country_id FROM country WHERE country_name = '${country_name}'`;
//         con.query(
//             sql,
//             (err, result) => {
//                 return err ? reject(err) : resolve(result);
//             }
//         );
//     });
// }

function insert_state(state_name, country_name) {
    var sql = `SELECT country_id FROM country WHERE country_name = '${country_name}'`;
    con.query(sql, function(err, result, fields) {
        var sql1 = "INSERT INTO `state` (`state_name`, `country_id`) VALUES('" + state_name + " ', '" + result[0].country_id + "')";
        con.query(sql1, function(err, result1, fields) {
            if (err) throw err;
        });
        if (err) throw err;
    });
}

function delete_state(stateid) {
    var sqlDelete = `DELETE FROM state WHERE state_id = '${stateid}'`;
    con.query(sqlDelete, function(err, result, fields) {
        if (err) throw err;
        console.log("Given State Id deleted");
    });
}

function update_state(state_id, state_name, country_name) {
    var sql = `SELECT country_id FROM country WHERE country_name = '${country_name}'`;
    con.query(sql, function(err, result, fields) {
        var sql1 = `UPDATE state SET state_name='${state_name}',country_id='${result[0].country_id}' WHERE state_id = '${state_id}'`;
        con.query(sql1, function(err, result, fields) {
            if (err) throw err;
        });
        if (err) throw err;
    });
}

async function display_state() {
    try {
        var result = await getDisplay1();
        return result;
    } catch (error) {
        console.log(error)
    }
}

function getDisplay1() {
    return new Promise((resolve, reject) => {
        var sqlDisplay = "SELECT state_id,state_name,country_name FROM state JOIN country ON state.country_id=country.country_id";
        con.query(
            sqlDisplay,
            (err, result) => {
                return err ? reject(err) : resolve(result);
            }
        );
    });
}

module.exports = {
    insert_state: insert_state,
    display_state: display_state,
    delete_state: delete_state,
    update_state: update_state
}