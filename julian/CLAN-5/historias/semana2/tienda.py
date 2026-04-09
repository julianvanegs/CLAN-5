inventario = []
def operacions():
    print("1 Agregar producto")
    print("2. Mostrar productos ")
    print("3. Mostrar estadisticas de productos ")
    print("4. Completar proceso de compra ")

def pedirInt():
    seguir = True
    while seguir:
        try:
            numero = int(input()) 
            seguir = False
            return numero
        except ValueError:
           print("Porfavor ingresar un numero valido .")  
            
def pedirNumero():
    seguir = True
    while seguir:
        try:
            numero = float(input()) 
            seguir = False
            return numero
        except ValueError:
            print("Porfavor ingresar un numero valido")  
            
            
def agregar_producto():
    
    nombre_producto = str(input("Escribe el nombre del producto:  "))
    print(F"Escribe el precio de {nombre_producto} : ")
    precio_producto = pedirNumero()
    print(f"Escribe la cantidad de {nombre_producto} : ")
    cantidad = pedirInt()
    total = precio_producto * cantidad
    tuple_product = (nombre_producto, precio_producto, cantidad, total)
    
    inventario.append(tuple_product)
    print("Producto agregado exitosamente")

def mostrar_inventario():
    if len(inventario) > 0:
        
        for nombre_producto, precio_producto, cantidad, total in inventario:
            print("CANTIDAD------- NOMBRE DEL PRODUCTO ------- PRECIO ------- PRECIO TOTAL ")
            print(f"   {cantidad}               {nombre_producto}               {precio_producto}             {total}")
    else:
        print("CARRITO VACIO")
        
def mostrar_estadisticas():
    if len(inventario) > 0:
        
        costo_total = 0
        for nombre_producto, precio_producto, cantidad, total in inventario:
            print("CANTIDAD ------- NOMBRE DEL PRODUCTO ------- PRECIO ------- PRECIO TOTAL ")
            print(f"   {cantidad}               {nombre_producto}               {precio_producto}             {total}")
            costo_total += total
        print(f"La cantidad agregados es {len(inventario)}")
        print(f"Total de Compra: {costo_total}")
     
    else:
        print("CARRITO VACIO")
        
def finish():
    if len(inventario) > 0:
        
        costo_total = 0
        for nombre_producto, precio_producto, cantidad, total in inventario:
            print("CANTIDAD ------- NOMBRE DEL PRODUCTO ------- PRECIO ------- PRECIO TOTAL ")
            print(f"   {cantidad}               {nombre_producto}               {precio_producto}             {total}")
            costo_total += total
        print(f"La cantidad agregados es {len(inventario)}")
        print(f"Total de Compra: {costo_total}")
        print("Compra exitosa")
    else:
        print("CARRITO VACIO")
        
        
def main():
    print("Escoja el numero de la operacion que desea realizar")
    operacion = pedirInt()
    while operacion != 4:
        
        if operacion == 1:   
            agregar_producto()
        elif operacion == 2:
            mostrar_inventario()
        elif operacion == 3:
            mostrar_estadisticas()
    
        
        else:
            print("opcion invalida")
    
        operacions()
        print("Escoja el numero de la operacion que desea realizar")
        operacion = pedirInt()   


    
    
  
    
