window.addEventListener('load', function(e){
    VK.init({
        apiId: 6601672
    });

    VK.Auth.login(function(response){
        if (response.session) {
            console.log('все нештяк');
        } else {
            console.error('все в говне');
            
        }
    }, 8);


});