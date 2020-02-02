//reiniciar partida, limpiar todo, iniciar todo

let reiniciar = ()=>{
    
    gameStatus = STATUS_ID.colocar; 
    //matrices de 11 por 11 los indices 0 no se van a usar
    ownerMatrix = Array(11).fill().map(() => Array(11).fill(0));
    attackMatrix = Array(11).fill().map(() => Array(11).fill(0));
    /* TODO TAREA: quitar las clases a todas las celdas (TD) 
    de ambas tablas con un forEach es una línea de código */
     let tables = document.querySelectorAll("td");

     tables.forEach((item) => {
        item.removeAttribute("class");
     });
     
    //******/
    updateCantidadBarcos(COUNT.slice());
    updateTamañosBarcos(SIZES.slice());
    numShip = 0;
    updateDireccion(DIR.derecha);
    updateStatus(gameStatus);

    datosJugador = {
        step: 0,
        status: 0,
        attack: [0,0],  //ataque inválido solo para inicializar
        attack_status: ""
    }
    if(numJugador == 1) letPlay = true;
    else if(numJugador == 2)letPlay = false;

    console.log(letPlay);
    
    updatePlayer(datosJugador, numJugador);

    

};

btnReiniciar.onclick =  reiniciar;

//al dar clic en la barra espaciadora cambiar de dirección
document.body.onkeypress  = (event)=>{
    //TODO: Si el estatus no es colocar salir
    if(!(gameStatus == STATUS_ID.colocar)){
        return;
    }
    
    if (event.key === ' ' || event.key === "Spacebar"){
        event.preventDefault();
        direccion = (++direccion)%4;
        updateDireccion(direccion);
        if(direccion == 4) direccion = 0;
        changed = true;
        console.log("cambio de dirección");
    }

}


//mostrar en pantalla la cantidad de barcos que faltan por poner
function updateCantidadBarcos(numBarcos){ 
    barcos.count = numBarcos;
    //TODO TAREA: mostrar cantidad de barcos en elementos con clase .count
    let ships = document.getElementsByClassName("count");
    ships[0].innerText = barcos.count[0];
    ships[1].innerText = barcos.count[1];
    ships[2].innerText = barcos.count[2];
}

function updateTamañosBarcos(sizes){
    barcos.sizes = sizes;
    //TODO TAREA: mostrar tamaños de barcos en elementos con clase .size
    let shipsSizes = document.getElementsByClassName("size");
    shipsSizes[0] = barcos.sizes[0];
    shipsSizes[1] = barcos.sizes[1];
    shipsSizes[2] = barcos.sizes[2];
}

function updateDireccion(dir){
    direccion = dir;
    //TODO TAREA: mostrar dorección en spanDir
    spanDir.innerText = DIR_NAMES[direccion];
    
}

async function updateStatus(status){
    console.log("actualizar status a", status);
    spanStatus.innerText = STATUS_NAMES[status];
    //TODO TAREA: actualizar estatus
    if(numJugador == 1){
        
    }
    else if(numJugador == 2){

    }

}


btnSelect.onclick = () => {
    numJugador = Number(selectJugador.value);
    console.log("Jugador seleccionado", numJugador);
    reiniciar();
}

reiniciar();


