package br.com.ifes.videolocadora.service.service.dto;

import br.com.ifes.videolocadora.service.domain.enums.CategoriaEnum;
import br.com.ifes.videolocadora.service.domain.enums.SituacaoLocacaoEnum;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LocacaoDTO implements Serializable {

	private Long id;

	private Date dataLocacao;

	private Date dataDevolucaoPrevista;

	private Date dataDevolucaoEfetiva;

	private Double valorCobrado;

	private Double valorMulta;

	private SituacaoLocacaoEnum situacao;

	private CategoriaEnum categoria;

	private Long idItem;

	private Long idCliente;

}
