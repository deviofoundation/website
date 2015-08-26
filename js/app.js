(function () {
	'use strict';

	$(document).ready(function(){
		
		// $('form.newsletter button.button').attr('disabled', true);

		$('form.newsletter input[type="email"]').keyup(function() {
			var _button = $('form.newsletter button.button');
			// if (validateEmail($(this).val())) {
			// 	$(_button).attr('disabled', false);
			// }
			// else {
			// 	$(_button).attr('disabled', true);
			// }
		});

		$('form.newsletter').submit(function(e) {
			e.preventDefault();
			var url = $(this).attr('action'),
				data = $(this).serializeArray();
			$('.newsletter .notify').html('enviando...').addClass('sending');
			$.ajax({
				url: url,
				data: {
					'email': data[0].value
				},
				type: 'POST',
				dataType: 'xml',
				crossDomain: true,
				success: function() {
				},
				complete: function(res) {
					if (res.responseText == "Failed! already_invited") {
						$('.newsletter .notify').html('<i class="fa fa-smile-o"></i> Você já foi convidado. Verifique seu email.');
					} else {
						$('.newsletter .notify').html('<i class="fa fa-smile-o"></i> Verifique seu email, o convite está lá!');
					}
				},
				error: function(res) {
					console.log(res);
				}
			});
		});

	});

	function validateEmail($email) {
		var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
		return emailReg.test($email);
	}

}());