// Initialize Cloud Firestore through Firebase
firebase.initializeApp({ apiKey: "AIzaSyAsA-ad1oFT2ow6kxqibsU46QlZiuUncyE", authDomain: "backus-7deda.firebaseapp.com", projectId: "backus-7deda" });
var db = firebase.firestore();
const msje = document.getElementById("msje");

function guardar() {
    const dni = document.getElementById("dni").value;
    const nombre = document.getElementById("nombre").value;
    const correo = document.getElementById("correo").value;
    const celular = document.getElementById("celular").value;
    const boleta = document.getElementById("boleta").value;
    const tienda = document.getElementById("tienda").value;
    const puntos = document.getElementById("puntos").value;
    if (dni == "" || nombre == "" || correo == "" || celular == "" || boleta == "" || tienda == "" || puntos == "") {
        msje.innerHTML = `<div class="alert alert-warning"><h4>Por favor completa todos los campos</h4></div>`
    } else {
        db.collection("usuarios").add({ dni, nombre, correo, celular, boleta, tienda, puntos, }).then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
            document.getElementById("dni").value = "";
            document.getElementById("nombre").value = "";
            document.getElementById("correo").value = "";
            document.getElementById("celular").value = "";
            document.getElementById("boleta").value = "";
            document.getElementById("tienda").value = "";
            document.getElementById("puntos").value = "";
        }).catch(function(error) { console.error("Error adding document: ", error); });
    }
} // Leer;
db.collection("usuarios").onSnapshot((querySnapshot) => {
    tabla.innerHTML = "";
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        tabla.innerHTML += ` 
        <tr> 
            <td>${doc.data().dni}</td> 
            <td>${doc.data().nombre}</td> 
            <td>${doc.data().correo}</td> 
            <td>${doc.data().celular}</td> 
            <td>${doc.data().boleta}</td> 
            <td>${doc.data().tienda}</td>
            <td>${doc.data().puntos}</td> 
            <td><a class="red" onclick="editar('${doc.id}','${doc.data().dni}','${doc.data().nombre}','${doc.data().correo}','${doc.data().celular}','${doc.data().boleta}','${doc.data().tienda}','${doc.data().puntos}')"><i class="far fa-edit red"></i></a>
             
        </td> `;
    });
});

function busqueda(dniBus) {
    tabla.innerHTML = "";
    db.collection("usuarios").where("dni", "==", dniBus).get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots 
                if (doc.data().dni) {
                    return tabla.innerHTML += ` 
                <tr> 
                    <td>${doc.data().dni}</td> 
                    <td>${doc.data().nombre}</td> 
                    <td>${doc.data().correo}</td> 
                    <td>${doc.data().celular}</td> 
                    <td>${doc.data().boleta}</td>
                    <td>${doc.data().tienda}</td>  
                    <td>${doc.data().puntos}</td> 
                    <td><a class="red" onclick="editar('${doc.id}','${doc.data().dni}','${doc.data().nombre}','${doc.data().correo}','${doc.data().celular}','${doc.data().boleta}','${doc.data().tienda}','${doc.data().puntos}')"><i class="far fa-edit"></i></a></td> <td><a onclick="borrar('${doc.id}')"><i class="far fa-trash-alt"></i></a> 
                </tr> `;
                } else { console.log("no hay data") }
            });
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
};
const btnBuscarDni = document.getElementById('button-buscar-dni');
btnBuscarDni.addEventListener('click', () => {
    let dni = document.getElementById("dni");
    dni = dni.value;
    busqueda(dni);
});

function busquedaBol(busbol) {
    tabla.innerHTML = "";
    db.collection("usuarios").onSnapshot((querySnapshot) => {

        querySnapshot.forEach((doc) => {
            if (typeof doc.data().boleta != "string") {
                let arrayBol = doc.data().boleta;
                const boletabus = busbol;
                var found = arrayBol.find(function(element) {
                    return element === boletabus;
                });

                if (found != undefined) {

                    console.log(`${doc.id} => ${doc.data().dni}`);
                    return tabla.innerHTML += `
                    <tr>
                        <td>${doc.data().dni}</td>
                        <td>${doc.data().nombre}</td>
                        <td>${doc.data().correo}</td>
                        <td>${doc.data().celular}</td>
                        <td>${doc.data().boleta}</td>
                        <td>${doc.data().tienda}</td>
                        <td>${doc.data().puntos}</td>
                        <td>
                        <a onclick="editar('${doc.id}','${doc.data().dni}','${doc.data().nombre}','${doc.data().correo}','${doc.data().celular}','${doc.data().boleta}','${doc.data().tienda}','${doc.data().puntos}')"><i class="far fa-edit"></i>
                        </a></td>
                        
                    </td>
                    `;
                }
            } else {
                if (doc.data().boleta === busbol) {
                    console.log(`${doc.id} => ${doc.data().dni}`);
                    return tabla.innerHTML += `
                    <tr>
                        <td>${doc.data().dni}</td>
                        <td>${doc.data().nombre}</td>
                        <td>${doc.data().correo}</td>
                        <td>${doc.data().celular}</td>
                        <td>${doc.data().boleta}</td>
                        <td>${doc.data().tienda}</td>
                        <td>${doc.data().puntos}</td>
                        <td>
                        <a class="red" onclick="editar('${doc.id}','${doc.data().dni}','${doc.data().nombre}','${doc.data().correo}','${doc.data().celular}','${doc.data().boleta}','${doc.data().tienda}','${doc.data().puntos}')"><i class="far fa-edit "></i>
                        </a></td>
                  
                    </td>
                    `;
                }
            }



        });
    });
}
const btnBuscarBol = document.getElementById('button-buscar-bol');
btnBuscarBol.addEventListener('click', () => {
    let boleta = document.getElementById("boleta");
    boleta = boleta.value;
    busquedaBol(boleta);
});



function editar(id, dni, nombre, correo, celular, boleta, tienda, puntos) {


    let arraydeboleta = boleta.split(",");
    console.log(arraydeboleta);
    document.getElementById("dni").value = dni;
    document.getElementById("nombre").value = nombre;
    document.getElementById("correo").value = correo;
    document.getElementById("celular").value = celular;
    document.getElementById("tienda").value = tienda;
    document.getElementById("puntos").value = puntos;
    const btn = document.getElementById("btn");
    btn.innerHTML = "editar";
    btn.onclick = function() {
        let valor = db.collection("usuarios").doc(id);
        let dni = document.getElementById("dni").value;
        let nombre = document.getElementById("nombre").value;
        let correo = document.getElementById("correo").value;
        let celular = document.getElementById("celular").value;
        let boletanueva = document.getElementById("boleta").value;
        let tienda = document.getElementById("tienda").value;
        arraydeboleta.push(boletanueva);

        let puntos = document.getElementById("puntos").value;
        return valor.update({ dni: dni, nombre: nombre, correo: correo, celular: celular, boleta: arraydeboleta, tienda: tienda, puntos: puntos, }).then(function() {
            btn.innerHTML = "guardar";
            document.getElementById("dni").value = "";
            document.getElementById("nombre").value = "";
            document.getElementById("correo").value = "";
            document.getElementById("celular").value = "";
            document.getElementById("tienda").value = "";
            document.getElementById("boleta").value = "";
            document.getElementById("puntos").value = "";
        })
    }
}

function borrar(id) { db.collection("usuarios").doc(id).delete() }