// Obtener idioma actual en gral en toda pagina de Nexustours
function obtenerIdioma() {
    const idiomaCaja = document.querySelector(".js-langandcurrency-box-modal .text-capitalize");
    const textoIdioma = idiomaCaja ? idiomaCaja.textContent.toLowerCase().trim() : 'english';
    
    if (textoIdioma.includes('español')) return 'es';
    if (textoIdioma.includes('français')) return 'fr';
    return 'en';
}

/**
 * Renderiza la sección de traslados con soporte multi-idioma y colores personalizados.
 * @param {string} idSeccion - ID del contenedor HTML.
 * @param {Object} datos - Configuración de URLs y colores.
 */
export function renderizarSeccionTraslados(idSeccion, datos) {
    const seccion = document.getElementById(idSeccion);
    if (!seccion) return;

    // Configuración de colores con Fallbacks
    const c = {
        titulo: datos?.colores?.titulo || "#2c3e50",
        subtitulo: datos?.colores?.subtitulo || "#017f7c",
        masSeleccionado: datos?.colores?.masSeleccionado || "#1C3346",
        masSeleccionadoTexto: datos?.colores?.masSeleccionadoTexto || "#ffffff",
        checks: datos?.colores?.checks || "1C3346",
        checksTexto: datos?.colores?.checksTexto || "rgba(38, 37, 37, 1)",
        btnFondo: datos?.colores?.botonReservaFondo || "#ABD4D5",
        btnBorde: datos?.colores?.botonReservaBorde || "#ABD4D5",
        btnTexto: datos?.colores?.botonReservaTexto || "#315F60",
        btnSelFondo: datos?.colores?.botonReservaSeleccionadoFondo || "#1C3346",
        btnSelBorde: datos?.colores?.botonReservaSeleccionadoBorde || "#1C3346",
        btnSelTexto: datos?.colores?.botonReservaSeleccionadoTexto || "#CEB785"
    };

    // Inserción de estilos (solo si no existen)
    if (!document.getElementById('estilos-seccion-traslados')) {
        const styleTraslados = document.createElement('style');
        styleTraslados.id = 'estilos-seccion-traslados';
        styleTraslados.textContent = `
            .contenedor-traslados { margin: auto; width: 100%; }
            .traslados-section { width: 100%; max-width: 1400px; margin: auto; text-align: center; padding: 50px 20px; }
            
            .section-title-traslados { font-size: 14px; color: ${c.titulo}; font-weight: 700; text-transform: uppercase; text-align: left; margin-bottom: 5px; }
            .section-subtitle-traslados { font-size: 30px; font-weight: 400; color: ${c.subtitulo}; text-align: left; margin-bottom: 40px; text-transform: uppercase; }
            
            .cards-container { display: flex; justify-content: center; gap: 30px; flex-wrap: wrap; }
            
            .traslado-card-wrapper { 
                background: #fff; border-radius: 15px; box-shadow: 0 10px 20px rgba(0,0,0,0.1);
                width: 100%; max-width: 400px; position: relative; display: flex; flex-direction: column;
                transition: transform 0.3s ease; margin-top: 20px;
            }

            .traslado-card { 
                height: 350px; border-radius: 15px 15px 0 0; background-size: cover; background-position: center;
                display: flex; align-items: flex-end; padding: 25px; position: relative; overflow: hidden;
            }

            .traslado-card::after {
                content: ""; position: absolute; inset: 0;
                background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%);
                z-index: 1;
            }

            .card-title { color: #fff; font-size: 24px; font-weight: 700; position: relative; z-index: 2; margin: 0; }
            .card-details { padding: 30px; flex-grow: 1; display: flex; flex-direction: column; }
            
            .card-features { list-style: none; padding: 0; margin: 0 0 25px 0; flex-grow: 1; }
            .card-features li { 
                display: flex; align-items: center; gap: 10px; margin-bottom: 12px; 
                font-size: 15px; color: ${c.checksTexto}; text-align: left;
            }
            .card-features li::before {
                content: ''; width: 20px; height: 20px; flex-shrink: 0;
                background-image: url("data:image/svg+xml,%3Csvg width='21' height='21' viewBox='0 0 21 21' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='21' height='21' rx='10.5' fill='%23${c.checks.replace("#", "")}'/%3E%3Cpath d='M6.5 11.1457L9.16667 14L14.5 7' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
                background-size: contain; background-repeat: no-repeat;
            }

            .reserva-btn {
                display: block; width: 100%; padding: 15px; border-radius: 8px; font-weight: 700;
                text-decoration: none; text-align: center; transition: 0.3s;
                background-color: ${c.btnFondo}; color: ${c.btnTexto}; border: 1px solid ${c.btnBorde};
            }
            .reserva-btn.selected-btn {
                background-color: ${c.btnSelFondo}; color: ${c.btnSelTexto}; border: 1px solid ${c.btnSelBorde};
            }
            .reserva-btn:hover { transform: translateY(-3px); opacity: 0.9; }

            .selected-banner {
                position: absolute; top: -15px; left: 50%; transform: translateX(-50%);
                background: ${c.masSeleccionado}; color: ${c.masSeleccionadoTexto};
                padding: 5px 20px; border-radius: 20px; font-size: 12px; font-weight: 700; z-index: 10;
                text-transform: uppercase; box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            }
        `;
        document.head.appendChild(styleTraslados);
    }

    const idioma = obtenerIdioma();

    // Diccionario de contenidos
    const content = {
        titSeccion: { en: "Transfers", es: "Traslados", fr: "Transferts" },
        subSeccion: { en: "The best way to get to your destination", es: "La mejor forma de llegar a tu destino", fr: "Le meilleur moyen d'arriver à destination" },
        mostSel: { en: "Most Selected", es: "Más seleccionado", fr: "Le plus sélectionné" },
        btnLabel: { en: "Book now", es: "Reservar ahora", fr: "Réserver" },
        cards: [
            {
                id: "card-compartido",
                url: datos.urlCompartido || "#",
                img: "https://www.nexustours.com/images/upload//Luxe%20landing/traslado-compartido.jpg",
                titulo: { en: "Shared", es: "Compartido", fr: "Partagé" },
                features: {
                    en: ["Cost-effective", "Reliable service", "Professional drivers"],
                    es: ["Económico y seguro", "Servicio confiable", "Conductores profesionales"],
                    fr: ["Économique", "Service fiable", "Chauffeurs professionnels"]
                }
            },
            {
                id: "card-privado",
                url: datos.urlPrivado || "#",
                img: "https://www.nexustours.com/images/upload//Luxe%20landing/traslado-privado-2.jpg",
                titulo: { en: "Private", es: "Privado", fr: "Privé" },
                selected: true,
                features: {
                    en: ["No waiting time", "Direct to hotel", "Exclusive for your group"],
                    es: ["Sin esperas", "Directo a tu hotel", "Exclusivo para tu grupo"],
                    fr: ["Pas d'attente", "Direct à l'hôtel", "Exclusif pour votre groupe"]
                }
            },
            {
                id: "card-lujo",
                url: datos.urlLujo || "#",
                img: "https://www.nexustours.com/images/upload//Luxe%20landing/traslado-de-lujo.jpg",
                titulo: { en: "Luxury", es: "Lujo", fr: "Luxe" },
                features: {
                    en: ["Premium vehicles", "VIP treatment", "Bottled water included"],
                    es: ["Vehículos premium", "Trato VIP", "Agua embotellada incluida"],
                    fr: ["Véhicules premium", "Traitement VIP", "Eau incluse"]
                }
            }
        ]
    };

    seccion.innerHTML = `
        <div class="traslados-section">
            <h2 class="section-title-traslados">${content.titSeccion[idioma]}</h2>
            <p class="section-subtitle-traslados">${content.subSeccion[idioma]}</p>
            <div class="cards-container">
                ${content.cards.map(card => `
                    <div class="traslado-card-wrapper">
                        ${card.selected ? `<div class="selected-banner">${content.mostSel[idioma]}</div>` : ''}
                        <div class="traslado-card" style="background-image: url('${card.img}')">
                            <h3 class="card-title">${card.titulo[idioma]}</h3>
                        </div>
                        <div class="card-details">
                            <a href="${card.url}" class="reserva-btn ${card.selected ? 'selected-btn' : ''}">
                                ${content.btnLabel[idioma]}
                            </a>
                            <ul class="card-features">
                                ${card.features[idioma].map(feat => `<li>${feat}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}