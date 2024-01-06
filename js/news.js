$(document).ready(function(){

    $.ajax({
        url: "https://script.google.com/macros/s/AKfycbxEfogdhjb9y7WidXORRd8PhuWtw0tedKLpSUp3SELaF2bHB9oXrO790lu5otopjVvJ/exec",
        success: function(data){
            for(let i=0; i<data.length; i++){
                $('#iframe').append(`
                <div class="carousel-item mb-5"> 
                    ${data[i]['iFrame']}
                </div>
                `);
            }
            $('.carousel-item:first').addClass('active');
        }
    });

});