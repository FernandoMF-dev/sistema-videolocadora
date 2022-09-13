package br.com.ifes.videolocadora.service.servico.dto;

import br.com.ifes.videolocadora.service.dominio.Cliente;
import br.com.ifes.videolocadora.service.dominio.Item;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

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
