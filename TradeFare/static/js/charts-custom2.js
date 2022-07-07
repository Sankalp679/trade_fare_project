/*global $, document, LINECHARTEXMPLE*/
$(document).ready(async function() {
    'use strict';
    var l, d, value1, value2;
    const industry_map = [];
    const industry_exhibitor = [];
    const industry_exhibitor_keys = [];
    const industry_exhibitor_values = [];
    await fetch('/industry_data')
        .then(function(response) {
            return response.json();
        })
        .then(function(text) {
            // console.log('GET response:');
            value1 = (text.val1);
            value2 = (text.val2);
            value1.forEach((item) => {
                industry_map[item.industry_id] = item.industry_name;
            });
            value2.forEach((item) => {
                var iname = industry_map[item.industry_id];
                if (industry_exhibitor[iname]) {
                    industry_exhibitor[iname] += 1;
                } else {
                    industry_exhibitor[iname] = 1;
                }
            });
            for (let word in industry_exhibitor) {
                industry_exhibitor_keys.push(word);
                industry_exhibitor_values.push(industry_exhibitor[word]);
            }
            l = industry_exhibitor_keys;
            d = industry_exhibitor_values;
            return { 'l': industry_exhibitor_keys, 'd': industry_exhibitor_values }
        });

    var brandPrimary = 'rgba(51, 179, 90, 1)';

    var LINECHARTEXMPLE = $('#lineChartExample'),
        PIECHARTEXMPLE = $('#pieChartExample'),
        BARCHARTEXMPLE = $('#barChartExample'),
        RADARCHARTEXMPLE = $('#radarChartExample'),
        POLARCHARTEXMPLE = $('#polarChartExample');

    var lineChartExample = new Chart(LINECHARTEXMPLE, {

        type: 'line',
        data: {
            labels: l,
            datasets: [{
                    label: "Industrywise Booking",
                    fill: true,
                    lineTension: 0.3,
                    backgroundColor: "rgba(51, 179, 90, 0.38)",
                    borderColor: brandPrimary,
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    borderWidth: 1,
                    pointBorderColor: brandPrimary,
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: brandPrimary,
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: d,
                    spanGaps: false
                },

            ]
        }
    });

    var pieChartExample = new Chart(PIECHARTEXMPLE, {
        type: 'doughnut',
        data: {
            labels: l,
            datasets: [{
                data: d,
                borderWidth: [1, 1, 1],
                backgroundColor: [
                    brandPrimary,
                    "rgba(75,192,192,1)",
                    "#FFCE56"
                ],
                hoverBackgroundColor: [
                    brandPrimary,
                    "rgba(75,192,192,1)",
                    "#FFCE56"
                ]
            }]
        }
    });

    var pieChartExample = {
        responsive: true
    };

    var barChartExample = new Chart(BARCHARTEXMPLE, {
        type: 'bar',
        data: {
            labels: l,
            datasets: [{
                    label: "Industrywise Booking",
                    backgroundColor: [
                        'rgba(51, 179, 90, 0.6)',
                        'rgba(51, 179, 90, 0.6)',
                        'rgba(51, 179, 90, 0.6)',
                        'rgba(51, 179, 90, 0.6)',
                        'rgba(51, 179, 90, 0.6)',
                        'rgba(51, 179, 90, 0.6)',
                        'rgba(51, 179, 90, 0.6)'
                    ],
                    borderColor: [
                        'rgba(51, 179, 90, 1)',
                        'rgba(51, 179, 90, 1)',
                        'rgba(51, 179, 90, 1)',
                        'rgba(51, 179, 90, 1)',
                        'rgba(51, 179, 90, 1)',
                        'rgba(51, 179, 90, 1)',
                        'rgba(51, 179, 90, 1)'
                    ],
                    borderWidth: 1,
                    data: d,
                },

            ]
        },
        options: {
            scales: {
                xAxes: [{
                    ticks: {
                        min: 0
                    }
                }],
                yAxes: [{
                    ticks: {
                        min: 0
                    }
                }]
            }
        }
    });

    var polarChartExample = new Chart(POLARCHARTEXMPLE, {
        type: 'polarArea',
        data: {
            datasets: [{
                data: d,
                backgroundColor: [
                    "rgba(51, 179, 90, 1)",
                    "#FF6384",
                    "#FFCE56"
                ],
                label: 'My dataset' // for legend
            }],
            labels: l
        }
    });

    var polarChartExample = {
        responsive: true
    };
});