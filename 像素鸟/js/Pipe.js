const pipeWidth = 52
class Pipe extends Boss {
    constructor(height, top, dom) {
        super(pipeWidth, height, containerWidth, top, sudu, 0, dom)
    }
    onMove() {
        if (this.left < -this.width) {
            this.dom.remove()
        }
    }
}
function getRandom(min, max) {
    return Math.floor(Math.random()*(max - min + 1) + min)
}
class PipePare {
    constructor() {
        const upDom = document.createElement('div')
        const downDom = document.createElement('div')
        upDom.className = "pipe up"
        downDom.className = "pipe down"
        this.spaceHeight = 150
        this.minHeight = 80
        this.maxHeight = landTop - this.minHeight - this.spaceHeight
        const upHeight = getRandom(this.minHeight, this.maxHeight)
        this.upPipe = new Pipe(upHeight, 0, upDom)
        const downHeight = landTop - upHeight - this.spaceHeight
        const downTop = landTop - downHeight
        this.downPipe = new Pipe(downHeight, downTop, downDom)
        containerDom.appendChild(upDom)
        containerDom.appendChild(downDom)
    }
    move(duration) {
        this.upPipe.move(duration)
        this.downPipe.move(duration)
    }
    get useLess() {
        return this.upPipe.left < -this.upPipe.width
    }
}
class PipePareProduce {
    constructor() {
        this.pairs = []
        this.timer = null
        // 1.5s产生柱子对
        this.tick = 1500
    }
    start() {
        if (this.timer) {
            return
        }
        this.timer = setInterval(() => {
            this.pairs.push(new PipePare())
            for (let i = 0; i < this.pairs.length; i++) {
                const pair = this.pairs[i]
                if (pair.useLess) {
                    this.pairs.splice(i, 1)
                    i--
                }
            }
        }, this.tick)
    }
    stop() {
        clearInterval(this.timer)
        this.timer = null
    }
}
// const pipepare = new PipePareProduce()
// pipepare.start()
// setInterval(() => {
//     pipepare.pairs.forEach(pair=>{
//         pair.move(16 / 1000)
//     })
// }, 16)