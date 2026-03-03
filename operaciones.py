def consultar_saldo(saldo, historial):
    historial.append(f"Saldo: +{saldo}")
    print(f"Tu saldo actual es: {saldo}")
    return saldo
 
def depositar(saldo, historial):
     deposito = float(input("¿Cuánto vas a depositar?: "))
     saldo += deposito
     historial.append(f"Depósito: +{deposito}")
     print(f"Has depositado {deposito}")
     return saldo

def retirar(saldo, historial):
      retiro = float(input("¿Cuánto vas a retirar?: "))
      if retiro <= saldo:
            saldo -= retiro
            historial.append(f"Retiro: +{retiro}")
            print(f"Has retirado {retiro}")
      else:
            print("No tienes suficiente saldo")
      return saldo

def mostrar_historial(historial):
       if len(historial) == 0:
                print("No hay operaciones registradas.")
       else:
            print("=== HISTORIAL ===")
            for movimiento in historial:
             print(movimiento)
  
            



    
