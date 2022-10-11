package br.com.ifes.videolocadora.service.domain.key;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode()
public class TituloAtorPK implements Serializable {

	@Column(name = "id_titulo")
	private Long idTitulo;

	@Column(name = "id_ator")
	private Long idAtor;
}
