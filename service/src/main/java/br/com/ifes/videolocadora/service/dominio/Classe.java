package br.com.ifes.videolocadora.service.dominio;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import java.io.Serializable;

@Getter
@Setter
@Table(name ="tb_classe")
@Entity
public class Classe implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_classe")
	@SequenceGenerator(name = "seq_classe", allocationSize = 1, sequenceName = "seq_classe")
	@Column(name = "id")
	private Long id;

	@Column(name = "nome")
	private String nome;

	@Column(name = "valor")
	private Double valor;

	@Column(name = "prazo_devolucao")
	private Integer prazoDevolucao;

	@Column(name = "excluido")
	private Boolean excluido;

}
