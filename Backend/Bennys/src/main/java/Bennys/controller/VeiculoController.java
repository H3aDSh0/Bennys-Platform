package Bennys.controller;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import Bennys.entity.disponibilidadeVeiculo.DisponibilidadeDTO;
import Bennys.entity.disponibilidadeVeiculo.DisponibilidadeVeiculoRepository;
import Bennys.entity.propostaAdicao.PropostaIdsDTO;
import Bennys.entity.veiculo.Veiculo;
import Bennys.entity.veiculo.VeiculoDisponivelDTO;
import Bennys.entity.veiculo.VeiculoFiltroDTO;
import Bennys.entity.veiculo.VeiculoIdDTO;
import Bennys.service.DisponibilidadeVeiculoService;
import Bennys.service.VeiculoService;
import Bennys.util.ResultadoOperacao;


@CrossOrigin("*")
@RestController
@RequestMapping("veiculo")
public class VeiculoController {
	
	@Autowired
    private DisponibilidadeVeiculoService disponibilidadeVeiculoService;
	
	@Autowired
    private VeiculoService veiculoService;
	
	@PostMapping("/disponibilidade")
	public ResponseEntity<List<ResultadoOperacao>> atualizarDisponibilidade(@RequestBody DisponibilidadeDTO disponibilidadeDTO) {
	    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
	    String email = authentication.getName();
	    ResultadoOperacao resultadoOperacao = disponibilidadeVeiculoService.atualizarDisponibilidadeVeiculo(disponibilidadeDTO, email);
	    
	    List<ResultadoOperacao> resultados = new ArrayList<>();
	    resultados.add(resultadoOperacao);

	    return ResponseEntity.ok().body(resultados);
	}
	
	@PostMapping("/editar/disponibilidade")
	public ResponseEntity<List<ResultadoOperacao>> editarDisponibilidadeVeiculo(@RequestBody DisponibilidadeDTO disponibilidadeDTO) {
	    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
	    String email = authentication.getName();
	    ResultadoOperacao resultadoOperacao = disponibilidadeVeiculoService.editarDisponibilidadeVeiculo(disponibilidadeDTO, email);
	    
	    List<ResultadoOperacao> resultados = new ArrayList<>();
	    resultados.add(resultadoOperacao);

	    return ResponseEntity.ok().body(resultados);
	}
	
	@PostMapping("/remover/disponibilidade")
	public ResponseEntity<List<ResultadoOperacao>> removerDisponibilidadeVeiculo(@RequestParam Long idVeiculo) {
	    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
	    String email = authentication.getName();
	    ResultadoOperacao resultadoOperacao = disponibilidadeVeiculoService.removerDisponibilidadeVeiculo(idVeiculo, email);
	    
	    List<ResultadoOperacao> resultados = new ArrayList<>();
	    resultados.add(resultadoOperacao);

	    return ResponseEntity.ok().body(resultados);
	}
	
	@GetMapping("/disponiveis")
	public ResponseEntity<List<VeiculoDisponivelDTO>> visualizarVeiculosDisponiveis(VeiculoFiltroDTO filtro) {
	    List<VeiculoDisponivelDTO> veiculosDisponiveis = veiculoService.visualizarVeiculosDisponiveis(filtro);
	    if (veiculosDisponiveis.isEmpty()) {
	        return ResponseEntity.noContent().build();
	    } else {
	        return ResponseEntity.ok().body(veiculosDisponiveis);
	    }
	}
	
	@GetMapping("/garagem")
	public ResponseEntity<List<VeiculoDisponivelDTO>> visualizarGaragem(VeiculoFiltroDTO filtro) {
	    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
	    List<VeiculoDisponivelDTO> veiculosDisponiveis = veiculoService.visualizarGaragem(authentication);
	   if (veiculosDisponiveis.isEmpty()) {
	        return ResponseEntity.noContent().build();
	    } else {
	        return ResponseEntity.ok().body(veiculosDisponiveis);
	    }

	}
	
	@PostMapping("/comprar")
	public ResponseEntity<ResultadoOperacao> comprarVeiculo(@RequestBody VeiculoIdDTO  data) {
	    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
	    String email = authentication.getName();

	    ResultadoOperacao resultadoOperacao = disponibilidadeVeiculoService.comprarVeiculo(data.getIdVeiculo(), email);

	    if ("sucesso".equals(resultadoOperacao.status())) {
	        return ResponseEntity.ok(resultadoOperacao);
	    } else {
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(resultadoOperacao);
	    }
	}

}
