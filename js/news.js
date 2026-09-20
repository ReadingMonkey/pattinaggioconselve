async function loadGallery() {
    const container = document.getElementById("gallery-container");
    const loading = document.getElementById("loading");

    try {
        // Chiamata all'API Apps Script
        const response = await fetch("https://script.google.com/macros/s/AKfycbzNDh0Fq7keOTaYGBopzjXaD_AeH_RI9xYQP7xfFMQ7suIMzUSRwb-H9zp7VWU8Nwe2/exec");
        const result = await response.json();

        if (result.status !== "success" || !result.data || result.data.length === 0) {
            container.innerHTML = '<p class="text-center text-muted">Nessuna immagine trovata nella cartella.</p>';
            return;
        }

        console.log(result);

        const images = result.data;
        let htmlContent = "";

        // Raggruppiamo le immagini a blocchi di 3 per mantenere la tua struttura a righe (<div class="row">)
        for (let i = 0; i < images.length; i += 3) {
            const chunk = images.slice(i, i + 3);
            
            htmlContent += '<div class="row mb-3">';
            
            chunk.forEach(img => {
                htmlContent += `
                    <div class="col-sm">
                        <img class="img-thumbnail rounded px-auto d-block" 
                             src="${img.directUrl}" 
                             alt="${img.name}"
                             loading="lazy">
                    </div>
                `;
            });

            // Se l'ultima riga ha meno di 3 immagini, aggiungiamo colonne vuote per mantenere la griglia bilanciata
            const remainingCols = 3 - chunk.length;
            for (let j = 0; j = remainingCols; j++) {
                htmlContent += '<div class="col-sm"></div>';
            }

            htmlContent += '</div>';
        }

        // Nascondiamo lo spinner e inseriamo l'HTML generato
        if (loading) loading.style.display = "none";
        container.innerHTML = htmlContent;

    } catch (error) {
        console.error("Errore nel caricamento della galleria:", error);
        if (loading) loading.style.display = "none";
        container.innerHTML = '<p class="text-center text-danger">Impossibile caricare le immagini al momento.</p>';
    }
}

$(document).ready(async function() {

    // 1. Caricamento dinamico degli iFrame nel Carousel
    try {
        const response = await fetch("https://script.google.com/macros/s/AKfycbxEfogdhjb9y7WidXORRd8PhuWtw0tedKLpSUp3SELaF2bHB9oXrO790lu5otopjVvJ/exec");
        let data = await response.json();

        // Se la risposta è una stringa invece di un oggetto/array, la convertiamo
        if (typeof data === "string") {
            data = JSON.parse(data);
        }

        console.log("Dati ricevuti da Apps Script:", data);

        // Estraiamo l'array corretto (gestisce sia array diretti che strutture { status, data })
        const items = Array.isArray(data) ? data : (data.data || []);

        if (items.length > 0) {
            items.forEach((item, index) => {
                const activeClass = index === 0 ? 'active' : '';
                const iframeContent = item.iFrame || item.iframe || item;

                $('#iframe').append(`
                    <div class="carousel-item mb-5 ${activeClass}"> 
                        ${iframeContent}
                    </div>
                `);
            });
        } else {
            console.warn("Nessun elemento iFrame trovato nella risposta.");
        }

    } catch (error) {
        console.error("Errore durante il caricamento degli iFrame:", error);
    }

    // 2. Avvio della galleria immagini
    if (typeof loadGallery === "function") {
        loadGallery();
    }
});
