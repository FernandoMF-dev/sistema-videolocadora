package br.com.ifes.videolocadora.service.servico.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
public class ClienteDTO implements Serializable {

	private Long id;

	private Integer numeroInscricao;

	private String nome;

	private String cpf;

	private String endereco;

	private String telefone;

	private String tipoCliente;

	private Boolean ativo;

	private Boolean excluido;

}
