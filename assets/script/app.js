'use strict';

import movies from './movies.js';
import * as utils from './utils.js';

const movieInput = document.getElementById('movieInput');
const searchBtn = document.getElementById('searchBtn');
const optionsContainer = document.getElementById('optionsContainer');
const movieDetails = document.getElementById('movieDetails');
const errorDialog = document.getElementById("errorDialog");
const errorDialogCloseButton = document.getElementById("closeButton");

// Function to show search suggestions
function showSuggestions() {
  const input = movieInput.value.toLowerCase();
  let suggestions = movies.filter(movie => movie.title.toLowerCase().includes(input)).slice(0, 3);
  optionsContainer.innerHTML = '';
  console.log(suggestions);
  if(suggestions === null || suggestions === undefined || suggestions.length <= 0) {
    const noResultSuggestion = document.createElement('a');
    noResultSuggestion.textContent ="No result found";
    optionsContainer.appendChild(noResultSuggestion);
  } else {
    suggestions.forEach(movie => {
        const suggestion = document.createElement('a');
        suggestion.textContent = movie.title;
        suggestion.onclick = () => {
            displayMovieDetails(movie);
            optionsContainer.classList.remove('show');
        };
        optionsContainer.appendChild(suggestion);
    });
  }
}

// Function to search for a movie
function searchMovie() {
  showSuggestions();
  const input = movieInput.value.toLowerCase();
  const movie = movies.find(movie => movie.title.toLowerCase() === input);
  if (movie) {
      displayMovieDetails(movie);
      optionsContainer.classList.remove('show');
  } else {
    errorDialog.showModal();
  }
}

// Function to display movie details
function displayMovieDetails(movie) {
  movieDetails.innerHTML = `
      <h2>${movie.title}</h2>
      <p>Year: ${movie.year}</p>
      <p>Running Time: ${movie.runningTime}</p>
      <p>Description: ${movie.description}</p>
      <p>Genres: ${movie.genre.join(', ')}</p>
      <img src="${movie.poster}" alt="${movie.title}">
  `;
}

movieInput.addEventListener('input', function(event) {
    showSuggestions();
});

movieInput.addEventListener('focus', function(event) {
    optionsContainer.classList.add('show');
});

movieInput.addEventListener('focusout', function(event) {
    optionsContainer.classList.remove('show');
});

searchBtn.addEventListener('click', function(event) {
    searchMovie()
});

errorDialogCloseButton.addEventListener('click', function(event) {
    errorDialog.close();
}
);  
  