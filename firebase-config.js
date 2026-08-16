// firebase-config.js  (VERSIÃ“N CORREGIDA Y MÃS ROBUSTA PARA FIREBASE 8)

// La configuraciÃ³n debe ser la que obtienes de tu consola de Firebase
var firebaseConfig = {
  apiKey: "AIzaSyAKZw5ucoD1NIAHr856gKeorkYxHV2B7Ik",
  authDomain: "menajes-vasaya-e7cb2.firebaseapp.com",
databaseURL: "https://menajes-vasaya-e7cb2-default-rtdb.firebaseio.com",
  projectId: "menajes-vasaya-e7cb2",
  storageBucket: "menajes-vasaya-e7cb2.appspot.com",
  messagingSenderId: "757707295624",
  appId: "1:757707295624:web:2a4711f022805bae63883d",
  measurementId: "G-RCQVGJFXJL"
};

// CRÃTICO: Asegurarse de que el objeto 'firebase' estÃ© definido
// (cargado por firebase-app.js) antes de intentar inicializar.
if (typeof firebase !== 'undefined') {
    try {
        // Inicializar Firebase
        firebase.initializeApp(firebaseConfig);

        // Hacer accesible la DB para todo el proyecto
        window.db = firebase.database();
        
        console.log("âœ… Firebase SDK inicializado y DB disponible.");
        
        // Opcional: Escuchar el estado de conexiÃ³n de Firebase (es mÃ¡s preciso que navigator.onLine)
        window.db.ref('.info/connected').on('value', (snapshot) => {
            const isConnected = snapshot.val();
            const barra = document.getElementById("estado-conexion");
            if (barra) {
                if (isConnected) {
                    // Estado Ã³ptimo: Conectado a la red y a la DB
                    barra.style.background = "#00A550"; // Verde mÃ¡s oscuro
                    barra.style.color = "white";
                    barra.textContent = "CONECTADO - SINCRONIZADO";
                } else if (navigator.onLine) {
                    // Estado de alerta: Conectado a la red, pero no a la DB (reintentando)
                    barra.style.background = "#FFC300"; // Naranja
                    barra.style.color = "black";
                    barra.textContent = "CONEXIÃ“N DÃ‰BIL/RECONECTANDO...";
                }
                // Si navigator.onLine es false y isConnected es false, 
                // la funciÃ³n actualizarBarraConexion() en index.html lo manejarÃ¡ como OFFLINE.
            }
        });

    } catch (e) {
        console.error("âŒ Error durante la inicializaciÃ³n de Firebase:", e);
        // Si hay una excepciÃ³n durante init (ej. configuraciÃ³n incorrecta), mostramos error en la barra
        const barra = document.getElementById("estado-conexion");
        if (barra) {
            barra.style.background = "#FF0000"; // Rojo
            barra.style.color = "white";
            barra.textContent = "ERROR: FALLA DE INICIALIZACIÃ“N DE FIREBASE";
        }
    }
} else {
    // Este es el error mÃ¡s probable: firebase is not defined
    console.error("âŒ ERROR CRÃTICO: El objeto 'firebase' NO estÃ¡ definido. Los scripts de Firebase SDK no se cargaron correctamente.");
    // Aseguramos que la barra refleje este error si existe
    window.onload = function() {
        const barra = document.getElementById("estado-conexion");
        if (barra) {
            barra.style.background = "#FF0000"; // Rojo
            barra.style.color = "white";
            barra.textContent = "ERROR: FALLA DE CARGA DE FIREBASE SDK";
        }
    }
}
