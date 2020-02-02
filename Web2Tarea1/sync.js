let url = 'https://api.myjson.com/bins/psqau'; //actualiza tu URL
var players;

async function getData(){
    let json = await fetch(url);
    let obj = await json.json();
    return obj;
}

async function saveData(data){
    try{
        let res =  await fetch(url, {
            method: 'PUT', 
            body: JSON.stringify(data), 
            headers:{
              'Content-Type': 'application/json'
            }
          })
        let obj = await res.json();
        return true;
    }catch(e){
        console.error("error:", e)
        return false; 
    }
}

 //ejemplo de un objeto que guardaría myJson.com
/*
let game = {
    player1: {
        step:0,
        status:0,
        attack:[0,0],
        attack_status = ""
    },
    player2: {
        step: 0,
        status: 0,
        attack: [0,0],
        attack_status = ""
    },
}
*/

async function updatePlayer(datosJugador, numJugador){

    console.log("updatePlayer", datosJugador, numJugador);
    players = await getData();
    console.log("players",players);
    if(numJugador == 1){
        console.log("soy el jugador 1");
        players[0].step = datosJugador.step;
        players[0].status = datosJugador.status;
        players[0].attack = datosJugador.attack.slice();
        players[0].attack_status = datosJugador.attack_status;
    }
    else if(numJugador == 2){
        console.log("soy el jugador 2");
        players[1].step = datosJugador.step;
        players[1].status = datosJugador.status;
        players[1].attack = datosJugador.attack.slice();
        players[1].attack_status = datosJugador.attack_status;
    }

    await saveData(players);

    players = await getData();

    console.log(players);

    //obtener los datos y actualizar al jugador correspondiente volvera a guardar
}

async function esperarMiTurno(numJugador){
    if(numJugador == 1 && players[0].status == 0){
        console.log("esperando al jugador 2");
        players = await getData();
        console.log(players);
        gameStatus = STATUS_ID.esperarTurno;
        updateStatus(gameStatus);
    }
    else if(numJugador == 2 && players[1].status == 0){
        console.log("esperando al jugador 1");
        console.log(players);
        gameStatus = STATUS_ID.esperarTurno;
        updateStatus(gameStatus);
        players[0].status = STATUS_ID.miTurno;
        await saveData(players);
        players = await getData();
        console.log(players);
        esperarMiTurno(1);

    }
    else if(numJugador == 1 && players[0].status > 0){
        console.log("player 1 y status > 0");
        players = await getData();
    }

    //entrar aquí solo si el estado es esperarInicio o esperarTurno
    //si no salir
    //obtener datos guardar en variables jugador y enemigo 

    //si el estatus de ataque existe significa que
    //el enemigo me edito mi ataque y respondió con fire o failed
    //en este caso actualiza en mi tabla de ataque con su respectiva clase fire o failed
    //limpia el attack_status y guarda los datos. 

    //si es jugador 1 y el jugador 2 está esperandoInicio
        //asignarme el turno por defecto. 
    //si no si el estado no es mi turno (llamada recursiva a esperar) 
    //si es mi turno 
        //leer el ataque, revisar si me dieron (fire) o falló (failed)
        //modificar el attack_status del enemigo por "fire" o "failed"
        //pintar la celda con el ataque del enemigo
        //guardar los datos con los cambios  (actualizar local y en myjson.com)
           
}

async function atacar(ataque, numJugador){
    console.log("****** ataque ***", numJugador, ataque);

    //obtener datos , clasificar por jugador y enemigo
    //asignar ataque a jugador, y attack_status =""
    //incrementar step
    //cambiar el estatus del enemigo por .miTurno (darle el turno)
    //cambiar mi estatus (local y externo) por esperarTurno
    //guardar
    //regresar a esperar turno

}
