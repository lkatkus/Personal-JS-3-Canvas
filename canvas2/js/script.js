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
    for(let i = 0; i < 10; i++){
        let radius = 5;

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
            c.strokeStyle = "blue";
            c.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
            c.fillStyle = 'red';
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
    function Line(){
        for(let i = 0; i <=9; i++){
            c.beginPath();
            c.moveTo(circleArr[0].x,circleArr[0].y);
            c.lineTo(circleArr[i].x,circleArr[i].y);
            c.strokeStyle = "red";
            c.stroke();
        }
    }


    // MAIN INIT FUNCTION
    animate();
};
