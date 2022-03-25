const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const idMovie = urlParams.get('id');

if (idMovie != null || idMovie != undefined) {

    document.querySelector(".file-movie").style.display = "none";
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
        let findMovie = false;
        let nameMovie = "";
        let dateMovie = "";
        let descMovie = "";

        response.movies.forEach(element => {
            if (element.id == idMovie) {
                findMovie = true;
                document.querySelector("#firstname").value = element.name;
                document.querySelector("#lastname").value = element.date;
                document.querySelector("#desc").value = element.description;
                nameMovie = element.name;
                dateMovie = element.date;
                descMovie = element.description;
            }
        });

        let btnAction = document.querySelector(".submit");

        btnAction.addEventListener("click", () => {
            if (dateMovie != "" && descMovie != "" && nameMovie != "") {

                let name = document.querySelector('.nameMovie').value;
                let year = document.querySelector('.year').value;
                let desc = document.querySelector('.description').value;

                if (name && year && desc) {
                    var myHeadersUpdate = new Headers({ 'Content-Type': 'application/json' });
        
                    var urlUpdate = '/movie/update';
                
                    var movie = {
                        id: idMovie,
                        name: name,
                        date: year,
                        description: desc,
                    }
                
                    var optionsUpdate = { 
                        method: 'POST',
                        headers: myHeadersUpdate,
                        mode: 'cors',
                        cache: 'default',
                        body: JSON.stringify(movie)
                    };
                
                    fetch(urlUpdate, optionsUpdate)   
                }
            }
        });
        
    })
} else {
    document.querySelector('.submit').addEventListener("click", function () {
        let inputImg = document.querySelector('.file-movie');
    
        if (inputImg.files[0].name != undefined) {
            var nameImg = inputImg.files[0].name;
        }
        
        let name = document.querySelector('.nameMovie').value;
        let year = document.querySelector('.year').value;
        let desc = document.querySelector('.description').value;
    
        var formData = new FormData();
    
        formData.append("username", "Groucho");
        formData.append("accountnum", 123456); // number 123456 is immediately converted to a string "123456"
    
        // HTML file input, chosen by user
        formData.append("userfile", inputImg.files[0]);
    
        // JavaScript file-like object
        var content = '<a id="a"><b id="b">hey!</b></a>'; // the body of the new file...
        var blob = new Blob([content], { type: "text/xml"});
    
        formData.append("webmasterfile", blob);
    
        var request = new XMLHttpRequest();
        request.open("POST", "/movie/add/img");
        request.send(formData);
        
        var myHeaders = new Headers({ 'Content-Type': 'application/json' });
        
        var url = '/movie/add';
    
        var movie = {
            id: Date.now(),
            name: name,
            date: year,
            description: desc,
            img: nameImg,
            fileImg: inputImg.files[0]
        }
    
        var options = { 
            method: 'POST',
            headers: myHeaders,
            mode: 'cors',
            cache: 'default',
            body: JSON.stringify(movie)
        };
    
        fetch(url, options)
    })
}
