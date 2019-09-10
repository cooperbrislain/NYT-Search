const app_id = 'a464a31c-f136-4968-ac37-f77c3e1b4318';
const api_key = '7rD2m8tjA4uLzOF2ZYyYbx8MGkD0Ymfg';

$(document).ready(function() {
    $(document).on('click', 'button.btn-search', (e) => {
        e.preventDefault();
        let search_term = $('.searchTerm').val();
        let num_records = $('.numRecords').val();
        let year_start = $('#startYear').val()? `${$('#startYear').val()}0101` : '';
        let year_end = $('#endYear').val()? `${$('#endYear').val()}1231` : '' ;
        let query_url  = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${search_term}&api-key=${api_key}`
        $.ajax({
            url: query_url,
            method: 'GET'
        })
        .then (response => {
            let results = response.response.docs;
            results.forEach(result => {
                console.log(result);
                $resultDOM = $('<div class="result">');
                $resultDOM.append($('<h1>').text(result.headline.main));
                $resultDOM.appendTo('body');
            });
        });
    });

    $(document).on('click', 'button.btn-clear', (e) => {
        e.preventDefault();
        $('input[type="text"]').val('');
    });
});