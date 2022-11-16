package br.com.ifes.videolocadora.service.service;

import br.com.ifes.videolocadora.service.domain.entity.Locacao;
import br.com.ifes.videolocadora.service.domain.enums.SituacaoLocacaoEnum;
import br.com.ifes.videolocadora.service.repository.LocacaoRepository;
import br.com.ifes.videolocadora.service.service.dto.ConcluirLocacaoDTO;
import br.com.ifes.videolocadora.service.service.dto.LocacaoDTO;
import br.com.ifes.videolocadora.service.service.dto.LocacaoListDTO;
import br.com.ifes.videolocadora.service.service.mapper.LocacaoMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Objects;

@Service
@Transactional
@RequiredArgsConstructor
public class LocacaoService {

	private final LocacaoRepository repositorio;
	private final LocacaoMapper mapper;

	public Locacao procurarPorId(Long id) {
		return repositorio.findById(id)
				.orElseThrow(() -> new RuntimeException("Locação não encontrada"));
	}

	public LocacaoDTO obterPorId(Long id) {
		return mapper.toDto(procurarPorId(id));
	}

	public LocacaoDTO inserir(LocacaoDTO dto) {
		dto.setSituacao(SituacaoLocacaoEnum.ABERTO);

		return salvar(dto);
	}

	public List<LocacaoListDTO> obterTodos() {
		return repositorio.findAllList();
	}

	public LocacaoDTO editar(LocacaoDTO dto) {
		return editar(dto.getId(), dto);
	}

	public LocacaoDTO editar(Long id, LocacaoDTO dto) {
		procurarPorId(id);
		dto.setId(id);
		return salvar(dto);
	}

	public void deletar(Long id) {
		LocacaoDTO dto = obterPorId(id);
		dto.setSituacao(SituacaoLocacaoEnum.CANCELADO);
		editar(dto);
	}

	public Page<LocacaoListDTO> filtrar(LocacaoListDTO dto, Pageable pageable) {
		return repositorio.filtrar(dto, pageable);
	}

	private LocacaoDTO salvar(LocacaoDTO dto) {
		if (isLocacaoSobreposta(dto)) {
			throw new RuntimeException("Item já locado");
		}

		Locacao entity = mapper.toEntity(dto);
		entity = repositorio.save(entity);
		return mapper.toDto(entity);
	}

	public void devolver(ConcluirLocacaoDTO dto) {
		Locacao entity = procurarPorId(dto.getId());
		entity.setSituacao(SituacaoLocacaoEnum.DEVOLVIDO);
		entity.setDataDevolucaoEfetiva(dto.getDataDevolucao());
		entity.setValorCobrado(dto.getValorCobrado());
		entity.setValorMulta(dto.getValorMulta());
		repositorio.save(entity);
	}

	private boolean isLocacaoSobreposta(LocacaoDTO dto) {
		return Objects.equals(SituacaoLocacaoEnum.ABERTO, dto.getSituacao()) && repositorio.isLocacaoSobreposta(dto);
	}
}
