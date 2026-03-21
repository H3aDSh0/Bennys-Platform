package Bennys.entity.seguro;

import java.math.BigDecimal;
import java.time.LocalDate;

import Bennys.entity.veiculo.Veiculo;
import jakarta.persistence.*;

@Entity
@Table(name = "Seguro")
public class Seguro {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_Seguro")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "ID_Veiculo", referencedColumnName = "ID_Veiculo", nullable = false)
    private Veiculo veiculo;

    @Column(name = "Seguradora", nullable = false)
    private String seguradora;

    @Column(name = "Data_Inicio", nullable = false)
    private LocalDate dataInicio;

    @Column(name = "Data_Termino", nullable = false)
    private LocalDate dataTermino;

    @Column(name = "Coberturas", nullable = false)
    private String coberturas;

    @Column(name = "Valor_Premio", nullable = false)
    private BigDecimal valorPremio;

    @Column(name = "Estado_Seguro", nullable = false)
    private String estadoSeguro;

    // Construtores, getters e setters
}