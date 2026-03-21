package Bennys.entity.disponibilidadeVeiculo;

import java.math.BigDecimal;

public record DisponibilidadeDTO( Long idVeiculo,
	    String tipoOperacao,
	    BigDecimal precoVenda,
	    BigDecimal precoAluguelDia,
	    String disponibilidade
	) {}
