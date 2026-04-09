
# # 5. Tienda de mascotas: alimento por tipo de animal
# # Pide el tipo de mascota:
# #  perro
# #  gato
# #  conejo
# # Luego muestra una recomendación de alimento según el animal.
# # Practica: comparaciones con texto

food_per_pets = [( "perro", "pedigry"),
                  ("gato" , "pescado"),
                  ("conejo" ,"zanahoria")]


for animal, comida in enumerate(food_per_pets):
    print(f"{animal}, {comida}")
    
animal_escg = input("Sobre que animal quiere la recomendacion de alimentacion")