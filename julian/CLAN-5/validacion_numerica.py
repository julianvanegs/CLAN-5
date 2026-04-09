
def pedirNumero():
    seguir = True
    while seguir:
        try:
            numero = float(input()) 
            seguir = False
            return numero
        except ValueError:
            print("Por favor, ingrese un número válido.")  