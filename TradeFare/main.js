var express = require('express');
var app = express();
var PORT = process.env.port || 4000;

var country = require('./country');
var state = require('./state');
var venue = require('./venue');
var eventt = require('./eventt');
var stall = require('./stall');
var exhibitor = require('./exhibitor');
var booking = require('./booking');
var eventt = require('./eventt');
var industry = require('./industry');
var mccard = require('./mccard');
var visitor = require('./visitor');
var dashboard_display = require('./dashboard_display');

const bodyparser = require('body-parser');

app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

// Static Middleware

app.use(express.static(__dirname));

app.get('/', function(req, res) {
    res.render('charts');
});

// Country

app.get('/country', function(req, res) {
    country.display_country().then(
        function(value) { res.render('country', { country_data: value }); },
        function(error) { return error; }
    );
});

app.post('/country', function(req, res) {
    var cn = req.body.country_name;
    country.insert_country(cn);
    res.redirect("/country");
});

app.get('/delete/:country_id', function(req, res) {
    console.log(req.params.country_id);
    country.delete_country(req.params.country_id)
    res.redirect("/country")
})

app.get('/update/:country_id/:country_name', function(req, res) {
    res.render('update_country', { country_id: req.params.country_id, country_name: req.params.country_name })
});

app.post('/update/:country_id/:country_name', function(req, res) {
    var cn = req.body.country_name;
    console.log(req.params.country_id);
    country.update_country(cn, req.params.country_id);
    res.redirect("/country");
});

// State

app.get('/state', function(req, res) {
    country.display_country().then(
        function(value1) {
            state.display_state().then(
                function(value2) { res.render('state', { country_data: value1, state_data: value2 }); },
                function(error) { return error; }
            );
        },
        function(error) { return error; }
    );
});

app.post('/state', function(req, res) {
    var cn = req.body.country_name;
    var sn = req.body.state_name;
    console.log(cn);
    console.log(sn);
    state.insert_state(sn, cn);
    res.redirect("/state");
});

app.get('/delete_state/:state_id', function(req, res) {
    console.log(req.params.state_id);
    state.delete_state(req.params.state_id);
    res.redirect("/state");
})

app.get('/update_state/:state_id/:state_name/:country_name', function(req, res) {
    var si = req.params.state_id;
    var cn = req.params.country_name;
    var sn = req.params.state_name;
    country.display_country().then(
        function(value) {
            res.render('update_state', {
                country_data: value,
                state_id: si,
                state_name: sn,
                country_name: cn
            });
        },
        function(error) { return error; }
    );
});

app.post('/update_state/:state_id/:state_name/:country_name', function(req, res) {
    var si = req.params.state_id;
    var cn = req.body.country_name;
    var sn = req.body.state_name;
    state.update_state(si, sn, cn);
    res.redirect("/state");
});

// Venue 

app.get('/venue', function(req, res) {
    country.display_country().then(
        function(value1) {
            state.display_state().then(
                function(value2) {
                    venue.display_venue().then(
                        function(value3) { res.render('venue', { country_data: value1, state_data: value2, venue_data: value3 }); },
                        function(error) { return error; }
                    );
                },
                function(error) { return error; }
            );
        },
        function(error) { return error; }
    );
});

app.post('/venue', function(req, res) {
    var cn = req.body.country_name;
    var sn = req.body.state_name;
    var vc = req.body.venue_city;
    var va = req.body.venue_addr;
    console.log(cn);
    console.log(sn);
    console.log(vc);
    console.log(va);
    venue.insert_venue(vc, va, sn, cn);
    res.redirect("/venue");
});

app.get('/delete_venue/:venue_id', function(req, res) {
    console.log(req.params.venue_id);
    var vi = req.params.venue_id;
    venue.delete_venue(vi);
    res.redirect("/venue");
});

app.get('/update_venue/:venue_id/:venue_city/:venue_addr/:state_name/:country_name', function(req, res) {
    var vc = req.params.venue_city;
    var va = req.params.venue_addr;
    var cn = req.params.country_name;
    var sn = req.params.state_name;
    var vi = req.params.venue_id;
    country.display_country().then(
        function(value1) {
            state.display_state().then(
                function(value2) {
                    res.render('update_venue', {
                        country_data: value1,
                        state_data: value2,
                        venue_id: vi,
                        venue_city: vc,
                        venue_addr: va,
                        state_name: sn,
                        country_name: cn
                    });
                },
                function(error) { return error; }
            );
        },
        function(error) { return error; }
    );
});

