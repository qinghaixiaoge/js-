const landDom = document.querySelector(".land")
const landStyle = getComputedStyle(landDom)
const landWidth = parseFloat(landStyle.width)
const landHeight = parseFloat(landStyle.height)
const landTop = parseFloat(landStyle.top)
class Land extends Boss{
    constructor(){
        super(landWidth,landHeight,0,landTop,sudu,0,landDom)
    }
    move(duration){
        super.move(duration)
    }
    onMove(){
        if (this.left <= -landWidth/2) {
            this.left = 0
        }
    }
}
// const land = new Land()
// setInterval(() => {
//     land.move(16/1000)
// }, 16)