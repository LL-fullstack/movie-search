'use strict';

import movies from './movies.js';
import * as utils from './utils.js';

const movieInput = document.getElementById('movieInput');
const searchBtn = document.getElementById('searchBtn');
const optionsContainer = document.getElementById('optionsContainer');
const movieDetails = document.getElementById('movieDetails');

// Function to show search suggestions
function showSuggestions() {
  const input = movieInput.value.toLowerCase();
  let suggestions = movies.filter(movie => movie.title.toLowerCase().includes(input)).slice(0, 3);
  optionsContainer.innerHTML = '';
  if(input === undefined || input === '') {
    return;
  }

  if(suggestions === null || suggestions === undefined || suggestions.length <= 0) {
    const noResultSuggestion = document.createElement('a');
    noResultSuggestion.textContent ="No result found";
    optionsContainer.appendChild(noResultSuggestion);
  } else {
    suggestions.forEach(movie => {
        const suggestion = document.createElement('div');
        suggestion.classList.add('resultSuggestion');
        suggestion.textContent = movie.title;
        suggestion.addEventListener('click', function(event) {
            displayMovieDetails(movie);
            optionsContainer.classList.remove('show');
        })
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
  }
}

// Function to display movie details
function displayMovieDetails(movie) {
   clearInputs();

    // Create the movie banner container
    let movieBannerContainer = document.createElement('div');
    movieBannerContainer.classList.add('movie-section');

    // Create div for movie image
    let movieImageDiv = document.createElement('div');
    movieImageDiv.classList.add('movie-section');
    // Create the movie image
    let movieImg = document.createElement('img');
    movieImg.classList.add('movie-poster')
    movieImg.src = movie.poster;
    // Append user image and user info to user info container
    movieImageDiv.appendChild(movieImg);
    

    // Create the movie description column
    let movieHeader = document.createElement('div');
    movieHeader.classList.add('movie-description');
    movieHeader.classList.add('post-row');

    

    // Create the movie info container
    let movieInfoContainer = document.createElement('div');


    // Create the movie info
    let movieInfo = document.createElement('div');
   
    let paragraphTitle = document.createElement('p');
    paragraphTitle.classList.add('movie-title');
    paragraphTitle.textContent = movie.title;


    // Create the movie launch dates
    let paragraphLaunch = document.createElement('p');
    paragraphLaunch.innerHTML = movie.year + ' • ' + movie.runningTime;

    // Create the movie description
    let paragraphDescription = document.createElement('p');
    paragraphDescription.textContent = movie.description;

    movieInfoContainer.appendChild(paragraphTitle);
    movieInfoContainer.appendChild(movieInfo);
    movieInfoContainer.appendChild(paragraphLaunch);
    movieInfoContainer.appendChild(paragraphDescription);


    // Create the movie info container
    let genreContainer = document.createElement('div');
    genreContainer.classList.add('genre-section');

    // Create the movie description
    movie.genre.forEach( genre => {
        let paragraphGenres = document.createElement('div');
        paragraphGenres.classList.add('genres');
        paragraphGenres.textContent = genre;
        genreContainer.appendChild(paragraphGenres);
    }
    );

    //userInfoContainer.appendChild(userInfo);
    movieHeader.appendChild(movieInfoContainer); 
    movieHeader.appendChild(genreContainer);

    movieBannerContainer.appendChild(movieImageDiv);
    movieBannerContainer.appendChild(movieHeader);
    movieDetails.appendChild(movieBannerContainer);
    movieDetails.insertBefore(movieBannerContainer, movieDetails.firstChild);
}

movieInput.addEventListener('input', function(event) {
    showSuggestions();
});

movieInput.addEventListener('focus', function(event) {
    optionsContainer.classList.add('show');
});

searchBtn.addEventListener('click', function(event) {
    searchMovie()
});

function clearInputs() {
    movieDetails.innerHTML = '';
    movieInput.value = '';
    optionsContainer.innerHTML = '';
}
  