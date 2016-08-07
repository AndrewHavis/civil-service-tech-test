'use strict';

// Declare our candidates object
let candidates = {};

// Get the candidates list from /candidates via jQuery
$.get('/candidates', (data) => {
    
    // Parse the JSON
    candidates = data.candidates;
    
    console.log(candidates);

    // Create the candidate list
    $(() => {
        $.each(candidates, (i, candidate) => {
            console.log(candidate);
            $('<tr>').attr('class', 'dataRow').append(
                $('<td>').text(candidate.id),
                $('<td>').text(candidate.name)
            )
            .click(() => {
                // When our row is clicked, show the candidate's details
                $('#candidate-name').text(candidate.name);
                $('#candidate-id').text(candidate.id);
                $('#candidate-age').text(candidate.age);
                $('#candidate-summary').text(candidate.summary);
            })
            .appendTo('#candidate-list-table');
        });
    });
    
    // Show the details for the first candidate on page load
    $('#candidate-name').text(candidates[0].name);
    $('#candidate-id').text(candidates[0].id);
    $('#candidate-age').text(candidates[0].age);
    $('#candidate-summary').text(candidates[0].summary);
    
});

$(document).ready(() => {
    
    // Set up the candidate search
    // This doesn't seem to work with ES6 arrow notation, so we will use the traditional function() notation here instead
    $('#candidate-search').keyup(function() {
        
        // Get our search query
        let searchQuery = $(this).val();
        
        // Hide all rows first unless the search query is blank
        if (searchQuery !== '') {
            
            // Hide all rows first
            $('#candidate-list-table tr.dataRow').hide();
            
            // Now loop through our table rows, and show any that contain our query
            // We will make the search case-insensitive by converting both the query and text being searched to lower case
            $('#candidate-list-table tr.dataRow td').each(function(index, value) {
                if ($(this).text().toLowerCase().indexOf(searchQuery.toLowerCase()) >= 0) {
                    // Query found, so show the row
                    $(this).parent().show();
                }
            });
            
        }
        
        else {
            // Show all rows
            $('#candidate-list-table tr.dataRow').show();
        }
        
    });
});