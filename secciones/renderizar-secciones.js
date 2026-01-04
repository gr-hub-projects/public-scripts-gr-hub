function obtenerIdioma() {
    const idiomaCaja = document.querySelector(".js-langandcurrency-box-modal .text-capitalize");
    const lang = idiomaCaja ? idiomaCaja.textContent.toLowerCase() : 'en';
    const map = { 'español': 'es', 'français': 'fr' };
    return map[lang] || 'en';
}

export function renderizarSeccionTraslados(idSeccion, datos) {
    const seccion = document.getElementById(idSeccion);
    if (!seccion) return;

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

    if (!document.getElementById('estilos-seccion-traslados')) {
        const style = document.createElement('style');
        style.id = 'estilos-seccion-traslados';
        style.textContent = `
            .contenedor-traslados { margin: auto; width: 100%; }
            .padding-contenedor-traslados { padding: 5vw 0; }
            .traslados-section { width: 100%; max-width: 1400px; margin: auto; text-align: center; }
            .section-title-traslados { font-size: 14px; color: ${c.titulo}; font-weight: 700; text-transform: uppercase; text-align: left; margin-bottom: 0; }
            .section-subtitle-traslados { font-size: 30px; font-weight: 400; line-height: 39px; text-align: left; color: ${c.subtitulo}; margin-bottom: 40px; text-transform: uppercase; }
            .cards-container { display: flex; justify-content: space-between; gap: clamp(20px, 2.5vw, 40px); flex-wrap: nowrap; }
            .traslado-card-wrapper { background-color: #ffffff; border-radius: 15px; box-shadow: 0 10px 20px rgba(0,0,0,0.1); width: calc(33.333% - 20px); min-width: 320px; max-width: 450px; margin-top: 20px; position: relative; display: flex; flex-direction: column; transition: transform 0.3s ease; }
            .traslado-card { height: clamp(300px, 25vw, 420px); color: white; padding: clamp(20px, 1.5vw, 35px); border-radius: 12px; display: flex; flex-direction: column; justify-content: flex-end; position: relative; background-size: cover; background-position: center; }
            .traslado-card::after { content: ""; position: absolute; left: 0; right: 0; bottom: 0; height: 40%; z-index: 1; pointer-events: none; backdrop-filter: blur(25px); -webkit-backdrop-filter: blur(25px); mask-image: linear-gradient(to top, black 50%, transparent 100%); -webkit-mask-image: linear-gradient(to top, black 50%, transparent 100%); border-bottom-left-radius: 15px; border-bottom-right-radius: 15px; }
            #card-compartido { background-image: linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0.1)), url('https://www.nexustours.com/images/upload//Luxe%20landing/traslado-compartido.jpg'); }
            #card-privado { background-image: linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0.1)), url('https://www.nexustours.com/images/upload//Luxe%20landing/traslado-privado-2.jpg'); }
            #card-lujo { background-image: linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0.1)), url('https://www.nexustours.com/images/upload//Luxe%20landing/traslado-de-lujo.jpg'); }
            .traslado-card .card-image-content { position: relative; z-index: 2; width: 100%; box-sizing: border-box; }
            .card-title { font-size: 26px; margin: 5px 0 0 0; font-weight: 700; position: relative; z-index: 1; }
            .card-details { padding: clamp(20px, 3vw, 35px); text-align: left; flex-grow: 1; display: flex; flex-direction: column; }
            .card-features { list-style: none; padding: 0; margin: 0; color: ${c.checksTexto}; flex-grow: 1; }
            .card-features li { display: flex; align-items: flex-start; gap: 12px; margin-bottom: 12px; font-size: clamp(13px, 1.1vw, 16px); line-height: 1.4; }
            .card-features li::before { content: ''; flex-shrink: 0; width: 21px; height: 21px; background-image: url("data:image/svg+xml,%3Csvg width='21' height='21' viewBox='0 0 21 21' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='21' height='21' rx='10.5' fill='%23${c.checks.replace("#", "")}'/%3E%3Cpath d='M6.5 11.1457L9.16667 14L14.5 7' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: center; margin-top: 2px; }
            .reserva-btn { display: block; width: 100%; padding: clamp(12px, 1.5vw, 18px); border: solid 1px ${c.btnBorde}; border-radius: 8px; background-color: ${c.btnFondo}; color: ${c.btnTexto}; font-size: clamp(0.9rem, 1.2vw, 1.1rem); font-weight: 600; text-align: center; text-decoration: none; cursor: pointer; margin-bottom: 25px; position: relative; overflow: hidden; transition: transform 0.3s ease; }
            .reserva-btn.selected-btn { background-color: ${c.btnSelFondo}; color: ${c.btnSelTexto}; }
            .reserva-btn::after { content: ''; position: absolute; top: 0; left: -100%; width: 75%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent); transition: left 0.5s ease-in-out; }
            .reserva-btn:hover { transform: translateY(-2px); }
            .reserva-btn:hover::after { left: 125%; }
            a.reserva-btn:hover { color: ${c.btnTexto}; }
            a.reserva-btn.selected-btn:hover { color: ${c.btnSelTexto}; }
            .selected-banner { position: absolute; top: -34px; left: 25px; right: 25px; z-index: 10; background-color: ${c.masSeleccionado}; color: ${c.masSeleccionadoTexto}; padding: 8px 0; font-size: 0.9rem; font-weight: 600; text-align: center; box-shadow: 0 4px 10px rgba(0,0,0,0.2); }
            @media (max-width: 1024px) { .cards-container { flex-wrap: wrap; justify-content: center; gap: 24px; } .traslado-card-wrapper { width: calc(50% - 20px); min-width: 300px; } }
            @media (max-width: 768px) { .cards-container { flex-direction: column; align-items: center; } .traslado-card-wrapper { width: 100%; max-width: 420px; } .traslado-card { height: auto; min-height: 340px; } }
            @media (max-width: 480px) { .traslado-card-wrapper { margin-top: 16px; } .traslado-card { min-height: 300px; padding: 18px; } .selected-banner { top: -28px; left: 16px; right: 16px; font-size: 0.85rem; } }
        `;
        document.body.appendChild(style);
    }

    const lang = obtenerIdioma();
    const t = {
        title: { en: "Transfers", es: "Traslados", fr: "Transferts" }[lang],
        sub: { en: "Choose the perfect transfer for your trip", es: "Elige el traslado perfecto para tu viaje", fr: "Choisissez le transfert parfait pour votre voyage" }[lang],
        banner: { en: "Most selected", es: "Más seleccionado", fr: "Le plus sélectionné" }[lang]
    };

    const cards = [
        { id: 'compartido', url: datos.urlCompartido, sel: false },
        { id: 'privado', url: datos.urlPrivado, sel: true },
        { id: 'lujo', url: datos.urlLujo, sel: false }
    ];

    const infoTarjetas = {
        compartido: { 
            titulo: { en: "Shared Transfer", es: "Traslado Compartido", fr: "Transfert Partagé" },
            features: { 
                en: ["An affordable option for solo travelers", "Comfortable ride in shared vehicles", "Scheduled departures"],
                es: ["Opción accesible para grupos pequeños", "Trayecto cómodo en unidades compartidas", "Salidas programadas"],
                fr: ["Option abordable pour les petits groupes", "Trajet confortable en véhicules partagés", "Départs programmés"]
            }
        },
        privado: { 
            titulo: { en: "Private Transfer", es: "Traslado Privado", fr: "Transfert Privé" },
            features: { 
                en: ["An affordable option for solo travelers", "Comfortable ride in shared vehicles", "Scheduled departures"],
                es: ["Opción accesible para grupos pequeños", "Trayecto cómodo en unidades compartidas", "Salidas programadas"],
                fr: ["Option abordable pour les petits grupos", "Trajet confortable en véhicules partagés", "Départs programmés"]
            }
        },
        lujo: { 
            titulo: { en: "Luxury Transfer", es: "Traslado de Lujo", fr: "Transfert de Luxe" },
            features: { 
                en: ["An affordable option for solo travelers", "Comfortable ride in shared vehicles", "Scheduled departures"],
                es: ["Opción accesible para grupos pequeños", "Trayecto cómodo en unidades compartidas", "Salidas programadas"],
                fr: ["Option abordable pour les petits groupes", "Trajet confortable en véhicules partagés", "Départs programmés"]
            }
        }
    };

    const btnText = { en: "Book now", es: "Reservar ahora", fr: "Réserver maintenant" }[lang];

    seccion.innerHTML = `
        <h2 class="section-title-traslados">${t.title}</h2>
        <p class="section-subtitle-traslados">${t.sub}</p>
        <div class="cards-container">
            ${cards.map(card => `
                <div class="traslado-card-wrapper">
                    ${card.sel ? `<div class="selected-banner">${t.banner}</div>` : ''}
                    <div class="traslado-card" id="card-${card.id}">
                        <div class="card-image-content">
                            <h3 class="card-title">${infoTarjetas[card.id].titulo[lang]}</h3>
                        </div>
                    </div>
                    <div class="card-details">
                        <a href="${card.url || (window.location.origin + '/transfers')}" 
                           class="reserva-btn ${card.sel ? 'selected-btn' : ''}">${btnText}</a>
                        <ul class="card-features">
                            ${infoTarjetas[card.id].features[lang].map(f => `<li>${f}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            `).join('')}
        </div>`;
}