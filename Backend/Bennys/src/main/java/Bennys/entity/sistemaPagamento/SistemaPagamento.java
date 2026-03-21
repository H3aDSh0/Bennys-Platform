package Bennys.entity.sistemaPagamento;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
@Table(name = "Sistema_Pagamento")
public class SistemaPagamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_Pagamento")
    private Long id;

    @Column(name = "MetodoPagamento", nullable = false)
    private String metodoPagamento;

    @Column(name = "ValorTotal", nullable = false)
    private BigDecimal valorTotal;

    @Column(name = "DataHora", nullable = false)
    private LocalDateTime dataHora;

    @Column(name = "EstadoPagamento", nullable = false)
    private String estadoPagamento;

    // Construtores, getters e setters
}