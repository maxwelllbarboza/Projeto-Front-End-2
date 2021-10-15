const efeitoNoite = document.querySelector('.btn-theme');
const movies = document.querySelector('.movies');
const modal = document.querySelector('.modal');
const modalTitle = document.querySelector('.modal__title');
const modalImg = document.querySelector('.modal__img');
const modalDescription = document.querySelector('.modal__description');
const modalAverage = document.querySelector('.modal__average');
const hiddenNone = document.querySelector('.hidden');
const modalClose = document.querySelector('.modal__close');
const textoTitle = document.querySelector('.highlight__title');
const textoRating = document.querySelector('.highlight__rating');
const textoGenres = document.querySelector('.highlight__genres');
const textoLaunch = document.querySelector('.highlight__launch');
const textoDescription = document.querySelector('.highlight__description');
const input__pesquisa = document.querySelector('.input');
const movie = document.querySelector('.movie');
movie.remove();
const next = document.querySelector('.btn-next');
const preview = document.querySelector('.btn-prev');
const imgVideo = document.querySelector('.highlight__video');
const linkVideo = document.querySelector('.highlight__video-link');
const mudarTema = document.querySelector('.btn-theme');

mudarTema.id = 0
let indiceNext = 0;
criarDiv();
popularDiv(0);
movimentoFilmes();
pesquisarFilme();
criarVideoDia();
const userRating = document.querySelectorAll('.movie__rating');   
const userTitle = document.querySelectorAll('.movie__title');
const userMovie = document.querySelectorAll('.movie');
const imagemGaleria = document.querySelectorAll('.movies .movie');


// _________________Função criar Div______________________
function criarDiv(){
    for(let x = 0; x <= 4; x++){                   
        const movie = document.createElement('div');
        movie.classList.add(`movie`);              
        movies.append(movie); 
        const movie__info = document.createElement('div');
        movie__info.classList.add('movie__info');        
        movie.append(movie__info);            
        const movie__title = document.createElement('span');
        movie__title.classList.add('movie__title');                   
        movie__info.append(movie__title);     
        const movie__rating = document.createElement('span');
        movie__rating.classList.add('movie__rating');                 
        movie__info.append(movie__rating);    
        const img = document.createElement('img');
        movie__rating.append(img);
        img.src = "./assets/estrela.svg";
    }
}

// _____________Função Popular Div________________________
function popularDiv(indice){
    fetch('https://tmdb-proxy.cubos-academy.workers.dev/3/discover/movie?language=pt-BR').then(function(resposta){
        const promisebody =  resposta.json();
        promisebody.then(function(body){              
            criarModal(body);            
            userMovie.forEach( function(user, index){
                index += indice;                
                user.style.backgroundImage = `url(${body.results[index].poster_path})`;
                user.id = body.results[index].id;                               
            });           
            userTitle.forEach(function(user, index){
                index += indice;                
                user.textContent =  body.results[index].title                      
            });            
            userRating.forEach(function(user, index){
                index += indice;                
                user.textContent =  body.results[index].vote_average;
            }); 
            pesquisarFilme()
        });
    });
}

// ___________________Criar Modal_____________________________
function criarModal(){    
    imagemGaleria.forEach(function(imagem){                
        imagem.addEventListener('click', function(event){                                   
            fetch(`https://tmdb-proxy.cubos-academy.workers.dev/3/movie/${event.target.id}?language=pt-BR`).then(function(resposta){
                const promisebody = resposta.json();
                promisebody.then(function(corpo){
                    abrirModal();
                    modalImg.style.backgroundImage =`url(${corpo.backdrop_path})`;
                    modalTitle.textContent = corpo.title;
                    modalDescription.textContent = corpo.overview;
                    modalAverage.textContent = corpo.vote_average;                        
                });    
            }); 
        });
    });    
}

