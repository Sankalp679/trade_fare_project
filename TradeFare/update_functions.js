var connect = require('./connect');
var con = connect.start();

function update_country(country_name, country_id) {
    var sqlUpdate = `UPDATE country SET country_name = '${country_name}' WHERE country_id  = '${country_id}'`;
    con.query(sqlUpdate, function(err, result, fields) {
        if (err) throw err;
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

function update_event(event_id, event_name, booking_start_date, event_start_date, event_end_date, venue_city) {
    var sql = `SELECT venue_id FROM venue WHERE venue_city = '${venue_city}'`;
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

function update_industry(industry_name, industry_id) {
    var sql = `UPDATE industry SET industry_name="${industry_name}" WHERE industry_id = "${industry_id}"`;
    con.query(sql, function(err, result, fields) {
        if (err) throw err;
    });
}

function update_stall(stall_id, stall_no, stall_price, stall_size, is_booked, event_name) {
    var sql = `SELECTevent_id FROM eventt WHERE event_name = '${event_name}'`;
    con.query(sql, function(err, result, fields) {
        var sql1 = `UPDATE stall SET stall_no='${stall_no}', stall_price='${stall_price}',stall_size='${stall_size}',is_booked='${is_booked}',event_id='${result[0].event_id}' WHERE stall_id = '${stall_id}'`;
        con.query(sql1, function(err, result1, fields) {
            if (err) throw err;
        });
        if (err) throw err;
    });
}

function update_visitor(visitor_id, first_name, last_name, addr, pin_code, mob_no, email_id, date_of_birth, gender) {
    date_of_birth = moment(new Date(date_of_birth).toISOString()).format("YYYY/MM/DD");
    var sql = `UPDATE visitor SET first_name="${first_name}",last_name="${last_name}",addr="${addr}",pin_code="${pin_code}",mob_no="${mob_no}",email_id="${email_id}",date_of_birth=DATE_ADD("${date_of_birth}", INTERVAL 0 MINUTE),gender="${gender}" WHERE visitor_id = "${visitor_id}"`;
    con.query(sql, function(err, result, fields) {
        if (err) throw err;
    });
}

function update_mccard(card_id, spend_amt, spend_date, payment_mode, event_name, email_id) {
    spend_date = moment(new Date(spend_date).toISOString()).format("YYYY/MM/DD");
    var sql = `SELECT event_id FROM eventt WHERE event_name = '${event_name}'`;
    con.query(sql, function(err, result, fields) {
        var sql1 = `SELECT visitor_id FROM visitor WHERE email_id = "${email_id}"`;
        con.query(sql1, function(err, result1, fields) {
            var sql2 = `UPDATE megaconsumercard SET spend_amt="${spend_amt}",spend_date=DATE_ADD("${spend_date}", INTERVAL 0 MINUTE),payment_mode="${payment_mode}",event_id="${result[0].event_id}",visitor_id="${result1[0].visitor_id}" WHERE card_id = "${card_id}"`;
            con.query(sql2, function(err, result2, fields) {
                if (err) throw err;
            });
            if (err) throw err;
        });
        if (err) throw err;
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


module.exports = {
    update_country: update_country,
    update_state: update_state,
    update_venue: update_venue,
    update_event: update_event,
    update_industry: update_industry,
    update_stall: update_stall,
    update_visitor: update_visitor,
    update_mccard: update_mccard,
    update_exhibitor: update_exhibitor,
    update_booking: update_booking
}