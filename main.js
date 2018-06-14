window.addEventListener('load', function(e){
    
// function for sec to min:sec formate   
    Handlebars.registerHelper('formatTime', function(time){
        let minutes = parseInt(time / 60);
        let seconds = time - minutes * 60;
        
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;
    })
    
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
                
                let headerInfo = document.querySelector('.headerInfo');
                headerInfo.textContent = `Музыка на странице ${response.response[0].first_name} ${response.response[0].last_name}`;
                resolve();
            }
        })
    });}).then(function(){ 
        return new Promise(function(resolve, reject) {
            VK.api('audio.get', {v:"5.73"}, function (response) {
                console.log(response);
                if(response.error){
                    reject(new Error(response.error.error_msg));
                } else {
                    let source = playerItemTemplate.innerHTML;
                    let templateFn = Handlebars.compile(source);
                    let template = templateFn({list: response.response});

                    result.innerHTML = template;
                };
                
            });
        });
    }).catch(function (e) {
        console.log('error');
        
    });
  

    
    

});