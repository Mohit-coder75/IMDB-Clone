
let omdbApiKey = '176f1929';
document.addEventListener('DOMContentLoaded', () => {
  // Get IMDb ID from query parameter
  const imdbID = getQueryParam('imdbID');
  

  // Fetch and display movie details
  if (imdbID ) {
    showMovieDetails(imdbID);
  }
});


async function showMovieDetails(imdbID) {
    const omdbDetailUrl = `https://www.omdbapi.com/?i=${imdbID}&apikey=${omdbApiKey}`;
  
    try {
      const response = await fetch(omdbDetailUrl);
  
      if (response.ok) {
        const movieDetails = await response.json();
        
        showMovieDetailsPage(movieDetails);
      } else {
        console.error(`Request failed with status: ${response.status}`);
      }
    } catch (error) {
      console.error(error);
    }
  }


  function showMovieDetailsPage(movieDetails) {
    const poster = document.getElementById('poster');
    const title = document.getElementById('title');
    const info = document.getElementById('info');
    const plot = document.getElementById('plot');
    const genre = document.getElementById('genre');
    const director = document.getElementById('director');
    const actors = document.getElementById('actors');
  
    poster.src = movieDetails.Poster;
    title.textContent = movieDetails.Title;
    info.textContent = `Release Year: ${movieDetails.Year} | Type: ${movieDetails.Type}`;
    plot.textContent = `Plot: ${movieDetails.Plot}`;
    genre.textContent = `Genre: ${movieDetails.Genre}`;
    director.textContent = `Director: ${movieDetails.Director}`;
    actors.textContent = `Actors: ${movieDetails.Actors}`;
  }
  


function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  }

  function goBack() {
    // Redirect to the index page
    window.location.href = '../index.html';
  }
 



