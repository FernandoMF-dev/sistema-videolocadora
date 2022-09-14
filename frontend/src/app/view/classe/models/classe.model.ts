export class Classe {
	id: number;
	nome: string;
	valor: number;
	prazoDevolucao: number;
	constructor(nome: string, valor: number, prazoDevolucao: number) {
		this.nome = nome;
		this.valor = valor;
		this.prazoDevolucao = prazoDevolucao;
	}
}
