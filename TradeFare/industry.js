var connect = require('./connect');
var con = connect.start();

function insert_industry(industry_name) {
    var sql = "INSERT INTO `industry` (`industry_name`) VALUES('" + industry_name + " ')";
    con.query(sql, function(err, result, fields) {
        if (err) throw err;
    });
}

function delete_industry(industryid) {
    var sqlDelete = `DELETE FROM industry WHERE industry_id = '${industryid}'`;
    con.query(sqlDelete, function(err, result, fields) {
        if (err) throw err;
        console.log("Given Industry Id deleted");
    });
}


function update_industry(industry_name, industry_id) {
    var sql = `UPDATE industry SET industry_name="${industry_name}" WHERE industry_id = "${industry_id}"`;
    con.query(sql, function(err, result, fields) {
        if (err) throw err;
    });
}

async function display_industry() {
    try {
        var result = await getDisplay5();
        // console.log(result);
        return result;
    } catch (error) {
        console.log(error)
    }
}

function getDisplay5() {
    return new Promise((resolve, reject) => {
        var sqlDisplay = "SELECT * FROM industry";
        con.query(
            sqlDisplay,
            (err, result) => {
                return err ? reject(err) : resolve(result);
            }
        );
    });
}

module.exports = {
    insert_industry: insert_industry,
    display_industry: display_industry,
    delete_industry: delete_industry,
    update_industry: update_industry
}