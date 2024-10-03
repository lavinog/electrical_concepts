function draw(){
    const amplitudeSlider = document.getElementById("amplitudeSlider");
    const phaseAngleSlider = document.getElementById("phaseAngleSlider");
    const cyclesSlider = document.getElementById("cyclesSlider");
    const dcOffsetSlider = document.getElementById("dcOffsetSlider");
    const canvas = document.getElementById("plotCanvas1");
    const ctx = canvas.getContext('2d');

    drawPlot(ctx,
        Number(amplitudeSlider.value),
        Number(phaseAngleSlider.value),
        Number(cyclesSlider.value),
        Number(dcOffsetSlider.value)
    );
}






function drawPlot( ctx, amplitude, phaseAngle, cycles, dcOffset){

    drawAxis(ctx);
	const yValues = [];	
	for (let x=0; x<=360; x++)		
	{
		yValues.push(
			amplitude * Math.sin((x * cycles + phaseAngle) * 0.017453292519943295) + dcOffset
		);
	}
	const rmsValue = Math.sqrt(yValues.reduce((acc, y) => acc + y*y) / (yValues.length-1));
	ctx.beginPath();
	ctx.moveTo(0,yValues[0]);
	yValues.slice(1).forEach((y, x)=>{ctx.lineTo(x, y)});
	ctx.strokeStyle = "red";
    ctx.stroke();

	ctx.beginPath();
	ctx.moveTo(0, Math.pow(yValues[0], 2));
	yValues.slice(1).forEach((y, x)=>{ctx.lineTo(x, Math.pow(y,2))});
	ctx.strokeStyle = "blue";
    ctx.stroke();
	
	const rmsValueOutput = document.getElementById("rmsValueOutput");
	rmsValueOutput.innerHTML=rmsValue;
	

}


function drawAxis(ctx){

    const xMax = ctx.canvas.width;
    const yMax = ctx.canvas.height / 2;
    const xMin = 0;
    const yMin = -yMax;

    // convert canvas to plot coordinates if not already performed.
    if(ctx.getTransform()['d']>=0) {
        ctx.transform(1, 0, 0, -1, 0, yMax);
    }
    ctx.clearRect(xMin, yMin, ctx.canvas.width, ctx.canvas.height);
    ctx.beginPath();
    ctx.moveTo(xMin, 0);
    ctx.lineTo(xMax, 0);
    ctx.moveTo(0, yMin);
    ctx.lineTo(0, yMax);
    ctx.strokeStyle = "grey";

    ctx.stroke();
	console.log(ctx.canvas.width, ctx.canvas.height, xMin, xMax, yMin, yMax)
}


function initialize(){
    const amplitudeSlider = document.getElementById("amplitudeSlider");
    const phaseAngleSlider = document.getElementById("phaseAngleSlider");
    const cyclesSlider = document.getElementById("cyclesSlider");
    const dcOffsetSlider = document.getElementById("dcOffsetSlider");

    const amplitudeOutput = document.getElementById("amplitudeOutput");
    const phaseAngleOutput = document.getElementById("phaseAngleOutput");
    const cyclesOutput = document.getElementById("cyclesOutput");
    const dcOffsetOutput = document.getElementById("dcOffsetOutput");

    // Set initial values
    amplitudeOutput.innerHTML = amplitudeSlider.value;
    phaseAngleOutput.innerHTML = phaseAngleSlider.value;
    cyclesOutput.innerHTML = cyclesSlider.value;
    dcOffsetOutput.innerHTML = dcOffsetSlider.value;

    // Update the current slider value (each time you drag the slider handle)
    amplitudeSlider.oninput = function() {
		amplitudeOutput.innerHTML = this.value;
		window.requestAnimationFrame(draw);
    }

    phaseAngleSlider.oninput = function() {
		phaseAngleOutput.innerHTML = this.value;
		window.requestAnimationFrame(draw);
    }
    cyclesSlider.oninput = function() {
		cyclesOutput.innerHTML = this.value;
		window.requestAnimationFrame(draw);
    }
    dcOffsetSlider.oninput = function() {
		dcOffsetOutput.innerHTML = this.value;
		window.requestAnimationFrame(draw);
    }

    window.requestAnimationFrame(draw);
}

initialize();