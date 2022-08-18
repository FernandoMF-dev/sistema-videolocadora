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
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import java.io.Serializable;
import java.util.List;

@Getter
@Setter
@Table(name ="tb_cliente")
@Entity
public class Cliente implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_cliente")
	@SequenceGenerator(name = "seq_cliente", allocationSize = 1, sequenceName = "seq_cliente")
	@Column(name = "id")
	private Long id;

	@Column(name = "numero_inscricao")
	private Integer numeroInscricao;

	@Column(name = "nome")
	private String nome;

	@Column(name = "cpf")
	private String cpf;

	@Column(name = "endereco")
	private String endereco;

	@Column(name = "telefone")
	private String telefone;

	@Column(name = "tipo_cliente")
	private String tipoCliente;

	@Column(name = "ativo")
	private Boolean ativo;

	@Column(name = "excluido")
	private Boolean excluido;

	@JoinColumn(name = "id_classe")
	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<Classe>  classe;

	@OneToMany(mappedBy = "titulo", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<TituloAtor>  atores;

}
