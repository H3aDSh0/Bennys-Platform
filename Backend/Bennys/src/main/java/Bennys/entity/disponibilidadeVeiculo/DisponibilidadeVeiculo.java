package Bennys.entity.disponibilidadeVeiculo;

import java.math.BigDecimal;

import Bennys.entity.veiculo.Veiculo;
import jakarta.persistence.*;

@Entity
@Table(name = "Disponibilidade_Veiculo")
public class DisponibilidadeVeiculo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_Disponibilidade")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "ID_Veiculo", referencedColumnName = "ID_Veiculo", nullable = false)
    private Veiculo veiculo;

    @Column(name = "Tipo_Operacao", nullable = false)
    private String tipoOperacao;

    @Column(name = "Preco_Venda")
    private BigDecimal precoVenda;

    @Column(name = "Preco_Aluguel_Dia")
    private BigDecimal precoAluguelDia;

    @Column(name = "Disponibilidade", nullable = false)
    private String disponibilidade;


	public Long getId() {
		return id;
	}

	public Veiculo getVeiculo() {
		return veiculo;
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

	public void setVeiculo(Veiculo veiculo) {
		this.veiculo = veiculo;
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

	public DisponibilidadeVeiculo( Veiculo veiculo, String tipoOperacao, BigDecimal precoVenda,
			BigDecimal precoAluguelDia, String disponibilidade) {
		this.veiculo = veiculo;
		this.tipoOperacao = tipoOperacao;
		this.precoVenda = precoVenda;
		this.precoAluguelDia = precoAluguelDia;
		this.disponibilidade = disponibilidade;
	}

	public DisponibilidadeVeiculo() {
	}
	
    
    // Construtores, getters e setters
}
