package br.com.ifes.videolocadora.service.service.dto;

import br.com.ifes.videolocadora.service.domain.enums.TipoItemEnum;
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

	private TipoItemEnum tipoItem;

	private Boolean excluido;

	private Long idTitulo;

}
