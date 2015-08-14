/**
 * Created by joe on 15-8-12.
 */
var canvas = document.getElementById('second').getContext('2d');
var picture = new Image(); // new Image(200,228)
picture.src = '1.jpg';

picture.addEventListener('load', function () {
    // 绘制图片
    canvas.drawImage(picture, 0, 0, 200, 228);

    canvas.font = "38px sans-serif ";
    canvas.fillStyle = '#F00';
    canvas.textAlign = 'right';
    // canvas写字
    canvas.fillText("8", 195, 38);
})
