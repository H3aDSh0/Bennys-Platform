package Bennys.entity.propostaAdicao;

import Bennys.entity.fabricante.FabricanteDTO;
import Bennys.entity.modeloProposta.ModeloPropostaDTO;

public record PropostaDTO(
	    Long idProposta,
	    FabricanteDTO fabricante,
	    String dataProposta,
	    String estadoProposta,
	    ModeloPropostaDTO modeloProposto
	) {}
