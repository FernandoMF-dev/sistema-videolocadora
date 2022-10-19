package br.com.ifes.videolocadora.service.domain.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import java.io.Serializable;
import java.util.List;

@Getter
@Setter
@Table(name = "tb_ator")
@Entity
public class Ator implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_ator")
	@SequenceGenerator(name = "seq_ator", allocationSize = 1, sequenceName = "seq_ator")
	@Column(name = "id")
	private Long id;

	@Column(name = "nome")
	private String nome;

	@Column(name = "excluido")
	private Boolean excluido;

	@ManyToMany(cascade = CascadeType.ALL)
	@JoinTable(name = "rel_titulo_ator",
			joinColumns = {@JoinColumn(name = "id_titulo", referencedColumnName = "id")},
			inverseJoinColumns = {@JoinColumn(name = "id_ator", referencedColumnName = "id")})
	private List<Titulo> titulos;
}