app.post('/update_venue/:venue_id/:venue_city/:venue_addr/:state_name/:country_name', function(req, res) {
    var cn = req.body.country_name;
    var sn = req.body.state_name;
    var vc = req.body.venue_city;
    var va = req.body.venue_addr;
    var vi = req.params.venue_id;
    venue.update_venue(vi, vc, va, sn, cn);
    res.redirect("/venue");
});

// Event

app.get('/event', function(req, res) {
    eventt.display_event().then(
        function(value1) {
            venue.display_venue().then(
                function(value2) {
                    res.render('event', {
                        venue_data: value2,
                        event_data: value1
                    });
                },
                function(error) { return error; }
            );
        },
        function(error) { return error; }
    );
});

app.post('/event', function(req, res) {
    var en = req.body.event_name;
    var bs = req.body.booking_start_date;
    var es = req.body.event_start_date;
    var ee = req.body.event_end_date;
    var va = req.body.venue_addr;
    eventt.insert_event(en, bs, es, ee, va);
    res.redirect("/event");
});

app.get('/delete_event/:event_id', function(req, res) {
    console.log(req.params.event_id);
    var ei = req.params.event_id;
    eventt.delete_event(ei);
    res.redirect("/event");
});

app.get('/update_event/:event_id/:event_name/:booking_start_date/:event_start_date/:event_end_date/:venue_addr', function(req, res) {
    var ei = req.params.event_id;
    var en = req.params.event_name;
    var bs = req.params.booking_start_date;
    var es = req.params.event_start_date;
    var ee = req.params.event_end_date;
    var va = req.params.venue_addr;
    venue.display_venue().then(
        function(value1) {
            res.render('update_event', {
                event_id: ei,
                event_name: en,
                booking_start_date: bs,
                event_start_date: es,
                event_end_date: ee,
                venue_addr: va,
                venue_data: value1
            });
        },
        function(error) { return error; }
    );
});

app.post('/update_event/:event_id/:event_name/:booking_start_date/:event_start_date/:event_end_date/:venue_addr', function(req, res) {
    var ei = req.params.event_id;
    var en = req.body.event_name;
    var bs = req.body.booking_start_date;
    var es = req.body.event_start_date;
    var ee = req.body.event_end_date;
    var va = req.body.venue_addr;
    eventt.update_event(ei, en, bs, es, ee, va);
    res.redirect("/event");
});

// Stall

app.get('/stall', function(req, res) {
    eventt.display_event().then(
        function(value1) {
            stall.display_stall().then(
                function(value2) {
                    res.render('stall', {
                        stall_data: value2,
                        event_data: value1
                    });
                },
                function(error) { return error; }
            );
        },
        function(error) { return error; }
    );
});

app.post('/stall', function(req, res) {
    var sn = req.body.stall_no;
    var sp = req.body.stall_price;
    var ss = req.body.stall_size;
    var ib = req.body.is_booked;
    var en = req.body.event_name;
    stall.insert_stall(sn, sp, ss, ib, en);
    res.redirect("/stall");
});

app.get('/delete_stall/:stall_id', function(req, res) {
    console.log(req.params.event_id);
    var si = req.params.stall_id;
    stall.delete_stall(si);
    res.redirect("/stall");
});

app.get('/update_stall/:stall_id/:stall_no/:stall_price/:stall_size/:is_booked/:event_name', function(req, res) {
    var si = req.params.stall_id;
    var sn = req.params.stall_no;
    var sp = req.params.stall_price;
    var ss = req.params.stall_size;
    var ib = req.params.is_booked;
    var en = req.params.event_name;
    eventt.display_event().then(
        function(value1) {
            res.render('update_stall', {
                stall_id: si,
                stall_no: sn,
                stall_price: sp,
                stall_size: ss,
                is_booked: ib,
                event_name: en,
                event_data: value1
            });
        },
        function(error) { return error; }
    );
});

app.post('/update_stall/:stall_id/:stall_no/:stall_price/:stall_size/:is_booked/:event_name', function(req, res) {
    var si = req.params.stall_id;
    var sn = req.body.stall_no;
    var sp = req.body.stall_price;
    var ss = req.body.stall_size;
    var ib = req.body.is_booked;
    var en = req.body.event_name;
    stall.update_stall(si, sn, sp, ss, ib, en);
    res.redirect("/stall");
});

// Industry

app.get('/industry', function(req, res) {
    industry.display_industry().then(
        function(value1) {
            res.render('industry', {
                industry_data: value1
            });
        },
        function(error) { return error; }
    );
});

app.post('/industry', function(req, res) {
    var it = req.body.industry_name;
    industry.insert_industry(it);
    res.redirect("/industry");
});

