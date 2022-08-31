package br.com.ifes.videolocadora.service.servico.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
public class DiretorDTO implements Serializable {

	private Long id;

	private String nome;

	private Boolean excluido;

}
