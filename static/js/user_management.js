// Функция для получения выбранных пользователей
function getSelectedUsers() {
    const checkboxes = document.querySelectorAll('input[name="selected_students"]:checked');
    return Array.from(checkboxes).map(checkbox => {
        return {
            id: checkbox.value,
            name: checkbox.closest('.student-item').querySelector('.user-name').textContent.trim(),
            role: checkbox.closest('.student-item').querySelector('.user-role').textContent.trim()
        };
    });
}

// Функция для обновления списка выбранных пользователей в модальном окне
function updateSelectedUsersList(modalId, listContainerId, inputsContainerId) {
    const selectedUsers = getSelectedUsers();
    const listContainer = document.getElementById(listContainerId);
    const inputsContainer = document.getElementById(inputsContainerId);

    // Очищаем контейнеры
    if (listContainer) listContainer.innerHTML = '';
    if (inputsContainer) inputsContainer.innerHTML = '';

    if (selectedUsers.length === 0) {
        if (listContainer) listContainer.innerHTML = '<p class="text-muted">Пользователи не выбраны</p>';
        // Закрываем модальное окно, если нет выбранных пользователей
        const modalElement = document.getElementById(modalId);
        if (modalElement) {
            const modal = bootstrap.Modal.getInstance(modalElement);
            if (modal) {
                modal.hide();
            }
        }
        return false;
    }

    // Заполняем список пользователей
    selectedUsers.forEach(user => {
        if (listContainer) {
            const userElement = document.createElement('div');
            userElement.className = 'selected-user-item';
            userElement.innerHTML = `<strong>${user.name}</strong> - ${user.role}`;
            listContainer.appendChild(userElement);
        }

        // Добавляем скрытое поле с ID пользователя
        if (inputsContainer) {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = 'user_ids';
            input.value = user.id;
            inputsContainer.appendChild(input);
        }
    });

    return true;
}

// Инициализация после загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    console.log('User management initialized');

    // Обработчик открытия модального окна изменения роли
    const editRoleModal = document.getElementById('editRoleModal');
    if (editRoleModal) {
        editRoleModal.addEventListener('show.bs.modal', function() {
            updateSelectedUsersList('editRoleModal', 'selectedUsersList', 'selectedUsersInputs');
        });
    }

    // Обработчик открытия модального окна удаления
    const deleteUserModal = document.getElementById('deleteUserModal');
    if (deleteUserModal) {
        deleteUserModal.addEventListener('show.bs.modal', function() {
            updateSelectedUsersList('deleteUserModal', 'usersToDeleteList', 'usersToDeleteInputs');
        });
    }

    // Обработчик отправки формы изменения роли
    const editRoleForm = document.getElementById('editRoleForm');
    if (editRoleForm) {
        editRoleForm.addEventListener('submit', function(e) {
            const selectedUsers = getSelectedUsers();
            if (selectedUsers.length === 0) {
                e.preventDefault();
                return;
            }
        });
    }
});