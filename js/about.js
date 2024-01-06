$(document).ready(function(){

    $.ajax({
        url: "https://script.googleusercontent.com/macros/echo?user_content_key=0kPhTGmLzcBLHcTxYhR0rylEZc3oTe48Enb4q7GesuPdSGhVcc_tROsLUOidX4G399d_1nBN8c4To0oBh0UncMD7Z3USVQnXm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnDgOW764LuaOWFEh3hyKkyy57_Z0kBb9tRGHEtCW_LGBvEtKhAQnnv3kJETbalFVXSutrfMuyT7DGCd7RqHVt6odfQTHyigprdz9Jw9Md8uu&lib=MOGp-nxa3Cm_dWFjptXP0VnAnurRqelap",
        success: function(data){
            for(let i=0; i<data.length; i++){
                $('#palmares').append(`
                    <div class="media d-flex mb-3">
                        <div class="media-body">
                        <h5 class="pt-2">${data[i]['Titolo']}</h5>
                        ${data[i]['Sottotitolo']}
                        </div>
                    </div>
                `);
            }
        }
    });

});