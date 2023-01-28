package br.com.ifes.videolocadora.service.service.dto;

import br.com.ifes.videolocadora.service.domain.enums.CategoriaEnum;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class TituloListFilterDTO implements Serializable {
	private String nome = "";
	private Integer ano;
	private CategoriaEnum categoria;
	private String classe = "";
	private String diretor = "";
	private String ator = "";
}
