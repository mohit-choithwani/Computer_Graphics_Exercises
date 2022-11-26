precision mediump float;

// TODO 3.3)	Define a constant variable (uniform) to
//              "send" the canvas size to all fragments.

uniform vec2 u_resolution;
void main(void)
{
	float delta = 0.0;
	float alpha = 1.0;
	float smoothMargin = 0.01;
	float r = 0.8;

	// TODO 3.3)	Map the fragment's coordinate (gl_FragCoord.xy) into
	//				the range of [-1,1]. Discard all fragments outside the circle
	//				with the radius r. Smooth the circle's edge within
	//				[r-smoothMargin, r] by computing an appropriate alpha value.

	float x = (gl_FragCoord.x - u_resolution.x / 2.0) / (u_resolution.x / 2.0);
	float y = (gl_FragCoord.y - u_resolution.y / 2.0) / (u_resolution.y / 2.0);
	float len = sqrt(x * x + y * y);
	if (len > r)
	{
	discard;
	}
	else{
	gl_FragColor = vec4(1.0, 85.0 / 255.0, 0.0,clamp(len,r-smoothMargin, r));
	}

}
