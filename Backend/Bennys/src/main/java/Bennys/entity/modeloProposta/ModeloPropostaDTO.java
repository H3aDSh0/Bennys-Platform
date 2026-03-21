package Bennys.entity.modeloProposta;

import java.util.List;

public record ModeloPropostaDTO(
	    Long idModelo,
	    String modelo,
	    int ano,
	    String segmento,
	    String tipoCombustivel,
	    int potencia,
	    String transmissao,
	    int caixaVelocidades,
	    String alimentacao,
	    String traccao,
	    double quilometragem,
	    int numeroPortas,
	    String condicao,
	    String descricao,
	    String fotos
	) {}
