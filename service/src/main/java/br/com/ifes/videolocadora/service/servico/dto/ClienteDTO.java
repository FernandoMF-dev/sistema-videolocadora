package br.com.ifes.videolocadora.service.servico.dto;

import br.com.ifes.videolocadora.service.dominio.Classe;
import br.com.ifes.videolocadora.service.dominio.TituloAtor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

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
