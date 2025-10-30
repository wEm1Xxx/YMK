// Функции для управления практиками
function getSelectedPractices() {
    const checkboxes = document.querySelectorAll('input[name="selected_practices"]:checked');
    return Array.from(checkboxes).map(checkbox => {
        return {
            id: checkbox.value,
            practice_name: checkbox.closest('.student-item').querySelector('.user-name').textContent.trim(),
            module_name: checkbox.closest('.student-item').querySelector('.user-id').textContent.trim()
        };
    });
}

function updateSelectedPracticesList(modalId, listContainerId, inputsContainerId) {
    const selectedPractices = getSelectedPractices();
    const listContainer = document.getElementById(listContainerId);
    const inputsContainer = document.getElementById(inputsContainerId);

    if (listContainer) listContainer.innerHTML = '';
    if (inputsContainer) inputsContainer.innerHTML = '';

    if (selectedPractices.length === 0) {
        if (listContainer) listContainer.innerHTML = '<p class="text-muted">Практики не выбраны</p>';
        const modalElement = document.getElementById(modalId);
        if (modalElement) {
            const modal = bootstrap.Modal.getInstance(modalElement);
            if (modal) {
                modal.hide();
            }
        }
        return false;
    }

    selectedPractices.forEach(practice => {
        if (listContainer) {
            const practiceElement = document.createElement('div');
            practiceElement.className = 'selected-practice-item';
            practiceElement.innerHTML = `<strong>${practice.practice_name}</strong> - ${practice.module_name}`;
            listContainer.appendChild(practiceElement);
        }

        if (inputsContainer) {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = 'practice_ids';
            input.value = practice.id;
            inputsContainer.appendChild(input);
        }
    });

    return true;
}

// Инициализация для практик
document.addEventListener('DOMContentLoaded', function() {
    // Обработчик открытия модального окна изменения практики
    const editPracticeModal = document.getElementById('editPracticeModal');
    if (editPracticeModal) {
        editPracticeModal.addEventListener('show.bs.modal', function() {
            updateSelectedPracticesList('editPracticeModal', 'selectedPracticesList', 'selectedPracticesInputs');
        });
    }

    // Обработчик открытия модального окна удаления практики
    const deletePracticeModal = document.getElementById('deletePracticeModal');
    if (deletePracticeModal) {
        deletePracticeModal.addEventListener('show.bs.modal', function() {
            updateSelectedPracticesList('deletePracticeModal', 'practicesToDeleteList', 'practicesToDeleteInputs');
        });
    }

    // Обработчик отправки формы изменения практики
    const editPracticeForm = document.getElementById('editPracticeForm');
    if (editPracticeForm) {
        editPracticeForm.addEventListener('submit', function(e) {
            const selectedPractices = getSelectedPractices();
            if (selectedPractices.length === 0) {
                e.preventDefault();
                return;
            }
        });
    }

    // Обработчик отправки формы удаления практики
    const deletePracticeForm = document.getElementById('deletePracticeForm');
    if (deletePracticeForm) {
        deletePracticeForm.addEventListener('submit', function(e) {
            const selectedPractices = getSelectedPractices();
            if (selectedPractices.length === 0) {
                e.preventDefault();
                return;
            }
        });
    }
});