app.get('/delete_industry/:industry_id', function(req, res) {
    console.log(req.params.industry_id);
    var ii = req.params.industry_id;
    industry.delete_industry(ii);
    res.redirect("/industry");
});

app.get('/update_industry/:industry_id/:industry_name', function(req, res) {
    var ii = req.params.industry_id;
    var it = req.params.industry_name;
    res.render('update_industry', {
        industry_id: ii,
        industry_name: it
    });
});

app.post('/update_industry/:industry_id/:industry_name', function(req, res) {
    var ii = req.params.industry_id;
    var it = req.body.industry_name;
    industry.update_industry(it, ii);
    res.redirect("/industry");
});

// Exhibitor

app.get('/exhibitor', function(req, res) {
    industry.display_industry().then(
        function(value1) {
            exhibitor.display_exhibitor().then(
                function(value2) {
                    state.display_state().then(
                        function(value3) {
                            country.display_country().then(
                                function(value4) {
                                    res.render('exhibitor', {
                                        industry_data: value1,
                                        country_data: value4,
                                        state_data: value3,
                                        exhibitor_data: value2
                                    });
                                },
                                function(error) { return error; }
                            );
                        },
                        function(error) { return error; }
                    );
                },
                function(error) { return error; }
            );
        },
        function(error) { return error; }
    );
});

app.post('/exhibitor', function(req, res) {
    var en = req.body.exhibitor_name;
    var ei = req.body.email_id;
    var pn = req.body.phone_no;
    var cn = req.body.company_name;
    var cd = req.body.company_description;
    var ca = req.body.company_addr;
    var cp = req.body.company_pin_code;
    var it = req.body.industry_name;
    var sn = req.body.state_name;
    var co = req.body.country_name;
    exhibitor.insert_exhibitor(en, ei, pn, cn, cd, ca, cp, it, sn, co);
    res.redirect("/exhibitor");
});

app.get('/delete_exhibitor/:exhibitor_id', function(req, res) {
    console.log(req.params.exhibitor_id);
    var ei = req.params.exhibitor_id;
    exhibitor.delete_exhibitor(ei);
    res.redirect("/exhibitor");
});

app.get('/update_exhibitor/:exhibitor_id/:exhibitor_name/:email_id/:phone_no/:company_name/:company_description/:company_addr/:company_pin_code/:industry_name/:state_name/:country_name', function(req, res) {
    var eid = req.params.exhibitor_id;
    var en = req.params.exhibitor_name;
    var ei = req.params.email_id;
    var pn = req.params.phone_no;
    var cn = req.params.company_name;
    var cd = req.params.company_description;
    var ca = req.params.company_addr;
    var cp = req.params.company_pin_code;
    var it = req.params.industry_name;
    var sn = req.params.state_name;
    var co = req.params.country_name;
    industry.display_industry().then(
        function(value1) {
            state.display_state().then(
                function(value2) {
                    country.display_country().then(
                        function(value3) {
                            res.render('update_exhibitor', {
                                industry_data: value1,
                                state_data: value2,
                                country_data: value3,
                                exhibitor_id: eid,
                                exhibitor_name: en,
                                email_id: ei,
                                phone_no: pn,
                                company_name: cn,
                                company_description: cd,
                                company_addr: ca,
                                company_pin_code: cp,
                                industry_name: it,
                                state_name: sn,
                                country_name: co,
                            });
                        },
                        function(error) { return error; }
                    );
                },
                function(error) { return error; }
            );
        },
        function(error) { return error; }
    );
});

app.post('/update_exhibitor/:exhibitor_id/:exhibitor_name/:email_id/:phone_no/:company_name/:company_description/:company_addr/:company_pin_code/:industry_name/:state_name/:country_name', function(req, res) {
    var eid = req.params.exhibitor_id;
    var en = req.body.exhibitor_name;
    var ei = req.body.email_id;
    var pn = req.body.phone_no;
    var cn = req.body.company_name;
    var cd = req.body.company_description;
    var ca = req.body.company_addr;
    var cp = req.body.company_pin_code;
    var it = req.body.industry_name;
    var sn = req.body.state_name;
    var co = req.body.country_name;
    exhibitor.update_exhibitor(eid, en, ei, pn, cn, cd, ca, cp, it, sn, co);
    res.redirect("/exhibitor");
});

// Booking
// 1 email id can book a paricular event only once but he can book in two different events

app.get('/booking', function(req, res) {
    booking.display_booking().then(
        function(value1) {
            eventt.display_event().then(
                function(value2) {
                    exhibitor.display_exhibitor().then(
                        function(value3) {
                            res.render('booking', {
                                booking_data: value1,
                                event_data: value2,
                                exhibitor_data: value3,
                            });
                        },
                        function(error) { return error; }
                    );
                },
                function(error) { return error; }
            );
        },
        function(error) { return error; }
    );
});

