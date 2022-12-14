"use strict";

function webGLStart(canvas) {

    let gl = canvas.getContext("experimental-webgl");
    if (!gl) throw new Error("Could not initialise WebGL, sorry :-(\nTo enable WebGL support in your browser, go to about:config and skip the warning.\nSearch for webgl.disabled and set its value to false.");

    gl.viewport(0, 0, canvas.width, canvas.height);

    let c = [0, 0];
    let r = 0.7;
    let slices = 100;
    let angle = 2 * Math.PI/slices;

    //console.log('Angle--->'+angle);

    let vertices = [];
    let indices = [];

    // TODO 3.1)	Replace the following code so that
    //              the vertices and indices to not describe
    //              a triangle but a circle around the center
    //              c with radius r. Use triangles to describe
    //              the circle's geometry. The number of
    //              triangles is stored in the variable slices.

    //Define the starting center points
    let x0 = c[0];
    let y0 = c[1];

    //New point on the circle
    let x1 = 0;
    let y1 = r;


    vertices.push(x0);
    vertices.push(y0);

    vertices.push(x1);
    vertices.push(y1);

    for(let i = 1; i <= slices; i++){

      console.log('Iteration--->'+i);

      let new_x = r * Math.sin(i*angle);
      //console.log('Sin of Angle--->'+Math.sin(i*Math.PI/2));
      let new_y = r * Math.cos(i*angle);
      //console.log('Cosin of Angle--->'+Math.cos(i*Math.PI/2));
      vertices.push(new_x);
      vertices.push(new_y);

      console.log('new_x-->'+new_x+' new_y-->'+new_y);

      indices.push(0);
      indices.push(i);
      indices.push(i+1);
    }


    let vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    let ibo = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);


    let vertexShader = getShader(gl, "shader-vs");
    let fragmentShader = getShader(gl, "shader-fs");

    let shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)){
        throw new Error("Could not initialise shaders");
    }

    gl.useProgram(shaderProgram);

    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);

    let attrVertexPosition = gl.getAttribLocation(shaderProgram, "vVertex");
    gl.enableVertexAttribArray(attrVertexPosition);
    gl.vertexAttribPointer(attrVertexPosition, 2, gl.FLOAT, false, 8, 0);

    gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
}
