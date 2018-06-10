window.addEventListener('load', function(e){
   VK.Auth.login(function(response){
        if (response.session) {
            console.log('все нештяк');
        } else {
            console.error('все в говне');
            
        }
    }, 8)
    

});