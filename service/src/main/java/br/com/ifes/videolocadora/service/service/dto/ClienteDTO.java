package br.com.ifes.videolocadora.service.service.dto;

import br.com.ifes.videolocadora.service.domain.enums.TipoClienteEnum;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ClienteDTO implements Serializable {

	private Long id;

	private Long idResponsavel;

	private Integer numeroInscricao;

	private String nome = "";

	private String cpf = "";

	private String endereco = "";

	private String telefone = "";

	private TipoClienteEnum tipoCliente;

	private Boolean ativo;

}
