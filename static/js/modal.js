document.addEventListener('DOMContentLoaded', function() {
    initializeCourseDropdown();
    initializeGroupForm();
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
            const courseText = this.textContent;

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
            document.getElementById('groupNameInput').value = '';
        });
    }
}

function initializeGroupForm() {
    const form = document.getElementById('groupForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            const courseValue = document.getElementById('selectedCourse').value;
            const groupName = document.getElementById('groupNameInput').value;

            if (!courseValue) {
                e.preventDefault();
                alert('Пожалуйста, выберите курс');
                return false;
            }

            if (!groupName.trim()) {
                e.preventDefault();
                alert('Пожалуйста, введите название группы');
                return false;
            }

            return true;
        });
    }
}