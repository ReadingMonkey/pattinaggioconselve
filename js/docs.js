$(document).ready(function(){
    const apiUrl = "https://script.google.com/macros/s/AKfycbxGEYTn5Y_-bk_YNyN3nRj38kv0dZU_Fky6lvaW77yJATJpeTsmpk5ddSPYhe1hgP7_zg/exec";
    const lista = document.getElementById("lista-documenti");

    fetch(apiUrl)
      .then(response => response.json())
      .then(res => {
        if (res.status === "success" && Array.isArray(res.data) && res.data.length > 0) {
          lista.innerHTML = ""; // Pulisce il messaggio di caricamento

          res.data.forEach(item => {
            const li = document.createElement("li");
            li.className = "py-2";

            const a = document.createElement("a");
            a.href = item.downloadUrl;
            a.textContent = item.name;
            a.target = "_blank"; // Apre il download/file in una nuova scheda
            a.setAttribute("download", "");

            li.appendChild(a);
            lista.appendChild(li);
          });
        } else {
          lista.innerHTML = '<li class="py-2 text-muted">Nessun documento disponibile.</li>';
        }
      })
      .catch(error => {
        console.error("Errore nel recupero dei documenti:", error);
        lista.innerHTML = '<li class="py-2 text-danger">Impossibile caricare i documenti al momento.</li>';
      });
  });
