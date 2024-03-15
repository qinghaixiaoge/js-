// 两个矩形是否发生碰撞
function isHit(one,two){
    //横向:两个矩形的中心点的横向距离,是否小于矩形宽度之和的一半
    //纵向:两个矩形的中心点的纵向距离,是否小于矩形高度之和的一半
    var centerX1 = one.left+ one.width/2
    var centerY1 = one.top+ one.height/2
    var centerX2 = two.left+ two.width/2
    var centerY2 = two.top+ two.height/2
    var disX = Math.abs(centerX1-centerX2)
    var disY = Math.abs(centerY1-centerY2)
    if (disX < (one.width+two.width)/2 && disY < (one.height+two.height)/2) {
        return true
    }
    return false
}

//最后整合所有类
class Game {
    constructor() {
        this.sky = new Sky()
        this.land = new Land()
        this.bird = new Bird()
        this.pipePareProduce = new PipePareProduce()
        this.timer = null
        this.tick = 16 //移动的时间间隔
        this.gameOver = false
    }
    start() {
        if (this.timer) {
            return
        }
        
        this.pipePareProduce.start()
        this.bird.startSwing()
        if (this.gameOver) {
            window.location.reload()
            return
        }
        this.timer = setInterval(() => {
            const duration = 16 / 1000
            this.sky.move(duration)
            this.land.move(duration)
            this.bird.move(duration)
            for (let i = 0; i < this.pipePareProduce.pairs.length; i++) {
                this.pipePareProduce.pairs[i].move(duration)
            }
            // 判断游戏是否结束
            if (this.isGameOver()) {
                this.stop()
                this.gameOver = true
            }
        }, this.tick)
    }
    isGameOver(){
        // 鸟碰到了地面
        if (this.bird.top === this.bird.maxTop) {
            return true
        }
        // 柱子对与鸟是否发生碰撞
        //forEach会循环到底 for不会
        for(let i = 0;i < this.pipePareProduce.pairs.length;i++){
            const pair = this.pipePareProduce.pairs[i]
            if (isHit(pair.upPipe,this.bird) || isHit(pair.downPipe,this.bird)) {
                return true
            }
        }
        return false
    }
    stop() {
        this.bird.stopSwing()
        this.pipePareProduce.stop()
        clearInterval(this.timer)
        this.timer = null
    }
    regEvent() {
        window.onkeydown = (e) => {
            if (e.key === "Enter") {
                if (this.timer) {
                    this.stop()
                } else {
                    this.start()
                }
            }
        }
        window.addEventListener("keypress", (e)=> {
            if (e.key === " ") {
                this.bird.jump()
            }
        })
    }
}

const game = new Game()
game.regEvent()