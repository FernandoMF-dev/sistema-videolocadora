package br.com.ifes.videolocadora.service.repository;

import lombok.experimental.UtilityClass;

@UtilityClass
public class QueryUtil {
	public static final String TITULO_ITEM_CONCAT = " CONCAT(i.numeroSerie, ' - ', t.nome) ";
}
