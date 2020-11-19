const gradientColors = [
  {
    percent: 0,
    color: '#ff9621',
  },
  {
    percent: 1,
    color: '#ff631c',
  },
]

const pointColors = {
  background: '#ffffff',
}

const axeColors = {
  color: 'rgba(0,0,0, 0.1)',
  ticks: 'rgba(0,0,0,0.5)',
}

const ticksFont = {
  fontColor: axeColors.ticks,
  fontFamily: 'Gilroy',
  fontSize: 16,
  padding: 15,
}

export const options = {
  legend: {
    display: false,
  },
  tooltips: {
    mode: 'point',
    titleFontFamily: 'Gilroy',
    titleAlign: 'center',
    bodyFontFamily: 'Gilroy',
    bodyFontSize: 14,
    bodyAlign: 'center',
    displayColors: false,
  },
  scales: {
    yAxes: [
      {
        gridLines: {
          drawBorder: false,
          drawTicks: false,
          offsetGridLines: false,
          color: axeColors.color,
          borderDash: [20, 15],
          zeroLineBorderDash: [20, 15],
          zeroLineColor: axeColors.color,
        },
        ticks: {
          ...ticksFont,
          stepSize: 1,
        },
      },
    ],
    xAxes: [
      {
        gridLines: {
          display: false,
          drawBorder: false,
          drawTicks: false,
          offsetGridLines: true,
        },
        ticks: {
          labelOffset: 0,
          ...ticksFont,
        },
      },
    ],
  },
  animation: false,
}

export const dataset = (labels, xData, width) => (canvas) => {
  const ctx = canvas.getContext('2d')
  const gradient = ctx.createLinearGradient(0, 0, width, 0)
  gradientColors.map((g) => gradient.addColorStop(g.percent, g.color))

  return {
    datasets: [
      {
        fill: false,
        borderColor: gradient,
        pointBorderColor: gradient,
        pointBorderWidth: 1.5,
        pointBackgroundColor: pointColors.background,
        pointRadius: 3.5,
        pointHoverRadius: 3.5,
        pointHoverBorderWidth: 1.5,
        pointHoverBackgroundColor: gradient,
        data: xData,
      },
    ],
    labels: labels,
  }
}
