<?php
header("Content-type: text/html; charset=UTF-8");
	// e-mail получателя

	$emailAddress = 'pozzitiff-91@mail.ru';

	// библиотека phpmailer 
	require "lib/class.phpmailer.php";

	// обрабатываем данные
	$name = nl2br(strip_tags(stripslashes($_POST['name'])));
	$telefon = nl2br(strip_tags(stripslashes($_POST['telefon'])));
	$day = nl2br(strip_tags(stripslashes($_POST['day'])));
	$mouth = nl2br(strip_tags(stripslashes($_POST['mouth'])));
	$comment = nl2br(strip_tags(stripslashes($_POST['comment'])));
	//правильность емайл
	if(empty($_POST['name']) || empty($_POST['telefon']) || empty($_POST['comment']) || empty($_POST['day']) || empty($_POST['mouth'])) {             
		echo "Заполнены не все поля!";         
	} else{
		$msg = "Клиент <strong>".$name."</strong>(телефон: ".$telefon.") попросил позвонить ему <strong>".$day.".".$mouth."</strong> и оставил комментарий:<br /><h4>&laquo;".$comment."&raquo;</h4>";
		// Используем класс PHPMailer
		$mail = new PHPMailer();
		$mail->IsMail();
		// Добавляем адрес получателя
		$mail->AddAddress($emailAddress);
		$mail->Subject = 'Заказ обратного звонка '.$_SERVER['HTTP_HOST'];
		$mail->MsgHTML($msg);
		$mail->AddReplyTo('noreply@'.$_SERVER['HTTP_HOST'], 'Apple-Store');
		$mail->SetFrom('noreply@'.$_SERVER['HTTP_HOST'], 'Apple-Store');
		$mail->CharSet = "utf-8";
		$mail->Send();
		unset($_SESSION['captcha_keystring']);
		echo 'Сообщение отправлено, спасибо!';
	}
?>