package br.com.ifes.videolocadora.service.dominio;

import br.com.ifes.videolocadora.service.dominio.key.SocioDependentePK;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.io.Serializable;

@Getter
@Setter
@Table(name ="rel_titulo_ator")
@IdClass(SocioDependentePK.class)
@Entity
public class SocioDependente implements Serializable {

	@Id
	@Column(name = "id_socio")
	private Long idSocio;

	@Id
	@Column(name = "id_dependente")
	private Long idDependente;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "id_socio", referencedColumnName = "id", insertable = false, updatable = false)
	private Cliente socio;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "id_dependente", referencedColumnName = "id", insertable = false, updatable = false)
	private Cliente dependente;

}