app.post('/booking', function(req, res) {
    var bd = req.body.booking_date;
    var ta = req.body.total_amount;
    var en = req.body.event_name;
    var ei = req.body.email_id;
    booking.insert_booking(bd, ta, en, ei);
    res.redirect("/booking");
});

app.get('/delete_booking/:booking_id', function(req, res) {
    console.log(req.params.booking_id);
    var bi = req.params.booking_id;
    booking.delete_booking(bi);
    res.redirect("/booking");
});

app.get('/update_booking/:booking_id/:booking_date/:total_amount/:event_name/:email_id', function(req, res) {
    var bi = req.params.booking_id;
    var bd = req.params.booking_date;
    var ta = req.params.total_amount;
    var en = req.params.event_name;
    var eid = req.params.email_id;
    booking.display_booking().then(
        function(value1) {
            eventt.display_event().then(
                function(value2) {
                    exhibitor.display_exhibitor().then(
                        function(value3) {
                            res.render('update_booking', {
                                booking_data: value1,
                                event_data: value2,
                                exhibitor_data: value3,
                                booking_id: bi,
                                booking_date: bd,
                                total_amount: ta,
                                event_name: en,
                                email_id: eid
                            });
                        },
                        function(error) { return error; }
                    );
                },
                function(error) { return error; }
            );
        },
        function(error) { return error; }
    );
});

app.post('/update_booking/:booking_id/:booking_date/:total_amount/:event_name/:email_id', function(req, res) {
    var bi = req.params.booking_id;
    var bd = req.body.booking_date;
    var ta = req.body.total_amount;
    var en = req.body.event_name;
    var eid = req.body.email_id;
    booking.update_booking(bi, bd, ta, en, eid);
    res.redirect("/booking");
});

// Visitor

app.get('/visitor', function(req, res) {
    visitor.display_visitor().then(
        function(value1) {
            res.render('visitor', {
                visitor_data: value1
            });
        },
        function(error) { return error; }
    );
});

app.post('/visitor', function(req, res) {
    var fn = req.body.first_name;
    var ln = req.body.last_name;
    var ad = req.body.addr;
    var pc = req.body.pin_code;
    var mn = req.body.mob_no;
    var ei = req.body.email_id;
    var dob = req.body.date_of_birth;
    var ge = req.body.gender;
    visitor.insert_visitor(fn, ln, ad, pc, mn, ei, dob, ge);
    res.redirect("/visitor");
});

app.get('/delete_visitor/:visitor_id', function(req, res) {
    console.log(req.params.visitor_id);
    var vi = req.params.visitor_id;
    visitor.delete_visitor(vi);
    res.redirect("/visitor");
});

app.get('/update_visitor/:visitor_id/:first_name/:last_name/:addr/:pin_code/:mob_no/:email_id/:date_of_birth/:gender', function(req, res) {
    var vi = req.params.visitor_id;
    var fn = req.params.first_name;
    var ln = req.params.last_name;
    var ad = req.params.addr;
    var pc = req.params.pin_code;
    var mn = req.params.mob_no;
    var ei = req.params.email_id;
    var dob = req.params.date_of_birth;
    var ge = req.params.gender;
    res.render('update_visitor', {
        visitor_id: vi,
        first_name: fn,
        last_name: ln,
        addr: ad,
        pin_code: pc,
        mob_no: mn,
        email_id: ei,
        date_of_birth: dob,
        gender: ge
    });
});

app.post('/update_visitor/:visitor_id/:first_name/:last_name/:addr/:pin_code/:mob_no/:email_id/:date_of_birth/:gender', function(req, res) {
    var vi = req.params.visitor_id;
    var fn = req.body.first_name;
    var ln = req.body.last_name;
    var ad = req.body.addr;
    var pc = req.body.pin_code;
    var mn = req.body.mob_no;
    var ei = req.body.email_id;
    var dob = req.body.date_of_birth;
    var ge = req.body.gender;
    visitor.update_visitor(vi, fn, ln, ad, pc, mn, ei, dob, ge);
    res.redirect("/visitor");
});

// MegaConsumerCard
// 1 consumer will add only once the amount spent
// for a particular event but can add of two different event spend amount
// to uniquely identify we use exhibitor email id and event name as a composite key

