var connect = require('./connect');
var con = connect.start();

function delete_country(countryid) {
    var sqlDelete = `DELETE FROM country WHERE country_id = '${countryid}'`;
    con.query(sqlDelete, function(err, result, fields) {
        if (err) throw err;
        console.log("Given Country Id deleted");
    });
}

function delete_state(stateid) {
    var sqlDelete = `DELETE FROM state WHERE state_id = '${stateid}'`;
    con.query(sqlDelete, function(err, result, fields) {
        if (err) throw err;
        console.log("Given State Id deleted");
    });
}

function delete_venue(venueid) {
    var sqlDelete = `DELETE FROM venue WHERE venue_id = '${venueid}'`;
    con.query(sqlDelete, function(err, result, fields) {
        if (err) throw err;
        console.log("Given Venue Id deleted");
    });
}

function delete_event(eventid) {
    var sqlDelete = `DELETE FROM eventt WHERE event_id = '${eventid}'`;
    con.query(sqlDelete, function(err, result, fields) {
        if (err) throw err;
        console.log("Given Event Id deleted");
    });
}

function delete_industry(industryid) {
    var sqlDelete = `DELETE FROM industry WHERE industry_id = '${industryid}'`;
    con.query(sqlDelete, function(err, result, fields) {
        if (err) throw err;
        console.log("Given Industry Id deleted");
    });
}

function delete_stall(stallid) {
    var sqlDelete = `DELETE FROM stall WHERE stall_id = '${stallid}'`;
    con.query(sqlDelete, function(err, result, fields) {
        if (err) throw err;
        console.log("Given stall id deleted");
    });
}

function delete_visitor(visitorid) {
    var sqlDelete = `DELETE FROM visitor WHERE visitor_id = '${visitorid}'  `;
    con.query(sqlDelete, function(err, result, fields) {
        if (err) throw err;
        console.log("Given Visitor Id Deleted");
    });
}

function delete_mccard(card_id) {
    var sqlDelete = `DELETE FROM megaconsumercard WHERE card_id= '${card_id}'`;
    con.query(sqlDelete, function(err, result, fields) {
        if (err) throw err;
        console.log("Given mccard id deleted");
    });
}

function delete_exhibitor(exhibitorid) {
    var sqlDelete = `DELETE FROM exhibitor WHERE exhibitor_id = '${exhibitorid}'`;
    con.query(sqlDelete, function(err, result, fields) {
        if (err) throw err;
        console.log("Given Exhibitor Id deleted");
    });
}

function delete_booking(bookingid) {
    var sqlDelete = `DELETE FROM booking WHERE booking_id = '${bookingid}'`;
    con.query(sqlDelete, function(err, result, fields) {
        if (err) throw err;
        console.log("Given Booking Id Deleted");
    });
}

module.exports = {
    delete_country: delete_country,
    delete_state: delete_state,
    delete_venue: delete_venue,
    delete_event: delete_event,
    delete_industry: delete_industry,
    delete_stall: delete_stall,
    delete_visitor: delete_visitor,
    delete_mccard: delete_mccard,
    delete_exhibitor: delete_exhibitor,
    delete_booking: delete_booking
}