$(document).ready(function(){
    // Inserisci l'URL principale di distribuzione Apps Script (/exec)
    const appUrl = "https://script.google.com/macros/s/1PD1VC6hOVAvo3lRj1niB9fs89hiNLoM5jNn684ToU65Kv20UVQD5oZKD/exec";

    fetch(appUrl)
        .then(response => {
            if (!response.ok) throw new Error("Errore nella risposta");
            return response.json();
        })
        .then(data => {
            data.forEach(item => {
                $('#palmares').append(`
                    <div class="media d-flex mb-3">
                        <div class="media-body">
                            <h5 class="pt-2">${item['Titolo']}</h5>
                            ${item['Sottotitolo']}
                        </div>
                    </div>
                `);
            });
        })
        .catch(err => console.error("Errore CORS o di rete:", err));
});
