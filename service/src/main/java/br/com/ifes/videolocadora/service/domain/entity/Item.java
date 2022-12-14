package br.com.ifes.videolocadora.service.domain.entity;

import br.com.ifes.videolocadora.service.domain.enums.TipoItemEnum;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
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
@Table(name = "tb_item")
@Entity
public class Item implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_item")
	@SequenceGenerator(name = "seq_item", allocationSize = 1, sequenceName = "seq_item")
	@Column(name = "id")
	private Long id;

	@Column(name = "numero_serie")
	private Integer numeroSerie;

	@Column(name = "data_aquisicao")
	private Date dataAquisicao;

	@Enumerated(EnumType.STRING)
	@Column(name = "tipo_item")
	private TipoItemEnum tipoItem;

	@Column(name = "excluido")
	private Boolean excluido;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "id_titulo")
	private Titulo titulo;

}
