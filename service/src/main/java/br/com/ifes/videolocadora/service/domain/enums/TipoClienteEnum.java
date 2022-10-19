package br.com.ifes.videolocadora.service.domain.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum TipoClienteEnum {

	SOCIO("Sócio"),
	DEPENDENTE("Dependente");

	private final String descricao;


}
