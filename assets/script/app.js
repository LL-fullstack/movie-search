'use strict';

import { }

const movieInput = document.getElementById('movieInput');
const searchBtn = document.getElementById('searchBtn');
const optionsContainer = document.getElementById('optionsContainer');
const movieDetails = document.getElementById('movieDetails');
  
// Function to show search suggestions
function showSuggestions() {
  const input = movieInput.value.toLowerCase();
  let suggestions = movies.filter(movie => movie.title.toLowerCase().includes(input)).slice(0, 3);
  optionsContainer.innerHTML = '';
  suggestions.forEach(movie => {
      const suggestion = document.createElement('a');
      suggestion.textContent = movie.title;
      suggestion.onclick = () => {
          displayMovieDetails(movie);
          optionsContainer.classList.remove('show');
      };
      optionsContainer.appendChild(suggestion);
  });
  if (input.length === 0) {
      optionsContainer.classList.remove('show');
  } else {
      optionsContainer.classList.add('show');
  }
}

// Function to search for a movie
function searchMovie() {
  const input = movieInput.value.toLowerCase();
  const movie = movies.find(movie => movie.title.toLowerCase() === input);
  if (movie) {
      displayMovieDetails(movie);
      optionsContainer.classList.remove('show');
  } else {
      alert('Movie not found!');
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

  