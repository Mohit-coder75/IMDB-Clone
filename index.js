

let omdbApiKey = '176f1929';

let searchQuery = ''; 


const storedSearchQuery = sessionStorage.getItem('lastSearchQuery');
if (storedSearchQuery) {
    document.getElementById('searchInput').value = storedSearchQuery;
    searchQuery = storedSearchQuery;
    fetchData();
}

function performSearch() {
  searchQuery = document.getElementById('searchInput').value;
  sessionStorage.setItem('lastSearchQuery', searchQuery);
  fetchData();
  
}

async function fetchData() {
  const omdbUrl = `https://www.omdbapi.com/?s=${searchQuery}&apikey=${omdbApiKey}`;
  try {
    const response = await fetch(omdbUrl);

    if (response.ok) {
      const result = await response.json();
      // console.log(result);

      const data = result.Search;
      displayMovies(data);
    } else {
      console.error(`Request failed with status: ${response.status}`);
    }
  } catch (error) {
    console.error(error);
  }
}


function displayMovies(data) {
  const moviesContainer = document.getElementById('movies-container');
  moviesContainer.innerHTML = '';

  if(data){
    data.forEach(movie => {
      const card = document.createElement('div');
      card.classList.add('card');
  
      const image = document.createElement('img');
      image.src = movie.Poster;
      image.alt = 'Movie Poster';

      //added event for poster 
      image.addEventListener('click', () => {
        navigateToDetailsPage(movie.imdbID);
      });
  
      const content = document.createElement('div');
      content.classList.add('card-content');
  
      const title = document.createElement('div');
      title.classList.add('title');
      title.textContent = movie.Title;
  
      const release = document.createElement('div');
      release.classList.add('release');
      release.textContent = `Release Year: ${movie.Year}`;
  
      const addToFavoritesBtn = document.createElement('button');
      addToFavoritesBtn.classList.add('add-to-favorites-btn');
      addToFavoritesBtn.textContent = 'Add to Favorites';

      // Add event listener for the "Add to Favorites" button
      addToFavoritesBtn.addEventListener('click', () => {
        addToFavorites(movie.imdbID);
      });
  
      content.appendChild(title);
      content.appendChild(release);
      content.appendChild(addToFavoritesBtn);
  
      card.appendChild(image);
      card.appendChild(content);
  
      moviesContainer.appendChild(card);
    });
  }
  else{
    moviesContainer.innerHTML = 'No results found';
  }
  }

  function navigateToDetailsPage(imdbID) {
    // Redirect to details.html with IMDb ID as a query parameter
    window.location.href = `details/details.html?imdbID=${imdbID}`;
  }

  function goToFavoritesPage() {
    // Redirect to the favorites.html page or perform any other action
    window.location.href = 'favorites/favorites.html';
}


async function addToFavorites(imdbID) {
  
  const movie=await getMoviesDetails(imdbID);
  if(movie){
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const existingIndex = favorites.findIndex(movie => movie.imdbID === imdbID);

  if (existingIndex === -1) {
    // If not in favorites, add it
    favorites.push(movie);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    alert(`${movie.Title} is added to your favorites`);
  } else {
    // If already in favorites, remove it
    alert(`${movie.Title} is already added to your favorites`);
  }
  

  }

}


async function getMoviesDetails(imdbID) {
  try {
    const response = await fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=${omdbApiKey}`);
    const data = await response.json();

    if (data.Response === 'True') {
      return data;
    } else {
      console.error(`Error fetching movie details: ${data.Error}`);
      return null;
    }
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
}


  



