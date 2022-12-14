package br.com.ifes.videolocadora.service.domain.entity;

import br.com.ifes.videolocadora.service.domain.enums.CategoriaEnum;
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
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import java.io.Serializable;
import java.util.List;

@Getter
@Setter
@Table(name = "tb_titulo")
@Entity
public class Titulo implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_titulo")
	@SequenceGenerator(name = "seq_titulo", allocationSize = 1, sequenceName = "seq_titulo")
	@Column(name = "id")
	private Long id;

	@Column(name = "nome")
	private String nome;

	@Column(name = "sinopse")
	private String sinopse;

	@Column(name = "ano")
	private Integer ano;

	@Enumerated(EnumType.STRING)
	@Column(name = "categoria")
	private CategoriaEnum categoria;

	@Column(name = "excluido")
	private Boolean excluido;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "id_classe")
	private Classe classe;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "id_diretor")
	private Diretor diretor;

	@ManyToMany
	@JoinTable(name = "rel_titulo_ator",
			joinColumns = {@JoinColumn(name = "id_titulo", referencedColumnName = "id")},
			inverseJoinColumns = {@JoinColumn(name = "id_ator", referencedColumnName = "id")})
	private List<Ator> atores;

}
