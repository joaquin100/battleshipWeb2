'use strict';

//***************************/
//RELACIONADO A LA TABLA TOWNER
//***************************/

let curDir = direccion;

let numShip = 0; //cual id de barco se está acomodando


let row,column;

let tOwnerMatrixDOM = tOwner.getElementsByTagName("td");
let arrTownwerMatrixDOM = Array.from(tOwnerMatrixDOM );

let tOwnerMarix = Array(11).fill().map(() => Array(11).fill(0));

let k = 0;
for(let i=0; i<11;i++){
    for(let j=0; j<11;j++){
        tOwnerMarix[i][j] = tOwnerMatrixDOM[k];
        k++;
    }
}

tOwner.onmouseover = tOwner.onmouseout = tOwner.onclick =  (event) => {
    //TODO TAREA: solo entrar si el estado actual es colocar si no salir.
    curDir = direccion;

    if(!(gameStatus == STATUS_ID.colocar)){
        return;
    }

    //TODO TAREA: determinar si terminó de poner barcos salir. 
    if(barcos.count[0] == 0 && barcos.count[1] == 0 && barcos.count[2] == 0){
        if(numJugador == 1){
            gameStatus = STATUS_ID.esperarInicio;
            updateStatus(gameStatus);
            esperarMiTurno(1);
        }
        else if(numJugador == 2){
            gameStatus = STATUS_ID.esperarInicio;
            updateStatus(gameStatus);
            esperarMiTurno(2);

        }
        
        return;
    }
    
    if(barcos.count[0] == 0){
        numShip = 1;
    }

    if(barcos.count[1] == 0){
        numShip = 2;
    }

    //TODO TAREA: si no es una celda el target salir.
    if(!(event.target.tagName =="TD")) return;
   
    //TODO TAREA: obtener rowIndex y cellIndex de la celda (fila, columna)
    row = event.target.parentNode.rowIndex;
    column = event.target.cellIndex;

    //console.log("x,y:", row, column);

    let valid = isValid(row,column,curDir,barcos.sizes[numShip]);

    //console.log(valid);

    //console.log(ownerMatrix);

    if(valid){

        if(event.type == "click"){
            if(curDir == 0){

                for(let i=column; i < column + barcos.sizes[numShip]; i++){
                    ownerMatrix[row][i] = 1;
                    tOwnerMarix[row][i].classList.add("class","selected");

                }
            }
            else if(curDir == 1){
                for(let i=row; i<row+barcos.sizes[numShip];i++){
                    ownerMatrix[i][column] = 1;
                    tOwnerMarix[i][column].classList.add("class","selected");
                }

            }
            else if(curDir == 2){
                for(let i = column; i > column-barcos.sizes[numShip]; i--){
                    ownerMatrix[row][i] = 1;
                    tOwnerMarix[row][i].classList.add("class", "selected");
                }


            }
            else if(curDir == 3){
                for(let i=row; i > row-barcos.sizes[numShip]; i--){
                    ownerMatrix[i][column] = 1
                    tOwnerMarix[i][column].classList.add("class","selected");
                }

            }
            
            barcos.count[numShip]--;
            updateCantidadBarcos(barcos.count.slice());

        }
        else if(event.type == "mouseover"){

            curDir = direccion;

            if(changed){
                arrTownwerMatrixDOM.forEach((item)=>{
                    item.classList.remove("active");
                    item.classList.remove("invalid");
                });
                changed = false;
            }

            if(curDir == 0){
                for(let i=column; i < column + barcos.sizes[numShip]; i++){
                    if(ownerMatrix[row][column] == 1){
                        tOwnerMarix[row][i].classList.add("class","invalid");
                    }else{
                        tOwnerMarix[row][i].classList.add("class","active");
                    }
    
                }
    
            }
            else if(curDir == 1){
                for(let i=row; i<row+barcos.sizes[numShip];i++){
                    if(ownerMatrix[i][column] == 1)
                        tOwnerMarix[i][column].classList.add("class","invalid");
                    else
                        tOwnerMarix[i][column].classList.add("class","active");
                }
    
            }
            else if(curDir == 2){

                for(let i = column; i > column-barcos.sizes[numShip]; i--){
                    if(ownerMatrix[row][i] == 1)
                        tOwnerMarix[row][i].classList.add("class", "invalid");
                    else
                        tOwnerMarix[row][i].classList.add("class","active");
                }
    
            }
            else if(curDir == 3){
                for(let i=row; i > row-barcos.sizes[numShip]; i--){
                    if(ownerMatrix[i][column] == 1){
                        tOwnerMarix[i][column].classList.add("class", "invalid");
                    }
                    else{
                        tOwnerMarix[i][column].classList.add("class","active");
                    }
                }
    
            }
        }

        else if(event.type == "mouseout"){

            if(curDir == 0){
                for(let i=column; i < column + barcos.sizes[numShip]; i++){
                        tOwnerMarix[row][i].classList.remove("active");
                        tOwnerMarix[row][i].classList.remove("invalid");               
                }
    
            }
            else if(curDir == 1){
                for(let i=row; i<row+barcos.sizes[numShip];i++){
                    tOwnerMarix[i][column].classList.remove("active");
                    tOwnerMarix[i][column].classList.remove("invalid"); 
                }
                
            }
            else if(curDir == 2){
                for(let i = column; i > column-barcos.sizes[numShip]; i--){
                    tOwnerMarix[row][i].classList.remove("active");
                    tOwnerMarix[row][i].classList.remove("invalid");
                }
    
            }
            else if(curDir == 3){
                for(let i=row; i > row-barcos.sizes[numShip]; i--){
                    tOwnerMarix[i][column].classList.remove("active");
                    tOwnerMarix[i][column].classList.remove("invalid");
                        
                }
            }


        }
    }
    else{
        //console.log("row or column is zero");

        if(row == 0 || column == 0){
            tOwnerMarix[row][column].style.backgroundColor = "white";
        }

        if(event.type == "mouseover"){

            curDir = direccion;

            if(changed){
                arrTownwerMatrixDOM.forEach((item)=>{
                    item.classList.remove("active");
                    item.classList.remove("invalid");
                });
                changed = false;
            }

            if(curDir == 0){

                if(column + barcos.sizes[numShip] > 10){//Arregla el bug de cuando es inválida, pero selecciona más espacios en la matriz de los barcos
                    for(let i=column; i<=10; i++)
                    tOwnerMarix[row][i].classList.add("invalid");
                }
                else{
                    for(let i=column; i < column + barcos.sizes[numShip]; i++){
                        tOwnerMarix[row][i].classList.add("invalid");
                    }
                }

            }
            else if(curDir == 1){

                if(row + barcos.sizes[numShip] > 10){
                    for(let i=row; i <= 10; i++)
                        tOwnerMarix[i][column].classList.add("invalid");
                }
                else{

                    for(let i=row; i<row+barcos.sizes[numShip];i++){
                        tOwnerMarix[i][column].classList.add("invalid");
                    }
    
                }
                
            }
            else if(curDir == 2){

                if(column-barcos.sizes[numShip] < 0){
                    for(let i=column; i>=0; i--){
                        tOwnerMarix[row][i].classList.add("invalid");
                    }
                }
                else{
                    for(let i = column; i > column-barcos.sizes[numShip]; i--){
                        tOwnerMarix[row][i].classList.add("invalid");
                    }
                }

            }
            else if(curDir == 3){
                console.log("row-shipSize:",row-barcos.sizes[numShip]);
                if(row - barcos.sizes[numShip] <= 0){
                    console.log("entré");
                    for(let i=row; i>0; i--){
                        tOwnerMarix[i][column].classList.add("invalid");
                    }
                }
                else{
                    for(let i=row; i > row-barcos.sizes[numShip]; i--){
                        tOwnerMarix[i][column].classList.add("invalid");
                    }
                }  
            }
        }

        else if(event.type == "mouseout"){

            if(curDir == 0){

                if(column + barcos.sizes[numShip] > 10){//Arregla el bug de cuando es inválida, pero selecciona más espacios en la matriz de los barcos
                    for(let i=column; i<=10; i++){
                        tOwnerMarix[row][i].classList.remove("active");
                        tOwnerMarix[row][i].classList.remove("invalid");
                    }
                   
                }
                else{
                    for(let i=column; i < column + barcos.sizes[numShip]; i++){
                        tOwnerMarix[row][i].classList.remove("active");
                        tOwnerMarix[row][i].classList.remove("invalid");
                    }
                }
                
    
            }
            else if(curDir == 1){
                if(row + barcos.sizes[numShip] > 10){
                    for(let i=row; i<=10; i++){
                        tOwnerMarix[i][column].classList.remove("active");
                        tOwnerMarix[i][column].classList.remove("invalid");
                    }
                }else{
                    for(let i=row; i<row+barcos.sizes[numShip];i++){
                        tOwnerMarix[i][column].classList.remove("active");
                        tOwnerMarix[i][column].classList.remove("invalid");
                    }
                }
                
    
            }
            else if(curDir == 2){

                if(column-barcos.sizes[numShip] < 0){
                    for(let i=column; i>=0; i--){
                        tOwnerMarix[row][i].classList.remove("active");
                        tOwnerMarix[row][i].classList.remove("invalid");
                    }
                }
                else{
                    for(let i = column; i > column-barcos.sizes[numShip]; i--){
                        tOwnerMarix[row][i].classList.remove("active");
                        tOwnerMarix[row][i].classList.remove("invalid");
                    }
                }
            }
            else if(curDir == 3){
                if(row - barcos.sizes[numShip] <= 0){
                    console.log("entré2");
                    for(let i=row; i>0; i--){
                        tOwnerMarix[i][column].classList.remove("active");
                        tOwnerMarix[i][column].classList.remove("invalid");
                    }
                }
                else{
                    for(let i=row; i > row-barcos.sizes[numShip]; i--){
                        tOwnerMarix[i][column].classList.remove("active");
                        tOwnerMarix[i][column].classList.remove("invalid");
                    }
                }
                    
                
                
    
            }
        }
    }

    //TODO TAREA: ejecutar isValid(row, col, curDir, barcos.sizes[numShip]))
    //regresa true o false, true cuando hay espacio para poner en esa celda un barco del  tamaño actual
    //en esa dirección.
    
    /*En caso de ser válido pintar la(s) celda(s) de un color puedes poner una clase a la celda
    como active si es mouseover
    quitar active si es mouseout
    selected si es click */



    //al seleccionar disminuir la cantidad de barcos de la posición actual (numShip)
    //si se colocaron todos los barcos arrancar el proceso de esperar turno y cambiar el estatus a esperarInicio

    // en caso de que la celda sea inválida ponerle la clase invalid (mouseover) y no permite seleccionarla

};