// _____________________Movimento lateral dos filmes_____________________
function movimentoFilmes(){
    let y = 15;   
    preview.addEventListener('click', function(){
        if(y > 0){
            console.log(y)
            popularDiv(y)
            y -= 5;
        }else if(y <= 0){
            popularDiv(0);
            y = 15;        
        }          
    });  
    let x = 5;
    next.addEventListener('click', function(){               
        if(x <= 15){
            popularDiv(x)
            x += 5;
        }else if(x > 15){
            popularDiv(0);
            x = 5;        
        }      
    });   
}    

// _______________________Criar video e informações do video do dia______________________
function criarVideoDia(){
    fetch('https://tmdb-proxy.cubos-academy.workers.dev/3/movie/436969?language=pt-BR').then(function(resposta){
        const promisebody =  resposta.json();
        promisebody.then(function(body){            
            let data = new Date(body.release_date);            
            let dataFormatada = ((data.getDate() )    + " - " + ((data.getMonth() + 1)) + " - " +  data.getFullYear() ) ;                 

            imgVideo.style.backgroundImage =`url(${body.backdrop_path})`;
            textoTitle.textContent = body.title;
            textoRating.textContent = body.vote_average;
            textoGenres.textContent = body.genres[0].name + ', '+ body.genres[1].name + ', ' + body.genres[2].name + ', ' + body.genres[3].name;       
            textoLaunch.textContent =  dataFormatada;
            textoDescription.textContent = body.overview;        
        });    
    });
    fetch('https://tmdb-proxy.cubos-academy.workers.dev/3/movie/436969/videos?language=pt-BR').then(function(resposta){
        const promisebody =  resposta.json();
        promisebody.then(function(body){
            linkVideo.href = `https://www.youtube.com/watch?v=${body.results[0].key}`;             
        });    
    });
}

// ______________________Abrir e fechar o Modal________________________
function abrirModal(){
    modal.classList.remove("hidden");           
}
modalClose.addEventListener('click', function(){
    modal.classList.add("hidden");             
});
modal.addEventListener('click', function(){
    modal.classList.add("hidden");             
});

// _________________Pesquisa Filme_______________________
function pesquisarFilme(){    
    input__pesquisa.addEventListener('keydown', function(event){
        if(event.code === 'Enter'){           
            
            fetch(`https://tmdb-proxy.cubos-academy.workers.dev/3/search/movie?language=pt-BR&include_adult=false&query=${input__pesquisa.value}`).then(function(resposta){
                const  promiseBody = resposta.json();
                promiseBody.then(function(body){                
                    userMovie.forEach( function(user, index){                                       
                        user.style.backgroundImage = `url(${body.results[index].poster_path})`;
                        user.id = body.results[index].id;                               
                    });           
                    userTitle.forEach(function(user, index){                                      
                        user.textContent =  body.results[index].title                      
                    });            
                    userRating.forEach(function(user, index){                                      
                        user.textContent =  body.results[index].vote_average;
                    });                     
                });
                input__pesquisa.value = "";
                movimentoFilmes()
            });      
        }      
        
    });        
}
// __________________Mudar tema_______________________
const backDark = document.querySelector('body');
const tituloVideo = document.querySelector('.subtitle');
const informacaoVideo = document.querySelector('.highlight__info');
mudarTema.addEventListener('click', ({target}) => {
    if (target.id == 0 ){
        target.src = "./assets/dark-mode.svg";
        backDark.classList.add(`mudar__noite`);
        next.src = "./assets/seta-direita-branca.svg";
        preview.src =   "./assets/seta-esquerda-branca.svg";
        tituloVideo.style.color = '#FFFFFF';             
        target.id = 1;        
    }else{
        target.src = "./assets/light-mode.svg";
        next.src = "./assets/seta-direita-preta.svg";
        preview.src =   "./assets/seta-esquerda-preta.svg";
        tituloVideo.style.color = '#000000'; 


        backDark.classList.remove(`mudar__noite`);
        target.id = 0;
    }  
});