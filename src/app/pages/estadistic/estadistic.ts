import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import * as echarts from 'echarts';

@Component({
  selector: 'app-estadistic',
  templateUrl: './estadistic.html',
  styleUrls: ['./estadistic.scss']
})
export class EstadisticComponent implements AfterViewInit {

  constructor(private router: Router) {}

  routerTo(path: string) {
    this.router.navigate([path]);
  }

  listRoutes = [
    { label: 'Home', path: '/home' },
    { label: 'Logout', path: '/login' },
  ];

  player = {
    name: "Kaelion Vortex",
    nivel: 42,
    experiencia: {
      actual: 8500,
      max: 10000,
      porcentaje: `${(8500 / 10000 * 100).toFixed(2)}%`
    },
    atributos: {
      velocidad: 80,
      fuerza: 90,
      inteligencia: 65,
      agilidad: 75,
      resistencia: 85,
    },
    elementos: [
      { elemento: "Luz", f: 15, d: 5 },
      { elemento: "Oscuridad", f: 10, d: 25 },
      { elemento: "Veneno", f: 15, d: 13 },
      { elemento: "Hielo", f: 20, d: 15 },
      { elemento: "Fuego", f: 15, d: 25 },
      { elemento: "Plasma", f: 25, d: 20 }, 
      { elemento: "Electrico", f: 18, d: 22 } 
    ],
    estado: {
      vida: {
        actual: 950,
        max: 1000
      },
      energia: {
        actual: 320,
        max: 400
      },
    },
    equipamiento: {
      arma_d: {
        nombre: "Pistola de Plasma",
        dano: 280,
        rareza: "Rara"
      },
      arma_cc: {
        nombre: "Espada de Plasma",
        dano: 380,
        rareza: "Comun"
      },
      armadura: {
        nombre: "Exotraje Neón",
        defensa: 300,
        rareza: "Muy Rara"
      },
      accesorio: {
        nombre: "Implante Neural de Precisión",
        defensa: 300,
        dano: 10,
        rareza: "Muy Rara"
      }
    }
  };

  equipList = [
    { icon: "🔫", label: `${this.player.equipamiento.arma_d.nombre} (${this.player.equipamiento.arma_d.dano} dmg, ${this.player.equipamiento.arma_d.rareza})` },
    { icon: "🗡️", label: `${this.player.equipamiento.arma_cc.nombre} (${this.player.equipamiento.arma_cc.dano} dmg, ${this.player.equipamiento.arma_cc.rareza})` },
    { icon: "🛡️", label: `${this.player.equipamiento.armadura.nombre} (${this.player.equipamiento.armadura.defensa} def, ${this.player.equipamiento.armadura.rareza})` },
    { icon: "💍", label: `${this.player.equipamiento.accesorio.nombre} (+${this.player.equipamiento.accesorio.dano} dmg, ${this.player.equipamiento.accesorio.defensa} def, ${this.player.equipamiento.accesorio.rareza})` },
  ];

  ngAfterViewInit() {
    this.initBarChart();
    this.initRadarChart();
    this.initDonutChart();
    this.initGaugeChart();
    this.initLineRaceChart();
  }

  private initBarChart() {
    const chartDom = document.getElementById('barChart')!;
    const myChart = echarts.init(chartDom);

    const categories = this.player.elementos.map(e => e.elemento);
    const resistencias = this.player.elementos.map(e => e.f);
    const debilidades = this.player.elementos.map(e => e.d);

    const option: echarts.EChartsOption = {
      title: {
        text: 'Resistencias y Debilidades por Elemento',
        textStyle: {
          color: '#00fff7'
        }
      },
      tooltip: {
        trigger: 'axis',
        backgroundColor: '#1a1a2e',
        borderColor: '#00fff7',
        borderWidth: 1,
        textStyle: { color: '#fff' }
      },
      legend: {
        data: ['Resistencia', 'Debilidad'],
        textStyle: { color: '#fff' }
      },
      xAxis: {
        type: 'category',
        data: categories,
        axisLine: { lineStyle: { color: '#00fff7' } },
        axisLabel: { color: '#e0f7fa' }
      },
      yAxis: {
        type: 'value',
        axisLine: { lineStyle: { color: '#00fff7' } },
        axisLabel: { color: '#e0f7fa' }
      },
      series: [
        {
          name: 'Resistencia',
          data: resistencias,
          type: 'bar',
          itemStyle: { color: '#12cff0ff' }
        },
        {
          name: 'Debilidad',
          data: debilidades,
          type: 'bar',
          itemStyle: { color: '#1e00a3ff' }
        }
      ]
    };

    myChart.setOption(option);
    window.addEventListener('resize', () => myChart.resize());
  };

