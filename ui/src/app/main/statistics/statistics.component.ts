import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import ApexCharts from 'apexcharts'
import { NgApexchartsModule } from 'ng-apexcharts';

import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexStroke,
  ApexXAxis,
  ApexFill,
  ApexTooltip,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexTitleSubtitle,
} from "ng-apexcharts";
import { LoaderService } from '../../loader.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  non_series: ApexNonAxisChartSeries;
  responsive: ApexResponsive[];
  labels: any;
  colors: string[];
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss'
})
export class StatisticsComponent {
  @ViewChild("chart") chart: ChartComponent | undefined;
  public chartOptions: Partial<ChartOptions>;
  public horzChartOptions: Partial<ChartOptions>;
  public PieChartOptions: Partial<ChartOptions>;
  public treeChartOptions: Partial<ChartOptions>;
  public PieChartOptions2: Partial<ChartOptions>;
  isDarkMode: boolean = false




  constructor(private loaderService: LoaderService) {
    this.chartOptions = {}
    this.horzChartOptions ={}
    this.PieChartOptions = {}
    this.PieChartOptions2 = {}
    this.treeChartOptions = {}

    this.loaderService.isDarkMode$.subscribe((res) => {
      this.isDarkMode = res;
      this.updateChartOptions();
    });
  }
  public generateData(count:any, yrange:any) {
    var i = 0;
    var series = [];
    while (i < count) {
      var x = "w" + (i + 1).toString();
      var y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

      series.push({
        x: x,
        y: y
      });
      i++;
    }
    return series;
  }
  
  updateChartOptions(): void {
    
    this.chartOptions = {
      series: [
        {
          name: "16 and above",
          data: [2, 1, 4, 11, 60]
        },
        {
          name: "11 to 15 Acres",
          data: [0, 3, 6, 17, 23]
        },
        {
          name: "5 to 10 Acres",
          data: [2, 11, 22, 43, 136]
        },
        {
          name: "1 to 4 Acres",
          data: [4, 33, 37, 45, 168]
        }
      ],
      xaxis: {
        categories: ['18-22', '23-27', '28-32', '33-37', '38 & up'],
        labels: {
          style: {
            colors: this.isDarkMode ? '#fff' : '#000' 
          }
        }
      },
      legend: {
        position: 'top',
        floating: false,
        labels: {
          colors: this.isDarkMode ? '#fff' : '#000' // Legend text color
        },
      },
      chart: {
        type: "bar",
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
        }
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"]
      },
      yaxis: {
        title: {
          text: "Farmers",
          style: {
            color: this.isDarkMode ? '#fff' : '#000' // Set color based on dark mode
          }
        },
        labels: {
          style: {
            colors: this.isDarkMode ? '#fff' : '#000' // X-axis labels color
          }
        }
      },
      fill: {
        opacity: 1
      },
      colors: [this.isDarkMode ? '#00E396' : '#008FFB'], // Line color
      tooltip: {
        y: {
          formatter: function(val) {
            return "$ " + val + " Farmers";
          }
        },
        theme: this.isDarkMode ? 'dark' : 'light', // Tooltip theme
      }
    };
    this.PieChartOptions = {
      non_series: [47, 30, 23],
      chart: {
        width: 380,
        type: "pie"
      },
      labels: ['Northern', 'Savanna', 'Upper East'],
      legend: {
        position: 'top',
        horizontalAlign: 'center',
        floating: false,
        labels: {
          colors: this.isDarkMode ? '#fff' : '#000' // Legend text color
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom",
              style: {
                colors: this.isDarkMode ? '#fff' : '#000' 
              }
            }
          }
        }
      ]
    }
    this.PieChartOptions2 = {
      non_series: [2.5, 7.1, 1.0, 26.5, 5.7, 21.6, 35.6],
      chart: {
        width: 380,
        type: "pie"
      },
      labels: ['Bulls', 
      'Cattle', 
      'Donkey', 
      'Goats', 
      'Pigs', 
      'Sheep', 
      'Poultry'],
      legend: {
        position: 'top',
        horizontalAlign: 'center',
        floating: false,
        labels: {
          colors: this.isDarkMode ? '#fff' : '#000' // Legend text color
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    }
    this.treeChartOptions = {
        series: [
          {
            data: [
              { x: "Personal", y: 321 },
              { x: "Family Land", y: 260 },
              { x: "Joint with Spouse", y: 87 },
              { x: "Comimunal Land", y: 10 },
              { x: "Others", y: 9 }
            ]
          }
        ],
        legend: {
          show: false,
        },
        chart: {
          height: 350,
          type: "treemap"
        },
        title: {
          text: "Distibuted Treemap (different color for each cell)",
          align: "center",
        },
        colors: [
          "#3B93A5",
          "#F7B844",
          "#ADD8C7",
          "#EC3C65",
          "#CDD7B6",
          "#C1F666",
          "#D43F97",
          "#1E5D8C",
          "#421243",
          "#7F94B0",
          "#EF6537",
          "#C0ADDB"
        ],
        plotOptions: {
          treemap: {
            distributed: true,
            enableShades: false
          }
        },
        tooltip: {
          theme: this.isDarkMode ? 'dark' : 'light', // Tooltip theme
        }
    }
    this.horzChartOptions = {
      series: [
        {
          name: "Female",
          data: [70, 5, 5, 18, 0, 2]
        },
        {
          name: "Male",
          data: [79, 10, 6, 1, 1, 3]
        }
      ],
      chart: {
        type: "bar",
        height: 350,
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        floating: false,
        labels: {
          colors: this.isDarkMode ? '#fff' : '#000' // Legend text color
        },
      },
      plotOptions: {
        bar: {
          horizontal: true,
          columnWidth: "55%",
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"]
      },
      xaxis: {
        categories: [
          'No Education', 
          'Basic Level', 
          'JHS', 
          'SHS', 
          'O-level', 
          'Tertiary level'
        ],
        labels: {
          style: {
            colors: this.isDarkMode ? '#fff' : '#000' // X-axis labels color
          }
        }
      },
      yaxis: {
        title: {
          text: "Education Level",
          style: {
            color: this.isDarkMode ? '#fff' : '#000' // Set color based on dark mode
          }
        },
        labels: {
          style: {
            colors: this.isDarkMode ? '#fff' : '#000' // X-axis labels color
          }
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function(val) {
            return "" + val + " Farmers";
          }
        },
  
          theme: this.isDarkMode ? 'dark' : 'light', // Tooltip theme
        
      }
    };
  }
}
