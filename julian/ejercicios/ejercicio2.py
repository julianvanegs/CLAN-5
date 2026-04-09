# 2. Gimnasio: acceso por edad
# Un gimnasio ofrece clases según la edad:
#  menor de 13 → no puede ingresar
#  de 13 a 17 → clase juvenil
#  de 18 a 59 → clase general
#  60 o más → clase senior
# Pide la edad de una persona y muestra a qué grupo pertenece.
# Practica: if, elif, else.

edades = {
    ( 0, 13 ): "No puede entrar",
    (13, 17) : "Clase Juvenil" ,
    (18, 59) : "Clase Juvenil" ,
     (60 ,float("inf")) : "Clase senior" }

edad_escg = float(input("Ingrese su edad: "))
for (minimo, maximo), edad in edades.items():
    if minimo <= edad_escg <= maximo:
        print(edad)
        break