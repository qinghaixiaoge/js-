const skyDom = document.querySelector(".sky")
const skyStyle = getComputedStyle(skyDom)
const skyWidth = parseFloat(skyStyle.width)
const skyHeight = parseFloat(skyStyle.height)
class Sky extends Boss{
    constructor(){
        super(skyWidth,skyHeight,0,0,-50,0,skyDom)
    }
    move(duration){
        super.move(duration)
    }
    onMove(){
        if (this.left <= -skyWidth/2) {
            this.left = 0
        }
    }
}
// const sky = new Sky()
// setInterval(() => {
//     sky.move(16/1000)
// }, 16)