function start(){
    var canvas = document.getElementById('canvas');

    console.log(canvas);

    // SETTING WIDTH
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    var c = canvas.getContext('2d'); /* C - CONTEXT */

    // // RECTANGLES
    // c.fillStyle = "aqua";
    // c.fillRect(100, 100, 100, 100);
    // c.fillStyle = "orange";
    // c.fillRect(300, 200, 100, 100);
    // c.fillStyle = "firebrick";
    // c.fillRect(100, 500, 100, 100);
    //
    // // LINES
    // c.beginPath();
    // c.moveTo(200,200);
    // c.lineTo(200,500);
    // c.lineTo(300,300);
    // c.lineTo(200,200);
    // c.strokeStyle = "firebrick";
    // c.stroke();

    // ARC
    // c.beginPath();
    // c.strokeStyle = "yellow";
    // c.arc(100, 100, 50, 0, Math.PI*2, true);
    // c.stroke();

    // for(let i = 0; i < 200; i++){
    //     let x = Math.random()*window.innerWidth;
    //     let y = Math.random()*window.innerHeight;
    //     let z = Math.random()*70;
    //
    //     c.beginPath();
    //     c.strokeStyle = "yellow";
    //     c.arc(x, y, z, 0, Math.PI*2, true);
    //     c.stroke();
    // }

    // MOVING CIRCLE

    var circleArr = []; /* ARRAY TO KEEP CIRCLES */

    for(let i = 0; i < 100; i++){

        let radius = 30;
        let x = Math.random() * (innerWidth - radius * 2) + radius;
        let y = Math.random() * (innerHeight - radius * 2) + radius;
        let dx = (Math.random()-0.4)*20;
        let dy = (Math.random()-0.4)*20;

        circleArr.push(new Circle(x, y, dx, dy, radius));
    }


    // CIRCLE OBJECT
    function Circle(x, y, dx, dy, radius){
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius

        this.draw = function(){
            c.beginPath();
            c.strokeStyle = "blue";
            c.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
            c.stroke();
        }

        this.update = function(){
            if(this.x + this.radius > innerWidth || this.x - this.radius < 0){
                this.dx = -this.dx;
            }
            if(this.y + this.radius > innerHeight || this.y - this.radius < 0){
                this.dy = -this.dy;
            }

            this.x += this.dx;
            this.y += this.dy;

            this.draw();
        }
    }

    // ANIMATION FUNCTION
    function animate(){
        requestAnimationFrame(animate);

        // CLEANING CANVAS
        c.clearRect(0,0, innerWidth, innerHeight);

        // LOOP FOR UPDATING CIRCLE POSITION
        for(var i = 0; i < circleArr.length; i++){
            circleArr[i].update();
        }
    }

    animate();

    console.log(circleArr);

}
