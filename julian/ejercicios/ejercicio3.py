# 3. Cafetería: total de una compra sencilla
# En una cafetería venden:
#  café = 4000
#  té = 3500
#  jugo = 5000
# Pide al usuario qué bebida quiere y cuántas unidades desea comprar.
# Luego muestra el total a pagar.
# Practica: condicionales, variables, multiplicación.
bebidas = { "cafe" : 4000,
             "té" :  3500,
             "jugo" : 5000}
pedidos = {}

for sabor, precio in bebidas.items():
    print(f"SABOR: {sabor.capitalize()} -- PRECIO: {precio}")


drink_choice = input("Que sabor es el que va a elegir : ").lower()
if drink_choice in bebidas:
    quantity = int(input(f"Que cantidad desea de {drink_choice}: "))
    total = bebidas[drink_choice] * quantity
    print (f"PEDIDO ---{quantity}----{drink_choice.capitalize()}----TOTAL:  {total}")
else:
    print("No tenemos esa bebida en este momento")


