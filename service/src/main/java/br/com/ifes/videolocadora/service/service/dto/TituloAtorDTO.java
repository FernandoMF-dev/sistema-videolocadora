package br.com.ifes.videolocadora.service.service.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
public class TituloAtorDTO implements Serializable {

	private Long idTitulo;

	private Long idAtor;

}
