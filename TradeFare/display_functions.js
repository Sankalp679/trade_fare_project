var connect = require('./connect');
var con = connect.start();

async function display_country() {
    try {
        var result = await getDisplay();
        return result;
    } catch (error) {
        console.log(error)
    }
}

function getDisplay() {
    return new Promise((resolve, reject) => {
        var sqlDisplay = "SELECT * FROM country";
        con.query(
            sqlDisplay,
            (err, result) => {
                return err ? reject(err) : resolve(result);
            }
        );
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

async function display_venue() {
    try {
        var result = await getDisplay2();
        return result;
    } catch (error) {
        console.log(error)
    }
}

function getDisplay2() {
    return new Promise((resolve, reject) => {
        var sqlDisplay = "SELECT venue_id, venue_city, venue_addr, state_name, country_name FROM venue JOIN state ON venue.state_id = state.state_id JOIN country ON venue.country_id = country.country_id ";
        con.query(
            sqlDisplay,
            (err, result) => {
                return err ? reject(err) : resolve(result);
            }
        );
    });
}

async function display_event() {
    try {
        var result = await getDisplay3();
        console.log(result);
        return result;
    } catch (error) {
        console.log(error)
    }
}

function getDisplay3() {
    return new Promise((resolve, reject) => {
        var sqlDisplay = "select  event_id, event_name, booking_start_date, event_start_date, event_end_date, venue_city from eventt join venue where eventt.venue_id=venue.venue_id order by event_id";
        con.query(
            sqlDisplay,
            (err, result) => {
                return err ? reject(err) : resolve(result);
            }
        );
    });
}

async function display_industry() {
    try {
        var result = await getDisplay5();
        console.log(result);
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

async function display_stall() {
    try {
        var result = await getDisplay4();
        console.log(result);
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

async function display_visitor() {
    try {
        var result = await getDisplay8();
        console.log(result);
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

async function display_mccard() {
    try {
        var result = await getDisplay9();
        console.log(result);
        return result;
    } catch (error) {
        console.log(error)
    }
}

function getDisplay9() {
    return new Promise((resolve, reject) => {
        var sqlDisplay = "SELECT card_id, spend_amt, spend_date, payment_mode, event_name, email_id FROM megaconsumercard JOIN eventt ON megaconsumercard.event_id = eventt.event_id JOIN visitor ON megaconsumercard.visitor_id = visitor.visitor_id order by card_id ";
        con.query(
            sqlDisplay,
            (err, result) => {
                return err ? reject(err) : resolve(result);
            }
        );
    });
}


async function display_exhibitor() {
    try {
        var result = await getDisplay6();
        console.log(result);
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

async function display_booking() {
    try {
        var result = await getDisplay7();
        console.log(result);
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
    display_country: display_country,
    display_state: display_state,
    display_venue: display_venue,
    display_event: display_event,
    display_industry: display_industry,
    display_stall: display_stall,
    display_visitor: display_visitor,
    display_mccard: display_mccard,
    display_exhibitor: display_exhibitor,
    display_booking: display_booking
}