# 6. Parqueadero: cobro por horas
# Pide cuántas horas estuvo un carro en un parqueadero.
# Reglas:
#  primera hora = 5000
#  cada hora adicional = 3000
# Muestra el total a pagar.
# Practica: condicionales y operaciones
check_per_hour = {"Primera hora": 5000,
                  "Cada hora adicional": 3000}
horas_guardadas = 0
costo_general = 0
print(f"MENU DE COSTOS")
for horas, costo in check_per_hour.items():
   
    print (f"{horas} tiene un costo de {costo}")



horas_usuario =int(input("Ingrese el numero de horas que estuvo en el parqueadero:  "))
horas_guardadas = horas_usuario
if horas_guardadas == 1:
    costo_general += 5000
    print(f"el costo por {horas_guardadas} hora(s) es {costo_general}")
elif horas_guardadas > 1:
    costo_general +=  5000 + (horas_guardadas - 1) * (3000) 
    print(f"el costo por {horas_guardadas} hora(s) es {costo_general}")
    
else:
    print("NO es una accion valida")
    
    