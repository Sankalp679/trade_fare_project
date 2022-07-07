var connect = require('./connect');
var con = connect.start();

function insert_country(country_name) {
    var sql = "INSERT INTO `country` (`country_name`) VALUES('" + country_name + "')";
    con.query(sql, function(err, result, fields) {
        if (err) throw err;
    });
}

function insert_state(state_name, country_name) {
    var sql = `SELECT country_id FROM country WHERE country_name = '${country_name}'`;
    con.query(sql, function(err, result, fields) {
        var sql1 = "INSERT INTO `state` (`state_name`, `country_id`) VALUES('" + state_name + " ', '" + result + "')";
        con.query(sql1, function(err, result, fields) {
            if (err) throw err;
        });
        if (err) throw err;
    });
}

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

function insert_event(event_name, booking_start_date, event_start_date, event_end_date, venue_city) {
    var sql = `SELECT venue_id FROM venue WHERE venue_city = '${venue_city}'`;
    con.query(sql, function(err, result, fields) {
        var sql1 = `insert into eventt values(null,'${event_name}',DATE_ADD('${booking_start_date}', INTERVAL 0 MINUTE),DATE_ADD('${event_start_date}',INTERVAL 0 MINUTE),DATE_ADD('${event_end_date}',INTERVAL 0 MINUTE),'${result[0].venue_id}')`;
        con.query(sql1, function(err, result1, fields) {
            if (err) throw err;
        });
        if (err) throw err;
    });
}

function insert_industry(industry_name) {
    var sql = "INSERT INTO `industry` (`industry_name`) VALUES('" + industry_name + " ')";
    con.query(sql, function(err, result, fields) {
        if (err) throw err;
    });
}

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

function insert_visitor(first_name, last_name, addr, pin_code, mob_no, email_id, date_of_birth, gender) {
    var sql = `insert into visitor values(null, "${first_name}", "${last_name}", "${addr}", "${pin_code}", "${mob_no}", "${email_id}", DATE_ADD("${date_of_birth}", INTERVAL 0 MINUTE), "${gender}")`;
    con.query(sql, function(err, result, fields) {
        if (err) throw err;
    });
}

function insert_mccard(spend_amt, spend_date, payment_mode, event_name, email_id) {
    var sql = `SELECT event_id FROM eventt WHERE event_name = '${event_name}'`;
    con.query(sql, function(err, result, fields) {
        var sql1 = `SELECT visitor_id FROM visitor WHERE email_id = "${email_id}"`;
        con.query(sql1, function(err, result1, fields) {
            var sql2 = `insert into megaconsumercard values(null, "${spend_amt}", DATE_ADD("${spend_date}", INTERVAL 0 MINUTE), "${payment_mode}", "${result[0].event_id}","${result1[0].visitor_id}")`;
            con.query(sql2, function(err, result, fields) {
                if (err) throw err;
            });
            if (err) throw err;
        });
        if (err) throw err;
    });
}

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


module.exports = {
    insert_country: insert_country,
    insert_state: insert_state,
    insert_venue: insert_venue,
    insert_event: insert_event,
    insert_industry: insert_industry,
    insert_stall: insert_stall,
    insert_visitor: insert_visitor,
    insert_mccard: insert_mccard,
    insert_exhibitor: insert_exhibitor,
    insert_booking: insert_booking
}