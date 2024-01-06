$(document).ready(function(){

    $.ajax({
        url: "https://script.google.com/macros/s/AKfycbw99a83E1BScoYM9_pB0HJA9bKlg0dTSOXWQyOlTlS1I-iOtHmsOOneF3tpTOXtw5Ga/exec",
        success: function(data){
            for(let i=0; i<data.length; i++){
                $('#artistico').append(`
                <div class="card border-0">
                    <div class="card-body text-center">
                    <h3 class="card-title"><i><b>${data[i]['Nome']}</b></i></h3>
                    <p class="card-text">${data[i]['Descrizione']}</p>
                
                    <p class="card-text"><b>Numero atleti: </b>${data[i]['Atleti']}</p>
                
                    <p class="card-text"><p>${data[i]['Orari']}</p>
                        <a href="https://www.pattinaggioconselve.it/page.html#contacts" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt" viewBox="0 0 16 16">
                        <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z"/>
                        <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                        </svg>Mappa</a><br>
                    </p>
                    </div>
                </div>
                <br>
                <hr>
                <br>
                `);
            }
        }
    });

});