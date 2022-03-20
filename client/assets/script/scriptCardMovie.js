let myHeader = new Headers();
let url = "/myMovie";
let options = {
    method: 'GET',
    headers: myHeader,
    mode: 'cors',
    cache: 'default'
}

fetch(url, options)
    .then((res) => {
        if (res.ok) {
            return res.json();
        } else {
            console.log("pas de film");
        }
    })
    .then((response) => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const idMovie = urlParams.get('id')

        let movie = "";
        response.movies.forEach(element => {
            if (element.id == idMovie) {
                movie = element;
            }
        });

        document.querySelector(".title").innerHTML = movie.name;
        document.querySelector(".date").innerHTML += movie.date;
        document.querySelector(".description").innerHTML += movie.description;
        document.querySelector(".img-movie").src = `../assets/img/imgMovies/${movie.img}`
        console.log(movie);

        let delMovie = document.querySelector(".del-movie");

        delMovie.addEventListener('click', () => {
            var myHeadersToDel = new Headers({ 'Content-Type': 'application/json' });
    
            var urlDel = '/movie/del';

            let movie = {
                idMovie: idMovie
            }

            var optionsDel = { 
                method: 'POST',
                headers: myHeadersToDel,
                mode: 'cors',
                cache: 'default',
                body: JSON.stringify(movie)
            };

            fetch(urlDel, optionsDel);
        })
    })

