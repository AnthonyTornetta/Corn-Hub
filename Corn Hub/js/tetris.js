document.onload = () =>
{
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');

    (() =>
    {
        requestAnimationFrame(draw);

        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, w, h);

        ctx.fillStyle = '#ff0000';
        ctx.fillRect(20, 20, 50, 50);
    })();
};