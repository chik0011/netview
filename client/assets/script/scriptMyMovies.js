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
        componentMovies = document.querySelector(".container");

        let i = 0;
        response.movies.forEach(element => {
            console.log(element);

            if (i%4 == 0) {
                divGlobal = document.createElement('div');
                divGlobal.classList.add('columns');
                divGlobal.classList.add('is-multiline');
                divGlobal.classList.add('p-0');
                divGlobal.classList.add('pt-6');
                divGlobal.classList.add('last');
            }

            if (i == 0) {
                let divTitle = document.createElement('div');
                divTitle.classList.add('column');
                divTitle.classList.add('is-full');
                divTitle.innerHTML = "<p class='has-text-white'>Liste des films</p>";
                divGlobal.appendChild(divTitle);
            }

            let div = document.createElement('div');
            div.classList.add('column');
            div.classList.add('is-one-quarter');

            var a = document.createElement('a');
            a.title = element.name;
            a.href = `/movie/card?id=${element.id }`;
            

            let img= document.createElement('img');
            img.src = `../assets/img/imgMovies/${element.img}`;
            img.classList.add('img-card');
            a.appendChild(img);

            div.appendChild(a);
            divGlobal.appendChild(div);
            componentMovies.appendChild(divGlobal);
            
            i++;
        });

        console.log(componentMovies);
    })