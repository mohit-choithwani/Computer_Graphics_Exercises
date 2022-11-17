"use strict";

///////////////////////////
//// global variables  ////
///////////////////////////

// seed point
let seedPoint = new Point(50, 50);

//////////////
//// gui  ////
//////////////

// event listener for gui
function onMouseDownCanvas2(e) {
    let rect = document.getElementById("canvas2").getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    console.log("onMouseDownCanvas2: " + x + " " + y);

    // set new seed point
    seedPoint.x = Math.floor(x);
    seedPoint.y = Math.floor(y);

    // rerender image
    RenderCanvas2();
}

///////////////////////////////
//// flood fill algorithm  ////
///////////////////////////////
function floodFill4(image, pixel, fillColor) {
    // TODO 2.2a)       Perform the flood fill algorithm,
    //                  taking into account only the four
    //                  direct neighbours of the pixel. The
    //                  variable "fillColor" denotes the color
    //                  for both the area and the border.

    // get the color at pixel location, use getPixel()
    let pixel_color = getPixel(image, pixel);
    //console.log("Value of the pixel :"+pixel.x + "&" + pixel.y);
    //console.log("Pixel Color is "+ pixel_color.r + pixel_color.b + pixel_color.g);
    //console.log("FillColor is "+ fillColor.r + fillColor.b + fillColor.g);


    // base case
    //       - color channels of the current color are equal to the color channels of the fillColor
    //       - pixel position is out of range
    if((pixel.x < 0 || pixel.y < 0 || pixel.x >= 200 || pixel.y >= 200) || (fillColor.r == pixel_color.r && fillColor.b == pixel_color.b && fillColor.g == pixel_color.g)){
      return null;
    }

    // set pixel color
    setPixel(image, pixel, fillColor);


    // Defining new points
    let new_top_point = new Point(pixel.x, pixel.y-1);
    let new_bottom_point = new Point(pixel.x, pixel.y+1);
    let new_right_point = new Point(pixel.x+1, pixel.y);
    let new_left_point = new Point(pixel.x-1, pixel.y);
    // start recursion (4 neighboring pixels)

    floodFill4(image, new_top_point, fillColor);
    floodFill4(image, new_bottom_point, fillColor);
    floodFill4(image, new_right_point, fillColor);
    floodFill4(image, new_left_point, fillColor);


}

//////////////////////////
//// render function  ////
//////////////////////////

function RenderCanvas2() {
    // draw something onto the canvas
    let context = document.getElementById("canvas2").getContext("2d");
    context.clearRect(0, 0, 200, 200);
    let canvas = context.getImageData(0, 0, 200, 200);

    let inc = 1;
    for (let i = 1; i < 20; i += inc) {
        for (let j = 0; j < 200; j++) {
            setPixel(canvas, new Point(i * 10, j), new Color(255, 0, 0));
            setPixel(canvas, new Point(j, i * 10), new Color(255, 0, 0));
        }
        inc++;
    }

    // flood fill
    floodFill4(canvas, seedPoint, new Color(255, 0, 0));


    // show image
    context.putImageData(canvas, 0, 0);
}

function setupFloodFill(canvas) {
    // execute rendering
    RenderCanvas2();
    // add event listener
    document.getElementById("canvas2").addEventListener('mousedown', onMouseDownCanvas2, false);
}