  private initRadarChart() {
    const chartDom = document.getElementById('radarChart')!;
    const myChart = echarts.init(chartDom);

    const option: echarts.EChartsOption = {
      title: { 
        text: 'Atributos',
        textStyle: {
          color: '#00fff7'
        }
      },
      tooltip: {
        backgroundColor: '#1a1a2e',
        borderColor: '#00fff7',
        borderWidth: 1,
        textStyle: { color: '#fff' }
      },
      radar: {
        indicator: [
          { name: 'Velocidad', max: 100 },
          { name: 'Fuerza', max: 100 },
          { name: 'Agilidad', max: 100 },
          { name: 'Resistencia', max: 100 },
          { name: 'Inteligencia', max: 100 }
        ],
        axisName: {
          color: '#fff',
          fontSize: 12,
          fontWeight: 'bold',
          textShadowColor: '0 0 6px #00fff7'
        },
        splitLine: { lineStyle: { color: 'rgba(0,255,255,0.3)' } },
        splitArea: { areaStyle: { color: ['rgba(0,255,255,0.05)', 'rgba(125,42,232,0.1)'] } },
        axisLine: { lineStyle: { color: 'rgba(0,255,255,0.5)' } }
      },
      series: [
        {
          name: 'Estadísticas',
          type: 'radar',
          data: [
            {
              value: [
                this.player.atributos.velocidad,
                this.player.atributos.fuerza,
                this.player.atributos.agilidad,
                this.player.atributos.resistencia,
                this.player.atributos.inteligencia
              ],
              name: this.player.name,
              areaStyle: { color: 'rgba(0, 188, 212, 0.3)' },
              lineStyle: { color: '#00bcd4' },
              symbol: 'circle',
              symbolSize: 6,
              itemStyle: {
                color: '#00fff7',
                borderColor: '#7d2ae8',
                borderWidth: 2
              }
            }
          ]
        }
      ]
    }
    myChart.setOption(option);
    window.addEventListener('resize', () => myChart.resize());
  };

  private initDonutChart() {
    const chartDom = document.getElementById('donutChart')!;
    const myChart = echarts.init(chartDom);

    // ⚔️ Cálculos de daño
    const danoCC = this.player.equipamiento.arma_cc.dano;
    const danoDist = this.player.equipamiento.arma_d.dano;
    const danoAcc = this.player.equipamiento.accesorio.dano;
    const danoTotal = danoCC + danoDist + danoAcc;

    // 🛡️ Cálculos de defensa
    const defArmadura = this.player.equipamiento.armadura.defensa;
    const defAcc = this.player.equipamiento.accesorio.defensa;
    const defensaTotal = defArmadura + defAcc;

    const option: echarts.EChartsOption = {
      title: { 
        text: 'Daño vs Defensa',
        left: 'center',
        textStyle: { color: '#00fff7' }
      },
      tooltip: {
        trigger: 'item',
        formatter: (params: any) => {
          if (params.name.includes("Daño")) {
            return `
              <b>⚔️ Daño Total: ${danoTotal}</b><br/>
              🗡️ Cuerpo a Cuerpo: ${danoCC}<br/>
              🔫 A Distancia: ${danoDist}<br/>
              💍 Accesorio: ${danoAcc}
            `;
          } else {
            return `
              <b>🛡️ Defensa Total: ${defensaTotal}</b><br/>
              🛡️ Armadura: ${defArmadura}<br/>
              💍 Accesorio: ${defAcc}
            `;
          }
        },
        backgroundColor: '#1a1a2e',
        borderColor: '#00fff7',
        borderWidth: 1,
        textStyle: { color: '#fff' }
      },
      legend: { 
        orient: 'vertical', 
        left: 'left',
        textStyle: { color: '#fff' }
      },
      series: [
        {
          name: 'Equipamiento',
          type: 'pie',
          radius: ['40%', '70%'],
          itemStyle: { 
            borderRadius: 10, 
            borderColor: '#000', 
            borderWidth: 2 
          },
          label: { 
            show: true, 
            formatter: '{b}: {c}', 
            color: '#fff' 
          },
          data: [
            { value: danoTotal, name: 'Daño ⚔️', itemStyle: { color: '#ff3366' } },
            { value: defensaTotal, name: 'Defensa 🛡️', itemStyle: { color: '#33ccff' } }
          ]
        }
      ]
    };

    myChart.setOption(option);
    window.addEventListener('resize', () => myChart.resize());
  };

