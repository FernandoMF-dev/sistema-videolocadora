package br.com.ifes.videolocadora.service.servico.dto;

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

	private String nome;

	private String sinopse;

	private Integer ano;

	private String categoria;

	private Boolean excluido;

	private List<ClasseDTO> classes;

	private List<TituloAtorDTO> atores;

}
