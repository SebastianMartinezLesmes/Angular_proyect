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
  }

  listRoutes = [
    { label: 'Home', path: '/home' },
    { label: 'Logout', path: '/login' },
  ];

  // Gestión de jugadores
  lastId = 0;
  listPlayers:any [] = [];

  nuevoPlayer(){
    for (let i = 0; i < 1; i++) {
      this.lastId++;
      const nuevo = {
        idPlayer: this.lastId,
        vida: 200,
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

  async personalizarAtaque() {
    if (!this.lectorJugadores()) return;
    // Seleccionar jugador
    const jugador = await this.seleccionarJugador(
      undefined, // no aplicamos filtro, todos los jugadores son válidos
      p => `Player ${p.idPlayer} (⚔️ ${p.ataque})` // etiqueta personalizada
    );
    if (!jugador) return;

    // Pedir nuevo ataque
    const { value: ataque } = await Swal.fire({
      title: `Configurar ataque para Player ${jugador.idPlayer}`,
      input: 'number',
      inputLabel: 'Nuevo valor de ataque',
      inputValue: jugador.ataque,
      showCancelButton: true
    });

    if (ataque !== undefined) {
      jugador.ataque = +ataque;

      console.log(`⚔️ Player ${jugador.idPlayer} ahora tiene ataque: ${jugador.ataque}`);

      Swal.fire({
        icon: 'success',
        title: 'Ataque actualizado',
        text: `Player ${jugador.idPlayer} ahora tiene ataque ${jugador.ataque}`,
        timer: 2000,
        showConfirmButton: false
      });
    }
  };

  async PersonalizarDefensa() {
    if (!this.lectorJugadores()) return;
    const jugador = await this.seleccionarJugador(
      undefined, // no aplicamos filtro, todos los jugadores son válidos
      p => `Player ${p.idPlayer} (⚔️ ${p.ataque})` // etiqueta personalizada
    );
    if (!jugador) return;
    const { value: nuevaDefensa } = await Swal.fire({
      title: `Configurar defensa para Player ${jugador.idPlayer}`,
      input: 'number',
      inputLabel: 'Nuevo valor de defensa',
      inputValue: jugador.defensa,
      showCancelButton: true
    });
    if (nuevaDefensa !== undefined) {
      jugador.defensa = +nuevaDefensa;
      console.log(`🛡️ Player ${jugador.idPlayer} ahora tiene defensa: ${jugador.defensa}`);
      Swal.fire({
        icon: 'success',
        title: 'Defensa actualizada',
        text: `Player ${jugador.idPlayer} ahora tiene defensa ${jugador.defensa}`,
        timer: 2000,
        showConfirmButton: false
      });
    }
  };
  
  async PersonalizarSalud() {
    if (!this.lectorJugadores()) return;
    const jugador = await this.seleccionarJugador(
      undefined, // no aplicamos filtro, todos los jugadores son válidos
      p => `Player ${p.idPlayer} (⚔️ ${p.ataque})` // etiqueta personalizada
    );
    if (!jugador) return;
    const { value: nuevaVida } = await Swal.fire({
      title: `Configurar salud para Player ${jugador.idPlayer}`,
      input: 'number',
      inputLabel: 'Nuevo valor de salud',
      inputValue: jugador.vida,
      showCancelButton: true
    });
    if (nuevaVida !== undefined) {
      jugador.vida = +nuevaVida;
      console.log(`❤️ Player ${jugador.idPlayer} ahora tiene salud: ${jugador.vida}`);
      Swal.fire({
        icon: 'success',
        title: 'Salud actualizada',
        text: `Player ${jugador.idPlayer} ahora tiene salud ${jugador.vida}`,
        timer: 2000,
        showConfirmButton: false
      });
    }
  };

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
      jugador.vida = Math.min(jugador.vida + 100, 500); // máximo 500 de vida
      console.log(`Player ${id} se curó. Vida actual: ${jugador.vida}`);
    }
  };

  // Opciones de juego
  listaKills: any[] = [];

  registrarKill(atacanteId: number, objetivoId: number) {
    this.listaKills.push({ atacanteId, objetivoId, fecha: new Date() });
  }

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
  }

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
      return false; // 🔴 importante
    }
    return true; // ✅ hay jugadores
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
