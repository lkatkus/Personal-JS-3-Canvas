function init(){
    console.log("working");

    canvas = document.querySelector('canvas');
    console.log(canvas);

    // SETTING CANVAS SIZE
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    var c = canvas.getContext('2d');

    // MOUSE TRACKING
    var mouse = {
        x: undefined,
        y: undefined
    };

    window.addEventListener('mousemove', function(event){
        mouse.x = event.x;
        mouse.y = event.y;
        // console.log(mouse.x +' '+ mouse.y);
    });

    // ARRAY FOR CIRCLES
    var circleArr = [];

    // CREATING CIRCLES
    for(let i = 0; i < 50 ; i++){
        let radius = 3;

        // CIRCLE POSITION
        let x = Math.random() * (innerWidth - radius * 2) + radius;
        let y = Math.random() * (innerHeight - radius * 2) + radius;

        // MOVEMENT SPEED
        let dx = (Math.random()-0.4)*10;
        let dy = (Math.random()-0.4)*10;

        // PUSHING CIRCLES STARTING INFO INTO ARRAY
        circleArr.push(new Circle(x, y, dx, dy, radius));
    }

    // CIRCLE OBJECT
    function Circle(x, y, dx, dy, radius){
        this.x = x;
        this.dx = dx;
        this.y = y;
        this.dy = dy;
        this.radius = radius;

        // DRAW A CIRCLE
        this.drawCircle = function(){
            c.beginPath();
            c.strokeStyle = "#939393";
            c.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
            c.fillStyle = '#939393';
            c.fill();
        }

        // ANIMATE CIRCLES
        this.update = function(){
            if(this.x + this.radius > innerWidth || this.x - this.radius < 0){
                this.dx = -this.dx;
            }
            if(this.y + this.radius > innerHeight || this.y - this.radius < 0){
                this.dy = -this.dy;
            }

            this.x += this.dx;
            this.y += this.dy;

            this.drawCircle();

            Line();
        }
    }

    console.log(circleArr);

    function animate(){
        requestAnimationFrame(animate);

        // CLEANING CANVAS
        c.clearRect(0,0, innerWidth, innerHeight);

        // LOOP FOR UPDATING CIRCLE POSITION
        for(var i = 0; i < circleArr.length; i++){
            circleArr[i].update();
        }
    }

    // CREATING LINES
    // function Line(){
    //     for(let i = 0, j = 0; i <= circleArr.length-1; i++){
    //         c.beginPath();
    //         if(i >= (circleArr.length/2)){
    //             j = 1;
    //             c.strokeStyle = "#2c3e50";
    //         }else{
    //             c.strokeStyle = "#3498db";
    //         }
    //         c.moveTo(circleArr[j].x,circleArr[j].y);
    //         c.lineTo(circleArr[i].x,circleArr[i].y);
    //         c.stroke();
    //     }
    // }

    function Line(){

        // LINE BETWEEN ALL CIRCLES
        // for(let i = 0; i < circleArr.length; i++){
        //     for(let j = 0; j < circleArr.length;j++){
        //         if(j != i){
        //             c.beginPath();
        //             c.strokeStyle = "#939393";
        //             c.moveTo(circleArr[i].x,circleArr[i].y);
        //             c.lineTo(circleArr[j].x,circleArr[j].y);
        //             c.stroke();
        //         }
        //     }
        // }

        // LINE BETWEEN CLOSES CIRCLES
        for(let i = 0; i < circleArr.length; i++){
            for(let j = 0; j < circleArr.length;j++){
                if((circleArr[i].x - circleArr[j].x) > 150 || (circleArr[i].x - circleArr[j].x) < -150 || (circleArr[i].y - circleArr[j].y) > 150 || (circleArr[i].y - circleArr[j].y) < -150){

                }else{
                    c.beginPath();
                    c.strokeStyle = "#a8a8a8";
                    c.lineWidth=3;
                    c.moveTo(circleArr[i].x,circleArr[i].y);
                    c.lineTo(circleArr[j].x,circleArr[j].y);
                    c.stroke();
                }
            }
        }

    }


    // MAIN INIT FUNCTION
    animate();
};
