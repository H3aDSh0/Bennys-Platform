package Bennys.service;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.sendgrid.*;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;

@Service
public class EmailService {
	
	@Value("${sendgrid.api.key}")
	private String sendgridApiKey;
    
    
	public void sendEmail(String recipientEmail, String subject, String messageContent) throws IOException {
	    Email from = new Email("bennys.xyz@gmail.com");
	    Email to = new Email(recipientEmail);
	    Content content = new Content("text/html", messageContent); 
	    Mail mail = new Mail(from, subject, to, content);

	    SendGrid sg = new SendGrid(sendgridApiKey);
	    Request request = new Request();
	    try {
	        request.setMethod(Method.POST);
	        request.setEndpoint("mail/send");
	        request.setBody(mail.build());
	        Response response = sg.api(request);
	        //System.out.println(response.getStatusCode());
	       // System.out.println(response.getBody());
	        //System.out.println(response.getHeaders());
	    } catch (IOException ex) {
	        throw ex;
	    }
	}

    
	public void sendPasswordResetEmail(String recipientEmail, String resetLink, String userName) throws IOException {
        System.out.println("Email de Password Reset");

	    String subject = "Redefinir a sua palavra-passe";
	    String resetPasswordURL = "http://localhost:3000/login/forgot-password/reset-password?token=" + resetLink;

	    String messageContent = "<html><body>"
	            + "<p>Olá " + userName + ",</p>"
	            + "<p>Solicitou a redefinição da sua palavra-passe. Por favor, clique no botão abaixo para redefinir a sua palavra-passe:</p>"
	            + "<p><a href=\"" + resetPasswordURL  + "\" style=\"display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px;\">Redefinir Palavra-Passe</a></p>"
	            + "<p>Se não solicitou a redefinição da palavra-passe, ignore este e-mail.</p>"
	            + "</body></html>";

	    sendEmail(recipientEmail, subject, messageContent);
	}
	
	public void sendMagicLinkEmail(String recipientEmail, String magicLink, String userName) throws IOException {
        System.out.println("Email de Magic Link");

		 String subject = "Login com Magic Link";
		    String magicLinkURL = "http://localhost:3000/login/magic-link/validate?token=" + magicLink;

		    String messageContent = "<html><body>"
		            + "<p>Olá " + userName + ",</p>"
		            + "<p>Solicitou um login com Magic Link. Por favor, clique no botão abaixo para fazer login:</p>"
		            + "<p><a href=\"" + magicLinkURL + "\" style=\"display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px;\">Login com Magic Link</a></p>"
		            + "<p>Se não solicitou um login com Magic Link, ignore este e-mail.</p>"
		            + "</body></html>";

	    sendEmail(recipientEmail, subject, messageContent);
	}
	
	public void sendFabricanteEmail(String recipientEmail, String userName) throws IOException {
	    System.out.println("Email de Registo Recebido");

	    String subject = "Registo Recebido";
	    String messageContent = "<html><body>"
	            + "<p>Olá " + userName + ",</p>"
	            + "<p>O seu registo foi recebido com sucesso.</p>"
	            + "<p>Aguarde enquanto verificamos os seus dados e aprovamos o seu cadastro.</p>"
	            + "<p>Obrigado por se registar na nossa plataforma.</p>"
	            + "</body></html>";

	    sendEmail(recipientEmail, subject, messageContent);
	}
	
	public void sendFabricanteEmailAprovado(String recipientEmail, String userName) throws IOException {
	    System.out.println("Email de Registo Recebido");

	    String subject = "Registo Aprovado";
        String messageContent = "<html><body>"
                + "<p>Olá " + userName + ",</p>"
                + "<p>O seu registo foi aprovado com sucesso!</p>"
                + "<p>Agora pode adicionar modelos à nossa plataforma.</p>"
                + "<p>Obrigado por se registar na nossa plataforma.</p>"
                + "</body></html>";

	    sendEmail(recipientEmail, subject, messageContent);
	}
	public void sendFabricanteEmailRejeitado(String recipientEmail, String userName) throws IOException {
	    System.out.println("Email de Registo Recebido");

	    String subject = "Registo Rejeitado";
	    String messageContent = "<html><body>"
	            + "<p>Olá " + userName + ",</p>"
	            + "<p>Lamentamos informar que o seu registo na nossa plataforma foi rejeitado.</p>"
	            + "<p>Se desejar, entre em contacto connosco para mais informações.</p>"
	            + "<p>Obrigado.</p>"
	            + "</body></html>";

	    sendEmail(recipientEmail, subject, messageContent);
	}
	
	public void sendUtilizadoreEmail(String recipientEmail, String userName) throws IOException {
	    System.out.println("Email de Registo Recebido");

	    String subject = "Registo Recebido";
	    String messageContent = "<html><body>"
	            + "<p>Olá " + userName + ",</p>"
	            + "<p>O seu registo foi recebido com sucesso.</p>"
	            + "<p>Obrigado por se registar na nossa plataforma.</p>"
	            + "</body></html>";

	    sendEmail(recipientEmail, subject, messageContent);
	}
	
	public void sendFabricantePropostaAdicionadaEmail(String recipientEmail, String userName, String modelo) throws IOException {
	    System.out.println("Email de Registo Recebido");

	    String subject = "Proposta Adicionada";
	    String messageContent = "<html><body>"
                + "<p>Olá " + userName + ",</p>"
                + "<p>A sua proposta para o modelo <strong>" + modelo + "</strong> foi adicionada com sucesso à nossa plataforma.</p>"
                + "<p>A nossa equipe está agora analisando os detalhes fornecidos e em breve você será notificado sobre a aprovação ou não da sua proposta.</p>"
                + "<p>Obrigado por contribuir com a nossa plataforma.</p>"
                + "</body></html>";

	    sendEmail(recipientEmail, subject, messageContent);
	}
	
	public void sendFabricantePropostaAprovadaEmail(String recipientEmail, String userName, String modelo) throws IOException {
	    System.out.println("Email de Registo Recebido");

	    String subject = "Proposta Adicionada";
	    String messageContent = "<html><body>"
	            + "<p>Olá " + userName + ",</p>"
	            + "<p>A sua proposta para o modelo <strong>" + modelo + "</strong> foi aprovada e adicionada com sucesso à nossa plataforma.</p>"
	            + "<p>Obrigado por contribuir com a nossa plataforma.</p>"
	            + "</body></html>";

	    sendEmail(recipientEmail, subject, messageContent);
	}
	
	public void sendFabricantePropostaRejeitadaEmail(String recipientEmail, String userName, String modelo) throws IOException {
	    System.out.println("Email de Registo Recebido");

	    String subject = "Proposta Adicionada";
	    String messageContent = "<html><body>"
	            + "<p>Olá " + userName + ",</p>"
	            + "<p>A sua proposta para o modelo <strong>" + modelo + "</strong> foi rejeitada pela nossa equipe.</p>"
	            + "<p>Infelizmente, não podemos prosseguir com a sua proposta neste momento. Se desejar, sinta-se à vontade para entrar em contato conosco para mais detalhes.</p>"
	            + "<p>Obrigado por contribuir com a nossa plataforma.</p>"
	            + "</body></html>";

	    sendEmail(recipientEmail, subject, messageContent);
	}



}
