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

@Getter
@Setter
@Table(name = "tb_login")
@Entity
public class Login {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_login")
	@SequenceGenerator(name = "seq_login", allocationSize = 1, sequenceName = "seq_login")
	@Column(name = "id")
	private Long id;

	@Column(name = "username", nullable = false)
	private String username;

	@Column(name = "password", nullable = false)
	private String password;

}
