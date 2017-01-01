(function(){
    'use strict';
    var $ = function(query){
        var elem = document.querySelectorAll(query);
        return query.indexOf('#') === 0 ? elem[0] : elem;
    };

    var getPreviewUrl = function(input, display){
        if(input.files && input.files[0]){
            var reader = new FileReader();
            reader.onload = function(e){
                display.src = e.target.result;
            };

            reader.readAsDataURL(input.files[0]);
        }
    };

    $('#fileInput').addEventListener('change', function(){
       getPreviewUrl(this, $('.preview')[0]);
    });

})();