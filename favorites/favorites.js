 function updateFavoritesUI() {
    const favoritesContainer = document.getElementById('favorites-container');
  
    // Clear the favorites container before rendering
    favoritesContainer.innerHTML = '';
  
    // Get the current favorites from localStorage
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  
    if (favorites.length > 0) {
      favorites.forEach(favorite => {
        const card = document.createElement('div');
        card.classList.add('card');
  
        const image = document.createElement('img');
        image.src = favorite.Poster;
        image.alt = 'Movie Poster';
  
        const content = document.createElement('div');
      content.classList.add('card-content');
  
      const title = document.createElement('div');
      title.classList.add('title');
      title.textContent = favorite.Title;
  
      const release = document.createElement('div');
      release.classList.add('release');
      release.textContent = `Release Year: ${favorite.Year}`;


        const removeBtn = document.createElement('button');
        removeBtn.classList.add('remove-from-favorites-btn');
        removeBtn.textContent = 'Remove';
  
        // Add event listener for the "Remove from Favorites" button
        removeBtn.addEventListener('click', () => {
          removeFavorite(favorite.imdbID);
        });
  
        content.appendChild(title);
        content.appendChild(removeBtn);
  
        card.appendChild(image);
        card.appendChild(content);
  
        favoritesContainer.appendChild(card);
      });
    } else {
      favoritesContainer.innerHTML = '<br>No favorites added.';
    }
  }
  
   function removeFavorite(imdbID) {
    // Get the current favorites from localStorage
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  
    // Remove the movie with the specified IMDb ID
    const updatedFavorites = favorites.filter(favorite => favorite.imdbID !== imdbID);
  
    // Store the updated favorites in localStorage
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  
    // Update the UI to reflect the changes
    updateFavoritesUI();
  }


  function goBack() {
    // Redirect to the index page
    window.location.href = '../index.html';
  }
  