﻿$(document).ready(function () {
    //peticion api para obtener informacion del controller, esto lo voy a hacer con bd
    $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        url: urlBase + "/Graficas/DataPastel",
        error: function () {
            alert("ocurrio un error");
        },
        success: function (data) {
            GraficaPastel(data);
        }
    })
});


function GraficaPastel(data) {

   
    var total = 0;
   
    for (var i = 0; i < data.length; i++) {
        total += data[i].y;
    }

    Highcharts.chart('container', {
        chart: {
            type: 'pie'
        },
        title: {
            text: 'Total alcancías: ' + total
        },
        subtitle: {
            text:'Alcancías habilitadas'
        },

        accessibility: {
            announceNewData: {
                enabled: true
            },
            point: {
                valueSuffix: '%'
            }
        },

        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true,
                    format: '{point.name}: {point.y:.0f}'
                }
            }
        },

        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.0f}</b><br/>'
        },

        series: [
            {
                name: "Alcancias",
                colorByPoint: true,
                data: data
            }
        ],
        drilldown: {
            series: [
                {
                    name: "Habilitadas",
                    id: "Habilitadas",
                    data: data
                },
                {
                    name: "No habilitadas",
                    id: "No habilitadas",
                    data: data
                }
            ]
        }
    });
}