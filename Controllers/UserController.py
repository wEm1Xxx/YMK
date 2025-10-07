from Models.Users import *
from bcrypt import hashpw, gensalt, checkpw

class UsersController:
    ''' Контроллер управления пользователем в системе
    Предоставляет методы CRUD
    Attributes:
        Модель: Использует модель Users для работы с базой данных
    '''

    @classmethod
    def get(cls):
        '''Вывод всех пользователей из базы данных
        Returns:
            ModelSelect: список объектов всех пользователей из таблицы

        Example:
            users = UsersController.get()
            for user in users:
                print(user.login)
        '''
        return Users.select()

    @classmethod
    def show(cls, id):
        '''Находит пользователя по ID.

         Args:
            id (int): Идентификатор пользователя

        Returns:
            Users or None: Объект пользователя или None если не найден

        Example:
            user = UsersController.show(1)
            print(user.login if user else "Not found")
        '''
        return Users.get_or_none(id)

    @classmethod
    def show_login(cls,login):
        '''Находит пользователя по логину.
        Args:
            login (str): Логин пользователя

        Returns:
            Users or None: Объект пользователя или None если не найден

        Example:
            user = UsersController.show_login("admin")
            if user:
                print(f"User found: {user.login}")
        '''
        return Users.get_or_none(Users.login==login)

    @classmethod
    def add(cls, login, password, role_id):
        """Создает нового пользователя.

                Args:
                    login (str): Логин пользователя
                    password (str): Пароль в открытом виде
                    role_id (int): ID роли пользователя

                Note:
                    Пароль сохраняется в открытом виде. Рекомендуется использовать метод registration.

                Example:
                    UsersController.add("newuser", "password123", 2)
                """
        Users.create(login=login,
                     password=password,
                     role_id=role_id)

    @classmethod
    def update(cls, id, **filds):
        """Обновляет поля пользователя.

                Args:
                    id (int): ID пользователя для обновления
                    **fields: Поля для обновления в виде словаря (ключ=значение)

                Example:
                    UsersController.update(1, login="newlogin", role_id=3)
                """
        for key, value in filds.items():
            Users.update({key: value}).where(Users.id == id).execute()

    @classmethod
    def delete(cls,id):
        """Удаляет пользователя по ID.

                Args:
                    id (int): ID пользователя для удаления

                Example:
                    UsersController.delete(1)
                """
        Users.delete().where(Users.id == id).execute()

    @classmethod
    def registration(cls,login,password,role_id=1):
        """Регистрирует нового пользователя с хешированием пароля.

               Args:
                   login (str): Логин пользователя
                   password (str): Пароль в открытом виде
                   role_id (int, optional): ID роли пользователя. По умолчанию 1 (обычный пользователь)

               Security:
                   Использует bcrypt для хеширования пароля

               Example:
                   UsersController.registration("newuser", "securepassword")
               """
        hash_password = hashpw(password.encode('utf-8'),gensalt())
        Users.create(login=login,password=hash_password,role_id=role_id)

    #метод проверки логина и пароля - аунтификация
    @classmethod
    def auth(cls,login,password):
        """Аутентифицирует пользователя по логину и паролю.

               Args:
                   login (str): Логин пользователя
                   password (str): Пароль в открытом виде

               Returns:
                   bool: True если аутентификация успешна, иначе False

               Security:
                   Использует bcrypt для проверки хешированного пароля

               Example:
                  if UsersController.auth("user", "password"):
                    print("Login successful")
                  else:
                    print("Invalid credentials")
               """
        #проверить логин
        if Users.get_or_none(Users.login == login) != None:
            hspassword = Users.get_or_none(Users.login == login).password

            # if Users.get_or_none(Users.login == login).password == password:
            if checkpw(password.encode('utf-8'),hspassword.encode('utf-8')):
                return True
        return False

if __name__ == '__main__':
    for row in UsersController.get():
        print(row.id, row.login, row.password, row.role_id)

    #UsersController.registration('user1','user1','4')
    #UsersController.registration('gem99', 'F0r3st#Tr3asure', '3')
    #UsersController.registration('pop00', 'Oc3anW@ve_2023', '2')
    #UsersController.registration('joy22', 'N3v3rG1veUp!', '2')
    #UsersController.registration('max33', 'M00nL1ght', '3')
    #UsersController.registration('user2','user2',2)
    #print(UsersController.auth('user1','user1'))
    #UsersController.registration('happy_day','123123')