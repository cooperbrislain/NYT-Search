const app_id = 'a464a31c-f136-4968-ac37-f77c3e1b4318';
const api_key = '7rD2m8tjA4uLzOF2ZYyYbx8MGkD0Ymfg';

$(document).ready(function() {
    $(document).on('click', 'button.search', (e) => {
        e.preventDefault();
        let search_term = $('.searchTerm').val();
        let num_records = $('.numRecords').val();
        let year_start = $('.startYear').val();
        let year_end = $('.endYear').val();
        let $url  = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${search_term}&api-key=${api_key}`
    });

    $(document).on('click', 'button.clearResults', (e) => {
        
    });
});