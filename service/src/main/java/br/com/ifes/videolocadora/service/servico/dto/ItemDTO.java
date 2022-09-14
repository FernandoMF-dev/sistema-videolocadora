package br.com.ifes.videolocadora.service.servico.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
public class ItemDTO implements Serializable {

	private Long id;

	private Integer numeroSerie;

	private Date dataAquisicao;

	private String tipoItem;

	private Boolean excluido;

	private Long idTitulo;

}
