package br.com.ifes.videolocadora.service.service.dto;

import br.com.ifes.videolocadora.service.domain.enums.CategoriaEnum;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class TituloDTO implements Serializable {

	private Long id;

	private String nome = "";

	private String sinopse = "";

	private Integer ano;

	private CategoriaEnum categoria;

	private ClasseDTO classe;

	private List<AtorDTO> atores;

	private DiretorDTO diretor;

	public TituloDTO(Long id, String nome, Integer ano, CategoriaEnum categoria,
					 Long idClasse, String nomeClasse, Double valorClasse, Integer prazoDevolucaoClasse) {
		this.id = id;
		this.nome = nome;
		this.ano = ano;
		this.categoria = categoria;
		this.classe = new ClasseDTO(idClasse, nomeClasse, valorClasse, prazoDevolucaoClasse);
	}
}
