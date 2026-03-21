package Bennys.entity.modeloProposta;

import jakarta.persistence.*;

@Entity
@Table(name = "Modelo_Proposta")
public class ModeloProposta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_Modelo")
    private Long id;

    @Column(name = "Modelo", nullable = false)
    private String modelo;

    @Column(name = "Ano", nullable = false)
    private int ano;

    @Column(name = "Segmento", nullable = false)
    private String segmento;

    @Column(name = "Tipo_Combustivel", nullable = false)
    private String tipoCombustivel;

    @Column(name = "Potencia", nullable = false)
    private int potencia;

    @Column(name = "Transmissao", nullable = false)
    private String transmissao;

    @Column(name = "Caixa_Velocidades")
    private Integer caixaVelocidades;

    @Column(name = "Alimentacao", nullable = false)
    private String alimentacao;

    @Column(name = "Traccao", nullable = false)
    private String traccao;

    @Column(name = "Quilometragem", nullable = false)
    private double quilometragem;

    @Column(name = "Numero_Portas", nullable = false)
    private int numeroPortas;

    @Column(name = "Condicao", nullable = false)
    private String condicao;

    @Column(name = "Descricao", nullable = false)
    private String descricao;

    @Column(name = "Fotos", nullable = false)
    private String fotos;

	public Long getId() {
		return id;
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

	public void setId(Long id) {
		this.id = id;
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

    
    
    // getters e setters
}