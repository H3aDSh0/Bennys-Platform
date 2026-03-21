package Bennys.entity.manutencao;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import Bennys.entity.veiculo.Veiculo;
import jakarta.persistence.*;

@Entity
@Table(name = "Manutencao")
public class Manutencao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_Manutencao")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "ID_Veiculo", referencedColumnName = "ID_Veiculo", nullable = false)
    private Veiculo veiculo;

    @Column(name = "Tipo_Manutencao", nullable = false)
    private String tipoManutencao;

    @Column(name = "Descricao", nullable = false)
    private String descricao;

    @Column(name = "Data_Hora", nullable = false)
    private LocalDateTime dataHora;

    @Column(name = "Custo", nullable = false)
    private BigDecimal custo;

    @Column(name = "Estado_Manutencao", nullable = false)
    private String estadoManutencao;

    // Construtores, getters e setters
}
