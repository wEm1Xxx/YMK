(function($) {
	function setChecked(target) {
		var checked = $(target).find("input[type='checkbox']:checked").length;
		if (checked) {
			$(target).find('select option:first').html('Выбрано: ' + checked);
		} else {
			$(target).find('select option:first').html('Документы');
		}
	}

	$.fn.checkselect = function() {
		this.wrapInner('<div class="checkselect-popup"></div>');
		this.prepend(
			'<div class="checkselect-control">' +
				'<select class="form-control"><option></option></select>' +
				'<div class="checkselect-over"></div>' +
			'</div>'
		);

		this.each(function(){
			setChecked(this);
		});
		this.find('input[type="checkbox"]').click(function(){
			setChecked($(this).parents('.checkselect'));
		});

		this.parent().find('.checkselect-control').on('click', function(){
			$popup = $(this).next();
			$('.checkselect-popup').not($popup).css('display', 'none');
			if ($popup.is(':hidden')) {
				$popup.css('display', 'block');
				$(this).find('select').focus();
			} else {
				$popup.css('display', 'none');
			}
		});

		$('html, body').on('click', function(e){
			if ($(e.target).closest('.checkselect').length == 0){
				$('.checkselect-popup').css('display', 'none');
			}
		});
	};
})(jQuery);

$('.checkselect').checkselect();


document.addEventListener('DOMContentLoaded', function() {
    initializeCourseDropdown();
});

function initializeCourseDropdown() {
    const dropdownItems = document.querySelectorAll('#courseDropdownMenu .dropdown-item');
    const selectedCourse = document.getElementById('selectedCourse');
    const dropdownButton = document.getElementById('courseDropdownButton');

    if (!dropdownButton || !selectedCourse) return;

    dropdownItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const courseValue = this.getAttribute('data-value');

            selectedCourse.value = courseValue;
            dropdownButton.textContent = courseValue;

            // Закрываем dropdown после выбора
            const dropdown = bootstrap.Dropdown.getInstance(dropdownButton);
            if (dropdown) {
                dropdown.hide();
            }
        });
    });

    // Очистка выбора при закрытии модального окна
    const modal = document.getElementById('exampleModal');
    if (modal) {
        modal.addEventListener('hidden.bs.modal', function() {
            selectedCourse.value = '';
            dropdownButton.textContent = 'Выберите курс';
        });
    }
}
