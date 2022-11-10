package br.com.ifes.videolocadora.service.service.dto;

import br.com.ifes.videolocadora.service.domain.enums.TipoClienteEnum;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TreeNodeDTO implements Serializable {

	private ClienteDTO data;

	private List<TreeNodeDTO> children;

	private TreeNodeDTO parent;

	private Boolean leaf = false;

	private Boolean selectable = true;

	private Boolean expended = false;

	public TreeNodeDTO(Long id, Integer numeroInscricao, String nome, String cpf,
					   String endereco, String telefone, TipoClienteEnum tipoCliente, Boolean ativo) {
		this(id, null, numeroInscricao, nome, cpf, endereco, telefone, tipoCliente, ativo);
	}

	public TreeNodeDTO(Long id, Long idResponsavel, Integer numeroInscricao, String nome, String cpf,
					   String endereco, String telefone, TipoClienteEnum tipoCliente, Boolean ativo) {
		this.data = new ClienteDTO(id, idResponsavel, numeroInscricao, nome, cpf, endereco, telefone, tipoCliente, ativo);
		children = new ArrayList<>();
		leaf = TipoClienteEnum.DEPENDENTE.equals(tipoCliente);
	}

}
