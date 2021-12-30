
function initdata(){
    details.target = document.querySelector(".target-wrap")
    details.remainCount = document.querySelector(".remain-count")
    details.remainCount.innerHTML = details.totalSum
}
function tryAgain(){
    details = {
        ...details,
        totalSum:10,
        currentScore:0,
        isPlaying:false,
        beginAt:'',
        endAt:'',
    }
    document.querySelector('.result').style.display = 'none'
    beginTraining()
}

function beginTraining(){

    //取消显示开始的提示词
    document.querySelector('.onshow').style.display = 'none'

    details.remainCount.innerHTML = details.totalSum - details.currentScore
    details.isPlaying = true
 
    // 显示目标，目标剩余，以及时间
    document.querySelector('.play-sets').style.display = 'flex'
    details.beginAt = new Date()
    popTarget(details.target)
}

function saveScore(){
    alert('saved to your account')
}
function popTarget(target,ev){
    target.style.display = 'none'

    if(ev){
       let screenW = ev.target.parentNode.parentNode.clientWidth
       let screenH = ev.target.parentNode.parentNode.clientHeight
    //    let tW = ev.target.clientWidth
    //    let tH = ev.target.clientHeight
        let tW = 100
        let tH = 100

        //变化target的位置
        let rleft = parseInt(Math.random() * screenW-tW)
        let rtop = parseInt(Math.random() * screenH-tH)
        if(rleft<0)rleft = 0
        if(rtop<0)rtop = 0
        target.style.left = rleft + 'px'
        target.style.top = rtop + 'px'
    }
    target.style.display = 'block'
}


function hitTarget(ev){
    let {currentScore,totalSum} = details
    details.currentScore++
    if(totalSum-currentScore<=1){
        playEnd()
    }else{
        details.remainCount.innerHTML = details.totalSum - details.currentScore
        popTarget(details.target,ev)
    }
}



function playEnd(){
    details.isPlaying = false
    details.endAt = new Date()
    document.querySelector('.play-sets').style.display = 'none'
    document.querySelector('.result').style.display = 'flex'
    document.querySelector('.avarage-time').innerHTML = parseInt((details.endAt - details.beginAt) / details.totalSum) +"ms"
}

function drawTarget(canvas,flag){
    const ctx = canvas.getContext('2d')
   
    ctx.save()
    
    ctx.fillStyle="rgba(255,255,255,0.5)"
    ctx.translate(canvas.width/2,canvas.height/2)
    if(flag){
       ctx.scale(3,2)
    }
    ctx.arc(0,0,50,0,360)
    ctx.fill()
    ctx.restore()

    ctx.save()
    ctx.strokeStyle="whitesmoke"
    ctx.lineWidth="2"
    ctx.beginPath()
    ctx.translate(canvas.width/2,canvas.height/2)
    if(flag){
        ctx.scale(3,2)
     }
    ctx.arc(0,0,50,0,360)
    ctx.arc(0,0,30,0,360)
    ctx.arc(0,0,10,0,360)
    ctx.moveTo(0,-50)
    ctx.lineTo(0,50)
    ctx.moveTo(-50,0)
    ctx.lineTo(50,0)
    ctx.stroke()
    ctx.closePath()
    ctx.restore()
}

(function(){
    window.aimTrainer = {
        hitTarget:hitTarget,
        beginTraining:beginTraining,
        drawTarget:drawTarget,
        popTarget:popTarget,
        tryAgain,
        saveScore
    }
    let int = setInterval(()=>{
        if(details){
            initdata()
            clearInterval(int)
        }
    },50)
})()