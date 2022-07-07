var connect = require('./connect');
var con = connect.start();

function insert_exhibitor(exhibitor_name, email_id, phone_no, company_name, company_description, company_addr, company_pin_code, industry_name, state_name, country_name) {
    var sql = `SELECT industry_id FROM industry WHERE industry_name  = '${industry_name}'`;
    con.query(sql, function(err, result, fields) {
        var sql1 = `SELECT state_id FROM state WHERE state_name  = '${state_name}'`;
        con.query(sql1, function(err, result1, fields) {
            var sql2 = `SELECT country_id  FROM country WHERE country_name = '${country_name}'`;
            con.query(sql2, function(err, result2, fields) {
                var sql3 = "INSERT INTO `exhibitor` (`exhibitor_name`, `email_id`, `phone_no`, `company_name`, `company_description`, `company_addr`, `company_pin_code`, `industry_id`, `state_id`, `country_id`) VALUES('" + exhibitor_name + "', '" + email_id + "', '" + phone_no + "' ,'" + company_name + "' , '" + company_description + "', '" + company_addr + "','" + company_pin_code + "','" + result[0].industry_id + "','" + result1[0].state_id + "' , '" + result2[0].country_id + "')";
                con.query(sql3, function(err, result3, fields) {
                    if (err) throw err;
                });
                if (err) throw err;
            });
            if (err) throw err;
        });
        if (err) throw err;
    });
}

function delete_exhibitor(exhibitorid) {
    var sqlDelete = `DELETE FROM exhibitor WHERE exhibitor_id = '${exhibitorid}'`;
    con.query(sqlDelete, function(err, result, fields) {
        if (err) throw err;
        console.log("Given Exhibitor Id deleted");
    });
}

function update_exhibitor(exhibitor_id, exhibitor_name, email_id, phone_no, company_name, company_description, company_addr, company_pin_code, industry_name, state_name, country_name) {
    var sql = `SELECT industry_id FROM industry WHERE industry_name = '${industry_name}'`;
    con.query(sql, function(err, result, fields) {
        var sql1 = `SELECT state_id FROM state WHERE state_name = '${state_name}'`;
        con.query(sql1, function(err, result1, fields) {
            var sql2 = `SELECT country_id FROM country WHERE country_name = '${country_name}'`;
            con.query(sql2, function(err, result2, fields) {
                var sql3 = `UPDATE exhibitor SET exhibitor_name="${exhibitor_name}",email_id="${email_id}",phone_no="${phone_no}",company_name="${company_name}",company_description="${company_description}",company_addr="${company_addr}",company_pin_code="${company_pin_code}",industry_id="${result[0].industry_id}",state_id="${result1[0].state_id}",country_id="${result2[0].country_id}" WHERE exhibitor_id = "${exhibitor_id}"`;
                con.query(sql3, function(err, result3, fields) {
                    if (err) throw err;
                });
                if (err) throw err;
            });
            if (err) throw err;
        });
        if (err) throw err;
    });
}

async function display_exhibitor() {
    try {
        var result = await getDisplay6();
        // console.log(result);
        return result;
    } catch (error) {
        console.log(error)
    }
}

function getDisplay6() {
    return new Promise((resolve, reject) => {
        var sqlDisplay = "SELECT exhibitor_id,exhibitor_name,email_id,phone_no,company_name,company_description,company_addr,company_pin_code,industry_name,state_name,country_name FROM exhibitor JOIN industry ON exhibitor.industry_id=industry.industry_id JOIN state ON exhibitor.state_id=state.state_id JOIN country ON exhibitor.country_id=country.country_id ";
        con.query(
            sqlDisplay,
            (err, result) => {
                return err ? reject(err) : resolve(result);
            }
        );
    });
}

module.exports = {
    insert_exhibitor: insert_exhibitor,
    delete_exhibitor: delete_exhibitor,
    update_exhibitor: update_exhibitor,
    display_exhibitor: display_exhibitor
}