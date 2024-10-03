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



}


function drawAxis(ctx){

    const xMax = ctx.canvas.width / 2;
    const yMax = ctx.canvas.height / 2;
    const xMin = -xMax;
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
}


draw();