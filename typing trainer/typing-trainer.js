let articles = {
    typingArticles:[
        "Simons Junior Fellow Philipp Brand began his career studying genetic variation in orchid bees. Now exploring the evolutionary underpinnings of fruit fly behavior, his long-term goal is to find connections between these research pursuits.",
        "My research took me to Central America, where orchid bees thrive. I studied two different, but closel related, orchid bee species: Euglossa dilemma and E. viridissima. I was hoping to answer two questions: What were the genetic differences that caused these species to diverge, and did that genetic variance cause the divergence in each species' perfume?",
        "A male fruit fly (Drosophila erecta) engages in courtship tracking of a two-dimensional dot projected onto a behavioral chamber in the presence of food",
        "Guys, it's really not easy to nail this thing.expecially the green and red blocks I have to add to the whiteboard automatically and precisely embeded to the exact place where the essay were.hope you'enjoy it,though you can easily play the better version of it on humanebnchmark",
        "In this somewhat random set of ideas, it is hard not to see an attempt by Boris Johnson, London's mayor, to restore relations with the city's black cab drivers",
        "don't tell me that I'm wrong, I've walked that road before, and I left you on your own. and please believe them when they say, just left for yesterday, for the record that I play, and please forget me for all that I've done"
    ]
}
function getFocus(){
    details.textarea.focus()
}
function initData(){
    document.querySelector('.caption').innerHTML = details.time
    if(details.time){
        let num = document.querySelectorAll('.right').length
        details.score = parseInt( num / details.time * 15)
        document.querySelector('.title').innerHTML = details.score
    }else{
        document.querySelector('.title').innerHTML = 0
    }
}
function progress (ev){
    if(details.textarea.value.length == details.typing.length || details.textarea.value.length - details.typing.length > 1){
        details.textarea.value = details.typing
        return
    }
    setTimeout(() => {
       
    }, 1000);
    if(ev.keyCode == 8){
    deleteLetter()
        return
    }
    if(details.time == -1){
        details.time = 0
        details.timer = setInterval(() => {
            details.time += 1
            initData()
        }, 1000);
    }

    details.typing = details.textarea.value

    ifChangeRow()
   
    const newNode = document.createElement('p')
    newNode.className = details.typing.slice()[details.typing.length - 1] == details.content.slice()[details.typing.length - 1] ? 'right' : 'wrong'
    newNode.innerHTML = details.content.slice()[details.typing.length - 1]
    if(ev.keyCode == 32 && details.content.slice()[details.typing.length - 1]==' ')newNode.className += ' space'
    if(ev.keyCode != 32 && details.content.slice()[details.typing.length - 1] == ' ')newNode.className += ' space'
    
    details.typeplace[details.currentRow].appendChild(newNode)
    initData()
    if(details.typing.length == details.content.length){
        end()
        return
    }
}
function ifChangeRow(){
    let num = 0
    for(let i=0;i<details.currentRow + 1;i++){
        num += details.rows[i].length
    }
    if(details.typing.length>num){
        const typeplace = document.createElement('div')
        typeplace.className = 'typeplace'
        details.currentRow += 1 
        typeplace.style.top = details.currentRow * 23 + 17.5 + 'px'
        typeplace.className += ' row'+ details.currentRow 
        document.querySelector('.content').appendChild(typeplace)
        details.typeplace = document.querySelectorAll('.typeplace')
    }
}

function end(){
    clearInterval(details.timer)
    document.querySelector('.wrap').style.display = 'none'
    document.querySelector('.result').style.display = 'flex'
    document.querySelector('.score').innerHTML = details.score + 'wpm'
}
function deleteLetter(){
    details.typing = details.textarea.value
    let num = 0
    for(let i=0;i<details.currentRow;i++){
        num += details.rows[i].length
    }
    const newNodes = details.typeplace[details.currentRow].querySelectorAll('p')
    if(!newNodes.length && !details.currentRow)return
    if(!(details.typing.length - num) && details.currentRow!==0){
        document.querySelector('.content').removeChild(details.typeplace[details.currentRow])
        details.currentRow--
        details.typeplace[details.currentRow]
        return
    }
    details.typeplace[details.currentRow].removeChild(newNodes[newNodes.length - 1])
    
}     
function saveScore(){
    alert('score saved')
}    
function tryAgain(){
    document.querySelector('.wrap').style.display = 'block'
    document.querySelector('.result').style.display = 'none'
    window.details = {
        ...details,
        currentL:'',
        typing:'',
        prevLength:0,
        time:-1,
        score:0,
        currentRow:0,
        rows:[]
    }
    details.textarea.value = details.typing
    details.typeplace.forEach(t=>{
        if(t!==details.typeplace[0])document.querySelector('.content').removeChild(t)
    })
    details.typeplace[0].querySelectorAll('p').forEach(p=>{
        details.typeplace[0].removeChild(p)
    })
    document.querySelector('.title').innerHTML = 'Typing Test'
    document.querySelector('.caption').innerHTML = 'Start typing to begin'
    document.querySelectorAll('.newRow').forEach(n=>{
        details.textareaB.removeChild(n)
    })
    initContent()
}
function initContent(){
    details.content = articles.typingArticles[Math.floor(Math.random() * articles.typingArticles.length)]
    onLoad(0)
}
function onShow(){
    details.textarea = document.querySelector('.textarea')
    details.textarea.addEventListener('keydown',(ev)=>{
        setTimeout(() => {
            progress(ev)
        }, 10);
    })
    details.typeplace = document.querySelectorAll('.typeplace')

    details.textareaB = document.querySelector('.textarea-background')
    initContent()
    
}
function onLoad(n){
    let num = 102

    let val = details.content.slice(n,num)
    let index = 0
    for(let i=0;i<Math.ceil(details.content.length / num);i++){
        details.rows[i] = details.content.slice(index,index + val.lastIndexOf(' ')+1)
        if(details.rows.length==Math.ceil(details.content.length / num)){
            details.rows[i] = details.content.slice(index,index + num)
        }
        index += details.rows[i].length
        val = details.content.slice(index,index + num)
    }
    let i = 0
    details.rows.forEach(r=>{

        const newRow = document.createElement('div')
        newRow.className = 'newRow'
        newRow.innerHTML = r
        newRow.style.top = 10 + 23 * i + 'px'
        details.textareaB.appendChild(newRow)
        i ++
    })
}
(()=>{
    window.typing = {
        getFocus,
        progress,
        tryAgain,
        saveScore,
        onShow,
    }
    window.details = {
        content:'',
        currentL:'',
        typing:'',
        textarea:{},
        typeplace:{},
        newNode:{},
        prevLength:0,
        time:-1,
        score:0,
        textareaB:{},
        rows:[],
        currentRow:0,
    }
    
})()