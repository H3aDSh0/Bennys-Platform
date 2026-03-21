package Bennys.entity.account;

public class PalavraPasseRequestDTO {
	private String novaPalavraPasse;

	public String getNovaPalavraPasse() {
		return novaPalavraPasse;
	}

	public void setNovaPalavraPasse(String novaPalavraPasse) {
		this.novaPalavraPasse = novaPalavraPasse;
	}

	public PalavraPasseRequestDTO(String novaPalavraPasse) {
		this.novaPalavraPasse = novaPalavraPasse;
	}
	
	public PalavraPasseRequestDTO() {
	}
	
}
