import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-game',
  templateUrl: './game.html',
  styleUrls: ['./game.scss'],
  imports: [],
})
export class GameComponent {

  constructor(private router: Router) {}

  routerTo(path: string) {
    this.router.navigate([path]);
  };

  listRoutes = [
    { label: 'Home', path: '/home' },
    { label: 'Logout', path: '/login' },
  ];

  menus = {
    juego: false,
    jugadores: false,
    personalizar: false,
  };

  toggleMenu(menu: keyof typeof this.menus) {
    this.menus[menu] = !this.menus[menu];
  };

// Gestión de jugadores
  lastId = 0;
  listPlayers:any [] = [];

  nuevoPlayer(){
    for (let i = 0; i < 1; i++) {
      this.lastId++;
      const nuevo = {
        idPlayer: this.lastId,
        vida: 200,
        vidaMax: 200,
        ataque: 100,
        defensa: 100,
      };
      this.listPlayers.push(nuevo);
    }
    console.log(this.listPlayers);
  };

  eliminarJugadores(){
    if (!this.lectorJugadores()) return;
    this.lastId = 0
    this.listPlayers = []
  };

  async eliminarJugador() {
    if (!this.lectorJugadores()) return;
    const { value: idSeleccionado } = await Swal.fire({
      title: 'Selecciona un jugador a eliminar',
      input: 'select',
      inputOptions: this.listPlayers.reduce((opts: any, p) => {
        opts[p.idPlayer] = `Player ${p.idPlayer} (❤️ ${p.vida}, ⚔️ ${p.ataque}, 🛡️ ${p.defensa})`;
        return opts;
      }, {}),
      inputPlaceholder: 'Elige un jugador',
      showCancelButton: true
    });
    if (!idSeleccionado) return;
    const jugador = this.listPlayers.find(p => p.idPlayer === +idSeleccionado);
    if (!jugador) return;
    const confirmacion = await Swal.fire({
      title: `¿Eliminar al Player ${jugador.idPlayer}?`,
      text: `Vida: ${jugador.vida}, Ataque: ${jugador.ataque}, Defensa: ${jugador.defensa}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });
    if (confirmacion.isConfirmed) {
      this.listPlayers = this.listPlayers.filter(p => p.idPlayer !== jugador.idPlayer);
      console.log(`Player ${jugador.idPlayer} eliminado`);
      Swal.fire('Eliminado', `El Player ${jugador.idPlayer} fue eliminado.`, 'success');
    }
  }; 

  async personalizarAtributo() {
    if (!this.lectorJugadores()) return;

    // 🔹 Configuración de los atributos disponibles
    const atributos = {
      vida: { icono: '❤️', label: 'salud' },
      vidaMax: { icono: '💖', label: 'vida máxima' },
      ataque: { icono: '⚔️', label: 'ataque' },
      defensa: { icono: '🛡️', label: 'defensa' },
    };

    // 🔹 Paso 1: seleccionar qué atributo modificar
    const { value: tipo } = await Swal.fire({
      title: 'Selecciona un atributo a personalizar',
      input: 'select',
      inputOptions: {
        vida: '❤️ Salud actual',
        vidaMax: '💖 Salud máxima',
        ataque: '⚔️ Ataque',
        defensa: '🛡️ Defensa',
      },
      inputPlaceholder: 'Elige un atributo...',
      showCancelButton: true,
    });

    if (!tipo) return;

    const config = atributos[tipo as keyof typeof atributos];

    // 🔹 Paso 2: seleccionar jugador
    const jugador = await this.seleccionarJugador(
      undefined,
      p => `Player ${p.idPlayer} (${config.icono} ${p[tipo]})`
    );

    if (!jugador) return;

    // 🔹 Paso 3: pedir nuevo valor
    const { value: nuevoValor } = await Swal.fire({
      title: `Configurar ${config.label} para Player ${jugador.idPlayer}`,
      input: 'number',
      inputLabel: `Nuevo valor de ${config.label}`,
      inputValue: jugador[tipo],
      showCancelButton: true,
      inputAttributes: { min: '0', step: '1' },
    });

    // 🔹 Paso 4: actualizar y mostrar resultado
    if (nuevoValor !== undefined) {
      jugador[tipo] = +nuevoValor;
      console.log(`${config.icono} Player ${jugador.idPlayer} ahora tiene ${config.label}: ${jugador[tipo]}`);
      Swal.fire({
        icon: 'success',
        title: `${config.label.charAt(0).toUpperCase() + config.label.slice(1)} actualizada`,
        text: `Player ${jugador.idPlayer} ahora tiene ${config.label} ${jugador[tipo]}`,
        timer: 2000,
        showConfirmButton: false,
      });
    }
  }


// Acciones del jugador
  async atacar(atacanteId: number) {
    const atacante = this.listPlayers.find(p => p.idPlayer === +atacanteId);
    if (!atacante) return;
    const { value: objetivoId } = await Swal.fire({
      title: `Selecciona a quién atacará Player ${atacante.idPlayer}`,
      input: 'select',
      inputOptions: this.listPlayers.reduce((opts: any, p) => {
        if (p.idPlayer !== atacante.idPlayer && p.vida > 0) {
          opts[p.idPlayer] = `Player ${p.idPlayer} (❤️ ${p.vida}, 🛡️ ${p.defensa})`;
        }
        return opts;
      }, {}),
      inputPlaceholder: 'Elige un jugador objetivo',
      showCancelButton: true
    });
    if (!objetivoId) return;
    const objetivo = this.listPlayers.find(p => p.idPlayer === +objetivoId);
    if (!objetivo) return;
    const dano = Math.max(atacante.ataque - objetivo.defensa, 0);
    objetivo.vida -= dano;
    if (objetivo.vida < 0) objetivo.vida = 0;
    console.log(`⚔️ Player ${atacante.idPlayer} atacó a Player ${objetivo.idPlayer}. Daño: ${dano}. Vida restante: ${objetivo.vida}`);
    await Swal.fire({
      icon: 'success',
      title: 'Ataque realizado',
      html: `
        ⚔️ Player ${atacante.idPlayer} hizo <b>${dano}</b> de daño a Player ${objetivo.idPlayer}.<br>
        ❤️ Vida restante del objetivo: ${objetivo.vida}
      `,
      timer: 2500,
      showConfirmButton: false
    });
    if (objetivo.vida <= 0) {
      this.morir(atacante.idPlayer, objetivo.idPlayer);
    }
  };

  morir(atacanteId: number, objetivoId: number) {
    this.listPlayers = this.listPlayers.filter(p => p.idPlayer !== objetivoId);

    Swal.fire({
      title: `Player ${objetivoId} ha muerto`,
      text: `Player ${objetivoId} fue eliminado de la partida`,
      iconHtml: '💀',
    });

    this.registrarKill(atacanteId, objetivoId); // ✅ ahora funciona
  };

  curar(id: number) {
    const jugador = this.listPlayers.find(p => p.idPlayer === id);
    if (jugador) {
      jugador.vida = Math.min(jugador.vida + 100, jugador.vidaMax); // máximo de vida del jugador
      console.log(`Player ${id} se curó. Vida actual: ${jugador.vida}`);
    }
  };

// Opciones de juego
  listaKills: any[] = [];

  registrarKill(atacanteId: number, objetivoId: number) {
    this.listaKills.push({ atacanteId, objetivoId, fecha: new Date() });
  };

  Ranking() {
    const conteoKills: Record<number, number> = {}; // Contar kills por jugador
    this.listaKills.forEach(kill => {
      conteoKills[kill.atacanteId] = (conteoKills[kill.atacanteId] || 0) + 1;
    });

    // Ordenar jugadores por kills
    const ranking = [...this.listPlayers, ...this.listaKills
      .map(k => ({ idPlayer: k.atacanteId }))
      .filter(p => !this.listPlayers.find(lp => lp.idPlayer === p.idPlayer)) // agregar atacantes que ya murieron
    ]
      .filter((p, index, self) => 
        index === self.findIndex(j => j.idPlayer === p.idPlayer) // eliminar duplicados
      )
      .map(p => ({
        idPlayer: p.idPlayer,
        kills: conteoKills[p.idPlayer] || 0
      }))
      .sort((a, b) => b.kills - a.kills);

    // Mostrar con Swal
    const rankingHtml = ranking.map((r, i) => 
      `#${i+1} 🏆 Player ${r.idPlayer} — ${r.kills} kill(s)`
    ).join("<br>");

    Swal.fire({
      title: "Ranking de Kills",
      html: rankingHtml || "Nadie ha hecho kills todavía",
      icon: "info"
    });

    return ranking;
  };

  async Historialkills() {
    // 1️⃣ Armar lista de jugadores vivos y muertos (atacantes/objetivos en listaKills + vivos en listPlayers)
    const todosLosJugadores = [
      ...this.listPlayers.map(p => ({ idPlayer: p.idPlayer, ataque: p.ataque, vida: p.vida })),
      ...this.listaKills.flatMap(k => [
        { idPlayer: k.atacanteId },
        { idPlayer: k.objetivoId }
      ])
    ]
      .filter((p, i, arr) => i === arr.findIndex(j => j.idPlayer === p.idPlayer)); // eliminar duplicados

    if (todosLosJugadores.length === 0) {
      Swal.fire({
        icon: "info",
        title: "No hay historial",
        text: "Todavía no hay jugadores ni registros de kills."
      });
      return;
    }
    // 2️⃣ Seleccionar jugador (vivo o muerto)
    const { value: idSeleccionado } = await Swal.fire({
      title: "Selecciona un jugador",
      input: "select",
      inputOptions: todosLosJugadores.reduce((opts: any, p) => {
        const vivo = this.listPlayers.find(lp => lp.idPlayer === p.idPlayer);
        opts[p.idPlayer] = vivo
          ? `Player ${p.idPlayer} (⚔️ ${vivo.ataque}, ❤️ ${vivo.vida})`
          : `Player ${p.idPlayer} (☠️ muerto)`;
        return opts;
      }, {}),
      inputPlaceholder: "Elige un jugador",
      showCancelButton: true
    });
    if (!idSeleccionado) return;
    // 3️⃣ Buscar historial de kills
    const kills = this.listaKills.filter(k => k.atacanteId === +idSeleccionado);
    if (kills.length === 0) {
      Swal.fire({
        title: `Historial de Player ${idSeleccionado}`,
        text: "Este jugador no ha matado a nadie todavía",
        icon: "info"
      });
      return;
    }
    const historialHtml = kills.map(k =>
      `⚔️ Mató a Player ${k.objetivoId} (${k.fecha.toLocaleTimeString()})`
    ).join("<br>");
    // 4️⃣ Mostrar historial
    Swal.fire({
      title: `Historial de Kills - Player ${idSeleccionado}`,
      html: historialHtml,
      icon: "success"
    });
  };

// Factorizar
  lectorJugadores(): boolean {
    if (this.listPlayers.length === 0) {
      Swal.fire({
        icon: 'info',
        title: 'No hay jugadores',
        text: 'Agrega jugadores antes de personalizar salud.',
      });
      return false; 
    }
    return true; 
  };

  async seleccionarJugador(filtro?: (p: any) => boolean, label?: (p: any) => string) {
    if (!this.lectorJugadores()) return;
    const { value: idSeleccionado } = await Swal.fire({
      title: 'Selecciona un jugador',
      input: 'select',
      inputOptions: this.listPlayers.reduce((opts: any, p) => {
        if (!filtro || filtro(p)) {
          opts[p.idPlayer] = label ? label(p) : `Player ${p.idPlayer}`;
        }
        return opts;
      }, {}),
      inputPlaceholder: 'Elige un jugador',
      showCancelButton: true
    });
    return this.listPlayers.find(p => p.idPlayer === +idSeleccionado);
  };

}
