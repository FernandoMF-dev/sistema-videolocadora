package br.com.ifes.videolocadora.service.service.mapper;

import br.com.ifes.videolocadora.service.domain.entity.Login;
import br.com.ifes.videolocadora.service.service.dto.LoginDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface LoginMapper extends EntityMapper<LoginDTO, Login> {
}
