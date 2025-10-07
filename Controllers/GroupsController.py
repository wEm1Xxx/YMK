from Models.Groups import *

class GroupsController:
    # метод вывода всех записей таблицы статусы
    @classmethod
    def get(cls):
        return Groups.select()

    @classmethod
    def show(cls, id):
        return Groups.get_or_none(id)

    @classmethod
    def add(cls, name, course):
        Groups.create(name=name, course=course)

    @classmethod
    def update(cls, id, **filds):
        for key, value in filds.items():
            Groups.update({key: value}).where(Groups.id == id).execute()

    @classmethod
    def delete(cls, id):
        try:
            # Проверяем, существует ли группа
            group = Groups.get_or_none(Groups.id == id)
            if group:
                # Удаляем группу
                Groups.delete_by_id(id)
                return True
            return False
        except Exception as e:
            print(f"Error deleting group: {e}")
            return False

if __name__ == "__main__":
    GroupsController.delete('60')