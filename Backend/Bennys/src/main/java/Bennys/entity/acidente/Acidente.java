package Bennys.entity.acidente;

import java.time.LocalDateTime;

import Bennys.entity.veiculo.Veiculo;
import jakarta.persistence.*;

@Entity
@Table(name = "Acidente")
public class Acidente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_Acidente")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "ID_Veiculo", referencedColumnName = "ID_Veiculo", nullable = false)
    private Veiculo veiculo;

    @Column(name = "Data_Hora_Acidente", nullable = false)
    private LocalDateTime dataHoraAcidente;

    @Column(name = "Local_Acidente", nullable = false)
    private String localAcidente;

    @Column(name = "Descricao_Acidente", nullable = false)
    private String descricaoAcidente;

    @Column(name = "Danos_Veiculo", nullable = false)
    private String danosVeiculo;

    @Column(name = "Envolvidos")
    private String envolvidos;

    // Construtores, getters e setters
}
