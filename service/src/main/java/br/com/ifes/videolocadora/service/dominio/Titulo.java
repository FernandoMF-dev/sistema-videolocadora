package br.com.ifes.videolocadora.service.dominio;

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
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import java.io.Serializable;
import java.util.List;

@Getter
@Setter
@Table(name ="tb_titulo")
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

	@Column(name = "categoria")
	private String categoria;

	@Column(name = "excluido")
	private Boolean excluido;

	@JoinColumn(name = "id_classe")
	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<Classe>  classes;

	@OneToMany(mappedBy = "titulo", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<TituloAtor>  atores;

}
