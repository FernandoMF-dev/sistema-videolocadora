package br.com.ifes.videolocadora.service.servico.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
public class ClasseDTO implements Serializable {

	private Long id;

	private String nome;

	private Double valor;

	private Integer prazoDevolucao;

	private Boolean excluido;


}
