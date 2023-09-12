function drawPieSlice(ctx, centerX, centerY, radius, startAngle, endAngle, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.closePath();
    ctx.fill();
}

export class Piechart {
    constructor(options) {
        this.options = options;
        this.canvas = options.canvas;
        this.canvas.width = 300;
        this.canvas.height = 300;
        this.ctx = this.canvas.getContext('2d');
        this.colors = options.colors;
        this.draw = function () {
            let totalValue = 0;
            let colorIndex = 0;
            let val;
            for (let categ of this.options.data) {
                val = parseInt(categ[1]);
                totalValue += val;
            }
            let startAngle = 0;
            for (let categ of this.options.data) {
                val = parseInt(categ[1]);
                let sliceAngle = 2 * Math.PI * val / totalValue;
                drawPieSlice(
                    this.ctx,
                    this.canvas.width / 2,
                    this.canvas.height / 2,
                    Math.min(this.canvas.width / 2, this.canvas.height / 2),
                    startAngle,
                    startAngle + sliceAngle,
                    this.colors[colorIndex % this.colors.length]
                );
                startAngle += sliceAngle;
                colorIndex++;
            }
            if (this.options.legend) {
                colorIndex = 0;
                let legendHTML = '';
                for (let categ of this.options.data) {
                    legendHTML += "<div><span style='display:inline-block;width:20px;background-color:" + this.colors[colorIndex++] + ";'>&nbsp;</span> " + categ[0] + "</div>";
                }
                this.options.legend.innerHTML = legendHTML;
            }
        };
    }
}