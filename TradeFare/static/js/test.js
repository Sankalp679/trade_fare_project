


const URL = 'http://127.0.0.1:5000/test'
fetch(URL)
    .then(function (response) {
        return response.json();
    }).then(function (text) {
        console.log('GET response:');
        console.log(text);
    });