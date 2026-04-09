data_base = []
def operations():
    print("1 .Add new product")
    print("2. Show total products, balance and quantity ")
    print("3. Complete the purchase process ")

def pedirInt():
    seguir = True
    while seguir:
        try:
            numero = int(input()) 
            seguir = False
            return numero
        except ValueError:
           print("Please enter a valid number (interger).")  
            
def pedirNumero():
    seguir = True
    while seguir:
        try:
            numero = float(input()) 
            seguir = False
            return numero
        except ValueError:
            print("Please enter a valid number")  
            
            
def option_one():
    
    name_product = str(input("Write the name's product: "))
    print(F"Write the {name_product} price: ")
    price_product = pedirNumero()
    print(f"Write the {name_product} quantity: ")
    quantity = pedirInt()
    total = price_product * quantity
    tuple_product = (name_product, price_product, quantity, total)
    
    data_base.append(tuple_product)
    print("Product added successfully.")

def option_two():
    for name_product, price_product, quantity, total in data_base:
        print("QUANTITY ------- NAME PRODUCTO ------- PRICE ------- TOTAL PRICE ")
        print(f"   {quantity}               {name_product}               {price_product}             {total}")
        
def option_three():
    
    total_general = 0
    for name_product, price_product, quantity, total in data_base:
        print("QUANTITY ------- NAME PRODUCTO ------- PRICE ------- TOTAL PRICE ")
        print(f"   {quantity}               {name_product}               {price_product}             {total}")
        total_general += total
    print(f"TOTAL PURCHASE: {total_general}")
    print("Sucessfully purchase")
        
def main():
    print("Choose the operation number: ")
    operation = pedirInt()
    while operation != 3:
        
        if operation == 1:   
            option_one()
        elif operation == 2:
            option_two()
    
        
        else:
            print("opcion invalida")
    
        operations()
        print("Choose the operation number: ")
        operation = pedirNumero()   


    
    
  
    
