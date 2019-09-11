const app_id = 'a464a31c-f136-4968-ac37-f77c3e1b4318';
const api_key = '7rD2m8tjA4uLzOF2ZYyYbx8MGkD0Ymfg';

const google_geocode_api_key = 'AIzaSyAz7eNW1XE8Mb4PQfvetmdAUkOnk9O5qzg';
let earth; 
let page = 0;
let changed = false;

function initialize() {
    earth = new WE.map('globe');
    WE.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
        attribution: '© OpenStreetMap contributors'
    }).addTo(earth);
    var before = null;
    requestAnimationFrame(function animate(now) {
        var c = earth.getPosition();
        var elapsed = before? now - before: 0;
        before = now;
        earth.setCenter([c[0], c[1] + 0.05*(elapsed/30)]);
        requestAnimationFrame(animate);
    });
}

function loadStories() {
    let search_term = $('#searchTerm').val();
    let query_url  = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${search_term}&api-key=${api_key}&page=${page}`
    $.ajax({
        url: query_url,
        method: 'GET'
    })
    .then (response => {
        let results = response.response.docs;
        changed = false;
        $('.btn-more').collapse('show');
        results.forEach(result => {
            let wheres = result.keywords.filter(ob => {
                return ob.name === 'glocations';
            });
            if (wheres.length) {
                where = wheres[0].value;
                $.ajax({
                    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${where}&key=${google_geocode_api_key}`,
                    method: 'GET'
                })
                .then ((response) => {
                    let location = response.results[0].geometry.location;
                    let marker = WE.marker([location.lat, location.lng]).addTo(earth);
                    marker.bindPopup(`<a href="${result.web_url}" target="_blank">${result.headline.main}</a>`, {maxWidth: 150}).openPopup();
                });
            }
        });
    });
}

$(document).ready(function() {
    initialize();

    $(document).on('click', 'button.btn-search', (e) => {
        e.preventDefault();
        page = 1;
        loadStories();
    });

    $(document).on('click', 'button.btn-more', (e) => {
        e.preventDefault();
        page++;
        loadStories();
    });

    $(document).on('click', 'button.btn-clear', (e) => {
        e.preventDefault();
        $('#globe>div').remove();
        $('.btn-more').collapse('hide');
        $('input[type="text"]').val('');

    });

    $(document).on('change','input#searchTerm', (e) => {
        console.log('change');
        $('.btn-more').collapse('hide');
        changed = true;
    });

    $(document).on('keypress','input#searchTerm', (e) => {
        if (e.which == 13) {
            e.preventDefault();
            if (changed) {
                page = 1;
                loadStories();
            } else {
                page++;
                loadStories();
            }
        }
    });
});