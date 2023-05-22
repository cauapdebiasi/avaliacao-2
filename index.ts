class Veiculo {
  constructor(private placa: string, private velocidade: number) {}

  getPlaca(): string {
    return this.placa;
  }

  getVelocidade(): number {
    return this.velocidade;
  }
}

class Radar {
  static readonly LIMITE_VELOCIDADE_CARRO_MOTO = 100;
  static readonly LIMITE_VELOCIDADE_CAMINHAO = 100;
  static readonly TOLERANCIA_INFRACAO = 0.05;
  static infracoes: { placa: string; velocidade: number }[] = [];

  static verificarVelocidade(veiculo: Veiculo): void {
    let limiteVelocidade: number;
    if (veiculo instanceof Carro || veiculo instanceof Moto) {
      limiteVelocidade = Radar.LIMITE_VELOCIDADE_CARRO_MOTO;
    } else if (veiculo instanceof Caminhao) {
      limiteVelocidade = Radar.LIMITE_VELOCIDADE_CAMINHAO;
    } else {
      throw new Error('Tipo de veículo inválido.');
    }

    const velocidadeMaxima = limiteVelocidade * (1 + Radar.TOLERANCIA_INFRACAO);
    if (veiculo.getVelocidade() > velocidadeMaxima) {
      this.notificarInfracao(veiculo);
    }
  }

  private static notificarInfracao(veiculo: Veiculo): void {
    const infracao = {
      placa: veiculo.getPlaca(),
      velocidade: veiculo.getVelocidade(),
    };
    this.infracoes.push(infracao);
    console.log(
      `Infração registrada - Placa: ${infracao.placa}, Velocidade: ${infracao.velocidade}`
    );
  }

  static mostrarInfracoes(): void {
    console.log('Infrações registradas:');
    for (const infracao of this.infracoes) {
      console.log(
        `Placa: ${infracao.placa}, Velocidade: ${infracao.velocidade}`
      );
    }
  }
}

class Carro extends Veiculo {
  constructor(placa: string, velocidade: number) {
    super(placa, velocidade);
  }
}

class Caminhao extends Veiculo {
  constructor(placa: string, velocidade: number) {
    super(placa, velocidade);
  }
}

class Moto extends Veiculo {
  constructor(placa: string, velocidade: number) {
    super(placa, velocidade);
  }
}

// Teste do sistema
const carro = new Carro('ABC123', 105);
const caminhao = new Caminhao('XYZ456', 100);
const moto = new Moto('DEF789', 106);

Radar.verificarVelocidade(carro); // Irá notificar a infração e registrar
Radar.verificarVelocidade(caminhao); // Não irá notificar a infração
Radar.verificarVelocidade(moto); // Não Irá notificar a infração e registrar

Radar.mostrarInfracoes(); // Mostra as infrações registradas
/* 
Infrações registradas:
Placa: DEF789, Velocidade: 106
*/