//Revisar si es válido introducir un barco en la posición indicada
//considerar tipo de barco y direccion
function isValid(fila, columna, curDirection, shipSize){
   
    //si la matriz owner ya tiene algo diferente de 0 regresar false. 
    if(ownerMatrix[fila][columna] == 1) return false;

    if(fila == 0 || columna == 0) return false;

    if(curDirection == 0){//Derecha
        //console.log("derecha");
        if(columna + shipSize <= 11){

            for(let i = columna; i < columna + shipSize; i++ ){
                if(ownerMatrix[fila][i] == 1){
                    return false;
                }
            }

            return true;
        }

        return false;
    }
    else if(curDirection == 1){//Abajo
        //console.log("abajo");
        if(fila + shipSize <= 11){

            for(let i=fila; i<fila+shipSize;i++){
                if(ownerMatrix[i][columna] == 1){
                    return false;
                }
            }

            return true;
        }

        return false;

    }
    else if(curDirection == 2){//Izquierda

        //console.log("izquierda");
        if(columna - shipSize >= 0){

            for(let i = columna; i > columna-shipSize; i--){
                if(ownerMatrix[row][i] == 1){
                    return false;
                }
            }

            return true;
        }

        return false;

    }
    else if(curDirection == 3){//Arriba
        //console.log("arriba");
        if(row - shipSize >= 0){

            for(let i=row; i > row-shipSize; i--){
                if(ownerMatrix[i][column] == 1){
                    return false;
                }
            }

            return true;
        }

        return false;
    }

   
    //revisar que el barco del tamaño indicado no choca con otro ya puesto
    //considerar la duración y el tamaño del barco
    
}

//***************************/
//RELACIONADO A LA TABLA DE ATAQUE
//***************************/

tAttack.onmouseover = tAttack.onmouseout = tAttack.onclick = (event)=>{
    //entrar aquí cuando sea mi turno, si no salir

    if(numJugador == 1){
        if(!(players[0].status == STATUS_ID.miTurno)){
            return; 
        }

        if(players[0].status = STATUS_ID.miTurno){
            if(event.type == "click"){
                console.log("click");
            }
            else if(event.type == "mouseover"){
                console.log("mouseover");
            }
            else if(event.type == "mouseout"){
                console.log("mouseout")
            }
        }
    }
        




    //asegurarse que sea celda(TD) y obtner rowIndex y cellIndex,
    
    //validar que la celda no haya sido previamente seleccionada
    //puedes usar attackMatrix  si tiene valor 1 significa que la celda fue usada    

    //en caso de click  seleccionar la celda  y poner un 1 en la matriz.
    //enviar el ataque.  

    //en caso de que no sea válido poner a la celda la clase invalid 
    

}