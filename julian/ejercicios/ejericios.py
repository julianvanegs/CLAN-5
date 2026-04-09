sabores = ["vainilla", "chocolate", "fresa"]
pedidos = []

print("BIENVENIDO A LA HELADERIA RIWI")
print("Sabores disponibles:")

for i, sabor in enumerate(sabores):
    print(f"{i}: {sabor}")


for i in range(5):
    sabor_elegido = ""

    while sabor_elegido not in sabores:
        sabor_elegido = input(f"Pedido {i+1} - Sabor: ").lower()
        if sabor_elegido in sabores:
            pedidos.append(sabor_elegido)
        else:
            print("Sabor no válido, intente de nuevo.")

print("RESUMEN DE PEDIDOS")
for sabor in sabores:
    cantidad = pedidos.count(sabor)
    print(f"{sabor.capitalize()}: {cantidad} pedido(s)")
