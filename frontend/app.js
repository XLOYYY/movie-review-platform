
async function loadFilms() {

    try {

        const response = await fetch(`http://127.0.0.1:8000/films`);


        const films = await response.json();

    
        const container = document.getElementById('films-container');
        container.innerHTML = '';

        films.forEach(film => {
            const card = document.createElement('div');

            card.className = 'film-card';
            card.innerHTML = `
                <h3>${film.name}</h3>
                <h4>${film.genre}</h4> 
                <p>Rating: ${film.rating}</p> 
                <p>${film.description || 'No description'}</p>          
            `;
            container.appendChild(card);
        });


    }   
    catch (error) {
        console.log("Error:", error);
    
    }
}   

window.onload = loadFilms;






async function createFilm(name, genre, rating , description) {

    const response = await fetch(`http://127.0.0.1:8000/films`, {
        method: 'POST' ,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            genre: genre,
            rating: rating,
            description: description
        
        })

    });


    const newFilm = await response.json();
    console.log("Movie added:", newFilm);
    return newFilm;

}


async function updateFilm(id, updatedData) {

    const response = await fetch(`http://127.0.0.1:8000/films/${id}`, {
    
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)

    });

    return await response.json();

}

async function deleteFilm(id) {

    const response = await fetch(`http://127.0.0.1:8000/films/${id}`, {
        method: 'DELETE'
    
    });
    
    const result = await response.json();
    console.log(result.message);

}



async function searchFilms(text) {

    try {

        const response = await fetch(`http://127.0.0.1:8000/search?text=${encodeURIComponent(text)}`);
        const films = await response.json();

        const container = document.getElementById('films-container');
        container.innerHTML = '';

        if (films.length === 0) {
            container.innerHTML = '<p>Nothing found</p>';
            return;

        }

        films.forEach(film => {
            const card = document.createElement('div');

            card.className = 'film-card';
            card.innerHTML = `
                <h3>${film.name}</h3>
                <h4>${film.genre}</h4>
                <p>Rating: ${film.rating}</p>
                <p>${film.description || 'No description'}</p>
            `;
            container.appendChild(card);
        });
    }
    catch (error) {
        console.error("Error:", error);
    }
}





document.addEventListener('DOMContentLoaded', () => {
    
    const movieForm = document.getElementById('add-movie-form');

    if (movieForm) {
        movieForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const name = document.getElementById('form-name').value;
            const genre = document.getElementById('form-genre').value;
            const rating = parseFloat(document.getElementById('form-rating').value);
            const description = document.getElementById('form-description').value;


            console.log("Отправляем на FastAPI:", { name ,genre , rating , description});
            const result = await createFilm(name ,genre , rating , description);
            
            if (result) {
                console.log("Фильм добавлен в базу данных")
                movieForm.reset();
                await loadFilms();
            }

        });
    }

    const searchInput = document.getElementById('search-input');
    let searchTimeout;

    if (searchInput) {
        searchInput.addEventListener('input', (event) => {
            const text = event.target.value;

            clearTimeout(searchTimeout);
        
        
            searchTimeout = setTimeout(async () => {
                if (text.trim() === '') {
                    await loadFilms();
                } else {
                    await searchFilms(text);
                }
        }, 500); 
    });
}


});

