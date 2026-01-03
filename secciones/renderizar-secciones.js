// Obtener idioma actual en gral en toda pagina de Nexustours
function obtenerIdioma(){
    var idiomaCaja = document.querySelector(".js-langandcurrency-box-modal .text-capitalize");
    var idiomaActual = idiomaCaja ? idiomaCaja.textContent : 'english';
    return idiomaActual == 'español' ? 'es' : idiomaActual == 'français' ? 'fr' : 'en';
}

// Template de traslados 2026/01/01
// === Ejemplo de datos: == //
// const datos = {
//      colores:{
//          titulo: "#017f7c",
//          subtitulo: "#2c3e50",
//          masSeleccionado: "#1C3346",
//          masSeleccionadoTexto: "#ffffff",
//          checks: "1C3346",
//          checksTexto: "rgba(38, 37, 37, 1)",
//          botonReservaFondo: "#ABD4D5",
//          botonReservaBorde: "#ABD4D5",
//          botonReservaTexto: "#315F60",
//          botonReservaSeleccionadoFondo: "#1C3346",
//          botonReservaSeleccionadoBorde: "#1C3346",
//          botonReservaSeleccionadoTexto: "#CEB785"
//     },
//     urlCompartido: "https://www.google.com",
//     urlPrivado: "https://www.facebook.com",
//     urlLujo: "https://www.youtube.com"
// };
export function renderizarSeccionTraslados(idSeccion, datos){

    const seccion = document.getElementById(idSeccion);
    if (!seccion) return;

    // Insercion de estilos personalizados para Traslados
    // Si no existe, se crean los estilos

    const coloresDefault = {
        titulo: "#2c3e50",
        subtitulo: "#017f7c",
        masSeleccionado: "#1C3346",
        masSeleccionadoTexto: "#ffffff",
        checks: "1C3346",
        checksTexto: "rgba(38, 37, 37, 1)",
        botonReservaFondo: "#ABD4D5",
        botonReservaBorde: "#ABD4D5",
        botonReservaTexto: "#315F60",
        botonReservaSeleccionadoFondo: "#1C3346",
        botonReservaSeleccionadoBorde: "#1C3346",
        botonReservaSeleccionadoTexto: "#CEB785"
    };

    if (!document.getElementById('estilos-seccion-traslados')){
        const styleTraslados = document.createElement('style');
        styleTraslados.id = 'estilos-seccion-traslados';
        styleTraslados.textContent = `
            /* --- LAYOUT GENERAL SECCIÓN TRASLADOS --- */
            .contenedor-traslados {
                margin: auto;
                width: 100%;
            }

            .padding-contenedor-traslados {
                padding: 5vw 0vw 5vw 0vw;
            }

            .traslados-section {
                width: 100%;
                max-width: 1400px;
                margin: auto;
                text-align: center;
            }

            .section-title-traslados {
                font-size: 14px;
                line-height: normal;
                color: ${datos.colores.titulo || coloresDefault.titulo};
                font-weight: 700;
                text-transform: uppercase;
                text-align: left;
                margin-bottom: 0;
            }

            .section-subtitle-traslados {
                font-size: 30px;
                font-weight: 400;
                line-height: 39px;
                text-align: left;
                color: ${datos.colores.subtitulo || coloresDefault.subtitulo};
                margin-bottom: 40px;
                text-transform: uppercase;
            }

            .cards-container {
                display: flex;
                justify-content: space-between;
                gap: clamp(20px, 2.5vw, 40px);
                flex-wrap: nowrap;
            }

            /* --- WRAPPER Y TARJETA PRINCIPAL --- */
            .traslado-card-wrapper {
                background-color: #ffffff;
                border-radius: 15px;
                box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
                width: calc(33.333% - 20px);
                min-width: 320px;
                max-width: 450px;
                margin-top: 20px;
                position: relative;
                display: flex;
                flex-direction: column;
                transition: transform 0.3s ease;
            }

            .traslado-card {
                height: clamp(300px, 25vw, 420px);
                color: white;
                padding: clamp(20px, 1.5vw, 35px);
                border-radius: 12px;
                display: flex;
                flex-direction: column;
                justify-content: flex-end;
                position: relative;
                background-size: cover;
                background-position: center;
            }

            /* Efecto de degradado negro en la parte inferior de la imagen */
            .traslado-card::after {
                content: "";
                position: absolute;
                left: 0;
                right: 0;
                bottom: 0;
                height: 40%;
                z-index: 1;
                pointer-events: none;
                backdrop-filter: blur(25px);
                -webkit-backdrop-filter: blur(25px);
                mask-image: linear-gradient(to top, black 50%, transparent 100%);
                -webkit-mask-image: linear-gradient(to top, black 50%, transparent 100%);
                border-bottom-left-radius: 15px;
                border-bottom-right-radius: 15px;
            }

            /* IMAGENES DE FONDO (IDs) */
            #card-compartido {
                background-image:
                    linear-gradient(to top, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.1)),
                    url('https://www.nexustours.com/images/upload//Luxe%20landing/traslado-compartido.jpg');
            }

            #card-privado {
                background-image:
                    linear-gradient(to top, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.1)),
                    url('https://www.nexustours.com/images/upload//Luxe%20landing/traslado-privado-2.jpg');
            }

            #card-lujo {
                background-image:
                    linear-gradient(to top, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.1)),
                    url('https://www.nexustours.com/images/upload//Luxe%20landing/traslado-de-lujo.jpg');
            }

            /* --- CONTENIDO INTERNO DE LA TARJETA (Imagen) --- */
            .traslado-card .card-image-content {
                position: relative;
                z-index: 2;
                width: 100%;
                box-sizing: border-box;
            }

            .card-title {
                font-size: 26px;
                margin: 5px 0 0 0;
                font-weight: 700;
                position: relative;
                z-index: 1;
            }

            .card-price {
                margin: 0;
                font-size: clamp(0.9rem, 1.2vw, 1.2rem);
                font-weight: 400;
                position: relative;
                z-index: 1;
            }

            /* --- DETALLES DEBAJO DE LA IMAGEN (Lista y Botón) --- */
            .card-details {
                padding: clamp(20px, 3vw, 35px);
                text-align: left;
                flex-grow: 1;
                display: flex;
                flex-direction: column;
            }

            .card-features {
                list-style: none;
                padding: 0;
                margin: 0;
                color: ${datos.colores.checksTexto || coloresDefault.checksTexto};
                flex-grow: 1;
            }

            .card-features li {
                display: flex;
                align-items: flex-start;
                gap: 12px;
                margin-bottom: 12px;
                font-size: clamp(13px, 1.1vw, 16px);
                line-height: 1.4;
            }

            /* Checkmark SVG */
            .card-features li::before {
                content: '';
                flex-shrink: 0;
                width: 21px;
                height: 21px;
                background-image: url("data:image/svg+xml,%3Csvg width='21' height='21' viewBox='0 0 21 21' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='21' height='21' rx='10.5' fill='%23${datos.colores.checks.replace("#", "") || coloresDefault.checks}'/%3E%3Cpath d='M6.5 11.1457L9.16667 14L14.5 7' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
                background-repeat: no-repeat;
                background-position: center;
                margin-top: 2px;
            }

            /* --- BOTÓN DE RESERVA --- */
            .reserva-btn {
                display: block;
                width: 100%;
                padding: clamp(12px, 1.5vw, 18px);
                border: solid 1px ${datos.colores.botonReservaBorde || coloresDefault.botonReservaBorde};
                border-radius: 8px;
                background-color: ${datos.colores.botonReservaFondo || coloresDefault.botonReservaFondo};
                color: ${datos.colores.botonReservaTexto || coloresDefault.botonReservaTexto};
                font-size: clamp(0.9rem, 1.2vw, 1.1rem);
                font-weight: 600;
                text-align: center;
                text-decoration: none;
                cursor: pointer;
                margin-bottom: 25px;
                position: relative;
                overflow: hidden;
                transition: transform 0.3s ease;
            }

            /* Estilo para el botón de la tarjeta seleccionada */
            .reserva-btn.selected-btn {
                background-color: ${datos.colores.botonReservaSeleccionadoFondo || coloresDefault.botonReservaSeleccionadoFondo};
                color: ${datos.colores.botonReservaSeleccionadoTexto || coloresDefault.botonReservaSeleccionadoTexto};
            }

            /* Efecto de brillo al pasar el mouse */
            .reserva-btn::after {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 75%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
                transition: left 0.5s ease-in-out;
            }

            .reserva-btn:hover {
                transform: translateY(-2px);
            }

            .reserva-btn:hover::after {
                left: 125%;
            }

            a.reserva-btn:hover {
                color:  ${datos.colores.botonReservaTexto || coloresDefault.botonReservaTexto};
            }

            a.reserva-btn.selected-btn:hover {
                color:  ${datos.colores.botonReservaSeleccionadoTexto || coloresDefault.botonReservaSeleccionadoTexto};
            }

            a:focus,
            a:hover {
                text-decoration: none !important;
            }

            /* --- ETIQUETA "MÁS SELECCIONADO" --- */
            .selected-banner {
                position: absolute;
                top: -34px;
                left: 25px;
                right: 25px;
                transform: none;
                z-index: 10;
                background-color: ${datos.colores.masSeleccionado || coloresDefault.masSeleccionado};
                color: ${datos.colores.masSeleccionadoTexto || coloresDefault.masSeleccionadoTexto};
                padding: 8px 0;
                border-radius: 0px;
                font-size: 0.9rem;
                font-weight: 600;
                text-align: center;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
            }

            /* --- RESPONSIVIDAD (MEDIA QUERIES) --- */
            @media (max-width: 1024px) {
                .cards-container {
                    flex-wrap: wrap;
                    justify-content: center;
                    gap: 24px;
                }

                .traslado-card-wrapper {
                    width: calc(50% - 20px);
                    min-width: 300px;
                }
            }

            @media (max-width: 768px) {
                .cards-container {
                    flex-direction: column;
                    align-items: center;
                    gap: 20px;
                }

                .traslado-card-wrapper {
                    width: 100%;
                    max-width: 420px;
                    min-width: 0;
                }

                .traslado-card {
                    height: auto;
                    min-height: 340px;
                }
            }

            @media (max-width: 480px) {
                .traslado-card-wrapper {
                    max-width: 100%;
                    margin-top: 16px;
                }

                .traslado-card {
                    min-height: 300px;
                    padding: 18px;
                }

                .selected-banner {
                    top: -28px;
                    left: 16px;
                    right: 16px;
                    font-size: 0.85rem;
                }
            }
        `;

        document.body.appendChild(styleTraslados);
    }

    //Textos multi-idioma
    const tituloSeccion = {
        en: "Transfers",
        es: "Traslados",
        fr: "Transferts"
    }

    const subtituloSeccion = {
        en: "Choose the perfect transfer for your trip",
        es: "Elige el traslado perfecto para tu viaje",
        fr: "Choisissez le transfert parfait pour votre voyage"
    };
    
    const infoTarjetas = {
        compartido:
        {
            titulo: {
                en: "Shared Transfer",
                es: "Traslado Compartido",
                fr: "Transfert Partagé"
            },
            reserva:{
                en: "Book now",
                es: "Reservar ahora",
                fr: "Réserver maintenant"
            },
            caracteristicas:{
                en: [
                    "An affordable option for solo travelers or small groups!", 
                    "Comfortable ride in shared vehicles!", 
                    "Scheduled departures at designated times!"
                ],
                es: [
                    "Opción accesible para grupos pequeños o viajeros individuales", 
                    "Trayecto cómodo en unidades compartidas", 
                    "Salidas programadas en horarios establecidos"
                ],
                fr: [
                    "Option abordable pour les petits groupes ou les voyageurs seuls", 
                    "Trajet confortable en véhicules partagés", 
                    "Départs programmés selon des horaires fixes"
                ]
            }
        },
        privado:
        {
            titulo: {
                en: "Private Transfer",
                es: "Traslado Privado",
                fr: "Transfert Privé"
            },
            reserva:{
                en: "Book now",
                es: "Reservar ahora",
                fr: "Réserver maintenant"
            },
            caracteristicas:{
                en: [
                    "An affordable option for solo travelers or small groups", 
                    "Comfortable ride in shared vehicles", 
                    "Scheduled departures at designated times"
                ],
                es: [
                    "Opción accesible para grupos pequeños o viajeros individuales", 
                    "Trayecto cómodo en unidades compartidas", 
                    "Salidas programadas en horarios establecidos"
                ],
                fr: [
                    "Option abordable pour les petits groupes ou les voyageurs seuls", 
                    "Trajet confortable en véhicules partagés", 
                    "Départs programmés selon des horaires fixes"
                ]
            }
        },
        lujo:
        {
            titulo: {
                en: "Luxury Transfer",
                es: "Traslado de Lujo",
                fr: "Transfert de Luxe"
            },
            reserva:{
                en: "Book now",
                es: "Reservar ahora",
                fr: "Réserver maintenant"
            },
            caracteristicas:{
                en: [
                    "An affordable option for solo travelers or small groups", 
                    "Comfortable ride in shared vehicles", 
                    "Scheduled departures at designated times"
                ],
                es: [
                    "Opción accesible para grupos pequeños o viajeros individuales", 
                    "Trayecto cómodo en unidades compartidas", 
                    "Salidas programadas en horarios establecidos"
                ],
                fr: [
                    "Option abordable pour les petits groupes ou les voyageurs seuls", 
                    "Trajet confortable en véhicules partagés", 
                    "Départs programmés selon des horaires fixes"
                ]
            }
        }
    };

    const masSeleccionado = {
        en: "Most selected",
        es: "Más seleccionado",
        fr: "Le plus sélectionné"
    };

    //Se obtiene idioma de pagina
    const idioma = obtenerIdioma();

    const transfersUrl = window.location.origin + "/transfers";

    seccion.innerHTML = `
        <h2 class="section-title-traslados">
            ${tituloSeccion[idioma] || tituloSeccion['en']}
        </h2>
        <p class="section-subtitle-traslados">
            ${subtituloSeccion[idioma] || subtituloSeccion['en']}
        </p>
        <div class="cards-container">
            <div class="traslado-card-wrapper">
                <div class="traslado-card" id="card-compartido">
                    <div class="card-image-content">
                        <h3 class="card-title">${infoTarjetas.compartido.titulo[idioma] || infoTarjetas.compartido.titulo['en']}</h3>
                    </div>
                </div>
                <div class="card-details">
                    <a href=${datos.urlCompartido || transfersUrl} class="reserva-btn">${infoTarjetas.compartido.reserva[idioma] || infoTarjetas.compartido.reserva['en']}</a>
                    <ul class="card-features">
                        ${
                            infoTarjetas.compartido.caracteristicas[idioma].map((caracteristica, index) => {
                                return `<li>${caracteristica}</li>`;
                            }).join('')
                        }
                    </ul>
                </div>
            </div>

            <div class="traslado-card-wrapper">
                <div class="selected-banner">${masSeleccionado[idioma] || masSeleccionado['en']}</div>

                <div class="traslado-card" id="card-privado">
                    <div class="card-image-content">
                        <h3 class="card-title">${infoTarjetas.privado.titulo[idioma] || infoTarjetas.privado.titulo['en']}</h3>
                    </div>
                </div>
                <div class="card-details">
                    <a href=${datos.urlPrivado || transfersUrl} class="reserva-btn selected-btn">${infoTarjetas.privado.reserva[idioma] || infoTarjetas.privado.reserva['en']}</a>
                    <ul class="card-features">
                        ${
                            infoTarjetas.privado.caracteristicas[idioma].map((caracteristica, index) => {
                                return `<li>${caracteristica}</li>`;
                            }).join('')
                        }
                    </ul>
                </div>
            </div>

            <div class="traslado-card-wrapper">
                <div class="traslado-card" id="card-lujo">
                    <div class="card-image-content">
                        <h3 class="card-title">${infoTarjetas.lujo.titulo[idioma] || infoTarjetas.lujo.titulo['en']}</h3>
                    </div>
                </div>
                <div class="card-details">
                    <a href=${datos.urlLujo} class="reserva-btn">${infoTarjetas.lujo.reserva[idioma] || infoTarjetas.lujo.reserva['en']}</a>
                    <ul class="card-features">
                        ${
                            infoTarjetas.lujo.caracteristicas[idioma].map((caracteristica, index) => {
                                return `<li>${caracteristica}</li>`;
                            }).join('')
                        }
                    </ul>
                </div>
            </div>

        </div>
    `;
}
