var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')

canvas.width =  window.innerWidth - 100
canvas.height =  window.innerHeight - 100


//사각형 모양
var dino = {
    x : 10,
    y : 200,
    width : 50,
    height : 50,
    draw(){
        ctx.fillStyle = 'green'
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}


// 장애물 클래스
class Cactus{
    constructor(){
        this.x = 500
        this.y = 200
        this.width = 50
        this.height = 50
    }
    draw(){
        ctx.fillStyle = 'red'
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}

let timer = 0 ;
let cactusArray = []
let jumpTimer = 0
let animation



//프레임마다 실행되는 코드
function frameSet(){
    animation = requestAnimationFrame(frameSet)
    timer++
    ctx.clearRect(0,0, canvas.width, canvas.height)

    // 120 프레임마다 장애물 등장
    if(timer % 200 === 0){
        let cactus = new Cactus()
        //장애물 생성마다 배열안에 집어 넣음
        cactusArray.push(cactus)
    }
    //배열에 있는 장애물들 draw()해달라
    cactusArray.forEach((a,i,o)=>{
        //지나간 장애물 제거(x좌표가 0미만이면제거)
        if(a.x < 0){
            o.splice(i,1)
        }
        a.x--

        crash(dino,a)

        a.draw()
    })

    //점프기능
    if (jump == true){
        dino.y-- ;
        jumpTimer++
    }
    if( jump == false){
        if(dino.y < 200){
        dino.y++
        }
    }
    if (jumpTimer > 100){
        jump = false
        jumpTimer=0
    }

    dino.draw()
}
frameSet()

//충돌확인

function crash(dino, cacus){
    var xCrash = cacus.x - (dino.x + dino.width)
    var yCrash = cacus.y - (dino.y + dino.height)
    if (xCrash < 0 && yCrash <0){
        ctx.clearRect(0,0, canvas.width, canvas.height)
        cancelAnimationFrame(animation)
    }
}


var jump = false
document.addEventListener('keydown', function(e){
    if (e.code === 'Space'){
        jump = true
    }
})