package br.com.ifes.videolocadora.service.domain.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import java.io.Serializable;
import java.util.Date;

@Getter
@Setter
@Table(name = "tb_locacao")
@Entity
public class Locacao implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_locacao")
	@SequenceGenerator(name = "seq_locacao", allocationSize = 1, sequenceName = "seq_locacao")
	@Column(name = "id")
	private Long id;

	@Column(name = "data_locacao")
	private Date dataLocacao;

	@Column(name = "data_devolucao_prevista")
	private Date dataDevolucaoPrevista;

	@Column(name = "data_devoluca_efetiva")
	private Date dataDevolucaoEfetiva;

	@Column(name = "valor_cobrado")
	private Double valorCobrado;

	@Column(name = "valor_multa")
	private Double valorMulta;

	@Column(name = "situacao")
	private String situacao;

	@Column(name = "categoria")
	private String categoria;

	@JoinColumn(name = "id_item")
	@ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private Item item;

	@JoinColumn(name = "id_cliente")
	@ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private Cliente cliente;

}
