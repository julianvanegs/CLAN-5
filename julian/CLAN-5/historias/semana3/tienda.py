from archivos import *

inventory = []

def get_number():
    while True:
        try:
            number = float(input())
            return number
        except ValueError:
            print("Please enter a valid number.")

def menu():
    print("\n--- PRODUCT MANAGEMENT MENU ---")
    print("1. ADD")
    print("2. DISPLAY")
    print("3. SEARCH")
    print("4. UPDATE")
    print("5. DELETE")
    print("6. STATISTICS")
    print("7. SAVE CSV")
    print("8. LOAD CSV")
    print("9. EXIT")

def add_product():
    print("Product Name: ")
    name = input()
    print("Price: ")
    price = get_number()
    print("Quantity: ")
    quantity = int(get_number())
    inventory.append({"name": name, "price": price, "quantity": quantity})
    print("Product added successfully!")

def display_inventory():
    if not inventory:
        print("The inventory is empty.")
        return
    for prod in inventory:
        print(f"Product: {prod['name']} | Price: ${prod['price']} | Stock: {prod['quantity']}")

def search_product():
    print("Enter product name to search: ")
    search_query = input()
    found = False
    for prod in inventory:
        if prod['name'].lower() == search_query.lower():
            print(f"Found: {prod}")
            found = True
            break
    if not found:
        print("Product not found.")

def update_product():
    if not inventory:
        print("No products to update.")
        return
    for i, prod in enumerate(inventory):
        print(f"{i + 1}. {prod['name']}")
    
    print("Select the product number to update: ")
    selection = int(get_number()) - 1
    
    if 0 <= selection < len(inventory):
        print(f"Editing: {inventory[selection]['name']}")
        
        print("New name (leave blank to keep current): ")
        new_name = input()
        
        print("New price (Enter number or press any key to skip): ")
        try:
            p_input = input()
            if p_input:
                inventory[selection]['price'] = float(p_input)
        except ValueError:
            print("Price not modified.")
            
        print("New quantity (Enter number or press any key to skip): ")
        try:
            q_input = input()
            if q_input:
                inventory[selection]['quantity'] = int(q_input)
        except ValueError:
            print("Quantity not modified.")
            
        if new_name:
            inventory[selection]['name'] = new_name
        print("Product updated successfully!")
    else:
        print("Number out of range.")

def delete_product():
    if not inventory:
        print("The inventory is empty, nothing to delete.")
        return
    for i, prod in enumerate(inventory):
        print(f"{i + 1}. {prod['name']}")
    
    print("Select the product number to delete: ")
    selection = int(get_number()) - 1
    
    if 0 <= selection < len(inventory):
        deleted_prod = inventory.pop(selection)
        print(f"Product '{deleted_prod['name']}' deleted successfully!")
    else:
        print("Number out of range.")

def statistics():
    if not inventory:
        print("Inventory is empty. No statistics to show.")
        return
    
    total_units = sum(prod['quantity'] for prod in inventory)
    total_value = sum(prod['price'] * prod['quantity'] for prod in inventory)
    expensive_prod = max(inventory, key=lambda x: x['price'])
    stock_prod = max(inventory, key=lambda x: x['quantity'])
    
    print("--- INVENTORY STATISTICS ---")
    print(f"Total units in stock: {total_units}")
    print(f"Total inventory value: ${total_value:,.2f}")
    print(f"Most expensive product: {expensive_prod['name']} (${expensive_prod['price']})")
    print(f"Product with highest stock: {stock_prod['name']} ({stock_prod['quantity']} units)")
    print("---------------------------")

def run_system():
    option = ""
    while option != "9":
        menu()
        option = input("Select an option: ")
        if option == "1":
            add_product()
        elif option == "2":
            display_inventory()
        elif option == "3":
            search_product()
        elif option == "4":
            update_product()
        elif option == "5":
            delete_product()
        elif option == "6":
            statistics()
        elif option == "7":
            # Assuming 'guardar_csv' is defined in 'archivos'
            save_csv(inventory, "data.csv")
        elif option == "8":
            # Assuming 'gestionar_carga' is defined in 'archivos'
            load_csv(inventory, "data.csv")
        elif option == "9":
            print("Exiting...")

run_system()