app.get('/mccard', function(req, res) {
    mccard.display_mccard().then(
        function(value1) {
            eventt.display_event().then(
                function(value2) {
                    visitor.display_visitor().then(
                        function(value3) {
                            exhibitor.display_exhibitor().then(
                                function(value4) {
                                    booking.display_booking().then(
                                        function(value5) {
                                            res.render('mccard', {
                                                mccard_data: value1,
                                                event_data: value2,
                                                visitor_data: value3,
                                                exhibitor_data: value4,
                                                booking_data: value5
                                            });
                                        },
                                        function(error) { return error; }
                                    );
                                },
                                function(error) { return error; }
                            );
                        },
                        function(error) { return error; }
                    );
                },
                function(error) { return error; }
            );
        },
        function(error) { return error; }
    );
});

app.post('/mccard', function(req, res) {
    var sa = req.body.spend_amt;
    var sd = req.body.spend_date;
    var pm = req.body.payment_mode;
    var en = req.body.event_name;
    var ei = req.body.email_id;
    var eiv = req.body.email_id_visitor;
    mccard.insert_mccard(sa, sd, pm, en, ei, eiv);
    res.redirect("/mccard");
});

app.get('/delete_mccard/:mccard_id', function(req, res) {
    // console.log(req.params.mccard_id);
    var mi = req.params.mccard_id;
    mccard.delete_mccard(mi);
    res.redirect("/mccard");
});

app.get('/update_mccard/:card_id/:spend_amt/:spend_date/:payment_mode/:event_name/:email_id/:email_id_visitor', function(req, res) {
    var ci = req.params.card_id;
    var sa = req.params.spend_amt;
    var sd = req.params.spend_date;
    var pm = req.params.payment_mode;
    var en = req.params.event_name;
    var ei = req.params.email_id;
    var eiv = req.params.email_id_visitor;
    mccard.display_mccard().then(
        function(value1) {
            eventt.display_event().then(
                function(value2) {
                    visitor.display_visitor().then(
                        function(value3) {
                            exhibitor.display_exhibitor().then(
                                function(value4) {
                                    booking.display_booking().then(
                                        function(value5) {
                                            res.render('update_mccard', {
                                                mccard_data: value1,
                                                event_data: value2,
                                                visitor_data: value3,
                                                exhibitor_data: value4,
                                                booking_data: value5,
                                                card_id: ci,
                                                spend_amt: sa,
                                                spend_date: sd,
                                                payment_mode: pm,
                                                event_name: en,
                                                email_id: ei,
                                                email_id_visitor: eiv
                                            });
                                        },
                                        function(error) { return error; }
                                    );
                                },
                                function(error) { return error; }
                            );
                        },
                        function(error) { return error; }
                    );
                },
                function(error) { return error; }
            );
        },
        function(error) { return error; }
    );
});

app.post('/update_mccard/:card_id/:spend_amt/:spend_date/:payment_mode/:event_name/:email_id/:email_id_visitor', function(req, res) {
    var ci = req.params.card_id;
    var sa = parseInt(req.body.spend_amt);
    var sd = req.body.spend_date;
    var pm = req.body.payment_mode;
    var en = req.body.event_name;
    var ei = req.body.email_id;
    var eiv = req.body.email_id_visitor;
    mccard.update_mccard(ci, sa, sd, pm, en, ei, eiv);
    res.redirect("/mccard");
});

// Industry Dashboards (how can we find number in particular industry using exhibitor as the exhibitor himself have not book for an event yet, so how before booking only we can say about number of companies in particular industries)

app.get('/industry_data', function(req, res) {
    dashboard_display.display_industry().then(
        function(value1) {
            dashboard_display.display_exhibitor().then(
                function(value2) {
                    res.json({ val1: value1, val2: value2 });
                },
                function(error) { return error; }
            );
        },
        function(error) { return error; }
    );
});

app.get('/industry_chart', function(req, res) {
    res.render("industry_chart");
});

// Booking Dashboard 

app.get('/test', function(req, res) {
    dashboard_display.display_booking().then(
        function(value1) {
            dashboard_display.display_eventt().then(
                function(value2) {
                    res.json({ val1: value1, val2: value2 });
                },
                function(error) { return error; }
            );
        },
        function(error) { return error; }
    );
});

app.get('/charts', function(req, res) {
    res.render("charts");
});

// Company Sales Dashboard

app.get('/sales_company', function(req, res) {
    dashboard_display.display_company_sales().then(
        function(value1) {
            res.json({ val1: value1 });
        },
        function(error) { return error; }
    );
});

app.get('/company_sales', function(req, res) {
    res.render("company_sales");
});

app.listen(PORT, function(error) {
    if (error) throw error;
    console.log("Server created Successfully on PORT", PORT);
})