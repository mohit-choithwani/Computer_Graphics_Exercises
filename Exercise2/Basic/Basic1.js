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
    let delta_x = x1 - x0;
    let delta_y = y1 - y0;
    let delta_abs_x = Math.abs(delta_x);
    let delta_abs_y = Math.abs(delta_y);
    let param_x = 2 * delta_abs_y - delta_abs_x;
    let param_y = 2 * delta_abs_x - delta_abs_y;
    let x_value, y_value,x_error, y_error, i;

    // set pixel using the helper function setPixelS()
    //console.log("X-->"+x+" Y-->"+y);

    // For y-axis
    if (delta_abs_y > delta_abs_x)
        {
          // bottom to top
            if (delta_y< 0)
            {
                x_value = x1;
                y_value = y1;
                y_error = y0;

            }
            // top to bottom
            else
            {
                x_value = x0;
                y_value = y0;
                y_error = y1;
            }
            // set pixel using the helper function setPixelS()
            setPixelS(image, new Point(x_value,y_value), new Color(0,0,0), pixelScale)

            for (i = 0; y_value< y_error; i++)
            {
                y_value = y_value + 1;
                if (param_y <= 0)
                {
                    param_y = param_y + 2 * delta_abs_x;
                }
                else
                {
                    if ((delta_x < 0 && delta_y<0) || (delta_x > 0 && delta_y > 0))
                    {
                        x_value = x_value + 1;
                    }
                    else
                    {
                        x_value = x_value - 1;
                    }
                    param_y = param_y + 2 * (delta_abs_x - delta_abs_y);
                }
                // set pixel using the helper function setPixelS()
                setPixelS(image, new Point(x_value,y_value), new Color(0,0,0), pixelScale)
            }
        }
    // For x-axis
    else {
            // for left to right
            if (delta_x >= 0)
            {
                x_value = x0;
                y_value = y0;
                x_error = x1;
            }
            // for right to left
            else
            {
                x_value = x1;
                y_value = y1;
                x_error = x0;
            }
            setPixelS(image, new Point(x_value,y_value), new Color(0,0,0), pixelScale)

            for (i = 0; x_value < x_error; i++)
            {
                x_value = x_value + 1;
                if (param_x < 0)
                {
                    param_x = param_x + 2 * delta_abs_y;
                }
                else
                {
                    if ((delta_x < 0 && delta_y < 0) || (delta_x > 0 && delta_y > 0))
                    {
                        y_value = y_value + 1;

                    }

                    else
                    {
                      y_value = y_value - 1;

                    }
                    param_x = param_x + 2 * (delta_abs_y - delta_abs_x);
                }
                setPixelS(image, new Point(x_value,y_value), new Color(0,0,0), pixelScale)
            }
        }

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
