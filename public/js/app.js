console.log("client side js file is loaded");

fetch('http://puzzle.mead.io/puzzle1').then((response) => {
    response.json().then((data) => {
        console.log(data)
    })
}).catch((error) => {
    error.json().then((data) => {
        console.log(data)
    })
})