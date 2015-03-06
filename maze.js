$( document ).ready(function(){	
	var canvas = document.getElementById("maze-canvas");
	var context = canvas.getContext("2d");
	var currRectX = 67;
	var currRectY = 3;
	var mazeWidth = 250;
	var mazeHeight = 250;
	var intervalVar;
		
	function drawMazeAndRectangle(rectX, rectY) {
	    makeWhite(0, 0, canvas.width, canvas.height);
	    var mazeImg = new Image();
	    mazeImg.onload = function () {
		context.drawImage(mazeImg, 0, 0);
		drawRectangle(rectX, rectY, "#000001");
		context.beginPath();
		context.arc(89, 153, 7, 0, 2 * Math.PI, false);
		context.closePath();
		context.fillStyle = '#F37321';
		context.fill();
	    };
	    mazeImg.src = "maze.png";
			
			context.font = "20px Arial";
			context.fillStyle = "black";
			context.textAlign = "center";
			context.textBaseline = "middle";
			context.fillText("Carbon: ", mazeWidth - 30, canvas.height / 7);
		
	}
	function drawRectangle(x, y, style) {
	    makeWhite(currRectX, currRectY, 12, 12);
	    currRectX = x;
	    currRectY = y;
	    context.beginPath();
	    context.rect(x, y, 12, 12);
	    context.closePath();
	    context.fillStyle = style;
	    context.fill();
	}
	function moveRect(e) {
	    var newX;
	    var newY;
	    var movingAllowed;
	    e = e || window.event;
	    switch (e.keyCode) {
		case 38:   // arrow up key
		case 87: // W key
		    newX = currRectX;
		    newY = currRectY - 3;
		    break;
		case 37: // arrow left key
		case 65: // A key
		    newX = currRectX - 3;
		    newY = currRectY;
		    break;
		case 40: // arrow down key
		case 83: // S key
		    newX = currRectX;
		    newY = currRectY + 3;
		    break;
		case 39: // arrow right key
		case 68: // D key
		    newX = currRectX + 3;
		    newY = currRectY;
		    break;
	    }
	    movingAllowed = canMoveTo(newX, newY);
	    if (movingAllowed === 1) {      // 1 means 'the rectangle can move'
		drawRectangle(newX, newY, "#000001");
		currRectX = newX;
		currRectY = newY;
	    }
	    else if (movingAllowed === 2) { // 2 means 'the rectangle reached the end point'
		clearInterval(intervalVar);
		makeWhite(0, 0, canvas.width, canvas.height);
		context.font = "40px Arial";
		context.fillStyle = "blue";
		context.textAlign = "center";
		context.textBaseline = "middle";
		context.fillText("Congratulations!", canvas.width / 2, canvas.height / 2);
		window.removeEventListener("keydown", moveRect, true);
	    }
	}
	function canMoveTo(destX, destY) {
	    var imgData = context.getImageData(destX, destY, 12, 12);
	    var data = imgData.data;
	    var canMove = 1; // 1 means: the rectangle can move
	    if (destX >= 0 && destX <= mazeWidth - 12 && destY >= 0 && destY <= mazeHeight - 12) {
		for (var i = 0; i < 4 * 12 * 12; i += 4) {
		    if (data[i] === 0 && data[i + 1] === 0 && data[i + 2] === 0) { // black
			canMove = 0; // 0 means: the rectangle can't move
			break;
		    }
		    else if (data[i] === 0 && data[i + 1] === 255 && data[i + 2] === 0) { // #00FF00
			canMove = 2; // 2 means: the end point is reached
			break;
		    }
		}
	    }
	    else {
			canMove = 0;
		    }
		    return canMove;
		}
			
			function createTimer(seconds) {
						intervalVar = setInterval(function () {
						makeWhite(mazeWidth, 0, canvas.width - mazeWidth, canvas.height);
						if (seconds === 0) {
							clearInterval(intervalVar);
							window.removeEventListener("keydown", moveRect, true);
							makeWhite(0, 0, canvas.width, canvas.height);
							context.font = "40px Arial";
							context.fillStyle = "red";
							context.textAlign = "center";
							context.textBaseline = "middle";
							context.fillText("Carbon Time's Up!", canvas.width / 4, canvas.height / 4);
							return;
						}
						context.font = "20px Arial";
						if (seconds <= 10 && seconds > 5) {
							context.fillStyle = "orangered";
						}
						else if (seconds <= 5) {
							context.fillStyle = "red";
							}
							else {
								context.fillStyle = "green";
							}
							context.textAlign = "center";
							context.textBaseline = "middle";
							var secondsToShow = seconds.toString();
							context.fillText(secondsToShow, mazeWidth + 20, canvas.height / 7);
							seconds--;
					}, 1000);
				}
		
        function makeWhite(x, y, w, h) {
            context.beginPath();
            context.rect(x, y, w, h);
            context.closePath();
            context.fillStyle = "white";
            context.fill();
        }
        drawMazeAndRectangle(67, 3);
        window.addEventListener("keydown", moveRect, true);
		createTimer(20);
});
