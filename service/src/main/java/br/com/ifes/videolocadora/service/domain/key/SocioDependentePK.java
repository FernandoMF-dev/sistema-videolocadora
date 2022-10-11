package br.com.ifes.videolocadora.service.domain.key;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode()
public class SocioDependentePK implements Serializable {

	@Column(name = "id_socio")
	private Long idSocio;

	@Column(name = "id_dependente")
	private Long idDependente;
}
