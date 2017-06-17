function drawFace(data){
  for(var face in data){
    boundingBox.x = data[face].BoundingBox.Left * canvas.width;
    boundingBox.y = data[face].BoundingBox.Top * canvas.height;
    boundingBox.width =  data[face].BoundingBox.Width * canvas.width;
    boundingBox.height = data[face].BoundingBox.Height * canvas.height;
    ctx.font = '15px Arial';
    ctx.fillStyle = 'green';
    ctx.rect(boundingBox.x, boundingBox.y, boundingBox.width, boundingBox.height);
    ctx.fillText(face, boundingBox.x, boundingBox.y - 5);
    ctx.strokeStyle='green';
    ctx.stroke();
    console.log(boundingBox);
  }
}
