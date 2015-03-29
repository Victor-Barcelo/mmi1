$(function () {
    $('#containerChart1').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: 'Intervalo: [09-Abr-13 :  1-Abr-13]'
        },
        subtitle: {
            text: 'Fuentes: Noticias locales, redes sociales.'
        },
        xAxis: {
            type: 'category',
            labels: {
                rotation: 0,
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Menciones'
            }
        },
        legend: {
            enabled: false
        },
        //tooltip: {
        //    pointFormat: 'Population in 2008: <b>{point.y:.1f} millions</b>'
        //},
        series: [{
            name: 'Menciones',
            data: [
                ['09-Abr-13', 16],
                ['10-Abr-13', 147],
                ['11-Abr-13', 1577]
            ],
            dataLabels: {
                enabled: true,
                rotation: 0,
                color: '#FFFFFF',
                align: 'right',
                format: '{point.y:.0f}', // one decimal
                y: 0, // 10 pixels down from the top
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        }]
    });
});

$(function () {

    // Make monochrome colors and set them as default for all pies
    Highcharts.getOptions().plotOptions.pie.colors = (function () {
        var colors = [],
            base = Highcharts.getOptions().colors[0],
            i;

        for (i = 0; i < 10; i += 1) {
            // Start out with a darkened base color (negative brighten), and end
            // up with a much brighter color
            colors.push(Highcharts.Color(base).brighten((i - 3) / 7).get());
        }
        return colors;
    }());

    // Build the chart
    $('#containerChart2').highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },
        title: {
            text: 'Marca Acme: Distribución porcentual del número de menciones en los medios radiofónicos'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.0f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.0f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        series: [{
            type: 'pie',
            name: 'Importancia',
            data: [
                ['Cadena Ser',   45],
                {
                    name: 'Cadena Cope',
                    y: 59,
                    sliced: true,
                    selected: true
                },
                ['RNE',    15]
            ]
        }]
    });
});

$(function () {
    $('#containerChart3').highcharts({
        chart: {
            type: 'line'
        },
        title: {
            text: 'Evolución de las menciones sobre la problemática del hotel RIU Maspalomas'
        },
        subtitle: {
            text: 'Fuentes: twitter y facebook.'
        },
        xAxis: {
            categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
            title: {
                text: 'Mes de Abril del 2014'
            }
        },
        yAxis: {
            title: {
                text: 'Menciones'
            }
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: false
            }
        },
        series: [{
            name: 'twitter',
            data: [7, 6, 9, 14, 18, 21, 25, 26, 23, 18, 13, 9]
        }, {
            name: 'facebook',
            data: [3, 4, 5, 8, 11, 15, 17, 16, 14, 10, 6, 4]
        }]
    });
});