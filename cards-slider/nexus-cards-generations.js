export function generarTarjetasProductos(category, site, delegation, idSlider) {
    document.addEventListener('DOMContentLoaded', () => {

        // Obtencion de color base y clases agregadas para desborde de textos
        var botonColor = document.querySelector(".btn-primary");
        var mainColor = (botonColor) ? window.getComputedStyle(botonColor).backgroundColor : "#FF621D";

        var addStyleSlider = `
        :is(#${idSlider})
        >.slick-list>.slick-track>.slick-slide>div>.card h3, .cardContent h3 {
            height: 2em !important;
            display: -webkit-box !important;
            -webkit-line-clamp: 2 !important;
            -webkit-box-orient: vertical !important;
            overflow: hidden !important;
            line-height: 100% !important;
        }
        `;

        const styleTag = document.createElement("style");
        styleTag.textContent = addStyleSlider;
        document.head.appendChild(styleTag);

        //Remueve el contenido de nombre y precio de cards manuales (Algunos casos)
        document.querySelectorAll(".txtPrice, .cardContent .priceDetails, .cardContent .price").forEach(nd => {
            nd.remove();
        });

        // Variables de idioma y moneda
        let dataLang, dataCurrency;
    
        // Variables para modificar las cards dependiendo de la web.
        const dataCategoria = category;
        const dataSitio = site;
        const dataDelegation = delegation;
    
        // Buscar el contenedor del modal con la información de la moneda y el idioma
        const langCurrencyModal = document.getElementById('langandcurrency-box-modal');
        if (!langCurrencyModal) {
            console.error("Dheylo001: langandcurrency-box-modal NO encontrado.");
            return;
        }
    
        // Buscar el div con clase modal-dialog dentro del modal
        const modalDialog = langCurrencyModal.querySelector('.modal-dialog');
        if (!modalDialog) {
            console.error("Dheylo001: modal-dialog NO encontrado dentro de langandcurrency-box-modal.");
            return;
        }
    
        // Dentro de modal-dialog, buscar el div con clase modal-content lang-currency
        const modalContent = modalDialog.querySelector('.modal-content.lang-currency');
        if (!modalContent) {
            console.error("Dheylo001: modal-content.lang-currency NO encontrado.");
            return;
        }
    
        // Obtener los atributos data-lang y data-currency
        dataLang = modalContent.getAttribute('data-lang');
        dataCurrency = modalContent.getAttribute('data-currency');
        console.log("Dheylo001:", dataLang)
    
        // Buscar el contenedor para saber si es opaco o no
        const opaqueContainer = document.getElementById('user-bar');
        const isOpaque = Boolean(opaqueContainer);
    
        // Llamar al JSON de productos
        fetch('https://raw.githubusercontent.com/davidgrhub/JsonRepositoryNexus/refs/heads/main/productos.json')
        .then(response => {
            if (!response.ok) {
                console.error(`Dheylo001: Error al cargar JSON: ${response.status}`);
                throw new Error(`Error HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then(productos => {

            const cardsSlider = document.getElementById(idSlider);
            if (!cardsSlider) {
                console.error(`Dheylo001: Contenedor #${idSlider} no encontrado.`);
                return;
            }
            
            // Filtrar los productos según dataCategoria y dataSitio
            var productosFiltrados;
            if (!delegation || delegation == "")
                productosFiltrados = productos.filter(product =>
                    // Filtro para todas las delegaciones
                    product['categoria'] && product['categoria'].endsWith(dataCategoria) && product['sitio'] === dataSitio
                );
            else
                productosFiltrados = productos.filter(product =>
                    // Filtro para filtrar igual las diferentes delegaciones
                    product['categoria'] && product['categoria'].endsWith(dataCategoria) && product['sitio'] === dataSitio && (product['delegation_en'] === dataDelegation || product['delegation_mx'] === dataDelegation || product['delegation_fr'] === dataDelegation)
                );

            // Ordenar de mayor a menor según 'priority' y tomar solo los primeros 15 elementos
            const productosOrdenados = productosFiltrados
                .sort((a, b) => b.priority - a.priority)
                .slice(0, 15);

            // Generar las tarjetas a partir de los productos filtrados
            productosOrdenados.forEach(product => {
                const cardLink = document.createElement('a');
                cardLink.className = 'card';
                cardLink.href = product['nexus_link'] || '#';
                
                const img = document.createElement('img');
                img.src = product['product_img1_link'] || '';
                img.alt = product['product_name_en'] || '';
                
                const cardContent = document.createElement('div');
                cardContent.className = 'card-content';
                
                const h3 = document.createElement('h3');
                if (dataLang === 'es') {
                    h3.textContent = product['product_name_es'];
                } else if (dataLang === 'fr') {
                    h3.textContent = product['product_name_fr'];
                } else {
                    h3.textContent = product['product_name_en'] || '';
                }
                
                const pLocation = document.createElement('p');
                pLocation.className = 'location';
                let delegationText = '';
                if (dataLang === 'es') {
                    delegationText = product['delegation_mx'];
                } else if (dataLang === 'fr') {
                    delegationText = product['delegation_fr'];
                } else {
                    delegationText = product['delegation_en'];
                }

                pLocation.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="7" height="11" viewBox="0 0 7 11" fill="none">
                    <path d="M3.50354 0.498055C1.56421 0.498055 0 2.1363 0 4.16744C0 6.10221 3.12133 10.2015 3.25581 10.3794C3.36906 10.5203 3.56724 10.5425 3.70172 10.4313C3.72295 10.4165 3.73711 10.4017 3.75126 10.3794C3.88574 10.2015 7.00708 6.10962 7.00708 4.16744C7.00708 2.22526 5.43579 0.498055 3.50354 0.498055ZM3.50354 5.16077C2.80283 5.16077 2.22952 4.56774 2.22952 3.82645C2.22952 3.08516 2.79575 2.49212 3.50354 2.49212C4.21132 2.49212 4.77755 3.08516 4.77755 3.82645C4.77755 4.56774 4.21132 5.16077 3.50354 5.16077Z" fill="#565657"/>
                </svg> ${delegationText}`;

                const pPriceDetails = document.createElement('p');
                pPriceDetails.className = 'priceDetails';
                if (dataLang === 'es') {
                        pPriceDetails.textContent = "Precio por persona | desde";
                    } else if (dataLang === 'fr') {
                        pPriceDetails.textContent = "Prix par personne | à partir de";
                    } else {
                        pPriceDetails.textContent = "Price per person | from";
                    }
                
                const currencyLower = dataCurrency.toLowerCase();
                let mainPriceValue;
                if (isOpaque) {
                    mainPriceValue = product[`sale_pvp_${currencyLower}_desc_opaco`];
                } else {
                    mainPriceValue = product[`sale_pvp_${currencyLower}_desc`];
                }
                const formattedMainPrice = `$${mainPriceValue} ${dataCurrency}`;
                
                const pPrice = document.createElement('p');
                pPrice.className = 'price';
                pPrice.textContent = formattedMainPrice;
                
                const originalPriceValue = product[`sale_pvp_${currencyLower}`];
                const formattedOriginalPrice = `$${originalPriceValue} ${dataCurrency}`;
                if (formattedMainPrice !== formattedOriginalPrice) {
                    const spanOriginal = document.createElement('span');
                    spanOriginal.className = 'original-price';
                    spanOriginal.textContent = formattedOriginalPrice;
                    pPrice.appendChild(spanOriginal);
                }
                
                const pDiscount = document.createElement('p');
                pDiscount.className = 'discount';
                const discountSvg = `<svg fill="none" viewBox="0 0 16 16"><g clip-path="url(#a)" fill="${mainColor}"><path d="M15.8626.1373a.4687.4687 0 0 0-.6629 0l-1.3653 1.3653a1.4 1.4 0 0 0-.265-.0953L9.3266.359a1.414 1.414 0 0 0-1.3356.37L.4112 8.2964c-.5483.5483-.5483 1.4405 0 1.9888l5.3035 5.3035c.5483.5483 1.4405.5484 1.9889 0l7.5674-7.5799c.3473-.3473.489-.859.3699-1.3355l-1.0482-4.2428a1.4 1.4 0 0 0-.0953-.265L15.8627.8002a.469.469 0 0 0-.0001-.6629m-1.1313 6.7635a.471.471 0 0 1-.1233.4451l-7.5674 7.5799a.4693.4693 0 0 1-.663 0L1.0741 9.6223a.4693.4693 0 0 1 0-.663l7.58-7.5674a.471.471 0 0 1 .445-.1233l3.9854.9839-1.1289 1.1289c-.5227-.249-1.1683-.1577-1.6003.2744-.5484.5483-.5484 1.4405 0 1.9888.2741.2742.6343.4113.9944.4113s.7202-.137.9944-.4113c.4321-.432.5234-1.0777.2744-1.6003l1.1289-1.129zm-3.0501-1.919a.4694.4694 0 0 1-.663 0 .4694.4694 0 0 1 0-.663.467.467 0 0 1 .3315-.137.467.467 0 0 1 .3314.137h.0001a.4694.4694 0 0 1 0 .663"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h16v16H0z"/></clipPath></defs></svg>`;
                let discountText = "";
                if (!isOpaque) {
                    if (dataLang === 'es') {
                        discountText = " Regístrate y obtén un 5% de descuento adicional";
                    } else if (dataLang === 'fr') {
                        discountText = " Inscrivez-vous et obtenez 5 % de réduction en plus";
                    } else {
                        discountText = " Sign up and get an extra 5% off your purchase";
                    }
                } else {
                    const discountValue = product['desc_final_opaco'];
                    if (dataLang === 'es') {
                        discountText = ` Disfruta hasta ${discountValue}% de descuento adicional.`;
                    } else if (dataLang === 'fr') {
                        discountText = ` Profitez jusqu'à ${discountValue}% de réduction en plus.`;
                    } else {
                        discountText = ` Enjoy up to ${discountValue}% off.`;
                    }
                }
                pDiscount.innerHTML = discountSvg + discountText;
                
                cardContent.appendChild(h3);
                cardContent.appendChild(pLocation);
                // cardContent.appendChild(pPriceDetails);
                // cardContent.appendChild(pPrice);
                cardContent.appendChild(pDiscount);
                cardLink.appendChild(img);
                cardLink.appendChild(cardContent);
                cardsSlider.appendChild(cardLink);
            });

            // Inicializar slick slider después de agregar todos los elementos
            
            $('#'+idSlider).slick({
                slidesToShow: 4, 
                slidesToScroll: 1, 
                infinite: true,
                dots: false, 
                arrows: true,
                prevArrow: '<button type="button" class="slick-prev"><svg class="slick-prevSVG" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="39.5" y="39.5" width="39" height="39" rx="19.5" transform="rotate(-180 39.5 39.5)" stroke="black"/><path d="M14.0001 20.3043C14.0001 20.0067 14.1229 19.709 14.3682 19.4821L22.0896 12.3407C22.5808 11.8864 23.3771 11.8864 23.8681 12.3407C24.3591 12.7948 24.3591 13.5312 23.8681 13.9855L17.0358 20.3043L23.8679 26.6231C24.3588 27.0774 24.3588 27.8138 23.8679 28.2678C23.3769 28.7223 22.5805 28.7223 22.0893 28.2678L14.3679 21.1265C14.1227 20.8995 14.0001 20.6019 14.0001 20.3043Z" fill="#494949"/></svg></button>',
                nextArrow: '<button type="button" class="slick-next"><svg class="slick-nextSVG" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="0.5" y="0.5" width="39" height="39" rx="19.5" stroke="#494949"/><path d="M27.2363 20.3043C27.2363 20.602 27.1134 20.8996 26.8681 21.1265L19.1467 28.2679C18.6556 28.7222 17.8592 28.7222 17.3682 28.2679C16.8773 27.8138 16.8773 27.0774 17.3682 26.6231L24.2006 20.3043L17.3685 13.9855C16.8775 13.5312 16.8775 12.7949 17.3685 12.3408C17.8594 11.8863 18.6558 11.8863 19.147 12.3408L26.8684 19.4821C27.1137 19.7091 27.2363 20.0068 27.2363 20.3043Z" fill="#494949"/></svg></button>',
                responsive: [
                    {
                        breakpoint: 1024,
                        settings: { slidesToShow: 3 }
                    },
                    {
                        breakpoint: 800,
                        settings: { slidesToShow: 2.5 }
                    },
                    {
                        breakpoint: 700,
                        settings: { slidesToShow: 2 }
                    },
                    {
                        breakpoint: 580,
                        settings: { slidesToShow: 1.5 }
                    },
                    {
                        breakpoint: 460,
                        settings: { slidesToShow: 1 }
                    }
                ]
            });
        })
        .catch(error => {
            console.error("Dheylo001: Ocurrió un error al cargar el JSON:", error);
        });
    });

}

export const version = "1.0.7";
