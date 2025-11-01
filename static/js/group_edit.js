document.addEventListener('DOMContentLoaded', function() {
    initializeCourseDropdown();
    initializeDeleteGroup();
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
    const modal = document.getElementById('addGroupModal');
    if (modal) {
        modal.addEventListener('hidden.bs.modal', function() {
            selectedCourse.value = '';
            dropdownButton.textContent = 'Выберите курс';
            document.getElementById('groupNameInput').value = '';
        });
    }
}

function initializeDeleteGroup() {
    const confirmDeleteButton = document.getElementById('confirmDeleteButton');
    const groupSelect = document.getElementById('groupSelect');
    
    if (confirmDeleteButton && groupSelect) {
        confirmDeleteButton.addEventListener('click', function() {
            const groupId = groupSelect.value;
            
            if (!groupId) {
                alert('Пожалуйста, выберите группу для удаления');
                return;
            }
            
            if (confirm('Вы уверены, что хотите удалить эту группу?')) {
                // Перенаправляем на маршрут удаления
                window.location.href = '/group/delete/' + groupId;
            }
        });
    }
    
    // Очистка выбора при закрытии модального окна удаления
    const deleteModal = document.getElementById('deleteGroupModal');
    if (deleteModal) {
        deleteModal.addEventListener('hidden.bs.modal', function() {
            groupSelect.value = '';
        });
    }
}
// Обработчик для модального окна удаления группы
document.addEventListener('DOMContentLoaded', function() {
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
    const groupSelect = document.getElementById('groupSelect');
    const groupToDeleteName = document.getElementById('groupToDeleteName');
    const confirmGroupId = document.getElementById('confirmGroupId');

    if (confirmDeleteBtn && groupSelect) {
        confirmDeleteBtn.addEventListener('click', function() {
            const selectedOption = groupSelect.options[groupSelect.selectedIndex];
            if (selectedOption.value) {
                // Заполняем данные в модальном окне подтверждения
                groupToDeleteName.textContent = selectedOption.text;
                confirmGroupId.value = selectedOption.value;

                // Закрываем первое модальное окно и открываем подтверждение
                const deleteModal = bootstrap.Modal.getInstance(document.getElementById('deleteGroupModal'));
                const confirmModal = new bootstrap.Modal(document.getElementById('confirmDeleteModal'));

                deleteModal.hide();
                confirmModal.show();
            }
        });
    }
});