package br.com.ifes.videolocadora.service.service.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AtorDTO implements Serializable {

	private Long id;

	private String nome;

	private Boolean excluido;

}
