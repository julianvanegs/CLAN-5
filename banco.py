from validacion import inicio
from mostrarmenu import mostrarmenu
from operaciones import consultar_saldo
from operaciones import depositar
from operaciones import retirar
from operaciones import mostrar_historial
print("BIENVENIDO")


saldo = 1000 
operaciones = int(input("¿CUÁNTAS OPERACIONES DESEA REALIZAR?: "))

historial = []

for i in range(operaciones):
    mostrarmenu()
    operacion = input("DIGITE EL NUMERO DE LA OPERACION: ")
    if operacion == "1":
        saldo = consultar_saldo(saldo, historial)

    elif operacion == "2":
        saldo = depositar(saldo, historial)
    
    elif operacion == "3":
        saldo = retirar(saldo, historial)

    elif operacion =="4":
        mostrar_historial(historial)
    
    else:
        print("Opcion invalida")

    print("Gracias por usar el cajero automático")
