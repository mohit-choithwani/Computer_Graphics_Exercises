"use strict"

function drawArcCircle(canvas) {
    let context = canvas.getContext("2d");

    //TODO 1.2)       Use the arc() function to
    //                rasterize the two circles
    //                from Task 1.1.

    context.beginPath();
    context.arc(60, 60, 50, 0, 2 * Math.PI, false);
    context.fillStyle = 'rgba(0,255,0,255)';
    context.fill();
	
    context.beginPath();
    context.arc(140, 140, 50, 0, 2 * Math.PI, false);
    context.fillStyle = 'rgba(0,255,0,255)';
    context.fill();
    context.lineWidth = 10;
    
    context.strokeStyle = 'rgb(0,127,0)';
    context.stroke();
    
}
