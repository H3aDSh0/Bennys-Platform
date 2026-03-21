package Bennys.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;

import Bennys.entity.fabricante.Fabricante;
import Bennys.entity.fabricante.FabricanteDTO;
import Bennys.entity.fabricante.FabricanteIdsDTO;
import Bennys.entity.modeloProposta.ModeloProposta;
import Bennys.entity.modeloProposta.ModeloPropostaDTO;
import Bennys.entity.modeloProposta.ModeloPropostaRepository;
import Bennys.entity.propostaAdicao.PropostaAdicao;
import Bennys.entity.propostaAdicao.PropostaAdicaoRepository;
import Bennys.entity.propostaAdicao.PropostaDTO;
import Bennys.entity.propostaAdicao.PropostaIdsDTO;
import Bennys.entity.veiculo.VeiculoRepository;
import Bennys.service.FabricanteService;
import Bennys.service.PropostaService;
import Bennys.util.ResultadoOperacao;

@CrossOrigin("*")
@RestController
@RequestMapping("admin")
public class AdministradorController {

	 	@Autowired
	    private FabricanteService fabricanteService;
	 	
		@Autowired
		private PropostaAdicaoRepository propostaAdicaoRepository;
		
		@Autowired
		private PropostaService propostaService;
		
		@Autowired
		private ModeloPropostaRepository modeloPropostaRepository;
		
		@Autowired
		private VeiculoRepository veiculoRepository;

	 	

	 	@GetMapping(value ="/fabricantes/pendentes" ,produces="application/json")
	 	public ResponseEntity<String> getFabricantesPendentes() {
	 	    String fabricantesPendentesJson = fabricanteService.getFabricantesPendentes();
	 	    return ResponseEntity.ok(fabricantesPendentesJson);
	 	}

	    @PostMapping("/fabricantes/aprovar")
	    public ResponseEntity<List<ResultadoOperacao>> aprovarFabricante(@RequestBody FabricanteIdsDTO data) throws IOException {
	    	List<ResultadoOperacao> resultados = fabricanteService.aprovarRegistoFabricante(data.fabricanteIds());
	        return ResponseEntity.ok(resultados);
	    }

	    @PostMapping("/fabricantes/rejeitar")
	    public ResponseEntity<List<ResultadoOperacao>> rejeitarFabricante(@RequestBody FabricanteIdsDTO data) throws IOException {
	        List<ResultadoOperacao> resultados = fabricanteService.rejeitarRegistoFabricante(data.fabricanteIds());
	        return ResponseEntity.ok(resultados);
	    }
	    
	    @GetMapping(value = "/fabricantes/propostas", produces = "application/json")
	    public ResponseEntity<List<PropostaDTO>> visualizarTodasPropostas() {
	        List<PropostaDTO> propostasDTO = propostaService.getAllPropostasDTO();
			if (propostasDTO.isEmpty()) {
				return ResponseEntity.noContent().build();
			}
	        return ResponseEntity.ok().body(propostasDTO);
	    }
	    
	    @PostMapping("/fabricantes/propostas/aprovar")
	    public ResponseEntity<List<ResultadoOperacao>> aprovarProposta(@RequestBody PropostaIdsDTO data) throws IOException {
	    	List<ResultadoOperacao> resultados =  propostaService.aprovarProposta(data.propostasIds());
	        return ResponseEntity.ok(resultados);
	    }

	    @PostMapping("/fabricantes/propostas/rejeitar")
	    public ResponseEntity<List<ResultadoOperacao>> rejeitarProposta(@RequestBody PropostaIdsDTO data) throws IOException {
	        List<ResultadoOperacao> resultados = propostaService.rejeitarProposta(data.propostasIds());
	        return ResponseEntity.ok(resultados);
	    }
}
