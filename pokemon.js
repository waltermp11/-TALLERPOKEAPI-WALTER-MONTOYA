const prompt = require("prompt-sync")();

// --- 1. FUNCIÓN DE BUSCAR POKÉMON ---
// Mantiene tu estructura exacta, solo recibe el nombre por parámetro
async function buscarPokemon(nombre) {
  const url = `https://pokeapi.co/api/v2/pokemon/${nombre.toLowerCase()}`;

  const respuesta = await fetch(url);

  if (!respuesta.ok) {
    console.log(`No se encontró al Pokémon: ${nombre}`);
    return null;
  }
  const datos = await respuesta.json();
  console.log(`Datos del Pokemon   ${nombre}`, datos);
  return datos; // Retornamos los datos para que los use mostrarFicha o comparar
}

//ficha de pokemon
async function mostrarFicha(datos) {
  if (!datos) {
    console.log("No hay nada que mostrar ❌");
    return;
  }

  console.log("Nombre Pokemon: ", datos.name.toUpperCase(), "ID: ", datos.id);

  const listaTipos = datos.types.map((t) => t.type.name);
  console.log("Tipos: ", listaTipos.join(" / "));

  console.log("****************** PESO Y ALTURA ***********************");
  const alturaPokemon = datos.height * 10;
  const pesoPokemon = datos.weight / 10;

  console.log(" Altura de ",datos.name.toUpperCase(),": ",alturaPokemon,"cm");
  console.log(" Peso de ", datos.name.toUpperCase(), ": ", pesoPokemon, "Kg");

  console.log("**************** ESTADISTICAS *********************");
  datos.stats.forEach((stat) => {
    console.log(stat.stat.name, stat.base_stat);
  });


  console.log("********************* HABILIDADES *****************");
  datos.abilities.forEach((habilidad) => {
    if (habilidad.is_hidden) {
      console.log("habilidad Oculta ");
    } else {
      console.log(habilidad.ability.name);
    }
  });
}


function obtenerStat(datosPokemon, nombreStat) {
  if (!datosPokemon) {
    console.log("No hay nada que mostrar ❌");
    return null;
  }

  let valorEncontrado = 0;

  datos.stats.forEach((stat) => {
    if (stat.stat.name === nombreStat.toLowerCase()) {
      valorEncontrado = stat.base_stat;
    }
  });

  return valorEncontrado; 
}

async function compararPokemon(nombre1, nombre2, stat) {
  const pokemon1 = await buscarPokemon(nombre1);
  const pokemon2 = await buscarPokemon(nombre2);

  if (pokemon1 === null || pokemon2===null) {
    return "no se encontro un pokemon o los dos"
  };

  const stat1 = obtenerStat(pokemon1, stat);
  const stat2 = obtenerStat(pokemon2, stat);

  console.log(
    `\n Comparando ${stat} entre ${pokemon1.name} (${stat1}) y ${pokemon2.name} (${stat2}):`,
  );
  if (stat1 > stat2) {
    console.log(` ¡Gana ${pok1.name}!`);
  } else if (stat2 > stat1) {
    console.log(` ¡Gana ${pok2.name}!`);
  } else {
    console.log("¡Es un empate!");
  }
}

// Menu para eusar la Pokedex
async function controlPokedex() {
  let statePokedex = true;

  while (statePokedex) {
    console.log("\n--- MENÚ POKÉDEX ---");
    let opcion = prompt(
      "Escoge una opcion en el Menu Pokedex: \n 1. Buscar Pokemon \n 2. Comparar Stats Pokemones \n 3. Salir\n Opción: ",
    );

    if (opcion === "1") {
      const nombre = prompt("Ingrese el nombre del pokemon: ");
      const datosPokemon = await buscarPokemon(nombre);
      await mostrarFicha(datosPokemon);
    } else if (opcion === "2") {
      const p1 = prompt("Ingrese el primer pokemon: ");
      const p2 = prompt("Ingrese el segundo pokemon: ");
      const estadistica = prompt(
        "Ingrese la estadística a comparar (hp, attack, defense, special-attack, special-defense y   speed): ",
      );
      await compararPokemon(p1, p2, estadistica);
    } else if (opcion === "3") {
      statePokedex = false;
      console.log("Hasta la proxima viajero ✅");
      break;
    }
  }
}

controlPokedex();
