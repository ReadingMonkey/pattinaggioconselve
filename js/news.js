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

        console.log("Galleria caricata:", result);

        const images = result.data;
        let htmlContent = "";

        // Raggruppiamo le immagini a blocchi di 3
        for (let i = 0; i < images.length; i += 3) {
            const chunk = images.slice(i, i + 3);
            
            htmlContent += '<div class="row mb-3">';
            
            chunk.forEach(img => {
                htmlContent += `
                    <div class="col-sm">
                        <img class="img-thumbnail rounded px-auto d-block" 
                             src="${img.directUrl}" 
                             alt="${img.name || 'Immagine galleria'}"
                             loading="lazy">
                    </div>
                `;
            });

            // Se l'ultima riga ha meno di 3 immagini, aggiungiamo colonne vuote
            const remainingCols = 3 - chunk.length;
            for (let j = 0; j < remainingCols; j++) {
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

        if (typeof data === "string") {
            data = JSON.parse(data);
        }

        console.log("Dati ricevuti da Apps Script (iFrame):", data);

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

    const apiUrl = "https://script.google.com/macros/s/AKfycby0EfO5Gj3Y-EgYN__bELF-otxk8wjsQu3jfxxgPkg7GS6oMxRaQOwGxyRY4wJV6rMC/exec";
    
    const carouselInner = document.getElementById("carousel-events-inner");
    const carouselIndicators = document.getElementById("carousel-events-indicators");

    fetch(apiUrl)
      .then(response => response.json())
      .then(res => {
        if (res.status === "success" && Array.isArray(res.data) && res.data.length > 0) {
          // Pulisce il contenuto statico/di caricamento
          carouselInner.innerHTML = "";
          carouselIndicators.innerHTML = "";

          res.data.forEach((item, index) => {
            const isActive = index === 0;

            // Rimuove l'estensione dal nome del file per usarlo come titolo pulito (es. "gala_2024.jpg" -> "gala_2024")
            const titleText = item.name.replace(/\.[^/.]+$/, "");

            // 1. Crea la diapositiva (carousel-item)
            const itemDiv = document.createElement("div");
            itemDiv.className = `carousel-item mb-5 ${isActive ? "active" : ""}`;

            itemDiv.innerHTML = `
                <div class="row justify-content-center">
                    <img src="${item.directUrl}" alt="${titleText}" class="img-thumbnail" style="width: 20em;">
                </div>
            `;
            carouselInner.appendChild(itemDiv);

            // 2. Crea l'indicatore (pulsante in basso)
            const btn = document.createElement("button");
            btn.type = "button";
            btn.style.width = "2em";
            btn.setAttribute("data-bs-target", "#locandine");
            btn.setAttribute("data-bs-slide-to", index);
            btn.setAttribute("aria-label", `Slide ${index + 1}`);

            if (isActive) {
              btn.className = "active";
              btn.setAttribute("aria-current", "true");
            }

            carouselIndicators.appendChild(btn);
          });
        } else {
          carouselInner.innerHTML = '<div class="py-5 text-muted">Nessun evento disponibile.</div>';
        }
      })
      .catch(error => {
        console.error("Errore nel recupero degli eventi:", error);
        carouselInner.innerHTML = '<div class="py-5 text-danger">Impossibile caricare gli eventi al momento.</div>';
      });
  });

    // 2. Avvio della galleria immagini
    await loadGallery();
    
});
