"use strict";

///////////////////////////
//// global variables  ////
///////////////////////////

// pixel scale
let pixelScale = 10;

// line
let line = new Line(    new Point( 10 / pixelScale,  10 / pixelScale),
                        new Point(180 / pixelScale, 180 / pixelScale),
                        new Color(0, 0, 0));

//////////////
//// gui  ////
//////////////

// event listener for gui
function onChangePixelScale(value) {
    // rescale line
    let s = pixelScale / value;
    line.startPoint.x = line.startPoint.x * s;
    line.startPoint.y = line.startPoint.y * s;
    line.endPoint.x = line.endPoint.x * s;
    line.endPoint.y = line.endPoint.y * s;
    // set new scaling factor
    pixelScale = value;
    // rerender scene
    RenderCanvas1();
}

function onMouseDownCanvas1(e) {
    let rect = document.getElementById("canvas1").getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    console.log("onMouseDownCanvas1: " + x + " " + y);

    // set new points
    if (e.ctrlKey) {
        line.endPoint.x = x / pixelScale;
        line.endPoint.y = y / pixelScale;
    } else {
        line.startPoint.x = x / pixelScale;
        line.startPoint.y = y / pixelScale;
    }

    // rerender image
    RenderCanvas1();
}


//////////////////////////////
//// bresenham algorithm  ////
//////////////////////////////

function bresenham(image, line) {
    // ensure integer coordinates
    let x0 = Math.floor(line.startPoint.x);
    let y0 = Math.floor(line.startPoint.y);
    let x1 = Math.floor(line.endPoint.x);
    let y1 = Math.floor(line.endPoint.y);

    // TODO 2.1     Write code to draw a line
    //              between the start point and
    //              the end point. To make things
    //              easier, there are some comments
    //              on what to do next:

    // compute deltas and update directions
    let delta_x = x1 - x0;
    let delta_y = y1 - y0;
    let slope = delta_x - 2 * delta_y;
    let dir_E = -2 * delta_y;
    let dir_NE = 2 * (delta_x - delta_y);
    let x;
    let y;
    let xe;

    // creating copy of deltas
    let delta_x1 = delta_x;
    let delta_y1 = delta_y;

    // calculating error intervals
    let err_x = 2 * delta_y - delta_x;
    let err_y = 2 * delta_x - delta_y;

    // set initial coordinates
    let color = new Color(0, 0, 0)

    // For x-acis
    if (delta_y <= delta_x){
      // left to new_right
      if (delta_x >= 0){
        x = x0;
        y = y0;
        xe = x1;
      }
      else{
        x = x1;
        y = y1;
        xe = x0;
      }

      // set pixel using the helper function setPixelS()
      //console.log("X-->"+x+" Y-->"+y);
      let pixel = new Point(x, y);
      setPixelS(image, pixel, color, pixelScale);

      // start loop to set nPixels
      let nPixels = x1 - x0 + 1; // think about how many pixels need to be set - zero is not correct ;)
      for (let i = 0; i < nPixels; ++i) {
        x = x + 1;

        if(err_x < 0){
          err_x = err_x + delta_y1;
        }
        else{
          if((delta_x < 0 && delta_y < 0) || (delta_x > 0 && delta_y > 0)){
            y = y + 1;
          }
          else{
            y = y - 1;
          }
          err_x = err_x + 2 * (delta_y1 - delta_x1);
        }
      }

      let pixel_1 = new Point(x, y);
      setPixelS(image, pixel_1, color, pixelScale);

    }
    // for y-axis
    else{
      // bottom to top
      if (delta_y >= 0){
        let x = x0;
        let y = y0;
        let ye = y1;
      }
      else{
        // top to bottom
        let x = x1;
        let y = y1;
        let ye = x0;
      }

      // set pixel using the helper function setPixelS()
      let pixel = new Point(x, y);
      setPixelS(image, pixel, color, pixelScale);

      // start loop to set nPixels
      let nPixels = y1 - y0 + 1; // think about how many pixels need to be set - zero is not correct ;)
      for (let i = 0; i < nPixels; ++i) {
        y = y + 1;

        if(err_y <= 0){
          err_y = err_y + delta_x1;
        }
        else{
          if((delta_x < 0 && delta_y < 0) || (delta_x > 0 && delta_y > 0)){
            x = x + 1;
          }
          else{
            x = x - 1;
          }
          err_y = err_y + 2 * (delta_x1 - delta_y1);
        }
      }

      let pixel_1 = new Point(x, y);
      setPixelS(image, pixel_1, color, pixelScale);

    }
    // start loop to set nPixels
    // let nPixels = x1 - x0 + 1; // think about how many pixels need to be set - zero is not correct ;)
    // for (let i = 0; i < nPixels; ++i) {
    //     // set pixel using the helper function setPixelS()
    //     let pixel = new Point(x, y);
    //     setPixelS(image, pixel, color, pixelScale);
    //     x = x + 1;
    //
    //     if (slope < 0){
    //       y = y + 1;
    //       slope = slope + dir_NE;
    //     }
    //     else{
    //       slope = slope + dir_E;
    //     }
    //
    //
    // }
}


//////////////////////////
//// render function  ////
//////////////////////////

function RenderCanvas1() {
    // get canvas handle
    let context = document.getElementById("canvas1").getContext("2d");
    let canvas = context.createImageData(200, 200);

    // clear canvas
    clearImage(canvas, new Color(255, 255, 255));

    // draw line
    bresenham(canvas, line);

    // draw start and end point with different colors
    setPixelS(canvas, line.startPoint, new Color(255, 0, 0), pixelScale);
    setPixelS(canvas, line.endPoint, new Color(0, 255, 0), pixelScale);

    // show image
    context.putImageData(canvas, 0, 0);
}


function setupBresenham(canvas) {
    // execute rendering
    RenderCanvas1();
    // add event listener
    document.getElementById("canvas1").addEventListener('mousedown', onMouseDownCanvas1, false);
}
