package br.com.ifes.videolocadora.service.domain.entity;

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
@Table(name = "tb_diretor")
@Entity
public class Diretor implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_diretor")
	@SequenceGenerator(name = "seq_diretor", allocationSize = 1, sequenceName = "seq_diretor")
	@Column(name = "id")
	private Long id;

	@Column(name = "nome")
	private String nome;

	@Column(name = "excluido")
	private Boolean excluido;

}
