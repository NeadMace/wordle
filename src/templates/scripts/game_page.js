//Установление соединения с WebSocket
document.addEventListener('DOMContentLoaded', function() {
    var ws;

    function connect() {
        ws = new WebSocket('ws://localhost:8000/ws');

        ws.onopen = function() {
            console.log('Соединение установлено');
        };

        ws.onmessage = function(event) {
            console.log('Получено сообщение: ' + event.data);
        };

        ws.onclose = function() {
            console.log('Соединение закрыто');
        };

        ws.onerror = function(error) {
            console.log('Ошибка: ' + error);
        };
    }

const heading=document.createElement('h1');

const linebreak=document.createElement('hr');

const tiles=document.createElement('div');

const answer=document.createElement('h2');

const giveup=document.createElement('button');

const qmark=document.createElement('button');

var gameover=false;
var rows=6;
var columns=5;

var rowsindex=0;
var columnsindex=0;

let word1 = "HELLO";
let jsonRequest;


window.onload=function(){
    if (!ws || ws.readyState !== WebSocket.OPEN) {
        console.log('WebSocket не подключен. Подключаюсь...');
        connect();
        initialization();
    }
}
function initialization()
{
    const body=document.body;
    console.log(body);
  
          for(let i=0;i<rows;i++)
              {
                for(let j=0;j<columns;j++)
                    {
                            const tile=buildtile(i,j);
    
                             tiles.appendChild(tile);
                    }
              }

          heading.innerText='Wordle';
          tiles.setAttribute('id','tiles');
          heading.style.margin='1em auto';
          linebreak.style.width='50%';
          linebreak.style.margin='1em auto';
          answer.innerText=""


          qmark.innerText='?';
          qmark.setAttribute('id','qmark');
          giveup.innerText='Giveup';
          giveup.setAttribute('id', 'giveup');
            
        body.appendChild(heading);
        body.appendChild(qmark);
        body.appendChild(giveup);
        body.appendChild(linebreak);
        body.appendChild(answer);
        body.appendChild(tiles);

              
        document.addEventListener("keyup", (e)=>{        

            if(gameover) return;

            if(e.code>="KeyA" && e.code<="KeyZ")
            {

                if(columnsindex<columns){

                    let currentTile=document.getElementById(rowsindex.toString()+columnsindex.toString());

                    if(currentTile.innerText == '')
                    {
                        currentTile.innerText=e.code[3];
                        // let str = `{
                        //     "id": `+rowsindex.toString()+columnsindex.toString()+`, 
                        //     "value": `+currentTile.innerText+`
                        //   }`;
                        //   let res = eval('game_field(' + str + ')');
                        //   ws.send(res);
                    }
                    let str = {
                        type: "game_field",
                        id: rowsindex.toString()+columnsindex.toString(),
                        value: currentTile.innerText
                    };
                    jsonRequest = JSON.stringify(str)
                    ws.send(jsonRequest)
                    columnsindex+=1

                }
            }
                else if ( e.code == 'Backspace')
                {

                    if( columnsindex>0 && columnsindex<=columns)
                    {

                        columnsindex-=1
                        let currentTile=document.getElementById(rowsindex.toString()+columnsindex.toString());

                        // console.log(currentTile)
                        currentTile.innerText='';
                    }
                }
                if( columnsindex==columns && e.code== 'Enter')
                {
                    check_correctness();      
                    rowsindex+=1;
                    columnsindex=0;
                }            

                if(!gameover && rows==rowsindex)
                {
                    gameover=true;
                    answer.innerText=word1 + ", Try Again Tomorrow";

                }
                
            }
        )
        
}

function buildtile(i,j){


    const tile=document.createElement('div');
    tile.classList.add("tile");
    tile.setAttribute('id',i.toString()+j.toString());
    tile.innerText='';
    

    return tile;
}
function check_correctness(){


    let correct = 0;
    
    // using data
    let word=word1;
    let letterindex;

    for (let c=0; c< columns; c++)
    {


        let currentTile= document.getElementById(rowsindex.toString()+c.toString());
        let letter=currentTile.innerText;


         // 6. if letter is matching the letter in the word.

        if( letter == word1)
        {
            letterindex=word.indexOf(letter);
            word=word.slice(0,letterindex)+word.slice(letterindex+1,word1.length) 
            currentTile.classList.add("correct");
            correct+=1;


        }
        // 7. if letter is present in the word.
     
        // 8. if the letter is absent in the word. 
        else 
        {

            currentTile.classList.add("absent");
        }

    

        if(correct==columns)
        {
            gameover=true;
            answer.innerText=word1 + ", You win";
        }
    }

    console.log(word);

    for (let c=0; c< columns; c++)
    {

        let currentTile= document.getElementById(rowsindex.toString()+c.toString());
             letter=currentTile.innerText;

       if ( word.includes(letter))
        {
          
            console.log(word)
            currentTile.classList.remove('absent');
            currentTile.classList.add("present");
            letterindex=word.indexOf(letter);
            word=word.slice(0,letterindex)+word.slice(letterindex+1,word1.length)   
        }
    }

}
giveup.addEventListener('click', ()=>{

    answer.innerText= word1 + ", Try Again Tomorrow";
    columnindex=columns;
    rowsindex=rows;
})
  
  
  qmark.addEventListener('click', ()=>{
  
  
  
      const popup = document.createElement('div');
      popup.className = 'popup';
  
  
      const popupContent = document.createElement('div');
      popupContent.className = 'popup-content';
      popupContent.innerHTML=
      
      `
    <p> Rules: <p> 
    <br> 
    <ol> 
        <li>  In wordle, the computer chooses a word everyday. </li>
        <li>  The user has to guess the word in six attempts. </li>
        <li>  Each word will be a five letter one.  </li>
        <li>  The question mark icon(<em>that's me</em>) contains all the information related to the game.</li>
        <li>  The giveup button reveals the answer and the user can't continue anymore. </li>
    </ol>
  
      `;
  
  
      const closeButton = document.createElement('span');
      closeButton.className = 'popup-close';
      closeButton.innerHTML = '&times;'
      popupContent.appendChild(closeButton);
  
      closeButton.addEventListener('click', () => {
          document.body.removeChild(popup);
        });
  
      popup.appendChild(popupContent);
      document.body.appendChild(popup);
    
    })
    //Установление соединения с WebSocket
    
    
        
});