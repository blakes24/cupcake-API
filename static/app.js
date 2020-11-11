$(async function() {
    
    await showCupcakes()

    $('#add-form').on('submit', addCupcake)

})

const BASE_URL = "http://127.0.0.1:5000/api/cupcakes"

// gets an array of cupcake objects
async function getCupcakes() {
    const results = await axios.get(BASE_URL);
    const data = results.data.cupcakes;
    return data
}

//creates divs to display cupcakes and appends them to cupcake list
async function showCupcakes() {
    cupcakes = await getCupcakes()

    for (let cupcake of cupcakes) {
        let $item = $(`
        <div class="cupcake">
            <img src="${cupcake.image}" alt="cupcake" width="100px">
            <p><b>Flavor:</b> ${cupcake.flavor} <b>Rating:</b> ${cupcake.rating}</p>
        </div>`)
        $('.cupcake-list').append($item)
    }
}

//creates a new cupcake appends it to cupcake list
 async function addCupcake(e) {
    e.preventDefault();

    const flavor = $('#flavor').val()
    const size = $('#size').val()
    const rating = $('#rating').val()
    const image = $('#image').val() || null

    const new_cupcake = await axios.post(BASE_URL, {
        flavor: flavor,
        size: size,
        rating: rating,
        image: image
    });
    
    const cupcake = new_cupcake.data.cupcake

    let $item = $(`
        <div class="cupcake">
            <img src="${cupcake.image}" alt="cupcake" width="100px">
            <p><b>Flavor:</b> ${cupcake.flavor} <b>Rating:</b> ${cupcake.rating}</p>
        </div>`)
        $('.cupcake-list').append($item)

        $('#flavor').val('')
        $('#size').val('')
        $('#rating').val('')
        $('#image').val('')
}