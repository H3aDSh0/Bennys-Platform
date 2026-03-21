package Bennys.entity.avaliacao;

import jakarta.persistence.*;
import java.time.LocalDate;

import Bennys.entity.utilizador.Utilizador;
import Bennys.entity.veiculo.Veiculo;

@Entity
@Table(name = "Avaliacao")
public class Avaliacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_Avaliacao")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "ID_Veiculo", referencedColumnName = "ID_Veiculo", nullable = false)
    private Veiculo veiculo;

    @ManyToOne
    @JoinColumn(name = "ID_Utilizador", referencedColumnName = "ID_Utilizador", nullable = false)
    private Utilizador utilizador;

    @Column(name = "Classificacao", nullable = false)
    private int classificacao;

    @Column(name = "Comentario", length = 255)
    private String comentario;

    @Column(name = "Data_Avaliacao", nullable = false)
    private LocalDate dataAvaliacao;

    // Construtores, getters e setters
}
