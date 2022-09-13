package br.com.ifes.videolocadora.service.dominio;

import br.com.ifes.videolocadora.service.dominio.key.TituloAtorPK;
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
@IdClass(TituloAtorPK.class)
@Entity
public class TituloAtor implements Serializable {

	@Id
	@Column(name = "id_titulo")
	private Long idTitulo;

	@Id
	@Column(name = "id_ator")
	private Long idAtor;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "id_titulo", referencedColumnName = "id", insertable = false, updatable = false)
	private Titulo titulo;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "id_ator", referencedColumnName = "id", insertable = false, updatable = false)
	private Ator ator;

}
