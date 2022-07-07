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
        var sqlDisplay = "SELECT * from state";
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
        var sqlDisplay = "SELECT * from venue";
        con.query(
            sqlDisplay,
            (err, result) => {
                return err ? reject(err) : resolve(result);
            }
        );
    });
}

async function display_eventt() {
    try {
        var result = await getDisplay3();
        // console.log(result);
        return result;
    } catch (error) {
        console.log(error)
    }
}

function getDisplay3() {
    return new Promise((resolve, reject) => {
        var sqlDisplay = "select * from eventt";
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
        var sqlDisplay = "SELECT * from stall";
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
        var sqlDisplay = "SELECT * FROM megaconsumercard";
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
        // console.log(result);
        return result;
    } catch (error) {
        console.log(error)
    }
}

function getDisplay6() {
    return new Promise((resolve, reject) => {
        var sqlDisplay = "SELECT * from exhibitor";
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
        // console.log(result);
        return result;
    } catch (error) {
        console.log(error)
    }
}

function getDisplay7() {
    return new Promise((resolve, reject) => {
        var sqlDisplay = "SELECT * from booking";
        con.query(
            sqlDisplay,
            (err, result) => {
                return err ? reject(err) : resolve(result);
            }
        );
    });
}

async function display_company_sales() {
    try {
        var result = await getDisplay10();
        // console.log(result);
        return result;
    } catch (error) {
        console.log(error)
    }
}

function getDisplay10() {
    return new Promise((resolve, reject) => {
        var sqlDisplay = "select card_id,spend_amt,spend_date,payment_mode,booking.event_id,booking.booking_id,visitor_id,booking_date,total_amount,booking.exhibitor_id,exhibitor_name,email_id,phone_no,company_name,company_description,company_addr,company_pin_code,industry_id,country_id,state_id from megaconsumercard join booking ON megaconsumercard.booking_id=booking.booking_id join exhibitor ON booking.exhibitor_id=exhibitor.exhibitor_id";
        con.query(
            sqlDisplay,
            (err, result) => {
                console.log(result);
                return err ? reject(err) : resolve(result);
            }
        );
    });
}

module.exports = {
    display_country: display_country,
    display_state: display_state,
    display_venue: display_venue,
    display_eventt: display_eventt,
    display_industry: display_industry,
    display_stall: display_stall,
    display_visitor: display_visitor,
    display_mccard: display_mccard,
    display_exhibitor: display_exhibitor,
    display_booking: display_booking,
    display_company_sales: display_company_sales
}