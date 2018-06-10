window.addEventListener('load', function(e){
    new Promise(function(resolve,reject){
        VK.Auth.login(function(response){
            if (response.session) {
                resolve(response);
                console.log('все нештяк');
            } else {
                console.error('все в говне');
                reject(new Error('Error'));
                
            }
        }, 8);
    }).then(function(){return new Promise (function(resolve, reject){
        
        VK.api('users.get', { v:"5.73", 'name_case': 'gen'}, function(response){
            console.log(response);
            if (resolve.error){
                reject(new Error(response.error.error_msg));
            } else{
                console.log(response);
                console.log(response.response[0].first_name);
                console.log(response.response[0].last_name);
                let headerInfo = document.querySelector('.headerInfo');
                console.log(headerInfo);
                headerInfo.textContent = `Музыка на странице ${response.response[0].first_name} ${response.response[0].last_name}`;
                resolve();
            }
        })
    });}).catch(function (e) {
        console.log('error');
        
    });
  

    
    

});