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

	private String atores;

}
