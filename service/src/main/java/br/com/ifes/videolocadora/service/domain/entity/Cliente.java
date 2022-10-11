package br.com.ifes.videolocadora.service.domain.entity;

import br.com.ifes.videolocadora.service.domain.enums.TipoClienteEnum;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import java.io.Serializable;

@Getter
@Setter
@Table(name = "tb_cliente")
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

	@Enumerated(EnumType.STRING)
	@Column(name = "tipo_cliente")
	private TipoClienteEnum tipoCliente;

	@Column(name = "ativo")
	private Boolean ativo;

	@Column(name = "excluido")
	private Boolean excluido;

}
