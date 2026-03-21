package Bennys.entity.veiculo;

import java.math.BigDecimal;

public class VeiculoDisponivelDTO {

	    Long id;
	    String Fabricante;
	    String MarcaFabricante;
	    String Proprietario;
	    String modelo;
	    int ano;
	    String segmento;
	    String tipoCombustivel;
	    int potencia;
	    String transmissao;
	    Integer caixaVelocidades;
	    String alimentacao;
	    String traccao;
	    double quilometragem;
	    int numeroPortas;
	    String condicao;
	    String descricao;
	    String fotos;
	    String tipoOperacao;
	    BigDecimal precoVenda;
	    BigDecimal precoAluguelDia;
	    String disponibilidade;
	    
	    
	    
		public VeiculoDisponivelDTO(Long id, String fabricante, String marcaFabricante, String proprietario,
				String modelo, int ano, String segmento, String tipoCombustivel, int potencia, String transmissao,
				Integer caixaVelocidades, String alimentacao, String traccao, double quilometragem, int numeroPortas,
				String condicao, String descricao, String fotos, String tipoOperacao, BigDecimal precoVenda,
				BigDecimal precoAluguelDia, String disponibilidade) {
			super();
			this.id = id;
			Fabricante = fabricante;
			MarcaFabricante = marcaFabricante;
			Proprietario = proprietario;
			this.modelo = modelo;
			this.ano = ano;
			this.segmento = segmento;
			this.tipoCombustivel = tipoCombustivel;
			this.potencia = potencia;
			this.transmissao = transmissao;
			this.caixaVelocidades = caixaVelocidades;
			this.alimentacao = alimentacao;
			this.traccao = traccao;
			this.quilometragem = quilometragem;
			this.numeroPortas = numeroPortas;
			this.condicao = condicao;
			this.descricao = descricao;
			this.fotos = fotos;
			this.tipoOperacao = tipoOperacao;
			this.precoVenda = precoVenda;
			this.precoAluguelDia = precoAluguelDia;
			this.disponibilidade = disponibilidade;
		}
		
		
		
		public VeiculoDisponivelDTO() {

		}



		public Long getId() {
			return id;
		}
		public String getFabricante() {
			return Fabricante;
		}
		public String getMarcaFabricante() {
			return MarcaFabricante;
		}
		public String getProprietario() {
			return Proprietario;
		}
		public String getModelo() {
			return modelo;
		}
		public int getAno() {
			return ano;
		}
		public String getSegmento() {
			return segmento;
		}
		public String getTipoCombustivel() {
			return tipoCombustivel;
		}
		public int getPotencia() {
			return potencia;
		}
		public String getTransmissao() {
			return transmissao;
		}
		public Integer getCaixaVelocidades() {
			return caixaVelocidades;
		}
		public String getAlimentacao() {
			return alimentacao;
		}
		public String getTraccao() {
			return traccao;
		}
		public double getQuilometragem() {
			return quilometragem;
		}
		public int getNumeroPortas() {
			return numeroPortas;
		}
		public String getCondicao() {
			return condicao;
		}
		public String getDescricao() {
			return descricao;
		}
		public String getFotos() {
			return fotos;
		}
		public String getTipoOperacao() {
			return tipoOperacao;
		}
		public BigDecimal getPrecoVenda() {
			return precoVenda;
		}
		public BigDecimal getPrecoAluguelDia() {
			return precoAluguelDia;
		}
		public String getDisponibilidade() {
			return disponibilidade;
		}
		public void setId(Long id) {
			this.id = id;
		}
		public void setFabricante(String fabricante) {
			Fabricante = fabricante;
		}
		public void setMarcaFabricante(String marcaFabricante) {
			MarcaFabricante = marcaFabricante;
		}
		public void setProprietario(String proprietario) {
			Proprietario = proprietario;
		}
		public void setModelo(String modelo) {
			this.modelo = modelo;
		}
		public void setAno(int ano) {
			this.ano = ano;
		}
		public void setSegmento(String segmento) {
			this.segmento = segmento;
		}
		public void setTipoCombustivel(String tipoCombustivel) {
			this.tipoCombustivel = tipoCombustivel;
		}
		public void setPotencia(int potencia) {
			this.potencia = potencia;
		}
		public void setTransmissao(String transmissao) {
			this.transmissao = transmissao;
		}
		public void setCaixaVelocidades(Integer caixaVelocidades) {
			this.caixaVelocidades = caixaVelocidades;
		}
		public void setAlimentacao(String alimentacao) {
			this.alimentacao = alimentacao;
		}
		public void setTraccao(String traccao) {
			this.traccao = traccao;
		}
		public void setQuilometragem(double quilometragem) {
			this.quilometragem = quilometragem;
		}
		public void setNumeroPortas(int numeroPortas) {
			this.numeroPortas = numeroPortas;
		}
		public void setCondicao(String condicao) {
			this.condicao = condicao;
		}
		public void setDescricao(String descricao) {
			this.descricao = descricao;
		}
		public void setFotos(String fotos) {
			this.fotos = fotos;
		}
		public void setTipoOperacao(String tipoOperacao) {
			this.tipoOperacao = tipoOperacao;
		}
		public void setPrecoVenda(BigDecimal precoVenda) {
			this.precoVenda = precoVenda;
		}
		public void setPrecoAluguelDia(BigDecimal precoAluguelDia) {
			this.precoAluguelDia = precoAluguelDia;
		}
		public void setDisponibilidade(String disponibilidade) {
			this.disponibilidade = disponibilidade;
		}
	    
	    
	    
	}
