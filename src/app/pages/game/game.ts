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
    this.lectorJugadores()
    this.lastId = 0
    this.listPlayers = []
  };

  async eliminarJugador() {
    this.lectorJugadores()
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
    this.lectorJugadores()
    const { value: idSeleccionado } = await Swal.fire({
      title: 'Selecciona un jugador',
      input: 'select',
      inputOptions: this.listPlayers.reduce((opts: any, p) => {
        opts[p.idPlayer] = `Player ${p.idPlayer} (⚔️ ${p.ataque})`;
        return opts;
      }, {}),
      inputPlaceholder: 'Elige un jugador',
      showCancelButton: true
    });
    if (!idSeleccionado) return;
    const jugador = this.listPlayers.find(p => p.idPlayer === +idSeleccionado);
    if (!jugador) return;
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
    this.lectorJugadores()
    const { value: idSeleccionado } = await Swal.fire({
      title: 'Selecciona un jugador',
      input: 'select',
      inputOptions: this.listPlayers.reduce((opts: any, p) => {
        opts[p.idPlayer] = `Player ${p.idPlayer} (🛡️ ${p.defensa})`;
        return opts;
      }, {}),
      inputPlaceholder: 'Elige un jugador',
      showCancelButton: true
    });
    if (!idSeleccionado) return;
    const jugador = this.listPlayers.find(p => p.idPlayer === +idSeleccionado);
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
    this.lectorJugadores()
    const { value: idSeleccionado } = await Swal.fire({
      title: 'Selecciona un jugador',
      input: 'select',
      inputOptions: this.listPlayers.reduce((opts: any, p) => {
        opts[p.idPlayer] = `Player ${p.idPlayer} (❤️ ${p.vida})`;
        return opts;
      }, {}),
      inputPlaceholder: 'Elige un jugador',
      showCancelButton: true
    });
    if (!idSeleccionado) return;
    const jugador = this.listPlayers.find(p => p.idPlayer === +idSeleccionado);
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
    return this.listPlayers.sort((a, b) => b.vida - a.vida);
  }

  Historialkills(){}

  // Factorizar
  lectorJugadores(){
    if (this.listPlayers.length === 0) {
      Swal.fire({
        icon: 'info',
        title: 'No hay jugadores',
        text: 'Agrega jugadores antes de personalizar salud.',
      });
      return;
    }
  };
  
}
