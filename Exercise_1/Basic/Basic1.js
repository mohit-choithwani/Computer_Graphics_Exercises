"use strict"

function drawPixelwiseCircle(canvas) {
    let context = canvas.getContext("2d");
    let img = context.createImageData(200, 200);
    let radius = 50;

    //TODO 1.1a)      Copy the code from Example.js
    //                and modify it to create a
    //                circle.

    for (let i = 0; i < 4*200; i += 1) {
		for (let j = 0; j < 4 * 200; j += 1) {
			//Circle equation (x-x_1)^2 + (y - y_1)^2
			let distance = Math.sqrt((i-100)*(i-100) + (j-100)*(j-100));
			if(distance < radius){
					let position = (i)*200*4 + (j)*4;
					img.data[position ] = 0;
					img.data[position + 1] = 255;
					img.data[position + 2] = 0;
					img.data[position + 3] = 255;
	}
	}
	}
    context.putImageData(img, 0, 0);
}

function drawContourCircle(canvas) {
    let context = canvas.getContext("2d");
    let img = context.createImageData(200, 200);
    let radius = 50;

    //TODO 1.1b)      Copy your code from above
    //                and extend it to receive a
    //                contour around the circle.
    for (let i = 0; i < 4*200; i += 1) {
		for (let j = 0; j < 4 * 200; j += 1) {
			//Circle equation (x-x_1)^2 + (y - y_1)^2
			let distance = Math.sqrt((i-100)*(i-100) + (j-100)*(j-100));
			if(distance < radius + 10){
				if( distance > radius){
					let position = (i)*200*4 + (j)*4;
					img.data[position ] = 0;
					img.data[position + 1] = 127;
					img.data[position + 2] = 0;
					img.data[position + 3] = 255;
				}
				else{
				let position = (i)*200*4 + (j)*4;
				img.data[position ] = 0;
				img.data[position + 1] = 255;
				img.data[position + 2] = 0;
				img.data[position + 3] = 255;
				}
	}
	}
	}

    context.putImageData(img, 0, 0);
}

function drawSmoothCircle(canvas) {
    let context = canvas.getContext("2d");
    let img = context.createImageData(200, 200);
    let radius = 50;

    //TODO 1.1c)      Copy your code from above
    //                and extend it to get rid
    //                of the aliasing effects at
    //                the border.

  //   for (let i = 0; i < 4*200; i += 1) {
	// 	for (let j = 0; j < 4 * 200; j += 1) {
	// 		//Circle equation (x-x_1)^2 + (y - y_1)^2
	// 		let distance = Math.sqrt((i-100)*(i-100) + (j-100)*(j-100));
	// 		if(distance < radius){
	// 			if( distance > 40){
	// 				let position = (i)*200*4 + (j)*4;
	// 				img.data[position ] = 0;
	// 				img.data[position + 1] = 127;
	// 				img.data[position + 2] = 0;
	// 				img.data[position + 3] = 255;
	// 			}
	// 			else{
	// 			let position = (i)*200*4 + (j)*4;
	// 			img.data[position ] = 255;
	// 			img.data[position + 1] = 0;
	// 			img.data[position + 2] = 0;
	// 			img.data[position + 3] = 255;
	// 			}
	// }
	// }
    for(let i = 0; i < 100; i += 1){
      for(let j = 0; j < 100 * 4; j += 1){
      //Circle equation (x-x_1)^2 + (y - y_1)^2
    	let distance = Math.sqrt((i-100)*(i-100) + (j-100)*(j-100));

      //For inner circle, if the pixel lies in the range of 49px then full intensity
      		if(distance < radius){
            if(distance < radius - 1){
      				let position = (i)*200*4 + (j)*4;
      				img.data[position ] = 0;
      				img.data[position + 1] = 255;
      				img.data[position + 2] = 0;
      				img.data[position + 3] = 255;
            }
            else{
              let position = (i)*200*4 + (j)*4;
              img.data[position ] = 0;
              img.data[position + 1] = 255;
              img.data[position + 2] = 0;
              img.data[position + 3] = 150;
            }
          }
      //For outer circle, if the pixel lies in the range of 49px then full intensity
              if(distance > radius && distance < radius + 10){
                if(distance < radius + 10 - 1 && distance > radius + 1){
                  let position = (i)*200*4 + (j)*4;
                  img.data[position ] = 0;
                  img.data[position + 1] = 127;
                  img.data[position + 2] = 0;
                  img.data[position + 3] = 255;
                }
                else{
                  if(distance > radius){
                    let position = (i)*200*4 + (j)*4;
                    img.data[position ] = 0;
                    img.data[position + 1] = 127;
                    img.data[position + 2] = 0;
                    img.data[position + 3] = 125;
                  }
                  else{
                    let position = (i)*200*4 + (j)*4;
                    img.data[position ] = 0;
                    img.data[position + 1] = 127;
                    img.data[position + 2] = 0;
                    img.data[position + 3] = 125;
                  }
                }
              }

    }
	 }
  context.putImageData(img, 0, 0);
}
