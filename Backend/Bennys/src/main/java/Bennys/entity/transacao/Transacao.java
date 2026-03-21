package Bennys.entity.transacao;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import Bennys.entity.fabricante.Fabricante;
import Bennys.entity.sistemaPagamento.SistemaPagamento;
import Bennys.entity.utilizador.Utilizador;
import Bennys.entity.veiculo.Veiculo;
import jakarta.persistence.*;

@Entity
@Table(name = "Transacao")
public class Transacao {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_Transacao")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "ID_Comprador", referencedColumnName = "ID_Utilizador", nullable = false)
    private Utilizador comprador;

    @ManyToOne
    @JoinColumn(name = "ID_Vendedor_Utilizador", referencedColumnName = "ID_Utilizador")
    private Utilizador vendedorUtilizador;

    @ManyToOne
    @JoinColumn(name = "ID_Vendedor_Fabricante", referencedColumnName = "ID_Fabricante")
    private Fabricante vendedorFabricante;

    @ManyToOne
    @JoinColumn(name = "ID_Veiculo", referencedColumnName = "ID_Veiculo", nullable = false)
    private Veiculo veiculo;

    @ManyToOne
    @JoinColumn(name = "ID_Pagamento", referencedColumnName = "ID_Pagamento", nullable = false)
    private SistemaPagamento pagamento;

    @Column(name = "Tipo_Operacao", nullable = false)
    private String tipoOperacao;

    @Column(name = "Duracao_Aluguel")
    private Integer duracaoAluguel;

    @Column(name = "Data_Termino_Aluguel")
    private LocalDateTime dataTerminoAluguel;

    @Column(name = "Data_Transacao", nullable = false)
    private LocalDateTime dataTransacao;

    @Column(name = "Valor_Total", nullable = false)
    private BigDecimal valorTotal;
    
}
