package br.com.ifes.videolocadora.service.service.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class LoginDTO {
	private Long id;
	@NotBlank
	private String username;
	@NotBlank
	private String password;
}
