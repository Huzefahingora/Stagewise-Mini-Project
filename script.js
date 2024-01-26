//Loading existing watchlist form local storage
const existingWatchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

// function for adding items in watchlist
function addToWatchlist() {
    const title = document.getElementById('title').value;
    const platform = document.getElementById('platform').value;
    const genre = document.getElementById('genre').value;
    const link = document.getElementById('link').value;
    const is18plus = document.getElementById('is18plus').checked;

    // empty field checking
    if (!title || !platform || !genre || !link) {
        alert('All fields are required.');
        return;
    }

    // watchlist item object
    const watchlistItem = { title, platform, genre, link, is18plus };

    // Adding item in watchlist
    existingWatchlist.push(watchlistItem);

    // update the watchlist in local storage
    localStorage.setItem('watchlist', JSON.stringify(existingWatchlist));

    // table update
    updateWatchlistTable();

    // reset the field 
    document.getElementById('watchlistForm').reset();
}

// delete watchlist function
function deleteFromWatchlist(index) {
    const confirmDelete = confirm('Are you sure you want to delete this item?');

    if (confirmDelete) {
        existingWatchlist.splice(index, 1);
        localStorage.setItem('watchlist', JSON.stringify(existingWatchlist));
        updateWatchlistTable();
    }
}

// upadate of watchlist
function updateWatchlistTable() {
    const tableBody = document.getElementById('watchlistTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';

    existingWatchlist.forEach((item, index) => {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `<td><a href="${item.link}" target="_blank">${item.title}</a></td>
                            <td>${item.platform}</td>
                            <td>${item.genre}</td>
                            <td><a href="${item.link}" target="_blank">${item.link}</a></td>
                            <td>${item.is18plus ? 'Yes' : 'No'}</td>
                            <td><button onclick="deleteFromWatchlist(${index})" class="btn btn-danger btn-sm">Delete</button></td>`;

        tableBody.appendChild(newRow);
    });
}
// Now, the
// Initial update of the table
updateWatchlistTable();
