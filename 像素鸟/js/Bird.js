const birdDom = document.querySelector(".bird")
const birdStyle = getComputedStyle(birdDom)
const birdWidth = parseFloat(birdStyle.width)
const birdHeight = parseFloat(birdStyle.height)
const birdLeft = parseFloat(birdStyle.left)
const birdTop = parseFloat(birdStyle.top)
class Bird extends Boss {
    constructor() {
        super(birdWidth, birdHeight, birdLeft, birdTop, 0, 0, birdDom)
        this.g = 1500 // 加速度
        this.maxTop = containerHeight - landHeight - this.height
        this.swingStatus = 1
        this.timer = null
        this.render()
    }
    move(duration) {
        super.move(duration)
        this.ySpeed += this.g * duration
    }
    // 判断是否越位
    onMove() {
        if (this.top < 0) {
            this.top = 0
        } else if (this.top > this.maxTop) {
            this.top = this.maxTop
        }
    }
    jump() {
        this.ySpeed = -300
    }
    startSwing() {
        if (this.timer) {
            return
        }
        this.timer = setInterval(() => {
            this.swingStatus = (this.swingStatus + 1) % 3 + 1
            this.render()
        }, 300)
    }
    stopSwing() {
        clearInterval(this.timer)
        this.timer = null
    }
    render() {
        super.render()
        this.dom.className = `bird swing${this.swingStatus}`
    }
}
// const bird = new Bird()
// setInterval(() => {
//     bird.move(16 / 1000)
// }, 16)    
// window.addEventListener("keypress", function (e) {
//     if (e.key === " ") {
//         bird.jump()
//     }
// })