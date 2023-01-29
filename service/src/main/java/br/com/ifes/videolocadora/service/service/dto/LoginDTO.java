package br.com.ifes.videolocadora.service.service.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginDTO {
	private Long id;
	private String username;
	private String password;
}
