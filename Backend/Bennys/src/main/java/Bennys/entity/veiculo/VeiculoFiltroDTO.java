package Bennys.entity.veiculo;

import java.math.BigDecimal;

public class VeiculoFiltroDTO {
    private String fabricante;
    private String modelo;
    private Integer anoMinimo;
    private Integer anoMaximo;
    private BigDecimal precoMinimo;
    private BigDecimal precoMaximo;
    private String tipoCombustivel;
    private Integer potenciaMinima;
    private Integer potenciaMaxima;

    
    
    
    
    
    public VeiculoFiltroDTO(String fabricante, String modelo, Integer anoMinimo, Integer anoMaximo,
			BigDecimal precoMinimo, BigDecimal precoMaximo, String tipoCombustivel, Integer potenciaMinima,
			Integer potenciaMaxima) {
		this.fabricante = fabricante;
		this.modelo = modelo;
		this.anoMinimo = anoMinimo;
		this.anoMaximo = anoMaximo;
		this.precoMinimo = precoMinimo;
		this.precoMaximo = precoMaximo;
		this.tipoCombustivel = tipoCombustivel;
		this.potenciaMinima = potenciaMinima;
		this.potenciaMaxima = potenciaMaxima;
	}

	public boolean isVazio() {
        return fabricante == null &&
               modelo == null &&
               anoMinimo == null &&
               anoMaximo == null &&
               precoMinimo == null &&
               precoMaximo == null &&
               tipoCombustivel == null &&
               potenciaMinima == null &&
               potenciaMaxima == null;
    }

	public String getFabricante() {
		return fabricante;
	}

	public String getModelo() {
		return modelo;
	}

	public Integer getAnoMinimo() {
		return anoMinimo;
	}

	public Integer getAnoMaximo() {
		return anoMaximo;
	}

	public BigDecimal getPrecoMinimo() {
		return precoMinimo;
	}

	public BigDecimal getPrecoMaximo() {
		return precoMaximo;
	}

	public String getTipoCombustivel() {
		return tipoCombustivel;
	}

	public Integer getPotenciaMinima() {
		return potenciaMinima;
	}

	public Integer getPotenciaMaxima() {
		return potenciaMaxima;
	}

	public void setFabricante(String fabricante) {
		this.fabricante = fabricante;
	}

	public void setModelo(String modelo) {
		this.modelo = modelo;
	}

	public void setAnoMinimo(Integer anoMinimo) {
		this.anoMinimo = anoMinimo;
	}

	public void setAnoMaximo(Integer anoMaximo) {
		this.anoMaximo = anoMaximo;
	}

	public void setPrecoMinimo(BigDecimal precoMinimo) {
		this.precoMinimo = precoMinimo;
	}

	public void setPrecoMaximo(BigDecimal precoMaximo) {
		this.precoMaximo = precoMaximo;
	}

	public void setTipoCombustivel(String tipoCombustivel) {
		this.tipoCombustivel = tipoCombustivel;
	}

	public void setPotenciaMinima(Integer potenciaMinima) {
		this.potenciaMinima = potenciaMinima;
	}

	public void setPotenciaMaxima(Integer potenciaMaxima) {
		this.potenciaMaxima = potenciaMaxima;
	}

    
}


