--------------------------------------------------------------------------------
--------------------------- COMANDOS PRACTICA DJANGO ---------------------------
--------------------------------------------------------------------------------

    - Ejecución servidor Django:

        $ python manage.py runserver

    - Crear estructura de la Base de Datos y que se integre en el fichero:

        $ python manage.py makemigrations

        $ python manage.py migrate

        # Si ha salido todo bien

            Operations to perform:
                Apply all migrations: admin, auth, contenttypes, mi_tienda, sessions
            Running migrations:
                Applying contenttypes.0001_initial... OK
                Applying auth.0001_initial... OK
                Applying admin.0001_initial... OK
                Applying admin.0002_logentry_remove_auto_add... OK
                Applying contenttypes.0002_remove_content_type_name... OK
                Applying auth.0002_alter_permission_name_max_length... OK
                Applying auth.0003_alter_user_email_max_length... OK
                Applying auth.0004_alter_user_username_opts... OK
                Applying auth.0005_alter_user_last_login_null... OK
                Applying auth.0006_require_contenttypes_0002... OK
                Applying auth.0007_alter_validators_add_error_messages... OK
                Applying auth.0008_alter_user_username_max_length... OK
                Applying mi_tienda.0001_initial... OK
                Applying sessions.0001_initial... OK

    - Introducir artículos en a base de datos:

        · Desde la popia consola de pyhton:

            $ python manage.py shell

        · Importamos nuestra clase Product:

            >>> from mi_tienda.models import Product

        · Introducimos nuestro primer artículo invocando al constructor de la clase Product:

            >>> p1 = Product(name="fpga", stock=3, price=6.3)
            >>> p1.save()

            ____________________________SHELL___________________________
            |                                                          |
            |>>> p1.name                                               |
            |u'fpga'                                                   |
            |>>> p1.stock                                              |
            |3                                                         |
            |__________________________________________________________|

    - Leer los productos de la base de datos:

        $ python manage.py shell

        · Cargamos nuestro modelo de datos:

            >>> from mi_tienda import Product

        · Leer todos los productos que tenemos guardados:

            >>> productos = Product.objects.all()

            ____________________________SHELL___________________________
            |                                                          |
            |>>> len(productos)                                        |
            |3                                                         |
            |>>> productos[0].name                                     |
            |u'fpga'                                                   |
            |__________________________________________________________|
