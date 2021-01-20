const pokedex = document.querySelector("#pokedex");


const fetchPokemon = () => {
    const promises = [];
    for(let i = 1; i <= 150; i++ ){
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
    }

    Promise.all(promises).then((results) => {
        const pokemon = results.map((data) => ({
            name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
            id: data.id,
            image: data.sprites["front_default"],
            type: `Type: ${data.types.map((type) => type.type.name).join(", ")}`
        }));
        displayPokemon(pokemon);
    });
};

const displayPokemon = (pokemon) => {
    console.log(pokemon);
    const pokemonHTMLString = pokemon.map(pokeman =>
        `<li>
            <img src = "${pokeman.image}"/>
            <h2>#${pokeman.id}. ${pokeman.name}</h2>
            <p>${pokeman.type}</p>
        </li>`
        ).join("");
    pokedex.innerHTML = pokemonHTMLString;
}

fetchPokemon();