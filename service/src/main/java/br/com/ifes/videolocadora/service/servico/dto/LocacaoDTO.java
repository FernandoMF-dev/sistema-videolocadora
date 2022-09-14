package br.com.ifes.videolocadora.service.servico.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
public class LocacaoDTO implements Serializable {

	private Long id;

	private Date dataLocacao;

	private Date dataDevolucaoPrevista;

	private Date dataDevolucaoEfetiva;

	private Double valorCobrado;

	private Double valorMulta;

	private String situacao;

	private String categoria;

	private Long idItem;

	private Long idCliente;

}
