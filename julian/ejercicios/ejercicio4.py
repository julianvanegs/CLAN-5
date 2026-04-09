# 4. Cine: entrada según edad
# El precio de la entrada cambia así:
#  niños menores de 12 → 8000
#  adultos de 12 a 59 → 12000
#  mayores de 60 → 9000
# Pide la edad del cliente y muestra cuánto debe pagar.
# Practica: condicionales.

entry_price ={
    (0,12) : 8000,
    (12,59): 12000,
    (60, float("inf")): 9000
}
years = float(input("Digite su edad para el precio de entrada: "))
for (minimo,maximo),price in entry_price.items():
    if minimo <= years <= maximo:
        print(price)
        break