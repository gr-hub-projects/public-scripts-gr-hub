export function ajusteContenidoCard(colorSVG) {

    function currLang() {
        const t = document.querySelector(".js-langandcurrency-box-modal .text-capitalize")?.textContent || "english";
        return t=="español"?"es":t=="français"?"fr":"en";
    }

    document.addEventListener("DOMContentLoaded", () => {

        // Estilos h3 (2 líneas)
        document.head.insertAdjacentHTML("beforeend",
            `<style>.slick-list .slick-slide h3,.cardContent h3{
            height:2em!important;display:-webkit-box!important;
            -webkit-line-clamp:2!important;-webkit-box-orient:vertical!important;
            overflow:hidden!important;line-height:100%!important;
            }</style>`
        );

        // Remover textos/elementos de precio
        document.querySelectorAll(".txtPrice,.cardContent .priceDetails,.cardContent .price").forEach(e=>e.remove());

        // Detectar color principal
        const btn = document.querySelector(".btn-primary");
        const mainColor = (colorSVG||"") || (btn ? getComputedStyle(btn).backgroundColor : "#FF621D");

        // SVG + texto por idioma
        const svg = `<svg fill="none" viewBox="0 0 16 16"><g clip-path="url(#a)" fill="${mainColor}"><path d="M15.8626.1373a.4687.4687 0 0 0-.6629 0l-1.3653 1.3653a1.4 1.4 0 0 0-.265-.0953L9.3266.359a1.414 1.414 0 0 0-1.3356.37L.4112 8.2964c-.5483.5483-.5483 1.4405 0 1.9888l5.3035 5.3035c.5483.5483 1.4405.5484 1.9889 0l7.5674-7.5799c.3473-.3473.489-.859.3699-1.3355l-1.0482-4.2428a1.4 1.4 0 0 0-.0953-.265L15.8627.8002a.469.469 0 0 0-.0001-.6629m-1.1313 6.7635a.471.471 0 0 1-.1233.4451l-7.5674 7.5799a.4693.4693 0 0 1-.663 0L1.0741 9.6223a.4693.4693 0 0 1 0-.663l7.58-7.5674a.471.471 0 0 1 .445-.1233l3.9854.9839-1.1289 1.1289c-.5227-.249-1.1683-.1577-1.6003.2744-.5484.5483-.5484 1.4405 0 1.9888.2741.2742.6343.4113.9944.4113s.7202-.137.9944-.4113c.4321-.432.5234-1.0777.2744-1.6003l1.1289-1.129zm-3.0501-1.919a.4694.4694 0 0 1-.663 0 .4694.4694 0 0 1 0-.663.467.467 0 0 1 .3315-.137.467.467 0 0 1 .3314.137h.0001a.4694.4694 0 0 1 0 .663"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h16v16H0z"/></clipPath></defs></svg>`;

        const text = {es:"Regístrate y obtén un 5% de descuento adicional",
                        en:"Sign up and get an extra 5% off your purchase",
                        fr:"Inscrivez-vous et obtenez 5 % de réduction en plus"}[currLang()];

        // Reemplazar contenido en todas las cards
        document.querySelectorAll(".cardContent .discount").forEach(e=>e.innerHTML = svg + text);
    });

}
