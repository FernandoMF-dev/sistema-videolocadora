package br.com.ifes.videolocadora.service.service.dto;

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
public class ConcluirLocacaoDTO implements Serializable {

	private Long id;

	private Date dataDevolucao;

	private Double valorCobrado;

	private Double valorMulta;

}
