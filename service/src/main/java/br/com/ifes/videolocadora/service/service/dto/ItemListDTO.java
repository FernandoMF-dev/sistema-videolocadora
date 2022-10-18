package br.com.ifes.videolocadora.service.service.dto;

import br.com.ifes.videolocadora.service.domain.enums.CategoriaEnum;
import br.com.ifes.videolocadora.service.domain.enums.TipoItemEnum;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ItemListDTO implements Serializable {

	private Long id;

	private Integer numeroSerie;

	private String nomeTitulo;

	private Date dataAquisicao;

	private TipoItemEnum tipoItem;

	private CategoriaEnum categoria;

	private String nomeClasse;

	private Double valor;

	private Integer prazoDevolucao;

	private String sinopse;

	private Long idTitulo;

}
