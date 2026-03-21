package Bennys.entity.account;

public class AccountUpdateDTO {
	private String nome;
	private String numeroTelemovel;
	private String sede; // Específico para Fabricante
	private String pais; // Específico para Fabricante
	private String descricao; // Específico para Fabricante
	private String portfolioVeiculos; // Específico para Fabricante
	private String documentacaoCertificacao; // Específico para Fabricante
	private String dataNascimento; // Específico para Utilizador
	private String morada; // Específico para Utilizador
	private String fotoPerfil;
	
	

	
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	
	public String getNumeroTelemovel() {
		return numeroTelemovel;
	}
	public void setNumeroTelemovel(String numeroTelemovel) {
		this.numeroTelemovel = numeroTelemovel;
	}
	
	public String getSede() {
		return sede;
	}
	public void setSede(String sede) {
		this.sede = sede;
	}
	public String getPais() {
		return pais;
	}
	public void setPais(String pais) {
		this.pais = pais;
	}
	public String getDescricao() {
		return descricao;
	}
	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}
	public String getPortfolioVeiculos() {
		return portfolioVeiculos;
	}
	public void setPortfolioVeiculos(String portfolioVeiculos) {
		this.portfolioVeiculos = portfolioVeiculos;
	}
	public String getDocumentacaoCertificacao() {
		return documentacaoCertificacao;
	}
	public void setDocumentacaoCertificacao(String documentacaoCertificacao) {
		this.documentacaoCertificacao = documentacaoCertificacao;
	}

	public String getDataNascimento() {
		return dataNascimento;
	}
	public void setDataNascimento(String dataNascimento) {
		this.dataNascimento = dataNascimento;
	}
	public String getMorada() {
		return morada;
	}
	public void setMorada(String morada) {
		this.morada = morada;
	}
	public String getFotoPerfil() {
		return fotoPerfil;
	}
	public void setFotoPerfil(String fotoPerfil) {
		this.fotoPerfil = fotoPerfil;
	}

	
	
	
}