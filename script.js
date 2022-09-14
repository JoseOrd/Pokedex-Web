const typeColors = {
    electric: '#FFEA70',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    default: '#2A1A1F',
};

window.onload = MostrarPokemon;

var timeoutID;

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }


function MostrarPokemon(){
    obtenerDatos(aleatorio(1,500));
    cambiarPokemon();
}

async function obtenerDatos(id){
    let agregarStats = "";
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(response => response.json())
    .then(function(data){
      let stats =  data.stats;  
      let idpokemon = data.id; 
      let nombre = data.name;
      let url = data.sprites.other.dream_world.front_default;
        if(nombre && url && idpokemon){  
            document.getElementById('image').src = url;
            document.getElementById('name').innerHTML = nombre.toUpperCase();
            document.getElementById('idpokemon').innerHTML = "N°: "+idpokemon;
          for(var i = 0; i<stats.length; i++){
            agregarStats+=` <tr>
                                <td class="namesatat">${stats[i].stat.name}</td>
                                <td>${stats[i].base_stat}</td>
                            </tr>`;
          }
            document.getElementById('tablestats').innerHTML = agregarStats;
            setColor(data.types);
        }
    });
    
  }
function setColor(types){
    const coloruno = typeColors[types[0].type.name];
    const colordos =  types[1] ? typeColors[types[1].type.name] : typeColors.default;
    document.getElementById('image').style.background =  `radial-gradient(${coloruno} 33%, ${colordos} 33%)`;
    document.getElementById('image').style.backgroundSize = ' 5px 5px';

    document.getElementById('tipopokemon').innerHTML = types[0].type.name.toUpperCase();
    document.getElementById('tipopokemon').style.color = coloruno;
}


function cambiarPokemon(){
  timeoutID = window.setTimeout(MostrarPokemon, 30000);
}

function clearTime() {
  window.clearTimeout(timeoutID);
}

function MostrarPokemonbtn(){
  clearTime();
  MostrarPokemon();
}

