package Bennys.entity.equipaSuporte;

import java.time.LocalDate;

import jakarta.persistence.*;

@Entity
@Table(name = "Equipa_Suporte")
public class EquipaSuporte {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_Membro")
    private Long id;

    @Column(name = "Nome", nullable = false)
    private String nome;

    @Column(name = "Cargo", nullable = false)
    private String cargo;

    @Column(name = "Email", unique = true, nullable = false)
    private String email;

    @Column(name = "Numero_Telemovel", unique = true)
    private String numeroTelemovel;

    @Column(name = "DataAdmissao")
    private LocalDate dataAdmissao;

    // Construtores, getters e setters
}
