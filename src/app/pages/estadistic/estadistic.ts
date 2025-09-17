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

  listOfThings = [
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
        daño: 280,
        rareza: "Rara"
      },
      arma_cc: {
        nombre: "Espada de Plasma",
        daño: 380,
        rareza: "Comun"
      },
      armadura: {
        nombre: "Exotraje Neón",
        defensa: 135,
        rareza: "Muy Rara"
      },
      accesorio: {
        nombre: "Implante Neural de Precisión",
        bonus: "+10% crítico"
      }
    }
  };

  equipList = [
    { icon: "🔫", label: `${this.player.equipamiento.arma_d.nombre} (${this.player.equipamiento.arma_d.daño} dmg, ${this.player.equipamiento.arma_d.rareza})` },
    { icon: "🗡️", label: `${this.player.equipamiento.arma_cc.nombre} (${this.player.equipamiento.arma_cc.daño} dmg, ${this.player.equipamiento.arma_cc.rareza})` },
    { icon: "🛡️", label: `${this.player.equipamiento.armadura.nombre} (${this.player.equipamiento.armadura.defensa} def, ${this.player.equipamiento.armadura.rareza})` },
    { icon: "💍", label: `${this.player.equipamiento.accesorio.nombre} (${this.player.equipamiento.accesorio.bonus})` },
  ];

  ngAfterViewInit() {
    this.initBarChart();
    this.initRadarChart();
    this.initDonutChart();
    this.initLineRaceChart();
  }

  private initBarChart() {
    const chartDom = document.getElementById('barChart')!;
    const myChart = echarts.init(chartDom);

    // Extraemos nombres de elementos
    const categories = this.player.elementos.map(e => e.elemento);

    // Resistencia (f)
    const resistencias = this.player.elementos.map(e => e.f);

    // Debilidad (d)
    const debilidades = this.player.elementos.map(e => e.d);

    const option: echarts.EChartsOption = {
      title: {
        text: 'Resistencias y Debilidades por Elemento',
        textStyle: {
          color: '#00fff7'
        }
      },
      tooltip: {
        trigger: 'axis'
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
  }

  private initRadarChart() {
    const chartDom = document.getElementById('radarChart')!;
    const myChart = echarts.init(chartDom);
    const option = {
      title: { text: 'Gráfico Telaraña' },
      tooltip: {},
      radar: {
        indicator: [
          { name: 'Velocidad', max: 100 },
          { name: 'Fuerza', max: 100 },
          { name: 'Agilidad', max: 100 },
          { name: 'Resistencia', max: 100 },
          { name: 'Inteligencia', max: 100 }
        ]
      },
      series: [
        {
          name: 'Estadísticas',
          type: 'radar',
          data: [
            {
              value: [80, 90, 70, 85, 60],
              name: 'Jugador 1',
              areaStyle: { color: 'rgba(0, 188, 212, 0.3)' },
              lineStyle: { color: '#00bcd4' }
            }
          ]
        }
      ]
    };
    myChart.setOption(option);
  }

  private initDonutChart() {
    const chartDom = document.getElementById('donutChart')!;
    const myChart = echarts.init(chartDom);
    const option = {
      title: { text: 'Gráfico de Dona', left: 'center' },
      tooltip: { trigger: 'item' },
      legend: { orient: 'vertical', left: 'left' },
      series: [
        {
          name: 'Acceso',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: { show: false, position: 'center' },
          emphasis: {
            label: { show: true, fontSize: 18, fontWeight: 'bold' }
          },
          labelLine: { show: false },
          data: [
            { value: 40, name: 'Chrome' },
            { value: 25, name: 'Firefox' },
            { value: 20, name: 'Edge' },
            { value: 15, name: 'Safari' }
          ]
        }
      ]
    };
    myChart.setOption(option);
  }

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
      tooltip: { trigger: 'axis' },
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
