let articles = {
    typingArticles:[
        "Simons Junior Fellow Philipp Brand began his career studying genetic variation in orchid bees. Now exploring the evolutionary underpinnings of fruit fly behavior, his long-term goal is to find connections between these research pursuits.",
        "My research took me to Central America, where orchid bees thrive. I studied two different, but closel related, orchid bee species: Euglossa dilemma and E. viridissima. I was hoping to answer two questions: What were the genetic differences that caused these species to diverge, and did that genetic variance cause the divergence in each species' perfume?",
        "A male fruit fly (Drosophila erecta) engages in courtship tracking of a two-dimensional dot projected onto a behavioral chamber in the presence of food.",
        "Guys, it's really not easy to nail this thing.expecially the green and red blocks I have to add to the whiteboard automatically and precisely embeded to the exact place where the essay were.hope you-enjoy it,though you can easily play the better version of it on humanbenchmark.",
        "In this somewhat random set of ideas, it is hard not to see an attempt by Boris Johnson, London's mayor, to restore relations with the city's black cab drivers.",
        "don't tell me that I'm wrong, I've walked that road before, and I left you on your own. and please believe them when they say, just left for yesterday, for the record that I play, and please forget me for all that I've done.",
        "the changing weather in the Swiss Alps added some challenges for todays second race day of the COOP FIS Tour de Ski performance by Le Gruyère. An individual start of 10km and 15km in Classic technique was on schedule. Cross-Country World Cup history was made by Kerttu and Iivo Niskanen as the siblings bring home the victory of their race each.",
        "With a clear margin, the 24 year-old Swede had taken the seat in the leaders chair and her result remained untouched until Kerttu Niskanen crossed the finish line.",
        "Aleksander Aamodt Kilde (NOR) claimed another super-G victory, making it three in a row. The Norwegian had already won in Beaver Creek and Val Gardena so was the clear favorite in today's race.",
        "Racing is scheduled to continue tomorrow at 11:30 CET with another super-G.",
        "The NBA All-Star Practice. NBA All-Star Celebrity Game and NBA Development League All-Star Game presented by Kumho Tire will take place at the Mercedes-Benz Superdome.",
        "Joseph Rodman Brake.1795-1820, was born in New York city. His father died when he was very young, and his early life was a struggle with poverty. He studied medicine, and took his degree when he was about twenty years old.",
        "Debt is of the very highest antiquity. The first debt in the hitory of man is the debt of nature, and the first instinct is to put off the payment of it to the last moment.",
        "a debtor is a man of mark. Many eyes are fixed upon him; many have interest in his wellbeing; his movements are of concer; he can not disappear unheeded; his name is upon many books; he is a man of note.",
        "The host Canadians have some solid history in Calgary, with Mark McMorris claiming the first World Cup victory of his storied career here way back in the 2009/2010 season, Laurie Blouin claiming her first World Cup win here in 2019/20, Liam Brearley earning his first World Cup podium here in that same year, and Brooke Voigt owning two second-place finishes at the venue.",
        "Competition at this year's Snow Rodeo begins on Thursday with the men's qualifications, where heat 1 will be dropping in at 10:00 MT, followed by heat 2 at 12:50. The top three riders from each heat will proceed straight through to Saturday's finals, while the riders placed 4-9 in each heat will qualify for semifinals.",
        "Friday will see women's qualifications beginning at 9:40, with the top four riders from each heat going through to finals, followed by men's semifinals at 11:40. The best four riders from men's semifinals will join the top six in Saturday's finals.",
        "Women's and men's finals on New Year's Day will begin at 10:00, and all competition phases in Calgary this week will be live-streamed on our YouTube channel (links below).",
        "Along with the standard prize money up for grabs this week, Snow Rodeo sponsors Toyota and Swatch have ponied up some extra incentives - $16,000 worth, to be exact - for the best tricks in each phase of competition through the next three days.",
        "This means that the best scoring women's and men's tricks on both the Toyota Channel Gap Rail, and on the Swatch Transition Jump each day will earn that rider an extra $1000 - except on finals day, when that amount bumps up to $1500. On top of THAT, the top eight scoring women's and men's tricks from qualifications will also be entered in a fan vote, with the winner's of that taking home a cool $500 apiece."
    ]
}
function getFocus(){
    details.textarea.focus()
}
function initData(){

    if(details.select.parentElement.style.display != 'none')details.select.parentElement.style.display = 'none'

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
    details.newNode = newNode
    
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
        details.currentRow += 1 
        typeplace.className = 'typeplace row'+ details.currentRow 
        typeplace.style.top = 10 + details.currentRow * details.rem * 1.5 + 'px'
        document.querySelector('.content').appendChild(typeplace)
        details.typeplace = document.querySelectorAll('.typeplace')
    }
}

function end(){
    clearInterval(details.timer)

    if(details.select.parentElement.style.display != 'block')details.select.parentElement.style.display = 'block'  

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
    details.typeplace = [details.typeplace[0]]
    document.querySelector('.title').innerHTML = 'Typing Test'
    document.querySelector('.caption').innerHTML = 'Start typing to begin'
    document.querySelectorAll('.newRow').forEach(n=>{
        details.textareaB.removeChild(n)
    })
    initContent()
}
function initContent(){
    details.content = articles.typingArticles[Math.floor(Math.random() * articles.typingArticles.length)]
    if(details.type == 2 && details.content.length > 220){
        initContent()
        return
    }else if(details.type == 3 && details.content.length < 300){
        initContent()
        return
    }
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

    details.select = document.querySelector('select')
    initContent()
}

function onLoad(n){
    details.rem = document.querySelector('.rem').offsetHeight - 1

    let num = 102

    let val = details.content.slice(n,num)
    let index = 0
    for(let i=0;i<Math.ceil(details.content.length / num);i++){
        details.rows[i] = details.content.slice(index,index + val.lastIndexOf(' ')+1)
        if(details.rows.length==Math.ceil(details.content.length / num)){
            if(index + num < details.content.length){
                details.rows[i] = details.content.slice(index,index + val.lastIndexOf(' ')+1)
                details.rows[i+1] = details.content.slice(index + details.rows[i].length,index + details.rows[i].length + num)
                break
            }

            details.rows[i] = details.content.slice(index,index + num)
        }
        index += details.rows[i].length
        val = details.content.slice(index,index + num)
    }

    details.textareaB.style.height = details.rows.length * 2 + 'rem'

    let i = 0
    details.rows.forEach(r=>{

        const newRow = document.createElement('div')
        newRow.className = 'newRow'
        newRow.innerHTML = r
        newRow.style.top = 10 + details.rem * 1.5 * i + 'px'
        newRow.style.height = '1rem'
        newRow.style.lineHeight = '1rem'
        details.textareaB.appendChild(newRow)
        i ++
    })
}
function changeType () {
    details.type = parseInt(details.select.value)
    end()
    tryAgain()
}
(()=>{
    window.typing = {
        getFocus,
        progress,
        tryAgain,
        saveScore,
        onShow,
        changeType
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
        rem:0,
        type:1,
        select:{}
    }
    
})()