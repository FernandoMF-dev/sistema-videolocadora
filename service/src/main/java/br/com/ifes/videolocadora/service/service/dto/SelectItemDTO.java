package br.com.ifes.videolocadora.service.service.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SelectItemDTO implements Serializable {

	private Long value;

	private String label;

}
