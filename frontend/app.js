
async function loadFilms() {

    try {

        const response = await fetch(`http://127.0.0.1:8000/films`);


        const films = await response.json();

        const container = document.getElementById('films-container');
        container.innerHTML = '';

        films.forEach(film => {
            const card = document.createElement('div');
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

        const response = await fetch(`http://127.0.0.1:8000/films/search?text=${encodeURIComponent(text)}`);
        const films = await response.json();

        const container = document.getElementById('films-container');
        container.innerHTML = '';

        if (films.length === 0) {
            container.innerHTML = '<p>Nothing found</p>';
            return;

        }

        films.forEach(film => {
            const card = document.createElement('div');
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










