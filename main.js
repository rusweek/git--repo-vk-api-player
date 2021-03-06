window.addEventListener('load', function(e){
    
// function for sec to min:sec formate   
    Handlebars.registerHelper('formatTime', function(time){
        let minutes = parseInt(time / 60);
        let seconds = time - minutes * 60;
        
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;
    });
    
    let globalPlayer = document.createElement('audio');
    let playingItem;
    
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
    }).then(function(){
        function onProgress(e){
            let progressBar = playingItem.querySelector('[data-role=progressbar]');
            let duration = e.target.duration;
            let currentTime = e.target.currentTime;
            let progress = parseInt(100 / duration * currentTime);
            progressBar.style.width = progress + '%';
        }
        
        function onPlay(){
            playingItem.querySelector('[data-role="playback"]').className = 'glyphicon glyphicon-pause';
        };
        
        function onPause(){
            playingItem.querySelector('[data-role="playback"]').className = 'glyphicon glyphicon-play';
        };
        
        function toSone(to){
            if(playingItem){
                let nextPlayer = to === 'next' ? playingItem.nextElementSibling : playingItem.previousElementSibling;
                if(nextPlayer){
                  nextPlayer.querySelector('[data-role=playback]').dispatchEvent(new CustomEvent('click'));  
                };
            };
        };
        
        function onEnd(){
            toSone('next');
        };
        
        
        globalPlayer.addEventListener('play', onPlay);
        globalPlayer.addEventListener('pause', onPause);
        globalPlayer.addEventListener('timeupdate', onProgress);
        globalPlayer.addEventListener('ended', onEnd);
        
        result.addEventListener('click', function(e){
            if(e.target.getAttribute('data-role') === 'playback'){
                let currentTarget = e.target.closest('li');
                
                if(currentTarget === playingItem){
                    if(globalPlayer.paused){
                        globalPlayer.play();
                    } else {
                        globalPlayer.pause();
                    }
                } else {
                    if(!globalPlayer.paused){
                       onPause();
                    };
                playingItem = currentTarget;
                    
                globalPlayer.src = e.target.getAttribute('data-src');
                globalPlayer.play;
                
                    
                }
            };
            
            //возможно данный участок надо переместить перед формированием странице result
        });
        
    }).catch(function (e) {
        console.log('error');
        
    });
  

    
    

});