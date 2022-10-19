package br.com.ifes.videolocadora.service.service.dto;

import br.com.ifes.videolocadora.service.domain.enums.CategoriaEnum;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
public class TituloListDTO implements Serializable {

	private Long id;

	private String nome;

	private String sinopse;

	private Integer ano;

	private CategoriaEnum categoria;

	private ClasseDTO classe;

	private String atoresNomes = "";

	private String diretor;

	public TituloListDTO(Long id, String nome, String sinopse, Integer ano, CategoriaEnum categoria,
						 Long idClasse, String nomeClasse, Double valorClasse, Integer prazoDevolucaoClasse, String diretor) {
		this.id = id;
		this.nome = nome;
		this.sinopse = sinopse;
		this.ano = ano;
		this.categoria = categoria;
		this.classe = new ClasseDTO(idClasse, nomeClasse, valorClasse, prazoDevolucaoClasse);
		this.diretor = diretor;
	}

}