  private initGaugeChart() {
    const chartDom = document.getElementById('gaugeChart')!;
    const myChart = echarts.init(chartDom);

    const porcentaje = (this.player.experiencia.actual / this.player.experiencia.max) * 100;

    const option: echarts.EChartsOption = {
      title: {
        text: `Nivel ${this.player.nivel}`,
        left: 'center',
        top: '5%',
        textStyle: {
          color: '#00fff7',
          fontSize: 18,
          fontWeight: 'bold',
        }
      },
      tooltip: {
        formatter: (params: any) => {
          return `
            <b>Nivel ${this.player.nivel}</b><br/>
            Progreso: ${params.value}%<br/>
            XP: ${this.player.experiencia.actual} / ${this.player.experiencia.max}
          `;
        },
        backgroundColor: '#1a1a2e',
        borderColor: '#00fff7',
        borderWidth: 1,
        textStyle: { color: '#fff' }
      },
      series: [
        {
          type: 'gauge',
          startAngle: 180,   // semi círculo
          endAngle: 0,
          center: ['50%', '70%'],
          radius: '90%',
          progress: {
            show: true,
            width: 18,
            itemStyle: {
              color: '#00e5ff',
              shadowColor: '#7d2ae8',
              shadowBlur: 10
            }
          },
          axisLine: {
            lineStyle: {
              width: 18,
              color: [[1, '#1a1a2e']] // fondo
            }
          },
          axisTick: { show: false },
          splitLine: { show: false },
          axisLabel: { show: true },
          pointer: {
            show: true,
            icon: 'rect',
            length: '55%',
            width: 6,
            itemStyle: {
              color: '#9c27b0'
            }
          },
          anchor: {
            show: true,
            size: 10,
            itemStyle: {
              color: '#9c27b0'
            }
          },
          detail: {
            valueAnimation: true,
            formatter: `{value}%`,
            color: '#fff',
            fontSize: 22,
            offsetCenter: [0, '40%']
          },
          data: [
            {
              value: + porcentaje.toFixed(2)
            }
          ]
        }
      ]
    };

    myChart.setOption(option);
    window.addEventListener('resize', () => myChart.resize());
  };

  private initLineRaceChart() {
    const chartDom = document.getElementById('lineRaceChart')!;
    const myChart = echarts.init(chartDom);

    const colors = ['#00fff7', '#ff00e6', '#ffcc00', '#33ff77', '#ff3366'];

    const option: echarts.EChartsOption = {
      title: { 
        text: 'Velocidad VS Fatiga',
        textStyle: {
          color: '#00fff79a'
        }
      },
      tooltip: { 
        trigger: 'axis',
        backgroundColor: '#1a1a2e',
        borderColor: '#00fff7',
        borderWidth: 1,
        textStyle: { color: '#fff' }
      },
      legend: {
        top: '90%', 
        left: 'center', 
        textStyle: {
          color: '#fff'
        }
      },
      xAxis: { // eje X futurista
        boundaryGap: false,
        data: Array.from({ length: 10 }, (_, i) => `T${i + 1}`),
        axisLine: { lineStyle: { color: '#00fff7' } }, 
        axisLabel: { color: '#e0f7fa' }
      },
      yAxis: { // eje Y futurista
        type: 'value',
        axisLine: { lineStyle: { color: '#00fff7' } }, 
        axisLabel: { color: '#e0f7fa' },
      },
      series: [
        {
          name: 'velocidad',
          type: 'line',
          smooth: true,
          emphasis: { focus: 'series' },
          data: [10, 15, 20, 25, 30, 35, 40, 45],
          itemStyle: { color: colors[0] },
        },
        {
          name: 'Fatiga',
          type: 'line',
          smooth: true,
          emphasis: { focus: 'series' },
          data: [5, 10, 15, 20, 25, 30, 35, 40],
          itemStyle: { color: colors[4] },
        }
      ],
      animationDuration: 2000,
      animationEasing: 'linear'
    };

    // ✅ Renderiza la configuración inicial
    myChart.setOption(option);

    // ✅ Animación de carrera: actualización periódica de los datos
    let index = 10;
    setInterval(() => {
      index++;
      (option.xAxis as any).data.push(`T${index}`);
      (option.xAxis as any).data.shift();

      (option.series as any).forEach((serie: any) => {
        serie.data.push(Math.round(Math.random() * 50 + 10));
        serie.data.shift();
      });

      myChart.setOption(option);
    }, 1500);

    // ✅ Ajuste automático al redimensionar ventana
    window.addEventListener('resize', () => myChart.resize());
  };

}
