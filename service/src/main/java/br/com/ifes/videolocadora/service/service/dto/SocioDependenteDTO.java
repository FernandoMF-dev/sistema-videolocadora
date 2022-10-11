package br.com.ifes.videolocadora.service.service.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
public class SocioDependenteDTO implements Serializable {

	private Long idSocio;

	private Long idDependente;

}
