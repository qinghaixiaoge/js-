const containerDom = document.querySelector(".Container")
const containerHeight = containerDom.clientHeight
const containerWidth = containerDom.clientWidth
// 大地和水管的速度
const sudu = -100
class Boss {
    constructor(width, height, left, top,xSpeed,ySpeed,dom) {
        this.width = width
        this.height = height
        this.left = left
        this.top = top
        this.xSpeed = xSpeed
        this.ySpeed = ySpeed
        this.dom = dom
        this.render()
    }
    render() {
        this.dom.style.left = this.left + 'px'
        this.dom.style.top = this.top + 'px'
        this.dom.style.width = this.width + 'px'
        this.dom.style.height = this.height + 'px'
    }
    move(duration) {
        const newLeft = this.xSpeed * duration
        this.left += newLeft
        const newTop = this.ySpeed * duration
        this.top += newTop
        if (this.onMove) {
            //每次移动后，渲染前，均会调用该方法
            this.onMove() //是否存在onMove方法，如果存在，则调用
        }
        this.render()
    }
}