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